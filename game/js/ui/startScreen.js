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

    function render(state) {
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
