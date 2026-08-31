/* Palqum — shared site behaviour (nav, i18n, reveal, counters, pricing).
   Each page defines window.I18N (and optionally window.PLANS) before loading this file.
   This script tag is placed at the end of <body>, after the DOM it operates on already
   exists, so setup runs immediately rather than waiting on DOMContentLoaded (which may
   already have fired by the time a late inline script attaches its listener). */

let currentLang = localStorage.getItem('palqum_lang') || 'en';
let curCurrency = 'USD';
const RATES = {USD:1, EUR:0.92, ILS:3.7};
const SYM = {USD:'$', EUR:'€', ILS:'₪'};

function applyLang(lang){
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  const label = document.getElementById('langLabel');
  if(label) label.textContent = lang === 'ar' ? 'English' : 'العربية';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const dict = window.I18N && window.I18N[lang];
    if(dict && dict[key] !== undefined) el.innerHTML = dict[key];
  });
  localStorage.setItem('palqum_lang', lang);
  if(window.PLANS) renderSimplePricing();
  if(typeof window.onLangChange === 'function') window.onLangChange(lang);
}

function fmtPrice(price, cur){
  if(price === null) return currentLang==='ar' ? 'مخصص' : 'Custom';
  const val = Math.round(price * RATES[cur]);
  return SYM[cur] + val.toLocaleString('en-US');
}

function renderSimplePricing(){
  const grid = document.getElementById('priceGrid');
  if(!grid || !window.PLANS) return;
  grid.innerHTML = '';
  window.PLANS.forEach(plan=>{
    const t = plan[currentLang];
    const card = document.createElement('div');
    card.className = 'price-card' + (plan.featured ? ' featured' : '');
    const popLabel = currentLang === 'ar' ? 'الأكثر طلبًا' : 'Most Popular';
    const oneTime = currentLang === 'ar' ? 'لمرة واحدة' : 'one-time';
    const getStarted = currentLang === 'ar' ? 'ابدأ الآن' : 'Get Started';
    card.innerHTML = `
      ${plan.featured ? `<span class="pop-badge">${popLabel}</span>` : ''}
      <h3>${t.name}</h3>
      <div class="plan-desc">${t.desc}</div>
      <div class="amount"><b>${fmtPrice(plan.price, curCurrency)}</b>${plan.price!==null ? `<span>/ ${oneTime}</span>` : ''}</div>
      <ul>${t.feats.map(f=>`<li><svg class="icon" width="16" height="16"><use href="assets/icons.svg#i-check"/></svg><span>${f}</span></li>`).join('')}</ul>
      <a href="#contact-cta" class="btn ${plan.featured?'btn-primary':'btn-ghost'}"><span>${getStarted}</span><svg class="icon" width="14" height="14"><use href="assets/icons.svg#i-arrow"/></svg></a>
    `;
    grid.appendChild(card);
  });
}

/* ============ INIT (runs immediately — DOM above already parsed) ============ */
(function initPalqum(){
  const langBtn = document.getElementById('langBtn');
  if(langBtn) langBtn.addEventListener('click', ()=> applyLang(currentLang === 'en' ? 'ar' : 'en'));

  const nav = document.getElementById('nav');
  if(nav) window.addEventListener('scroll', ()=>{ nav.classList.toggle('shrink', window.scrollY > 30); }, {passive:true});

  const mobileMenu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  const mobileClose = document.getElementById('mobileClose');
  if(hamburger) hamburger.addEventListener('click', ()=> mobileMenu.classList.add('open'));
  if(mobileClose) mobileClose.addEventListener('click', ()=> mobileMenu.classList.remove('open'));
  if(mobileMenu){
    mobileMenu.addEventListener('click', e=>{ if(e.target === mobileMenu) mobileMenu.classList.remove('open'); });
    mobileMenu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> mobileMenu.classList.remove('open')));
  }

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    });
  }, {threshold:0.1, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

  const countIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(reduced){ el.textContent = target; countIO.unobserve(el); return; }
      const dur = 1200, t0 = performance.now();
      function tick(t){
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.floor(p * target);
        if(p < 1) requestAnimationFrame(tick); else el.textContent = target;
      }
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, {threshold:0.5});
  document.querySelectorAll('[data-count]').forEach(el=> countIO.observe(el));

  const currencyTabs = document.getElementById('currencyTabs');
  if(currencyTabs){
    currencyTabs.addEventListener('click', e=>{
      const btn = e.target.closest('button'); if(!btn) return;
      currencyTabs.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      curCurrency = btn.getAttribute('data-cur');
      renderSimplePricing();
    });
  }

  applyLang(currentLang);
})();
