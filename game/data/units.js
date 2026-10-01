// =====================================================================
// واحدهای نظامی و کارخانه‌ها (دستی نوشته می‌شود)
// ---------------------------------------------------------------------
// شمارش:
//   پیاده و زرهی ← «واحد» (لشکر/تیپ)       counted: 'unit'
//   بقیه         ← تعداد واقعی (فروند، قبضه، فروند موشک، ...)   counted: 'item'
//
// هر نوع:
//   branch     شاخه‌ی قدرت (land, air, navy, missile, airDefense, cyber, drone)
//   power      سهم هر عدد در قدرت شاخه (و ارزش رزمی زمینی)
//   attack / defense   نقش در حمله و دفاع زمینی
//   range      برد پیش‌فرض (کیلومتر) — هر کشور می‌تواند برد متفاوت داشته باشد (specialties)
//   speed      سرعت جابه‌جایی (کیلومتر در ماه)
//   cost       هزینه‌ی ساخت هر عدد (میلیارد دلار، قیمت پایه)
//   upkeep     نگهداری ماهانه هر عدد (میلیارد دلار، پایه)
//   fuel       مصرف انرژی هر عدد در سال
//   weakVs     ضریب ضعف در برابر نوع دیگر
//   strike     جنگ هوایی (فقط هواپیما، پهپاد و موشک): هر عدد که از پدافند رد شود
//                ad = چند آتشبار پدافند را نابود می‌کند، ground = چقدر از قدرت زمینی دشمن را از بین می‌برد
//   intercept  (فقط پدافند) هر آتشبار در هر ماه چندتا از هر نوع را می‌زند
//   noExport   فروخته نمی‌شود (سلاح راهبردی)
//   factory    کارخانه‌ی این نوع — **تولید هر کارخانه در همه‌ی کشورها یکسان است**؛
//              تفاوت کشورها فقط در تعداد کارخانه‌هاست:
//     output     تولید ماهانه‌ی هر کارخانه (ثابت)
//     cost/time  هزینه و زمان (ماه) ساخت یک کارخانه‌ی جدید
//     upkeep     نگهداری ماهانه‌ی هر کارخانه (میلیارد دلار) — حتی وقتی خط تولید خاموش است
//     requires   حداقل فناوری شاخه برای داشتن این کارخانه
//     advanced   زیر تحریم سنگین: گران‌تر
// =====================================================================
window.SG_DATA = window.SG_DATA || {};

