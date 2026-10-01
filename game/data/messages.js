// =====================================================================
// متن اعلان‌ها (فارسی)
// ---------------------------------------------------------------------
// این فایل دستی نوشته می‌شود (برخلاف countries.js که خودکار ساخته می‌شود).
// - هر نوع اعلان چند متن دارد و یکی تصادفی انتخاب می‌شود تا تکراری نشود.
// - {نام} در متن با داده‌ی اعلان جایگزین می‌شود:
//     {amount} {deficit} {treasury} {monthly}  ← پول (میلیارد دلار)
//     {inflation} {growth} {pct} {debtPct} {rate} {stability} ← درصد/عدد
//     {country} {other} {a} {b}  ← نام کشور   {city} ← نام شهر   {turns} {year} {count} ← عدد
// - plural: متنی که وقتی چند اعلان هم‌نوع در یک نوبت جمع می‌شوند استفاده می‌شود.
// - actions: دکمه‌های اعلان. decree:... یعنی اجرای فرمان دولت، open:... یعنی باز کردن پنل.
// =====================================================================
window.SG_DATA = window.SG_DATA || {};

SG_DATA.speakers = {
  commander: { title: 'فرمانده‌ی ارتش', icon: '🎖️' },
  economy: { title: 'وزیر اقتصاد', icon: '💼' },
  foreign: { title: 'وزیر خارجه', icon: '🕊️' },
  intel: { title: 'رئیس اطلاعات', icon: '🕵️' },
  interior: { title: 'وزیر کشور', icon: '🏛️' },
  news: { title: 'خبرگزاری', icon: '📰' },
  advisor: { title: 'مشاور ارشد', icon: '🧑‍💼' },
};

SG_DATA.categories = {
  military: 'نظامی', economy: 'اقتصادی', diplomacy: 'دیپلماسی', domestic: 'داخلی', world: 'جهان',
};

