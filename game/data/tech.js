// =====================================================================
// درخت پیشرفت (مرحله‌ی ۶) — دستی
// ---------------------------------------------------------------------
// هر گره:
//   id, branch ('economy' | 'military' | 'doctrine'), name, icon, desc
//   cost      هزینه (میلیارد دلار، × ضریب دستمزد کشور) — یا
//   costPct   هزینه به‌صورت سهم از GDP (برای گره‌های اقتصادی که اثرشان هم نسبت به GDP است)
//   months    زمان تحقیق (تحریم آن را طولانی‌تر می‌کند)
//   req       پیش‌نیازها (شناسه‌ی گره‌ها)
//   group     گره‌های هم‌گروه انحصاری‌اند (فقط یکی از دکترین‌ها)
//   need      شرط نمایش: { oil: true } فقط کشوری که انرژی تولید می‌کند
//   effects:
//     taxEff / growth / stability   ← اثر دائمی اقتصادی (همان «mod» های اقتصاد، بی‌پایان)
//     energyUse: -0.08              ← مصرف انرژی ۸٪ کمتر (دائمی)
//     energyProd: 0.1               ← تولید انرژی ۱۰٪ بیشتر (دائمی)
//     range: { missile: 500 }       ← برد بیشتر (کیلومتر)
//     output: { missile: 0.2 }      ← تولید هر کارخانه‌ی این نوع ۲۰٪ بیشتر (فقط برای همین کشور)
//     tech: { air: 12 }             ← شاخص فناوری شاخه بالا می‌رود: کیفیت رزمی بهتر و باز شدن کارخانه‌ها (requires)
//     war: { groundAtt, groundDef, strike, sortie }  ← ضریب‌های نبرد (دکترین)
// =====================================================================
window.SG_DATA = window.SG_DATA || {};

SG_DATA.techBranches = {
  economy: { name: 'اقتصاد', icon: '💼' },
  military: { name: 'نظامی', icon: '⚙️' },
  doctrine: { name: 'دکترین', icon: '📜' },
};

