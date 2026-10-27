/* 项目页交互：阅读进度、章节导航、滚动揭示、数字与条形图入场动画 */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;

  /* ---------- 阅读进度 ---------- */
  const bar = document.querySelector('.rt-progress i');

  function updateProgress() {
    if (!bar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.width = (ratio * 100).toFixed(2) + '%';
  }

  /* ---------- 章节导航 ---------- */
  const subnav = document.querySelector('.rt-subnav');
  const navLinks = subnav ? [...subnav.querySelectorAll('a')] : [];
  const sections = navLinks
    .map(link => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);

  function setActiveNav(id) {
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
  }

  function updateNavVisibility() {
    if (!subnav) return;
    subnav.classList.toggle('is-visible', window.scrollY > 260);
  }

  /* ---------- 滚动揭示 ---------- */
  const revealTargets = [];
  document.querySelectorAll('.rt-hero-copy > *, .rt-hero-meta, .rt-stats > *, .rt-exp-table tbody tr').forEach((el, i) => {
    el.classList.add('rt-reveal');
    el.style.setProperty('--i', String(Math.min(i % 6, 5)));
    revealTargets.push(el);
  });

  document.querySelectorAll('.rt-pipeline .rt-pipe-step, .rt-horizons .rt-horizon, .rt-timeline .rt-tl-item, .rt-boundary')
    .forEach((el, i) => {
      el.style.setProperty('--i', String(i));
      revealTargets.push(el);
    });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- 条形图：进入视口才生长 ---------- */
  function paintBars(container, selector, attr, max, logMin) {
    if (!container) return;
    const bars = container.querySelectorAll(selector);
    bars.forEach((el, i) => {
      const v = parseFloat(el.getAttribute(attr));
      if (!Number.isFinite(v)) return;
      const width = logMin !== undefined
        ? (v - logMin) / (max - logMin) * 100
        : v / max * 100;
      const apply = () => { el.style.width = Math.max(1.5, width) + '%'; };
      el.style.width = '0%';
      setTimeout(apply, (reduceMotion ? 30 : 60) + i * (reduceMotion ? 35 : 70));
    });
  }

  const barGroups = [
    { id: 'rtCostBars', selector: '.rt-bar-fill', attr: 'data-logms', max: 0.7, min: -1.6 },
    { id: 'rtDsBars', selector: '.rt-ds-fill', attr: 'data-ap', max: 0.3 }
  ].map(cfg => ({ ...cfg, el: document.getElementById(cfg.id), done: false }));

  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const group = barGroups.find(g => g.el === entry.target);
      if (group && !group.done) {
        group.done = true;
        paintBars(group.el, group.selector, group.attr, group.max, group.min);
      }
      barObserver.unobserve(entry.target);
    });
  }, { threshold: 0.25 });

  barGroups.forEach(g => { if (g.el) barObserver.observe(g.el); });

  /* ---------- 数字递增 ---------- */
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      statObserver.unobserve(el);
      const text = el.dataset.raw || el.textContent.trim();
      el.dataset.raw = text;
      const match = text.match(/^(\d+(?:\.\d+)?)([\s\S]*)$/);
      if (!match) return;
      const target = parseFloat(match[1]);
      const suffix = match[2];
      const decimals = (match[1].split('.')[1] || '').length;
      const start = performance.now();
      const dur = reduceMotion ? 320 : 900;
      function frame(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = text;
      }
      requestAnimationFrame(frame);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.rt-stat b').forEach(el => statObserver.observe(el));

  /* ---------- 主循环：进度 + 导航高亮 ---------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateProgress();
      updateNavVisibility();
      ticking = false;
    });
  }

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveNav(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* 首屏元素立即入场，避免等待观察器 */
  requestAnimationFrame(() => {
    body.classList.add('rt-anim-ready');
    document.querySelectorAll('.rt-hero-copy > *, .rt-hero-meta').forEach(el => el.classList.add('is-in'));
    updateProgress();
    updateNavVisibility();
  });
})();
