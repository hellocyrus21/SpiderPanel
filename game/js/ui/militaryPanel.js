// =====================================================================
// پنل «ارتش»: نیروها، تولید، ارتش‌ها و اعزام
// ---------------------------------------------------------------------
// سه زبانه:
//   نیروها  ← همه‌ی واحدها، هزینه، سوخت، قدرت هر شاخه
//   تولید   ← سفارش ساخت با ظرفیت محدود کارخانه‌ها + صف تولید
//   ارتش‌ها ← ساختن ارتش از نیروهای ذخیره، انتخاب فرمانده، اعزام روی نقشه
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt, M = SG.Military;
  const U = () => window.SG_DATA.units;

  let ctx = null;   // { state, id, onChange, onShowArmy }
  let view = 'forces';                 // forces | production | armies | army:<id>
  let draft = {};                      // واحدهای انتخاب‌شده برای ارتش جدید
  let draftCommander = null;
  let qty = {};                        // تعداد سفارش هر نوع

  const country = () => ctx.state.countries[ctx.id];
  const num = v => F.num(Math.round(v));

  // -------------------------------------------------------------------
  function tabs() {
    const t = [['forces', '🎖️ نیروها'], ['production', '🏭 تولید'], ['armies', '🗺️ ارتش‌ها']];
    const cur = view.startsWith('army:') ? 'armies' : view;
    return `<div class="seg mil-tabs">${t.map(([k, l]) => `<button class="${cur === k ? 'on' : ''}" data-view="${k}">${l}</button>`).join('')}</div>`;
  }

  function stepper(key, value, max, attr) {
    return `<span class="stepper">
      <button data-${attr}="${key}" data-d="-1" ${value <= 0 ? 'disabled' : ''}>−</button>
      <b>${F.num(value)}</b>
      <button data-${attr}="${key}" data-d="1" ${value >= max ? 'disabled' : ''}>+</button>
    </span>`;
  }

  // -------------------------------------------------------------------
  // زبانه‌ی نیروها
  // -------------------------------------------------------------------
  function forcesView() {
    const c = country();
    const total = M.totalForces(c);
    const upkeep = M.upkeepMonthly(c);
    const rows = Object.entries(U()).map(([k, d]) => {
      const inArmies = total[k] - c.forces[k];
      if (!total[k]) return '';
      return `<tr>
        <td>${d.icon} ${d.name}</td>
        <td><b>${F.num(total[k])}</b></td>
        <td class="muted">${inArmies ? F.num(inArmies) : '—'}</td>
        <td>${c.forces[k] ? `<button class="btn tiny ghost" data-demob="${k}" title="مرخص کردن یک واحد از ذخیره">مرخص</button>` : ''}</td>
      </tr>`;
    }).join('');
    const branches = M.BRANCHES.map(b => `<div class="branch"><span>${F.BRANCH[b]}</span>
      <div class="bar"><span style="width:${Math.min(100, c.military[b])}%"></span></div><b>${num(c.military[b])}</b></div>`).join('');
    return `
      <div class="gov-kpis">
        <div class="kpi"><span>قدرت کل</span><b>${num(SG.Engine.militaryPower(c))}</b><small>رتبه ${F.num(SG.Engine.rankOf(ctx.state, ctx.id, SG.Engine.militaryPower))} جهان</small></div>
        <div class="kpi"><span>نگهداری ماهانه</span><b>${F.money(upkeep)}</b><small>${F.num(Math.round(upkeep * 12 / c.gdp * 1000) / 10)}٪ از GDP</small></div>
        <div class="kpi"><span>مصرف سوخت ارتش</span><b>${num(M.fuelUse(c))}</b><small>واحد انرژی در سال</small></div>
        <div class="kpi"><span>کارخانه‌ها</span><b>${F.num(M.factories(c))}</b><small>ساخت هم‌زمان</small></div>
      </div>
      <section class="card"><h3>واحدها</h3>
        <table class="mil-table"><thead><tr><th>نوع</th><th>کل</th><th>در ارتش‌ها</th><th></th></tr></thead><tbody>${rows}</tbody></table>
        <p class="muted small">مرخص کردن واحد، هزینه‌ی نگهداری را کم می‌کند ولی پولی برنمی‌گردد.</p>
      </section>
      <section class="card"><h3>قدرت شاخه‌ها</h3><div class="branches">${branches}</div></section>`;
  }

  // -------------------------------------------------------------------
  // زبانه‌ی تولید
  // -------------------------------------------------------------------
  function productionView() {
    const c = country();
    const fac = M.factories(c);
    const used = c.mil.queue.reduce((s, i) => s + i.qty, 0);
    const cards = Object.entries(U()).map(([k, d]) => {
      const t = M.buildTerms(ctx.state, c, k);
      const q = qty[k] || 1;
      const weak = Object.entries(d.weakVs).map(([w]) => U()[w].name).join('، ');
      return `<div class="unit-card ${t.allowed ? '' : 'off'}">
        <div class="uc-head"><span class="uc-icon">${d.icon}</span><b>${d.name}</b>
          ${t.sanctioned ? '<span class="badge danger" title="تحریم: گران‌تر و کندتر">تحریم</span>' : ''}</div>
        <div class="uc-stats">
          <span title="حمله">⚔️ ${F.num(d.attack)}</span><span title="دفاع">🛡 ${F.num(d.defense)}</span>
          ${d.range ? `<span title="برد">📏 ${d.range > 9000 ? '∞' : F.num(d.range) + 'km'}</span>` : ''}
          <span title="نگهداری ماهانه">🔧 ${F.money(d.upkeep * c.mil.upkeepFactor)}</span>
        </div>
        ${weak ? `<div class="muted small">ضعیف در برابر: ${weak}</div>` : ''}
        ${t.allowed ? `<div class="uc-buy">
            ${stepper(k, q, fac, 'qty')}
            <button class="btn primary tiny" data-order="${k}">ساخت | ${F.money(t.cost * q)} | ${F.num(t.time)} ماه</button>
          </div>`
          : `<div class="muted small">🔒 فناوری لازم: ${F.BRANCH[d.branch]} ${F.num(d.requires)} (شما ${num(c.tech[d.branch])})</div>`}
      </div>`;
    }).join('');
    const queue = c.mil.queue.length ? c.mil.queue.map((i, idx) => `<div class="q-item">
        <span>${U()[i.type].icon} ${F.num(i.qty)} × ${U()[i.type].name}</span>
        <div class="bar"><span style="width:${(1 - i.left / i.total) * 100}%"></span></div>
        <small>${F.num(i.left)} ماه</small>
        <button class="btn tiny ghost" data-cancel="${idx}" title="لغو (نصف پول برمی‌گردد)">×</button>
      </div>`).join('') : '<p class="muted">صف خالی است.</p>';
    return `
      <section class="card"><h3>صف تولید <small class="muted">(${F.num(used)} از ${F.num(fac)} جای کارخانه)</small></h3>${queue}
        <p class="muted small">اگر صف از ظرفیت کارخانه‌ها بیشتر شود، سفارش‌های بعدی منتظر می‌مانند. پول هنگام سفارش پرداخت می‌شود.</p></section>
      <section class="card"><h3>ساخت واحد جدید <small class="muted">خزانه: ${F.money(c.eco.treasury)}</small></h3>
        <div class="unit-grid">${cards}</div></section>`;
  }

  // -------------------------------------------------------------------
  // زبانه‌ی ارتش‌ها
  // -------------------------------------------------------------------
  function locText(a) {
    const st = ctx.state;
    if (a.move) {
      const d = a.move.dest;
      return `🚚 در حال حرکت به ${d.kind === 'home' ? 'پایتخت' : 'مرز ' + F.esc(st.countries[d.target].name)} — ${F.num(a.move.left)} ماه دیگر`;
    }
    if (a.loc.kind === 'home') return '🏠 در پایتخت';
    return `📍 مرز ${F.esc(st.countries[a.loc.target].name)}${a.loc.sea ? ' (از راه دریا)' : ''} — آماده`;
  }

  function unitsLine(units) {
    return Object.entries(units).filter(([, n]) => n > 0).map(([k, n]) => `${U()[k].icon}${F.num(n)}`).join(' ');
  }

  function skills(cmd) {
    return `<span title="تهاجم">⚔️${F.num(cmd.attack)}</span> <span title="دفاع">🛡${F.num(cmd.defense)}</span> <span title="لجستیک">📦${F.num(cmd.logistics)}</span>`;
  }

  function armiesView() {
    const c = country();
    const list = c.mil.armies.map(a => `<div class="army-card" data-army="${a.id}">
        <div class="ac-head"><b>${F.esc(a.name)}</b><span class="muted small">${F.esc(a.commander.name)} ${skills(a.commander)}</span></div>
        <div>${unitsLine(a.units)}</div>
        <div class="small">${locText(a)}</div>
        <div class="ac-bars"><span>تدارکات</span><div class="bar ${a.supply < 50 ? 'bad' : a.supply < 75 ? 'mid' : 'good'}"><span style="width:${a.supply}%"></span></div><b>${num(a.supply)}</b>
          <span>روحیه</span><div class="bar"><span style="width:${a.morale}%"></span></div><b>${num(a.morale)}</b></div>
      </div>`).join('') || '<p class="muted">هنوز ارتشی نساخته‌اید. از نیروهای ذخیره پایین یک ارتش بسازید.</p>';

    // فرم ساخت ارتش
    if (draftCommander === null || !c.mil.commanders.some(x => x.id === draftCommander)) draftCommander = c.mil.commanders[0]?.id ?? null;
    const pool = Object.entries(U()).filter(([k]) => c.forces[k] > 0).map(([k, d]) =>
      `<div class="pool-row"><span>${d.icon} ${d.name} <small class="muted">(ذخیره ${F.num(c.forces[k])})</small></span>${stepper(k, draft[k] || 0, c.forces[k], 'draft')}</div>`).join('');
    const cmds = c.mil.commanders.map(x => `<label class="cmd ${x.id === draftCommander ? 'on' : ''}">
        <input type="radio" name="cmd" value="${x.id}" ${x.id === draftCommander ? 'checked' : ''} data-cmd="${x.id}"> ${F.esc(x.name)} <small>${skills(x)}</small></label>`).join('');
    const total = M.countUnits(draft);
    return `
      <section class="card"><h3>ارتش‌های شما</h3>${list}</section>
      <section class="card"><h3>➕ ساخت ارتش جدید</h3>
        ${pool || '<p class="muted">نیروی ذخیره‌ای نمانده.</p>'}
        <div class="row-label">فرمانده</div><div class="cmds">${cmds}</div>
        <p class="muted small">⚔️ تهاجم، 🛡 دفاع (اثر در نبرد مرحله‌ی ۴)، 📦 لجستیک (تدارکات بهتر).</p>
        <button class="btn primary" data-create ${total && draftCommander !== null ? '' : 'disabled'}>ساخت ارتش (${F.num(total)} واحد)</button>
      </section>`;
  }

  // -------------------------------------------------------------------
  // جزئیات یک ارتش و اعزام
  // -------------------------------------------------------------------
  function armyView(armyId) {
    const c = country();
    const a = M.findArmy(ctx.state, ctx.id, armyId);
    if (!a) { view = 'armies'; return armiesView(); }
    const atHome = a.loc.kind === 'home' && !a.move;
    const unitRows = Object.entries(U()).filter(([k]) => (a.units[k] || 0) > 0 || (atHome && c.forces[k] > 0)).map(([k, d]) =>
      `<div class="pool-row"><span>${d.icon} ${d.name}${atHome ? ` <small class="muted">(ذخیره ${F.num(c.forces[k])})</small>` : ''}</span>
        ${atHome ? stepper(k, a.units[k] || 0, (a.units[k] || 0) + c.forces[k], 'tr') : `<b>${F.num(a.units[k])}</b>`}</div>`).join('');
    const dests = M.destinations(ctx.state, ctx.id, a)
      .filter(d => !(d.kind === 'home' && atHome) && !(d.kind === a.loc.kind && d.target === a.loc.target && !a.move))
      .map(d => {
        const name = d.kind === 'home' ? '🏠 بازگشت به پایتخت' : `${d.sea ? '⚓' : '🚩'} مرز ${F.esc(ctx.state.countries[d.target].name)}`;
        const rel = d.target ? SG.Engine.getRelation(ctx.state, ctx.id, d.target) : null;
        const relLab = rel !== null ? F.relationLabel(rel) : null;
        const blocked = d.allowed === false;
        return `<button class="dest ${blocked ? 'off' : ''}" data-dest="${d.kind}|${d.target || ''}|${d.sea ? 1 : 0}" ${blocked ? 'disabled' : ''}>
          <span>${name}${relLab ? ` <small class="${relLab.cls}">${relLab.text}</small>` : ''}</span>
          <small>${blocked ? 'ناو کافی نیست' : F.num(d.turns) + ' ماه'}</small></button>`;
      }).join('');
    return `
      <button class="btn ghost tiny" data-view="armies">→ همه‌ی ارتش‌ها</button>
      <section class="card"><h3>${F.esc(a.name)}</h3>
        <div>فرمانده: <b>${F.esc(a.commander.name)}</b> ${skills(a.commander)}</div>
        <div class="small">${locText(a)}</div>
        <div class="ac-bars"><span>تدارکات</span><div class="bar ${a.supply < 50 ? 'bad' : 'good'}"><span style="width:${a.supply}%"></span></div><b>${num(a.supply)}</b>
          <span>روحیه</span><div class="bar"><span style="width:${a.morale}%"></span></div><b>${num(a.morale)}</b>
          <span>تجربه</span><div class="bar"><span style="width:${a.experience}%"></span></div><b>${num(a.experience)}</b></div>
        <div class="muted small">سرعت: ${F.num(M.armySpeed(a))} کیلومتر در ماه (کندترین واحد)</div>
        <button class="btn" data-showarmy="${a.id}">🗺️ نمایش روی نقشه</button>
      </section>
      <section class="card"><h3>واحدها ${atHome ? '<small class="muted">(فقط در پایتخت می‌شود کم و زیاد کرد)</small>' : ''}</h3>${unitRows}</section>
      <section class="card"><h3>🚚 اعزام</h3>
        <p class="muted small">ارتش در مرز «آماده‌ی حمله» می‌شود (نبرد از مرحله‌ی ۴). تجمع نیرو در مرز، همسایه را نگران می‌کند.
          راه دریایی به ازای هر ۳ واحد زمینی یک ناو جنگی لازم دارد.</p>
        <div class="dests">${dests}</div>
      </section>
      ${atHome ? `<button class="btn ghost" data-disband="${a.id}">انحلال ارتش (واحدها به ذخیره برمی‌گردند)</button>` : ''}`;
  }

  // -------------------------------------------------------------------
  function body() {
    let html = tabs();
    if (view === 'forces') html += forcesView();
    else if (view === 'production') html += productionView();
    else if (view === 'armies') html += armiesView();
    else if (view.startsWith('army:')) html += armyView(view.slice(5));
    return html;
  }

  function rerender() {
    const el = document.querySelector('.modal-body');
    if (!el || !el.querySelector('.mil-tabs')) return;
    const top = el.scrollTop;
    el.innerHTML = body();
    el.scrollTop = top;
  }

  function changed() {
    ctx.onChange();
    rerender();
  }

  function onClick(e) {
    const t = e.target.closest('button, input');
    if (!t) {
      const card = e.target.closest('[data-army]');
      if (card) { view = 'army:' + card.dataset.army; rerender(); document.querySelector('.modal-body').scrollTop = 0; }
      return;
    }
    const ds = t.dataset, st = ctx.state, id = ctx.id;
    if (ds.view) { view = ds.view; rerender(); document.querySelector('.modal-body').scrollTop = 0; return; }
    if (ds.qty) { qty[ds.qty] = Math.max(1, (qty[ds.qty] || 1) + +ds.d); rerender(); return; }
    if (ds.order) {
      const r = M.order(st, id, ds.order, qty[ds.order] || 1);
      if (r === 'money') SG.NotifyUI.simpleToast('پول کافی در خزانه نیست.', 'lvl-warning');
      else if (!r) SG.NotifyUI.simpleToast(`🏭 سفارش ${U()[ds.order].name} ثبت شد.`, 'lvl-info');
      changed(); return;
    }
    if (ds.cancel !== undefined) { M.cancelOrder(st, id, +ds.cancel); changed(); return; }
    if (ds.demob) { M.demobilize(st, id, ds.demob, 1); changed(); return; }
    if (ds.draft) { draft[ds.draft] = Math.max(0, (draft[ds.draft] || 0) + +ds.d); rerender(); return; }
    if (ds.cmd) { draftCommander = +ds.cmd; rerender(); return; }
    if (ds.create !== undefined) {
      const a = M.createArmy(st, id, draft, draftCommander);
      if (a) {
        draft = {};
        SG.NotifyUI.simpleToast(`🎖️ ${a.name} به فرماندهی ${a.commander.name} تشکیل شد.`, 'lvl-info');
        view = 'army:' + a.id;
      }
      changed(); return;
    }
    if (ds.tr) { M.transfer(st, id, view.slice(5), ds.tr, +ds.d); changed(); return; }
    if (ds.disband) { M.disbandArmy(st, id, ds.disband); view = 'armies'; changed(); return; }
    if (ds.showarmy) { SG.Modal.close(); ctx.onShowArmy(ds.showarmy); return; }
    if (ds.dest) {
      const armyId = view.slice(5);
      const [kind, target, sea] = ds.dest.split('|');
      const a = M.findArmy(st, id, armyId);
      const d = M.destinations(st, id, a).find(x => x.kind === kind && (x.target || '') === target && (x.sea ? '1' : '0') === sea);
      if (d && !M.deploy(st, id, armyId, d)) {
        SG.NotifyUI.simpleToast(`🚚 ${a.name} حرکت کرد؛ ${F.num(d.turns)} ماه تا رسیدن.`, 'lvl-info');
        changed();
      }
    }
  }

  /** @param {string} [startView] زبانه یا 'army:<id>' */
  function open(state, id, { onChange, onShowArmy }, startView) {
    ctx = { state, id, onChange, onShowArmy };
    if (startView) view = startView;
    SG.Modal.open({ title: '⚔️ ارتش — ' + state.countries[id].name, html: body(), onClick });
  }

  SG.MilitaryPanel = { open, refresh: rerender };
})(window.SG = window.SG || {});
