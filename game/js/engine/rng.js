// =====================================================================
// مولد عدد تصادفی «بذردار» (seeded)
// ---------------------------------------------------------------------
// چرا Math.random نه؟ چون با بذر (seed) می‌توان یک بازی را دقیقاً تکرار کرد
// (برای تست و رفع باگ عالی است) و بذر را همراه ذخیره‌ی بازی نگه داشت.
// الگوریتم: mulberry32 — کوتاه، سریع و برای بازی کاملاً کافی.
// =====================================================================
(function (SG) {
  'use strict';

  function create(seed) {
    let s = seed >>> 0;
    const api = {
      /** عدد اعشاری بین ۰ (شامل) و ۱ (غیرشامل) */
      next() {
        s = (s + 0x6D2B79F5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      },
      /** عدد اعشاری بین a و b */
      range(a, b) { return a + (b - a) * api.next(); },
      /** عدد صحیح بین a و b (هر دو شامل) */
      int(a, b) { return Math.floor(api.range(a, b + 1)); },
      /** یک عضو تصادفی از آرایه */
      pick(arr) { return arr[Math.floor(api.next() * arr.length)]; },
      /** وضعیت فعلی (برای ذخیره و ادامه‌ی همان دنباله) */
      getState() { return s; },
    };
    return api;
  }

  /** یک بذر تازه بر اساس زمان */
  function newSeed() {
    return (Date.now() ^ Math.floor(Math.random() * 0xFFFFFFFF)) >>> 0;
  }

  SG.Rng = { create, newSeed };
})(window.SG = window.SG || {});
