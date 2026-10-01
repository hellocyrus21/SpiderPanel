// =====================================================================
// پنجره‌ی ساده (مودال) برای مشاور، راهنما و ...
// =====================================================================
(function (SG) {
  'use strict';

  let root = null;

  function ensure() {
    if (root) return root;
    root = document.createElement('div');
    root.className = 'modal-wrap hidden';
    root.innerHTML = `<div class="modal" role="dialog" aria-modal="true">
        <header class="modal-head"><h2></h2><button class="modal-x" aria-label="بستن">×</button></header>
        <div class="modal-body"></div>
      </div>`;
    document.body.appendChild(root);
    root.addEventListener('click', e => {
      if (e.target === root || e.target.closest('.modal-x')) close();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    return root;
  }

  /** @param {{title:string, html:string, onClick?:(e:Event)=>void}} opts */
  function open({ title, html, onClick }) {
    const r = ensure();
    r.querySelector('h2').textContent = title;
    const body = r.querySelector('.modal-body');
    body.innerHTML = html;
    body.scrollTop = 0;
    body.onclick = onClick || null;
    r.classList.remove('hidden');
  }

  function close() { if (root) root.classList.add('hidden'); }
  function isOpen() { return !!root && !root.classList.contains('hidden'); }

  SG.Modal = { open, close, isOpen };
})(window.SG = window.SG || {});
