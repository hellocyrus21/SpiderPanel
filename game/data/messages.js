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
    actions: [{ id: 'open:econ', label: '💼 مشاور اقتصادی' }, { id: 'open:government', label: '🏛️ اصلاح بودجه' }, { id: 'decree:foreign_loan', label: '💳 وام خارجی' }, { id: 'dismiss', label: 'بعداً' }],
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
    actions: [{ id: 'open:econ', label: '💼 مشاور اقتصادی' }, { id: 'open:government', label: '🏛️ اصلاح بودجه' }, { id: 'decree:austerity', label: '✂️ ریاضت' }],
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
    actions: [{ id: 'open:econ', label: '💼 مشاور اقتصادی' }, { id: 'decree:austerity', label: '✂️ ریاضت اقتصادی' }, { id: 'dismiss', label: 'بعداً' }],
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
    actions: [{ id: 'open:econ', label: '💼 مشاور اقتصادی' }, { id: 'decree:welfare_package', label: '🎁 بسته‌ی حمایتی' }, { id: 'decree:crackdown', label: '🚔 سرکوب' }, { id: 'dismiss', label: 'نادیده بگیر' }],
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
    actions: [{ id: 'open:econ', label: '💼 مشاور اقتصادی' }, { id: 'open:government', label: '🏛️ دولت' }],
  },
  stability_recovered: {
    variants: ['آرامش به خیابان‌ها برگشت. ثبات به {stability} رسید.', 'اوضاع داخلی بهتر شد؛ ثبات {stability}.'],
  },
  game_over_collapse: {
    variants: ['دولت سقوط کرد. ماه‌ها بی‌ثباتی کار را تمام کرد. بازی به پایان رسید.'],
    actions: [{ id: 'newgame', label: 'بازی جدید' }],
  },

  // ---------- نظامی ----------
  units_delivered: {
    variants: ['تحویل این ماه از کارخانه‌ها: {list}.', 'قربان، خطوط تولید این ماه تحویل دادند: {list}.'],
    actions: [{ id: 'open:military', label: '🏭 کارخانه‌ها' }],
  },
  factory_done: {
    variants: ['{unit}: کارخانه‌ی جدید آماده شد. حالا {factories} کارخانه داریم و تولید بیشتر می‌شود.',
      'ساخت کارخانه‌ی {unit} تمام شد؛ تعداد کارخانه‌ها: {factories}.'],
    actions: [{ id: 'open:military', label: '🏭 کارخانه‌ها' }],
  },
  forces_at_border: {
    variants: [
      'قربان، نیروها به مرز {country} رسیدند و آماده‌ی عملیات‌اند: {list}.',
      'گزارش می‌دهم: {list} در مرز {country} مستقر شدند و منتظر دستور شما هستند.',
    ],
    actions: [{ id: 'show:stack', label: '🗺️ نمایش روی نقشه' }, { id: 'dismiss', label: 'صبر کن' }],
  },
  forces_relocated: {
    variants: ['جابه‌جایی نیروها انجام شد: {list}.'],
  },
  supply_low: {
    variants: [
      'خط تدارکات نیروهای {unit} ضعیف شده؛ سوخت و مهمات کم است.',
      'قربان، تدارکات {unit} در جبهه به‌سختی می‌رسد. یا برگردیم یا مشکل پول و سوخت را حل کنید.',
    ],
    actions: [{ id: 'show:stack', label: '🗺️ نمایش روی نقشه' }],
  },
  border_tension: {
    variants: [
      '{country} از تجمع نیروهای ما در مرزش ابراز نگرانی کرد. روابط سردتر شد.',
      'سفیر {country} احضار شد؛ آن‌ها استقرار نیروهای ما در مرز را تهدید می‌دانند.',
    ],
  },
  military_costly: {
    variants: [
      'هزینه‌ی ارتش (نگهداری و تولید) به {pct}٪ تولید ناخالص رسیده؛ این روند بودجه را می‌خورد.',
      'قربان، ارتش ماهانه بیش از توان اقتصاد خرج دارد ({pct}٪ GDP). خطوط تولید را کم کنید یا نیرو مرخص کنید.',
    ],
    actions: [{ id: 'open:military', label: '⚔️ پنل ارتش' }],
  },

  // ---------- خرید سلاح ----------
  arms_delivered: {
    variants: [
      'سلاح‌های خریداری‌شده از {country} رسید: {qty} {unit} در {city} تحویل شد.',
      'قربان، محموله‌ی {country} تحویل شد: {qty} {unit}، مستقر در {city}.',
    ],
    actions: [{ id: 'show:stack', label: '🗺️ نمایش روی نقشه' }],
  },
  arms_cancelled: {
    variants: ['معامله‌ی {qty} {unit} با {country} لغو شد (جنگ یا تحریم). {amount} از پول برگشت.'],
  },

  // ---------- جنگ ----------
  war_declared: {
    variants: [
      'قربان، جنگ با {country} آغاز شد. روی نیروهای مستقر در مرز بزنید و شهر هدف را انتخاب کنید؛ هواپیما، پهپاد و موشک‌ها از دور پشتیبانی می‌کنند.',
      'فرمان جنگ با {country} صادر شد. نیروهای مرزی آماده‌اند — برای حمله روی هر دسته در مرز بزنید و شهر هدف را بزنید.',
    ],
    actions: [{ id: 'open:war', label: '🔥 پنل جنگ' }, { id: 'dismiss', label: 'متوجه شدم' }],
  },
  ally_joined: {
    variants: ['{country} به حمایت از {other} وارد جنگ با ما شد!', '{country} اعلام کرد در کنار {other} می‌جنگد.'],
    plural: ['{count} کشور به حمایت از {other} وارد جنگ با ما شدند، از جمله {country}.'],
    actions: [{ id: 'open:war', label: '🔥 پنل جنگ' }],
  },
  sanctions_new: {
    variants: ['{count} کشور به‌خاطر این حمله ما را تحریم کردند، از جمله {country}.', 'موج تحریم: {count} کشور (از جمله {country}) روابط تجاری با ما را قطع کردند.'],
  },
  alliance_expelled: {
    variants: ['به‌خاطر حمله به یک هم‌پیمان، از «{alliance}» اخراج شدیم.'],
  },
  battle_started: {
    variants: ['نیروهای ما به {city} رسیدند و نبرد آغاز شد.', 'نبرد {city} شروع شد؛ گزارش هر دور را در پنل جنگ ببینید.'],
    actions: [{ id: 'show:battle', label: '📋 گزارش نبرد' }, { id: 'show:city', label: '🗺️ نقشه' }],
  },
  battle_defending: {
    variants: ['دشمن به {city} حمله کرد! نیروهای ما در حال دفاع‌اند.', 'هشدار: {city} زیر حمله‌ی {country} است.'],
    actions: [{ id: 'show:battle', label: '📋 گزارش نبرد' }, { id: 'show:city', label: '🗺️ نقشه' }],
  },
  battle_won: {
    variants: ['نبرد {city}: برتری با ماست (نسبت قدرت {ratio} به ۱). تلفات ما: {ours}. تلفات دشمن: {theirs}.'],
    actions: [{ id: 'show:battle', label: '📋 گزارش نبرد' }],
  },
  battle_lost: {
    variants: ['نبرد {city}: دشمن قوی‌تر بود (نسبت قدرت ما {ratio} به ۱). تلفات ما: {ours}. تلفات دشمن: {theirs}.'],
    actions: [{ id: 'show:battle', label: '📋 گزارش نبرد' }],
  },
  battle_losing: {
    variants: ['قربان، در {city} داریم می‌بازیم. اگر ادامه دهیم تلفات سنگین می‌دهیم. عقب‌نشینی کنیم؟'],
    actions: [{ id: 'retreat', label: '↩️ عقب‌نشینی' }, { id: 'show:battle', label: '📋 گزارش' }, { id: 'dismiss', label: 'ادامه بده' }],
  },
  ammo_low: {
    variants: ['مهمات {unit} در جبهه‌ی {city} فقط برای {turns} نوبت دیگر کافی است.', 'خط تدارکات {city} کش آمده؛ مهمات {unit} تا {turns} نوبت دیگر تمام می‌شود.'],
    actions: [{ id: 'show:stack', label: '🗺️ نمایش' }],
  },
  city_captured: {
    variants: ['{city} سقوط کرد! شهر در دست نیروهای ماست.', 'پیروزی: {city} تصرف شد. بخشی از اقتصاد و انرژی‌اش از این ماه به ما می‌رسد.'],
    actions: [{ id: 'show:battle', label: '📋 گزارش نبرد' }, { id: 'open:war', label: '🔥 پنل جنگ' }],
  },
  city_liberated: {
    variants: ['{city} آزاد شد!', 'نیروهای ما {city} را پس گرفتند.'],
    actions: [{ id: 'show:battle', label: '📋 گزارش نبرد' }],
  },
  city_lost: {
    variants: ['{city} به دست {country} افتاد! نیروهای باقی‌مانده عقب نشستند.', 'قربان، {city} را از دست دادیم. دشمن شهر را گرفت.'],
    actions: [{ id: 'show:battle', label: '📋 گزارش نبرد' }, { id: 'open:war', label: '🔥 پنل جنگ' }],
  },
  war_city_changed: {
    variants: ['جبهه: {city} اکنون در دست {country} است.'],
  },
  war_weariness: {
    variants: ['مردم از جنگ خسته شده‌اند (خستگی جنگ {pct}٪). ثبات پایین می‌آید و تورم بالا می‌رود؛ به صلح فکر کنید.'],
    actions: [{ id: 'open:war', label: '🔥 پنل جنگ' }],
  },
  peace_offer: {
    variants: ['{country} پیشنهاد صلح داده. یکی از شرط‌ها را انتخاب کنید یا جنگ را ادامه دهید.',
      'نماینده‌ی {country} برای مذاکره‌ی صلح آمده. چه شرطی می‌گذاریم؟'],
    actions: [{ id: 'peace:annex', label: '🏴 الحاق کامل' }, { id: 'peace:cede', label: '🗺️ واگذاری شهرهای تصرف‌شده' },
      { id: 'peace:puppet', label: '🎎 دولت دست‌نشانده' }, { id: 'peace:reparations', label: '💰 غرامت ۲۴ ماهه' },
      { id: 'peace:white', label: '🕊️ صلح سفید' }, { id: 'dismiss', label: '⚔️ ادامه‌ی جنگ' }],
  },
  peace_demand: {
    variants: ['{country} برای پایان جنگ شرط گذاشته: {term}. اگر نپذیریم جنگ ادامه دارد.'],
    actions: [{ id: 'peace:accept', label: '✅ می‌پذیریم' }, { id: 'dismiss', label: '❌ رد' }],
  },
  peace_signed: {
    variants: ['صلح با {country} امضا شد: {term}.', 'جنگ با {country} تمام شد ({term}).'],
  },
  annexed: {
    variants: ['{country} رسماً به خاک ما پیوست! اقتصاد و نفتش طی چند ماه کامل ادغام می‌شود؛ مراقب ناآرامی و واکنش همسایه‌ها باشید.'],
  },
  annexed_us: {
    variants: ['کشور ما ضمیمه‌ی {a} شد.'],
  },

  // ---------- جهان ----------
  world_war_declared: {
    variants: ['{a} به {b} اعلان جنگ داد.'],
  },
  world_city_captured: {
    variants: ['{country} شهر {city} را از {other} گرفت.', 'جبهه‌ی {other}: {city} به دست {country} افتاد.'],
    plural: ['تغییر در جبهه‌ها: {count} شهر دست‌به‌دست شد، از جمله {city}.'],
  },
  world_peace: {
    variants: ['جنگ {a} و {b} با صلح تمام شد ({term}).'],
  },
  world_annexed: {
    variants: ['{a} کشور {b} را ضمیمه‌ی خاک خود کرد.'],
  },
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

