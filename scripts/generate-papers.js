#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const FEISHU_APP_ID = 'cli_a961a7a5277bdcc0';
const FEISHU_APP_SECRET = 'FEOrrzYAxLA9nGinTDpfrb8Z2kABCXpL';
const DOC_TOKEN = 'BaHed6fcloBlyBxpkYKc4f9onth';

async function getToken() {
  const res = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ app_id: FEISHU_APP_ID, app_secret: FEISHU_APP_SECRET })
  });
  const data = await res.json();
  return data.tenant_access_token;
}

async function getBlocks(token, blockId) {
  const res = await fetch(
    `https://open.feishu.cn/open-apis/docx/v1/documents/${DOC_TOKEN}/blocks/${blockId}/children?page_size=500`,
    { headers: { 'Authorization': 'Bearer ' + token } }
  );
  const data = await res.json();
  return data.data?.items || [];
}

function extractText(block) {
  if (block.heading1) return block.heading1.elements?.map(e => e.text_run?.content).join('');
  if (block.heading2) return block.heading2.elements?.map(e => e.text_run?.content).join('');
  if (block.heading3) return block.heading3.elements?.map(e => e.text_run?.content).join('');
  if (block.heading4) return block.heading4.elements?.map(e => e.text_run?.content).join('');
  if (block.text) return block.text.elements?.map(e => e.text_run?.content).join('');
  if (block.quote) return block.quote.elements?.map(e => e.text_run?.content).join('');
  return '';
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function main() {
  const token = await getToken();
  const blocks = await getBlocks(token, DOC_TOKEN);

  const papers = [];
  let currentCategory = '';
  let currentPaper = null;

  for (const block of blocks) {
    const type = block.block_type;
    const text = extractText(block);

    if (type === 4) {
      currentCategory = text;
      continue;
    }

    if (type === 5) {
      if (currentPaper) papers.push(currentPaper);
      currentPaper = { title: text, category: currentCategory, body: [] };
      continue;
    }

    if (!currentPaper || !text.trim()) continue;

    if (currentCategory.includes('阅读统计') || currentCategory.includes('推荐')) continue;
    if (currentPaper.title.includes('阅读统计') || currentPaper.title.includes('推荐')) continue;

    currentPaper.body.push(text);
  }

  if (currentPaper) papers.push(currentPaper);

  console.log(`解析完成，共 ${papers.length} 篇论文`);
  papers.forEach((p, i) => {
    console.log(`  ${i + 1}. [${p.category}] ${p.title}`);
  });

  const papersDir = path.join(__dirname, '..', 'papers');
  if (!fs.existsSync(papersDir)) fs.mkdirSync(papersDir, { recursive: true });

  papers.forEach((paper, i) => {
    const id = String(i + 1).padStart(3, '0');
    const bodyHTML = paper.body.map(p => `<p>${escapeHtml(p)}</p>`).join('\n');
    const cleanTitle = paper.title.replace(/^论文\s*\d+\s*\|\s*/, '');

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <title>${escapeHtml(cleanTitle)} · JUNNYOfficial Blog</title>
  <meta name="description" content="${escapeHtml(cleanTitle)}" />
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
          <p class="eyebrow">${escapeHtml(paper.category)}</p>
          <h1>${escapeHtml(cleanTitle)}</h1>
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

    fs.writeFileSync(path.join(papersDir, `paper-${id}.html`), html, 'utf-8');
  });

  const papersData = papers.map((p, i) => ({
    id: `f${i + 1}`,
    title: p.title.replace(/^论文\s*\d+\s*\|\s*/, ''),
    summary: p.body[2]?.slice(0, 80) + '...' || p.body[0]?.slice(0, 80) + '...' || '',
    tag: '论文',
    source: p.category,
    date: '2026年4月24日',
    reading: `${Math.max(3, Math.ceil(p.body.length / 2))} 分钟阅读`,
    body: p.body
  }));

  fs.writeFileSync(
    path.join(__dirname, '..', 'script-feishu.js'),
    `// 由 scripts/sync-feishu.js 自动生成 — 飞书文档同步数据
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
