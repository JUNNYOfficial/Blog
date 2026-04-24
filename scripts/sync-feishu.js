#!/usr/bin/env node
/**
 * 飞书文档同步脚本
 * 从飞书云文档读取内容，拆分成多篇论文，生成 HTML 页面
 */

const fs = require('fs');
const path = require('path');

const FEISHU_APP_ID = process.env.FEISHU_APP_ID;
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET;
const FEISHU_DOC_URL = process.env.FEISHU_DOC_URL;

// 从飞书文档链接中提取 docToken
function extractDocToken(url) {
  // 支持格式: https://xxx.feishu.cn/docx/ABC123 或 https://xxx.feishu.cn/docs/ABC123
  const match = url.match(/\/docx\/([a-zA-Z0-9]+)/) || url.match(/\/docs\/([a-zA-Z0-9]+)/);
  if (!match) throw new Error('无法从链接中提取文档 token，请确认链接格式');
  return match[1];
}

// 判断文档类型: docx (新版) 或 docs (旧版)
function detectDocType(url) {
  if (url.includes('/docx/')) return 'docx';
  if (url.includes('/docs/')) return 'docs';
  throw new Error('不支持的文档类型，仅支持 docx 或 docs 链接');
}

// 获取 tenant_access_token
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

// 读取新版 docx 文档内容
async function getDocxContent(token, docToken) {
  const res = await fetch(`https://open.feishu.cn/open-apis/docx/v1/documents/${docToken}/blocks`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error(`读取文档失败: ${data.msg}`);
  return data.data;
}

// 读取旧版 docs 文档内容
async function getDocsContent(token, docToken) {
  const res = await fetch(`https://open.feishu.cn/open-apis/doc/v2/${docToken}/content`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error(`读取文档失败: ${data.msg}`);
  return data.data;
}

// 递归获取 docx 所有 block 的完整内容
async function getDocxBlocks(token, docToken, blockId) {
  const res = await fetch(
    `https://open.feishu.cn/open-apis/docx/v1/documents/${docToken}/blocks/${blockId}/children`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  const data = await res.json();
  if (data.code !== 0) throw new Error(`读取 block 失败: ${data.msg}`);
  return data.data?.items || [];
}

// 解析 docx blocks，按二级标题拆分成论文
async function parseDocxIntoPapers(token, docToken) {
  const rootBlocks = await getDocxBlocks(token, docToken, docToken);
  const papers = [];
  let currentPaper = null;

  for (const block of rootBlocks) {
    const type = block.block_type;
    const text = extractBlockText(block);

    // 以 heading2 (二级标题) 作为论文分隔
    if (type === 3 || type === 'heading2') {
      if (currentPaper) papers.push(currentPaper);
      currentPaper = { title: text, body: [] };
    } else if (currentPaper) {
      currentPaper.body.push({ type, text });
    }
  }

  if (currentPaper) papers.push(currentPaper);
  return papers;
}

// 从 block 中提取文本
function extractBlockText(block) {
  if (!block.text) return '';
  const elements = block.text.elements || [];
  return elements.map(e => e.text_run?.content || '').join('');
}

// 生成论文 HTML 页面
function generatePaperHTML(paper, index) {
  const id = `paper-${String(index + 1).padStart(3, '0')}`;
  const bodyHTML = paper.body
    .map(p => `<p>${escapeHtml(p.text)}</p>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <title>${escapeHtml(paper.title)} · JUNNYOfficial Blog</title>
  <meta name="description" content="${escapeHtml(paper.title)}" />
  <link rel="stylesheet" href="../styles.css?v=3" />
</head>
<body data-page="article">
  <div class="page-shell article-shell">
    <header class="article-header">
      <a class="icon-link back-link" href="../index.html" aria-label="返回首页">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </header>

    <main class="article-content">
      <section class="article-frame">
        <article>
          <p class="eyebrow">论文笔记</p>
          <h1>${escapeHtml(paper.title)}</h1>
          <div class="article-body">${bodyHTML}</div>
        </article>
      </section>
    </main>

    <footer class="site-footer article-footer">
      <p>论文笔记 · JUNNYOfficial</p>
    </footer>
  </div>
</body>
</html>`;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// 生成论文索引数据，供 script.js 使用
function generatePapersData(papers) {
  const posts = papers.map((p, i) => ({
    id: `p${i + 1}`,
    title: p.title,
    summary: p.body.slice(0, 2).map(b => b.text).join('').slice(0, 80) + '...',
    tag: '论文',
    date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
    reading: `${Math.max(3, Math.ceil(p.body.length / 3))} 分钟阅读`,
    body: p.body.map(b => b.text).filter(t => t.trim())
  }));

  return `// 由 scripts/sync-feishu.js 自动生成，请勿手动修改
const feishuPapers = ${JSON.stringify(posts, null, 2)};

// 合并到主文章列表中（如果存在）
if (typeof posts !== 'undefined') {
  posts.push(...feishuPapers);
}
`;
}

// 主流程
async function main() {
  if (!FEISHU_APP_ID || !FEISHU_APP_SECRET || !FEISHU_DOC_URL) {
    console.error('缺少必要的环境变量: FEISHU_APP_ID, FEISHU_APP_SECRET, FEISHU_DOC_URL');
    process.exit(1);
  }

  console.log('🚀 开始同步飞书文档...');

  const docToken = extractDocToken(FEISHU_DOC_URL);
  const docType = detectDocType(FEISHU_DOC_URL);
  console.log(`📄 文档类型: ${docType}, Token: ${docToken}`);

  const token = await getTenantAccessToken();
  console.log('✅ 获取 token 成功');

  let papers = [];

  if (docType === 'docx') {
    papers = await parseDocxIntoPapers(token, docToken);
  } else {
    // 旧版 docs 暂不支持自动拆分，需要用户手动处理
    console.warn('旧版 docs 格式暂不支持自动拆分，建议迁移到新版 docx 格式');
    process.exit(1);
  }

  console.log(`📝 共解析出 ${papers.length} 篇论文`);

  if (papers.length === 0) {
    console.warn('未找到任何论文，请检查文档中是否包含二级标题');
    process.exit(1);
  }

  // 创建输出目录
  const papersDir = path.join(__dirname, '..', 'papers');
  if (!fs.existsSync(papersDir)) fs.mkdirSync(papersDir, { recursive: true });

  // 生成每篇论文的 HTML
  papers.forEach((paper, i) => {
    const html = generatePaperHTML(paper, i);
    const fileName = `paper-${String(i + 1).padStart(3, '0')}.html`;
    fs.writeFileSync(path.join(papersDir, fileName), html, 'utf-8');
    console.log(`  ✓ ${fileName} — ${paper.title}`);
  });

  // 生成数据文件
  const dataJS = generatePapersData(papers);
  fs.writeFileSync(path.join(__dirname, '..', 'script-feishu.js'), dataJS, 'utf-8');
  console.log('  ✓ script-feishu.js 数据文件已生成');

  console.log('\n🎉 同步完成！');
}

main().catch(err => {
  console.error('❌ 错误:', err.message);
  process.exit(1);
});
