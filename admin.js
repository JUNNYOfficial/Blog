// ===== 管理后台 =====

const AUTH_KEY = 'blog-admin-auth';
const PASSWORD_KEY = 'blog-admin-password';
const POSTS_KEY = 'blog-admin-posts';
const DEFAULT_PASSWORD = 'JunnyOfficial2026';

let adminPosts = [];
let feishuPosts = [];
let editingId = null;

// 初始化
function init() {
  const isAuthed = localStorage.getItem(AUTH_KEY) === '1';
  if (isAuthed) {
    showAdmin();
  }
}

// 登录
function handleLogin() {
  const input = document.getElementById('loginPassword');
  const error = document.getElementById('loginError');
  const storedPassword = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;

  if (input.value === storedPassword) {
    localStorage.setItem(AUTH_KEY, '1');
    error.style.display = 'none';
    showAdmin();
  } else {
    error.style.display = 'block';
    input.value = '';
  }
}

// 退出
function handleLogout() {
  localStorage.removeItem(AUTH_KEY);
  location.reload();
}

// 显示管理界面
function showAdmin() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminScreen').classList.add('is-active');
  loadData();
}

// 加载数据
function loadData() {
  // 优先从 localStorage 读取
  const stored = localStorage.getItem(POSTS_KEY);
  if (stored) {
    try {
      adminPosts = JSON.parse(stored);
    } catch (e) {
      console.error('parse stored posts failed', e);
    }
  }

  // 如果没有存储数据，从 script.js 的 posts 获取
  if (!adminPosts.length && typeof posts !== 'undefined') {
    adminPosts = JSON.parse(JSON.stringify(posts));
  }

  // 分离本地文章和飞书论文
  const local = adminPosts.filter(p => !String(p.id).startsWith('f'));
  feishuPosts = adminPosts.filter(p => String(p.id).startsWith('f'));

  // 更新统计
  document.getElementById('statTotal').textContent = adminPosts.length;
  document.getElementById('statLocal').textContent = local.length;
  document.getElementById('statFeishu').textContent = feishuPosts.length;
  document.getElementById('statDaily').textContent = local.filter(p => p.tag === '日常').length;

  renderArticlesTable(local);
  renderPapersTable(feishuPosts);
}

// 渲染文章列表
function renderArticlesTable(list) {
  const tbody = document.getElementById('articlesTableBody');
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-state">暂无文章</td></tr>';
    updateBatchCount();
    return;
  }

  tbody.innerHTML = list.map((post, index) => `
    <tr draggable="true" data-id="${escapeHtml(String(post.id))}" data-index="${index}">
      <td><input type="checkbox" class="row-check" value="${escapeHtml(String(post.id))}" onchange="updateBatchCount()" /></td>
      <td class="drag-handle" title="拖拽排序" style="cursor:grab;color:#ccc;font-size:1.1rem;">⋮⋮</td>
      <td>${escapeHtml(String(post.id))}</td>
      <td>${escapeHtml(post.title)}</td>
      <td><span class="tag-badge">${escapeHtml(post.tag || '')}</span></td>
      <td>${escapeHtml(post.date || '')}</td>
      <td>${escapeHtml(post.source || '本地')}</td>
      <td class="actions">
        <button onclick="openEditor('${post.id}')">编辑</button>
        <button class="danger" onclick="deleteArticle('${post.id}')">删除</button>
      </td>
    </tr>
  `).join('');

  // 绑定拖拽事件
  bindDragEvents(tbody);
  updateBatchCount();
}

