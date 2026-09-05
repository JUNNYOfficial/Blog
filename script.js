// 文章数据：优先从 posts-data.js（<script> 标签加载，file:// 兼容）读取
const posts = (window.POSTS_DATA ? [...window.POSTS_DATA] : []);


// 管理后台：从 localStorage 读取覆盖数据
(function() {
  try {
    const stored = localStorage.getItem('blog-admin-posts');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length) {
        posts.length = 0;
        parsed.forEach(p => posts.push(p));
      }
    }
  } catch (e) {
    console.error('Admin posts override failed:', e);
  }
})();

// 从远程 posts.json 热更新（仅 http 服务器环境下生效；file:// 下静默跳过）
async function loadRemotePosts() {
  try {
    const res = await fetch('posts.json?t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) return;
    const remote = await res.json();
    if (!Array.isArray(remote) || !remote.length) return;
    posts.length = 0;
    remote.forEach(p => posts.push(p));
  } catch (e) {
    // file:// 协议下 fetch 会被阻止，此时依赖已加载的 POSTS_DATA，无需报错
  }
}

// HTML 转义：防止文章数据通过 innerHTML 注入
function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createArticleCard(post) {
  const card = document.createElement('a');
  card.className = 'article-card';
  card.href = getPostUrl(post);
  card.innerHTML = `
    <p class="eyebrow">${escapeHtml(post.tag)}</p>
    <h2 class="article-card-title">${escapeHtml(post.title)}</h2>
    <p class="article-card-summary">${escapeHtml(post.summary)}</p>
    <div class="article-card-footer">
      <span>${escapeHtml(post.date)}</span>
      <span>${escapeHtml(post.reading)}</span>
    </div>
  `;
  return card;
}

function getPostUrl(post) {
  if (post.id && post.id.startsWith('f')) {
    const num = post.id.slice(1).padStart(3, '0');
    return `papers/paper-${num}.html`;
  }
  return `article.html?id=${post.id}`;
}

function parseChineseDate(dateStr) {
  const m = String(dateStr).match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!m) return 0;
  return new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10)).getTime();
}

function getYearFromDate(dateStr) {
  const m = String(dateStr).match(/(\d{4})年/);
  return m ? m[1] : '其他';
}

function groupPostsByYear(list) {
  const groups = {};
  list.forEach(post => {
    const year = getYearFromDate(post.date);
    if (!groups[year]) groups[year] = [];
    groups[year].push(post);
  });
  return groups;
}

function sortPostsByDate(list) {
  return [...list].sort((a, b) => parseChineseDate(b.date) - parseChineseDate(a.date));
}

function renderArticleCards(list) {
  const grid = document.getElementById('articleGrid');
  if (!grid) return;
  grid.innerHTML = '';
  if (!list.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = '暂无文章，稍后再来看看。';
    grid.appendChild(empty);
    return;
  }
  list.forEach(post => grid.appendChild(createArticleCard(post)));
}

