// =====================================================================
// رویدادهای تصادفی (مرحله‌ی ۶) — موتور
// ---------------------------------------------------------------------
// داده در data/events.js است. همه‌ی کشورها با یک قانون:
//   - بازیکن: حداکثر یک رویداد در ماه (و حداقل ۲ ماه فاصله)؛ با گزینه (پنجره‌ی بحرانی)
//   - کشورهای دیگر: احتمال کم؛ گزینه را خودشان انتخاب می‌کنند (بیشترین ai)
//   - رویداد جهانی: روی همه‌ی کشورها؛ هر ۱۲ ماه حداکثر یکی
//   - زنجیره: state.eventQueue = [{ eid, id, at, chance }]
//   - رویداد بد با گذشت زمان (و در حالت سخت) محتمل‌تر است
// بازیکن تا جواب ندهد state.pendingEvents نگه داشته می‌شود؛ اگر یک ماه جواب ندهد گزینه‌ی اول اجرا می‌شود.
// =====================================================================
(function (SG) {
  'use strict';
  const D = () => window.SG_DATA;
  const N = () => SG.Notify;
  const E = () => SG.Engine;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const PLAYER_GAP = 2;       // حداقل فاصله‌ی دو رویداد بازیکن (ماه)
  const WORLD_GAP = 12;       // حداقل فاصله‌ی دو رویداد جهانی
  const AI_RATE = 0.35;       // احتمال رویداد برای کشورهای دیگر نسبت به بازیکن
  const DEFAULT_CD = 36;

  const byId = id => D().events.find(e => e.id === id);

  /** ضریب احتمال رویدادهای بد: هر سال ۱۰٪ بیشتر؛ حالت سخت ×۱.۵ */
  function badMul(state) {
    return (1 + Math.floor(state.turn / 12) * 0.1) * (state.hard ? 1.5 : 1);
  }

  // -------------------------------------------------------------------
  // شرط‌ها
  // -------------------------------------------------------------------
  function condOk(state, c, cond) {
    if (!cond) return true;
    const e = c.eco;
    if (cond.minTurn !== undefined && state.turn < cond.minTurn) return false;
    if (cond.stabilityBelow !== undefined && !(c.stability < cond.stabilityBelow)) return false;
    if (cond.stabilityAbove !== undefined && !(c.stability > cond.stabilityAbove)) return false;
    if (cond.inflationAbove !== undefined && !(e.inflation > cond.inflationAbove)) return false;
    if (cond.debtAbove !== undefined && !(e.debt / c.gdp > cond.debtAbove)) return false;
    if (cond.growthAbove !== undefined && !(e.growth > cond.growthAbove)) return false;
    if (cond.gov && !cond.gov.includes(c.gov)) return false;
    if (cond.terrain && !cond.terrain.includes(c.terrain)) return false;
    if (cond.atWar !== undefined && (E().warsOf(state, c.id).length > 0) !== cond.atWar) return false;
    if (cond.neighborAtWar && !c.neighbors.some(n => state.countries[n] && !state.countries[n].annexedBy && E().warsOf(state, n).length)) return false;
    if (cond.sanctioned !== undefined && (SG.Economy.sanctionPressure(state, c.id) > 0.05) !== cond.sanctioned) return false;
    if (cond.importer && !(SG.Economy.energyProduction(c) < c.energy.consumption)) return false;
    if (cond.exporter && !(SG.Economy.energyProduction(c) > c.energy.consumption * 1.1)) return false;
    if (cond.lowReserve && !(SG.Economy.monthsOfReserve(state, c.id) < 3)) return false;
    return true;
  }

  function cdOk(state, c, ev) {
    const last = (c.evLast || {})[ev.id];
    return last === undefined || state.turn - last >= (ev.cooldown || DEFAULT_CD);
  }

  // -------------------------------------------------------------------
  // اثرها
  // -------------------------------------------------------------------
  /** اعمال اثرها روی یک کشور. خروجی: { coup: true } اگر کودتا موفق شد */
  function applyEffects(state, c, ef, rng, ctx = {}) {
    const out = {};
    if (!ef) return out;
    const e = c.eco;
    if (ef.treasury) {
      const v = ef.treasury * c.gdp;
      e.treasury += v;
      if (e.treasury < 0) { e.debt += -e.treasury; e.treasury = 0; }
    }
    if (ef.gdp) c.gdp = Math.max(0.05, c.gdp * (1 + ef.gdp));
    if (ef.stability) c.stability = clamp(c.stability + ef.stability, 0, 100);
    if (ef.inflation) e.baseInflation = clamp(e.baseInflation + ef.inflation, -1, 400);
    if (ef.debt) e.debt += ef.debt * c.gdp;
    if (ef.relationAll) {
      for (const o of E().activeCountries(state)) if (o.id !== c.id) {
        const k = E().relKey(c.id, o.id);
        if (state.relations[k] !== undefined) state.relations[k] = clamp(state.relations[k] + ef.relationAll, -100, 100);
      }
    }
    for (const m of ef.mods || []) e.mods.push({ stat: m.stat, value: m.value, turns: m.turns, src: 'event' });
    if (ef.energyProd) c.energy.production *= 1 + ef.energyProd;
    if (ef.research && SG.Tech) SG.Tech.boost(state, c.id, ef.research);
    if (ef.energyPrice && !ctx.worldDone) state.world.energyPrice = clamp(state.world.energyPrice + ef.energyPrice, 0.25, 1.5);
    if (ef.coup) {
      const p = clamp((30 - c.stability) / 40, 0, 0.6);
      if (rng.next() < p) out.coup = true;
    }
    if (ef.chain && rng.next() < (ef.chain.chance ?? 1)) {
      (state.eventQueue ||= []).push({ eid: ef.chain.id, id: c.id, at: state.turn + (ef.chain.delay || 1) });
    }
    return out;
  }

  /** انتخاب گزینه توسط هوش مصنوعی: بیشترین ai (اگر پولش را ندارد، گزینه‌ی بدون هزینه) */
  function aiOption(c, ev) {
    const opts = ev.options || [];
    let best = 0, bs = -Infinity;
    opts.forEach((o, i) => {
      let s = o.ai ?? 0;
      if ((o.effects?.treasury || 0) < 0 && c.eco.treasury < -o.effects.treasury * c.gdp * 1.5) s -= 5;
      if (s > bs) { bs = s; best = i; }
    });
    return best;
  }

  // -------------------------------------------------------------------
  // اجرا
  // -------------------------------------------------------------------
  /** رخ دادن رویداد برای یک کشور */
  function fire(state, c, ev, rng) {
    (c.evLast ||= {})[ev.id] = state.turn;
    const pid = state.playerId;
    applyEffects(state, c, ev.effects, rng);
    if (c.id === pid) {
      const pe = { key: (state.evSeq = (state.evSeq || 0) + 1), eid: ev.id, id: c.id, turn: state.turn };
      (state.pendingEvents ||= []).push(pe);
      N().add(state, { type: 'event', level: 'critical', category: ev.category || 'domestic', speaker: ev.speaker || 'interior', focus: c.id,
        groupKey: pe.key, data: { event: ev.id, key: pe.key, country: c.id } });
      return;
    }
    // کشور دیگر: خودش انتخاب می‌کند
    const opt = (ev.options || [])[aiOption(c, ev)];
    const r = applyEffects(state, c, opt && opt.effects, rng);
    if (r.coup) overthrow(state, c);
    if (ev.news && pid && (state.countries[pid].neighbors.includes(c.id) || E().militaryPower(c) >= 60)) {
      N().add(state, { type: 'world_event', level: 'info', category: 'world', speaker: 'news', focus: c.id, groupKey: ev.id + c.id,
        data: { event: ev.id, country: c.id, coup: !!r.coup } });
    }
  }

  /** کودتای موفق در کشور هوش مصنوعی: ثبات کمی بالا، شخصیت تازه، رابطه‌ها نرم‌تر به سمت صفر */
  function overthrow(state, c) {
    c.stability = 35;
    if (c.ai) c.ai.personality = SG.AI.PERSONALITIES[(state.turn + c.id.charCodeAt(0)) % SG.AI.PERSONALITIES.length];
    for (const o of E().activeCountries(state)) if (o.id !== c.id) {
      const k = E().relKey(c.id, o.id);
      if (state.relations[k] !== undefined) state.relations[k] = Math.round(state.relations[k] * 0.6);
    }
  }

  /** پاسخ بازیکن به رویداد. خروجی: { ok, coup, ev, opt } */
  function choose(state, key, optIdx, rng) {
    const list = state.pendingEvents || [];
    const pe = list.find(p => p.key === +key);
    if (!pe) return { ok: false };
    state.pendingEvents = list.filter(p => p !== pe);
    const ev = byId(pe.eid);
    const c = state.countries[pe.id];
    const opt = (ev.options || [])[optIdx] || (ev.options || [])[0];
    const r = applyEffects(state, c, opt && opt.effects, rng);
    const n = state.notifications.find(x => x.type === 'event' && x.data && x.data.key === pe.key);
    if (n) { n.acted = true; n.data.chose = optIdx; }
    if (ev.id === 'coup' && opt && opt.effects && opt.effects.coup && !r.coup) (state.stats ||= {}).coupSurvived = true;
    if (r.coup && !state.gameOver) {
      state.gameOver = { reason: 'coup', turn: state.turn };
      N().add(state, { type: 'game_over_coup', level: 'critical', category: 'domestic', speaker: 'interior', focus: c.id, data: { country: c.id } });
    }
    return { ok: true, coup: !!r.coup, ev, opt };
  }

  /** یک ماه رویداد (بعد از اقتصاد و هوش مصنوعی) */
  function step(state, rng) {
    const pid = state.playerId;
    const evs = D().events || [];
    const bm = badMul(state);

    // ۰) رویدادهای بی‌جواب ماه قبل: گزینه‌ی اول
    for (const pe of (state.pendingEvents || []).slice()) {
      if (state.turn - pe.turn >= 1) choose(state, pe.key, 0, rng);
    }

    // ۱) زنجیره‌ها
    const due = (state.eventQueue || []).filter(q => q.at <= state.turn);
    state.eventQueue = (state.eventQueue || []).filter(q => q.at > state.turn);
    for (const q of due) {
      const c = state.countries[q.id], ev = byId(q.eid);
      if (c && !c.annexedBy && ev) fire(state, c, ev, rng);
    }

    // ۲) رویداد جهانی
    if (state.turn - (state.worldEventTurn ?? -WORLD_GAP) >= WORLD_GAP) {
      for (const ev of evs.filter(e => e.scope === 'world')) {
        if (ev.cond && ev.cond.minTurn !== undefined && state.turn < ev.cond.minTurn) continue;
        if (rng.next() >= ev.chance * (ev.bad ? bm : 1)) continue;
        state.worldEventTurn = state.turn;
        state.worldEvent = { id: ev.id, turn: state.turn };
        // قیمت انرژی یک بار؛ بقیه‌ی اثرها روی همه‌ی کشورها
        if (ev.effects && ev.effects.energyPrice) state.world.energyPrice = clamp(state.world.energyPrice + ev.effects.energyPrice, 0.25, 1.5);
        const ef = { ...ev.effects, energyPrice: 0 };
        for (const c of E().activeCountries(state)) {
          if (c.id === pid) continue;
          applyEffects(state, c, ef, rng, { worldDone: true });
          const opt = (ev.options || [])[aiOption(c, ev)];
          if (opt) applyEffects(state, c, opt.effects, rng, { worldDone: true });
        }
        if (pid) {
          const c = state.countries[pid];
          applyEffects(state, c, ef, rng, { worldDone: true });
          if ((ev.options || []).length > 1) {
            const pe = { key: (state.evSeq = (state.evSeq || 0) + 1), eid: ev.id, id: pid, turn: state.turn };
            (state.pendingEvents ||= []).push(pe);
            N().add(state, { type: 'event', level: 'critical', category: 'world', speaker: 'news', groupKey: pe.key, data: { event: ev.id, key: pe.key, country: pid } });
          } else {
            N().add(state, { type: 'event', level: 'warning', category: 'world', speaker: 'news', groupKey: 'w' + state.turn, data: { event: ev.id, country: pid, info: true } });
          }
        }
        break;
      }
    }

    // ۳) رویداد بازیکن
    if (pid && state.turn - (state.playerEventTurn ?? -PLAYER_GAP) >= PLAYER_GAP && !(state.pendingEvents || []).length) {
      const c = state.countries[pid];
      const list = evs.filter(e => e.scope === 'country');
      // ترتیب تصادفی تا رویدادهای اول فهرست همیشه برنده نباشند
      const start = Math.floor(rng.next() * list.length);
      for (let i = 0; i < list.length; i++) {
        const ev = list[(start + i) % list.length];
        if (!cdOk(state, c, ev) || !condOk(state, c, ev.cond)) continue;
        if (rng.next() >= ev.chance * (ev.bad ? bm : 1)) continue;
        state.playerEventTurn = state.turn;
        fire(state, c, ev, rng);
        break;
      }
    }

    // ۴) کشورهای دیگر (کم و ارزان: هر کشور یک رویداد تصادفی را می‌سنجد)
    const list = evs.filter(e => e.scope === 'country');
    for (const c of E().activeCountries(state)) {
      if (c.id === pid) continue;
      const ev = list[Math.floor(rng.next() * list.length)];
      if (!cdOk(state, c, ev) || !condOk(state, c, ev.cond)) continue;
      if (rng.next() >= ev.chance * AI_RATE * (ev.bad ? bm : 1)) continue;
      fire(state, c, ev, rng);
    }
  }

  /** خلاصه‌ی اثر یک گزینه برای نمایش (داده؛ متن در UI) */
  function preview(state, id, ef) {
    const c = state.countries[id];
    const out = [];
    if (!ef) return out;
    if (ef.treasury) out.push({ k: 'treasury', v: ef.treasury * c.gdp });
    if (ef.stability) out.push({ k: 'stability', v: ef.stability });
    if (ef.gdp) out.push({ k: 'gdp', v: ef.gdp * 100 });
    if (ef.inflation) out.push({ k: 'inflation', v: ef.inflation });
    if (ef.debt) out.push({ k: 'debt', v: ef.debt * c.gdp });
    if (ef.relationAll) out.push({ k: 'relation', v: ef.relationAll });
    if (ef.energyProd) out.push({ k: 'energy', v: ef.energyProd * 100 });
    if (ef.research) out.push({ k: 'research', v: ef.research });
    for (const m of ef.mods || []) out.push({ k: 'mod:' + m.stat, v: m.value, turns: m.turns });
    if (ef.coup) out.push({ k: 'coup', v: Math.round(clamp((30 - c.stability) / 40, 0, 0.6) * 100) });
    if (ef.chain) out.push({ k: 'chain', v: Math.round((ef.chain.chance ?? 1) * 100) });
    return out;
  }

  SG.Events = { step, choose, preview, byId, condOk, applyEffects, badMul };
})(window.SG = window.SG || {});
