// =====================================================================
// نوار منابع (بالا) و نوار فرمان (پایین): خزانه، ثبات، انرژی، ... و دکمه‌ی نوبت بعد
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt, Eco = SG.Economy;

  const SPEEDS = [
    { label: '۱×', ms: 2600 },
    { label: '۲×', ms: 1300 },
    { label: '۴×', ms: 600 },
  ];

  function arrow(now, prev) {
    if (prev === undefined) return '';
    if (now > prev + 0.3) return '<i class="up">▲</i>';
    if (now < prev - 0.3) return '<i class="down">▼</i>';
    return '';
  }

  /** نوار منابع */
  function renderResources(state) {
    const el = document.getElementById('hud');
    const c = state.countries[state.playerId];
    const b = Eco.computeBudget(state, state.playerId);
    const h = c.eco.history;
    const prev = h.length >= 2 ? h[h.length - 2] : undefined;
    const surplus = Eco.energyProduction(c) - c.energy.consumption;
    const stabCls = c.stability < 30 ? 'bad' : c.stability < 50 ? 'mid' : 'good';
    const inflCls = c.eco.inflation > 30 ? 'bad' : c.eco.inflation > 10 ? 'mid' : '';

    el.innerHTML = `
      <button class="res" data-open="government" title="خزانه و تراز ماهانه">
        <span class="r-icon">💰</span><b>${F.money(c.eco.treasury)}</b>
        <small class="${b.monthly >= 0 ? 'good' : 'bad'}">${b.monthly >= 0 ? '+' : '−'}${F.money(Math.abs(b.monthly))}/ماه</small>
      </button>
      <button class="res" data-open="government" title="ثبات داخلی (رضایت مردم)">
        <span class="r-icon">⚖️</span><b class="${stabCls}">${F.num(Math.round(c.stability))}</b>${arrow(c.stability, prev?.stability)}
      </button>
      <button class="res" data-open="government" title="تراز انرژی: تولید منهای مصرف">
        <span class="r-icon">🛢️</span><b class="${surplus >= 0 ? 'good' : 'bad'}">${surplus >= 0 ? '+' : '−'}${F.num(Math.round(Math.abs(surplus)))}</b>
      </button>
      <button class="res" data-open="government" title="تورم سالانه">
        <span class="r-icon">🔥</span><b class="${inflCls}">${F.num(Math.round(c.eco.inflation))}٪</b>
      </button>
      <button class="res wide" data-open="government" title="تولید ناخالص و رشد سالانه">
        <span class="r-icon">📈</span><b>${F.money(c.gdp)}</b>
        <small class="${c.eco.growth >= 0 ? 'good' : 'bad'}">${F.num(Math.round(c.eco.growth * 1000) / 10)}٪</small>
      </button>`;
  }

  /** نوار فرمان پایین */
  function renderActionBar(state, autoplay) {
    const el = document.getElementById('actionbar');
    const over = !!state.gameOver;
    const atWar = SG.War ? SG.War.warsOfCountry(state, state.playerId).length : 0;
    el.innerHTML = `
      <button class="ab" data-open="government">🏛️<span>دولت</span></button>
      <button class="ab" data-open="military">⚔️<span>ارتش</span></button>
      ${atWar ? `<button class="ab at-war" data-open="war" title="در جنگیم — دستور جنگ و صلح">🔥<span>جنگ</span><i class="ab-badge">${SG.Fmt.num(atWar)}</i></button>` : ''}
      <button class="ab" data-open="advisor">🧑‍💼<span>مشاور</span></button>
      <div class="ab-turn">
        <button class="ab" data-play title="${autoplay.on ? 'توقف' : 'پخش خودکار'}" ${over ? 'disabled' : ''}>${autoplay.on ? '⏸' : '▶'}</button>
        <button class="ab speed" data-speed title="سرعت">${SPEEDS[autoplay.speed].label}</button>
        <button class="ab next" data-next ${over ? 'disabled' : ''}>⏭<span>نوبت بعد</span></button>
      </div>`;
  }

  SG.Hud = { renderResources, renderActionBar, SPEEDS };
})(window.SG = window.SG || {});
