// ============ Season's Thirst — interactions ============

const T = window.__TWEAKS || { season: 'monsoon', accent: '#E8A33D', petals: 18, cursor: 'on' };

// ---------- Petals (subtle, reduced) ----------
const petalColors = ['#E89FA3', '#C13B4C', '#E8A33D', '#6B8E4E', '#F5EFE4'];
function buildPetals(n) {
  const el = document.getElementById('petals');
  el.innerHTML = '';
  for (let i = 0; i < n; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    const s = 6 + Math.random() * 10;
    p.style.setProperty('--s', s + 'px');
    p.style.setProperty('--x', (Math.random() * 100) + '%');
    p.style.setProperty('--d', (12 + Math.random() * 20) + 's');
    p.style.setProperty('--delay', (-Math.random() * 20) + 's');
    p.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
    p.style.setProperty('--c', petalColors[i % petalColors.length]);
    el.appendChild(p);
  }
}
buildPetals(Math.min(T.petals, 60));

// ---------- Scroll reveal (staggered, spring-physics) ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      cardObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

function observeCards() {
  document.querySelectorAll('.drink-card:not(.in)').forEach(el => cardObserver.observe(el));
}

// ---------- Lineup data ----------
const LINEUP = [
  { name: 'Hibiscus Rose', tagline: 'Cooling · Antioxidant', season: 'monsoon', c: '#C13B4C', cTop: '#E89FA3', tag: 'In season', ings: 'Hibiscus, damask rose, lime leaf.' },
  { name: 'Jamun Namak', tagline: 'Digestive · Grounding', season: 'monsoon', c: '#4A1E3A', cTop: '#6B2C48', tag: 'In season', ings: 'Java plum, black salt, green chilli, mint.' },
  { name: 'Kokum Curry Leaf', tagline: 'Tart · Heat-soothing', season: 'monsoon', c: '#B06A1C', cTop: '#E8A33D', tag: 'In season', ings: 'Kokum, fresh curry leaf, jaggery, ginger.' },
  { name: 'Bael Fennel', tagline: 'Gut-kind · Bright', season: 'summer', c: '#D88C2E', cTop: '#F0B85A', returns: 'Back in March', offseason: true, ings: 'Wood-apple, fennel, honey, citrus zest.' },
  { name: 'Aam Panna', tagline: 'Salty-sweet · Mineral', season: 'summer', c: '#8FA93A', cTop: '#B8C856', returns: 'Back in April', offseason: true, ings: 'Raw mango, toasted cumin, mint, sea salt.' },
  { name: 'Rose Vetiver', tagline: 'Floral · Cooling', season: 'summer', c: '#D46978', cTop: '#E89FA3', returns: 'Back in April', offseason: true, ings: 'Rose petals, vetiver root, lime.' },
  { name: 'Guava Chilli', tagline: 'Zippy · Fragrant', season: 'winter', c: '#6B8E4E', cTop: '#97B576', returns: 'Back in November', offseason: true, ings: 'Guava, red chilli, black pepper, lemon.' },
  { name: 'Orange Cardamom', tagline: 'Warming · Citrus', season: 'winter', c: '#C76A20', cTop: '#E8923A', returns: 'Back in November', offseason: true, ings: 'Blood orange, green cardamom, raw honey.' },
  { name: 'Amla Jaggery', tagline: 'Sour · Building', season: 'winter', c: '#5C7A2E', cTop: '#89A348', returns: 'Back in December', offseason: true, ings: 'Indian gooseberry, jaggery, ginger.' },
  { name: 'Neem Honey', tagline: 'Bitter · Cleansing', season: 'spring', c: '#4A6B2E', cTop: '#7A9454', returns: 'Back in March', offseason: true, ings: 'Neem flower, wild honey, lime.' },
  { name: 'Tamarind Mint', tagline: 'Tangy · Refreshing', season: 'spring', c: '#8B4A2A', cTop: '#B06A3E', returns: 'Back in March', offseason: true, ings: 'Tamarind, spearmint, black salt.' },
  { name: 'Palm Sugar Lime', tagline: 'Round · Tropical', season: 'spring', c: '#C99A3D', cTop: '#E8BC5E', returns: 'Back in February', offseason: true, ings: 'Palm sugar, kaffir lime, cold-press basil.' },
];

