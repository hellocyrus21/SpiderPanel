// =====================================================================
// کارت رهبر کشور (عکس یا حروف اول نام)
// ---------------------------------------------------------------------
// عکس از img/leaders/<کد کشور>.jpg خوانده می‌شود؛ اگر نبود، حروف اول نام نمایش داده می‌شود.
// اطلاعات رهبران در data/leaders.js است.
// =====================================================================
(function (SG) {
  'use strict';
  const F = SG.Fmt;

  function info(id) {
    return (window.SG_DATA.leaders || {})[id] || null;
  }

  /** حروف اول دو کلمه‌ی اول نام (مثلاً «د ت») */
  function initials(name) {
    return name.split(/\s+/).filter(w => w.length > 1 && !['سید', 'بن', 'الله'].includes(w)).slice(0, 2).map(w => w[0]).join(' ');
  }

  /** نماد گرد رهبر. size: اندازه به پیکسل */
  function avatar(id, size = 44) {
    const l = info(id);
    const txt = l ? initials(l.name) : '؟';
    // رنگ ثابت برای هر کشور
    const hue = (id.charCodeAt(0) * 37 + id.charCodeAt(1) * 17 + id.charCodeAt(2) * 7) % 360;
    return `<span class="avatar" style="width:${size}px;height:${size}px;--hue:${hue}">
      <b style="font-size:${Math.round(size * 0.36)}px">${F.esc(txt)}</b>
      <img src="img/leaders/${id}.jpg" alt="" loading="lazy" onerror="this.remove()">
    </span>`;
  }

  /** کارت کامل: نماد + نام + عنوان */
  function card(id, size = 44) {
    const l = info(id);
    return `<div class="leader">${avatar(id, size)}
      <div><b>${l ? F.esc(l.name) : 'رهبر'}</b><small>${l ? F.esc(l.title) : 'اطلاعات رهبر ثبت نشده'}</small></div></div>`;
  }

  SG.Leader = { info, avatar, card };
})(window.SG = window.SG || {});
