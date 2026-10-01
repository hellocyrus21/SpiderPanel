// =====================================================================
// فرمان‌های دولت (تصمیم‌های یک‌باره با هزینه و زمان انتظار)
// ---------------------------------------------------------------------
// هر فرمان: هزینه، شرط، اثر و «زمان انتظار» (cooldown) دارد.
// هوش مصنوعی کشورها در مرحله‌ی ۵ از همین فرمان‌ها استفاده می‌کند (بدون تقلب).
// اثرهای موقت در c.eco.mods ذخیره می‌شوند: { stat, value, turns }
//   stat: stability | growth | expense | taxEff | inflation
// =====================================================================
(function (SG) {
  'use strict';
  const Eco = () => SG.Economy;

  const DECREES = {
    // بسته‌ی حمایتی: پول می‌دهی، رضایت می‌خری
    welfare_package: {
      cooldown: 8,
      cost: c => c.gdp * 0.006,
      apply: c => { c.eco.mods.push({ stat: 'stability', value: 9, turns: 6 }); },
    },
    // سرکوب: ارزان و فوری، ولی بعدش واکنش منفی (در دموکراسی شدیدتر)
    crackdown: {
      cooldown: 6,
      cost: c => c.gdp * 0.001,
      apply: c => {
        c.stability = Math.min(100, c.stability + 6);
        c.eco.mods.push({ stat: 'stability', value: 8, turns: 3 });
        c.eco.mods.push({ stat: 'stability', value: c.gov === 'D' ? -12 : -5, turns: 10 });
      },
    },
    // وام خارجی: پول نقد امروز، بدهی و بهره‌ی فردا
    foreign_loan: {
      cooldown: 12,
      cost: () => 0,
      available: (state, c) => Eco().canBorrow(state, c) ? null : 'no_credit',
      apply: c => { const v = c.gdp * 0.03; c.eco.treasury += v; c.eco.debt += v * 1.1; },
    },
    // چاپ پول: همیشه ممکن است، ولی تورم می‌آورد
    print_money: {
      cooldown: 3,
      cost: () => 0,
      apply: c => { c.eco.treasury += c.gdp * 0.02; c.eco.baseInflation += 6; c.eco.inflation += 2; },
    },
    // ریاضت: هزینه‌ها کم، تورم کم، مردم ناراضی
    austerity: {
      cooldown: 12,
      cost: () => 0,
      apply: c => {
        c.eco.mods.push({ stat: 'expense', value: -0.015, turns: 6 });
        c.eco.mods.push({ stat: 'stability', value: -7, turns: 6 });
        c.eco.mods.push({ stat: 'inflation', value: -12, turns: 6 });   // سالانه، روی تورم پایه
        c.eco.mods.push({ stat: 'growth', value: -0.01, turns: 6 });
      },
    },
    // طرح عمرانی بزرگ: گران، ولی رشد بلندمدت
    infrastructure: {
      cooldown: 12,
      cost: c => c.gdp * 0.02,
      apply: c => { c.eco.mods.push({ stat: 'growth', value: 0.012, turns: 18 }); },
    },
    // مبارزه با فساد: مالیات بهتر جمع می‌شود
    anti_corruption: {
      cooldown: 18,
      cost: c => c.gdp * 0.003,
      apply: c => {
        c.eco.mods.push({ stat: 'taxEff', value: 0.06, turns: 18 });
        c.eco.mods.push({ stat: 'stability', value: 3, turns: 6 });
      },
    },
  };

  /** وضعیت یک فرمان برای یک کشور: { cost, ready, reason, waitTurns } */
  function status(state, id, key) {
    const d = DECREES[key], c = state.countries[id];
    const cost = d.cost(c);
    const last = c.eco.decrees?.[key];
    const waitTurns = last === undefined ? 0 : Math.max(0, last + d.cooldown - state.turn);
    let reason = null;
    if (waitTurns > 0) reason = 'cooldown';
    else if (cost > c.eco.treasury) reason = 'no_money';
    else if (d.available) reason = d.available(state, c);
    return { cost, ready: !reason, reason, waitTurns };
  }

  /** اجرای فرمان. خروجی: true اگر اجرا شد */
  function perform(state, id, key) {
    const st = status(state, id, key);
    if (!st.ready) return false;
    const c = state.countries[id];
    c.eco.treasury -= st.cost;
    DECREES[key].apply(c, state);
    (c.eco.decrees ||= {})[key] = state.turn;
    return true;
  }

  /** تغییر سیاست‌های پیوسته (مالیات و بودجه‌ها) — در محدوده‌ی مجاز */
  const LIMITS = {
    taxRate: [0.05, 0.55], military: [0.003, 0.2], welfare: [0.01, 0.3], investment: [0, 0.12],
  };
  function setPolicy(state, id, key, value) {
    const c = state.countries[id];
    const [lo, hi] = LIMITS[key];
    const v = Math.max(lo, Math.min(hi, value));
    if (key === 'taxRate') c.eco.taxRate = v;
    else c.eco.policy[key] = v;
  }

  SG.Actions = { DECREES, status, perform, setPolicy, LIMITS };
})(window.SG = window.SG || {});