function buildLineup(filter = 'all') {
  const grid = document.getElementById('lineupGrid');
  grid.innerHTML = '';
  const items = filter === 'all' ? LINEUP : LINEUP.filter(d => d.season === filter);
  items.forEach((d, i) => {
    const card = document.createElement('div');
    card.className = 'drink-card' + (d.offseason ? ' offseason' : '');
    card.style.setProperty('--c', d.c);
    card.innerHTML = `
      <div class="bg"></div>
      <div class="mini-can">
        <div class="can-body" style="--c-top: ${d.cTop}; --c-bot: ${d.c};">
          <div class="can-label">${d.name.split(' ')[0]}<span class="sub">${d.season}</span></div>
        </div>
      </div>
      ${d.offseason
        ? `<div class="returns">${d.returns}</div>`
        : `<div class="in-season">in season</div>`
      }
      <div class="info">
        <h4>${d.name}</h4>
        <div class="tagline">${d.tagline}</div>
      </div>
      <div class="reveal">
        <span class="pill">${d.season}</span>
        <h4>${d.name}</h4>
        <div class="ings">${d.ings}</div>
        <div class="tagline" style="font-size:11px; letter-spacing:.14em; opacity:.8; text-transform:uppercase;">${d.tagline}</div>
      </div>
    `;
    // stagger animation delay
    card.style.transitionDelay = (i * 0.08) + 's';
    grid.appendChild(card);
  });

  // observe new cards for scroll-triggered reveal
  observeCards();
}
buildLineup();

// ---------- Filter chips ----------
document.querySelectorAll('.filter-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildLineup(btn.dataset.filter);
  });
});

// ---------- Cursor ----------
const ring = document.getElementById('cursorRing');
const dot = document.getElementById('cursorDot');
let lastDropTime = 0;
let mx = 0, my = 0, rx = 0, ry = 0;

function cursorEnabled() { return T.cursor === 'on' && window.matchMedia('(pointer: fine)').matches; }

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  if (!cursorEnabled()) return;
  dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  const now = performance.now();
  if (now - lastDropTime > 90 && Math.random() > 0.6) {
    lastDropTime = now;
    const drop = document.createElement('div');
    drop.className = 'droplet';
    drop.style.left = mx + (Math.random() * 14 - 7) + 'px';
    drop.style.top = my + (Math.random() * 14 - 7) + 'px';
    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 900);
  }
});

function animRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  if (cursorEnabled()) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .drink-card, .spot-card, .gallery-item, .juice-panel').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

function setCursor(mode) {
  T.cursor = mode;
  if (!cursorEnabled()) {
    ring.style.display = 'none';
    dot.style.display = 'none';
    document.body.style.cursor = 'auto';
  } else {
    ring.style.display = 'block';
    dot.style.display = 'block';
    document.body.style.cursor = 'none';
  }
}
setCursor(T.cursor);

// ---------- Activate scroll reveals ----------
document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
observeCards();

// ---------- Scroll-driven season color + parallax ----------
const seasonPalettes = {
  monsoon: { bg: '#F5EFE4', accent: '#C13B4C', footer: '#C13B4C' },
  winter:  { bg: '#F1EAD9', accent: '#4A1E3A', footer: '#4A1E3A' },
  spring:  { bg: '#F3EDDB', accent: '#6B8E4E', footer: '#6B8E4E' },
  summer:  { bg: '#FBF3DF', accent: '#E8A33D', footer: '#E8A33D' },
};

function applySeason(name) {
  const p = seasonPalettes[name] || seasonPalettes.monsoon;
  document.body.dataset.season = name;
  document.body.style.backgroundColor = p.bg;
  document.documentElement.style.setProperty('--accent', p.accent);
  document.documentElement.style.setProperty('--footer-bg', p.footer);
  T.season = name;
}
applySeason(T.season);

