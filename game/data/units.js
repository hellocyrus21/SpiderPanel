// =====================================================================
// واحدهای نظامی و کارخانه‌ها (دستی نوشته می‌شود)
// ---------------------------------------------------------------------
// شمارش:
//   پیاده و زرهی ← «واحد» (لشکر/تیپ)       counted: 'unit'
//   بقیه         ← تعداد واقعی (فروند، قبضه، فروند موشک، ...)   counted: 'item'
//
// هر نوع:
//   branch     شاخه‌ی قدرت (land, air, navy, missile, airDefense, cyber, drone)
//   power      سهم هر عدد در قدرت شاخه
//   attack / defense   برای نبرد (مرحله‌ی ۴)
//   range      برد پیش‌فرض (کیلومتر) — هر کشور می‌تواند برد متفاوت داشته باشد (specialties)
//   speed      سرعت جابه‌جایی (کیلومتر در ماه)
//   cost       هزینه‌ی ساخت هر عدد (میلیارد دلار، قیمت پایه)
//   upkeep     نگهداری ماهانه هر عدد (میلیارد دلار، پایه)
//   fuel       مصرف انرژی هر عدد در سال
//   weakVs     ضریب ضعف در برابر نوع دیگر
//   factory    کارخانه‌ی این نوع:
//     output     تولید ماهانه‌ی هر کارخانه با توان کامل
//     cost/time  هزینه و زمان ساخت یک کارخانه‌ی جدید
//     requires   حداقل فناوری شاخه برای داشتن این کارخانه
//     advanced   زیر تحریم سنگین: تولید کمتر و گران‌تر
// =====================================================================
window.SG_DATA = window.SG_DATA || {};

