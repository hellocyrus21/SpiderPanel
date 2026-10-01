// =====================================================================
// ذخیره و بارگذاری خودکار (localStorage)
// ---------------------------------------------------------------------
// بازی بعد از هر نوبت خودکار ذخیره می‌شود تا با بستن صفحه چیزی از دست نرود.
// (ذخیره‌ی چندتایی و دستی در مرحله‌ی ۶ می‌آید.)
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

  SG.Save = { save, load, clear, loadSettings, saveSettings, exportText, importText };
})(window.SG = window.SG || {});