const sections = [...document.querySelectorAll('[data-section]')];
const sectionSeason = {
  hero: 'monsoon',
  philosophy: 'monsoon',
  spotlight: 'monsoon',
  lineup: 'winter',
  why: 'spring',
  social: 'summer',
  notify: T.season,
};

let tickScroll = false;
window.addEventListener('scroll', () => {
  if (tickScroll) return;
  tickScroll = true;
  requestAnimationFrame(() => {
    const sy = window.scrollY;

    const heroVideo = document.querySelector('.hero-video-bg');
    if (heroVideo) heroVideo.style.transform = `translateY(${sy * 0.15}px)`;

    // Show petals only after scrolling past the hero
    const petalsEl = document.getElementById('petals');
    const heroSection = document.querySelector('.hero');
    if (petalsEl && heroSection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      petalsEl.style.opacity = heroBottom <= 0 ? '1' : '0';
    }

    // Switch nav to dark text once past the hero
    const nav = document.querySelector('.nav');
    if (nav && heroSection) {
      const pastHero = heroSection.getBoundingClientRect().bottom <= 0;
      nav.classList.toggle('scrolled', pastHero);
    }

    // section-driven season
    const vh = window.innerHeight / 2;
    let current = 'monsoon';
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top < vh && r.bottom > vh) {
        current = sectionSeason[s.dataset.section] || 'monsoon';
        break;
      }
    }
    if (current !== document.body.dataset.season) applySeason(current);

    tickScroll = false;
  });
}, { passive: true });

// ============ EDIT MODE / TWEAKS ============
const tweaksPanel = document.getElementById('tweaksPanel');
function openTweaks() { tweaksPanel.classList.add('open'); }
function closeTweaks() { tweaksPanel.classList.remove('open'); }

window.addEventListener('message', (e) => {
  if (!e.data || typeof e.data !== 'object') return;
  if (e.data.type === '__activate_edit_mode') openTweaks();
  if (e.data.type === '__deactivate_edit_mode') closeTweaks();
});
try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (_) {}

function persist(edits) {
  Object.assign(T, edits);
  try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*'); } catch (_) {}
}

document.getElementById('seasonSelect').value = T.season;
document.getElementById('seasonSelect').addEventListener('change', (e) => {
  applySeason(e.target.value);
  persist({ season: e.target.value });
});

document.querySelectorAll('#accentSwatches .sw').forEach(sw => {
  if (sw.dataset.accent === T.accent) sw.classList.add('active');
  else sw.classList.remove('active');
  sw.addEventListener('click', () => {
    document.querySelectorAll('#accentSwatches .sw').forEach(s => s.classList.remove('active'));
    sw.classList.add('active');
    document.documentElement.style.setProperty('--accent', sw.dataset.accent);
    document.documentElement.style.setProperty('--amber', sw.dataset.accent);
    persist({ accent: sw.dataset.accent });
  });
});

const petalRange = document.getElementById('petalCount');
petalRange.value = T.petals;
petalRange.addEventListener('input', (e) => {
  const n = Number(e.target.value);
  buildPetals(n);
  persist({ petals: n });
});

const cursorSel = document.getElementById('cursorMode');
cursorSel.value = T.cursor;
cursorSel.addEventListener('change', (e) => {
  setCursor(e.target.value);
  persist({ cursor: e.target.value });
});

if (T.accent && T.accent !== '#E8A33D') {
  document.documentElement.style.setProperty('--amber', T.accent);
  document.documentElement.style.setProperty('--accent', T.accent);
}