function setActiveFilter(selectedTag) {
  document.querySelectorAll('.pill').forEach(pill => {
    pill.classList.toggle('active', pill.textContent === selectedTag);
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => {
    toast.classList.remove('visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 1800);
}

function setSectionObserver() {
  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
          link.classList.toggle('active', entry.isIntersecting);
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach(section => observer.observe(section));
}

function renderDaily() {
  const dailyPosts = posts.filter(post => post.tag === '日常');
  const grid = document.getElementById('dailyGrid');
  if (!grid) return;

  grid.innerHTML = '';
  if (!dailyPosts.length) {
    grid.innerHTML = '<p style="color:#8f8f8f;text-align:center;padding:24px;">暂无记录</p>';
    return;
  }

  dailyPosts.forEach(post => {
    const card = document.createElement('a');
    card.className = 'daily-card';
    card.href = `article.html?id=${post.id}`;
    card.innerHTML = `
      <h4>${escapeHtml(post.title)}</h4>
      <p>${escapeHtml(post.summary)}</p>
    `;
    grid.appendChild(card);
  });
}

function renderDailyPosts() {
  const dailyPosts = posts.filter(post => post.tag === '日常');
  const grid = document.getElementById('dailyPostsGrid');
  const totalPostsEl = document.getElementById('totalPosts');
  const todayPostsEl = document.getElementById('todayPosts');

  if (!grid) return;

  // Update stats
  if (totalPostsEl) totalPostsEl.textContent = dailyPosts.length;
  if (todayPostsEl) {
    const d = new Date();
    const today = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    const todayCount = dailyPosts.filter(post => post.date === today).length;
    todayPostsEl.textContent = todayCount;
  }

  grid.innerHTML = '';
  if (!dailyPosts.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-daily';
    empty.innerHTML = `
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3>暂无日常记录</h3>
      <p>新的灵感和观察正在路上...</p>
    `;
    grid.appendChild(empty);
    return;
  }

  dailyPosts.forEach((post, index) => {
    const card = document.createElement('article');
    card.className = 'daily-post-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <div class="daily-post-header">
        <div class="daily-post-meta">
          <span class="daily-date">${escapeHtml(post.date)}</span>
          <span class="daily-reading">${escapeHtml(post.reading)}</span>
        </div>
        <div class="daily-post-type">
          <span class="type-badge">日常</span>
        </div>
      </div>
      <h3 class="daily-post-title">${escapeHtml(post.title)}</h3>
      <p class="daily-post-summary">${escapeHtml(post.summary)}</p>
      <div class="daily-post-actions">
        <a href="${getPostUrl(post)}" class="read-more-link">
          <span>继续阅读</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7V17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderHome() {
  const grid = document.getElementById('homeArticleGrid');
  if (!grid) return;

  const latest = sortPostsByDate(posts).slice(0, 2);
  grid.innerHTML = '';
  if (!latest.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = '暂无文章，稍后再来看看。';
    grid.appendChild(empty);
    return;
  }
  latest.forEach(post => grid.appendChild(createArticleCard(post)));

  const countEl = document.getElementById('homeArticleCount');
  if (countEl) countEl.textContent = posts.length;
}

function renderAllArticles() {
  const content = document.getElementById('articleWikiContent');
  const treeNav = document.getElementById('articlesWikiTree');
  const yearNav = document.getElementById('articlesYearNav');
  const legacyGrid = document.getElementById('articleGrid');

  // 兼容旧版 articles.html（无 wiki 结构时）
  if (!content || !treeNav || !yearNav) {
    if (!legacyGrid) return;
    legacyGrid.innerHTML = '';
    const sorted = sortPostsByDate(posts);
    if (!sorted.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = '暂无文章，稍后再来看看。';
      legacyGrid.appendChild(empty);
      return;
    }
    sorted.forEach(post => legacyGrid.appendChild(createArticleCard(post)));
    return;
  }

  const sorted = sortPostsByDate(posts);
  const paperTag = '论文';
  let selectedTag = '全部';
  let selectedSource = null;

  function filterPosts() {
    if (selectedTag === '全部') return sorted;
    if (selectedTag === paperTag && selectedSource) {
      return sorted.filter(p => p.tag === paperTag && p.source === selectedSource);
    }
    return sorted.filter(p => p.tag === selectedTag);
  }

  function buildWikiTree() {
    treeNav.innerHTML = '';
    const rootUl = document.createElement('ul');
    rootUl.className = 'wiki-tree-list';

    // 全部文章
    const allLi = document.createElement('li');
    const allLink = document.createElement('a');
    allLink.href = 'articles.html';
    allLink.className = 'wiki-tree-link' + (selectedTag === '全部' ? ' active' : '');
    allLink.textContent = '全部文章';
    allLink.addEventListener('click', (e) => {
      e.preventDefault();
      selectedTag = '全部';
      selectedSource = null;
      buildWikiTree();
      renderContent();
    });
    allLi.appendChild(allLink);
    rootUl.appendChild(allLi);

    // 按标签分组
    const tags = Array.from(new Set(sorted.map(p => p.tag).filter(Boolean)));
    tags.forEach(tag => {
      const tagPosts = sorted.filter(p => p.tag === tag);
      const isPaper = tag === paperTag;

      const tagLi = document.createElement('li');
      tagLi.className = 'wiki-tree-section';

      const tagBtn = document.createElement('button');
      tagBtn.className = 'wiki-tree-toggle' + (selectedTag === tag && !selectedSource ? ' active' : '');
      tagBtn.type = 'button';
      tagBtn.setAttribute('aria-expanded', 'true');
      tagBtn.innerHTML = `<span>${escapeHtml(tag)}</span><span class="wiki-tree-count">${tagPosts.length}</span>`;
      tagBtn.addEventListener('click', () => {
        selectedTag = tag;
        selectedSource = null;
        buildWikiTree();
        renderContent();
      });
      tagLi.appendChild(tagBtn);

      const childrenUl = document.createElement('ul');
      childrenUl.className = 'wiki-tree-children';

      if (isPaper) {
        // 论文再按 source 分组
        const sources = Array.from(new Set(tagPosts.map(p => p.source).filter(Boolean)));
        sources.forEach(source => {
          const sourcePosts = tagPosts.filter(p => p.source === source);
          const sourceLi = document.createElement('li');
          sourceLi.className = 'wiki-tree-subsection';

          const sourceBtn = document.createElement('button');
          sourceBtn.className = 'wiki-tree-toggle wiki-tree-subtoggle' + (selectedTag === paperTag && selectedSource === source ? ' active' : '');
          sourceBtn.type = 'button';
          sourceBtn.setAttribute('aria-expanded', 'true');
          sourceBtn.innerHTML = `<span>${escapeHtml(source)}</span><span class="wiki-tree-count">${sourcePosts.length}</span>`;
          sourceBtn.addEventListener('click', () => {
            selectedTag = paperTag;
            selectedSource = source;
            buildWikiTree();
            renderContent();
          });
          sourceLi.appendChild(sourceBtn);

          const sourceChildren = document.createElement('ul');
          sourceChildren.className = 'wiki-tree-leaves';
          sourcePosts.forEach(post => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = getPostUrl(post);
            a.className = 'wiki-tree-leaf';
            a.textContent = escapeHtml(post.title);
            li.appendChild(a);
            sourceChildren.appendChild(li);
          });
          sourceLi.appendChild(sourceChildren);
          childrenUl.appendChild(sourceLi);
        });
      } else {
        tagPosts.forEach(post => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = getPostUrl(post);
          a.className = 'wiki-tree-leaf';
          a.textContent = escapeHtml(post.title);
          li.appendChild(a);
          childrenUl.appendChild(li);
        });
      }

      tagLi.appendChild(childrenUl);
      rootUl.appendChild(tagLi);
    });

    treeNav.appendChild(rootUl);
  }

  function renderYearsNav(filtered) {
    yearNav.innerHTML = '';
    const groups = groupPostsByYear(filtered);
    const years = Object.keys(groups).sort((a, b) => b - a);
    if (!years.length) return;
    years.forEach(year => {
      const a = document.createElement('a');
      a.href = `#year-${year}`;
      a.className = 'wiki-nav-link';
      a.textContent = `${year} 年`;
      yearNav.appendChild(a);
    });
  }

  function renderContent() {
    const filtered = filterPosts();
    content.innerHTML = '';

    if (!filtered.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = '暂无文章，稍后再来看看。';
      content.appendChild(empty);
      renderYearsNav(filtered);
      return;
    }

    const groups = groupPostsByYear(filtered);
    const years = Object.keys(groups).sort((a, b) => b - a);

    years.forEach(year => {
      const section = document.createElement('section');
      section.className = 'articles-wiki-year';
      section.id = `year-${year}`;

      const header = document.createElement('div');
      header.className = 'articles-wiki-year-header';
      header.innerHTML = `<h3>${escapeHtml(year)} 年</h3><span class="articles-wiki-count">${groups[year].length} 篇</span>`;
      section.appendChild(header);

      const list = document.createElement('div');
      list.className = 'article-list-grid';
      groups[year].forEach(post => list.appendChild(createArticleCard(post)));
      section.appendChild(list);

      content.appendChild(section);
    });

    renderYearsNav(filtered);
  }

  buildWikiTree();
  renderContent();

  // 移动端展开/折叠文档树
  const treeToggle = document.getElementById('wikiTreeToggle');
  if (treeToggle) {
    treeToggle.addEventListener('click', () => {
      const isOpen = treeNav.classList.toggle('is-open');
      treeToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
}

function handleShare() {
  const shareButton = document.querySelector('.icon-button');
  if (!shareButton) return;
  shareButton.addEventListener('click', () => {
    const shareData = {
      title: document.getElementById('articleTitle')?.textContent || 'zhilinOfficial Blog',
      text: '分享一篇极简设计与阅读风格的文章。',
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => showToast('分享已取消'));
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('链接已复制，可粘贴分享');
      });
    }
  });
}

function renderArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '1';
  const article = posts.find(item => item.id === id) || posts[0];
  const title = document.getElementById('articleTitle');
  const tag = document.getElementById('articleTag');
  const date = document.getElementById('articleDate');
  const reading = document.getElementById('articleReading');
  const body = document.getElementById('articleBody');
  const related = document.getElementById('relatedList');
  const nav = document.getElementById('articleNav');
  const readCountEl = document.getElementById('readCount');

  if (!title || !tag || !date || !reading || !body) return;

  title.textContent = article.title;
  tag.textContent = article.source || article.tag;
  date.textContent = article.date;
  reading.textContent = article.reading;
  // 渲染正文：识别「一、二、三、」式小标题，转为可跳转的 h4 并生成目录
  const headingRe = /^[一二三四五六七八九十]+、/;
  const tocHeadings = [];
  body.innerHTML = article.body.map(paragraph => {
    const t = paragraph.trim();
    if (headingRe.test(t)) {
      const idx = tocHeadings.length;
      const id = `sec-${idx}`;
      tocHeadings.push({ id, text: t });
      return `<h4 class="article-heading" id="${id}">${escapeHtml(paragraph)}</h4>`;
    }
    return `<p>${escapeHtml(paragraph)}</p>`;
  }).join('');

  // 填充目录（复用论文页 .article-toc 样式；无小节则隐藏空卡片）
  const tocEl = document.getElementById('articleToc');
  if (tocEl) {
    if (tocHeadings.length >= 2) {
      tocEl.innerHTML = '<p class="eyebrow">目录</p><ul>' +
        tocHeadings.map(h => `<li><a href="#${h.id}">${escapeHtml(h.text)}</a></li>`).join('') +
        '</ul>';
    } else {
      tocEl.style.display = 'none';
    }
  }

  // 动态更新标题与社交分享 meta（article.html 是 JS 渲染壳，静态 meta 是通用的）
  document.title = `${article.title} · zhilinOfficial Blog`;
  const descText = article.summary || article.body[0]?.slice(0, 120) || '';
  const setMeta = (selector, attr, val) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, val);
  };
  setMeta('meta[name="description"]', 'content', descText);
  setMeta('meta[property="og:title"]', 'content', `${article.title} · zhilinOfficial Blog`);
  setMeta('meta[property="og:description"]', 'content', descText);
  setMeta('meta[property="og:url"]', 'content', `${location.origin}${location.pathname}?id=${article.id}`);

  if (related) {
    posts.filter(item => item.id !== article.id).slice(0, 5).forEach(post => {
      const item = document.createElement('a');
      item.className = 'related-item';
      item.href = getPostUrl(post);
      item.innerHTML = `
        <h4 class="related-item-title">${escapeHtml(post.title)}</h4>
        <p class="related-item-meta">${escapeHtml(post.tag)} · ${escapeHtml(post.date)}</p>
      `;
      related.appendChild(item);
    });
  }

  // 上一篇 / 下一篇导航
  if (nav) {
    const currentIndex = posts.findIndex(p => String(p.id) === String(article.id));
    const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

    nav.innerHTML = `
      <div class="article-nav">
        ${prevPost ? `<a href="${getPostUrl(prevPost)}">
          <span class="article-nav-label">← 上一篇</span>
          <span class="article-nav-title">${escapeHtml(prevPost.title)}</span>
        </a>` : '<span></span>'}
        ${nextPost ? `<a href="${getPostUrl(nextPost)}" class="article-nav-next">
          <span class="article-nav-label">下一篇 →</span>
          <span class="article-nav-title">${escapeHtml(nextPost.title)}</span>
        </a>` : '<span></span>'}
      </div>
    `;
  }

  // 阅读次数（本地计数，不依赖第三方服务）
  if (readCountEl) {
    const key = `read-count-${article.id}`;
    const n = (parseInt(localStorage.getItem(key) || '0', 10) || 0) + 1;
    localStorage.setItem(key, String(n));
    readCountEl.textContent = `本文你已阅读 ${n} 次`;
  }
}

function renderNotes() {
  const sidebarNav = document.getElementById('notesSidebarNav');
  const content = document.getElementById('notesContent');
  const searchInput = document.getElementById('paperSearch');
  if (!sidebarNav || !content) return;

  const allPapers = posts.filter(post => post.id.startsWith('f'));
  let currentQuery = '';

  function render(query) {
    currentQuery = query;
    const papers = query
      ? allPapers.filter(p => {
          const q = query.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            (p.summary || '').toLowerCase().includes(q) ||
            (p.source || '').toLowerCase().includes(q) ||
            (p.body || []).some(b => b.toLowerCase().includes(q))
          );
        })
      : allPapers;

    // 按 source 分组
    const groups = {};
    papers.forEach(p => {
      const key = p.source || '论文库';
      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    });

    const categories = Object.keys(groups);

    // 渲染侧边栏导航
    sidebarNav.innerHTML = '';
    if (!query) {
      categories.forEach(cat => {
        const anchor = document.createElement('a');
        anchor.href = `#cat-${cat.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-')}`;
        anchor.textContent = cat;
        sidebarNav.appendChild(anchor);
      });
    } else {
      const info = document.createElement('span');
      info.textContent = `找到 ${papers.length} 篇`;
      info.style.cssText = 'font-size:0.85rem;color:#8f8f8f;padding:8px 14px;';
      sidebarNav.appendChild(info);
    }

    // 渲染内容区
    content.innerHTML = '';

    if (papers.length === 0) {
      content.innerHTML = `
        <div class="panel-section" style="text-align:center;padding:48px 24px;">
          <p style="color:#8f8f8f;font-size:1.1rem;margin-bottom:8px;">未找到与「${escapeHtml(query)}」相关的论文</p>
          <p style="color:#aaa;font-size:0.9rem;">试试其他关键词，或清除搜索查看全部</p>
        </div>
      `;
      return;
    }

    categories.forEach(cat => {
      const section = document.createElement('section');
      section.className = 'notes-category-section panel-section';
      section.id = `cat-${cat.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-')}`;

      const header = document.createElement('div');
      header.className = 'notes-category-header';
      header.innerHTML = `
        <p class="eyebrow">${groups[cat].length} 篇</p>
        <h3>${escapeHtml(cat)}</h3>
      `;
      section.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'notes-category-grid';

      const groupPapers = groups[cat];
      const previewCount = 2;
      const hasMore = groupPapers.length > previewCount;

      // 渲染预览卡片（前2篇）
      groupPapers.slice(0, previewCount).forEach(post => {
        const card = document.createElement('a');
        card.className = 'note-card';
        card.href = getPostUrl(post);
        card.innerHTML = `
          <h4>${escapeHtml(post.title)}</h4>
          <p>${escapeHtml(post.summary)}</p>
          <div class="note-card-footer">
            <span>${escapeHtml(post.date)}</span>
            <span>${escapeHtml(post.reading)}</span>
          </div>
        `;
        grid.appendChild(card);
      });

      section.appendChild(grid);

      // 如果有更多，添加展开区域和按钮
      if (hasMore) {
        const expandGrid = document.createElement('div');
        expandGrid.className = 'notes-category-grid notes-category-expand';
        expandGrid.style.display = 'none';

        groupPapers.slice(previewCount).forEach(post => {
          const card = document.createElement('a');
          card.className = 'note-card';
          card.href = getPostUrl(post);
          card.innerHTML = `
            <h4>${escapeHtml(post.title)}</h4>
            <p>${escapeHtml(post.summary)}</p>
            <div class="note-card-footer">
              <span>${escapeHtml(post.date)}</span>
              <span>${escapeHtml(post.reading)}</span>
            </div>
          `;
          expandGrid.appendChild(card);
        });

        section.appendChild(expandGrid);

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'notes-expand-btn';
        toggleBtn.textContent = `查看全部 ${groupPapers.length} 篇`;
        toggleBtn.addEventListener('click', () => {
          const isExpanded = expandGrid.style.display !== 'none';
          expandGrid.style.display = isExpanded ? 'none' : 'grid';
          toggleBtn.textContent = isExpanded ? `查看全部 ${groupPapers.length} 篇` : '收起';
        });
        section.appendChild(toggleBtn);
      }

      content.appendChild(section);
    });
  }

  render('');

  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => render(e.target.value.trim()), 150);
    });
  }
}

