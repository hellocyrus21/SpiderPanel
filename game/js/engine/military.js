// =====================================================================
// موتور نظامی: نیروها در شهرها، کارخانه‌ها، جابه‌جایی و تدارکات
// ---------------------------------------------------------------------
// مدل ساده:
//   - نیروهای بازیکن به‌صورت «دسته» (stack) روی نقشه‌اند: یک نوع واحد + تعداد + محل.
//     مثلاً «۲۸ زرهی در تهران». روی دسته می‌زنی، تعداد دلخواه را به یک مرز یا شهر می‌فرستی.
//   - پیاده و زرهی «واحد» (لشکر/تیپ) شمرده می‌شوند؛ بقیه تعداد واقعی‌اند (فروند، قبضه، ...).
//   - هر نوع واحد کارخانه‌ی خودش را دارد. تولید هر کارخانه در همه‌ی کشورها یکسان است
//     (مثلاً کارخانه‌ی موشک ماهی ۳۰ فروند)؛ تفاوت کشورها در تعداد کارخانه‌هاست.
//     فناوری فقط تعیین می‌کند کدام کارخانه را می‌شود داشت. هر کارخانه نگهداری ماهانه هم دارد.
//   - تخصص کشور = انبار اولیه‌ی بیشتر + کارخانه‌ی بیشتر در شروع (data/units.js ← specialties).
//   - شاخص قدرت هر شاخه (land, air, ...) از تعداد واقعی واحدها حساب می‌شود.
// نبرد در engine/war.js است (مرحله‌ی ۴). کشورهای هوش مصنوعی فقط وقتی در جنگ‌اند دسته روی نقشه دارند
// (c.wstacks)؛ بازیکن همیشه (c.mil.stacks). هیچ قانونی مخصوص کشور خاصی نیست؛ تفاوت‌ها از data/units.js است.
// =====================================================================
(function (SG) {
  'use strict';

  const D = () => window.SG_DATA;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const BRANCHES = ['land', 'air', 'navy', 'missile', 'airDefense', 'cyber', 'drone'];
  const LAND = ['infantry', 'armor', 'artillery', 'airdefense'];
  const AIR = ['fighter', 'bomber', 'drone'];
  const NAVY = ['ship', 'submarine'];

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

  function branchStrength(units, branch) {
    let s = 0;
    for (const [k, def] of Object.entries(D().units)) if (def.branch === branch) s += (units[k] || 0) * def.power;
    return s;
  }

  function indexToStrength(index, branch) {
    return Math.pow(1 + D().branchRef[branch], index / 100) - 1;
  }

  /** توان فناوری کشور در ساخت یک نوع (۰.۴ تا ۱.۲) */
  function capability(c, type) {
    const b = D().units[type].branch;
    return 0.4 + 0.8 * clamp((c.tech[b] || 0) / 100, 0, 1);
  }

  /** دسته‌های روی نقشه‌ی یک کشور: بازیکن ← c.mil.stacks ، هوش مصنوعی در جنگ ← c.wstacks */
  function stacksOf(c) {
    if (c.mil && c.mil.useUnits) return c.mil.stacks;
    return c.wstacks || [];   // کشور بسیج‌نشده دسته ندارد (war.mobilize آرایه را می‌سازد)
  }
  const hasStacks = c => !!((c.mil && c.mil.useUnits) || c.wstacks);

  /** شهرهای این کشور (جنگ درصدی است و شهرها جدا اشغال نمی‌شوند) */
  function ownCities(state, c) {
    return c.cities;
  }

  function specialty(c, type) {
    return (D().specialties[c.id] || {})[type] || {};
  }

  /** برد این نوع واحد برای این کشور (پیش‌فرض یا تخصص کشور؛ بعداً درخت پیشرفت) */
  function rangeOf(c, type) {
    return (c.ranges && c.ranges[type]) || D().units[type].range;
  }

  // -------------------------------------------------------------------
  // راه‌اندازی همه‌ی کشورها: نیرو، کارخانه، برد
  // -------------------------------------------------------------------
  /** انبار اولیه: داده‌ی دستی یا تبدیل شاخص به تعداد؛ سپس × ضریب تخصص (stock) */
  function generateForces(c) {
    const manual = D().initialForces[c.id];
    const f = emptyForces();
    if (manual) Object.assign(f, manual);
    else {
      const defs = D().units, mix = D().unitMix;
      for (const b of BRANCHES) {
        const strength = indexToStrength(c.military[b] || 0, b);
        for (const [type, share] of Object.entries(mix[b])) f[type] = Math.round(strength * share / defs[type].power);
      }
    }
    for (const type of Object.keys(f)) {
      const m = specialty(c, type).stock;
      if (m && f[type]) f[type] = Math.round(f[type] * m);
    }
    return f;
  }

  function generateFactories(c) {
    const defs = D().units;
    const manual = D().initialForces[c.id];
    const size = clamp(Math.log10(Math.max(c.gdp, 1)) / 3.5, 0.3, 1.3);
    const f = {};
    for (const [type, def] of Object.entries(defs)) {
      const idx = c.military[def.branch] || 0;
      if ((c.tech[def.branch] || 0) < def.factory.requires) { f[type] = 0; continue; }
      // کشوری که این سلاح را اصلاً ندارد، کارخانه‌اش را هم ندارد (ولی می‌تواند بسازد)
      if (manual && !manual[type]) { f[type] = 0; continue; }
      // تعداد کارخانه (نه سرعت تولید) نشان قدرت صنعتی است؛ عمداً کم تا کشورها سریع مسلح نشوند
      let n;
      if (type === 'fighter' || type === 'bomber') n = Math.floor((idx - 40) / 25 * size) - (type === 'bomber' ? 1 : 0);   // پرتولید و گران: کمیاب
      else if (type === 'ship' || type === 'submarine') n = Math.floor((idx - 15) / 40 * size) - (type === 'submarine' ? 1 : 0);
      else if (type === 'icbm') n = c.military.nuclear ? Math.floor((idx - 70) / 20 * size) : 0;
      else n = Math.floor(idx / 45 * size);
      n = Math.max(0, n);
      f[type] = Math.max(0, n + (specialty(c, type).factories || 0));
    }
    return f;
  }

  function init(state) {
    for (const c of Object.values(state.countries)) {
      c.tech = {};
      for (const b of BRANCHES) c.tech[b] = c.military[b];
      c.forces = generateForces(c);
      c.factories = generateFactories(c);
      c.ranges = {};
      for (const type of Object.keys(D().units)) {
        const r = specialty(c, type).range;
        if (r) c.ranges[type] = r;
      }
    }
  }

  // -------------------------------------------------------------------
  // بازیکن: دسته‌ها روی نقشه
  // -------------------------------------------------------------------
  /** شهر مناسب برای یک نوع واحد (بندر برای ناو، پایگاه هوایی برای هواپیما، ...) */
  function homeCityFor(c, type, state) {
    const cities = ownCities(state, c);
    const tag = NAVY.includes(type) ? 'port' : AIR.includes(type) ? 'air' : (type === 'missile' || type === 'icbm') ? 'missile' : null;
    if (tag) {
      const city = cities.find(x => x.tags.includes(tag));
      if (city) return city;
    }
    return cities.find(x => x.capital) || cities[0];
  }

  /** شهر محل تحویل تولید کارخانه‌ها */
  function factoryCityFor(c, type, state) {
    const cities = ownCities(state, c);
    if (NAVY.includes(type)) { const p = cities.find(x => x.tags.includes('port')); if (p) return p; }
    return cities.find(x => x.tags.includes('industry')) || cities[0];
  }

  function cityLoc(c, city) {
    return { kind: 'city', city: city.id, country: c.id };
  }

  function sameLoc(a, b) {
    if (a.kind !== b.kind) return false;
    return a.kind === 'city' ? a.city === b.city : (a.target === b.target && !!a.sea === !!b.sea);
  }

  /** افزودن نیرو به یک محل (اگر دسته‌ی هم‌نوع آن‌جا هست، ادغام می‌شود) */
  function newStack(state, type, count, loc, pos, from) {
    return {
      id: 'S' + (state.nextStackId = (state.nextStackId || 0) + 1),
      type, count, loc: { ...loc }, pos: pos.slice(), move: null,
      supply: from ? from.supply : 100,
      morale: from ? (from.morale ?? 75) : 75,   // روحیه (۰..۱۰۰) — نبرد
      exp: from ? (from.exp || 0) : 0,           // تجربه (۰..۱۰۰) — برنده‌ی نبرد +۵
      dmg: 0,                                    // آسیب جزئی واحدهای «لشکر/تیپ» (کسر یک واحد)
    };
  }

  function addToLocation(state, c, type, count, loc, pos) {
    if (count <= 0 || !hasStacks(c)) return null;
    const list = stacksOf(c);
    const existing = list.find(s => s.type === type && !s.move && sameLoc(s.loc, loc));
    if (existing) { existing.count += count; return existing; }
    const s = newStack(state, type, count, loc, pos);
    list.push(s);
    return s;
  }

  /** ادغام یک دسته‌ی رسیده با دسته‌ی هم‌نوع همان محل (میانگین وزنی روحیه و تجربه) */
  function mergeInto(state, c, s, loc, pos) {
    const list = stacksOf(c);
    const other = list.find(x => x !== s && x.type === s.type && !x.move && sameLoc(x.loc, loc));
    if (!other) { s.loc = { ...loc }; s.pos = pos.slice(); s.move = null; return s; }
    const n = other.count + s.count || 1;
    other.morale = ((other.morale ?? 75) * other.count + (s.morale ?? 75) * s.count) / n;
    other.exp = ((other.exp || 0) * other.count + (s.exp || 0) * s.count) / n;
    other.supply = Math.min(other.supply, s.supply);
    other.dmg = (other.dmg || 0) + (s.dmg || 0);
    other.count += s.count;
    const i = list.indexOf(s); if (i >= 0) list.splice(i, 1);
    return other;
  }

  /** همه‌ی نیروها = جمع دسته‌ها */
  function syncForces(c) {
    if (!hasStacks(c)) return c.forces;   // هوش مصنوعیِ بسیج‌نشده: نیروها همان c.forces است
    const f = emptyForces();
    for (const s of stacksOf(c)) f[s.type] += s.count;
    c.forces = f;
    return f;
  }

  function placeInitialStacks(state, c) {
    c.mil.stacks = [];
    for (const [type, n] of Object.entries(c.forces)) {
      if (!n) continue;
      if (type === 'infantry' && c.cities.length > 1 && n >= c.cities.length) {
        // پیاده‌نظام بین شهرها پخش می‌شود؛ نیمی در پایتخت
        const cap = Math.ceil(n / 2);
        addToLocation(state, c, type, cap, cityLoc(c, c.cities[0]), c.cities[0].pos);
        const rest = n - cap, others = c.cities.slice(1);
        others.forEach((city, i) => {
          const share = Math.floor(rest / others.length) + (i < rest % others.length ? 1 : 0);
          addToLocation(state, c, type, share, cityLoc(c, city), city.pos);
        });
      } else {
        const city = homeCityFor(c, type, state);
        addToLocation(state, c, type, n, cityLoc(c, city), city.pos);
      }
    }
  }

  // -------------------------------------------------------------------
  // هزینه، سوخت، تولید
  // -------------------------------------------------------------------
  function rawUpkeep(units) {
    let s = 0;
    for (const [k, n] of Object.entries(units)) s += n * (D().units[k]?.upkeep || 0);
    return s;
  }

  function upkeepMonthly(c) {
    return rawUpkeep(c.forces) * (c.mil?.upkeepFactor || 1);
  }

  function sanctionHit(state, c, type) {
    return D().units[type].factory.advanced && SG.Economy.sanctionPressure(state, c.id) >= 0.3;
  }

  /** تولید ماهانه‌ی یک نوع = تعداد کارخانه × تولید ثابت هر کارخانه (در همه‌ی کشورها یکسان) × پیشرفت */
  function productionRate(state, c, type) {
    // درخت پیشرفت می‌تواند تولید هر کارخانه‌ی یک نوع را برای همین کشور بیشتر کند (c.outMul)
    return (c.factories[type] || 0) * D().units[type].factory.output * (1 + ((c.outMul && c.outMul[type]) || 0));
  }

  /** نگهداری ماهانه‌ی همه‌ی کارخانه‌ها (روشن یا خاموش) */
  function factoryUpkeepMonthly(c) {
    let s = 0;
    for (const [type, n] of Object.entries(c.factories || {})) s += n * (D().units[type]?.factory.upkeep || 0);
    return s * (c.mil?.costFactor || 1);
  }

  /** قیمت هر عدد برای این کشور (دستمزد ارزان‌تر = ساخت ارزان‌تر؛ تحریم = گران‌تر) */
  function unitCost(state, c, type) {
    return D().units[type].cost * (c.mil?.costFactor || 1) * (sanctionHit(state, c, type) ? 1.5 : 1);
  }

  function factoryCost(state, c, type) {
    return D().units[type].factory.cost * (c.mil?.costFactor || 1) * (sanctionHit(state, c, type) ? 1.5 : 1);
  }

  /** هزینه‌ی ماهانه‌ی تولید: خطوط روشن + نگهداری کارخانه‌ها (میلیارد دلار) */
  function productionCostMonthly(state, c) {
    if (!c.mil) return 0;
    let s = factoryUpkeepMonthly(c);
    for (const type of Object.keys(D().units)) {
      if (c.mil.lines[type]) s += productionRate(state, c, type) * unitCost(state, c, type);
    }
    return s;
  }

  function fuelUse(c) {
    const defs = D().units;
    let s = 0;
    if (c.mil && c.mil.stacks) {
      // در حرکت ×۲، در نبرد ×۲، در مرز یا خاک دشمن ×۱.۳
      for (const st of c.mil.stacks) s += st.count * defs[st.type].fuel * (st.move || st.inBattle ? 2 : st.loc.kind === 'border' ? 1.3 : 1);
    } else {
      for (const [k, n] of Object.entries(c.forces)) s += n * defs[k].fuel;
    }
    return s;
  }

  function extraFuel(c) {
    return c.mil ? Math.max(0, fuelUse(c) - c.mil.fuelBase) : 0;
  }

  // -------------------------------------------------------------------
  // فعال کردن سیستم برای بازیکن
  // -------------------------------------------------------------------
  function startPlayer(state, pid) {
    const c = state.countries[pid];
    const rng = SG.Rng.create(state.rngState);
    const perCap = c.gdp / Math.max(c.population, 0.001);
    const names = D().commanderNames[D().commanderRegion[c.id] || 'en'];
    c.mil = {
      useUnits: true,
      costFactor: clamp(perCap / 40, 0.35, 1.3),
      upkeepFactor: 1,
      fuelBase: 0,
      stacks: [],
      lines: {},
      progress: {},
      construction: [],
      chief: 'سپهبد ' + rng.pick(names.first) + ' ' + rng.pick(names.last),
      baseIndex: { ...c.military },
      baseStrength: {},
    };
    placeInitialStacks(state, c);
    syncForces(c);
    for (const b of BRANCHES) c.mil.baseStrength[b] = branchStrength(c.forces, b);

    // خطوط تولید: همه روشن، ولی اگر هزینه از ۷۰٪ بودجه‌ی نظامی بیشتر شد، گران‌ترین‌ها خاموش می‌شوند
    const budget = c.gdp * c.eco.policy.military / 12;
    for (const t of Object.keys(D().units)) c.mil.lines[t] = (c.factories[t] || 0) > 0;
    const byCost = Object.keys(D().units).filter(t => c.mil.lines[t])
      .sort((a, b) => productionRate(state, c, b) * unitCost(state, c, b) - productionRate(state, c, a) * unitCost(state, c, a));
    for (const t of byCost) {
      if (productionCostMonthly(state, c) <= budget * 0.7) break;
      if (specialty(c, t).output) continue;           // تخصص کشور روشن می‌ماند
      c.mil.lines[t] = false;
    }
    // ضریب نگهداری: طوری که بودجه‌ی اول بازی (نگهداری + تولید) حفظ شود
    const raw = rawUpkeep(c.forces);
    const target = Math.max(budget - productionCostMonthly(state, c), budget * 0.25);
    c.mil.upkeepFactor = raw > 0 ? clamp(target / raw, 0.05, 6) : 1;
    c.mil.fuelBase = fuelUse(c);
    state.rngState = rng.getState();
  }

  /** شاخص قدرت بازیکن: مقدار اولیه + تغییر لگاریتمی نسبت به نیروی اول بازی */
  function refreshIndices(c) {
    if (!c.mil) return;
    for (const b of BRANCHES) {
      const s = branchStrength(c.forces, b), s0 = c.mil.baseStrength[b] || 0;
      // هر دو برابر شدن نیرو ≈ ۱۵ امتیاز؛ نصف شدن ≈ ۱۵ امتیاز کمتر
      const delta = 15 * Math.log2((1 + s) / (1 + s0));
      c.military[b] = Math.round(clamp(c.mil.baseIndex[b] + delta, 0, 120) * 10) / 10;
    }
  }

  // -------------------------------------------------------------------
  // دستورهای بازیکن
  // -------------------------------------------------------------------
  function setLine(state, pid, type, on) {
    const c = state.countries[pid];
    if ((c.factories[type] || 0) > 0) c.mil.lines[type] = !!on;
  }

  /** ساخت کارخانه‌ی جدید. خروجی: null یا دلیل رد ('tech' | 'money') */
  function buildFactory(state, pid, type) {
    const c = state.countries[pid];
    const def = D().units[type];
    if ((c.tech[def.branch] || 0) < def.factory.requires) return 'tech';
    const cost = factoryCost(state, c, type);
    if (cost > c.eco.treasury) return 'money';
    c.eco.treasury -= cost;
    c.mil.construction.push({ type, left: def.factory.time, total: def.factory.time });
    return null;
  }

  function findStack(state, pid, id) {
    return state.countries[pid].mil.stacks.find(s => s.id === id);
  }

  /**
   * مقصدهای ممکن برای یک دسته:
   *   شهرهای خودی و مرز زمینی/دریایی همسایه‌ها. در جنگ، نیروی زمینی در مرز دشمن = «در جبهه».
   */
  function destinations(state, pid, stack) {
    const c = state.countries[pid];
    const type = stack.type;
    const speed = D().units[type].speed;
    const list = [];
    const isNavy = NAVY.includes(type), isAir = AIR.includes(type), isLand = LAND.includes(type);
    for (const city of c.cities) {
      if (isNavy && !city.tags.includes('port')) continue;
      list.push({ kind: 'city', city: city.id, country: pid, name: city.name, pos: city.pos.slice(), capital: city.capital });
    }
    if (isLand || isAir) {
      for (const n of c.neighbors) if (c.borderPos[n] && state.countries[n] && !state.countries[n].annexedBy) list.push({ kind: 'border', target: n, pos: c.borderPos[n].slice(), sea: false });
    }
    if (isNavy || isAir) {
      for (const n of c.seaNeighbors) {
        const o = state.countries[n];
        if (!o || o.annexedBy) continue;
        list.push({ kind: 'border', target: n, sea: true, pos: [c.pos[0] * 0.55 + o.pos[0] * 0.45, c.pos[1] * 0.55 + o.pos[1] * 0.45] });
      }
    }
    return list
      .filter(d => !sameLoc(d, stack.loc) || stack.move)
      .map(d => ({ ...d, turns: Math.max(1, Math.ceil(distanceKm(stack.pos, d.pos) / speed)) }));
  }

  /** فرستادن تعدادی از یک دسته به مقصد. خروجی: دسته‌ی در حال حرکت یا null */
  function send(state, pid, stackId, count, dest) {
    const c = state.countries[pid];
    const s = findStack(state, pid, stackId);
    if (!s || s.move || count <= 0) return null;
    count = Math.min(count, s.count);
    const turns = Math.max(1, Math.ceil(distanceKm(s.pos, dest.pos) / D().units[s.type].speed));
    return moveStack(state, c, s, count, dest, turns);
  }

  /**
   * جدا کردن count از دسته‌ی s و حرکتش به dest (برای بازیکن و هوش مصنوعی).
   * maxTurns: سقف زمان (برای اعزام راهبردی متحدان از راه دور)
   */
  function moveStack(state, c, s, count, dest, turns, maxTurns) {
    count = Math.min(count, s.count);
    if (count <= 0) return null;
    if (turns === undefined) turns = Math.max(1, Math.ceil(distanceKm(s.pos, dest.pos) / D().units[s.type].speed));
    if (maxTurns) turns = Math.min(turns, maxTurns);
    let mover = s;
    if (count < s.count) {
      // آسیب جزئی به نسبت تقسیم می‌شود
      const share = count / s.count;
      s.count -= count;
      mover = newStack(state, s.type, count, s.loc, s.pos, s);
      mover.dmg = (s.dmg || 0) * share; s.dmg = (s.dmg || 0) * (1 - share);
      stacksOf(c).push(mover);
    }
    mover.inBattle = false;
    mover.move = { from: mover.pos.slice(), to: dest.pos.slice(), total: turns, left: turns,
      dest: dest.kind === 'city' ? { kind: 'city', city: dest.city, country: dest.country || c.id } : { kind: 'border', target: dest.target, sea: !!dest.sea } };
    return mover;
  }

  /** مرخص کردن (کم کردن هزینه) */
  function demobilize(state, pid, stackId, count) {
    const c = state.countries[pid];
    const s = findStack(state, pid, stackId);
    if (!s || s.move) return;
    s.count = Math.max(0, s.count - count);
    if (!s.count) c.mil.stacks = c.mil.stacks.filter(x => x !== s);
    syncForces(c); refreshIndices(c);
  }

  // -------------------------------------------------------------------
  // یک نوبت
  // -------------------------------------------------------------------
  function step(state, pid) {
    const c = state.countries[pid];
    if (!c.mil || !c.mil.useUnits) return [];
    const events = [];
    const defs = D().units;

    // ۱) تولید خطوط فعال (کسر تولید در progress جمع می‌شود)
    const delivered = {};
    for (const type of Object.keys(defs)) {
      if (!c.mil.lines[type]) continue;
      const rate = productionRate(state, c, type);
      c.mil.progress[type] = (c.mil.progress[type] || 0) + rate;
      const n = Math.floor(c.mil.progress[type]);
      if (n > 0) {
        c.mil.progress[type] -= n;
        const city = factoryCityFor(c, type, state);
        addToLocation(state, c, type, n, cityLoc(c, city), city.pos);
        delivered[type] = n;
      }
    }
    if (Object.keys(delivered).length) events.push({ type: 'delivered', units: delivered });

    // ۲) ساخت کارخانه
    for (const f of c.mil.construction) f.left--;
    for (const f of c.mil.construction.filter(x => x.left <= 0)) {
      c.factories[f.type] = (c.factories[f.type] || 0) + 1;
      c.mil.lines[f.type] = true;
      events.push({ type: 'factory_done', unit: f.type, count: c.factories[f.type] });
    }
    c.mil.construction = c.mil.construction.filter(x => x.left > 0);

    // ۳) حرکت و تدارکات
    stepStacks(state, c, events);

    // ۴) شاخص‌ها و سهم بودجه‌ی نظامی (برای فرمول رشد اقتصاد)
    syncForces(c);
    refreshIndices(c);
    c.eco.policy.military = (upkeepMonthly(c) + productionCostMonthly(state, c)) * 12 / c.gdp;
    return events;
  }

  /**
   * هدف تدارکات یک دسته (۰..۱۰۰):
   *   شهر خودی ۱۰۰، مرز زمینی ۹۲، مرز دریایی ۸۰، در حرکت ۸۵
   *   جبهه‌ی جنگ: منهای ۳۰ × درصد خاکی که از دشمن گرفته‌ایم (خط تدارکات طولانی‌تر)
   */
  function supplyTarget(state, c, s) {
    if (s.move) return 85;
    if (s.loc.kind === 'border') {
      // جبهه: هرچه در خاک دشمن جلوتر رفته‌ایم، خط تدارکات طولانی‌تر (تا ۳۰- در ۱۰۰٪)
      const depth = SG.War && !s.loc.sea ? SG.War.depthInto(state, c.id, s.loc.target) : 0;
      return (s.loc.sea ? 80 : 92) - 30 * depth;
    }
    return 100;
  }

  /** حرکت دسته‌ها و تدارکات (برای بازیکن و کشورهای هوش مصنوعیِ درگیر جنگ) */
  function stepStacks(state, c, events) {
    const pressure = SG.Economy.sanctionPressure(state, c.id);
    const energyShort = SG.Economy.energyProduction(c) < c.energy.consumption + extraFuel(c);
    const arrived = [];
    for (const s of stacksOf(c).slice()) {
      if (s.move) {
        s.move.left--;
        const t = 1 - s.move.left / s.move.total;
        s.pos = [s.move.from[0] + (s.move.to[0] - s.move.from[0]) * t, s.move.from[1] + (s.move.to[1] - s.move.from[1]) * t];
        if (s.move.left <= 0) {
          const dest = s.move.dest, to = s.move.to, count = s.count, type = s.type;
          const merged = mergeInto(state, c, s, dest, to);
          arrived.push({ type, count, dest, stackId: merged.id });
          continue;
        }
      }
      let target = supplyTarget(state, c, s);
      if (energyShort && pressure > 0.3) target -= 10;
      if (c.eco.treasury <= 0) target -= 15;
      const before = s.supply;
      s.supply = clamp(s.supply + (target - s.supply) * 0.3, 0, 100);
      // روحیه بیرون از نبرد آرام به ۸۰ برمی‌گردد
      if (!s.inBattle) s.morale = clamp((s.morale ?? 75) + (80 - (s.morale ?? 75)) * 0.15, 0, 100);
      if (before >= 55 && s.supply < 55) events.push({ type: 'supply_low', stack: s.id, unit: s.type });
    }
    if (arrived.length) events.push({ type: 'arrived', list: arrived });
  }

  /** نام محل یک دسته */
  function locName(state, loc) {
    if (loc.kind === 'city') {
      const c = state.countries[loc.country];
      const city = c.cities.find(x => x.id === loc.city);
      return city?.name || c.name;
    }
    return 'مرز ' + state.countries[loc.target].name;
  }

  SG.Military = {
    init, startPlayer, step, generateForces, generateFactories, refreshIndices, syncForces,
    upkeepMonthly, productionCostMonthly, productionRate, unitCost, factoryCost, capability, rangeOf,
    fuelUse, extraFuel, setLine, buildFactory, destinations, send, demobilize, findStack, locName,
    distanceKm, branchStrength, sanctionHit, BRANCHES, LAND, AIR, NAVY, factoryUpkeepMonthly,
    stacksOf, ownCities, addToLocation, moveStack, mergeInto, stepStacks, homeCityFor, cityLoc, sameLoc,
    emptyForces, specialty, indexToStrength,
  };
})(window.SG = window.SG || {});
