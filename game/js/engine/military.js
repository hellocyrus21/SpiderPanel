// =====================================================================
// موتور نظامی: نیروها، تولید، ارتش‌ها، حرکت و تدارکات
// ---------------------------------------------------------------------
// - هر کشور «نیروهای ذخیره» (forces) دارد: تعداد هر نوع واحد که در پادگان است.
// - بازیکن از نیروهای ذخیره «ارتش» می‌سازد، برایش فرمانده می‌گذارد و روی نقشه اعزامش می‌کند.
// - حرکت چند نوبت طول می‌کشد (فاصله ÷ سرعت کندترین واحد).
// - شاخص قدرت هر شاخه (land, air, ...) از روی تعداد واحدها حساب می‌شود (مقیاس لگاریتمی).
// - نبرد در مرحله‌ی ۴ اضافه می‌شود.
// تعریف واحدها در data/units.js است؛ هیچ قانونی مخصوص کشور خاصی نیست.
// =====================================================================
(function (SG) {
  'use strict';

  const D = () => window.SG_DATA;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const BRANCHES = ['land', 'air', 'navy', 'missile', 'airDefense', 'cyber', 'drone'];

  // -------------------------------------------------------------------
  // ابزار
  // -------------------------------------------------------------------
  /** فاصله‌ی دو نقطه روی کره‌ی زمین (کیلومتر) */
  function distanceKm([lon1, lat1], [lon2, lat2]) {
    const R = 6371, toRad = Math.PI / 180;
    const dLat = (lat2 - lat1) * toRad, dLon = (lon2 - lon1) * toRad;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  function emptyForces() {
    const f = {};
    for (const k of Object.keys(D().units)) f[k] = 0;
    return f;
  }

  function addUnits(target, units, sign = 1) {
    for (const [k, n] of Object.entries(units)) target[k] = (target[k] || 0) + sign * n;
  }

  function countUnits(units) {
    return Object.values(units).reduce((s, n) => s + n, 0);
  }

  /** همه‌ی نیروهای یک کشور (ذخیره + داخل ارتش‌ها) */
  function totalForces(c) {
    const t = { ...c.forces };
    if (c.mil && c.mil.armies) for (const a of c.mil.armies) addUnits(t, a.units);
    return t;
  }

  // -------------------------------------------------------------------
  // تبدیل شاخص قدرت ↔ تعداد واحد
  // -------------------------------------------------------------------
  function branchStrength(units, branch) {
    let s = 0;
    for (const [k, def] of Object.entries(D().units)) if (def.branch === branch) s += (units[k] || 0) * def.power;
    return s;
  }

  function strengthToIndex(strength, branch) {
    const ref = D().branchRef[branch];
    return 100 * Math.log(1 + strength) / Math.log(1 + ref);
  }

  function indexToStrength(index, branch) {
    const ref = D().branchRef[branch];
    return Math.pow(1 + ref, index / 100) - 1;
  }

  /** نیروهای اولیه‌ی یک کشور از روی شاخص‌های قدرتش */
  function generateForces(c) {
    const f = emptyForces();
    const defs = D().units, mix = D().unitMix;
    for (const b of BRANCHES) {
      const strength = indexToStrength(c.military[b] || 0, b);
      for (const [type, share] of Object.entries(mix[b])) {
        f[type] = Math.round(strength * share / defs[type].power);
      }
    }
    return f;
  }

  /** به‌روز کردن شاخص‌های قدرت از روی واحدهای واقعی (برای بازیکن) */
  function refreshIndices(c) {
    const t = totalForces(c);
    for (const b of BRANCHES) c.military[b] = Math.round(strengthToIndex(branchStrength(t, b), b) * 10) / 10;
  }

  // -------------------------------------------------------------------
  // راه‌اندازی
  // -------------------------------------------------------------------
  /** نیروی اولیه برای همه‌ی کشورها + «سطح فناوری» هر شاخه (برای مجوز ساخت واحدها) */
  function init(state) {
    for (const c of Object.values(state.countries)) {
      c.forces = generateForces(c);
      c.tech = {};
      for (const b of BRANCHES) c.tech[b] = c.military[b];
    }
  }

  function newCommander(state, c, rng) {
    const D_ = D();
    const pool = D_.commanderNames[D_.commanderRegion[c.id] || 'en'];
    state.nextCommanderId = (state.nextCommanderId || 0) + 1;
    return {
      id: state.nextCommanderId,
      name: `${rng.pick(D_.commanderRanks)} ${rng.pick(pool.first)} ${rng.pick(pool.last)}`,
      attack: rng.int(1, 5), defense: rng.int(1, 5), logistics: rng.int(1, 5),
    };
  }

  /** فعال کردن سیستم واحدها برای کشور بازیکن */
  function startPlayer(state, pid) {
    const c = state.countries[pid];
    const rng = SG.Rng.create(state.rngState);
    const raw = rawUpkeep(totalForces(c));
    const budget = c.gdp * c.eco.policy.military / 12;
    c.mil = {
      useUnits: true,
      // ضریب هزینه: حقوق و نگهداری در هر کشور فرق دارد؛ طوری تنظیم می‌شود که بودجه‌ی اول بازی حفظ شود
      upkeepFactor: raw > 0 ? clamp(budget / raw, 0.12, 4) : 1,
      fuelBase: fuelUse(c),
      queue: [],
      armies: [],
      nextArmy: 0,
      commanders: [newCommander(state, c, rng), newCommander(state, c, rng), newCommander(state, c, rng)],
    };
    c.mil.fuelBase = fuelUse(c);
    refreshIndices(c);
    state.rngState = rng.getState();
  }

  // -------------------------------------------------------------------
  // هزینه، سوخت، کارخانه
  // -------------------------------------------------------------------
  function rawUpkeep(units) {
    let s = 0;
    for (const [k, n] of Object.entries(units)) s += n * (D().units[k]?.upkeep || 0);
    return s;
  }

  /** هزینه‌ی نگهداری ماهانه‌ی کل ارتش (میلیارد دلار) */
  function upkeepMonthly(c) {
    return rawUpkeep(totalForces(c)) * (c.mil?.upkeepFactor || 1);
  }

  /** مصرف سوخت ارتش (واحد انرژی در سال) — ارتش در حال حرکت دو برابر مصرف می‌کند */
  function fuelUse(c) {
    let s = 0;
    const defs = D().units;
    for (const [k, n] of Object.entries(c.forces)) s += n * defs[k].fuel;
    if (c.mil && c.mil.armies) {
      for (const a of c.mil.armies) {
        const mult = a.move ? 2 : 1.2;
        for (const [k, n] of Object.entries(a.units)) s += n * defs[k].fuel * mult;
      }
    }
    return s;
  }

  /** سوخت اضافه نسبت به شروع بازی (که به مصرف انرژی کشور اضافه می‌شود) */
  function extraFuel(c) {
    if (!c.mil) return 0;
    return Math.max(0, fuelUse(c) - c.mil.fuelBase);
  }

  /** ظرفیت کارخانه‌ها: چند واحد هم‌زمان می‌شود ساخت */
  function factories(c) {
    return Math.max(1, Math.round(Math.sqrt(c.gdp) / 6));
  }

  /** هزینه و زمان ساخت (با اثر تحریم روی تجهیزات پیشرفته) */
  function buildTerms(state, c, type) {
    const def = D().units[type];
    const pressure = SG.Economy.sanctionPressure(state, c.id);
    const hit = def.advanced && pressure >= 0.3;
    return {
      cost: def.cost * (hit ? 1.5 : 1),
      time: Math.ceil(def.time * (hit ? 1.5 : 1)),
      sanctioned: hit,
      allowed: (c.tech[def.branch] || 0) >= def.requires,
    };
  }

  // -------------------------------------------------------------------
  // تولید
  // -------------------------------------------------------------------
  /** سفارش ساخت. خروجی: null یا دلیل رد ('tech' | 'money' | 'capacity') */
  function order(state, pid, type, qty) {
    const c = state.countries[pid];
    const t = buildTerms(state, c, type);
    qty = Math.max(1, Math.min(qty, factories(c)));
    if (!t.allowed) return 'tech';
    const cost = t.cost * qty;
    if (cost > c.eco.treasury) return 'money';
    c.eco.treasury -= cost;
    c.mil.queue.push({ type, qty, left: t.time, total: t.time });
    return null;
  }

  function cancelOrder(state, pid, index) {
    const c = state.countries[pid];
    const item = c.mil.queue[index];
    if (!item) return;
    // نیمی از پول برمی‌گردد
    c.eco.treasury += buildTerms(state, c, item.type).cost * item.qty * 0.5;
    c.mil.queue.splice(index, 1);
  }

  /** مرخص کردن واحدها از ذخیره (برای کم کردن هزینه) */
  function demobilize(state, pid, type, qty) {
    const c = state.countries[pid];
    c.forces[type] = Math.max(0, c.forces[type] - qty);
    refreshIndices(c);
  }

  // -------------------------------------------------------------------
  // ارتش‌ها
  // -------------------------------------------------------------------
  function createArmy(state, pid, units, commanderId) {
    const c = state.countries[pid];
    for (const [k, n] of Object.entries(units)) if (n < 0 || (c.forces[k] || 0) < n) return null;
    if (countUnits(units) === 0) return null;
    const ci = c.mil.commanders.findIndex(x => x.id === commanderId);
    if (ci < 0) return null;
    const rng = SG.Rng.create(state.rngState);
    const commander = c.mil.commanders.splice(ci, 1)[0];
    c.mil.commanders.push(newCommander(state, c, rng));
    state.rngState = rng.getState();

    const ord = D().armyOrdinals;
    const n = c.mil.nextArmy++;
    const clean = {};
    for (const [k, v] of Object.entries(units)) if (v > 0) clean[k] = v;
    addUnits(c.forces, clean, -1);
    const army = {
      id: 'A' + (state.nextArmyId = (state.nextArmyId || 0) + 1),
      name: 'ارتش ' + (ord[n] || String(n + 1)),
      owner: pid,
      units: clean,
      commander,
      loc: { kind: 'home', target: null },
      pos: c.pos.slice(),
      move: null,
      supply: 100,
      morale: 100,
      experience: 0,
    };
    c.mil.armies.push(army);
    return army;
  }

  function findArmy(state, pid, armyId) {
    return state.countries[pid].mil.armies.find(a => a.id === armyId);
  }

  /** انحلال ارتش: واحدها به ذخیره برمی‌گردند (فقط وقتی در خانه است) */
  function disbandArmy(state, pid, armyId) {
    const c = state.countries[pid];
    const a = findArmy(state, pid, armyId);
    if (!a || a.loc.kind !== 'home' || a.move) return false;
    addUnits(c.forces, a.units);
    c.mil.commanders.push(a.commander);
    c.mil.armies = c.mil.armies.filter(x => x !== a);
    return true;
  }

  /** افزودن/برداشتن واحد بین ذخیره و ارتش (فقط در خانه) */
  function transfer(state, pid, armyId, type, delta) {
    const c = state.countries[pid];
    const a = findArmy(state, pid, armyId);
    if (!a || a.loc.kind !== 'home' || a.move) return false;
    if (delta > 0 && (c.forces[type] || 0) < delta) return false;
    if (delta < 0 && (a.units[type] || 0) < -delta) return false;
    if (delta < 0 && countUnits(a.units) + delta <= 0) return false;  // ارتش خالی نشود
    c.forces[type] -= delta;
    a.units[type] = (a.units[type] || 0) + delta;
    if (!a.units[type]) delete a.units[type];
    return true;
  }

  /** سرعت ارتش = کندترین واحد متحرک (موشک و سایبری همراه ارتش جابه‌جا می‌شوند) */
  function armySpeed(a) {
    let s = Infinity;
    for (const [k, n] of Object.entries(a.units)) {
      const sp = D().units[k].speed;
      if (n > 0 && sp > 0) s = Math.min(s, sp);
    }
    return s === Infinity ? 500 : s;
  }

  /** آیا ارتش می‌تواند از راه دریا برود؟ (هر ناو ۳ واحد زمینی را جابه‌جا می‌کند) */
  function seaCapacityOk(a) {
    let land = 0;
    for (const [k, n] of Object.entries(a.units)) if (D().units[k].branch === 'land' || k === 'airdefense') land += n;
    return land <= (a.units.ship || 0) * 3;
  }

  /** مقصدهای ممکن برای یک ارتش */
  function destinations(state, pid, army) {
    const c = state.countries[pid];
    const list = [{ kind: 'home', target: null, pos: c.pos.slice(), sea: false }];
    for (const n of c.neighbors) {
      if (c.borderPos[n]) list.push({ kind: 'border', target: n, pos: c.borderPos[n].slice(), sea: false });
    }
    for (const n of c.seaNeighbors) {
      const o = state.countries[n];
      if (!o) continue;
      // نقطه‌ای در میانه‌ی راه دریایی، کمی نزدیک‌تر به خودمان
      const pos = [c.pos[0] * 0.55 + o.pos[0] * 0.45, c.pos[1] * 0.55 + o.pos[1] * 0.45];
      list.push({ kind: 'border', target: n, pos, sea: true, allowed: seaCapacityOk(army) });
    }
    return list.map(d => ({ ...d, turns: Math.max(1, Math.ceil(distanceKm(army.pos, d.pos) / armySpeed(army))) }));
  }

  /** اعزام ارتش. خروجی: null یا دلیل رد */
  function deploy(state, pid, armyId, dest) {
    const a = findArmy(state, pid, armyId);
    if (!a) return 'no_army';
    if (dest.sea && !seaCapacityOk(a)) return 'no_ships';
    const turns = Math.max(1, Math.ceil(distanceKm(a.pos, dest.pos) / armySpeed(a)));
    a.move = { from: a.pos.slice(), to: dest.pos.slice(), total: turns, left: turns,
      dest: { kind: dest.kind, target: dest.target, sea: !!dest.sea } };
    return null;
  }

  // -------------------------------------------------------------------
  // یک نوبت (فقط برای کشورهایی که سیستم واحد دارند)
  // -------------------------------------------------------------------
  function step(state, pid, rng) {
    const c = state.countries[pid];
    if (!c.mil || !c.mil.useUnits) return [];
    const events = [];

    // ۱) تولید: هر واحد یک جای کارخانه می‌گیرد
    let free = factories(c);
    for (const item of c.mil.queue) {
      if (item.qty <= free) { free -= item.qty; item.left--; }
    }
    const done = c.mil.queue.filter(i => i.left <= 0);
    c.mil.queue = c.mil.queue.filter(i => i.left > 0);
    for (const i of done) {
      c.forces[i.type] += i.qty;
      events.push({ type: 'built', unit: i.type, qty: i.qty });
    }

    // ۲) حرکت و تدارکات
    const pressure = SG.Economy.sanctionPressure(state, pid);
    const energyShort = c.energy.production < c.energy.consumption + extraFuel(c);
    for (const a of c.mil.armies) {
      if (a.move) {
        a.move.left--;
        const t = 1 - a.move.left / a.move.total;
        a.pos = [a.move.from[0] + (a.move.to[0] - a.move.from[0]) * t, a.move.from[1] + (a.move.to[1] - a.move.from[1]) * t];
        if (a.move.left <= 0) {
          a.pos = a.move.to.slice();
          a.loc = { kind: a.move.dest.kind, target: a.move.dest.target, sea: a.move.dest.sea };
          a.move = null;
          events.push({ type: 'arrived', army: a.id, kind: a.loc.kind, target: a.loc.target });
        }
      }
      // تدارکات هدف: خانه ۱۰۰، مرز زمینی ۹۲، مرز دریایی ۸۰، در حال حرکت ۸۵
      let target = a.move ? 85 : a.loc.kind === 'home' ? 100 : a.loc.sea ? 80 : 92;
      target += (a.commander.logistics - 3) * 2;
      if (energyShort && pressure > 0.3) target -= 10;   // کمبود سوخت زیر تحریم
      if (c.eco.treasury <= 0) target -= 15;              // پول نگهداری نیست
      const before = a.supply;
      a.supply = clamp(a.supply + (target - a.supply) * 0.3, 0, 100);
      if (before >= 55 && a.supply < 55) events.push({ type: 'supply_low', army: a.id });
      // روحیه در خانه آرام بالا می‌رود
      if (a.loc.kind === 'home' && !a.move) a.morale = Math.min(100, a.morale + 2);
    }

    // ۳) شاخص‌ها و سهم بودجه‌ی نظامی (برای فرمول رشد اقتصاد)
    refreshIndices(c);
    c.eco.policy.military = upkeepMonthly(c) * 12 / c.gdp;
    return events;
  }

  SG.Military = {
    init, startPlayer, step, generateForces, refreshIndices, totalForces, countUnits,
    upkeepMonthly, fuelUse, extraFuel, factories, buildTerms, order, cancelOrder, demobilize,
    createArmy, disbandArmy, transfer, destinations, deploy, findArmy, armySpeed, distanceKm,
    branchStrength, BRANCHES,
  };
})(window.SG = window.SG || {});