// 拖拽排序
function bindDragEvents(tbody) {
  let dragSrcEl = null;
  const rows = tbody.querySelectorAll('tr');

  rows.forEach(row => {
    row.addEventListener('dragstart', (e) => {
      dragSrcEl = row;
      row.style.opacity = '0.4';
      e.dataTransfer.effectAllowed = 'move';
    });

    row.addEventListener('dragend', () => {
      rows.forEach(r => r.style.opacity = '1');
      dragSrcEl = null;
    });

    row.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      return false;
    });

    row.addEventListener('dragenter', (e) => {
      if (row !== dragSrcEl) row.style.borderTop = '2px solid #111';
    });

    row.addEventListener('dragleave', () => {
      row.style.borderTop = '';
    });

    row.addEventListener('drop', (e) => {
      e.stopPropagation();
      row.style.borderTop = '';
      if (dragSrcEl && dragSrcEl !== row) {
        const fromIndex = parseInt(dragSrcEl.dataset.index);
        const toIndex = parseInt(row.dataset.index);
        const item = adminPosts.splice(fromIndex, 1)[0];
        adminPosts.splice(toIndex, 0, item);
        localStorage.setItem(POSTS_KEY, JSON.stringify(adminPosts));
        loadData();
      }
      return false;
    });
  });
}

// 批量操作
function toggleSelectAll(checkbox) {
  document.querySelectorAll('#articlesTableBody .row-check').forEach(cb => {
    cb.checked = checkbox.checked;
  });
  updateBatchCount();
}

function getSelectedIds() {
  return Array.from(document.querySelectorAll('#articlesTableBody .row-check:checked')).map(cb => cb.value);
}

function updateBatchCount() {
  const ids = getSelectedIds();
  const batchActions = document.getElementById('batchActions');
  const batchCount = document.getElementById('batchCount');
  if (batchCount) batchCount.textContent = ids.length;
  if (batchActions) batchActions.style.display = ids.length > 0 ? 'flex' : 'none';
}

function batchDelete() {
  const ids = getSelectedIds();
  if (!ids.length) return;
  if (!confirm(`确定要删除选中的 ${ids.length} 篇文章吗？此操作不可恢复。`)) return;
  adminPosts = adminPosts.filter(p => !ids.includes(String(p.id)));
  localStorage.setItem(POSTS_KEY, JSON.stringify(adminPosts));
  document.getElementById('selectAll').checked = false;
  loadData();
}

function batchChangeTag() {
  const ids = getSelectedIds();
  if (!ids.length) return;
  const newTag = prompt('请输入新标签（论文 / 日常 / 设计）：', '日常');
  if (!newTag) return;
  adminPosts.forEach(p => {
    if (ids.includes(String(p.id))) p.tag = newTag;
  });
  localStorage.setItem(POSTS_KEY, JSON.stringify(adminPosts));
  document.getElementById('selectAll').checked = false;
  loadData();
}

// 渲染论文列表
function renderPapersTable(list) {
  const tbody = document.getElementById('papersTableBody');
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-state">暂无论文</td></tr>';
    return;
  }

  tbody.innerHTML = list.map(post => `
    <tr>
      <td>${escapeHtml(String(post.id))}</td>
      <td>${escapeHtml(post.title)}</td>
      <td>${escapeHtml(post.source || '')}</td>
      <td>${escapeHtml(post.date || '')}</td>
      <td class="actions">
        <button onclick="openEditor('${post.id}')">编辑摘要</button>
      </td>
    </tr>
  `).join('');
}

// 搜索过滤文章
function filterArticles(query) {
  const q = query.toLowerCase().trim();
  const local = adminPosts.filter(p => !String(p.id).startsWith('f'));
  const filtered = q ? local.filter(p => p.title.toLowerCase().includes(q)) : local;
  renderArticlesTable(filtered);
}

// 搜索过滤论文
function filterPapers(query) {
  const q = query.toLowerCase().trim();
  const filtered = q ? feishuPosts.filter(p => p.title.toLowerCase().includes(q)) : feishuPosts;
  renderPapersTable(filtered);
}

// 切换标签页
function switchTab(name) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('is-active', t.dataset.tab === name));
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.toggle('is-active', p.id === 'panel-' + name));
}

