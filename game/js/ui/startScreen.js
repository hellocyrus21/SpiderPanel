// =====================================================================
// صفحه‌ی انتخاب کشور
// فهرست کشورها مستقیماً از فلگ playable در داده ساخته می‌شود.
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt, E = SG.Engine;

  /**
   * @param {HTMLElement} el
   * @param {object} handlers { onPick(id), onBrowse() }
   */
  function create(el, handlers) {
    const grid = el.querySelector('.country-grid');

    grid.addEventListener('click', e => {
      const card = e.target.closest('[data-id]');
      if (card) handlers.onPick(card.dataset.id);
    });
    el.querySelector('[data-action="browse"]').addEventListener('click', () => handlers.onBrowse());
    el.querySelector('[data-action="guide"]').addEventListener('click', () => SG.Guide.open());
    // بارگذاری فایل ذخیره (انتقال از دستگاه دیگر)
    const fileInput = el.querySelector('input[type=file]');
    el.querySelector('[data-action="import"]').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => { if (fileInput.files[0]) handlers.onImport(fileInput.files[0]); fileInput.value = ''; });

    // کارت «ادامه‌ی بازی ذخیره‌شده»
    const cont = el.querySelector('.continue-box');
    cont.addEventListener('click', e => {
      if (e.target.closest('[data-action="continue"]')) handlers.onContinue();
      if (e.target.closest('[data-action="discard"]') && confirm('بازی ذخیره‌شده پاک شود؟')) handlers.onNewGame();
    });

    function render(state, saved) {
      if (saved) {
        const p = saved.countries[saved.playerId];
        cont.innerHTML = `<div class="continue-card">
          <div><b>بازی ذخیره‌شده: ${F.esc(p.name)}</b>
            <div class="muted small">${F.date(saved.date)} | ماه ${F.num(saved.turn)} از بازی${saved.gameOver ? ' | پایان‌یافته' : ''}</div></div>
          <button class="btn primary" data-action="continue">▶ ادامه‌ی بازی</button>
          <button class="btn ghost" data-action="discard">پاک کردن</button>
        </div>`;
        cont.classList.remove('hidden');
      } else {
        cont.innerHTML = '';
        cont.classList.add('hidden');
      }
      const playable = Object.values(state.countries)
        .filter(c => c.playable)
        .sort((a, b) => a.difficulty - b.difficulty || b.gdp - a.gdp);

      grid.innerHTML = playable.map(c => {
        const traits = SG.InfoPanel.traits(state, c.id).slice(0, 4);
        return `<button class="country-card" data-id="${c.id}">
          <div class="cc-head">
            <span class="cc-name">${F.esc(c.name)}</span>
            <span class="stars" title="سختی">${'★'.repeat(c.difficulty)}${'☆'.repeat(5 - c.difficulty)}</span>
          </div>
          ${SG.Leader.card(c.id, 36)}
          <div class="cc-stats">
            <span>اقتصاد: <b>${F.money(c.gdp)}</b></span>
            <span>قدرت نظامی: <b>رتبه ${F.num(E.rankOf(state, c.id, E.militaryPower))}</b></span>
            <span>ثبات: <b>${F.num(c.stability)}</b></span>
          </div>
          <div class="traits">${traits.map(t =>
            `<span class="trait ${t.good ? 'good' : 'bad'}">${t.text}</span>`).join('')}</div>
        </button>`;
      }).join('');
    }

    return {
      render,
      show() { el.classList.remove('hidden'); },
      hide() { el.classList.add('hidden'); },
    };
  }

  SG.StartScreen = { create };
})(window.SG = window.SG || {});
