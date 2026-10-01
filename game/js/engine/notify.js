// =====================================================================
// موتور اعلان‌ها
// ---------------------------------------------------------------------
// موتور فقط «رویداد اعلان» به state.notifications اضافه می‌کند:
//   { id, turn, type, level, category, speaker, data, count, focus, read }
// متن فارسی و نمایش کاملاً در UI است (data/messages.js و js/ui/notifications.js).
//
// level:    info (فقط صندوق) | warning (پیام کوتاه) | critical (پنجره‌ی توقف بازی)
// category: military | economy | diplomacy | domestic | world
// speaker:  commander | economy | foreign | intel | interior | news | advisor
// =====================================================================
(function (SG) {
  'use strict';

  const MAX_KEEP = 300;   // اعلان‌های قدیمی‌تر حذف می‌شوند تا ذخیره سنگین نشود

  /**
   * افزودن اعلان. اعلان هم‌نوع در همان نوبت با قبلی ادغام می‌شود (ضد اسپم):
   * count زیاد می‌شود و داده‌ها در data.items جمع می‌شوند.
   */
  function add(state, n) {
    const same = state.notifications.find(x => x.turn === state.turn && x.type === n.type &&
      (n.groupKey === undefined || x.groupKey === n.groupKey));
    if (same) {
      same.count++;
      (same.data.items ||= []).push(n.data);
      same.read = false;
      return same;
    }
    const item = {
      id: (state.nextNotificationId = (state.nextNotificationId || 0) + 1),
      turn: state.turn,
      date: { ...state.date },
      type: n.type,
      level: n.level || 'info',
      category: n.category || 'world',
      speaker: n.speaker || 'news',
      data: n.data || {},
      focus: n.focus || null,         // کشوری که با کلیک روی اعلان زوم می‌شود
      groupKey: n.groupKey,
      count: 1,
      read: false,
    };
    state.notifications.push(item);
    if (state.notifications.length > MAX_KEEP) state.notifications.splice(0, state.notifications.length - MAX_KEEP);
    return item;
  }

  /** فاصله‌ی تکرار: یک نوع اعلان تا چند نوبت دوباره نیاید */
  function cooldownOk(state, key, turns) {
    state.cooldowns ||= {};
    if ((state.cooldowns[key] ?? -Infinity) > state.turn) return false;
    state.cooldowns[key] = state.turn + turns;
    return true;
  }

  SG.Notify = { add, cooldownOk };
})(window.SG = window.SG || {});