// شرط‌های صلح (مرحله‌ی ۴)
SG_DATA.peaceTerms = {
  annex: { icon: '🏴', name: 'الحاق کامل', desc: 'کل کشور ضمیمه می‌شود. نیمی از اقتصادش فوراً و بقیه طی ~۲ سال ادغام می‌شود؛ ناآرامی و ترس همسایه‌ها.' },
  cede: { icon: '🗺️', name: 'واگذاری شهرهای تصرف‌شده', desc: 'شهرهایی که گرفته‌ایم برای همیشه مال ما می‌شوند (سهم اقتصادشان از ۵۰٪ تا ۱۰۰٪ بالا می‌رود).' },
  puppet: { icon: '🎎', name: 'دولت دست‌نشانده', desc: 'شهرها پس داده می‌شوند ولی کشور هر سال ۱.۲٪ تولیدش را به ما باج می‌دهد و هم‌پیمان ما می‌شود.' },
  reparations: { icon: '💰', name: 'غرامت ۲۴ ماهه', desc: 'هر ماه معادل ۲٪ تولید سالانه‌اش تقسیم بر ۱۲، به مدت ۲ سال.' },
  white: { icon: '🕊️', name: 'صلح سفید', desc: 'همه‌چیز به قبل از جنگ برمی‌گردد.' },
};

SG_DATA.decreeReasons = {
  cooldown: 'هنوز آماده نیست',
  no_money: 'پول کافی نیست',
  no_credit: 'کسی به ما وام نمی‌دهد',
};