SG_DATA.units = {
  infantry: { name: 'پیاده‌نظام', short: 'پیاده', icon: '🪖', counted: 'unit', unitWord: 'لشکر', branch: 'land', power: 10,
    attack: 4, defense: 6, range: 0, speed: 500, cost: 1.2, upkeep: 0.05, fuel: 0.2,
    weakVs: { artillery: 0.8, bomber: 0.8 },
    factory: { name: 'پادگان آموزشی', output: 0.15, cost: 0.3, time: 2, requires: 0, advanced: false } },
  armor: { name: 'زرهی', short: 'زرهی', icon: '🛡️', counted: 'unit', unitWord: 'تیپ', branch: 'land', power: 25,
    attack: 10, defense: 7, range: 0, speed: 600, cost: 2, upkeep: 0.06, fuel: 0.6,
    weakVs: { drone: 0.7, bomber: 0.8 },
    factory: { name: 'کارخانه‌ی تانک', output: 0.08, cost: 1.5, time: 4, requires: 0, advanced: false } },
  artillery: { name: 'توپخانه', short: 'توپ', icon: '💥', counted: 'item', unitWord: 'قبضه', branch: 'land', power: 0.1,
    attack: 8, defense: 3, range: 40, speed: 450, cost: 0.006, upkeep: 0.0003, fuel: 0.002,
    weakVs: { drone: 0.8, fighter: 0.8 },
    factory: { name: 'کارخانه‌ی توپ', output: 15, cost: 0.5, time: 3, requires: 0, advanced: false } },
  fighter: { name: 'جنگنده', short: 'جنگنده', icon: '✈️', counted: 'item', unitWord: 'فروند', branch: 'air', power: 1,
    attack: 9, defense: 8, range: 1200, speed: 3000, cost: 0.09, upkeep: 0.004, fuel: 0.03,
    weakVs: { airdefense: 0.8 },
    factory: { name: 'کارخانه‌ی جنگنده', output: 2, cost: 4, time: 8, requires: 40, advanced: true } },
  bomber: { name: 'بمب‌افکن', short: 'بمب‌افکن', icon: '🛩️', counted: 'item', unitWord: 'فروند', branch: 'air', power: 3,
    attack: 14, defense: 4, range: 6000, speed: 3000, cost: 0.5, upkeep: 0.012, fuel: 0.08,
    weakVs: { airdefense: 0.6, fighter: 0.7 },
    factory: { name: 'کارخانه‌ی بمب‌افکن', output: 0.4, cost: 6, time: 10, requires: 70, advanced: true } },
  drone: { name: 'پهپاد', short: 'پهپاد', icon: '🛸', counted: 'item', unitWord: 'فروند', branch: 'drone', power: 0.05,
    attack: 6, defense: 2, range: 1500, speed: 1500, cost: 0.0008, upkeep: 0.00003, fuel: 0.0005,
    weakVs: { airdefense: 0.6, cyber: 0.8 },
    factory: { name: 'کارخانه‌ی پهپاد', output: 30, cost: 0.2, time: 2, requires: 0, advanced: false } },
  ship: { name: 'ناو جنگی', short: 'ناو', icon: '🚢', counted: 'item', unitWord: 'فروند', branch: 'navy', power: 8,
    attack: 9, defense: 9, range: 300, speed: 1500, cost: 1.8, upkeep: 0.04, fuel: 0.5,
    weakVs: { submarine: 0.7, cruise: 0.7 },
    factory: { name: 'کشتی‌سازی', output: 0.12, cost: 5, time: 10, requires: 15, advanced: true } },
  submarine: { name: 'زیردریایی', short: 'زیردریایی', icon: '🐋', counted: 'item', unitWord: 'فروند', branch: 'navy', power: 6,
    attack: 10, defense: 6, range: 300, speed: 1000, cost: 1.5, upkeep: 0.03, fuel: 0.2,
    weakVs: { ship: 0.9 },
    factory: { name: 'زیردریایی‌سازی', output: 0.08, cost: 4, time: 10, requires: 35, advanced: true } },
  ballistic: { name: 'موشک بالستیک', short: 'بالستیک', icon: '🚀', counted: 'item', unitWord: 'فروند', branch: 'missile', power: 0.2,
    attack: 12, defense: 1, range: 1000, speed: 800, cost: 0.002, upkeep: 0.00003, fuel: 0,
    weakVs: { airdefense: 0.7 },
    factory: { name: 'کارخانه‌ی موشک بالستیک', output: 40, cost: 0.6, time: 4, requires: 30, advanced: true } },
  cruise: { name: 'موشک کروز', short: 'کروز', icon: '🎯', counted: 'item', unitWord: 'فروند', branch: 'missile', power: 0.1,
    attack: 9, defense: 1, range: 1000, speed: 800, cost: 0.0015, upkeep: 0.00002, fuel: 0,
    weakVs: { airdefense: 0.6 },
    factory: { name: 'کارخانه‌ی موشک کروز', output: 30, cost: 0.5, time: 4, requires: 25, advanced: true } },
  airdefense: { name: 'پدافند هوایی', short: 'پدافند', icon: '📡', counted: 'item', unitWord: 'آتشبار', branch: 'airDefense', power: 2,
    attack: 2, defense: 10, range: 250, speed: 500, cost: 0.6, upkeep: 0.012, fuel: 0.05,
    weakVs: { cyber: 0.75, cruise: 0.9 },
    factory: { name: 'کارخانه‌ی پدافند', output: 0.3, cost: 1, time: 5, requires: 15, advanced: false } },
  cyber: { name: 'سایبری و جنگ الکترونیک', short: 'سایبری', icon: '💻', counted: 'item', unitWord: 'تیم', branch: 'cyber', power: 1,
    attack: 5, defense: 5, range: 99999, speed: 99999, cost: 0.03, upkeep: 0.002, fuel: 0,
    weakVs: {},
    factory: { name: 'مرکز سایبری', output: 0.25, cost: 0.2, time: 2, requires: 20, advanced: false } },
};

// نسبت انواع در هر شاخه برای ساخت نیروی اولیه‌ی کشورهایی که داده‌ی دستی ندارند
SG_DATA.unitMix = {
  land: { infantry: 0.55, armor: 0.28, artillery: 0.17 },
  air: { fighter: 0.8, bomber: 0.2 },
  navy: { ship: 0.65, submarine: 0.35 },
  missile: { ballistic: 0.55, cruise: 0.45 },
  airDefense: { airdefense: 1 },
  cyber: { cyber: 1 },
  drone: { drone: 1 },
};

