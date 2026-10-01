// =====================================================================
// قالب‌بندی متن و عدد فارسی (فقط UI)
// =====================================================================
(function (SG) {
  'use strict';

  const faNum = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 1 });

  /** عدد با رقم فارسی */
  function num(v, digits = 1) {
    if (digits === 1) return faNum.format(v);
    return new Intl.NumberFormat('fa-IR', { maximumFractionDigits: digits }).format(v);
  }

  /** GDP (ورودی به میلیارد دلار) */
  function money(billions) {
    if (billions >= 1000) return num(Math.round(billions / 100) / 10) + ' تریلیون دلار';
    if (billions >= 1) return num(Math.round(billions)) + ' میلیارد دلار';
    return num(Math.round(billions * 1000)) + ' میلیون دلار';
  }

  /** جمعیت (ورودی به میلیون نفر) */
  function population(millions) {
    if (millions >= 1000) return num(Math.round(millions / 10) / 100, 2) + ' میلیارد نفر';
    if (millions >= 1) return num(Math.round(millions * 10) / 10) + ' میلیون نفر';
    return num(Math.round(millions * 1000)) + ' هزار نفر';
  }

  const MONTHS = ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت',
    'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];
  function date(d) {
    return MONTHS[d.month - 1] + ' ' + new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(d.year);
  }

  const GOV = { D: 'دموکراسی', H: 'نیمه‌دموکراتیک', A: 'اقتدارگرا', M: 'پادشاهی', T: 'حکومت دینی' };
  const TERRAIN = { plain: 'دشت', mountain: 'کوهستانی', desert: 'بیابانی', urban: 'شهری', jungle: 'جنگلی' };
  const BRANCH = { land: 'زمینی', air: 'هوایی', navy: 'دریایی', missile: 'موشکی', airDefense: 'پدافند',
    cyber: 'سایبری', drone: 'پهپادی' };

  /** برچسب و رنگ رابطه (۱۰۰- تا ۱۰۰+) */
  function relationLabel(v) {
    if (v >= 60) return { text: 'متحد نزدیک', cls: 'rel-ally' };
    if (v >= 25) return { text: 'دوست', cls: 'rel-friend' };
    if (v > -25) return { text: 'خنثی', cls: 'rel-neutral' };
    if (v > -60) return { text: 'خصمانه', cls: 'rel-hostile' };
    return { text: 'دشمن', cls: 'rel-enemy' };
  }

  /** جلوگیری از تزریق HTML در متن‌ها */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  SG.Fmt = { num, money, population, date, relationLabel, esc, GOV, TERRAIN, BRANCH };
})(window.SG = window.SG || {});
