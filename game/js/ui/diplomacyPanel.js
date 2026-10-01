// =====================================================================
// پنل «دیپلماسی» (مرحله‌ی ۵): نمای کلی روابط خارجی بازیکن
// ---------------------------------------------------------------------
//   - ترس جهان از ما (شاخص تهدید) و همسایه‌های نگران
//   - پیشنهادهای منتظر جواب (قبول/رد)
//   - متحدان، شرکای تجاری و درآمد هر کدام
//   - تحریم‌ها: چه کسانی ما را تحریم کرده‌اند (مذاکره) و چه کسانی را ما (لغو)
//   - فرصت‌ها: کشورهایی که احتمالاً قرارداد تجاری یا پیمان می‌پذیرند
// اقدام روی هر کشور از همین‌جا یا از پنل همان کشور انجام می‌شود (SG.Diplomacy).
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt, E = SG.Engine;
  let ctx = null;   // { state, pid, onChange, onGoto, onDiplo, onProposal }

  const name = (st, id) => F.esc(st.countries[id]?.name || id);
  const chip = (st, id, extra = '') => `<button class="chip" data-goto="${id}">${name(st, id)}</button>${extra}`;
  const PROP = { pact: '🛡️ پیمان دفاعی', trade: '📦 قرارداد تجاری', arms: '💰 خرید سلاح از ما', ally: '⚔️ کمک به متحد', ultimatum: '⚠️ اولتیماتوم' };

  function body() {
    const { state: st, pid } = ctx;
    const Dp = SG.Diplomacy;
    const c = st.countries[pid];
    const threat = Math.round(Dp.threatOf(st, pid) * Dp.timeFactor(st));
    const near = [...new Set([...c.neighbors, ...c.seaNeighbors])].filter(id => st.countries[id] && !st.countries[id].annexedBy);
    const worried = near.filter(id => E.getRelation(st, id, pid) < 0);
    const partners = Dp.partners(st, pid);
    const income = Dp.tradeIncome(st, pid);
    const allies = E.activeCountries(st).filter(o => o.id !== pid && E.areAllied(st, pid, o.id)).map(o => o.id);
    const sancUs = E.sanctionedBy(st, pid);
    const ourSanc = st.sanctions.filter(([a]) => a === pid).map(([, b]) => b);
    const props = (st.proposals || []).filter(p => p.to === pid);
    // فرصت‌ها: کشورهای با رابطه‌ی خوب بدون قرارداد، به ترتیب درآمد
    const opps = E.activeCountries(st).filter(o => o.id !== pid && o.gdp >= 15 && !Dp.hasTrade(st, pid, o.id))
      .map(o => ({ id: o.id, s: Dp.status(st, pid, o.id, 'trade'), v: Dp.tradeValue(st, pid, o.id) }))
      .filter(x => x.s.ok && x.s.chance >= 0.3).sort((a, b) => b.v * b.s.chance - a.v * a.s.chance).slice(0, 6);
    const pacts = E.activeCountries(st).filter(o => o.id !== pid && !Dp.hasPact(st, pid, o.id))
      .map(o => ({ id: o.id, s: Dp.status(st, pid, o.id, 'pact') })).filter(x => x.s.ok && x.s.chance >= 0.25)
      .sort((a, b) => b.s.chance - a.s.chance || E.militaryPower(st.countries[b.id]) - E.militaryPower(st.countries[a.id])).slice(0, 5);
    const thLabel = threat >= 70 ? '<b class="bad">خیلی بالا — ائتلاف علیه ما محتمل است</b>' : threat >= 50 ? '<b class="bad">بالا — همسایه‌ها نگران‌اند</b>' : threat >= 25 ? '<b class="mid">متوسط</b>' : '<b class="good">کم</b>';
    return `
      <section class="card"><h3>👁️ ترس جهان از ما</h3>
        <div class="stat-line"><span>شاخص تهدید</span><b>${F.num(threat)}</b> ${thLabel}</div>
        <div class="bar ${threat >= 50 ? 'bad' : threat >= 25 ? 'mid' : 'good'}"><span style="width:${Math.min(100, threat)}%"></span></div>
        <p class="muted small">از جنگ‌ها، فتح‌ها، باج‌گیری و قدرت نظامی ما نسبت به همسایه‌ها ساخته می‌شود و با گذشت زمان کم می‌شود. هر سال، جهان حساس‌تر می‌شود.
          تهدید بالا ← همسایه‌ها رابطه را بدتر می‌کنند، علیه ما پیمان می‌بندند، تحریم می‌کنند و ممکن است حمله کنند.</p>
        ${worried.length ? `<div class="row-label">همسایه‌های بدبین</div><div class="chips">${worried.map(id => chip(st, id)).join('')}</div>` : ''}
      </section>
      ${props.length ? `<section class="card"><h3>📨 پیشنهادهای منتظر جواب</h3>${props.map(p => `<div class="battle-row static">
          <span>${PROP[p.type] || p.type} از ${chip(st, p.from)} ${p.type === 'arms' ? `<small>${F.num(p.data.count)} ${F.esc(window.SG_DATA.units[p.data.unit].name)} | ${F.money(p.data.amount)}</small>` : p.type === 'ultimatum' ? `<small class="bad">${F.money(p.data.amount)} یا جنگ</small>` : ''}</span>
          <button class="btn tiny primary" data-prop="${p.id}" data-yes="1">قبول</button><button class="btn tiny" data-prop="${p.id}" data-yes="0">رد</button></div>`).join('')}</section>` : ''}
      <section class="card"><h3>🤝 متحدان (${F.num(allies.length)})</h3>
        <div class="chips">${allies.length ? allies.map(id => chip(st, id)).join('') : '<span class="muted">هیچ — در جنگ کسی به کمک ما نمی‌آید</span>'}</div>
        ${pacts.length ? `<div class="row-label">احتمالاً پیمان دفاعی می‌پذیرند</div><div class="battle-list">${pacts.map(x => `<div class="battle-row static">
          <span>${chip(st, x.id)} <small class="muted">قدرت ${F.num(E.militaryPower(st.countries[x.id]))}</small></span><small class="good">شانس ${F.num(Math.round(x.s.chance * 100))}٪</small>
          <button class="btn tiny" data-dip="${x.id}" data-act="pact">🛡️ پیشنهاد</button></div>`).join('')}</div>` : ''}
      </section>
      <section class="card"><h3>📦 تجارت — ${F.money(income / 12)} در ماه</h3>
        <div class="battle-list">${partners.length ? partners.slice().sort((a, b) => SG.Diplomacy.tradeValue(st, pid, b) - SG.Diplomacy.tradeValue(st, pid, a)).map(id => `<div class="battle-row static">
          <span>${chip(st, id)}</span><small class="good">+${F.money(Dp.tradeValue(st, pid, id))} در سال</small></div>`).join('') : '<p class="muted">قرارداد تجاری نداریم.</p>'}</div>
        ${opps.length ? `<div class="row-label">فرصت‌ها (احتمالاً می‌پذیرند)</div><div class="battle-list">${opps.map(x => `<div class="battle-row static">
          <span>${chip(st, x.id)}</span><small class="good">+${F.money(x.v)}/سال | شانس ${F.num(Math.round(x.s.chance * 100))}٪</small>
          <button class="btn tiny" data-dip="${x.id}" data-act="trade">📦 پیشنهاد</button></div>`).join('')}</div>` : ''}
      </section>
      <section class="card"><h3>🚫 تحریم‌ها</h3>
        <div class="row-label">ما را تحریم کرده‌اند (${F.num(sancUs.length)}) — فشار تحریم ${F.num(Math.round(SG.Economy.sanctionPressure(st, pid) * 100))}٪</div>
        <div class="battle-list">${sancUs.length ? sancUs.slice().sort((a, b) => st.countries[b].gdp - st.countries[a].gdp).map(id => {
          const s = Dp.status(st, pid, id, 'negotiate');
          return `<div class="battle-row static"><span>${chip(st, id)} <small class="muted">رابطه ${F.num(E.getRelation(st, pid, id))}</small></span>
            <small class="${s.ok && s.chance >= 0.3 ? 'good' : s.ok && s.chance > 0 ? 'mid' : 'muted'}">${s.ok ? `شانس ${F.num(Math.round(s.chance * 100))}٪ | ${F.money(s.cost)}` : s.reason === 'cooldown' ? `${F.num(s.wait)} ماه صبر` : ''}</small>
            <button class="btn tiny" data-dip="${id}" data-act="negotiate" ${s.ok ? '' : 'disabled'}>🕊️ مذاکره</button></div>`;
        }).join('') : '<p class="muted">هیچ کشوری.</p>'}</div>
        ${ourSanc.length ? `<div class="row-label">ما تحریم کرده‌ایم</div><div class="battle-list">${ourSanc.map(id => `<div class="battle-row static"><span>${chip(st, id)}</span>
          <button class="btn tiny" data-dip="${id}" data-act="lift">✅ لغو</button></div>`).join('')}</div>` : ''}
        <p class="muted small">برای تحریم یک کشور، روی آن بزنید ← «🕊️ دیپلماسی» ← «🚫 تحریم».</p>
      </section>`;
  }

  function onClick(e) {
    const t = e.target.closest('button');
    if (!t) return;
    const ds = t.dataset;
    if (ds.goto) { SG.Modal.close(); ctx.onGoto(ds.goto); return; }
    if (ds.dip) { ctx.onDiplo(ds.dip, ds.act); rerender(); return; }
    if (ds.prop) { ctx.onProposal(ds.prop, ds.yes === '1'); rerender(); }
  }

  function rerender() {
    const el = document.querySelector('.modal-body');
    if (!el || !el.querySelector('.dip-panel') || !ctx) return;
    const top = el.scrollTop;
    el.innerHTML = `<div class="dip-panel">${body()}</div>`;
    el.scrollTop = top;
  }

  function open(state, pid, handlers) {
    ctx = { state, pid, ...handlers };
    SG.Modal.open({ title: '🌐 دیپلماسی — ' + state.countries[pid].name, html: `<div class="dip-panel">${body()}</div>`, onClick });
  }

  SG.DiplomacyPanel = { open, refresh: rerender };
})(window.SG = window.SG || {});
