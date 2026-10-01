// =====================================================================
// پنل اطلاعات کشور
// ---------------------------------------------------------------------
// دسکتاپ: پنل کناری سمت راست. موبایل: «برگه‌ی پایین» (bottom sheet) که با
// کشیدن به پایین بسته می‌شود.
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt, E = SG.Engine;

  /** نقاط قوت/ضعف خودکار از روی داده (بدون متن هاردکد برای کشور خاص) */
  function traits(state, id) {
    const c = state.countries[id];
    const out = [];
    const perCap = c.gdp / Math.max(c.population, 0.001);
    const econRank = E.rankOf(state, id, x => x.gdp);
    const milRank = E.rankOf(state, id, E.militaryPower);
    const sanctions = E.sanctionedBy(state, id).length;
    const energyRatio = c.energy.production / Math.max(c.energy.consumption, 0.01);

    if (econRank <= 10) out.push({ good: true, text: 'اقتصاد بزرگ' });
    if (perCap >= 40) out.push({ good: true, text: 'درآمد سرانه‌ی بالا' });
    if (milRank <= 10) out.push({ good: true, text: 'ارتش قدرتمند' });
    if (c.military.nuclear) out.push({ good: true, text: 'بازدارندگی هسته‌ای' });
    if (energyRatio >= 1.2) out.push({ good: true, text: 'صادرکننده‌ی انرژی' });
    if (energyRatio < 0.5) out.push({ good: false, text: 'وابسته به واردات انرژی' });
    if (sanctions >= 5) out.push({ good: false, text: 'زیر تحریم گسترده' });
    if (c.stability < 45) out.push({ good: false, text: 'ثبات داخلی شکننده' });
    if (perCap < 6) out.push({ good: false, text: 'درآمد سرانه‌ی پایین' });
    if (E.warsOf(state, id).length) out.push({ good: false, text: 'درگیر جنگ' });
    const hostileNeighbors = c.neighbors.filter(n => E.getRelation(state, id, n) <= -25).length;
    if (hostileNeighbors >= 2) out.push({ good: false, text: 'همسایه‌های خصمانه' });
    if (!E.alliancesOf(state, id).some(a => a.type === 'military') && !E.defensePartners(state, id).length) {
      out.push({ good: false, text: 'بدون پیمان نظامی' });
    }
    return out;
  }

  function bar(value, max = 100, cls = '') {
    const pct = Math.max(0, Math.min(100, (value / max) * 100));
    return `<div class="bar ${cls}"><span style="width:${pct}%"></span></div>`;
  }

  /** نوار رابطه از ۱۰۰- تا ۱۰۰+ (وسط = صفر) */
  function relationBar(v) {
    const half = Math.abs(v) / 2;
    // صفحه راست‌به‌چپ است: منفی از وسط به راست (شروع خط)، مثبت از وسط به چپ (جهت پیشروی متن)
    const style = v >= 0 ? `right:50%;width:${half}%` : `left:50%;width:${half}%`;
    return `<div class="relbar ${v >= 0 ? 'pos' : 'neg'}"><span style="${style}"></span></div>`;
  }

  function chips(state, ids, extraCls = '') {
    if (!ids.length) return '<span class="muted">—</span>';
    return ids
      .slice()
      .sort((a, b) => state.countries[a].name.localeCompare(state.countries[b].name, 'fa'))
      .map(n => `<button class="chip ${extraCls}" data-goto="${n}">${F.esc(state.countries[n].name)}</button>`)
      .join('');
  }

  /**
   * @param {HTMLElement} el      ظرف پنل
   * @param {object} handlers     { onGoto(id), onClose(), onStart(id), onBack(), onAdvisor(id) }
   */
  function create(el, handlers) {
    const body = el.querySelector('.panel-body');

    el.querySelector('.panel-close').addEventListener('click', () => handlers.onClose());

    // کلیک روی دکمه‌های داخل پنل (یک شنونده برای همه)
    body.addEventListener('click', e => {
      const b = e.target.closest('[data-goto],[data-action]');
      if (!b) return;
      if (b.dataset.goto) handlers.onGoto(b.dataset.goto);
      else if (b.dataset.action === 'start') handlers.onStart(b.dataset.id);
      else if (b.dataset.action === 'back') handlers.onBack();
      else if (b.dataset.action === 'advisor') handlers.onAdvisor(b.dataset.id);
      else if (b.dataset.action === 'government') handlers.onGovernment();
    });

    // موبایل: کشیدن دستگیره به پایین = بستن
    const handle = el.querySelector('.panel-handle');
    let startY = null, dy = 0;
    handle.addEventListener('touchstart', e => { startY = e.touches[0].clientY; dy = 0; el.style.transition = 'none'; }, { passive: true });
    handle.addEventListener('touchmove', e => {
      if (startY === null) return;
      dy = Math.max(0, e.touches[0].clientY - startY);
      el.style.transform = `translateY(${dy}px)`;
    }, { passive: true });
    handle.addEventListener('touchend', () => {
      el.style.transition = '';
      el.style.transform = '';
      if (dy > 80) handlers.onClose();
      startY = null;
    });

    /**
     * @param {object} state
     * @param {string} id      کشور نمایش داده‌شده
     * @param {'choose'|'game'} mode  choose = صفحه‌ی انتخاب کشور، game = داخل بازی
     */
    function show(state, id, mode, { keepScroll = false } = {}) {
      const scroll = body.scrollTop;
      const c = state.countries[id];
      const player = state.playerId;
      const isPlayer = id === player;
      const total = Object.keys(state.countries).length;
      const power = E.militaryPower(c);
      const milRank = E.rankOf(state, id, E.militaryPower);
      const gdpRank = E.rankOf(state, id, x => x.gdp);
      const perCap = c.gdp / Math.max(c.population, 0.001) * 1000; // دلار
      const energyBal = c.energy.production - c.energy.consumption;
      const alliances = E.alliancesOf(state, id);
      const pacts = E.defensePartners(state, id);
      const wars = E.warsOf(state, id);
      const sanctioned = E.sanctionedBy(state, id);
      const tr = traits(state, id);

      let html = '';

      // --- سربرگ ---
      html += `<header class="info-head">
        <h2>${F.esc(c.name)}</h2>
        <div class="badges">
          ${isPlayer ? '<span class="badge gold">کشور شما</span>' : ''}
          ${c.playable ? '<span class="badge">قابل‌بازی</span>' : ''}
          ${c.military.nuclear ? '<span class="badge warn">هسته‌ای</span>' : ''}
          ${wars.length ? '<span class="badge danger">در جنگ</span>' : ''}
        </div>
        ${SG.Leader.card(id, 48)}
        <div class="sub">${F.GOV[c.gov] || ''}${c.capital ? ' | پایتخت: ' + F.esc(c.capital) : ''} | زمین ${F.TERRAIN[c.terrain] || ''}</div>
      </header>`;

      // --- انتخاب کشور (فقط در صفحه‌ی انتخاب) ---
      if (mode === 'choose') {
        if (c.playable) {
          html += `<div class="choose-box">
            <div>سختی: <span class="stars">${'★'.repeat(c.difficulty)}${'☆'.repeat(5 - c.difficulty)}</span>
              <span class="muted">(سخت‌تر = امتیاز بیشتر)</span></div>
            <button class="btn primary big" data-action="start" data-id="${id}">شروع بازی با ${F.esc(c.name)}</button>
            <button class="btn" data-action="advisor" data-id="${id}">🧑‍💼 مشاور: با ${F.esc(c.name)} چطور بازی کنم؟</button>
            <button class="btn ghost" data-action="back">بازگشت به فهرست کشورها</button>
          </div>`;
        } else {
          html += `<div class="choose-box muted">این کشور فعلاً قابل‌بازی نیست و کنترلش با هوش مصنوعی است.
            <button class="btn ghost" data-action="back">بازگشت به فهرست کشورها</button></div>`;
        }
      }

      // --- رابطه با بازیکن ---
      if (player && !isPlayer) {
        const v = E.getRelation(state, player, id);
        const lab = F.relationLabel(v);
        const allied = E.areAllied(state, player, id);
        const atWar = E.isAtWar(state, player, id);
        html += `<section class="card">
          <h3>رابطه با ${F.esc(state.countries[player].name)}</h3>
          <div class="rel-row"><span class="rel-val ${lab.cls}">${F.num(v)}</span>
            <span class="${lab.cls}">${atWar ? 'در جنگ' : lab.text}</span>
            ${allied ? '<span class="badge">هم‌پیمان</span>' : ''}</div>
          ${relationBar(v)}
        </section>`;
      }

      // --- ویژگی‌ها ---
      if (tr.length) {
        html += `<section class="card"><div class="traits">${tr.map(t =>
          `<span class="trait ${t.good ? 'good' : 'bad'}">${t.good ? '▲' : '▼'} ${t.text}</span>`).join('')}</div></section>`;
      }

      // --- اقتصاد ---
      html += `<section class="card">
        <h3>اقتصاد و جمعیت</h3>
        <dl class="stats">
          <dt>تولید ناخالص (GDP)</dt><dd>${F.money(c.gdp)} <small class="muted">رتبه ${F.num(gdpRank)}</small></dd>
          <dt>سرانه</dt><dd>${F.num(Math.round(perCap))} دلار</dd>
          <dt>جمعیت</dt><dd>${F.population(c.population)}</dd>
          <dt>انرژی</dt><dd>تولید ${F.num(c.energy.production)} / مصرف ${F.num(c.energy.consumption)}
            <small class="${energyBal >= 0 ? 'good' : 'bad'}">${energyBal >= 0 ? 'مازاد' : 'کسری'}</small></dd>
          ${c.eco ? `<dt>رشد سالانه</dt><dd class="${c.eco.growth >= 0 ? 'good' : 'bad'}">${F.num(Math.round(c.eco.growth * 1000) / 10)}٪</dd>
          <dt>تورم</dt><dd>${F.num(Math.round(c.eco.inflation * 10) / 10)}٪</dd>
          <dt>بدهی دولت</dt><dd>${F.num(Math.round(c.eco.debt / c.gdp * 100))}٪ GDP</dd>` : ''}
          ${c.eco && isPlayer ? `<dt>خزانه</dt><dd>${F.money(c.eco.treasury)}</dd>` : ''}
        </dl>
        ${isPlayer && mode === 'game' ? '<button class="btn" data-action="government">🏛️ مدیریت بودجه و دولت</button>' : ''}
        <div class="stat-line"><span>ثبات داخلی</span><b>${F.num(Math.round(c.stability))}</b></div>
        ${bar(c.stability, 100, c.stability < 40 ? 'bad' : c.stability < 60 ? 'mid' : 'good')}
      </section>`;

      // --- ارتش ---
      const m = c.military;
      html += `<section class="card">
        <h3>قدرت نظامی</h3>
        <div class="stat-line"><span>قدرت کل</span><b>${F.num(power)}</b>
          <small class="muted">رتبه ${F.num(milRank)} از ${F.num(total)}</small></div>
        <div class="stat-line"><span>نیروی فعال</span><b>${m.active >= 1 ? F.num(m.active) + ' هزار نفر' : 'بسیار کم'}</b></div>
        <div class="branches">
          ${Object.keys(F.BRANCH).map(k =>
            `<div class="branch"><span>${F.BRANCH[k]}</span>${bar(m[k])}<b>${F.num(Math.round(m[k]))}</b></div>`).join('')}
        </div>
        ${c.forces ? `<div class="row-label">نیروها</div><div class="totals">${Object.entries(window.SG_DATA.units)
          .filter(([k]) => c.forces[k] > 0).map(([k, d]) => `<span class="total-chip" title="${d.name}">${d.icon} ${F.num(c.forces[k])}</span>`).join('') || '<span class="muted">—</span>'}</div>` : ''}
        <div class="muted small">هزینه‌ی نظامی: ${F.num(c.militarySpendPct)}٪ از GDP</div>
      </section>`;

      // --- دیپلماسی ---
      html += `<section class="card">
        <h3>دیپلماسی</h3>
        <div class="row-label">پیمان‌ها و بلوک‌ها</div>
        <div class="chips">${alliances.length ? alliances.map(a =>
          `<span class="chip static" style="--c:${a.color}">${F.esc(a.name)}</span>`).join('') : '<span class="muted">—</span>'}</div>
        ${pacts.length ? `<div class="row-label">پیمان دفاعی دوجانبه</div><div class="chips">${chips(state, pacts)}</div>` : ''}
        ${wars.length ? `<div class="row-label">در جنگ با</div><div class="chips">${chips(state, wars, 'danger')}</div>` : ''}
        <div class="row-label">تحریم‌شده توسط</div>
        <div class="chips">${sanctioned.length ? chips(state, sanctioned) : '<span class="muted">هیچ کشوری</span>'}</div>
      </section>`;

      // --- همسایه‌ها ---
      html += `<section class="card">
        <h3>همسایه‌ها</h3>
        <div class="row-label">مرز زمینی</div><div class="chips">${chips(state, c.neighbors)}</div>
        ${c.seaNeighbors.length ? `<div class="row-label">از راه دریا</div><div class="chips">${chips(state, c.seaNeighbors)}</div>` : ''}
      </section>`;

      body.innerHTML = html;
      body.scrollTop = keepScroll ? scroll : 0;
      el.classList.add('open');
    }

    function hide() { el.classList.remove('open'); }

    return { show, hide, isOpen: () => el.classList.contains('open') };
  }

  SG.InfoPanel = { create, traits };
})(window.SG = window.SG || {});