SG_DATA.units = {
  infantry: { name: 'پیاده‌نظام', short: 'پیاده', icon: '🪖', counted: 'unit', unitWord: 'لشکر', branch: 'land', power: 10,
    attack: 4, defense: 6, range: 0, speed: 500, cost: 1.2, upkeep: 0.05, fuel: 0.2,
    weakVs: { artillery: 0.8, bomber: 0.8 },
    factory: { name: 'پادگان آموزشی', output: 0.2, cost: 0.3, time: 2, upkeep: 0.004, requires: 0, advanced: false } },
  armor: { name: 'زرهی', short: 'زرهی', icon: '🛡️', counted: 'unit', unitWord: 'تیپ', branch: 'land', power: 25,
    attack: 10, defense: 7, range: 0, speed: 600, cost: 2, upkeep: 0.06, fuel: 0.6,
    weakVs: { drone: 0.7, bomber: 0.8 },
    factory: { name: 'کارخانه‌ی تانک', output: 0.15, cost: 1.5, time: 5, upkeep: 0.01, requires: 0, advanced: false } },
  artillery: { name: 'توپخانه', short: 'توپ', icon: '💥', counted: 'item', unitWord: 'قبضه', branch: 'land', power: 0.1,
    attack: 8, defense: 3, range: 40, speed: 450, cost: 0.006, upkeep: 0.0003, fuel: 0.002,
    weakVs: { drone: 0.8, fighter: 0.8 },
    factory: { name: 'کارخانه‌ی توپ', output: 10, cost: 0.5, time: 3, upkeep: 0.004, requires: 0, advanced: false } },
  fighter: { name: 'جنگنده', short: 'جنگنده', icon: '✈️', counted: 'item', unitWord: 'فروند', branch: 'air', power: 1,
    attack: 9, defense: 8, range: 1200, speed: 3000, cost: 0.09, upkeep: 0.004, fuel: 0.03,
    weakVs: { airdefense: 0.8 }, strike: { ad: 0.02, ground: 0.08 },
    factory: { name: 'کارخانه‌ی جنگنده', output: 7, cost: 4, time: 4, upkeep: 0.04, requires: 40, advanced: true } },
  bomber: { name: 'بمب‌افکن', short: 'بمب‌افکن', icon: '🛩️', counted: 'item', unitWord: 'فروند', branch: 'air', power: 3,
    attack: 14, defense: 4, range: 6000, speed: 3000, cost: 0.5, upkeep: 0.012, fuel: 0.08,
    weakVs: { airdefense: 0.6, fighter: 0.7 }, strike: { ad: 0.1, ground: 0.6 },
    factory: { name: 'کارخانه‌ی بمب‌افکن', output: 2, cost: 6, time: 7, upkeep: 0.06, requires: 70, advanced: true } },
  drone: { name: 'پهپاد', short: 'پهپاد', icon: '🛸', counted: 'item', unitWord: 'فروند', branch: 'drone', power: 0.05,
    attack: 6, defense: 2, range: 1500, speed: 1500, cost: 0.0008, upkeep: 0.00003, fuel: 0.0005,
    weakVs: { airdefense: 0.6, cyber: 0.8 }, strike: { ad: 0.01, ground: 0.03 },
    factory: { name: 'کارخانه‌ی پهپاد', output: 50, cost: 0.2, time: 2, upkeep: 0.003, requires: 0, advanced: false } },
  ship: { name: 'ناو جنگی', short: 'ناو', icon: '🚢', counted: 'item', unitWord: 'فروند', branch: 'navy', power: 8,
    attack: 9, defense: 9, range: 300, speed: 1500, cost: 1.8, upkeep: 0.04, fuel: 0.5,
    weakVs: { submarine: 0.7, missile: 0.7 },
    factory: { name: 'کشتی‌سازی', output: 0.1, cost: 5, time: 12, upkeep: 0.03, requires: 15, advanced: true } },
  submarine: { name: 'زیردریایی', short: 'زیردریایی', icon: '🐋', counted: 'item', unitWord: 'فروند', branch: 'navy', power: 6,
    attack: 10, defense: 6, range: 300, speed: 1000, cost: 1.5, upkeep: 0.03, fuel: 0.2,
    weakVs: { ship: 0.9 },
    factory: { name: 'زیردریایی‌سازی', output: 0.07, cost: 4, time: 14, upkeep: 0.03, requires: 35, advanced: true } },
  missile: { name: 'موشک', short: 'موشک', icon: '🚀', counted: 'item', unitWord: 'فروند', branch: 'missile', power: 0.15,
    attack: 12, defense: 1, range: 1000, speed: 800, cost: 0.002, upkeep: 0.00003, fuel: 0,
    weakVs: { airdefense: 0.7 }, strike: { ad: 0.05, ground: 0.08 },
    factory: { name: 'کارخانه‌ی موشک', output: 30, cost: 0.6, time: 2, upkeep: 0.008, requires: 25, advanced: true } },
  icbm: { name: 'موشک قاره‌پیما', short: 'قاره‌پیما', icon: '☄️', counted: 'item', unitWord: 'فروند', branch: 'missile', power: 3,
    attack: 40, defense: 1, range: 9000, speed: 99999, cost: 0.1, upkeep: 0.0005, fuel: 0, noExport: true,
    weakVs: {}, strike: { ad: 2, ground: 10 },
    factory: { name: 'کارخانه‌ی موشک قاره‌پیما', output: 1, cost: 8, time: 12, upkeep: 0.05, requires: 85, advanced: true } },
  airdefense: { name: 'پدافند هوایی', short: 'پدافند', icon: '📡', counted: 'item', unitWord: 'آتشبار', branch: 'airDefense', power: 2,
    attack: 2, defense: 10, range: 250, speed: 500, cost: 0.6, upkeep: 0.012, fuel: 0.05,
    weakVs: { cyber: 0.75 },
    // هر آتشبار در هر ماه: ۵ جنگنده، یا ۳ بمب‌افکن، یا ۸۰ پهپاد، یا ۴۰ موشک، یا ۱ قاره‌پیما را می‌زند
    intercept: { fighter: 5, bomber: 3, drone: 80, missile: 40, icbm: 1 },
    factory: { name: 'کارخانه‌ی پدافند', output: 0.5, cost: 1, time: 4, upkeep: 0.01, requires: 15, advanced: false } },
  cyber: { name: 'سایبری و جنگ الکترونیک', short: 'سایبری', icon: '💻', counted: 'item', unitWord: 'تیم', branch: 'cyber', power: 1,
    attack: 5, defense: 5, range: 99999, speed: 99999, cost: 0.03, upkeep: 0.002, fuel: 0,
    weakVs: {},
    factory: { name: 'مرکز سایبری', output: 0.25, cost: 0.2, time: 2, upkeep: 0.003, requires: 20, advanced: false } },
};

