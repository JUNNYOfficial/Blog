const posts = [
  {
    id: '1',
    title: '视觉注意力与脑科学阅读方式',
    summary: '用黑白灰搭配记录文献、实验和思考，避免视觉干扰让内容更清晰。',
    tag: '论文',
    date: '2026年4月20日',
    reading: '6 分钟阅读',
    body: [
      '研究者应当把笔记做成可查阅的结构，黑白灰的层次让内容本身成为核心。',
      '在阅读神经科学文献时，沿着结论、方法、结果三个维度拆解更高效。',
      '这种思路适合长期追踪论文，同时保留你自己的实验思考。'
    ]
  },
  {
    id: '2',
    title: '前额叶网络与决策过程摘要',
    summary: '将复杂脑网络拆解成关键变量，形成可复用的科研笔记结构。',
    tag: '论文',
    date: '2026年4月22日',
    reading: '7 分钟阅读',
    body: [
      '这篇文章中提到的前额叶决策环路，为实验设计提供了清晰的层次。',
      '笔记中把结论与方法分开表述，便于未来对比不同模型的结果。',
      '在做研究时，保持记录的统一格式能让笔记长期保存价值。'
    ]
  },
  {
    id: '3',
    title: '记录日常研究灵感',
    summary: '将实验观察、读书心得与生活中的脑科学感知拆成独立日志。',
    tag: '日常',
    date: '2026年4月23日',
    reading: '4 分钟阅读',
    body: [
      '清晨时段常常是捕捉灵感的最佳时机。把突发的想法立刻写进日记。',
      '把工作与生活中的观察区分成“研究”和“感受”，避免混淆。',
      '这类日常记录是以后复盘和调整研究节奏的关键材料。'
    ]
  },
  {
    id: '4',
    title: '神经科学笔记的格式建议',
    summary: '为脑科学笔记提供一个既简洁又可扩展的记录模板。',
    tag: '日常',
    date: '2026年4月24日',
    reading: '5 分钟阅读',
    body: [
      '笔记模板建议包含背景、问题、方法、结果和下一步五部分。',
      '黑白灰风格下，使用细线和留白分割信息块，比颜色区分更耐看。',
      '这个模板既适合写论文总结，也适合写日常实验日志。'
    ]
  }
];

function createArticleCard(post) {
  const card = document.createElement('a');
  card.className = 'article-card';
  card.href = `article.html?id=${post.id}`;
  card.innerHTML = `
    <p class="eyebrow">${post.tag}</p>
    <h2 class="article-card-title">${post.title}</h2>
    <p class="article-card-summary">${post.summary}</p>
    <div class="article-card-footer">
      <span>${post.date}</span>
      <span>${post.reading}</span>
    </div>
  `;
  return card;
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

function renderDailyPosts() {
  const dailyPosts = posts.filter(post => post.tag === '日常');
  const grid = document.getElementById('dailyPostsGrid');
  const totalPostsEl = document.getElementById('totalPosts');
  const todayPostsEl = document.getElementById('todayPosts');

  if (!grid) return;

  // Update stats
  if (totalPostsEl) totalPostsEl.textContent = dailyPosts.length;
  if (todayPostsEl) {
    const today = new Date().toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          <span class="daily-date">${post.date}</span>
          <span class="daily-reading">${post.reading}</span>
        </div>
        <div class="daily-post-type">
          <span class="type-badge">日常</span>
        </div>
      </div>
      <h3 class="daily-post-title">${post.title}</h3>
      <p class="daily-post-summary">${post.summary}</p>
      <div class="daily-post-actions">
        <a href="article.html?id=${post.id}" class="read-more-link">
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
  renderArticleCards(posts);
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const selected = pill.textContent.trim();
      const filtered = selected === '全部' ? posts : posts.filter(post => post.tag === selected);
      setActiveFilter(selected);
      renderArticleCards(filtered);
    });
  });
  setSectionObserver();
}

function handleShare() {
  const shareButton = document.querySelector('.icon-button');
  if (!shareButton) return;
  shareButton.addEventListener('click', () => {
    const shareData = {
      title: document.getElementById('articleTitle')?.textContent || 'JUNNYOfficial Blog',
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

  if (!title || !tag || !date || !reading || !body || !related) return;

  title.textContent = article.title;
  tag.textContent = article.tag;
  date.textContent = article.date;
  reading.textContent = article.reading;
  body.innerHTML = article.body.map(paragraph => `<p>${paragraph}</p>`).join('');

  posts.filter(item => item.id !== article.id).forEach(post => {
    const item = document.createElement('a');
    item.className = 'related-item';
    item.href = `article.html?id=${post.id}`;
    item.innerHTML = `
      <h4 class="related-item-title">${post.title}</h4>
      <p class="related-item-meta">${post.tag} · ${post.date}</p>
    `;
    related.appendChild(item);
  });
}

const page = document.body.dataset.page;
if (page === 'home') {
  renderHome();
} else if (page === 'article') {
  renderArticle();
} else if (page === 'daily-posts') {
  renderDailyPosts();
}
