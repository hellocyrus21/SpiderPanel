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
      'قربان، جنگ با {country} آغاز شد. پیشنهاد ارتش: اول با موشک، پهپاد و جنگنده پدافند دشمن ({ad} آتشبار) را نابود کنیم، بعد روی نیروی زمینی‌اش بمب و موشک بریزیم و هم‌زمان پیاده‌نظام، زرهی و توپخانه حمله کنند. این‌طور خیلی سریع‌تر پیش می‌رویم. حمله‌ی فقط زمینی کند است. دستور را در پنل جنگ انتخاب کنید.',
    ],
    actions: [{ id: 'open:war', label: '🔥 دستور جنگ' }, { id: 'dismiss', label: 'متوجه شدم' }],
  },
  war_declared_air: {
    variants: ['قربان، جنگ با {country} آغاز شد. مرز زمینی نداریم، پس فقط جنگ هوایی و موشکی ممکن است: اول پدافندش ({ad} آتشبار)، بعد نیروهایش. خاک گرفتن بدون مرز زمینی ممکن نیست؛ هدف، فشار برای صلح است.'],
    actions: [{ id: 'open:war', label: '🔥 دستور جنگ' }, { id: 'dismiss', label: 'متوجه شدم' }],
  },
  ally_joined: {
    variants: ['{country} به حمایت از {other} وارد جنگ با ما شد!', '{country} اعلام کرد در کنار {other} می‌جنگد.'],
    plural: ['{count} کشور به حمایت از {other} وارد جنگ با ما شدند، از جمله {country}.'],
    actions: [{ id: 'open:war', label: '🔥 پنل جنگ' }],
  },
  sanctions_new: {
    variants: ['{n} کشور به‌خاطر این حمله ما را تحریم کردند، از جمله {country}.', 'موج تحریم: {n} کشور (از جمله {country}) روابط تجاری با ما را قطع کردند.'],
  },
  alliance_expelled: {
    variants: ['به‌خاطر حمله به یک هم‌پیمان، از «{alliance}» اخراج شدیم.'],
  },
  tribute_paid: {
    variants: ['{country} برای جلوگیری از جنگ {amount} پرداخت. ۲۴ ماه آتش‌بس برقرار شد.'],
  },
  front_advance: {
    variants: ['جبهه‌ی {country}: این ماه {gain}٪ پیشروی کردیم؛ حالا {pct}٪ خاکش دست ماست.', 'نیروها {gain}٪ دیگر از خاک {country} را گرفتند (جمعاً {pct}٪).'],
    actions: [{ id: 'show:front', label: '📋 گزارش ماه' }],
  },
  front_lost: {
    variants: ['{country} این ماه {gain}٪ از خاک ما را گرفت (جمعاً {pct}٪)! نیروی زمینی بیشتری به مرز بفرستید.'],
    actions: [{ id: 'show:front', label: '📋 گزارش ماه' }, { id: 'open:military', label: '⚔️ ارتش' }],
  },
  front_liberated: {
    variants: ['جبهه‌ی {country}: {gain}٪ از خاک خودمان را پس گرفتیم.'],
    actions: [{ id: 'show:front', label: '📋 گزارش ماه' }],
  },
  front_pushed: {
    variants: ['{country} {gain}٪ از خاکی را که گرفته بودیم پس گرفت.'],
    actions: [{ id: 'show:front', label: '📋 گزارش ماه' }],
  },
  front_stalemate: {
    variants: ['جبهه‌ی {country}: این ماه هیچ طرف پیش نرفت (هر دو تلفات دادند).'],
    actions: [{ id: 'show:front', label: '📋 گزارش ماه' }],
  },
  front_empty: {
    variants: ['قربان، در مرز {country} نیروی زمینی نداریم و دشمن پیش می‌آید! پیاده، زرهی و توپخانه به مرزش بفرستید.'],
    actions: [{ id: 'open:military', label: '⚔️ ارتش' }],
  },
  air_report: {
    variants: ['حمله‌ی هوایی و موشکی به {country}: {ad} آتشبار پدافند نابود شد؛ {left} آتشبار باقی مانده.'],
    actions: [{ id: 'show:front', label: '📋 گزارش ماه' }],
  },
  ad_half: {
    variants: ['🎯 نیمی از پدافند {country} نابود شد ({left} از {start} آتشبار مانده). ادامه دهید تا آسمان باز شود.'],
    actions: [{ id: 'open:war', label: '🔥 پنل جنگ' }],
  },
  ad_gone: {
    variants: ['🎯 پدافند هوایی {country} کاملاً نابود شد! حالا جنگنده‌ها، بمب‌افکن‌ها، موشک و پهپادها روی نیروی زمینی‌اش می‌ریزند و پیشروی زمینی سریع‌تر می‌شود.'],
    actions: [{ id: 'open:war', label: '🔥 پنل جنگ' }],
  },
  our_ad_half: {
    variants: ['⚠️ نیمی از پدافند هوایی ما نابود شد ({left} از {start} آتشبار مانده). کارخانه‌ی پدافند بسازید یا پدافند بخرید.'],
    actions: [{ id: 'open:military', label: '⚔️ ارتش' }],
  },
  our_ad_gone: {
    variants: ['🚨 پدافند هوایی ما کاملاً نابود شد! از این به بعد دشمن مستقیم نیروهای ما را بمباران می‌کند.'],
    actions: [{ id: 'open:military', label: '⚔️ ارتش' }, { id: 'open:war', label: '🔥 پنل جنگ' }],
  },
  ammo_low: {
    variants: ['مهمات {unit} در جبهه‌ی {country} فقط برای {turns} نوبت دیگر کافی است؛ هرچه جلوتر می‌رویم خط تدارکات طولانی‌تر می‌شود.'],
    actions: [{ id: 'show:stack', label: '🗺️ نمایش' }],
  },
  capital_captured: {
    variants: ['🏴 {city}، پایتخت {country}، سقوط کرد! روحیه‌ی دشمن فرو ریخت؛ احتمالاً به‌زودی تسلیم می‌شود.'],
    actions: [{ id: 'open:war', label: '🔥 پنل جنگ' }],
  },
  capital_lost: {
    variants: ['🚨 پایتخت ({city}) به دست {other} افتاد! ثبات به‌شدت پایین آمد.'],
    actions: [{ id: 'open:war', label: '🔥 پنل جنگ' }],
  },
  capital_retaken: { variants: ['پایتخت ({city}) را پس گرفتیم!'] },
  capital_freed: { variants: ['{country} پایتختش ({city}) را پس گرفت.'] },
  war_weariness: {
    variants: ['مردم از جنگ خسته شده‌اند (خستگی جنگ {pct}٪). ثبات پایین می‌آید و تورم بالا می‌رود؛ به صلح فکر کنید.'],
    actions: [{ id: 'open:war', label: '🔥 پنل جنگ' }],
  },
  peace_offer: {
    variants: ['{country} پیشنهاد صلح داده ({pct}٪ خاکش دست ماست). شرط را انتخاب کنید یا جنگ را ادامه دهید.'],
    actions: [{ id: 'peace:annex', label: '🏴 فتح کامل' }, { id: 'peace:cede', label: '🗺️ واگذاری خاک تصرف‌شده' },
      { id: 'peace:pay', label: '💰 دریافت {amount}' }, { id: 'peace:white', label: '🕊️ صلح سفید' }, { id: 'dismiss', label: '⚔️ ادامه‌ی جنگ' }],
  },
  surrender_offer: {
    variants: ['{country} تسلیم شد! ({pct}٪ خاکش دست ماست.) می‌توانیم کل کشور را فتح کنیم: همه‌ی پول، تجهیزات و مردمش مال ما می‌شود.'],
    actions: [{ id: 'peace:annex', label: '🏴 فتح کامل' }, { id: 'peace:cede', label: '🗺️ فقط خاک تصرف‌شده' },
      { id: 'peace:pay', label: '💰 دریافت {amount}' }, { id: 'peace:white', label: '🕊️ صلح سفید' }, { id: 'dismiss', label: '⚔️ ادامه‌ی جنگ' }],
  },
  peace_demand: {
    variants: ['{country} برای پایان جنگ شرط گذاشته: {term} ({pct}٪ خاک / {amount}). اگر نپذیریم جنگ ادامه دارد.'],
    actions: [{ id: 'peace:accept', label: '✅ می‌پذیریم' }, { id: 'dismiss', label: '❌ رد' }],
  },
  peace_signed: {
    variants: ['صلح با {country} امضا شد: {term}.', 'جنگ با {country} تمام شد ({term}).'],
  },
  annexed: {
    variants: ['🏴 {country} فتح شد! همه‌ی پول خزانه‌اش ({amount})، همه‌ی تجهیزات و کارخانه‌هایش و {people} میلیون نفر جمعیتش مال ما شد. اقتصادش طی چند ماه کامل ادغام می‌شود؛ مراقب ناآرامی باشید.'],
  },
  annexed_us: { variants: ['کشور ما ضمیمه‌ی {a} شد.'] },
  game_over_conquered: {
    variants: ['تمام خاک کشور به دست {country} افتاد. دولت سقوط کرد. بازی به پایان رسید.'],
    actions: [{ id: 'newgame', label: 'بازی جدید' }],
  },

  game_over_coup: {
    variants: ['🪖 کودتا موفق شد. نظامیان قدرت را در {country} گرفتند و دولت شما سرنگون شد. بازی به پایان رسید.'],
    actions: [{ id: 'open:goals', label: '🏆 امتیاز و دستاوردها' }, { id: 'newgame', label: 'بازی جدید' }],
  },

  // ---------- درخت پیشرفت، اهداف، دستاوردها (مرحله‌ی ۶) ----------
  tech_done: {
    variants: ['🔬 تحقیق «{name}» تمام شد! اثرش از همین حالا فعال است.', '🔬 دانشمندان ما «{name}» را به نتیجه رساندند.'],
    actions: [{ id: 'open:tech', label: '🔬 پروژه‌ی بعدی' }],
  },
  research_idle: {
    variants: ['🔬 آزمایشگاه‌ها بیکارند. یک پروژه‌ی تحقیقاتی شروع کنید (درآمد بیشتر، برد بیشتر، سلاح جدید).'],
    actions: [{ id: 'open:tech', label: '🔬 درخت پیشرفت' }],
  },
  goal_done: {
    variants: ['🎯 هدف «{goal}» کامل شد! +۲۵۰ امتیاز.'],
    actions: [{ id: 'open:goals', label: '🏆 اهداف' }],
  },
  achievement: {
    variants: ['🏅 دستاورد تازه: «{name}»'],
    actions: [{ id: 'open:goals', label: '🏆 دستاوردها' }],
  },
  term_end: {
    variants: ['🏛️ دوره‌ی ۱۰ ساله‌ی رهبری شما تمام شد! امتیاز: {score} — اهداف: {goals} از {of}. می‌توانید بازی را آزادانه ادامه دهید.'],
    actions: [{ id: 'open:goals', label: '🏆 کارنامه' }, { id: 'dismiss', label: '▶ ادامه‌ی بازی' }],
  },

  // ---------- هوش مصنوعی و دیپلماسی (مرحله‌ی ۵) ----------
  war_declared_on_us: {
    variants: ['🚨 {country} به ما اعلان جنگ داد! پیاده، زرهی و توپخانه را فوراً به مرزش بفرستید و دستور دفاع را در پنل جنگ بدهید.'],
    actions: [{ id: 'open:war', label: '🔥 پنل جنگ' }, { id: 'open:military', label: '⚔️ ارتش' }],
  },
  ally_joined_us: {
    variants: ['🤝 {country} به کمک ما آمد و وارد جنگ شد!'],
  },
  ally_attacked: {
    variants: ['{other} به متحد ما {country} حمله کرد! طبق پیمان دفاعی، کمک کنیم؟ اگر نه، پیمان می‌شکند و رابطه خراب می‌شود.'],
    actions: [{ id: 'prop:accept', label: '⚔️ کمک می‌کنیم (ورود به جنگ)' }, { id: 'prop:decline', label: 'بی‌طرف می‌مانیم' }],
  },
  alliance_proposal: {
    variants: ['{country} پیشنهاد پیمان دفاعی داده: اگر به یکی حمله شود، دیگری کمک می‌کند.'],
    actions: [{ id: 'prop:accept', label: '🛡️ قبول' }, { id: 'prop:decline', label: 'رد' }],
  },
  trade_proposal: {
    variants: ['{country} پیشنهاد قرارداد تجاری داده: سالانه حدود {amount} درآمد برای ما.'],
    actions: [{ id: 'prop:accept', label: '📦 قبول' }, { id: 'prop:decline', label: 'رد' }],
  },
  arms_request: {
    variants: ['{country} می‌خواهد {qty} {unit} از ما بخرد به قیمت {amount}. سلاح از انبار ما کم می‌شود.'],
    actions: [{ id: 'prop:accept', label: '💰 بفروش' }, { id: 'prop:decline', label: 'نه' }],
  },
  ai_ultimatum: {
    variants: ['⚠️ اولتیماتوم {country}: «{amount} بپردازید وگرنه جنگ می‌شود.» اگر جواب ندهیم، جنگ شروع می‌شود.'],
    actions: [{ id: 'prop:accept', label: '💰 می‌پردازیم' }, { id: 'prop:decline', label: '⚔️ رد — آماده‌ی جنگیم' }],
  },
  intel_war_plan: {
    variants: ['🕵️ گزارش‌ها حاکی است {country} نیرو جمع می‌کند و برای حمله به ما برنامه دارد (حدود ۳ ماه دیگر). مرز را تقویت کنید یا رابطه را بهتر کنید.'],
    actions: [{ id: 'open:military', label: '⚔️ ارتش' }, { id: 'open:diplomacy', label: '🌐 دیپلماسی' }],
  },
  intel_war_plan_other: {
    variants: ['🕵️ {country} برای حمله به {other} آماده می‌شود.'],
  },
  coalition_forming: {
    variants: ['🕵️ همسایه‌ها از ما می‌ترسند (شاخص تهدید {pct}) و علیه ما متحد می‌شوند. جنگ و فتح بیشتر، ائتلاف قوی‌تر.'],
    actions: [{ id: 'open:diplomacy', label: '🌐 دیپلماسی' }],
  },
  sanctioned_us: {
    variants: ['{country} ما را تحریم کرد. تجارت با او قطع شد و فشار تحریم بیشتر شد.'],
    actions: [{ id: 'open:diplomacy', label: '🌐 دیپلماسی' }],
  },
  sanction_lifted_us: { variants: ['خبر خوب: {country} تحریم ما را لغو کرد.'] },
  pact_broken: { variants: ['{country} پیمان دفاعی با ما را لغو کرد.'] },
  diplo_result: { variants: ['{text}'] },
  world_pact: { variants: ['{a} و {b} پیمان دفاعی بستند.'], plural: ['{count} پیمان دفاعی تازه در جهان بسته شد، از جمله {a} و {b}.'] },
  world_sanction: { variants: ['{a} کشور {b} را تحریم کرد.'], plural: ['{count} تحریم تازه در جهان، از جمله {a} بر {b}.'] },
  world_tribute: { variants: ['{b} برای جلوگیری از جنگ به {a} باج ({amount}) داد.'] },

  // ---------- جهان ----------
  world_war_declared: {
    variants: ['{a} به {b} اعلان جنگ داد.'],
  },
  world_front: {
    variants: ['جنگ {a} و {b}: {a} حالا {pct}٪ خاک {b} را در دست دارد.'],
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
  annex: { icon: '🏴', name: 'فتح کامل', desc: 'کل کشور ضمیمه می‌شود: همه‌ی پول خزانه، تجهیزات، کارخانه‌ها و مردمش مال ما. ۶۰٪ اقتصادش فوراً و بقیه طی ~۲ سال. فقط وقتی دشمن تسلیم است (پایتخت افتاده، ۶۰٪ خاک، یا ارتشش فروپاشیده).' },
  cede: { icon: '🗺️', name: 'واگذاری خاک تصرف‌شده', desc: 'همان درصدی که گرفته‌ایم برای همیشه مال ما می‌شود: همان سهم از اقتصاد، مردم و انرژی‌اش.' },
  pay: { icon: '💰', name: 'پرداخت پول', desc: 'بخشی از خزانه‌اش را یک‌جا می‌دهد (هرچه امتیاز جنگ بیشتر، بیشتر).' },
  white: { icon: '🕊️', name: 'صلح سفید', desc: 'همه‌چیز به قبل از جنگ برمی‌گردد.' },
};

SG_DATA.decreeReasons = {
  cooldown: 'هنوز آماده نیست',
  no_money: 'پول کافی نیست',
  no_credit: 'کسی به ما وام نمی‌دهد',
};
