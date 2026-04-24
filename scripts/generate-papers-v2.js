#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const FEISHU_APP_ID = 'cli_a961a7a5277bdcc0';
const FEISHU_APP_SECRET = 'FEOrrzYAxLA9nGinTDpfrb8Z2kABCXpL';
const DOC_TOKEN = 'BYhYdtzRBo9Q2fxTKSxcbZDgnff';

async function getToken() {
  const res = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ app_id: FEISHU_APP_ID, app_secret: FEISHU_APP_SECRET })
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error(`Token failed: ${data.msg}`);
  return data.tenant_access_token;
}

async function getAllBlocks(token, blockId) {
  const allItems = [];
  let pageToken = '';
  
  while (true) {
    const url = `https://open.feishu.cn/open-apis/docx/v1/documents/${DOC_TOKEN}/blocks/${blockId}/children?page_size=500${pageToken ? '&page_token=' + pageToken : ''}`;
    const res = await fetch(url, { headers: { 'Authorization': 'Bearer ' + token } });
    const data = await res.json();
    if (data.code !== 0) throw new Error(`Read failed: ${data.msg}`);
    
    const items = data.data?.items || [];
    allItems.push(...items);
    
    if (!data.data?.has_more) break;
    pageToken = data.data.page_token;
  }
  
  return allItems;
}

