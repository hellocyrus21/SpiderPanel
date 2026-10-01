// =====================================================================
// واحدهای نظامی (دستی نوشته می‌شود)
// ---------------------------------------------------------------------
// هر «واحد» یک لشکر/اسکادران/ناوگروه انتزاعی است.
//   branch    شاخه (برای شاخص قدرت: land, air, navy, missile, airDefense, cyber, drone)
//   power     سهم این واحد در قدرت شاخه
//   attack / defense  قدرت حمله و دفاع (برای نبرد در مرحله‌ی ۴)
//   range     برد به کیلومتر (۰ = فقط درگیری مستقیم)
//   speed     سرعت حرکت (کیلومتر در هر نوبت/ماه)
//   cost      هزینه‌ی ساخت (میلیارد دلار)    time: زمان ساخت (ماه)
//   upkeep    هزینه‌ی نگهداری ماهانه (میلیارد دلار، پایه)
//   fuel      مصرف انرژی (واحد انرژی در سال؛ به مصرف کشور اضافه می‌شود)
//   requires  حداقل سطح فناوری شاخه برای ساخت (از قدرت اولیه‌ی کشور؛ بعداً درخت پیشرفت)
//   advanced  تجهیزات پیشرفته: زیر تحریم سنگین گران‌تر و کندتر ساخته می‌شود
//   weakVs    ضریب ضعف در برابر نوع دیگر (مثلاً زرهی در برابر پهپاد ۰.۷)
// =====================================================================
window.SG_DATA = window.SG_DATA || {};

SG_DATA.units = {
  infantry: { name: 'پیاده', icon: '🪖', branch: 'land', power: 1, attack: 4, defense: 6, range: 0, speed: 500,
    cost: 0.6, time: 2, upkeep: 0.05, fuel: 0.05, requires: 0, advanced: false, weakVs: { artillery: 0.8, bomber: 0.8 } },
  armor: { name: 'زرهی', icon: '🛡️', branch: 'land', power: 3, attack: 10, defense: 7, range: 0, speed: 600,
    cost: 2.5, time: 3, upkeep: 0.12, fuel: 0.4, requires: 0, advanced: false, weakVs: { drone: 0.7, bomber: 0.8 } },
  artillery: { name: 'توپخانه', icon: '💥', branch: 'land', power: 2, attack: 8, defense: 3, range: 40, speed: 450,
    cost: 1.2, time: 2, upkeep: 0.07, fuel: 0.15, requires: 0, advanced: false, weakVs: { drone: 0.8, fighter: 0.8 } },
  fighter: { name: 'جنگنده', icon: '✈️', branch: 'air', power: 4, attack: 9, defense: 8, range: 1200, speed: 3000,
    cost: 4, time: 4, upkeep: 0.25, fuel: 0.6, requires: 20, advanced: true, weakVs: { airdefense: 0.8 } },
  bomber: { name: 'بمب‌افکن', icon: '🛩️', branch: 'air', power: 6, attack: 14, defense: 4, range: 4000, speed: 3000,
    cost: 7, time: 6, upkeep: 0.4, fuel: 0.9, requires: 70, advanced: true, weakVs: { airdefense: 0.6, fighter: 0.7 } },
  drone: { name: 'پهپاد', icon: '🛸', branch: 'drone', power: 1, attack: 6, defense: 2, range: 1500, speed: 2000,
    cost: 0.5, time: 1, upkeep: 0.04, fuel: 0.05, requires: 0, advanced: false, weakVs: { airdefense: 0.6, cyber: 0.8 } },
  ship: { name: 'ناو جنگی', icon: '🚢', branch: 'navy', power: 5, attack: 9, defense: 9, range: 300, speed: 1500,
    cost: 6, time: 8, upkeep: 0.35, fuel: 0.8, requires: 15, advanced: true, weakVs: { submarine: 0.7, cruise: 0.7 } },
  submarine: { name: 'زیردریایی', icon: '🐋', branch: 'navy', power: 4, attack: 10, defense: 6, range: 200, speed: 1000,
    cost: 5, time: 7, upkeep: 0.3, fuel: 0.4, requires: 35, advanced: true, weakVs: { ship: 0.9 } },
  ballistic: { name: 'موشک بالستیک', icon: '🚀', branch: 'missile', power: 2, attack: 12, defense: 1, range: 2000, speed: 0,
    cost: 1, time: 2, upkeep: 0.06, fuel: 0.02, requires: 30, advanced: true, weakVs: { airdefense: 0.7 } },
  cruise: { name: 'موشک کروز', icon: '🎯', branch: 'missile', power: 1.5, attack: 9, defense: 1, range: 1500, speed: 0,
    cost: 0.8, time: 2, upkeep: 0.05, fuel: 0.02, requires: 20, advanced: true, weakVs: { airdefense: 0.6 } },
  airdefense: { name: 'پدافند هوایی', icon: '📡', branch: 'airDefense', power: 2, attack: 2, defense: 10, range: 250, speed: 450,
    cost: 1.5, time: 3, upkeep: 0.1, fuel: 0.1, requires: 0, advanced: false, weakVs: { cyber: 0.75, cruise: 0.9 } },
  cyber: { name: 'سایبری و جنگ الکترونیک', icon: '💻', branch: 'cyber', power: 2, attack: 5, defense: 5, range: 99999, speed: 0,
    cost: 0.8, time: 2, upkeep: 0.06, fuel: 0, requires: 20, advanced: false, weakVs: {} },
};