/* ===== 全局搜索入口（自动注入到所有页面导航） ===== */
(function () {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;
  if (nav.querySelector('a[href="search.html"]')) return;
  const adminLink = nav.querySelector('a[href="admin.html"]');
  const searchLink = document.createElement('a');
  searchLink.href = 'search.html';
  searchLink.textContent = '搜索';
  if (adminLink) {
    nav.insertBefore(searchLink, adminLink);
  } else {
    nav.appendChild(searchLink);
  }
})();

/* ===== 返回顶部按钮 ===== */
(function () {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', '返回顶部');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
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

/* ===== 文章阅读进度条 ===== */
(function () {
  const bar = document.querySelector('.reading-progress-bar');
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { update(); ticking = false; });
      ticking = true;
    }
  });
  window.addEventListener('resize', update);
  update();
})();

/* ===== 深色模式 ===== */
(function initDarkMode() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // 显式三态：'dark' / 'light' 为用户选择，null 才跟随系统
  const isDark = saved ? saved === 'dark' : prefersDark;
  if (saved === 'light') {
    document.body.dataset.theme = 'light';
  } else if (isDark) {
    document.body.dataset.theme = 'dark';
  }

  function makePill() {
    const pill = document.createElement('div');
    pill.className = 'theme-pill';
    pill.innerHTML = `
      <button class="${isDark ? 'active' : ''}" data-mode="dark">深</button>
      <button class="${isDark ? '' : 'active'}" data-mode="light">浅</button>
    `;
    pill.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        document.body.dataset.theme = mode;
        localStorage.setItem('theme', mode);
        pill.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
      });
    });
    return pill;
  }

  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const brand = topbar.querySelector('.brand');
    const nav = topbar.querySelector('.nav-links');
    if (brand && nav) {
      const row1 = document.createElement('div');
      row1.className = 'topbar-row';
      const row2 = document.createElement('div');
      row2.className = 'nav-row';
      row1.appendChild(brand);
      row1.appendChild(makePill());
      row2.appendChild(nav);
      topbar.innerHTML = '';
      topbar.appendChild(row1);
      topbar.appendChild(row2);
      return;
    }
  }

  const articleHeader = document.querySelector('.article-header');
  if (articleHeader) {
    articleHeader.appendChild(makePill());
    return;
  }

  const adminHeader = document.querySelector('.admin-header');
  if (adminHeader) {
    adminHeader.appendChild(makePill());
  }
})();