SG_DATA.messages = {
  welcome: {
    variants: [
      'قربان، دولت {country} در اختیار شماست. بودجه، مالیات و رفاه را از دکمه‌ی «دولت» تنظیم کنید و با «نوبت بعد» یک ماه جلو بروید.',
      'به دفتر رهبری {country} خوش آمدید. هر نوبت یک ماه است؛ قبل از هر کاری نگاهی به «دولت» و نظر «مشاور» بیندازید.',
    ],
    actions: [{ id: 'open:government', label: '🏛️ باز کردن دولت' }, { id: 'open:advisor', label: '🧑‍💼 نظر مشاور' }],
  },

  // ---------- اقتصاد ----------
  budget_negative_soon: {
    variants: [
      'قربان، با این روند خزانه تا {turns} ماه دیگر خالی می‌شود. کسری ماهانه {deficit} است.',
      'هشدار: ماهی {deficit} کسری داریم؛ پول خزانه فقط {turns} ماه دیگر کفاف می‌دهد.',
      'خزانه دارد ته می‌کشد — {turns} ماه دیگر مجبوریم قرض بگیریم یا پول چاپ کنیم.',
    ],
    actions: [{ id: 'open:government', label: '🏛️ اصلاح بودجه' }, { id: 'decree:foreign_loan', label: '💳 وام خارجی' }, { id: 'dismiss', label: 'بعداً' }],
  },
  treasury_borrowed: {
    variants: [
      'خزانه خالی شد و {amount} قرض گرفتیم. بدهی دولت به {debtPct}٪ تولید ناخالص رسید.',
      'برای پرداخت حقوق‌ها {amount} وام گرفتیم. بدهی: {debtPct}٪ GDP. بهره‌اش بودجه‌ی ماه‌های بعد را می‌خورد.',
    ],
    actions: [{ id: 'open:government', label: '🏛️ اصلاح بودجه' }],
  },
  treasury_printed: {
    variants: [
      'هیچ‌کس به ما وام نمی‌دهد؛ بانک مرکزی {amount} پول چاپ کرد. منتظر تورم باشید.',
      'خزانه خالی بود و راه وام بسته؛ {amount} اسکناس چاپ شد. تورم بالا خواهد رفت.',
    ],
    actions: [{ id: 'open:government', label: '🏛️ اصلاح بودجه' }, { id: 'decree:austerity', label: '✂️ ریاضت' }],
  },
  debt_high: {
    variants: [
      'بدهی دولت از {debtPct}٪ GDP گذشت. نرخ بهره به {rate}٪ رسیده.',
      'قربان، بدهی‌ها خطرناک شده: {debtPct}٪ تولید ناخالص با بهره‌ی {rate}٪.',
    ],
  },
  inflation_high: {
    variants: [
      'تورم به {inflation}٪ رسید. قیمت‌ها هر روز بالاتر می‌رود و مردم ناراضی‌اند.',
      'نرخ تورم {inflation}٪ شد؛ اگر کنترل نشود ثبات را می‌خورد.',
    ],
    actions: [{ id: 'decree:austerity', label: '✂️ ریاضت اقتصادی' }, { id: 'dismiss', label: 'بعداً' }],
  },
  inflation_tamed: {
    variants: ['خبر خوب: تورم به {inflation}٪ رسید و کنترل شد.', 'تورم مهار شد: {inflation}٪.'],
  },
  economy_report: {
    variants: [
      'گزارش فصلی: رشد اقتصادی {growth}٪ سالانه، تورم {inflation}٪، تراز ماهانه‌ی بودجه {monthly}، خزانه {treasury}.',
      'وضع اقتصاد: رشد {growth}٪، تورم {inflation}٪. خزانه {treasury} و تراز ماهانه {monthly}.',
    ],
  },
  energy_price_up: {
    variants: [
      'قیمت جهانی انرژی {pct}٪ بالا رفت.',
      'بازار انرژی داغ شد: قیمت‌ها {pct}٪ افزایش یافت.',
    ],
  },
  energy_price_down: {
    variants: [
      'قیمت جهانی انرژی {pct}٪ سقوط کرد.',
      'بازار انرژی افت کرد: قیمت‌ها {pct}٪ پایین آمد.',
    ],
  },

  // ---------- داخلی ----------
  stability_protests: {
    variants: [
      'اعتراض در {city}! ثبات به {stability} رسیده و در حال سقوط است.',
      'مردم در {city} به خیابان آمده‌اند. ثبات: {stability}.',
      'تجمع‌های اعتراضی در {city} گسترش یافته. ثبات {stability} است.',
    ],
    actions: [{ id: 'decree:welfare_package', label: '🎁 بسته‌ی حمایتی' }, { id: 'decree:crackdown', label: '🚔 سرکوب' }, { id: 'dismiss', label: 'نادیده بگیر' }],
  },
  stability_riots: {
    variants: [
      'شورش در {city}! ثبات به {stability} سقوط کرده. باید فوراً کاری کرد.',
      'قربان، اوضاع از کنترل خارج می‌شود: آشوب در {city}، ثبات {stability}.',
    ],
    actions: [{ id: 'decree:welfare_package', label: '🎁 بسته‌ی حمایتی' }, { id: 'decree:crackdown', label: '🚔 سرکوب' }, { id: 'open:government', label: '🏛️ دولت' }],
  },
  stability_coup_risk: {
    variants: [
      'قربان، گزارش‌هایی از زمزمه‌ی کودتا در ارتش داریم. ثبات {stability} است. اگر ادامه یابد دولت سقوط می‌کند.',
      'خطر فروپاشی: ثبات به {stability} رسیده. سه ماه دیگر در این وضع، دولت سقوط خواهد کرد.',
    ],
    actions: [{ id: 'decree:welfare_package', label: '🎁 بسته‌ی حمایتی' }, { id: 'decree:crackdown', label: '🚔 سرکوب' }],
  },
  stability_falling: {
    variants: [
      'رضایت مردم به‌سرعت پایین می‌آید (ثبات {stability}).',
      'نارضایتی رو به افزایش است؛ ثبات به {stability} رسید.',
    ],
    actions: [{ id: 'open:government', label: '🏛️ دولت' }],
  },
  stability_recovered: {
    variants: ['آرامش به خیابان‌ها برگشت. ثبات به {stability} رسید.', 'اوضاع داخلی بهتر شد؛ ثبات {stability}.'],
  },
  game_over_collapse: {
    variants: ['دولت سقوط کرد. ماه‌ها بی‌ثباتی کار را تمام کرد. بازی به پایان رسید.'],
    actions: [{ id: 'newgame', label: 'بازی جدید' }],
  },

  // ---------- نظامی ----------
  unit_built: {
    variants: ['قربان، {qty} واحد {unit} تحویل ارتش شد.', '{qty} واحد {unit} از خط تولید بیرون آمد و به ذخیره پیوست.'],
    plural: ['تحویل {count} سفارش نظامی از کارخانه‌ها (از جمله {qty} واحد {unit}).'],
    actions: [{ id: 'open:military', label: '⚔️ پنل ارتش' }],
  },
  army_arrived: {
    variants: [
      'قربان، {army} به مرز {country} رسید و آماده‌ی عملیات است.',
      '{army} در مرز {country} مستقر شد. نیروها منتظر دستور شما هستند.',
      'گزارش می‌دهم: {army} در موقعیت مرزی {country} آماده است.',
    ],
    plural: ['{count} ارتش به مرزها رسیدند و آماده‌اند.'],
    actions: [{ id: 'show:army', label: '🗺️ نمایش روی نقشه' }, { id: 'open:army', label: '⚔️ فرمان به ارتش' }, { id: 'dismiss', label: 'صبر کن' }],
  },
  army_home: {
    variants: ['{army} به پایتخت بازگشت.', '{army} به پادگان برگشت و در حال استراحت است.'],
  },
  army_supply_low: {
    variants: [
      'خط تدارکات {army} ضعیف شده؛ تدارکات به {supply}٪ رسیده.',
      'قربان، سوخت و مهمات {army} کم است ({supply}٪). یا برگردیم یا تدارکات را درست کنید.',
    ],
    actions: [{ id: 'open:army', label: '⚔️ فرمان به ارتش' }],
  },
  border_tension: {
    variants: [
      '{country} از تجمع نیروهای ما در مرزش ابراز نگرانی کرد. روابط سردتر شد.',
      'سفیر {country} احضار شد؛ آن‌ها استقرار ارتش ما در مرز را تهدید می‌دانند.',
    ],
  },
  military_costly: {
    variants: [
      'هزینه‌ی نگهداری ارتش به {pct}٪ تولید ناخالص رسیده؛ این روند بودجه را می‌خورد.',
      'قربان، ارتش ماهانه بیش از توان اقتصاد خرج دارد ({pct}٪ GDP). شاید وقت مرخص کردن برخی واحدهاست.',
    ],
    actions: [{ id: 'open:military', label: '⚔️ پنل ارتش' }],
  },

  // ---------- جهان ----------
  new_year: {
    variants: ['سال {year} آغاز شد.', 'سال نو مبارک! وارد سال {year} شدیم.'],
  },
  world_unrest: {
    variants: ['اعتراضات گسترده در {country}.', 'ناآرامی در {country}: دولت زیر فشار است.'],
    plural: ['ناآرامی هم‌زمان در {count} کشور، از جمله {country}.'],
  },
  world_inflation: {
    variants: ['تورم در {country} از ۵۰٪ گذشت ({inflation}٪).'],
  },
  world_gdp_overtake: {
    variants: ['اقتصاد {country} از {other} پیشی گرفت و رتبه‌ی {rank} جهان شد.'],
  },
  world_war_ongoing: {
    variants: ['درگیری میان {a} و {b} ادامه دارد.', 'جبهه‌ی {a} و {b}: نبردها ادامه دارد.', 'هنوز نشانه‌ای از صلح میان {a} و {b} نیست.'],
  },
};