// نسبت واحدها در هر شاخه هنگام ساخت نیروهای اولیه‌ی کشورها (جمع هر شاخه = ۱)
SG_DATA.unitMix = {
  land: { infantry: 0.55, armor: 0.28, artillery: 0.17 },
  air: { fighter: 0.8, bomber: 0.2 },
  navy: { ship: 0.65, submarine: 0.35 },
  missile: { ballistic: 0.55, cruise: 0.45 },
  airDefense: { airdefense: 1 },
  cyber: { cyber: 1 },
  drone: { drone: 1 },
};

// «قدرت مرجع» هر شاخه: کشوری با این مقدار قدرت، شاخص ۱۰۰ می‌گیرد (مقیاس لگاریتمی)
SG_DATA.branchRef = { land: 300, air: 150, navy: 120, missile: 80, airDefense: 60, cyber: 30, drone: 60 };

// نام فرمانده‌ها بر اساس منطقه‌ی کشور (ترکیب تصادفی نام و نام خانوادگی؛ شخص واقعی نیستند)
SG_DATA.commanderNames = {
  fa: { first: ['رضا', 'علی', 'محمود', 'حسین', 'بهرام', 'کاوه', 'داریوش', 'فرهاد', 'مهدی', 'سعید'],
    last: ['کاظمی', 'رستمی', 'نادری', 'صالحی', 'افشار', 'شریفی', 'بهرامی', 'یزدانی', 'کریمی', 'فرهمند'] },
  tr: { first: ['محمد', 'احمد', 'مصطفی', 'کمال', 'عثمان', 'یلماز', 'مراد', 'جان', 'امره', 'حسن'],
    last: ['آیدین', 'دمیر', 'کایا', 'شاهین', 'اوزتورک', 'چلیک', 'آرسلان', 'دوغان', 'قلیچ', 'یلدیز'] },
  ru: { first: ['الکسی', 'سرگئی', 'دیمیتری', 'ایوان', 'نیکلای', 'ولادیمیر', 'آندری', 'یوری', 'میخائیل', 'پاول'],
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
    last: ['شارما', 'سینگ', 'وارما', 'پاتل', 'رائو', 'نایر', 'گوپتا', 'چاوهان', 'رِدی', 'مِهتا'] },
  ar: { first: ['خالد', 'فهد', 'سلمان', 'عمر', 'یوسف', 'طارق', 'ماجد', 'سامی', 'ناصر', 'کریم'],
    last: ['الحسینی', 'العتیبی', 'الدوسری', 'المنصوری', 'الشمری', 'الحربی', 'القحطانی', 'الزهرانی', 'العنزی', 'المطیری'] },
};
// کدام کشورها از کدام فهرست نام استفاده کنند (بقیه: en)
SG_DATA.commanderRegion = {
  IRN: 'fa', AFG: 'fa', TJK: 'fa', TUR: 'tr', AZE: 'tr', TKM: 'tr', UZB: 'tr', KAZ: 'tr', KGZ: 'tr',
  RUS: 'ru', BLR: 'ru', UKR: 'ru', DEU: 'de', AUT: 'de', CHE: 'de', FRA: 'fr', BEL: 'fr',
  CHN: 'zh', TWN: 'zh', IND: 'hi', NPL: 'hi', SAU: 'ar', IRQ: 'ar', ARE: 'ar', QAT: 'ar', KWT: 'ar',
  BHR: 'ar', OMN: 'ar', YEM: 'ar', SYR: 'ar', JOR: 'ar', LBN: 'ar', EGY: 'ar', LBY: 'ar', DZA: 'ar',
  MAR: 'ar', TUN: 'ar', SDN: 'ar', PSE: 'ar', PAK: 'hi',
};
SG_DATA.commanderRanks = ['سرتیپ', 'سرلشکر', 'سپهبد'];
SG_DATA.armyOrdinals = ['اول', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم', 'هفتم', 'هشتم', 'نهم', 'دهم',
  'یازدهم', 'دوازدهم', 'سیزدهم', 'چهاردهم', 'پانزدهم'];