/* ===== 图片点击放大（统一灯箱，覆盖 .article-body 及其他内容区图片）===== */
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'img-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = '<img alt="放大查看" />';
  document.body.appendChild(overlay);
  const lbImg = overlay.querySelector('img');
  const close = () => { overlay.classList.remove('active'); overlay.setAttribute('aria-hidden', 'true'); };
  overlay.addEventListener('click', close);
  document.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    if (img.classList.contains('brand-mark')) return;
    if (img.closest('.img-overlay')) return;
    if (img.width < 80 && img.height < 80) return;
    lbImg.src = img.currentSrc || img.src;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) close();
  });
})();

function renderSearch() {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  const info = document.getElementById('searchInfo');
  if (!input || !results) return;

  function doSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      results.innerHTML = '';
      if (info) info.textContent = '';
      return;
    }
    const filtered = posts.filter(p => {
      return (
        p.title.toLowerCase().includes(q) ||
        (p.summary || '').toLowerCase().includes(q) ||
        (p.source || '').toLowerCase().includes(q) ||
        (p.body || []).some(b => b.toLowerCase().includes(q))
      );
    });

    results.innerHTML = '';
    if (info) info.textContent = `找到 ${filtered.length} 篇相关文章`;

    if (!filtered.length) {
      results.innerHTML = `
        <div class="search-empty">
          <h3>未找到相关文章</h3>
          <p>试试其他关键词</p>
        </div>
      `;
      return;
    }
    filtered.forEach(post => results.appendChild(createArticleCard(post)));
  }

  let searchDebounce;
  input.addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => doSearch(e.target.value), 150);
  });

  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q') || '';
  if (initialQuery) {
    input.value = initialQuery;
    doSearch(initialQuery);
  } else {
    input.focus();
  }
}

