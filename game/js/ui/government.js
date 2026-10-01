// =====================================================================
// پنل «دولت»: بودجه، مالیات و فرمان‌ها
// ---------------------------------------------------------------------
// تغییر اسلایدرها فوراً در سیاست کشور ثبت می‌شود و اثرش از نوبت بعد اعمال می‌شود.
// پیش‌بینی (بودجه‌ی ماهانه، ثبات هدف، رشد) هم‌زمان با کشیدن اسلایدر به‌روز می‌شود.
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt, A = SG.Actions, Eco = SG.Economy;

  const SLIDERS = [
    { key: 'taxRate', label: 'نرخ مالیات', hint: 'درآمد بیشتر، ولی مردم ناراضی‌تر و رشد کندتر' },
    { key: 'welfare', label: 'رفاه و خدمات', hint: 'رضایت مردم؛ گران است' },
    { key: 'military', label: 'بودجه‌ی نظامی', hint: 'قدرت ارتش به‌تدریج به این بودجه نزدیک می‌شود' },
    { key: 'investment', label: 'سرمایه‌گذاری', hint: 'رشد اقتصادی بلندمدت' },
  ];

  let ctx = null; // { state, id, onChange }

  const pct = v => F.num(Math.round(v * 1000) / 10) + '٪';
  const signed = v => (v >= 0 ? '+' : '−') + F.money(Math.abs(v));

  function valueOf(c, key) {
    return key === 'taxRate' ? c.eco.taxRate : c.eco.policy[key];
  }

  function summaryHtml() {
    const { state, id } = ctx;
    const c = state.countries[id];
    const b = Eco.computeBudget(state, id);
    const months = Eco.monthsOfReserve(state, id);
    const target = Eco.stabilityTarget(state, id);
    const growth = Eco.growthRate(state, id) * 100;
    const m = v => F.money(v / 12);
    const row = (t, v, cls = '') => `<div class="b-row ${cls}"><span>${t}</span><b>${v}</b></div>`;

    return `
      <div class="gov-kpis">
        <div class="kpi"><span>تراز ماهانه</span><b class="${b.monthly >= 0 ? 'good' : 'bad'}">${signed(b.monthly)}</b></div>
        <div class="kpi"><span>خزانه</span><b>${F.money(c.eco.treasury)}</b>
          <small>${months === Infinity ? 'رو به افزایش' : `${F.num(Math.floor(months))} ماه تا خالی شدن`}</small></div>
        <div class="kpi"><span>ثبات</span><b>${F.num(Math.round(c.stability))}</b>
          <small class="${target >= c.stability ? 'good' : 'bad'}">${target >= c.stability + 0.5 ? '▲' : target <= c.stability - 0.5 ? '▼' : '='} به سمت ${F.num(Math.round(target))}</small></div>
        <div class="kpi"><span>رشد اقتصاد</span><b class="${growth >= 0 ? 'good' : 'bad'}">${F.num(Math.round(growth * 10) / 10)}٪</b><small>سالانه</small></div>
      </div>
      <details class="budget" open>
        <summary>جزئیات بودجه‌ی ماهانه</summary>
        <div class="b-cols">
          <div>
            <div class="b-title good">درآمد ${m(b.revenue)}</div>
            ${row('مالیات', m(b.tax))}
            ${b.energyExport ? row('صادرات انرژی', m(b.energyExport)) : ''}
            ${b.aid ? row('کمک خارجی', m(b.aid)) : ''}
            ${row('کارایی جمع مالیات', pct(b.eff), 'muted')}
          </div>
          <div>
            <div class="b-title bad">هزینه ${m(b.expenses)}</div>
            ${row('ارتش (نگهداری)', m(b.military))}
            ${b.production ? row('تولید نظامی', m(b.production)) : ''}
            ${row('رفاه', m(b.welfare))}
            ${row('سرمایه‌گذاری', m(b.investment))}
            ${row('اداره‌ی دولت', m(b.admin))}
            ${row(`بهره‌ی بدهی (${pct(b.rate)})`, m(b.interest))}
            ${b.energyImport ? row('واردات انرژی', m(b.energyImport)) : ''}
          </div>
        </div>
        <div class="b-foot muted small">
          بدهی: ${pct(c.eco.debt / c.gdp)} GDP | تورم: ${F.num(Math.round(c.eco.inflation * 10) / 10)}٪
          ${b.pressure > 0.01 ? ` | فشار تحریم: ${pct(b.pressure)}` : ''}
          | قیمت انرژی: ${F.num(Math.round(state.world.energyPrice / 0.6 * 100))}٪ قیمت پایه
        </div>
      </details>`;
  }

  function decreesHtml() {
    const { state, id } = ctx;
    const texts = window.SG_DATA.decrees, reasons = window.SG_DATA.decreeReasons;
    return Object.keys(A.DECREES).map(k => {
      const st = A.status(state, id, k), t = texts[k];
      const sub = st.ready
        ? (st.cost > 0 ? 'هزینه: ' + F.money(st.cost) : 'رایگان')
        : (st.reason === 'cooldown' ? `${F.num(st.waitTurns)} ماه دیگر` : reasons[st.reason]);
      return `<button class="decree ${st.ready ? '' : 'off'}" data-decree="${k}" ${st.ready ? '' : 'disabled'}>
        <span class="d-icon">${t.icon}</span>
        <span class="d-main"><b>${t.name}</b><small>${t.desc}</small></span>
        <span class="d-cost">${sub}</span>
      </button>`;
    }).join('');
  }

  function slidersHtml() {
    const c = ctx.state.countries[ctx.id];
    const units = c.mil && c.mil.useUnits;
    return SLIDERS.map(s => {
      if (s.key === 'military' && units) {
        // با سیستم واحدها، هزینه‌ی نظامی از تعداد واحدها می‌آید (پنل ارتش)
        return `<div class="slider"><div class="s-head"><b>بودجه‌ی نظامی</b>
          <span class="s-val">${pct((SG.Military.upkeepMonthly(c) + SG.Military.productionCostMonthly(ctx.state, c)) * 12 / c.gdp)}</span></div>
          <small class="muted">هزینه‌ی نظامی = نگهداری نیروها + خطوط تولید روشن. برای تغییرش در پنل ⚔️ ارتش خطوط تولید را روشن/خاموش کنید یا نیرو مرخص کنید.</small></div>`;
      }
      const [lo, hi] = A.LIMITS[s.key];
      const v = valueOf(c, s.key);
      const ref = s.key === 'taxRate' ? c.eco.ref.tax : c.eco.ref[s.key];
      return `<div class="slider">
        <div class="s-head"><b>${s.label}</b><span class="s-val" data-val="${s.key}">${pct(v)}</span>
          <small class="muted">(اول بازی ${pct(ref)})</small></div>
        <input type="range" min="${lo * 1000}" max="${hi * 1000}" step="5" value="${Math.round(v * 1000)}" data-slider="${s.key}">
        <small class="muted">${s.hint}</small>
      </div>`;
    }).join('');
  }

  function refresh() {
    const root = document.querySelector('.modal-body .gov');
    if (!root) return;
    root.querySelector('.gov-summary').innerHTML = summaryHtml();
    root.querySelector('.gov-decrees').innerHTML = decreesHtml();
  }

  function open(state, id, onChange) {
    ctx = { state, id, onChange };
    SG.Modal.open({
      title: '🏛️ دولت — ' + state.countries[id].name,
      html: `<div class="gov">
        <div class="gov-summary"></div>
        <button class="btn" data-econ>💼 مشاور اقتصادی: الان چه کنم؟</button>
        <section class="card"><h3>📊 سیاست‌ها (از نوبت بعد اعمال می‌شود)</h3>${slidersHtml()}</section>
        <section class="card"><h3>📜 فرمان‌ها</h3><div class="gov-decrees"></div></section>
      </div>`,
      onClick: e => {
        if (e.target.closest('[data-econ]')) {
          SG.AdvisorPanel.open(ctx.state, ctx.id, () => {}, 'economy', ctx.onChange);
          return;
        }
        const d = e.target.closest('[data-decree]');
        if (!d) return;
        const ok = A.perform(ctx.state, ctx.id, d.dataset.decree);
        if (ok) SG.NotifyUI.simpleToast(`${window.SG_DATA.decrees[d.dataset.decree].icon} فرمان «${window.SG_DATA.decrees[d.dataset.decree].name}» اجرا شد.`, 'lvl-info');
        refresh();
        ctx.onChange();
      },
    });
    document.querySelectorAll('.modal-body [data-slider]').forEach(inp => {
      inp.addEventListener('input', () => {
        A.setPolicy(ctx.state, ctx.id, inp.dataset.slider, inp.value / 1000);
        const c = ctx.state.countries[ctx.id];
        document.querySelector(`.modal-body [data-val="${inp.dataset.slider}"]`).textContent = pct(valueOf(c, inp.dataset.slider));
        refresh();
        ctx.onChange();
      });
    });
    refresh();
  }

  /** اجرای فرمان از بیرون (مثلاً دکمه‌ی اعلان). خروجی: متن نتیجه */
  function runDecree(state, id, key) {
    const st = A.status(state, id, key);
    const t = window.SG_DATA.decrees[key];
    if (!st.ready) {
      const r = st.reason === 'cooldown' ? `${F.num(st.waitTurns)} ماه دیگر آماده می‌شود` : window.SG_DATA.decreeReasons[st.reason];
      return { ok: false, text: `${t.icon} «${t.name}» ممکن نیست: ${r}.` };
    }
    A.perform(state, id, key);
    return { ok: true, text: `${t.icon} فرمان «${t.name}» اجرا شد.` };
  }

  SG.Government = { open, refresh, runDecree };
})(window.SG = window.SG || {});