// نسبت انواع در هر شاخه برای ساخت نیروی اولیه‌ی کشورهایی که داده‌ی دستی ندارند
SG_DATA.unitMix = {
  land: { infantry: 0.55, armor: 0.28, artillery: 0.17 },
  air: { fighter: 0.8, bomber: 0.2 },
  navy: { ship: 0.65, submarine: 0.35 },
  missile: { missile: 1 },
  airDefense: { airdefense: 1 },
  cyber: { cyber: 1 },
  drone: { drone: 1 },
};

// «قدرت مرجع» هر شاخه (مقیاس لگاریتمی): برای تبدیل تعداد به شاخص ۰ تا ۱۰۰
SG_DATA.branchRef = { land: 2020, air: 1820, navy: 1288, missile: 783, airDefense: 244, cyber: 66, drone: 76 };

// ---------------------------------------------------------------------
// انبار اولیه‌ی دستی (تقریبی). این عددها «پایه» است؛ تخصص کشور (specialties.stock)
// انبار همان سلاح را در شروع بازی چند برابر می‌کند. بقیه‌ی کشورها از شاخص قدرتشان ساخته می‌شوند.
// ---------------------------------------------------------------------
SG_DATA.initialForces = {
  USA: { infantry: 45, armor: 20, artillery: 1500, fighter: 930, bomber: 95, drone: 1200, ship: 85, submarine: 52, missile: 3000, icbm: 400, airdefense: 70, cyber: 40 },
  RUS: { infantry: 50, armor: 17, artillery: 2500, fighter: 900, bomber: 120, drone: 5000, ship: 70, submarine: 58, missile: 2300, icbm: 320, airdefense: 80, cyber: 40 },
  CHN: { infantry: 70, armor: 25, artillery: 3500, fighter: 1330, bomber: 220, drone: 1700, ship: 100, submarine: 60, missile: 3000, icbm: 100, airdefense: 110, cyber: 70 },
  IND: { infantry: 43, armor: 20, artillery: 3000, fighter: 650, bomber: 0, drone: 500, ship: 55, submarine: 17, missile: 1400, icbm: 10, airdefense: 60, cyber: 20 },
  GBR: { infantry: 8, armor: 3, artillery: 150, fighter: 140, bomber: 0, drone: 100, ship: 19, submarine: 8, missile: 600, icbm: 40, airdefense: 10, cyber: 23 },
  FRA: { infantry: 10, armor: 4, artillery: 200, fighter: 180, bomber: 0, drone: 100, ship: 22, submarine: 8, missile: 500, icbm: 50, airdefense: 15, cyber: 25 },
  DEU: { infantry: 8, armor: 3, artillery: 150, fighter: 220, bomber: 0, drone: 150, ship: 15, submarine: 6, missile: 300, icbm: 0, airdefense: 15, cyber: 25 },
  TUR: { infantry: 25, armor: 8, artillery: 1500, fighter: 280, bomber: 0, drone: 750, ship: 25, submarine: 12, missile: 700, icbm: 0, airdefense: 15, cyber: 15 },
  IRN: { infantry: 35, armor: 6, artillery: 1800, fighter: 150, bomber: 0, drone: 3000, ship: 10, submarine: 20, missile: 2000, icbm: 0, airdefense: 25, cyber: 20 },
  IRQ: { infantry: 12, armor: 2, artillery: 300, fighter: 30, bomber: 0, drone: 100, ship: 2, submarine: 0, missile: 0, icbm: 0, airdefense: 5, cyber: 2 },
  SAU: { infantry: 10, armor: 4, artillery: 700, fighter: 330, bomber: 0, drone: 300, ship: 12, submarine: 0, missile: 400, icbm: 0, airdefense: 30, cyber: 8 },
  ARE: { infantry: 4, armor: 2, artillery: 200, fighter: 140, bomber: 0, drone: 300, ship: 10, submarine: 0, missile: 220, icbm: 0, airdefense: 20, cyber: 10 },
  ISR: { infantry: 12, armor: 6, artillery: 600, fighter: 340, bomber: 0, drone: 670, ship: 8, submarine: 5, missile: 550, icbm: 0, airdefense: 15, cyber: 15 },
  PAK: { infantry: 25, armor: 7, artillery: 1500, fighter: 390, bomber: 0, drone: 300, ship: 10, submarine: 8, missile: 900, icbm: 0, airdefense: 20, cyber: 8 },
  AFG: { infantry: 8, armor: 0, artillery: 50, fighter: 0, bomber: 0, drone: 20, ship: 0, submarine: 0, missile: 0, icbm: 0, airdefense: 0, cyber: 1 },
  AZE: { infantry: 6, armor: 2, artillery: 400, fighter: 20, bomber: 0, drone: 400, ship: 2, submarine: 0, missile: 70, icbm: 0, airdefense: 10, cyber: 4 },
  ARM: { infantry: 4, armor: 1, artillery: 250, fighter: 4, bomber: 0, drone: 50, ship: 0, submarine: 0, missile: 20, icbm: 0, airdefense: 6, cyber: 2 },
  TKM: { infantry: 4, armor: 1, artillery: 200, fighter: 20, bomber: 0, drone: 30, ship: 2, submarine: 0, missile: 0, icbm: 0, airdefense: 3, cyber: 1 },
  UKR: { infantry: 40, armor: 8, artillery: 1500, fighter: 80, bomber: 0, drone: 2500, ship: 2, submarine: 0, missile: 600, icbm: 0, airdefense: 25, cyber: 25 },
  KOR: { infantry: 30, armor: 8, artillery: 2000, fighter: 400, bomber: 0, drone: 300, ship: 19, submarine: 20, missile: 1500, icbm: 0, airdefense: 40, cyber: 25 },
  PRK: { infantry: 60, armor: 8, artillery: 5300, fighter: 300, bomber: 0, drone: 300, ship: 10, submarine: 70, missile: 730, icbm: 10, airdefense: 30, cyber: 20 },
  JPN: { infantry: 10, armor: 3, artillery: 300, fighter: 320, bomber: 0, drone: 200, ship: 50, submarine: 22, missile: 400, icbm: 0, airdefense: 35, cyber: 20 },
  EGY: { infantry: 30, armor: 10, artillery: 2000, fighter: 250, bomber: 0, drone: 100, ship: 30, submarine: 8, missile: 150, icbm: 0, airdefense: 40, cyber: 5 },
};