// «قدرت مرجع» هر شاخه (مقیاس لگاریتمی): برای تبدیل تعداد به شاخص ۰ تا ۱۰۰
SG_DATA.branchRef = { land: 2020, air: 1820, navy: 1288, missile: 783, airDefense: 244, cyber: 66, drone: 76 };

// ---------------------------------------------------------------------
// نیروی اولیه‌ی دستی (تقریبی، برای بازی) — بقیه‌ی کشورها از شاخص قدرتشان ساخته می‌شوند
// ---------------------------------------------------------------------
SG_DATA.initialForces = {
  USA: { infantry: 45, armor: 20, artillery: 1500, fighter: 1400, bomber: 140, drone: 1200, ship: 110, submarine: 68, ballistic: 800, cruise: 4000, airdefense: 70, cyber: 60 },
  RUS: { infantry: 50, armor: 25, artillery: 4000, fighter: 900, bomber: 120, drone: 5000, ship: 70, submarine: 58, ballistic: 1500, cruise: 2000, airdefense: 120, cyber: 40 },
  CHN: { infantry: 70, armor: 25, artillery: 3500, fighter: 1600, bomber: 220, drone: 2500, ship: 150, submarine: 60, ballistic: 2500, cruise: 3000, airdefense: 110, cyber: 70 },
  IND: { infantry: 60, armor: 20, artillery: 3000, fighter: 650, bomber: 0, drone: 500, ship: 55, submarine: 17, ballistic: 600, cruise: 800, airdefense: 60, cyber: 20 },
  GBR: { infantry: 8, armor: 3, artillery: 150, fighter: 140, bomber: 0, drone: 100, ship: 19, submarine: 10, ballistic: 0, cruise: 600, airdefense: 10, cyber: 30 },
  FRA: { infantry: 10, armor: 4, artillery: 200, fighter: 220, bomber: 0, drone: 100, ship: 22, submarine: 9, ballistic: 0, cruise: 500, airdefense: 15, cyber: 25 },
  DEU: { infantry: 8, armor: 4, artillery: 150, fighter: 220, bomber: 0, drone: 150, ship: 15, submarine: 6, ballistic: 0, cruise: 300, airdefense: 20, cyber: 25 },
  TUR: { infantry: 25, armor: 10, artillery: 1500, fighter: 280, bomber: 0, drone: 1500, ship: 30, submarine: 12, ballistic: 300, cruise: 400, airdefense: 15, cyber: 15 },
  IRN: { infantry: 35, armor: 6, artillery: 1800, fighter: 150, bomber: 0, drone: 6000, ship: 10, submarine: 20, ballistic: 3000, cruise: 1500, airdefense: 25, cyber: 20 },
  IRQ: { infantry: 12, armor: 2, artillery: 300, fighter: 30, bomber: 0, drone: 100, ship: 2, submarine: 0, ballistic: 0, cruise: 0, airdefense: 5, cyber: 2 },
  SAU: { infantry: 10, armor: 4, artillery: 700, fighter: 330, bomber: 0, drone: 300, ship: 12, submarine: 0, ballistic: 100, cruise: 300, airdefense: 30, cyber: 8 },
  ARE: { infantry: 4, armor: 2, artillery: 200, fighter: 140, bomber: 0, drone: 300, ship: 10, submarine: 0, ballistic: 20, cruise: 200, airdefense: 20, cyber: 10 },
  ISR: { infantry: 12, armor: 6, artillery: 600, fighter: 340, bomber: 0, drone: 1000, ship: 8, submarine: 5, ballistic: 150, cruise: 400, airdefense: 30, cyber: 30 },
  PAK: { infantry: 25, armor: 7, artillery: 1500, fighter: 390, bomber: 0, drone: 300, ship: 10, submarine: 8, ballistic: 600, cruise: 300, airdefense: 20, cyber: 8 },
  AFG: { infantry: 8, armor: 0, artillery: 50, fighter: 0, bomber: 0, drone: 20, ship: 0, submarine: 0, ballistic: 0, cruise: 0, airdefense: 0, cyber: 1 },
  AZE: { infantry: 6, armor: 2, artillery: 400, fighter: 20, bomber: 0, drone: 400, ship: 2, submarine: 0, ballistic: 50, cruise: 20, airdefense: 10, cyber: 4 },
  ARM: { infantry: 4, armor: 1, artillery: 250, fighter: 4, bomber: 0, drone: 50, ship: 0, submarine: 0, ballistic: 20, cruise: 0, airdefense: 6, cyber: 2 },
  TKM: { infantry: 4, armor: 1, artillery: 200, fighter: 20, bomber: 0, drone: 30, ship: 2, submarine: 0, ballistic: 0, cruise: 0, airdefense: 3, cyber: 1 },
  UKR: { infantry: 40, armor: 8, artillery: 1500, fighter: 80, bomber: 0, drone: 5000, ship: 2, submarine: 0, ballistic: 100, cruise: 500, airdefense: 25, cyber: 25 },
  KOR: { infantry: 30, armor: 10, artillery: 3000, fighter: 400, bomber: 0, drone: 300, ship: 25, submarine: 20, ballistic: 1000, cruise: 500, airdefense: 40, cyber: 25 },
  PRK: { infantry: 60, armor: 8, artillery: 8000, fighter: 300, bomber: 0, drone: 300, ship: 10, submarine: 70, ballistic: 1000, cruise: 100, airdefense: 30, cyber: 20 },
  JPN: { infantry: 10, armor: 3, artillery: 300, fighter: 320, bomber: 0, drone: 200, ship: 50, submarine: 22, ballistic: 0, cruise: 400, airdefense: 35, cyber: 20 },
  EGY: { infantry: 30, armor: 10, artillery: 2000, fighter: 250, bomber: 0, drone: 100, ship: 30, submarine: 8, ballistic: 50, cruise: 100, airdefense: 40, cyber: 5 },
};

