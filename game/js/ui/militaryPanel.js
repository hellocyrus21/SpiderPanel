// =====================================================================
// پنل «ارتش» و پنجره‌ی «فرستادن نیرو»
// ---------------------------------------------------------------------
// پنل ارتش دو زبانه دارد:
//   نیروها     ← همه‌ی نیروها به تفکیک محل (روی هر ردیف بزنی، پنجره‌ی فرستادن باز می‌شود)
//   کارخانه‌ها ← هر نوع واحد: چند کارخانه، تولید ماهانه، روشن/خاموش، ساخت کارخانه‌ی جدید
// پنجره‌ی فرستادن (با زدن روی نشان نیرو روی نقشه هم باز می‌شود):
//   «۲۸ تیپ زرهی در تهران» ← چندتا؟ ← کجا؟ (شهر خودی، مرز زمینی یا دریایی)
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt, M = SG.Military;
  const U = () => window.SG_DATA.units;

  let ctx = null;   // { state, id, onChange, onShowStack }
  let view = 'forces';
  let sendCount = 0;

  const country = () => ctx.state.countries[ctx.id];
  const num = v => F.num(Math.round(v));
  const qty = (type, n) => `${F.num(Math.round(n))} ${U()[type].unitWord}`;

  function rateText(r) {
    if (r >= 1) return F.num(Math.round(r * 10) / 10) + ' در ماه';
    if (r > 0) return 'هر ' + F.num(Math.round(1 / r)) + ' ماه یکی';
    return '—';
  }

  // -------------------------------------------------------------------
  function tabs() {
    const t = [['forces', '🎖️ نیروها'], ['factories', '🏭 کارخانه‌ها']];
    const cur = view.startsWith('stack:') ? 'forces' : view;
    return `<div class="seg mil-tabs">${t.map(([k, l]) => `<button class="${cur === k ? 'on' : ''}" data-view="${k}">${l}</button>`).join('')}</div>`;
  }

  // -------------------------------------------------------------------
  // نیروها
  // -------------------------------------------------------------------
  function forcesView() {
    const c = country(), st = ctx.state;
    const upkeep = M.upkeepMonthly(c), prod = M.productionCostMonthly(st, c);
    // گروه‌بندی بر اساس محل
    const groups = {};
    for (const s of c.mil.stacks) {
      const key = s.move ? 'moving' : (s.loc.kind === 'city' ? s.loc.city : 'b:' + s.loc.target + (s.loc.sea ? 's' : ''));
      (groups[key] ||= { title: s.move ? '🚚 در حال حرکت' : (s.loc.kind === 'city' ? '🏙️ ' : (s.loc.sea ? '⚓ ' : '🚩 ')) + M.locName(st, s.loc), list: [] }).list.push(s);
    }
    const order = Object.keys(groups).sort((a, b) => (a === 'moving') - (b === 'moving') || (a.startsWith('b:')) - (b.startsWith('b:')));
    const sections = order.map(k => `<div class="loc-group"><div class="row-label">${F.esc(groups[k].title)}</div>
      <div class="stack-list">${groups[k].list.map(s => `<button class="stack-row" data-stack="${s.id}">
        <span>${U()[s.type].icon} ${U()[s.type].name}</span><b>${qty(s.type, s.count)}</b>
        ${s.move ? `<small class="muted">→ ${F.esc(M.locName(st, s.move.dest))} | ${F.num(s.move.left)} ماه</small>` : ''}
      </button>`).join('')}</div></div>`).join('');
    const totals = Object.entries(U()).filter(([k]) => c.forces[k] > 0)
      .map(([k, d]) => `<span class="total-chip">${d.icon} ${F.num(c.forces[k])}</span>`).join('');
    return `
      <div class="gov-kpis">
        <div class="kpi"><span>قدرت کل</span><b>${num(SG.Engine.militaryPower(c))}</b><small>رتبه ${F.num(SG.Engine.rankOf(st, ctx.id, SG.Engine.militaryPower))} جهان</small></div>
        <div class="kpi"><span>نگهداری ماهانه</span><b>${F.money(upkeep)}</b></div>
        <div class="kpi"><span>تولید ماهانه</span><b>${F.money(prod)}</b><small>خطوط روشن</small></div>
        <div class="kpi"><span>سوخت ارتش</span><b>${num(M.fuelUse(c))}</b><small>واحد انرژی در سال</small></div>
      </div>
      <div class="totals">${totals}</div>
      <p class="muted small">روی هر ردیف (یا روی نشان نیرو روی نقشه) بزنید تا تعداد دلخواه را به شهر یا مرز بفرستید.</p>
      ${sections}`;
  }

  // -------------------------------------------------------------------
  // کارخانه‌ها
  // -------------------------------------------------------------------
  function factoriesView() {
    const c = country(), st = ctx.state;
    const rows = Object.entries(U()).map(([k, d]) => {
      const n = c.factories[k] || 0;
      const rate = M.productionRate(st, c, k);
      const perFactory = n ? rate / n : 0;
      const on = !!c.mil.lines[k];
      const allowed = (c.tech[d.branch] || 0) >= d.factory.requires;
      const building = c.mil.construction.filter(x => x.type === k);
      const sanctioned = M.sanctionHit(st, c, k);
      const spec = (window.SG_DATA.specialties[c.id] || {})[k];
      const range = M.rangeOf(c, k);
      return `<div class="fac-card ${allowed ? '' : 'off'}">
        <div class="uc-head"><span class="uc-icon">${d.icon}</span><b>${d.factory.name}</b>
          ${spec && spec.output ? '<span class="badge gold" title="تخصص این کشور">تخصص</span>' : ''}
          ${sanctioned ? '<span class="badge danger" title="تحریم: تولید کمتر و گران‌تر">تحریم</span>' : ''}</div>
        ${allowed ? `
          <div class="fac-line"><span>کارخانه‌ها: <b>${F.num(n)}</b></span>
            <span>هر کارخانه: <b>${perFactory ? rateText(perFactory) : '—'}</b></span></div>
          <div class="fac-line"><span>تولید کل: <b class="${on ? 'good' : 'muted'}">${n ? rateText(rate) : '—'}</b> ${d.unitWord}</span>
            <span>قیمت هر ${d.unitWord}: <b>${F.money(M.unitCost(st, c, k))}</b></span></div>
          ${range && range < 9000 ? `<div class="muted small">برد: ${F.num(range)} کیلومتر</div>` : ''}
          <div class="fac-actions">
            ${n ? `<button class="btn tiny ${on ? 'primary' : ''}" data-line="${k}">${on ? '⏸ خاموش کن' : '▶ روشن کن'}</button>
              ${on ? `<small class="muted">${F.money(rate * M.unitCost(st, c, k))} در ماه</small>` : ''}` : '<small class="muted">کارخانه‌ای ندارید</small>'}
            <button class="btn tiny" data-build="${k}">➕ کارخانه‌ی جدید | ${F.money(M.factoryCost(st, c, k))} | ${F.num(d.factory.time)} ماه</button>
          </div>
          ${building.length ? `<div class="small">🏗️ در حال ساخت: ${building.map(b => F.num(b.left) + ' ماه').join('، ')}</div>` : ''}`
        : `<div class="muted small">🔒 فناوری لازم: ${F.BRANCH[d.branch]} ${F.num(d.factory.requires)} (شما ${num(c.tech[d.branch])}). با درخت پیشرفت (مرحله‌ی ۶) باز می‌شود.</div>`}
      </div>`;
    }).join('');
    return `
      <p class="muted small">تولید هر کارخانه به فناوری و تخصص کشور بستگی دارد. هزینه‌ی خطوط روشن هر ماه از بودجه کم می‌شود.
        خزانه: <b>${F.money(c.eco.treasury)}</b></p>
      <div class="fac-grid">${rows}</div>`;
  }

  // -------------------------------------------------------------------
  // فرستادن نیرو
  // -------------------------------------------------------------------
  function stackView(stackId) {
    const c = country(), st = ctx.state;
    const s = M.findStack(st, ctx.id, stackId);
    if (!s) { view = 'forces'; return forcesView(); }
    const d = U()[s.type];
    if (sendCount <= 0 || sendCount > s.count) sendCount = s.count;
    const weak = Object.keys(d.weakVs).map(w => U()[w].name).join('، ');
    const head = `<section class="card stack-head">
        <div class="sh-icon">${d.icon}</div>
        <div><h3>${d.name}: ${qty(s.type, s.count)}</h3>
          <div class="small">${s.move ? `🚚 در راه ${F.esc(M.locName(st, s.move.dest))} | ${F.num(s.move.left)} ماه دیگر` : '📍 ' + F.esc(M.locName(st, s.loc))}</div>
          <div class="muted small">⚔️ حمله ${F.num(d.attack)} | 🛡 دفاع ${F.num(d.defense)}${M.rangeOf(c, s.type) && M.rangeOf(c, s.type) < 9000 ? ` | 📏 برد ${F.num(M.rangeOf(c, s.type))} کیلومتر` : ''}${weak ? ` | ضعیف در برابر: ${weak}` : ''}</div>
          <div class="ac-bars"><span>تدارکات</span><div class="bar ${s.supply < 50 ? 'bad' : s.supply < 75 ? 'mid' : 'good'}"><span style="width:${s.supply}%"></span></div><b>${num(s.supply)}</b></div>
        </div></section>`;
    if (s.move) return `<button class="btn ghost tiny" data-view="forces">→ همه‌ی نیروها</button>${head}
      <p class="muted">این نیرو در حال حرکت است؛ وقتی رسید می‌توانید دوباره جابه‌جایش کنید.</p>`;

    const dests = M.destinations(st, ctx.id, s);
    const destBtn = x => {
      let name, extra = '';
      if (x.kind === 'city') name = `${x.capital ? '★' : '🏙️'} ${F.esc(x.name)}`;
      else {
        name = `${x.sea ? '⚓' : '🚩'} مرز ${F.esc(st.countries[x.target].name)}`;
        const lab = F.relationLabel(SG.Engine.getRelation(st, ctx.id, x.target));
        extra = ` <small class="${lab.cls}">${lab.text}</small>`;
      }
      return `<button class="dest" data-dest="${x.kind}|${x.city || x.target}|${x.sea ? 1 : 0}"><span>${name}${extra}</span><small>${F.num(x.turns)} ماه</small></button>`;
    };
    const borders = dests.filter(x => x.kind === 'border'), cities = dests.filter(x => x.kind === 'city');
    const step = s.count >= 1000 ? 100 : s.count >= 100 ? 10 : 1;
    return `<button class="btn ghost tiny" data-view="forces">→ همه‌ی نیروها</button>${head}
      <section class="card"><h3>چندتا بفرستیم؟</h3>
        <div class="send-count">
          <button class="btn tiny" data-cnt="-${step}">−${F.num(step)}</button>
          <input type="range" min="1" max="${s.count}" value="${sendCount}" data-range>
          <button class="btn tiny" data-cnt="${step}">+${F.num(step)}</button>
        </div>
        <div class="send-quick">
          <b class="send-val">${qty(s.type, sendCount)}</b>
          <button class="btn tiny ghost" data-frac="0.25">ربع</button>
          <button class="btn tiny ghost" data-frac="0.5">نصف</button>
          <button class="btn tiny ghost" data-frac="1">همه</button>
        </div>
      </section>
      ${borders.length ? `<section class="card"><h3>🚩 به مرز</h3><p class="muted small">در مرز آماده‌ی حمله می‌شوند (نبرد از مرحله‌ی ۴). تجمع نیرو، همسایه را نگران می‌کند.</p>
        <div class="dests">${borders.map(destBtn).join('')}</div></section>` : ''}
      ${cities.length ? `<section class="card"><h3>🏙️ به شهرهای خودی</h3><div class="dests">${cities.map(destBtn).join('')}</div></section>` : ''}
      ${s.loc.kind === 'city' ? `<button class="btn ghost tiny" data-demob title="هزینه‌ی نگهداری کم می‌شود؛ پولی برنمی‌گردد">مرخص کردن ${qty(s.type, sendCount)}</button>` : ''}`;
  }

  // -------------------------------------------------------------------
  function body() {
    let html = tabs();
    if (view === 'forces') html += forcesView();
    else if (view === 'factories') html += factoriesView();
    else if (view.startsWith('stack:')) html += stackView(view.slice(6));
    return html;
  }

  function rerender() {
    const el = document.querySelector('.modal-body');
    if (!el || !el.querySelector('.mil-tabs')) return;
    const top = el.scrollTop;
    el.innerHTML = body();
    el.scrollTop = top;
    bindRange();
  }

  function bindRange() {
    const r = document.querySelector('.modal-body [data-range]');
    if (!r) return;
    r.addEventListener('input', () => {
      sendCount = +r.value;
      const s = M.findStack(ctx.state, ctx.id, view.slice(6));
      document.querySelector('.modal-body .send-val').textContent = qty(s.type, sendCount);
      const demob = document.querySelector('.modal-body [data-demob]');
      if (demob) demob.textContent = 'مرخص کردن ' + qty(s.type, sendCount);
    });
  }

  function go(v) {
    view = v;
    rerender();
    const el = document.querySelector('.modal-body');
    if (el) el.scrollTop = 0;
  }

  function onClick(e) {
    const t = e.target.closest('button');
    if (!t) return;
    const ds = t.dataset, st = ctx.state, id = ctx.id;
    if (ds.view) { go(ds.view); return; }
    if (ds.stack) { sendCount = 0; go('stack:' + ds.stack); return; }
    if (ds.line) { M.setLine(st, id, ds.line, !st.countries[id].mil.lines[ds.line]); changed(); return; }
    if (ds.build) {
      const r = M.buildFactory(st, id, ds.build);
      if (r === 'money') SG.NotifyUI.simpleToast('پول کافی در خزانه نیست.', 'lvl-warning');
      else if (!r) SG.NotifyUI.simpleToast(`🏗️ ساخت ${U()[ds.build].factory.name} شروع شد.`, 'lvl-info');
      changed(); return;
    }
    const s = view.startsWith('stack:') ? M.findStack(st, id, view.slice(6)) : null;
    if (!s) return;
    if (ds.cnt) { sendCount = Math.max(1, Math.min(s.count, sendCount + +ds.cnt)); rerender(); return; }
    if (ds.frac) { sendCount = Math.max(1, Math.round(s.count * +ds.frac)); rerender(); return; }
    if (ds.demob !== undefined) {
      if (!confirm(`${qty(s.type, sendCount)} ${U()[s.type].name} مرخص شوند؟`)) return;
      M.demobilize(st, id, s.id, sendCount); sendCount = 0; go('forces'); ctx.onChange(); return;
    }
    if (ds.dest) {
      const [kind, key, sea] = ds.dest.split('|');
      const d = M.destinations(st, id, s).find(x => x.kind === kind && (x.city || x.target) === key && (x.sea ? '1' : '0') === sea);
      if (!d) return;
      const n = sendCount;
      const mover = M.send(st, id, s.id, n, d);
      if (mover) {
        SG.NotifyUI.simpleToast(`🚚 ${qty(mover.type, n)} ${U()[mover.type].name} به ${d.kind === 'city' ? F.esc(d.name) : 'مرز ' + F.esc(st.countries[d.target].name)} حرکت کرد؛ ${F.num(d.turns)} ماه تا رسیدن.`, 'lvl-info');
        sendCount = 0;
        ctx.onChange();
        SG.Modal.close();
        ctx.onShowStack(mover.id);
      }
    }
  }

  function changed() { ctx.onChange(); rerender(); }

  /** @param {string} [startView] 'forces' | 'factories' | 'stack:<id>' */
  function open(state, id, { onChange, onShowStack }, startView) {
    ctx = { state, id, onChange, onShowStack };
    if (startView) view = startView;
    if (startView && startView.startsWith('stack:')) sendCount = 0;
    SG.Modal.open({ title: '⚔️ ارتش — ' + state.countries[id].name, html: body(), onClick });
    bindRange();
  }

  SG.MilitaryPanel = { open, refresh: rerender };
})(window.SG = window.SG || {});