// ---------- Juice Showcase ----------
(function initJuiceShowcase() {
  const panelsContainer = document.getElementById('juicePanels');
  const overlay = document.getElementById('juiceDetail');
  if (!panelsContainer || !overlay) return;

  const juices = [
    { color: '#c41a1a', bg: 'APPLE',  flavor: 'Apple Flavor',   bottle: 'uploads/a 1.png', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," },
    { color: '#3a7a0e', bg: 'GUAVA',  flavor: 'Amrood Flavor',  bottle: 'uploads/b 1.png', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," },
    { color: '#6a0daa', bg: 'JAMUN',  flavor: 'Jamun Flavor',   bottle: 'uploads/c 1.png', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," },
    { color: '#e6a700', bg: 'MANGO',  flavor: 'Chaunsa Flavor', bottle: 'uploads/d 1.png', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," },
  ];

  const elBgText   = document.getElementById('detailBgText');
  const elCurImg   = document.getElementById('detailBottleCur');
  const elNextImg  = document.getElementById('detailBottleNext');
  const elFlavor   = document.getElementById('detailFlavor');
  const elDesc     = document.getElementById('detailDesc');
  const elCounter  = document.getElementById('detailCounter');
  const elContent  = document.getElementById('detailContent');

  let activeIdx = -1;
  let switching = false;
  let savedScrollY = 0;

  // Pre-load all bottle images so switches are instant
  juices.forEach(j => { const i = new Image(); i.src = j.bottle; });

  function applyJuice(idx) {
    const j = juices[idx];
    overlay.style.backgroundColor = j.color;
    elBgText.textContent  = j.bg;
    elFlavor.textContent  = j.flavor;
    elDesc.textContent    = j.desc;
    elCurImg.src          = j.bottle;
    elCounter.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(juices.length).padStart(2, '0');
  }

  function openDetail(idx) {
    activeIdx = idx;
    applyJuice(idx);
    elCurImg.style.opacity = '1';
    elNextImg.style.opacity = '0';
    overlay.classList.add('open');
    savedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
  }

  function closeDetail() {
    overlay.classList.remove('open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    window.scrollTo({ top: savedScrollY, behavior: 'instant' });
    activeIdx = -1;
  }

  function switchTo(nextIdx) {
    if (switching || nextIdx === activeIdx) return;
    switching = true;

    const j = juices[nextIdx];

    // 1. Crossfade bottle: load next image, fade it in over current
    elNextImg.src = j.bottle;
    elNextImg.style.opacity = '1';
    elCurImg.style.opacity = '0';

    // 2. Smoothly transition background color (CSS transition handles this)
    overlay.style.backgroundColor = j.color;

    // 3. Swap text with animation
    elContent.classList.add('swapping');
    setTimeout(() => {
      elBgText.textContent  = j.bg;
      elFlavor.textContent  = j.flavor;
      elDesc.textContent    = j.desc;
      elCounter.textContent = String(nextIdx + 1).padStart(2, '0') + ' / ' + String(juices.length).padStart(2, '0');
    }, 200);

    // 4. After transition completes, silently reset so "current" holds the new bottle
    setTimeout(() => {
      elCurImg.src = j.bottle;

      const onReady = () => {
        // Disable transitions so the reset is instant (no blink)
        elCurImg.style.transition = 'none';
        elNextImg.style.transition = 'none';
        elCurImg.style.opacity = '1';
        elNextImg.style.opacity = '0';

        // Force a reflow, then restore transitions for the next switch
        void elCurImg.offsetHeight;
        elCurImg.style.transition = '';
        elNextImg.style.transition = '';

        elContent.classList.remove('swapping');
        activeIdx = nextIdx;
        switching = false;
      };

      if (elCurImg.decode) {
        elCurImg.decode().then(onReady).catch(onReady);
      } else {
        requestAnimationFrame(() => requestAnimationFrame(onReady));
      }
    }, 550);
  }

  function goNext() {
    if (activeIdx < 0) return;
    switchTo((activeIdx + 1) % juices.length);
  }
  function goPrev() {
    if (activeIdx < 0) return;
    switchTo((activeIdx - 1 + juices.length) % juices.length);
  }

  panelsContainer.querySelectorAll('.panel-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDetail(Number(btn.dataset.target));
    });
  });

  document.getElementById('detailClose').addEventListener('click', closeDetail);
  document.getElementById('detailNext').addEventListener('click', goNext);
  document.getElementById('detailPrev').addEventListener('click', goPrev);

  document.addEventListener('keydown', (e) => {
    if (activeIdx < 0) return;
    if (e.key === 'Escape') closeDetail();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  });
})();