// ---------------------------------------------------------------------
// تخصص کشورها: هر کشور در چیزی قوی است.
//   stock:     انبار اولیه‌ی این سلاح × این ضریب (شروع بازی)
//   factories: کارخانه‌ی اضافه در شروع (تولید هر کارخانه همه‌جا یکسان است؛ کارخانه‌ی بیشتر = تولید بیشتر)
//   range:     برد (کیلومتر)
// بعد از شروع، این‌که کشور در چه چیزی قوی‌تر شود به تصمیم بازیکن بستگی دارد (ساخت کارخانه، خرید).
// ---------------------------------------------------------------------
SG_DATA.specialties = {
  IRN: { missile: { stock: 2, factories: 1, range: 2000 }, drone: { stock: 2, factories: 1, range: 2000 } },
  USA: { fighter: { stock: 1.5 }, bomber: { stock: 1.5, range: 10000 }, ship: { stock: 1.3, factories: 1 }, submarine: { stock: 1.3 },
    missile: { stock: 1.5, factories: 1, range: 1600 }, cyber: { stock: 1.5 }, icbm: { range: 13000 } },
  RUS: { missile: { stock: 1.5, factories: 1, range: 2500 }, armor: { stock: 1.5, factories: 1 }, artillery: { stock: 1.6 },
    airdefense: { stock: 1.5, range: 400 }, icbm: { range: 12000 } },
  CHN: { ship: { stock: 1.5, factories: 1 }, missile: { stock: 1.5, factories: 1, range: 4000 }, drone: { stock: 1.5 }, fighter: { stock: 1.2 }, icbm: { range: 12000 } },
  IND: { infantry: { stock: 1.4 }, missile: { range: 3000 }, icbm: { range: 5500 } },
  TUR: { drone: { stock: 2, factories: 1, range: 1800 }, armor: { stock: 1.2 }, ship: { stock: 1.2 } },
  FRA: { fighter: { stock: 1.2 }, submarine: { stock: 1.2 }, missile: { range: 1000 }, icbm: { range: 9000 } },
  GBR: { submarine: { stock: 1.3 }, missile: { range: 1600 }, cyber: { stock: 1.3 }, icbm: { range: 11000 } },
  DEU: { armor: { stock: 1.5, factories: 1 }, airdefense: { stock: 1.3 } },
  ISR: { airdefense: { stock: 2, factories: 1, range: 300 }, drone: { stock: 1.5 }, cyber: { stock: 2 }, missile: { range: 1500 } },
  PRK: { missile: { stock: 1.5, range: 1500 }, artillery: { stock: 1.5 }, icbm: { range: 10000 } },
  PAK: { missile: { range: 2750 } },
  KOR: { ship: { stock: 1.3, factories: 1 }, armor: { stock: 1.3 }, artillery: { stock: 1.5 } },
  SAU: { missile: { range: 2500 } },
  UKR: { drone: { stock: 2, factories: 1, range: 1500 } },
};