// 打开编辑器
function openEditor(id) {
  const isNew = !id;
  const post = isNew ? null : adminPosts.find(p => String(p.id) === String(id));

  editingId = isNew ? null : String(id);
  document.getElementById('editorTitle').textContent = isNew ? '新增文章' : '编辑文章';
  document.getElementById('editId').value = isNew ? '' : String(post.id);
  document.getElementById('editTitle').value = post ? post.title : '';
  document.getElementById('editTag').value = post ? (post.tag || '日常') : '日常';
  document.getElementById('editDate').value = post ? (post.date || '') : formatToday();
  document.getElementById('editReading').value = post ? (post.reading || '') : '5 分钟阅读';
  document.getElementById('editSummary').value = post ? (post.summary || '') : '';
  document.getElementById('editSource').value = post ? (post.source || '') : '';

  // 渲染正文段落输入
  const container = document.getElementById('bodyContainer');
  container.innerHTML = '';
  if (post && post.body && post.body.length) {
    post.body.forEach((text, i) => addBodyField(text, i));
  } else {
    addBodyField('', 0);
  }

  document.getElementById('editorModal').classList.add('is-open');
}

// 关闭编辑器
function closeEditor() {
  document.getElementById('editorModal').classList.remove('is-open');
  editingId = null;
}

// 添加正文段落输入框
function addBodyField(value, index) {
  const container = document.getElementById('bodyContainer');
  const div = document.createElement('div');
  div.className = 'body-array-item';
  div.innerHTML = `
    <input type="text" value="${escapeHtml(value || '')}" placeholder="段落内容" data-body-index="${index ?? container.children.length}" />
    <button type="button" onclick="this.parentElement.remove()">删除</button>
  `;
  container.appendChild(div);
}

// 保存文章
function saveArticle() {
  const title = document.getElementById('editTitle').value.trim();
  if (!title) {
    alert('请输入标题');
    return;
  }

  const tag = document.getElementById('editTag').value;
  const date = document.getElementById('editDate').value.trim();
  const reading = document.getElementById('editReading').value.trim();
  const summary = document.getElementById('editSummary').value.trim();
  const source = document.getElementById('editSource').value.trim();

  // 收集正文段落
  const body = [];
  document.querySelectorAll('#bodyContainer input').forEach(input => {
    const text = input.value.trim();
    if (text) body.push(text);
  });

  let post;
  if (editingId) {
    // 编辑现有文章
    const idx = adminPosts.findIndex(p => String(p.id) === editingId);
    if (idx === -1) return;
    post = adminPosts[idx];
    post.title = title;
    post.tag = tag;
    post.date = date;
    post.reading = reading;
    post.summary = summary;
    post.source = source || undefined;
    post.body = body;
  } else {
    // 新增文章
    const maxId = adminPosts
      .filter(p => !String(p.id).startsWith('f'))
      .reduce((max, p) => Math.max(max, parseInt(p.id) || 0), 0);
    post = {
      id: String(maxId + 1),
      title,
      summary,
      tag,
      date,
      reading,
      body
    };
    if (source) post.source = source;
    adminPosts.push(post);
  }

  // 保存到 localStorage
  localStorage.setItem(POSTS_KEY, JSON.stringify(adminPosts));

  // 刷新显示
  loadData();
  closeEditor();
}

// 删除文章
function deleteArticle(id) {
  if (!confirm('确定要删除这篇文章吗？')) return;
  adminPosts = adminPosts.filter(p => String(p.id) !== String(id));
  localStorage.setItem(POSTS_KEY, JSON.stringify(adminPosts));
  loadData();
}

