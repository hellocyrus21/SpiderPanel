// =====================================================================
// رویدادهای تصادفی (مرحله‌ی ۶) — دستی، داده‌محور
// ---------------------------------------------------------------------
// هر رویداد:
//   id, title, icon, speaker, category
//   scope   'country' (برای بازیکن و گاهی کشورهای دیگر) | 'world' (همه‌ی دنیا) | 'chain' (فقط از زنجیره)
//   bad     رویداد بد است ← با گذشت زمان (و در حالت سخت) محتمل‌تر می‌شود
//   chance  احتمال ماهانه وقتی شرط برقرار است
//   cooldown  حداقل فاصله‌ی تکرار برای یک کشور (ماه، پیش‌فرض ۳۶)
//   cond    شرط‌ها (همه باید برقرار باشند):
//     stabilityBelow / stabilityAbove، inflationAbove، debtAbove (نسبت به GDP)، growthAbove
//     atWar (true/false)، neighborAtWar، sanctioned، importer (وارد‌کننده‌ی انرژی)، exporter
//     gov: ['D','A',...]، terrain: [...]، minTurn، lowReserve (خزانه کمتر از ۳ ماه کسری)
//   text    متن (یکی تصادفی). {country} = نام کشور.
//   effects اثر فوری بدون انتخاب (برای همه، قبل از گزینه‌ها)
//   options [{ label, effects, ai }]  گزینه‌ها (بازیکن انتخاب می‌کند؛ هوش مصنوعی بیشترین ai را)
//   news    اگر برای کشور دیگری رخ دهد، خبرش به بازیکن برسد (همسایه یا قدرت بزرگ)
//
// اثرها (effects):
//   treasury: -0.01      ← سهم از GDP (منفی = هزینه)
//   gdp: -0.005          ← تغییر فوری اقتصاد (سهم)
//   stability: 5         ← ثبات فوری
//   inflation: 3         ← تورم پایه (واحد درصد)
//   debt: 0.03           ← بدهی (سهم از GDP)
//   relationAll: -3      ← رابطه با همه‌ی کشورها
//   mods: [{ stat, value, turns }]  ← اثر موقت (taxEff، growth، stability، inflation، expense، energyProd)
//   energyProd: 0.08     ← تولید انرژی دائمی بیشتر (سهم)
//   energyPrice: 0.3     ← قیمت جهانی انرژی (فقط رویداد جهانی؛ خودش کم‌کم برمی‌گردد)
//   research: 3          ← تحقیق جاری چند ماه جلو می‌افتد
//   coup: true           ← احتمال سرنگونی = (۳۰ − ثبات) / ۴۰ (حداکثر ۶۰٪) ← پایان بازی
//   chain: { id, delay, chance }  ← رویداد بعدی زنجیره
// =====================================================================
window.SG_DATA = window.SG_DATA || {};