// نام رئیس ستاد ارتش (گوینده‌ی اعلان‌های نظامی) بر اساس منطقه‌ی کشور — اسم‌ها ساختگی‌اند
SG_DATA.commanderNames = {
  fa: { first: ['رضا', 'علی', 'محمود', 'حسین', 'بهرام', 'کاوه', 'داریوش', 'فرهاد', 'مهدی', 'سعید'],
    last: ['کاظمی', 'رستمی', 'نادری', 'صالحی', 'افشار', 'شریفی', 'بهرامی', 'یزدانی', 'کریمی', 'فرهمند'] },
  tr: { first: ['محمد', 'احمد', 'مصطفی', 'کمال', 'عثمان', 'یلماز', 'مراد', 'جان', 'امره', 'حسن'],
    last: ['آیدین', 'دمیر', 'کایا', 'شاهین', 'اوزتورک', 'چلیک', 'آرسلان', 'دوغان', 'قلیچ', 'یلدیز'] },
  ru: { first: ['الکسی', 'سرگئی', 'دیمیتری', 'ایوان', 'نیکلای', 'آندری', 'یوری', 'میخائیل', 'پاول', 'اولگ'],
    last: ['ایوانف', 'پتروف', 'سوکولوف', 'ولکوف', 'موروزوف', 'کوزنتسوف', 'پوپوف', 'لبدف', 'نوویکوف', 'اورلوف'] },
  en: { first: ['جان', 'رابرت', 'جیمز', 'مایکل', 'دیوید', 'ویلیام', 'توماس', 'ریچارد', 'دنیل', 'مارک'],
    last: ['میلر', 'هریس', 'کارتر', 'تامپسون', 'واکر', 'یانگ', 'هال', 'آلن', 'رایت', 'کینگ'] },
  de: { first: ['هانس', 'کلاوس', 'فرانک', 'اشتفان', 'مارکوس', 'یورگن', 'توماس', 'ولفگانگ', 'یوهان', 'پیتر'],
    last: ['مولر', 'اشمیت', 'شنایدر', 'فیشر', 'وبر', 'مایر', 'واگنر', 'بکر', 'هوفمن', 'کلاین'] },
  fr: { first: ['ژان', 'پیر', 'میشل', 'فیلیپ', 'آلن', 'نیکولا', 'لوران', 'فرانسوا', 'اریک', 'ژرار'],
    last: ['مارتن', 'برنار', 'دوبوا', 'لورن', 'لفور', 'مورو', 'ژیرو', 'روسو', 'بونه', 'فونتن'] },
  zh: { first: ['وی', 'لی', 'ژانگ', 'چن', 'لیو', 'یانگ', 'هوانگ', 'ژائو', 'وو', 'سون'],
    last: ['جیان', 'مینگ', 'هائو', 'لانگ', 'فنگ', 'جون', 'تائو', 'یونگ', 'شنگ', 'پنگ'] },
  hi: { first: ['راجش', 'آرجون', 'ویکرام', 'سانجی', 'آمیت', 'راهول', 'سوریا', 'آنیل', 'دیپاک', 'کاران'],
    last: ['شارما', 'سینگ', 'وارما', 'پاتل', 'رائو', 'نایر', 'گوپتا', 'چاوهان', 'ردی', 'مهتا'] },
  ar: { first: ['خالد', 'فهد', 'سلمان', 'عمر', 'یوسف', 'طارق', 'ماجد', 'سامی', 'ناصر', 'کریم'],
    last: ['الحسینی', 'العتیبی', 'الدوسری', 'المنصوری', 'الشمری', 'الحربی', 'القحطانی', 'الزهرانی', 'العنزی', 'المطیری'] },
};
SG_DATA.commanderRegion = {
  IRN: 'fa', AFG: 'fa', TJK: 'fa', TUR: 'tr', AZE: 'tr', TKM: 'tr', UZB: 'tr', KAZ: 'tr', KGZ: 'tr',
  RUS: 'ru', BLR: 'ru', UKR: 'ru', DEU: 'de', AUT: 'de', CHE: 'de', FRA: 'fr', BEL: 'fr',
  CHN: 'zh', TWN: 'zh', IND: 'hi', NPL: 'hi', PAK: 'hi', SAU: 'ar', IRQ: 'ar', ARE: 'ar', QAT: 'ar', KWT: 'ar',
  BHR: 'ar', OMN: 'ar', YEM: 'ar', SYR: 'ar', JOR: 'ar', LBN: 'ar', EGY: 'ar', LBY: 'ar', DZA: 'ar',
  MAR: 'ar', TUN: 'ar', SDN: 'ar', PSE: 'ar',
};