// 预览文章
function previewArticle() {
  const title = document.getElementById('editTitle').value.trim() || '无标题';
  const tag = document.getElementById('editTag').value;
  const date = document.getElementById('editDate').value.trim() || formatToday();
  const reading = document.getElementById('editReading').value.trim() || '5 分钟阅读';
  const source = document.getElementById('editSource').value.trim();

  const body = [];
  document.querySelectorAll('#bodyContainer input').forEach(input => {
    const text = input.value.trim();
    if (text) body.push(text);
  });

  document.getElementById('previewTitle').textContent = title;
  document.getElementById('previewTag').textContent = source || tag;
  document.getElementById('previewDate').textContent = date;
  document.getElementById('previewReading').textContent = reading;
  document.getElementById('previewBody').innerHTML = body.map(p => `<p>${p}</p>`).join('') || '<p style="color:#999;">（暂无正文内容）</p>';

  document.getElementById('previewModal').classList.add('is-open');
}

function closePreview() {
  document.getElementById('previewModal').classList.remove('is-open');
}

// 修改密码
function changePassword() {
  const newPw = document.getElementById('newPassword').value;
  const confirmPw = document.getElementById('confirmPassword').value;
  const msg = document.getElementById('passwordMsg');

  if (!newPw) {
    msg.textContent = '请输入新密码';
    msg.style.color = '#c00';
    return;
  }
  if (newPw !== confirmPw) {
    msg.textContent = '两次输入的密码不一致';
    msg.style.color = '#c00';
    return;
  }

  localStorage.setItem(PASSWORD_KEY, newPw);
  msg.textContent = '密码已保存';
  msg.style.color = '#2a2';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmPassword').value = '';
}

// 显示导出弹窗
async function showExport() {
  document.getElementById('exportCode').value = '正在生成代码，请稍候...';
  document.getElementById('exportModal').classList.add('is-open');
  const code = await generateScriptJs();
  document.getElementById('exportCode').value = code;
}

function closeExport() {
  document.getElementById('exportModal').classList.remove('is-open');
}

function copyExport() {
  const textarea = document.getElementById('exportCode');
  textarea.select();
  document.execCommand('copy');
  alert('已复制到剪贴板');
}

// 生成完整的 script.js 代码
async function generateScriptJs() {
  try {
    const response = await fetch('script.js?v=22');
    let code = await response.text();

    // 生成新的 posts 数组代码
    const localPosts = adminPosts.filter(p => !String(p.id).startsWith('f'));
    const feishu = adminPosts.filter(p => String(p.id).startsWith('f'));

    let postsCode = 'const posts = [\n';

    // 本地文章
    localPosts.forEach((post, i) => {
      const bodyLines = (post.body || []).map(b => `      '${b.replace(/'/g, "\\'")}'`).join(',\n');
      const sourceLine = post.source ? `\n    source: '${post.source.replace(/'/g, "\\'")}',` : '';
      postsCode += `  {\n    id: '${post.id}',\n    title: '${post.title.replace(/'/g, "\\'")}',\n    summary: '${(post.summary || '').replace(/'/g, "\\'")}',\n    tag: '${post.tag || '日常'}',\n    date: '${post.date || ''}',\n    reading: '${post.reading || ''}',${sourceLine}\n    body: [\n${bodyLines}\n    ]\n  }${i < localPosts.length - 1 || feishu.length ? ',' : ''}\n`;
    });

    // 飞书论文
    feishu.forEach((post, i) => {
      const bodyLines = (post.body || []).map(b => `      "${b.replace(/"/g, '\\"')}"`).join(',\n');
      const sourceLine = post.source ? `\n    "source": "${post.source.replace(/"/g, '\\"')}",` : '';
      postsCode += `  {\n    "id": "${post.id}",\n    "title": "${post.title.replace(/"/g, '\\"')}",\n    "summary": "${(post.summary || '').replace(/"/g, '\\"')}",\n    "tag": "${post.tag || '论文'}",${sourceLine}\n    "date": "${post.date || ''}",\n    "reading": "${post.reading || ''}",\n    "body": [\n${bodyLines}\n    ]\n  }${i < feishu.length - 1 ? ',' : ''}\n`;
    });

    postsCode += '];\n';

    // 替换 posts 数组定义
    const startIdx = code.indexOf('const posts = [');
    const endIdx = code.indexOf('];', startIdx) + 2;
    if (startIdx !== -1 && endIdx > startIdx) {
      code = code.slice(0, startIdx) + postsCode + code.slice(endIdx);
    }

    return code;
  } catch (e) {
    console.error('生成代码失败:', e);
    return '// 生成失败，请刷新后重试';
  }
}