// متن فرمان‌های دولت
SG_DATA.decrees = {
  welfare_package: { icon: '🎁', name: 'بسته‌ی حمایتی', desc: 'کمک نقدی به مردم. ثبات تا ۶ ماه بالا می‌رود.' },
  crackdown: { icon: '🚔', name: 'سرکوب اعتراضات', desc: 'ارزان و فوری؛ ولی بعدش نارضایتی بیشتر می‌شود (در دموکراسی خیلی بیشتر).' },
  foreign_loan: { icon: '💳', name: 'وام خارجی', desc: 'پول نقد معادل ۳٪ GDP؛ بدهی و بهره بالا می‌رود. کشور زیر تحریم سنگین یا پربدهی وام نمی‌گیرد.' },
  print_money: { icon: '🖨️', name: 'چاپ پول', desc: 'پول نقد معادل ۲٪ GDP؛ ولی تورم را بالا می‌برد.' },
  austerity: { icon: '✂️', name: 'ریاضت اقتصادی', desc: 'هزینه‌ها و تورم پایین می‌آید؛ رشد و رضایت مردم هم ۶ ماه کم می‌شود.' },
  infrastructure: { icon: '🏗️', name: 'طرح عمرانی بزرگ', desc: 'گران است، ولی رشد اقتصادی را ۱۸ ماه بالا می‌برد.' },
  anti_corruption: { icon: '⚖️', name: 'مبارزه با فساد', desc: 'مالیات بهتر جمع می‌شود (۱۸ ماه) و مردم کمی راضی‌تر می‌شوند.' },
};

SG_DATA.decreeReasons = {
  cooldown: 'هنوز آماده نیست',
  no_money: 'پول کافی نیست',
  no_credit: 'کسی به ما وام نمی‌دهد',
};