// ---------------------------------------------------------------------
// تخصص کشورها: هر کشور در چیزی قوی است
//   output: ضریب تولید هر کارخانه   factories: کارخانه‌ی اضافه در شروع   range: برد (کیلومتر)
// درخت پیشرفت (مرحله‌ی ۶) این عددها را بالاتر می‌برد (مثلاً برد موشک ۲۰۰۰ ← ۲۵۰۰ ← ۳۰۰۰).
// ---------------------------------------------------------------------
SG_DATA.specialties = {
  IRN: { ballistic: { output: 2, factories: 1, range: 2000 }, cruise: { output: 1.5, range: 1650 }, drone: { output: 2.5, factories: 1, range: 2000 } },
  USA: { fighter: { output: 1.6, factories: 1 }, bomber: { output: 1.5, range: 10000 }, ship: { output: 1.3 }, submarine: { output: 1.5 }, cruise: { output: 1.5, range: 1600 }, cyber: { output: 1.5 } },
  RUS: { ballistic: { output: 1.5, range: 1500 }, cruise: { output: 1.5, range: 2500 }, armor: { output: 1.5, factories: 1 }, artillery: { output: 1.8 }, airdefense: { output: 1.5, range: 400 } },
  CHN: { ship: { output: 2.5, factories: 1 }, ballistic: { output: 1.5, range: 4000 }, drone: { output: 1.5 }, fighter: { output: 1.3 } },
  IND: { infantry: { output: 1.5 }, ballistic: { range: 3000 }, cruise: { range: 800 } },
  TUR: { drone: { output: 2.5, factories: 1, range: 1800 }, armor: { output: 1.2 }, ship: { output: 1.2 } },
  FRA: { fighter: { output: 1.2 }, submarine: { output: 1.2 }, cruise: { range: 1000 } },
  GBR: { submarine: { output: 1.3 }, cruise: { range: 1600 }, cyber: { output: 1.3 } },
  DEU: { armor: { output: 1.6, factories: 1 }, airdefense: { output: 1.3 } },
  ISR: { airdefense: { output: 2, range: 300 }, drone: { output: 1.5 }, cyber: { output: 2 }, ballistic: { range: 1500 } },
  PRK: { ballistic: { output: 1.5, range: 1500 }, artillery: { output: 1.5 } },
  PAK: { ballistic: { range: 2750 } },
  KOR: { ship: { output: 1.8 }, armor: { output: 1.3 }, artillery: { output: 1.5 } },
  SAU: { ballistic: { range: 2500 } },
  UKR: { drone: { output: 2, range: 1500 } },
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