function extractText(block) {
  if (block.heading1) return block.heading1.elements?.map(e => e.text_run?.content).join('');
  if (block.heading2) return block.heading2.elements?.map(e => e.text_run?.content).join('');
  if (block.heading3) return block.heading3.elements?.map(e => e.text_run?.content).join('');
  if (block.heading4) return block.heading4.elements?.map(e => e.text_run?.content).join('');
  if (block.heading5) return block.heading5.elements?.map(e => e.text_run?.content).join('');
  if (block.text) return block.text.elements?.map(e => e.text_run?.content).join('');
  if (block.quote) return block.quote.elements?.map(e => e.text_run?.content).join('');
  if (block.todo) return block.todo.elements?.map(e => e.text_run?.content).join('');
  if (block.bullet) return block.bullet.elements?.map(e => e.text_run?.content).join('');
  if (block.ordered) return block.ordered.elements?.map(e => e.text_run?.content).join('');
  return '';
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function blockToHtml(block) {
  const type = block.block_type;
  const text = extractText(block);
  if (!text.trim()) return '';

  // 跳过阅读状态行 [x] 已读 / [ ] 未读
  if (/^\s*\[[x\s]\]\s*(已读|未读)/.test(text)) return '';

  // h4 小节标题
  if (type === 6) return `<h4>${escapeHtml(text)}</h4>`;
  // h5
  if (type === 7) return `<h5>${escapeHtml(text)}</h5>`;
  // quote
  if (type === 12) return `<blockquote><p>${escapeHtml(text)}</p></blockquote>`;
  // todo
  if (type === 13) return `<p class="todo-item">☐ ${escapeHtml(text)}</p>`;
  // bullet
  if (type === 9) return `<p class="list-item">• ${escapeHtml(text)}</p>`;
  // ordered
  if (type === 10) return `<p class="list-item">${escapeHtml(text)}</p>`;
  // divider
  if (type === 22) return '<hr />';
  // default text
  return `<p>${escapeHtml(text)}</p>`;
}

async function main() {
  console.log('🚀 读取飞书文档...');
  const token = await getToken();
  const blocks = await getAllBlocks(token, DOC_TOKEN);
  console.log(`📄 共 ${blocks.length} 个 blocks`);

  const papers = [];
  let currentPaper = null;
  let currentCategory = '论文库';

  for (const block of blocks) {
    const type = block.block_type;
    
    // heading2 = 分类
    if (type === 4) {
      const catText = extractText(block);
      if (catText) currentCategory = catText.replace(/^\s*[一二三四五六七八九十]+、\s*/, '').trim();
      continue;
    }
    
    // heading3 = 新论文开始
    if (type === 5) {
      if (currentPaper && !currentPaper.title.match(/阅读统计|推荐阅读|进度/)) {
        papers.push(currentPaper);
      }
      currentPaper = { title: extractText(block), bodyHtml: [], source: currentCategory };
      continue;
    }
    
    if (!currentPaper) continue;
    
    // 跳过阅读统计等非论文部分
    if (currentPaper.title.includes('阅读统计') || currentPaper.title.includes('推荐') || currentPaper.title.includes('进度')) continue;
    
    const html = blockToHtml(block);
    if (html) currentPaper.bodyHtml.push(html);
  }
  
  if (currentPaper && !currentPaper.title.match(/阅读统计|推荐阅读|进度/)) {
    papers.push(currentPaper);
  }
  
  console.log(`📝 共解析出 ${papers.length} 篇论文`);
  papers.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.title}`);
  });

  // 创建输出目录
  const papersDir = path.join(__dirname, '..', 'papers');
  if (!fs.existsSync(papersDir)) fs.mkdirSync(papersDir, { recursive: true });

  // 生成每篇论文的 HTML
  papers.forEach((paper, i) => {
    const id = String(i + 1).padStart(3, '0');
    const bodyHtml = paper.bodyHtml.join('\n');
    const cleanTitle = paper.title.replace(/^论文\s*\d+\s*\|\s*/, '');
    
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <title>${escapeHtml(cleanTitle)} · JUNNYOfficial Blog</title>
  <meta name="description" content="${escapeHtml(cleanTitle)}" />
  <link rel="stylesheet" href="../styles.css?v=22" />
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
      <p>论文笔记 · JUNNYOfficial</p>
    </footer>
  </div>
  <script>
    (function() {
      // 自动生成目录
      const toc = document.getElementById('articleToc');
      const headings = document.querySelectorAll('.article-body h4, .article-body h5');
      if (toc && headings.length > 2) {
        toc.innerHTML = '<p class="eyebrow">目录</p><ul>' +
          Array.from(headings).map((h, i) => {
            h.id = 'toc-' + i;
            return '<li><a href="#toc-' + i + '">' + h.textContent + '</a></li>';
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
    
    fs.writeFileSync(path.join(papersDir, `paper-${id}.html`), html, 'utf-8');
  });

  // 生成数据文件供 script.js 使用
  const papersData = papers.map((p, i) => {
    // 提取纯文本摘要（跳过阅读状态行，取第一个有意义的文本段落）
    const readingStatusPattern = /^\s*\[[x\s]\]\s*(已读|未读)/;
    const meaningfulText = p.bodyHtml.find(h => {
      if (!h.startsWith('<p>') || h.includes('todo-item') || h.includes('list-item')) return false;
      const text = h.replace(/<\/?p>/g, '').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').trim();
      return text.length > 10 && !readingStatusPattern.test(text);
    });
    const summaryText = meaningfulText ? meaningfulText.replace(/<\/?p>/g, '').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') : '';
    
    return {
      id: `f${i + 1}`,
      title: p.title.replace(/^论文\s*\d+\s*\|\s*/, ''),
      summary: summaryText.slice(0, 100) + (summaryText.length > 100 ? '...' : ''),
      tag: '论文',
      source: p.source || '论文库',
      date: '2026年4月24日',
      reading: `${Math.max(5, Math.ceil(p.bodyHtml.length / 4))} 分钟阅读`,
      body: p.bodyHtml.map(h => h.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')).filter(t => t.trim())
    };
  });

  fs.writeFileSync(
    path.join(__dirname, '..', 'script-feishu.js'),
    `// 由 scripts/generate-papers-v2.js 自动生成 — 飞书文档同步数据
const feishuPapers = ${JSON.stringify(papersData, null, 2)};
`,
    'utf-8'
  );

  console.log('\n✅ 生成完成：');
  console.log(`  - papers/ 目录: ${papers.length} 个 HTML 文件`);
  console.log('  - script-feishu.js: 数据文件');
}

main().catch(err => {
  console.error('❌ 错误:', err.message);
  process.exit(1);
});
