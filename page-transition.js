/* ===== 页面切换过渡：zhilin Thinking…… ===== */
(function () {
  const body = document.body;

  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = '<div class="transition-mark">zhilin Thinking……</div>';
  document.documentElement.appendChild(overlay);

  function playEnter() {
    overlay.classList.remove('visible');
    body.classList.add('page-transition', 'page-enter');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        body.classList.remove('page-enter');
      });
    });
    setTimeout(() => {
      body.classList.remove('page-transition');
    }, 700);
  }

  playEnter();

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      body.classList.remove('page-exit');
      playEnter();
    }
  });

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (
      href.startsWith('http') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      link.hasAttribute('download')
    ) return;

    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    if (link.target === '_blank') return;

    e.preventDefault();
    overlay.classList.add('visible');
    body.classList.add('page-transition', 'page-exit');
    setTimeout(() => {
      window.location.href = href;
    }, 600);
  });
})();