SG_DATA.tech = [
  // ------------------------- اقتصاد -------------------------
  { id: 'e_gov', branch: 'economy', name: 'دولت الکترونیک', icon: '🖥️', costPct: 0.006, months: 6, req: [],
    desc: 'مالیات کامل‌تر جمع می‌شود.', effects: { taxEff: 0.03 } },
  { id: 'e_tax', branch: 'economy', name: 'مبارزه با فرار مالیاتی', icon: '🧾', costPct: 0.008, months: 9, req: ['e_gov'],
    desc: 'کارایی مالیات باز هم بیشتر.', effects: { taxEff: 0.04 } },
  { id: 'e_park', branch: 'economy', name: 'پارک‌های فناوری', icon: '🏭', costPct: 0.008, months: 9, req: [],
    desc: 'رشد اقتصادی سالانه بیشتر.', effects: { growth: 0.004 } },
  { id: 'e_know', branch: 'economy', name: 'اقتصاد دانش‌بنیان', icon: '💡', costPct: 0.012, months: 14, req: ['e_park', 'e_gov'],
    desc: 'رشد اقتصادی پایدار و بالاتر.', effects: { growth: 0.006 } },
  { id: 'e_eff', branch: 'economy', name: 'بهره‌وری انرژی', icon: '💡', costPct: 0.006, months: 8, req: [],
    desc: 'مصرف انرژی ۸٪ کمتر.', effects: { energyUse: -0.08 } },
  { id: 'e_renew', branch: 'economy', name: 'انرژی خورشیدی و بادی', icon: '☀️', costPct: 0.012, months: 14, req: ['e_eff'],
    desc: 'تولید انرژی ۱۰٪ بیشتر و مصرف ۵٪ کمتر — بدون نیاز به نفت.', effects: { energyProd: 0.1, energyUse: -0.05 } },
  { id: 'e_drill', branch: 'economy', name: 'استخراج پیشرفته', icon: '🛢️', costPct: 0.007, months: 10, req: [], need: { oil: true },
    desc: 'تولید انرژی ۱۰٪ بیشتر (صادرات بیشتر).', effects: { energyProd: 0.1 } },
  { id: 'e_eor', branch: 'economy', name: 'ازدیاد برداشت', icon: '⛽', costPct: 0.01, months: 14, req: ['e_drill'], need: { oil: true },
    desc: 'تولید انرژی ۱۵٪ بیشتر.', effects: { energyProd: 0.15 } },
  { id: 'e_media', branch: 'economy', name: 'رسانه‌ی ملی و آموزش', icon: '📺', costPct: 0.005, months: 8, req: [],
    desc: 'ثبات هدف +۳ (دائمی).', effects: { stability: 3 } },
  { id: 'e_health', branch: 'economy', name: 'نظام سلامت فراگیر', icon: '🏥', costPct: 0.01, months: 12, req: ['e_media'],
    desc: 'ثبات هدف +۴ و رشد کمی بیشتر.', effects: { stability: 4, growth: 0.002 } },

  // ------------------------- نظامی: برد -------------------------
  { id: 'm_mis_r1', branch: 'military', name: 'برد موشک +۵۰۰', icon: '🚀', cost: 3, months: 10, req: [],
    desc: 'موشک‌ها ۵۰۰ کیلومتر دورتر را می‌زنند.', effects: { range: { missile: 500 } } },
  { id: 'm_mis_r2', branch: 'military', name: 'برد موشک +۵۰۰ (دوم)', icon: '🚀', cost: 6, months: 14, req: ['m_mis_r1'],
    desc: 'باز هم ۵۰۰ کیلومتر بیشتر.', effects: { range: { missile: 500 } } },
  { id: 'm_drone_r', branch: 'military', name: 'پهپاد دوربرد', icon: '🛩️', cost: 2, months: 8, req: [],
    desc: 'برد پهپادها ۵۰۰ کیلومتر بیشتر.', effects: { range: { drone: 500 } } },
  { id: 'm_air_r', branch: 'military', name: 'سوخت‌گیری هوایی', icon: '✈️', cost: 4, months: 12, req: [],
    desc: 'برد جنگنده و بمب‌افکن ۴۰۰ کیلومتر بیشتر.', effects: { range: { fighter: 400, bomber: 400 } } },

  // ------------------------- نظامی: بهره‌وری کارخانه -------------------------
  { id: 'm_mis_o', branch: 'military', name: 'خط تولید موشک خودکار', icon: '🏭', cost: 2, months: 8, req: [],
    desc: 'هر کارخانه‌ی موشک ۲۰٪ بیشتر تولید می‌کند.', effects: { output: { missile: 0.2 } } },
  { id: 'm_drone_o', branch: 'military', name: 'تولید انبوه پهپاد', icon: '🏭', cost: 1.5, months: 6, req: [],
    desc: 'هر کارخانه‌ی پهپاد ۲۰٪ بیشتر تولید می‌کند.', effects: { output: { drone: 0.2 } } },
  { id: 'm_land_o', branch: 'military', name: 'صنایع زرهی', icon: '🛡️', cost: 3, months: 10, req: [],
    desc: 'تولید پیاده، زرهی و توپخانه ۲۰٪ بیشتر.', effects: { output: { infantry: 0.2, armor: 0.2, artillery: 0.2 } } },
  { id: 'm_air_o', branch: 'military', name: 'خط مونتاژ هواپیما', icon: '🏭', cost: 5, months: 12, req: ['m_air1'],
    desc: 'تولید جنگنده و بمب‌افکن ۲۰٪ بیشتر.', effects: { output: { fighter: 0.2, bomber: 0.2 } } },
  { id: 'm_ad_o', branch: 'military', name: 'تولید پدافند', icon: '📡', cost: 2.5, months: 9, req: [],
    desc: 'تولید پدافند ۲۵٪ بیشتر.', effects: { output: { airdefense: 0.25 } } },

  // ------------------------- نظامی: فناوری (کیفیت + باز شدن کارخانه) -------------------------
  { id: 'm_air1', branch: 'military', name: 'صنایع هوایی', icon: '✈️', cost: 5, months: 12, req: [],
    desc: 'فناوری هوایی +۱۲: هواپیماهای بهتر؛ با ۴۰ کارخانه‌ی جنگنده و با ۷۰ بمب‌افکن باز می‌شود.', effects: { tech: { air: 12 } } },
  { id: 'm_air2', branch: 'military', name: 'جنگنده‌ی نسل جدید', icon: '✈️', cost: 8, months: 16, req: ['m_air1'],
    desc: 'فناوری هوایی +۱۲ دیگر.', effects: { tech: { air: 12 } } },
  { id: 'm_land1', branch: 'military', name: 'تانک و زره مدرن', icon: '🪖', cost: 4, months: 10, req: [],
    desc: 'فناوری زمینی +۱۰: نیروی زمینی قوی‌تر در نبرد.', effects: { tech: { land: 10 } } },
  { id: 'm_navy1', branch: 'military', name: 'کشتی‌سازی پیشرفته', icon: '🚢', cost: 5, months: 14, req: [],
    desc: 'فناوری دریایی +۱۲ (زیردریایی‌سازی با ۳۵ باز می‌شود).', effects: { tech: { navy: 12 } } },
  { id: 'm_mis1', branch: 'military', name: 'هدایت دقیق موشک', icon: '🎯', cost: 4, months: 12, req: [],
    desc: 'فناوری موشکی +۱۰.', effects: { tech: { missile: 10 } } },
  { id: 'm_ad1', branch: 'military', name: 'رادار و پدافند لایه‌ای', icon: '📡', cost: 4, months: 12, req: [],
    desc: 'فناوری پدافند +۱۲.', effects: { tech: { airDefense: 12 } } },
  { id: 'm_cyber1', branch: 'military', name: 'فرماندهی سایبری', icon: '💻', cost: 2, months: 8, req: [],
    desc: 'فناوری سایبری +۱۲.', effects: { tech: { cyber: 12 } } },
  { id: 'm_drone1', branch: 'military', name: 'پهپاد هوشمند', icon: '🛩️', cost: 2.5, months: 9, req: [],
    desc: 'فناوری پهپاد +۱۰.', effects: { tech: { drone: 10 } } },

  // ------------------------- دکترین (فقط یکی) -------------------------
  { id: 'd_deep', branch: 'doctrine', group: 'doctrine', name: 'دفاع عمیق', icon: '🏰', cost: 3, months: 10, req: [],
    desc: 'قدرت دفاع زمینی +۲۰٪. برای کشوری که می‌خواهد حمله را دفع کند.', effects: { war: { groundDef: 0.2 } } },
  { id: 'd_blitz', branch: 'doctrine', group: 'doctrine', name: 'جنگ برق‌آسا', icon: '⚡', cost: 3, months: 10, req: [],
    desc: 'قدرت حمله‌ی زمینی +۲۰٪. پیشروی سریع‌تر.', effects: { war: { groundAtt: 0.2 } } },
  { id: 'd_asym', branch: 'doctrine', group: 'doctrine', name: 'جنگ نامتقارن', icon: '🎯', cost: 3, months: 10, req: [],
    desc: 'آسیب موشک و پهپاد +۳۰٪ و دفاع زمینی +۱۰٪. مناسب کشورهای موشکی.', effects: { war: { strike: 0.3, groundDef: 0.1 } } },
  { id: 'd_air', branch: 'doctrine', group: 'doctrine', name: 'برتری هوایی', icon: '🛫', cost: 3, months: 10, req: [],
    desc: '۴۰٪ جنگنده و بمب‌افکن بیشتر در هر ماه عملیاتی‌اند.', effects: { war: { sortie: 0.4 } } },
];
