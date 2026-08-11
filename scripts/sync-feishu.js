#!/usr/bin/env node
/**
 * 飞书文档同步脚本
 * 从飞书云文档读取论文笔记，生成 papers/ 页面并更新 posts.json
 *
 * 依赖环境变量：
 *   FEISHU_APP_ID     - 飞书自建应用 App ID
 *   FEISHU_APP_SECRET - 飞书自建应用 App Secret
 *   FEISHU_DOC_URL    - 飞书文档链接，支持 /docx/ 和 /wiki/；
 *                        多个文档用英文逗号或换行分隔，合并后统一拆分
 */

const fs = require('fs');
const path = require('path');

const FEISHU_APP_ID = process.env.FEISHU_APP_ID;
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET;
const FEISHU_DOC_URL = process.env.FEISHU_DOC_URL;

function splitDocUrls(input) {
  if (!input) return [];
  return input
    .split(/[\s,;]+/)
    .map(s => s.trim())
    .filter(Boolean);
}

function extractWikiToken(url) {
  const match = url.match(/\/wiki\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

function extractDocxToken(url) {
  const match = url.match(/\/docx\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

function detectDocType(url) {
  if (url.includes('/docx/')) return 'docx';
  if (url.includes('/wiki/')) return 'wiki';
  if (url.includes('/docs/')) return 'docs';
  throw new Error(`不支持的文档链接格式：${url}，仅支持 docx 或 wiki 链接`);
}

async function wikiToDocxToken(token, accessToken) {
  const url = `https://open.feishu.cn/open-apis/wiki/v2/spaces/get_node?token=${encodeURIComponent(token)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  const data = await res.json();
  if (data.code !== 0) throw new Error(`解析 wiki 节点失败 (token=${token}): ${data.msg}`);
  const node = data.data?.node;
  if (!node) throw new Error(`wiki 节点不存在 (token=${token})`);
  if (node.obj_type !== 'docx') {
    throw new Error(`wiki 节点类型为 ${node.obj_type}，暂只支持底层是 docx 的 wiki 节点`);
  }
  return node.obj_token;
}

async function getTenantAccessToken() {
  const res = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ app_id: FEISHU_APP_ID, app_secret: FEISHU_APP_SECRET })
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error(`获取 token 失败: ${data.msg}`);
  return data.tenant_access_token;
}

async function getAllBlocks(token, docToken) {
  const allItems = [];
  let pageToken = '';

  while (true) {
    const url = `https://open.feishu.cn/open-apis/docx/v1/documents/${docToken}/blocks/${docToken}/children?page_size=500${pageToken ? '&page_token=' + pageToken : ''}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (data.code !== 0) throw new Error(`读取文档 block 失败: ${data.msg}`);

    const items = data.data?.items || [];
    allItems.push(...items);

    if (!data.data?.has_more) break;
    pageToken = data.data.page_token;
  }

  return allItems;
}

function extractText(block) {
  for (const key of ['heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'text', 'quote', 'todo', 'bullet', 'ordered']) {
    if (block[key]) {
      return (block[key].elements || [])
        .map(e => e.text_run?.content || '')
        .join('');
    }
  }
  return '';
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function blockToHtml(block) {
  const type = block.block_type;
  const text = extractText(block);
  if (!text.trim()) return '';

  // 跳过阅读状态行
  if (/^\s*\[[x\s]\]\s*(已读|未读)/.test(text)) return '';

  if (type === 6) return `<h4>${escapeHtml(text)}</h4>`;
  if (type === 7) return `<h5>${escapeHtml(text)}</h5>`;
  if (type === 12) return `<blockquote><p>${escapeHtml(text)}</p></blockquote>`;
  if (type === 13) return `<p class="todo-item">☐ ${escapeHtml(text)}</p>`;
  if (type === 9) return `<p class="list-item">• ${escapeHtml(text)}</p>`;
  if (type === 10) return `<p class="list-item">${escapeHtml(text)}</p>`;
  if (type === 22) return '<hr />';
  return `<p>${escapeHtml(text)}</p>`;
}

function parsePapers(blocks) {
  const papers = [];
  let currentPaper = null;
  let currentCategory = '论文库';

  for (const block of blocks) {
    const type = block.block_type;

    // heading2 = 分类
    if (type === 4) {
      const catText = extractText(block);
      if (catText) {
        currentCategory = catText.replace(/^\s*[一二三四五六七八九十]+、\s*/, '').trim();
      }
      continue;
    }

    // heading3 = 新论文开始
    if (type === 5) {
      if (currentPaper && !/阅读统计|推荐阅读|进度/.test(currentPaper.title)) {
        papers.push(currentPaper);
      }
      currentPaper = { title: extractText(block), bodyHtml: [], source: currentCategory };
      continue;
    }

    if (!currentPaper) continue;
    if (/阅读统计|推荐|进度/.test(currentPaper.title)) continue;

    const html = blockToHtml(block);
    if (html) currentPaper.bodyHtml.push(html);
  }

  if (currentPaper && !/阅读统计|推荐阅读|进度/.test(currentPaper.title)) {
    papers.push(currentPaper);
  }

  return papers;
}

function generatePaperHTML(paper, i, papers) {
  const id = String(i + 1).padStart(3, '0');
  const bodyHtml = paper.bodyHtml.join('\n');
  const cleanTitle = paper.title.replace(/^论文\s*\d+\s*\|\s*/, '');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <title>${escapeHtml(cleanTitle)} · zhilinOfficial Blog</title>
  <meta name="description" content="${escapeHtml(cleanTitle)}" />
  <link rel="stylesheet" href="../styles.css?v=40" />
  <style>
    .article-body h4 { font-size: 1.15rem; font-weight: 600; margin: 28px 0 14px; color: #111; }
    .article-body h5 { font-size: 1rem; font-weight: 600; margin: 20px 0 10px; color: #333; }
    .article-body blockquote { border-left: 3px solid #d4d4d4; margin: 16px 0; padding: 12px 18px; background: #fafafa; border-radius: 0 12px 12px 0; }
    .article-body blockquote p { margin: 0; color: #555; }
    .article-body .todo-item, .article-body .list-item { margin: 8px 0; color: #444; padding-left: 4px; }
    .article-body hr { border: none; border-top: 1px solid #e8e8e8; margin: 24px 0; }
  </style>
</head>
<body data-page="article">
  <div class="page-shell article-shell">
    <header class="article-header">
      <a class="icon-link back-link" href="../notes.html" aria-label="返回论文库">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </header>

    <main class="article-content">
      <section class="article-frame">
        <article>
          <p class="eyebrow">论文笔记</p>
          <h1>${escapeHtml(cleanTitle)}</h1>
          <nav class="article-toc" id="articleToc" aria-label="目录"></nav>
          <div class="article-body">${bodyHtml}</div>
        </article>
      </section>

      <nav class="paper-nav panel-section" aria-label="论文导航">
        ${i > 0 ? `<a class="paper-nav-prev" href="paper-${String(i).padStart(3, '0')}.html">
          <span class="paper-nav-label">上一篇</span>
          <span class="paper-nav-title">${escapeHtml(papers[i - 1].title.replace(/^论文\s*\d+\s*\|\s*/, ''))}</span>
        </a>` : '<span class="paper-nav-prev paper-nav-disabled"><span class="paper-nav-label">上一篇</span><span class="paper-nav-title">—</span></span>'}
        <a class="paper-nav-home" href="../notes.html">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 22V12h6v10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>返回论文库</span>
        </a>
        ${i < papers.length - 1 ? `<a class="paper-nav-next" href="paper-${String(i + 2).padStart(3, '0')}.html">
          <span class="paper-nav-label">下一篇</span>
          <span class="paper-nav-title">${escapeHtml(papers[i + 1].title.replace(/^论文\s*\d+\s*\|\s*/, ''))}</span>
        </a>` : '<span class="paper-nav-next paper-nav-disabled"><span class="paper-nav-label">下一篇</span><span class="paper-nav-title">—</span></span>'}
      </nav>
    </main>

    <footer class="site-footer article-footer">
      <p>论文笔记 · zhilinOfficial</p>
    </footer>
  </div>
  <script src="../page-transition.js?v=40"></script>
  <script>
    (function() {
      const toc = document.getElementById('articleToc');
      const headings = document.querySelectorAll('.article-body h4, .article-body h5');
      if (toc && headings.length > 2) {
        toc.innerHTML = '<p class="eyebrow">目录</p><ul>' +
          Array.from(headings).map((h, i) => {
            h.id = 'toc-' + i;
            return '<li><a href="#toc-' + i + '">' + (i + 1) + '. ' + h.textContent + '</a></li>';
          }).join('') +
          '</ul>';
      }

      const btn = document.createElement('button');
      btn.className = 'back-to-top';
      btn.setAttribute('aria-label', '返回顶部');
      btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      document.body.appendChild(btn);
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            btn.classList.toggle('visible', window.scrollY > 400);
            ticking = false;
          });
          ticking = true;
        }
      });
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    })();
  </script>
</body>
</html>`;
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();
}

function todayZh() {
  const d = new Date();
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function updatePostsJson(papers) {
  const postsPath = path.join(__dirname, '..', 'posts.json');
  let existing = [];
  if (fs.existsSync(postsPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
      if (!Array.isArray(existing)) existing = [];
    } catch (e) {
      console.warn('posts.json 解析失败，将重新生成');
      existing = [];
    }
  }

  // 保留非飞书生成的文章（id 不以 f 开头）
  const preserved = existing.filter(p => !String(p.id).match(/^f\d+$/));

  const readingStatusPattern = /^\s*\[[x\s]\]\s*(已读|未读)/;

  const generated = papers.map((p, i) => {
    const cleanTitle = p.title.replace(/^论文\s*\d+\s*\|\s*/, '');
    const meaningfulText = p.bodyHtml.find(h => {
      if (!h.startsWith('<p>') || h.includes('todo-item') || h.includes('list-item')) return false;
      const text = stripHtml(h);
      return text.length > 10 && !readingStatusPattern.test(text);
    });
    const summaryText = meaningfulText ? stripHtml(meaningfulText) : '';

    return {
      id: `f${i + 1}`,
      title: cleanTitle,
      summary: summaryText.slice(0, 100) + (summaryText.length > 100 ? '...' : ''),
      tag: '论文',
      source: p.source || '论文库',
      date: todayZh(),
      reading: `${Math.max(5, Math.ceil(p.bodyHtml.length / 4))} 分钟阅读`,
      body: p.bodyHtml.map(h => stripHtml(h)).filter(t => t)
    };
  });

  const merged = [...preserved, ...generated];
  fs.writeFileSync(postsPath, JSON.stringify(merged, null, 2) + '\n', 'utf-8');
  console.log(`  ✓ posts.json 已更新：保留 ${preserved.length} 篇，新增/更新 ${generated.length} 篇`);
}

async function resolveDocxTokens(docUrls, accessToken) {
  const results = [];
  for (const url of docUrls) {
    const type = detectDocType(url);
    let docxToken;
    if (type === 'docx') {
      docxToken = extractDocxToken(url);
    } else if (type === 'wiki') {
      const wikiToken = extractWikiToken(url);
      console.log(`  解析 wiki 链接 -> ${wikiToken}`);
      docxToken = await wikiToDocxToken(wikiToken, accessToken);
    } else {
      throw new Error(`不支持的文档类型：${type}（请将旧版 docs 迁移到新版 docx 或 wiki 中的 docx 节点后再试）`);
    }
    results.push({ url, type, docxToken });
  }
  return results;
}

async function main() {
  if (!FEISHU_APP_ID || !FEISHU_APP_SECRET || !FEISHU_DOC_URL) {
    console.error('缺少必要的环境变量：FEISHU_APP_ID, FEISHU_APP_SECRET, FEISHU_DOC_URL');
    process.exit(1);
  }

  const docUrls = splitDocUrls(FEISHU_DOC_URL);
  if (docUrls.length === 0) {
    console.error('FEISHU_DOC_URL 为空，请至少配置一个飞书文档链接');
    process.exit(1);
  }
  console.log(`将从 ${docUrls.length} 个飞书文档同步内容...`);

  const token = await getTenantAccessToken();
  console.log('获取 token 成功');

  const resolved = await resolveDocxTokens(docUrls, token);
  resolved.forEach(r => console.log(`  ✓ ${r.type} -> docx:${r.docxToken}`));

  let papers = [];
  for (const r of resolved) {
    const blocks = await getAllBlocks(token, r.docxToken);
    console.log(`文档 ${r.docxToken.slice(0, 8)}... 读取 ${blocks.length} 个 block`);
    const docPapers = parsePapers(blocks);
    console.log(`  解析出 ${docPapers.length} 篇论文`);
    papers = papers.concat(docPapers);
  }

  console.log(`\n共解析出 ${papers.length} 篇论文`);
  papers.forEach((p, i) => console.log(`  ${i + 1}. ${p.title}`));

  if (papers.length === 0) {
    console.warn('未找到任何论文，请检查文档中是否包含三级标题作为论文分隔');
    process.exit(1);
  }

  // 清空旧的自动生成论文页面
  const papersDir = path.join(__dirname, '..', 'papers');
  if (!fs.existsSync(papersDir)) fs.mkdirSync(papersDir, { recursive: true });
  for (const file of fs.readdirSync(papersDir)) {
    if (file.match(/^paper-\d+\.html$/)) {
      fs.unlinkSync(path.join(papersDir, file));
      console.log(`  删除旧文件: ${file}`);
    }
  }

  // 生成论文 HTML
  papers.forEach((paper, i) => {
    const id = String(i + 1).padStart(3, '0');
    const html = generatePaperHTML(paper, i, papers);
    fs.writeFileSync(path.join(papersDir, `paper-${id}.html`), html, 'utf-8');
    console.log(`  ✓ paper-${id}.html — ${paper.title.replace(/^论文\s*\d+\s*\|\s*/, '')}`);
  });

  // 更新 posts.json
  updatePostsJson(papers);

  console.log('\n同步完成！');
}

main().catch(err => {
  console.error('错误:', err.message);
  process.exit(1);
});
