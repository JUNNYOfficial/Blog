window.createHomeArticleCard = function(post) {
  const card = document.createElement('a');
  card.className = 'home-post-card';
  card.href = getPostUrl(post);
  card.innerHTML = `
    <div class="home-post-meta"><span class="home-post-tag">${escapeHtml(post.tag)}</span><time>${escapeHtml(post.date)}</time></div>
    <h3>${escapeHtml(post.title)}</h3>
    <p>${escapeHtml(post.summary)}</p>
    <span class="home-post-more">继续阅读 →</span>`;
  return card;
}

async function initBrain() {
  const canvas = document.getElementById('brainCanvas');
  if (!canvas || !window.THREE) return;

  const panel = canvas.parentElement;
  const toggle = document.getElementById('modelToggle');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.1, 7.1);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.85;

  const brain = new THREE.Group();
  brain.rotation.set(-0.18, -0.4, -0.12);
  scene.add(brain);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(-3, 5, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.28);
  fill.position.set(4, 1, 4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 1.55);
  rim.position.set(4, -2, -4);
  scene.add(rim);

  const status = document.createElement('p');
  status.className = 'model-status';
  status.textContent = '正在载入真实脑图谱…';
  panel.appendChild(status);
  toggleLoadingControls(true);

  function toggleLoadingControls(loading) {
    document.getElementById('modelToggle').disabled = loading;
  }

  try {
    const { GLTFLoader } = await import('./vendor/loaders/GLTFLoader.js');
    const response = await fetch('./models/brain-atlas.glb');
    if (!response.ok) throw new Error(`Brain asset returned ${response.status}`);
    const source = await response.arrayBuffer();
    const modelData = new Uint8Array(source.byteLength);
    modelData.set(new Uint8Array(source));
    const gltf = await new GLTFLoader().parseAsync(modelData.buffer, './');
    const tissue = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.58,
      metalness: 0.0
    });
    const subcortex = new THREE.MeshStandardMaterial({
      color: 0xeaeaea,
      roughness: 0.6,
      metalness: 0.0
    });

    gltf.scene.traverse(object => {
      if (!object.isMesh) return;
      const isCortex = object.name === 'unified-cortex';
      object.visible = isCortex || ['cerebellum', 'brain-stem'].includes(object.name);
      object.material = object.name === 'cerebellum' || object.name === 'brain-stem' ? subcortex : tissue;
      object.geometry.computeVertexNormals();
    });

    const bounds = new THREE.Box3().setFromObject(gltf.scene);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 3.75 / Math.max(size.x, size.y, size.z);
    gltf.scene.scale.setScalar(scale);
    gltf.scene.position.copy(center.multiplyScalar(-scale));
    brain.add(gltf.scene);
    panel.classList.add('model-loaded');
    status.remove();
    toggleLoadingControls(false);
  } catch (error) {
    status.textContent = '模型暂时无法载入，请刷新重试。';
    panel.classList.add('model-error');
    console.error('Brain model failed to load:', error);
  }

  let isPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isDragging = false;
  let previous = { x: 0, y: 0 };
  let targetRotation = { x: brain.rotation.x, y: brain.rotation.y };
  let targetDistance = camera.position.z;

  function updateToggle() {
    toggle.setAttribute('aria-pressed', String(isPaused));
    toggle.setAttribute('aria-label', isPaused ? '继续模型旋转' : '暂停模型旋转');
    toggle.innerHTML = isPaused
      ? '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M3 2l11 6-11 6z"/></svg>'
      : '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M3 2h3v12H3zm7 0h3v12h-3z"/></svg>';
  }
  updateToggle();
  toggle.addEventListener('click', () => { isPaused = !isPaused; updateToggle(); });

  canvas.addEventListener('pointerdown', event => {
    isDragging = true;
    previous = { x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (!isDragging) return;
    targetRotation.y += (event.clientX - previous.x) * 0.009;
    targetRotation.x += (event.clientY - previous.y) * 0.009;
    targetRotation.x = Math.max(-1.3, Math.min(1.3, targetRotation.x));
    previous = { x: event.clientX, y: event.clientY };
  });
  const stopDragging = () => { isDragging = false; };
  canvas.addEventListener('pointerup', stopDragging);
  canvas.addEventListener('pointercancel', stopDragging);
  canvas.addEventListener('wheel', event => {
    event.preventDefault();
    targetDistance = Math.max(5.1, Math.min(9, targetDistance + event.deltaY * 0.004));
  }, { passive: false });

  function resize() {
    const width = panel.clientWidth;
    const height = panel.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(panel);
  resize();

  let lastTime = 0;
  renderer.setAnimationLoop(time => {
    const delta = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    if (!isPaused && !isDragging) targetRotation.y += delta * 0.11;
    brain.rotation.x += (targetRotation.x - brain.rotation.x) * 0.075;
    brain.rotation.y += (targetRotation.y - brain.rotation.y) * 0.075;
    camera.position.z += (targetDistance - camera.position.z) * 0.08;
    renderer.render(scene, camera);
  });
}

initBrain();
