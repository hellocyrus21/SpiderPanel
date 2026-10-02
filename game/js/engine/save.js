// =====================================================================
// ذخیره و بارگذاری خودکار (localStorage)
// ---------------------------------------------------------------------
// بازی بعد از هر نوبت خودکار ذخیره می‌شود تا با بستن صفحه چیزی از دست نرود.
// مرحله‌ی ۶: ۳ اسلات ذخیره‌ی دستی + پروفایل بین بازی‌ها (دستاوردها، بهترین امتیازها، حالت سخت).
// =====================================================================
(function (SG) {
  'use strict';
  const KEY = 'sg2026_autosave_v2';

  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
    catch (e) { console.warn('Save failed', e); return false; }
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      return s && s.playerId && s.countries ? s : null;
    } catch (e) { return null; }
  }

  /** فایل ذخیره برای انتقال به دستگاه دیگر */
  function exportText(state) {
    return JSON.stringify({ game: 'geopolitics2026', exported: new Date().toISOString(), state });
  }

  /** خواندن فایل ذخیره. خروجی: state یا null */
  function importText(text) {
    try {
      const o = JSON.parse(text);
      const s = o && o.game === 'geopolitics2026' ? o.state : o;
      return s && s.playerId && s.countries ? s : null;
    } catch (e) { return null; }
  }

  function clear() {
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  }

  /** تنظیمات کاربر (جدا از ذخیره‌ی بازی) */
  const SETTINGS_KEY = 'sg2026_settings';
  function loadSettings() {
    try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveSettings(s) {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
  }

  // -------------------------------------------------------------------
  // اسلات‌های دستی (مرحله‌ی ۶)
  // -------------------------------------------------------------------
  const SLOTS = 3;
  const slotKey = n => 'sg2026_slot_' + n;
  /** فهرست اسلات‌ها: [{ slot, empty } | { slot, country, name, date, turn, saved, gameOver }] */
  function slots() {
    const out = [];
    for (let n = 1; n <= SLOTS; n++) {
      try {
        const meta = JSON.parse(localStorage.getItem(slotKey(n) + '_meta'));
        out.push(meta ? { slot: n, ...meta } : { slot: n, empty: true });
      } catch (e) { out.push({ slot: n, empty: true }); }
    }
    return out;
  }
  /** ذخیره در اسلات. خروجی: true | false (حافظه‌ی مرورگر پر است) */
  function saveSlot(n, state) {
    const p = state.countries[state.playerId];
    const meta = { country: state.playerId, name: p.name, date: { ...state.date }, turn: state.turn, saved: Date.now(), gameOver: !!state.gameOver };
    try {
      localStorage.setItem(slotKey(n), JSON.stringify(state));
      localStorage.setItem(slotKey(n) + '_meta', JSON.stringify(meta));
      return true;
    } catch (e) {
      try { localStorage.removeItem(slotKey(n)); localStorage.removeItem(slotKey(n) + '_meta'); } catch (e2) { /* ignore */ }
      return false;
    }
  }
  function loadSlot(n) {
    try {
      const s = JSON.parse(localStorage.getItem(slotKey(n)));
      return s && s.playerId && s.countries ? s : null;
    } catch (e) { return null; }
  }
  function deleteSlot(n) {
    try { localStorage.removeItem(slotKey(n)); localStorage.removeItem(slotKey(n) + '_meta'); } catch (e) { /* ignore */ }
  }

  // -------------------------------------------------------------------
  // پروفایل بین بازی‌ها: { achievements:{id:{turn,country,at}}, best:[...], games }
  // -------------------------------------------------------------------
  const PROFILE_KEY = 'sg2026_profile';
  function loadProfile() {
    try { return Object.assign({ achievements: {}, best: [], games: 0 }, JSON.parse(localStorage.getItem(PROFILE_KEY)) || {}); }
    catch (e) { return { achievements: {}, best: [], games: 0 }; }
  }
  function saveProfile(p) {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) { /* ignore */ }
  }
  /** دستاوردهای این بازی را به پروفایل اضافه می‌کند. خروجی: شناسه‌های تازه */
  function syncAchievements(state) {
    const p = loadProfile();
    const fresh = [];
    for (const id of Object.keys(state.achieved || {})) {
      if (!p.achievements[id]) { p.achievements[id] = { country: state.playerId, at: Date.now() }; fresh.push(id); }
    }
    if (fresh.length) saveProfile(p);
    return fresh;
  }
  /** ثبت امتیاز پایان (هر بازی یک بار: با شناسه‌ی بذر + کشور) */
  function recordScore(state, total, reason) {
    const p = loadProfile();
    const key = state.seed + ':' + state.playerId;
    p.best = p.best.filter(b => b.key !== key);
    p.best.push({ key, country: state.playerId, name: state.countries[state.playerId].name, score: total, turn: state.turn, reason, hard: !!state.hard, at: Date.now() });
    p.best.sort((a, b) => b.score - a.score);
    p.best = p.best.slice(0, 10);
    saveProfile(p);
  }

  SG.Save = { save, load, clear, loadSettings, saveSettings, exportText, importText,
    slots, saveSlot, loadSlot, deleteSlot, SLOTS, loadProfile, saveProfile, syncAchievements, recordScore };
})(window.SG = window.SG || {});