SG_DATA.events = [
  // ======================= داخلی =======================
  { id: 'protests', title: 'اعتراضات گسترده', icon: '✊', speaker: 'interior', category: 'domestic', scope: 'country', bad: true,
    chance: 0.05, cond: { stabilityBelow: 40 }, news: true,
    text: ['مردم در شهرهای {country} به خیابان آمده‌اند؛ گرانی و بیکاری را فریاد می‌زنند.', 'اعتراضات در {country} بالا گرفته و هر روز بزرگ‌تر می‌شود.'],
    options: [
      { label: '🤝 امتیاز بدهیم (افزایش یارانه)', effects: { treasury: -0.01, stability: 6 }, ai: 2 },
      { label: '🛡️ سرکوب', effects: { stability: 3, relationAll: -3, mods: [{ stat: 'stability', value: -2, turns: 12 }] }, ai: 1 },
      { label: '🙈 نادیده بگیریم', effects: { stability: -4, chain: { id: 'riots', delay: 2, chance: 0.6 } }, ai: 0 },
    ] },
  { id: 'riots', title: 'شورش', icon: '🔥', speaker: 'interior', category: 'domestic', scope: 'chain', bad: true, news: true,
    text: ['اعتراض‌ها به شورش رسید؛ ساختمان‌های دولتی در {country} به آتش کشیده شد.'],
    effects: { stability: -4, gdp: -0.003 },
    options: [
      { label: '🪖 ارتش را بفرستیم', effects: { stability: 5, relationAll: -5 }, ai: 1 },
      { label: '🚨 حکومت نظامی موقت', effects: { stability: 7, mods: [{ stat: 'growth', value: -0.01, turns: 6 }] }, ai: 2 },
      { label: '🤝 مذاکره با رهبران معترض', effects: { treasury: -0.015, stability: 4 }, ai: 0 },
    ] },
  { id: 'coup_plot', title: 'توطئه‌ی کودتا', icon: '🕵️', speaker: 'intel', category: 'domestic', scope: 'country', bad: true,
    chance: 0.03, cond: { stabilityBelow: 32 },
    text: ['🕵️ اطلاعات خبر داده چند فرمانده‌ی ارشد ارتش {country} برای کودتا جلسه گذاشته‌اند.'],
    options: [
      { label: '🔒 پاکسازی ارتش', effects: { stability: -3, mods: [{ stat: 'expense', value: 0.004, turns: 12 }] }, ai: 2 },
      { label: '💰 فرماندهان را راضی کنیم', effects: { treasury: -0.015 }, ai: 1 },
      { label: '🙈 شایعه است', effects: { chain: { id: 'coup', delay: 3, chance: 0.6 } }, ai: 0 },
    ] },
  { id: 'coup', title: 'کودتا!', icon: '🪖', speaker: 'intel', category: 'domestic', scope: 'chain', bad: true, news: true,
    text: ['🚨 تانک‌ها در خیابان‌های پایتخت {country}! بخشی از ارتش کودتا کرده است.'],
    options: [
      { label: '⚔️ مقاومت با نیروهای وفادار', effects: { coup: true, stability: -6 }, ai: 1 },
      { label: '🤝 مذاکره و سهم دادن به کودتاچیان', effects: { stability: -12, treasury: -0.02 }, ai: 2 },
    ] },
  { id: 'scandal', title: 'رسوایی فساد', icon: '💸', speaker: 'interior', category: 'domestic', scope: 'country', bad: true,
    chance: 0.025, cond: { minTurn: 3 },
    text: ['رسانه‌ها مدارکی از اختلاس میلیاردی چند وزیر {country} منتشر کرده‌اند.', 'یک رسوایی فساد بزرگ در دولت {country} افشا شد.'],
    options: [
      { label: '🧹 برکناری و محاکمه', effects: { stability: -2, mods: [{ stat: 'taxEff', value: 0.02, turns: 24 }] }, ai: 2 },
      { label: '🤐 لاپوشانی', effects: { mods: [{ stat: 'stability', value: -1, turns: 12 }], chain: { id: 'scandal_leak', delay: 6, chance: 0.5 } }, ai: 1 },
    ] },
  { id: 'scandal_leak', title: 'افشای لاپوشانی', icon: '📰', speaker: 'interior', category: 'domestic', scope: 'chain', bad: true,
    text: ['مدارک لاپوشانی رسوایی فساد هم منتشر شد؛ اعتماد مردم به دولت {country} فرو ریخت.'],
    effects: { stability: -8 }, options: [{ label: 'باشه', effects: {} }] },
  { id: 'strike', title: 'اعتصاب سراسری', icon: '🛠️', speaker: 'interior', category: 'domestic', scope: 'country', bad: true,
    chance: 0.04, cond: { inflationAbove: 18 },
    text: ['کارگران و کارمندان {country} به خاطر تورم دست از کار کشیده‌اند.'],
    options: [
      { label: '💵 افزایش حقوق', effects: { treasury: -0.008, inflation: 2, stability: 4 }, ai: 1 },
      { label: '✋ نه', effects: { stability: -4, mods: [{ stat: 'growth', value: -0.012, turns: 3 }] }, ai: 0 },
    ] },
  { id: 'currency', title: 'بحران ارزی', icon: '💱', speaker: 'economy', category: 'economy', scope: 'country', bad: true,
    chance: 0.04, cond: { inflationAbove: 30 },
    text: ['ارزش پول ملی {country} در یک هفته ۳۰٪ سقوط کرد؛ صف خرید دلار جلوی صرافی‌ها.'],
    options: [
      { label: '🏦 خرج ذخایر ارزی', effects: { treasury: -0.03 }, ai: 1 },
      { label: '📉 رها کردن نرخ ارز', effects: { inflation: 8, mods: [{ stat: 'growth', value: -0.005, turns: 12 }] }, ai: 0 },
      { label: '🔒 کنترل سرمایه', effects: { stability: -3, mods: [{ stat: 'growth', value: -0.01, turns: 12 }] }, ai: 2 },
    ] },
  { id: 'ethnic', title: 'ناآرامی قومی', icon: '🏴', speaker: 'interior', category: 'domestic', scope: 'country', bad: true,
    chance: 0.02, cond: { stabilityBelow: 45, minTurn: 6 },
    text: ['گروه‌های قومی در مناطق مرزی {country} خواستار خودمختاری شده‌اند.'],
    options: [
      { label: '🗺️ خودمختاری محدود', effects: { stability: 5, mods: [{ stat: 'taxEff', value: -0.02, turns: 24 }] }, ai: 1 },
      { label: '🪖 برخورد نظامی', effects: { stability: 2, relationAll: -3, chain: { id: 'riots', delay: 3, chance: 0.3 } }, ai: 2 },
    ] },
  { id: 'election', title: 'انتخابات زودهنگام', icon: '🗳️', speaker: 'interior', category: 'domestic', scope: 'country',
    chance: 0.03, cond: { gov: ['D'], stabilityBelow: 50 },
    text: ['ائتلاف دولت {country} شکسته و مخالفان انتخابات زودهنگام می‌خواهند.'],
    options: [
      { label: '🗳️ انتخابات برگزار شود', effects: { stability: 6, mods: [{ stat: 'growth', value: -0.003, turns: 3 }] }, ai: 2 },
      { label: '⏳ تعویق', effects: { stability: -6, relationAll: -2 }, ai: 0 },
    ] },
  { id: 'revolution', title: 'انقلاب رنگی', icon: '🌹', speaker: 'intel', category: 'domestic', scope: 'country', bad: true, news: true,
    chance: 0.03, cond: { gov: ['A', 'H', 'T', 'M'], stabilityBelow: 30, sanctioned: true },
    text: ['جوانان با پرچم‌های رنگی میدان‌های اصلی {country} را گرفته‌اند؛ رسانه‌های خارجی از آن‌ها حمایت می‌کنند.'],
    options: [
      { label: '🛡️ سرکوب کامل', effects: { stability: 6, relationAll: -8 }, ai: 1 },
      { label: '📜 اصلاحات سیاسی', effects: { stability: 9, relationAll: 3, mods: [{ stat: 'taxEff', value: -0.03, turns: 12 }] }, ai: 2 },
    ] },
  { id: 'terror', title: 'حمله‌ی تروریستی', icon: '💥', speaker: 'intel', category: 'domestic', scope: 'country', bad: true, news: true,
    chance: 0.015, cond: { stabilityBelow: 55 },
    text: ['یک انفجار مرگبار در مرکز شهر بزرگ {country} ده‌ها کشته بر جا گذاشت.'],
    effects: { gdp: -0.002 },
    options: [
      { label: '🛡️ تدابیر امنیتی شدید', effects: { stability: 2, mods: [{ stat: 'growth', value: -0.004, turns: 6 }] }, ai: 1 },
      { label: '🇺🇳 همبستگی ملی و همکاری بین‌المللی', effects: { stability: 4, relationAll: 2 }, ai: 2 },
    ] },
  { id: 'brain_drain', title: 'فرار مغزها', icon: '🎓', speaker: 'economy', category: 'economy', scope: 'country', bad: true,
    chance: 0.02, cond: { sanctioned: true, stabilityBelow: 50 },
    text: ['هزاران متخصص جوان {country} در یک سال مهاجرت کرده‌اند.'],
    options: [
      { label: '🎁 مشوق برای ماندن', effects: { treasury: -0.006 }, ai: 1 },
      { label: 'کاری نکنیم', effects: { mods: [{ stat: 'growth', value: -0.004, turns: 24 }] }, ai: 0 },
    ] },

  // ======================= طبیعی =======================
  { id: 'quake', title: 'زلزله', icon: '🌋', speaker: 'interior', category: 'domestic', scope: 'country', bad: true, news: true,
    chance: 0.012, cond: { terrain: ['mountain'] },
    text: ['زلزله‌ی ۷ ریشتری یکی از شهرهای {country} را ویران کرد.'],
    effects: { gdp: -0.004, stability: -2 },
    options: [
      { label: '🚑 امداد و بازسازی کامل', effects: { treasury: -0.01, stability: 5 }, ai: 2 },
      { label: '🌍 درخواست کمک بین‌المللی', effects: { treasury: -0.003, stability: 1, relationAll: 2 }, ai: 1 },
    ] },
  { id: 'flood', title: 'سیل', icon: '🌊', speaker: 'interior', category: 'domestic', scope: 'country', bad: true,
    chance: 0.012, cond: {},
    text: ['سیل بزرگ روستاها و مزارع {country} را زیر آب برد.'],
    effects: { gdp: -0.002 },
    options: [
      { label: '🚑 امداد فوری', effects: { treasury: -0.005, stability: 2 }, ai: 2 },
      { label: 'به استان‌ها بسپاریم', effects: { stability: -4 }, ai: 0 },
    ] },
  { id: 'drought', title: 'خشکسالی', icon: '🏜️', speaker: 'economy', category: 'economy', scope: 'country', bad: true,
    chance: 0.012, cond: { terrain: ['desert', 'mountain', 'plain'] },
    text: ['خشکسالی شدید محصول کشاورزی {country} را نصف کرده است.'],
    effects: { mods: [{ stat: 'growth', value: -0.006, turns: 12 }] },
    options: [
      { label: '🌾 واردات غذا', effects: { treasury: -0.006 }, ai: 2 },
      { label: '🎫 جیره‌بندی', effects: { stability: -5 }, ai: 0 },
    ] },

  // ======================= انرژی =======================
  { id: 'blackout', title: 'خاموشی سراسری', icon: '🔌', speaker: 'economy', category: 'economy', scope: 'country', bad: true,
    chance: 0.03, cond: { importer: true },
    text: ['کمبود سوخت نیروگاه‌ها {country} را در خاموشی فرو برد.'],
    options: [
      { label: '⛽ خرید اضطراری سوخت', effects: { treasury: -0.005 }, ai: 2 },
      { label: '🕯️ قطعی برق برنامه‌ریزی‌شده', effects: { stability: -3, mods: [{ stat: 'growth', value: -0.006, turns: 6 }] }, ai: 0 },
    ] },
  { id: 'pipeline', title: 'خرابکاری در خط لوله', icon: '🧨', speaker: 'intel', category: 'economy', scope: 'country', bad: true,
    chance: 0.02, cond: { exporter: true },
    text: ['یک خط لوله‌ی اصلی صادرات انرژی {country} منفجر شد.'],
    options: [
      { label: '🔧 تعمیر فوری (گران)', effects: { treasury: -0.004, mods: [{ stat: 'energyProd', value: -0.2, turns: 1 }] }, ai: 2 },
      { label: 'تعمیر عادی', effects: { mods: [{ stat: 'energyProd', value: -0.2, turns: 5 }] }, ai: 0 },
    ] },
  { id: 'oil_find', title: 'کشف میدان انرژی', icon: '🛢️', speaker: 'economy', category: 'economy', scope: 'country',
    chance: 0.006, cond: { minTurn: 6 }, news: true,
    text: ['زمین‌شناسان یک میدان بزرگ نفت و گاز در {country} کشف کرده‌اند!'],
    options: [
      { label: '🏗️ خودمان استخراج کنیم', effects: { treasury: -0.012, energyProd: 0.12 }, ai: 1 },
      { label: '🤝 قرارداد با شرکت خارجی', effects: { treasury: 0.006, energyProd: 0.05 }, ai: 2 },
    ] },

  // ======================= خوب =======================
  { id: 'breakthrough', title: 'کشف علمی', icon: '🔬', speaker: 'advisor', category: 'economy', scope: 'country',
    chance: 0.015, cond: { stabilityAbove: 50, minTurn: 6 },
    text: ['دانشمندان {country} به یک کشف مهم رسیده‌اند.'],
    options: [
      { label: '🏭 تجاری‌سازی', effects: { mods: [{ stat: 'growth', value: 0.005, turns: 24 }] }, ai: 2 },
      { label: '🔬 به پروژه‌ی تحقیقاتی جاری کمک کند', effects: { research: 4 }, ai: 1 },
    ] },
  { id: 'investors', title: 'هجوم سرمایه‌گذاران', icon: '📈', speaker: 'economy', category: 'economy', scope: 'country',
    chance: 0.02, cond: { stabilityAbove: 60, growthAbove: 0.03 },
    text: ['سرمایه‌گذاران خارجی به بازار {country} هجوم آورده‌اند.'],
    effects: { mods: [{ stat: 'growth', value: 0.006, turns: 12 }] },
    options: [{ label: '👍 عالی', effects: {} }] },
  { id: 'imf', title: 'پیشنهاد وام صندوق بین‌المللی', icon: '🏦', speaker: 'economy', category: 'economy', scope: 'country',
    chance: 0.04, cond: { lowReserve: true, sanctioned: false },
    text: ['صندوق بین‌المللی پول حاضر است به {country} وام اضطراری بدهد — با شرط ریاضت.'],
    options: [
      { label: '✅ قبول (وام + ریاضت)', effects: { treasury: 0.03, debt: 0.03, mods: [{ stat: 'stability', value: -3, turns: 12 }, { stat: 'expense', value: -0.005, turns: 12 }] }, ai: 2 },
      { label: '❌ رد', effects: {}, ai: 0 },
    ] },
  { id: 'refugees', title: 'موج پناهجویان', icon: '🧳', speaker: 'interior', category: 'domestic', scope: 'country', bad: true,
    chance: 0.04, cond: { neighborAtWar: true, atWar: false },
    text: ['صدها هزار پناهجو از جنگ همسایه به مرزهای {country} رسیده‌اند.'],
    options: [
      { label: '🏕️ پذیرش', effects: { treasury: -0.004, relationAll: 3, mods: [{ stat: 'stability', value: -1, turns: 12 }] }, ai: 1 },
      { label: '🚧 بستن مرز', effects: { relationAll: -2 }, ai: 2 },
    ] },
  { id: 'cyber_attack', title: 'حمله‌ی سایبری', icon: '💻', speaker: 'intel', category: 'military', scope: 'country', bad: true,
    chance: 0.03, cond: { atWar: true },
    text: ['هکرها سامانه‌ی بانکی و مالیاتی {country} را از کار انداخته‌اند.'],
    effects: { mods: [{ stat: 'taxEff', value: -0.03, turns: 4 }] },
    options: [
      { label: '🛡️ بازسازی امن (هزینه)', effects: { treasury: -0.003, mods: [{ stat: 'taxEff', value: 0.03, turns: 3 }] }, ai: 1 },
      { label: 'صبر می‌کنیم', effects: {}, ai: 0 },
    ] },

  // ======================= جهانی =======================
  { id: 'w_oil_spike', title: 'جهش قیمت نفت', icon: '⛽', speaker: 'news', category: 'world', scope: 'world', chance: 0.012,
    text: ['تنش در تنگه‌ها قیمت جهانی نفت را ۵۰٪ بالا برد. صادرکنندگان سود می‌کنند و واردکنندگان ضرر.'],
    effects: { energyPrice: 0.3 }, options: [{ label: 'فهمیدم', effects: {} }] },
  { id: 'w_oil_crash', title: 'سقوط قیمت نفت', icon: '📉', speaker: 'news', category: 'world', scope: 'world', chance: 0.01,
    text: ['مازاد عرضه قیمت جهانی نفت را ۴۰٪ پایین آورد. صادرکنندگان انرژی ضرر می‌کنند.'],
    effects: { energyPrice: -0.25 }, options: [{ label: 'فهمیدم', effects: {} }] },
  { id: 'w_crisis', title: 'بحران مالی جهانی', icon: '🏚️', speaker: 'news', category: 'world', scope: 'world', bad: true, chance: 0.006, cond: { minTurn: 12 },
    text: ['ورشکستگی چند بانک بزرگ، بحران مالی جهانی را شروع کرد. رشد همه‌ی کشورها کم می‌شود.'],
    effects: { mods: [{ stat: 'growth', value: -0.015, turns: 12 }] },
    options: [
      { label: '💵 بسته‌ی محرک اقتصادی', effects: { treasury: -0.02, mods: [{ stat: 'growth', value: 0.009, turns: 12 }] }, ai: 1 },
      { label: '✂️ ریاضت و صبر', effects: { mods: [{ stat: 'stability', value: -2, turns: 12 }, { stat: 'expense', value: -0.004, turns: 12 }] }, ai: 0 },
    ] },
  { id: 'w_pandemic', title: 'همه‌گیری جهانی', icon: '🦠', speaker: 'news', category: 'world', scope: 'world', bad: true, chance: 0.005, cond: { minTurn: 12 },
    text: ['یک ویروس تازه در جهان پخش شده؛ سازمان جهانی بهداشت وضعیت اضطراری اعلام کرد.'],
    effects: { mods: [{ stat: 'growth', value: -0.01, turns: 9 }], stability: -2 },
    options: [
      { label: '🏠 قرنطینه‌ی سراسری', effects: { treasury: -0.008, mods: [{ stat: 'growth', value: -0.008, turns: 4 }] }, ai: 1 },
      { label: '🏙️ کشور باز بماند', effects: { chain: { id: 'pandemic_wave', delay: 4, chance: 0.6 } }, ai: 0 },
    ] },
  { id: 'pandemic_wave', title: 'موج دوم همه‌گیری', icon: '🦠', speaker: 'interior', category: 'domestic', scope: 'chain', bad: true,
    text: ['بیمارستان‌های {country} پر شده‌اند؛ موج دوم ویروس از موج اول بدتر است.'],
    effects: { stability: -6, mods: [{ stat: 'growth', value: -0.012, turns: 6 }] },
    options: [{ label: '🏥 بودجه‌ی اضطراری سلامت', effects: { treasury: -0.006, stability: 3 } }, { label: 'تحمل می‌کنیم', effects: {} }] },
  { id: 'w_techboom', title: 'رونق فناوری جهانی', icon: '🤖', speaker: 'news', category: 'world', scope: 'world', chance: 0.006, cond: { minTurn: 12 },
    text: ['موج تازه‌ی هوش مصنوعی و فناوری، اقتصاد جهان را رونق داده است.'],
    effects: { mods: [{ stat: 'growth', value: 0.005, turns: 12 }] }, options: [{ label: '👍', effects: {} }] },
  { id: 'w_food', title: 'بحران غذای جهانی', icon: '🌾', speaker: 'news', category: 'world', scope: 'world', bad: true, chance: 0.006, cond: { minTurn: 6 },
    text: ['خشکسالی در کشورهای غله‌خیز قیمت غذا را در جهان بالا برد.'],
    effects: { inflation: 2 },
    options: [
      { label: '🎫 یارانه‌ی نان', effects: { treasury: -0.004, stability: 2 }, ai: 1 },
      { label: 'بازار تصمیم بگیرد', effects: { stability: -3 }, ai: 0 },
    ] },
];