async function initPage() {
  await loadRemotePosts();
  const page = document.body.dataset.page;
  if (page === 'home') renderHome();
  else if (page === 'articles') renderAllArticles();
  else if (page === 'article') renderArticle();
  else if (page === 'daily') renderDaily();
  else if (page === 'daily-posts') renderDailyPosts();
  else if (page === 'notes') renderNotes();
  else if (page === 'search') renderSearch();
  else if (page === 'about') renderAboutStats();
}
initPage();

/* ===== 键盘快捷键（/ 搜索 · ←→ 翻页 · Esc 关灯箱）===== */
(function () {
  document.addEventListener('keydown', (e) => {
    const typing = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable;
    if (e.key === '/' && !typing) {
      const s = document.getElementById('paperSearch') || document.getElementById('searchInput');
      if (s) { e.preventDefault(); s.focus(); }
      return;
    }
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const nav = document.getElementById('articleNav');
      if (!nav) return;
      const links = nav.querySelectorAll('a[href]');
      if (!links.length) return;
      const target = e.key === 'ArrowLeft' ? links[0] : links[links.length - 1];
      if (target) location.href = target.href;
    }
  });
})();

/* ===== 阅读进度记忆（localStorage，自动回到上次位置）===== */
(function () {
  const key = 'read-progress:' + location.pathname + location.search;
  let tries = 0;
  (function restore() {
    const saved = parseFloat(localStorage.getItem(key));
    if (!(saved > 0 && saved < 0.95)) return;
    const max = document.body.scrollHeight - window.innerHeight;
    if (max > 240 || tries++ > 30) { window.scrollTo(0, Math.round(saved * max)); return; }
    requestAnimationFrame(restore);
  })();
  let ticking;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max > 0) localStorage.setItem(key, String(window.scrollY / max));
      ticking = false;
    });
  }, { passive: true });
})();

/* ===== About 页站点数据 ===== */
function renderAboutStats() {
  const grid = document.getElementById('statsGrid');
  if (!grid || !posts.length) return;
  const total = posts.length;
  const papers = posts.filter(p => p.id.startsWith('f')).length;
  const daily = total - papers;
  const totalChars = posts.reduce((sum, p) => sum + (p.body || []).join('').length, 0);
  const readMin = Math.round(totalChars / 400);
  const fmt = n => n >= 10000 ? (n / 10000).toFixed(1) + ' 万' : String(n);
  grid.innerHTML = [
    ['文章总数', total],
    ['论文笔记', papers],
    ['日常记录', daily],
    ['累计字数', fmt(totalChars)],
    ['预计阅读', readMin + ' 分钟'],
  ].map(([label, val]) => `<div class="stat-item"><span class="stat-num">${val}</span><span class="stat-label">${label}</span></div>`).join('');
  const wrap = document.getElementById('aboutStats');
  if (wrap) wrap.hidden = false;
}