// 工具函数
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatToday() {
  const d = new Date();
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/* ===== 手机同步 ===== */
let currentSyncUrl = '';

function generateSyncQR() {
  const stored = localStorage.getItem(POSTS_KEY) || '[]';
  const data = JSON.parse(stored);

  if (!data.length) {
    alert('当前没有可同步的文章，请先在「文章管理」中添加文章。');
    return;
  }

  // LZString 压缩数据
  const compressed = LZString.compressToEncodedURIComponent(stored);

  // 构建同步 URL（基于当前页面路径）
  const base = location.href.replace('admin.html', 'sync.html');
  currentSyncUrl = `${base}?d=${compressed}`;

  const qrArea = document.getElementById('syncQRArea');
  const qrContainer = document.getElementById('syncQrcode');
  qrContainer.innerHTML = '';
  qrArea.style.display = 'block';

  // 显示链接长度提示
  const lenEl = document.getElementById('syncUrlLength');
  const urlLen = currentSyncUrl.length;

  // 二维码容量上限约 2000~3000 字符（取决于编码等级）
  if (urlLen > 2500) {
    lenEl.innerHTML = `<strong>数据量过大（${urlLen} 字符），二维码无法容纳。</strong><br>请使用「导出 JSON 文件」方式，或复制链接发送到手机（部分浏览器可能截断超长链接）。`;
    lenEl.style.color = '#991b1b';
    document.getElementById('syncCopyMsg').textContent = '';
    return; // 不生成二维码
  }

  if (urlLen > 1000) {
    lenEl.textContent = `链接长度 ${urlLen} 字符，请将手机靠近扫码。`;
    lenEl.style.color = '#8f8f8f';
  } else {
    lenEl.textContent = `链接长度 ${urlLen} 字符，扫码即可同步。`;
    lenEl.style.color = '#8f8f8f';
  }

  // 重置复制提示
  document.getElementById('syncCopyMsg').textContent = '';

  // 生成二维码
  try {
    new QRCode(qrContainer, {
      text: currentSyncUrl,
      width: 220,
      height: 220,
      colorDark: '#111111',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch (e) {
    qrContainer.innerHTML = '<p style="color:#c00;">二维码生成失败，请使用「复制链接」或「导出 JSON」方式</p>';
  }
}

function exportJSON() {
  const stored = localStorage.getItem(POSTS_KEY) || '[]';
  const data = JSON.parse(stored);
  if (!data.length) {
    alert('当前没有可导出的文章');
    return;
  }
  const blob = new Blob([stored], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `blog-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function copySyncUrl() {
  if (!currentSyncUrl) {
    alert('请先生成同步二维码');
    return;
  }
  navigator.clipboard.writeText(currentSyncUrl).then(() => {
    const msg = document.getElementById('syncCopyMsg');
    msg.textContent = '✅ 已复制到剪贴板，请通过微信/邮件发送到手机打开';
    msg.style.color = '#166534';
  }).catch(() => {
    const msg = document.getElementById('syncCopyMsg');
    msg.textContent = '复制失败，请手动选中链接复制';
    msg.style.color = '#991b1b';
  });
}

/* ===== GitHub 发布 ===== */
const GITHUB_TOKEN_KEY = 'blog-github-token';
const GITHUB_CONFIG_KEY = 'blog-github-config';

function getGitHubConfig() {
  const defaults = { owner: 'JUNNYOfficial', repo: 'Blog', path: 'posts.json', branch: 'main' };
  try {
    const saved = JSON.parse(localStorage.getItem(GITHUB_CONFIG_KEY) || '{}');
    return { ...defaults, ...saved };
  } catch (e) {
    return defaults;
  }
}

function saveGitHubConfig() {
  const cfg = {
    owner: document.getElementById('githubOwner').value.trim() || 'JUNNYOfficial',
    repo: document.getElementById('githubRepo').value.trim() || 'Blog',
    path: document.getElementById('githubPath').value.trim() || 'posts.json',
    branch: document.getElementById('githubBranch').value.trim() || 'main'
  };
  localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(cfg));
  const msg = document.getElementById('configMsg');
  msg.textContent = '✅ 仓库配置已保存';
  msg.style.color = '#166534';
}

function saveGitHubToken() {
  const token = document.getElementById('githubToken').value.trim();
  if (!token) {
    const msg = document.getElementById('tokenMsg');
    msg.textContent = '请输入 Token';
    msg.style.color = '#991b1b';
    return;
  }
  localStorage.setItem(GITHUB_TOKEN_KEY, token);
  const msg = document.getElementById('tokenMsg');
  msg.textContent = '✅ Token 已保存到本设备';
  msg.style.color = '#166534';
}

async function publishToGitHub() {
  const token = localStorage.getItem(GITHUB_TOKEN_KEY);
  if (!token) {
    alert('请先保存 GitHub Token（在「设置」标签页中配置）');
    switchTab('settings');
    return;
  }

  const stored = localStorage.getItem(POSTS_KEY) || '[]';
  const data = JSON.parse(stored);
  if (!data.length) {
    alert('当前没有可发布的文章');
    return;
  }

  const btn = document.querySelector('.admin-actions button[onclick="publishToGitHub()"]');
  const originalText = btn ? btn.textContent : '发布到 GitHub';
  if (btn) {
    btn.textContent = '发布中...';
    btn.disabled = true;
  }

  try {
    const cfg = getGitHubConfig();
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));

    // 获取现有文件 sha（如果文件已存在）
    let sha = null;
    const getRes = await fetch(
      `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${cfg.path}?ref=${cfg.branch}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }
    );
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    // 构建请求体：创建新文件时不传 sha
    const body = {
      message: 'Update posts from admin',
      content: content,
      branch: cfg.branch
    };
    if (sha) body.sha = sha;

    // 提交/更新文件
    const putRes = await fetch(
      `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${cfg.path}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );

    if (putRes.ok) {
      alert('✅ 发布成功！\n\n约 1-3 分钟后 GitHub Pages 会自动重新部署，所有设备刷新页面即可看到最新文章。');
    } else {
      const err = await putRes.json();
      alert(`❌ 发布失败（HTTP ${putRes.status}）：${err.message || '未知错误'}\n\n请检查：\n1. Token 是否勾选了 repo 权限\n2. 仓库路径是否正确（设置里可修改）\n3. 分支名是否正确`);
    }
  } catch (e) {
    alert('❌ 发布失败：' + e.message);
  } finally {
    if (btn) {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  }
}

// 回车登录
document.addEventListener('DOMContentLoaded', () => {
  init();

  // 加载已保存的 GitHub Token
  const savedToken = localStorage.getItem(GITHUB_TOKEN_KEY);
  const tokenInput = document.getElementById('githubToken');
  if (savedToken && tokenInput) {
    tokenInput.value = savedToken;
  }

  // 加载已保存的仓库配置
  const cfg = getGitHubConfig();
  const ownerInput = document.getElementById('githubOwner');
  const repoInput = document.getElementById('githubRepo');
  const pathInput = document.getElementById('githubPath');
  const branchInput = document.getElementById('githubBranch');
  if (ownerInput) ownerInput.value = cfg.owner;
  if (repoInput) repoInput.value = cfg.repo;
  if (pathInput) pathInput.value = cfg.path;
  if (branchInput) branchInput.value = cfg.branch;

  const pwInput = document.getElementById('loginPassword');
  if (pwInput) {
    pwInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleLogin();
    });
  }
});
