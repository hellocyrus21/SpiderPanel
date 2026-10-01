<div dir="rtl">

# ژئوپلیتیک ۲۰۲۶ — سند کامل وضعیت پروژه و نقشه‌ی راه

> **برای هوش مصنوعی (یا برنامه‌نویسی) که کار را ادامه می‌دهد:**
> این سند همه‌ی چیزی است که تا اینجا ساخته شده، چرا این‌طور ساخته شده و دقیقاً قرار است بعداً چه ساخته شود.
> قبل از هر تغییری کل این سند را بخوان. نام فایل‌ها، توابع و فیلدها دقیقاً همان چیزی است که در کد هست.
> مشخصات اولیه‌ی کاربر در فایل `GAME_SPEC` بوده و خلاصه‌ی کاملش در بخش ۲ همین سند آمده است.
> تاریخ این سند: پایان مرحله‌ی ۴ — نسخه‌ی بازسازی‌شده (جنگ درصدی) + خرید سلاح. شاخه‌ی گیت: `claude/tender-darwin-45q8ru` (مراحل قبل: `claude/fervent-faraday-scleha`).

---

## فهرست
1. خلاصه و وضعیت فعلی
2. قواعد قطعی پروژه (از مشخصات کاربر)
3. تصمیم‌های فنی و جاهایی که از مشخصات اولیه فاصله گرفتیم
4. ساختار فایل‌ها
5. معماری کد (فضای نام، ترتیب بارگذاری، جداسازی موتور و UI)
6. داده‌ها (فایل‌های `data/`)
7. ساختار حالت بازی (`state`) و نسخه‌ها
8. سیستم‌های ساخته‌شده با فرمول دقیق
9. رابط کاربری
10. تاریخچه‌ی کار (مرحله به مرحله + بازخوردهای کاربر)
11. ترجیحات کاربر (خیلی مهم)
12. محدودیت‌ها و مشکلات شناخته‌شده
13. نقشه‌ی راه: مرحله‌ی ۴، ۵ و ۶ با جزئیات
14. روش کار: ساخت داده، تست، زیپ، کامیت

---

## ۱. خلاصه و وضعیت فعلی

یک بازی استراتژی بزرگ (grand strategy) **تک‌نفره**، **وب‌اپ استاتیک**، **فارسی و راست‌به‌چپ**، با تم ژئوپلیتیک سال ۲۰۲۶.
بازیکن یکی از ۹ کشور را انتخاب می‌کند و نوبت‌به‌نوبت (هر نوبت = یک ماه) اقتصاد، ثبات داخلی، ارتش و (در آینده) دیپلماسی و جنگ را مدیریت می‌کند.

| مرحله | موضوع | وضعیت |
|---|---|---|
| ۱ | نقشه‌ی جهان، کلیک روی کشور، اطلاعات، انتخاب کشور | ✅ تمام |
| — | مشاور ارشد، راهنمای داخل بازی، زیپ برای هاست | ✅ تمام (درخواست کاربر) |
| ۲ | نوبت، پول/انرژی/ثبات، اقتصاد، فرمان‌ها، سیستم اعلان‌ها، ذخیره‌ی خودکار | ✅ تمام |
| ۳ | واحدهای نظامی، تولید، اعزام روی نقشه | ✅ تمام (یک بار بر اساس بازخورد کاربر بازطراحی شد) |
| — | شهرها، رهبران، تخصص کشورها، کارخانه‌ی هر نوع سلاح، مشاور اقتصادی | ✅ تمام (درخواست کاربر) |
| — | **خرید سلاح از کشورهای دیگر** | ✅ تمام (درخواست کاربر) |
| ۴ | نبرد و فتح | ✅ تمام |
| ۵ | هوش مصنوعی کشورها و دیپلماسی | ✅ تمام |
| ۶ | **رویدادهای تصادفی، درخت پیشرفت، ذخیره/بارگذاری کامل، اهداف و دستاوردها** | ⏳ بعدی |

**تحویل به کاربر:** فایل `dist/geopolitics2026.zip` (در ریشه‌ی مخزن). کاربر آن را در `public_html` هاست اشتراکی ایرانی اکسترکت می‌کند. `index.html` در ریشه‌ی زیپ است.

---

## ۲. قواعد قطعی پروژه (از مشخصات کاربر — نقض نشود)

### فنی
- **فقط سمت کلاینت:** HTML + CSS + JavaScript. بدون سرور Node، بدون WebSocket، بدون پروسه‌ی دائمی. هاست فقط فایل استاتیک سرو می‌کند (هاست اشتراکی داخل ایران).
- **هیچ CDN خارجی** (jsdelivr، unpkg، Google Fonts و ...). همه‌ی کتابخانه‌ها و فونت‌ها لوکال در `lib/` و `fonts/`.
- **ذخیره:** `localStorage`.
- **بدون API هوش مصنوعی (LLM)** در هسته‌ی بازی. AI کشورها کاملاً قانون‌محور و امتیازدهی در خود کد.
- **UI فارسی و RTL**؛ نام کشورها و واحدها فارسی؛ **نام متغیرها و ساختار کد انگلیسی**.
- روی **موبایل و دسکتاپ** کار کند (لمس، پنل‌های کشویی).
- **هیچ منطقی برای کشور خاص هاردکد نشود.** تفاوت کشورها فقط از داده. قابل‌بازی بودن فقط فلگ `playable` است.

### گیم‌پلی
- بازی **آسان نباشد**: اقتصاد، دیپلماسی، ثبات و لجستیک هم‌زمان فشار بیاورند.
- **تکراری نشود**: شروع کمی تصادفی، شخصیت تصادفی کشورها، رویدادهای تصادفی (حداقل ۲۰)، رفتار بازگشتی.
- **AI منصف:** همان قوانین بازیکن، بدون تقلب. سختی با زمان بالا برود (بحران‌های زنجیره‌ای).
- **هیچ سناریوی از پیش نوشته‌ای** («اگر A به B حمله کرد C فلان کند») — هر کشور هر نوبت از وضعیت لحظه‌ای تصمیم بگیرد.

### کشورها
- قابل‌بازی: ایران، ترکیه، روسیه، آمریکا، آلمان، فرانسه، انگلیس، چین، هند.
- بقیه (~۱۸۷ کشور) کنترل AI؛ بازیکن می‌تواند به آن‌ها حمله کند، متحد شود، تحریم کند (مثلاً ایران به عراق و عربستان حمله کند).

### نبرد (از مشخصات، برای مرحله‌ی ۴)
```
قدرت مؤثر = تعداد × کیفیت × روحیه × تدارکات × ضریب زمین × ضریب هوایی
```
برتری هوایی ضریب کل نبرد زمینی را تغییر می‌دهد؛ زمین (کوهستان، شهر، دشت) به مدافع بونوس می‌دهد؛ حدود ±۱۰٪ شانس؛ شکست = تلفات و افت روحیه، نه نابودی کامل؛ جنگ طولانی = «خستگی جنگ»؛ سلاح‌های دوربرد بازدارندگی می‌دهند ولی تنش را بالا می‌برند.

### اعلان‌ها (از مشخصات — ساخته شده)
گوینده‌ی شخصیت‌دار (فرمانده با اسم، وزیر اقتصاد، وزیر خارجه، رئیس اطلاعات، وزیر کشور، خبرگزاری)، سه سطح (info / warning / critical)، دکمه‌های عملی، کلیک = زوم روی محل، صندوق با فیلتر، چند متن برای هر نوع، ادغام هم‌نوع‌ها، خاموش/روشن کردن دسته‌ها، موبایل: پایین صفحه و کشیدنی. موتور فقط رویداد اضافه می‌کند؛ متن در UI.

### روش کار با کاربر
- کاربر تا حالا بازی نساخته؛ **ساده توضیح بده**، کد **تمیز و کامنت‌دار (کامنت‌ها فارسی)**.
- هر مرحله قابل اجرا و تست باشد (باز کردن `index.html` کافی باشد).
- بین دو راه، **ساده‌تر** را انتخاب کن و بگو چرا.
- بعد از هر مرحله **بایست و منتظر تست کاربر بمان**.
- با کاربر **فارسی** حرف بزن.

---

## ۳. تصمیم‌های فنی و فاصله از مشخصات اولیه (با دلیل)

| مشخصات اولیه | چه کردیم | چرا |
|---|---|---|
| `data/*.json` | `data/*.js` که `window.SG_DATA.x = {...}` می‌سازد | مرورگر خواندن JSON از `file://` (دابل‌کلیک) را مسدود می‌کند. محتوا همان JSON است. |
| ES Modules | اسکریپت معمولی + فضای نام `window.SG` (هر فایل یک IIFE) | ماژول‌ها هم از `file://` بار نمی‌شوند. ساختار همچنان ماژولار است. |
| ذخیره/بارگذاری در مرحله‌ی ۶ | **ذخیره‌ی خودکار** بعد از هر نوبت از مرحله‌ی ۲ + **دانلود/بارگذاری فایل ذخیره** از مرحله‌ی ۳ | بدون آن پیشرفت با بستن صفحه از دست می‌رفت؛ کاربر پرسید سافاری/دسکتاپ چطور. ذخیره‌ی چندتایی و دستی هنوز مرحله‌ی ۶ است. |
| «ارتش» با فرمانده | **حذف شد**؛ نیروها به‌صورت «دسته»ی هر نوع روی نقشه | کاربر گفت ساختن ارتش و جابه‌جا کردن بخش‌ها گیج‌کننده است. |
| فرمانده با اسم برای هر ارتش | یک «رئیس ستاد» با اسم ساختگی برای هر کشور (گوینده‌ی اعلان‌های نظامی) | نتیجه‌ی حذف ارتش‌ها. |
| — | مقیاس قدرت هر شاخه = «شاخص» ۰ تا ~۱۲۰ | برای مقایسه، رتبه‌بندی و مشاور. |
| عکس رهبران | فقط نام + عنوان + آواتار حروف اول؛ پشتیبانی از عکس لوکال `img/leaders/<ISO3>.jpg` | دسترسی به ویکی‌پدیا از محیط توسعه بسته بود. |
| تاریخ | میلادی (ژانویه ۲۰۲۶ …) با رقم فارسی | تم مشخصات «سال ۲۰۲۶» است. |
| جداکننده‌ی «·» | با « \| » جایگزین شد | نقطه‌ی وسط کنار عدد فارسی شبیه صفر «۰» دیده می‌شد. |

---

## ۴. ساختار فایل‌ها

```
SpiderPanel/                  (مخزن؛ بقیه‌ی فایل‌های ریشه مربوط به پروژه‌ی دیگری است — دست نزن)
├── dist/geopolitics2026.zip  خروجی آماده‌ی آپلود (با tools/make-zip.sh ساخته می‌شود)
└── game/
    ├── index.html            تنها صفحه؛ ترتیب <script> ها مهم است (بخش ۵)
    ├── README.md             راهنمای کاربر: اجرا، تست هر مرحله، ساختار
    ├── DESIGN.md             طراحی سیستم‌های آینده (رشد، فتح، جنگ، درخت پیشرفت)
    ├── PROJECT_STATUS.md     همین سند
    ├── css/style.css         همه‌ی استایل‌ها (تم تیره، متغیرهای CSS، بخش موبایل با @media max-width:720px)
    ├── fonts/                Vazirmatn Regular/Bold (woff2) + مجوز OFL
    ├── lib/                  d3.min.js (v7.9)، topojson-client.min.js (v3) + مجوزها
    ├── img/leaders/          عکس رهبران (اختیاری، <ISO3>.jpg) + README.txt
    ├── data/
    │   ├── world.js          خودکار: TopoJSON جهان (Natural Earth 50m، ۲۴۱ ناحیه) — properties.o = مالک
    │   ├── countries.js      خودکار: ۱۹۶ کشور
    │   ├── scenario_2026.js  خودکار: پیمان‌ها، رابطه‌ها، تحریم‌ها، جنگ‌های شروع
    │   ├── messages.js       دستی: گوینده‌ها، دسته‌ها، متن اعلان‌ها (چند متن)، متن فرمان‌ها
    │   ├── units.js          دستی: ۱۲ نوع نیرو، کارخانه‌ها، نیروی اولیه‌ی ۲۳ کشور، تخصص ۱۵ کشور، نام‌های رئیس ستاد
    │   └── leaders.js        دستی: رهبر ۴۸ کشور (نام، عنوان)
    ├── js/
    │   ├── engine/           موتور — هیچ دسترسی به DOM ندارد (در Node با vm قابل اجراست)
    │   │   ├── rng.js          مولد تصادفی بذردار mulberry32 → SG.Rng
    │   │   ├── notify.js       ثبت اعلان + ادغام + cooldown → SG.Notify
    │   │   ├── economy.js      بودجه، رشد، ثبات، تورم، بدهی، انرژی، تحریم → SG.Economy
    │   │   ├── military.js     نیروها، دسته‌ها (بازیکن و AI در جنگ)، کارخانه‌ها، حرکت، تدارکات → SG.Military
    │   │   ├── war.js          جنگ: اعلان، متحدان، بسیج AI، نبرد، اشغال، خستگی، صلح، الحاق → SG.War
    │   │   ├── arms.js         خرید سلاح از کشورهای دیگر → SG.Arms
    │   │   ├── diplomacy.js    تجارت، پیمان، تحریم، تهدید، پیشنهادها (مرحله‌ی ۵) → SG.Diplomacy
    │   │   ├── ai.js           هوش مصنوعی کشورها: شخصیت، اقتصاد، تولید، دیپلماسی، جنگ (مرحله‌ی ۵) → SG.AI
    │   │   ├── actions.js      فرمان‌های دولت و محدوده‌ی سیاست‌ها → SG.Actions
    │   │   ├── state.js        ساخت دنیا، روابط، شروع بازی، مهاجرت ذخیره، پرس‌وجوها → SG.Engine
    │   │   ├── turn.js         اجرای یک نوبت و تولید اعلان‌ها → SG.Turn
    │   │   ├── save.js         localStorage + خروجی/ورودی فایل + تنظیمات → SG.Save
    │   │   ├── advisor.js      تحلیل راهبردی (تهدید، کمبودها، راهبرد) → SG.Advisor
    │   │   └── econAdvisor.js  تحلیل اقتصادی + شبیه‌سازی اثر پیشنهادها → SG.EconAdvisor
    │   ├── ui/
    │   │   ├── format.js       عدد/پول/جمعیت/تاریخ فارسی، برچسب رابطه، esc → SG.Fmt
    │   │   ├── modal.js        پنجره‌ی عمومی → SG.Modal
    │   │   ├── leader.js       آواتار و کارت رهبر → SG.Leader
    │   │   ├── map.js          نقشه‌ی SVG، زوم/پن، برچسب‌ها، شهرها، نیروها → SG.MapView
    │   │   ├── infoPanel.js    پنل اطلاعات کشور + traits → SG.InfoPanel
    │   │   ├── startScreen.js  صفحه‌ی انتخاب کشور + ادامه/بارگذاری ذخیره → SG.StartScreen
    │   │   ├── advisorPanel.js پنجره‌ی مشاور (زبانه‌ی راهبرد کلی + مشاور اقتصادی) → SG.AdvisorPanel
    │   │   ├── guide.js        راهنمای بازی → SG.Guide
    │   │   ├── notifications.js toast، پنجره‌ی بحرانی، صندوق، تنظیمات اعلان → SG.NotifyUI
    │   │   ├── government.js   پنل دولت (بودجه، اسلایدرها، فرمان‌ها) → SG.Government
    │   │   ├── hud.js          نوار منابع بالا + نوار فرمان پایین → SG.Hud
    │   │   ├── militaryPanel.js پنل ارتش (نیروها، کارخانه‌ها، 🛒 خرید سلاح، فرستادن نیرو، حمله به شهر) → SG.MilitaryPanel
    │   │   ├── warPanel.js     پنل جنگ، گزارش نبرد، پنجره‌ی اعلان جنگ، اطلاعات نیروی دشمن → SG.WarPanel
    │   │   ├── diplomacyPanel.js پنل 🌐 دیپلماسی (مرحله‌ی ۵) → SG.DiplomacyPanel
    │   └── main.js           کنترلر اصلی: اتصال موتور و UI، فازها، نوبت، پخش خودکار، رنگ نقشه
    └── tools/                فقط برای توسعه‌دهنده (در زیپ نیست)
        ├── package.json        devDependencies: d3, topojson-client, world-atlas, i18n-iso-countries, vazirmatn
        ├── source-data.mjs     ← داده‌ی دستی کشورها (ویرایش اینجا)
        ├── build-data.mjs      سازنده‌ی data/world.js, countries.js, scenario_2026.js + کپی lib/fonts
        └── make-zip.sh         ساخت dist/geopolitics2026.zip
```

---

## ۵. معماری کد

- هر فایل: `(function (SG) { 'use strict'; ... SG.X = {...}; })(window.SG = window.SG || {});`
- داده‌ها: `window.SG_DATA.{world, countries, scenario, messages, speakers, categories, decrees, decreeReasons, units, unitMix, branchRef, initialForces, specialties, commanderNames, commanderRegion, leaders}`
- **ترتیب بارگذاری در index.html:** lib (d3, topojson) ← data (world, countries, scenario_2026, messages, units, leaders) ← engine (rng, notify, economy, military, actions, war, arms, state, turn, save, advisor, econAdvisor) ← ui (format, modal, leader, map, infoPanel, startScreen, advisorPanel, guide, notifications, government, hud, militaryPanel, warPanel) ← main.js.
  (war.js و arms.js قبل از state.js بار می‌شوند چون createWorld جنگ‌های سناریو را با `SG.War.initScenario` می‌سازد؛ وابستگی‌ها همه در زمان اجرا صدا زده می‌شوند.)
- **قانون معماری:** موتور (`js/engine`) DOM را نمی‌شناسد و متن فارسی نمایشی تولید نمی‌کند (استثنا: نام شهر/رئیس ستاد که داده است، و فهرست واحد در اعلان تحویل). متن‌ها در `data/messages.js` و `js/ui`.
- موتور از `window.SG_DATA` برای داده‌ی ثابت (units, specialties) استفاده می‌کند.
- **state** یک آبجکت JSON ساده و قابل‌سریال‌سازی است (بدون تابع، بدون ارجاع حلقوی).
- تصادف فقط از `SG.Rng` با `state.rngState` (برای تکرارپذیری). UI می‌تواند `Math.random` نداشته باشد؛ موتور نباید.
- `window.SG.app` در کنسول مرورگر برای دیباگ در دسترس است (`app.state`, `app.map`, ...).

---

## ۶. داده‌ها

### ۶.۱ `countries.js` (خودکار از `tools/source-data.mjs`)
هر کشور:
```js
{
  id: 'IRN', name: 'ایران', playable: true, difficulty: 5 /*۱..۵، ۰=غیرقابل‌بازی*/, detailed: true,
  capital: 'تهران' | null, gov: 'D'|'H'|'A'|'M'|'T',   // دموکراسی، نیمه‌دموکراتیک، اقتدارگرا، پادشاهی، دینی
  gdp: 380 /*میلیارد دلار*/, population: 91 /*میلیون*/, stability: 42 /*۰..۱۰۰*/,
  militarySpendPct: 2.5, inflation: 38, debtRatio: 0.35,
  military: { active /*هزار نفر*/, nuclear, land, air, navy, missile, airDefense, cyber, drone /*شاخص ۰..۱۰۰*/ },
  energy: { production, consumption },   // واحد ≈ میلیون تن معادل نفت در سال
  terrain: 'plain'|'mountain'|'desert'|'urban'|'jungle',
  pos: [lon, lat],                       // پایتخت (CAPITAL_POS) یا مرکز سرزمین اصلی
  cities: [{ id:'IRN-0', name, pos:[lon,lat], capital:true, tags:['industry','air','port','missile','oil'],
             share:{ gdp, energy } /*سهم از اقتصاد و انرژی کشور*/, generic?:true /*نام ساختگی*/ }, ...],
  borderPos: { IRQ: [lon,lat], ... },    // نقطه‌ی وسط طولانی‌ترین تکه‌ی مرز مشترک
  neighbors: ['AFG','ARM',...],          // زمینی (خودکار از topojson.neighbors بر اساس مالک)
  seaNeighbors: ['ARE','SAU',...],       // دستی (SEA_NEIGHBORS)
}
```
- `source-data.mjs` بخش‌ها: `BASE` (۱۹۶ کشور: GDP، جمعیت، ٪نظامی، حکومت، ثبات)، `PLAYABLE` (سختی)، `DETAILED` (۴۳ کشور: پایتخت، نیروی فعال، هسته‌ای، زمین، ۷ شاخص نظامی، انرژی)، `NAME_OVERRIDES`، `TERRITORY_OWNER` (گرینلند→دانمارک و ...)، `NAMED_GEOMETRY_OWNER` (سومالیلند، کوزوو، قبرس شمالی، ...)، `SEA_NEIGHBORS`، `ALLIANCES`، `DEFENSE_PACTS`، `BLOC_BONUS`، `RELATIONS`، `WARS`، `SANCTIONS`، `ENERGY`، `MACRO` (تورم و بدهی)، `CAPITAL_POS` (۴۳)، `CITIES` (۴۳ کشور، ۲ تا ۱۰ شهر؛ اولی پایتخت با مختصات ۰,۰ که از CAPITAL_POS پر می‌شود).
- کشورهای بدون CITIES: پایتخت با نام «پایتخت <کشور>» + برای جمعیت ≥۳ میلیون ۱ و ≥۱۰ میلیون ۲ «منطقه‌ی» مجازی («شرق نیجریه») به سمت دورترین مرزها، نقطه‌ای که با `geoContains` داخل خاک کشور باشد (`virtualCities` در build-data). همه `generic: true` دارند و روی نقشه فقط وقتی به جنگ مربوط‌اند نمایش داده می‌شوند. جمع شهرها: ۴۵۲.
- `share` (در build: `withShares`): پایتخت ۳۵٪ GDP (اگر بیش از یک شهر)، بقیه مساوی؛ انرژی: شهر `oil` وزن ۴، بقیه ۱. برچسب `oil`: اهواز، بصره، کرکوک (جدید)، دمام، ابوظبی، دوحه، کویت (+ الجهرا جدید)، باکو، ترکمن‌باشی، مرو، آکتائو، هیوستون، برگن، یکاترینبورگ.
- شاخص نظامی کشورهای غیردقیق از بودجه‌ی نظامی و درآمد سرانه تخمین زده می‌شود (`estimateMilitary` در build-data).
- انرژی پیش‌فرض: مصرف = 0.09×GDP + 0.15×جمعیت، تولید = نصف مصرف.

### ۶.۲ `scenario_2026.js`
`{ id:'world_2026', name, startDate:{year:2026, month:1}, alliances:[{id,name,type:'military'|'economic'|'political',color,members}], defensePacts:[[a,b]], blocBonus:{NATO:35,CSTO:30,EU:25,BRICS:8,SCO:8,GCC:30,ARAB:10}, relations:{A:{B:value}}, wars:[['RUS','UKR']], sanctions:[[by,target]] }`
- پیمان‌ها: ناتو (۳۲)، پیمان امنیت جمعی (روسیه، بلاروس، قزاقستان، قرقیزستان، تاجیکستان)، اتحادیه اروپا، بریکس، شانگهای، شورای همکاری خلیج فارس، اتحادیه عرب.
- پیمان دفاعی دوجانبه: آمریکا-ژاپن/کره/استرالیا/فیلیپین/نیوزیلند، چین-کره‌شمالی، روسیه-کره‌شمالی، عربستان-پاکستان، ترکیه-آذربایجان، روسیه-بلاروس، یونان-قبرس، استرالیا-نیوزیلند.
- تحریم‌ها: ۱۹ کشور غربی بر روسیه و کره‌شمالی، ۱۸ کشور بر ایران، چند کشور بر بلاروس؛ آمریکا بر ونزوئلا، کوبا، نیکاراگوئه، میانمار، سوریه، افغانستان.

### ۶.۳ `units.js` (دستی)
۱۲ نوع: `infantry, armor, artillery, fighter, bomber, drone, ship, submarine, ballistic, cruise, airdefense, cyber`.
- `counted: 'unit'` فقط پیاده (لشکر) و زرهی (تیپ)؛ بقیه `'item'` (تعداد واقعی: فروند، قبضه، آتشبار، تیم).
- فیلدها: `name, short, icon, unitWord, branch, power, attack, defense, range, speed (km/ماه), cost, upkeep (ماهانه، پایه), fuel, weakVs{type:ضریب}, factory{name, output (در ماه به ازای هر کارخانه با توان کامل), cost, time, requires (حداقل فناوری شاخه), advanced}`.
- جدول خلاصه (پایه):

| نوع | آیکون | power | حمله/دفاع | برد | سرعت | قیمت (B$) | تولید/کارخانه/ماه | requires |
|---|---|---|---|---|---|---|---|---|
| infantry پیاده | 🪖 | 10 | 4/6 | 0 | 500 | 1.2 | 0.15 | 0 |
| armor زرهی | 🛡️ | 25 | 10/7 | 0 | 600 | 2 | 0.08 | 0 |
| artillery توپخانه | 💥 | 0.1 | 8/3 | 40 | 450 | 0.006 | 15 | 0 |
| fighter جنگنده | ✈️ | 1 | 9/8 | 1200 | 3000 | 0.09 | 2 | 40 |
| bomber بمب‌افکن | 🛩️ | 3 | 14/4 | 6000 | 3000 | 0.5 | 0.4 | 70 |
| drone پهپاد | 🛸 | 0.05 | 6/2 | 1500 | 1500 | 0.0008 | 30 | 0 |
| ship ناو | 🚢 | 8 | 9/9 | 300 | 1500 | 1.8 | 0.12 | 15 |
| submarine زیردریایی | 🐋 | 6 | 10/6 | 300 | 1000 | 1.5 | 0.08 | 35 |
| ballistic بالستیک | 🚀 | 0.2 | 12/1 | 1000 | 800 | 0.002 | 40 | 30 |
| cruise کروز | 🎯 | 0.1 | 9/1 | 1000 | 800 | 0.0015 | 30 | 25 |
| airdefense پدافند | 📡 | 2 | 2/10 | 250 | 500 | 0.6 | 0.3 | 15 |
| cyber سایبری | 💻 | 1 | 5/5 | ∞ | ∞ | 0.03 | 0.25 | 20 |

- `initialForces`: نیروی دستی ۲۳ کشور (USA, RUS, CHN, IND, GBR, FRA, DEU, TUR, IRN, IRQ, SAU, ARE, ISR, PAK, AFG, AZE, ARM, TKM, UKR, KOR, PRK, JPN, EGY). مثال ایران: پیاده ۳۵، زرهی ۶، توپ ۱۸۰۰، جنگنده ۱۵۰، پهپاد ۶۰۰۰، ناو ۱۰، زیردریایی ۲۰، بالستیک ۳۰۰۰، کروز ۱۵۰۰، پدافند ۲۵، سایبری ۲۰.
- `specialties[ISO3][type] = { output: ضریب تولید, factories: کارخانه‌ی اضافه در شروع, range: برد km }`. مثال: IRN بالستیک ×2 و برد ۲۰۰۰، پهپاد ×2.5 و برد ۲۰۰۰، کروز ×1.5 و ۱۶۵۰؛ USA جنگنده ×1.6، بمب‌افکن برد ۱۰۰۰۰؛ TUR پهپاد ×2.5؛ CHN کشتی ×2.5، بالستیک برد ۴۰۰۰؛ RUS زرهی/موشک؛ DEU زرهی ×1.6؛ ISR پدافند ×2؛ و ...
- `branchRef`: مرجع لگاریتمی برای تبدیل شاخص به تعداد در کشورهای بدون نیروی دستی.
- `unitMix`: نسبت انواع در هر شاخه برای همان تبدیل.

### ۶.۴ `messages.js` (دستی)
- `speakers`: commander 🎖️، economy 💼، foreign 🕊️، intel 🕵️، interior 🏛️، news 📰، advisor 🧑‍💼.
- `categories`: military, economy, diplomacy, domestic, world.
- `messages[type] = { variants:[...], plural?:[...], actions?:[{id,label}] }` — جایگذاری `{key}` از `notification.data`. انتخاب متن: `variants[n.id % length]` (ثابت برای هر اعلان).
- قالب‌بندی کلیدها در UI: `amount/deficit/treasury/monthly` = پول؛ `inflation/growth/pct/debtPct/rate` = درصد؛ `country/other/a/b` = نام کشور؛ `unit` = نام نوع نیرو؛ `year` بدون جداکننده؛ `stability` گرد.
- شناسه‌ی دکمه‌ها: `dismiss`، `newgame`، `open:government|advisor|econ|military`، `decree:<key>`، `show:stack` (از `data.stackId`).
- انواع مرحله‌ی ۴: arms_delivered, arms_cancelled, war_declared, ally_joined, sanctions_new, alliance_expelled, battle_started, battle_defending, battle_won, battle_lost, battle_losing, ammo_low, city_captured, city_liberated, city_lost, war_city_changed, war_weariness, peace_offer (دکمه‌های `peace:<term>` فیلترشده با `data.allowed`), peace_demand (`peace:accept`), peace_signed, annexed, annexed_us, world_war_declared, world_city_captured, world_peace, world_annexed. دکمه‌های جدید: `open:war`, `show:battle` (data.rid), `show:city` (data.cityId), `retreat` (data.cityId). کلید `{term}` ← `SG_DATA.peaceTerms[term].name`. **کلید `count` رزرو شده** (تعداد ادغام اعلان‌هاست) — برای تعداد واحد از `qty` استفاده کن.
- `SG_DATA.peaceTerms`: annex, cede, puppet, reparations, white (icon, name, desc).
- انواع مراحل قبل: welcome, budget_negative_soon, treasury_borrowed, treasury_printed, debt_high, inflation_high, inflation_tamed, economy_report, energy_price_up/down, stability_protests, stability_riots, stability_coup_risk, stability_falling, stability_recovered, game_over_collapse, units_delivered, factory_done, forces_at_border, forces_relocated, supply_low, border_tension, military_costly, new_year, world_unrest, world_inflation, world_gdp_overtake, world_war_ongoing.
- `decrees` (متن فرمان‌ها) و `decreeReasons` (cooldown / no_money / no_credit).

### ۶.۵ `leaders.js`
`leaders[ISO3] = { name, title }` برای ۴۸ کشور (بر اساس اطلاعات اوایل ۲۰۲۶؛ ممکن است کهنه باشد — کاربر می‌تواند ویرایش کند). مثال: USA دونالد ترامپ رئیس‌جمهور، RUS ولادیمیر پوتین، CHN شی جین‌پینگ، IRN سید علی خامنه‌ای رهبر، TUR اردوغان، IND مودی، GBR استارمر، FRA مکرون، DEU مرتس.

---

## ۷. ساختار `state` (نسخه‌ی ۷)

```js
state = {
  version: 7, seed, rngState, scenarioId: 'world_2026',
  date: { year, month }, turn,             // turn از ۰؛ هر نوبت یک ماه
  playerId: 'IRN' | null,                  // قبل از انتخاب null (دنیا قبل از انتخاب ساخته می‌شود)
  countries: { ISO3: Country },            // کپی countries.js + فیلدهای پویا (پایین)
  alliances, defensePacts, sanctions,       // کپی از سناریو؛ با جنگ تغییر می‌کنند (اخراج از پیمان، تحریم جدید)
  wars: [[a,b]],                            // فقط جفت‌ها — همیشه با SG.War.syncPairs از warsInfo ساخته می‌شود
  warsInfo: [ War ],                        // جنگ‌ها با جزئیات (پایین)
  territory: [ { country, by, pct } ],      // خاک واگذارشده با صلح (رنگ دائمی روی نقشه)
  truces: { 'A|B': تا نوبت },               // ۲۴ ماه آتش‌بس بعد از صلح یا باج
  nextWarId, nextReportId, nextOrderId,
  relations: { 'A|B': -100..100 },         // کلید = دو کد مرتب‌شده با | ؛ SG.Engine.relKey
  world: { energyPrice /*پایه 0.6*/, gdp /*جمع جهان*/, topGdp: [15 ISO3] },
  notifications: [ { id, turn, date, type, level, category, speaker, data, focus, groupKey, count, read, acted } ], // حداکثر ۳۰۰
  nextNotificationId, cooldowns: { key: turn },
  collapseCounter, gameOver: null | { reason:'collapse'|'conquered', turn, by? },
  nextStackId, nextCommanderId,
}
```
فیلدهای پویای هر کشور:
```js
c.eco = {
  treasury, debt, inflation, baseInflation, taxRate,
  policy: { military, welfare, investment },   // سهم از GDP (سالانه)
  aid,            // کمک خارجی سالانه (فقط کشورهای AI که بدون آن سرپا نمی‌مانند، مثل اوکراین)
  growth,         // رشد سالانه (کسر)
  mods: [ { stat:'stability'|'growth'|'expense'|'taxEff'|'inflation', value, turns } ],
  milBase,        // شاخص‌های اولیه (برای AI)
  ref: { tax, welfare, inflation, growth, military, investment, stability },  // مقادیر روز اول (کالیبراسیون ثبات)
  history: [ { turn, gdp, treasury, stability } ],   // حداکثر ۲۴۰
  decrees: { key: turnLastUsed }, printedRecent,
}
c.tech = { land, air, navy, missile, airDefense, cyber, drone }   // سطح فناوری = شاخص اولیه (مرحله‌ی ۶ بالا می‌برد)
c.forces = { type: count }                 // همه‌ی کشورها (برای بازیکن = جمع دسته‌ها)
c.factories = { type: count }              // همه‌ی کشورها
c.ranges = { type: km }                    // فقط جاهایی که تخصص برد دارد
c.mil = {                                  // فقط بازیکن (useUnits)
  useUnits: true, costFactor, upkeepFactor, fuelBase, chief: 'سپهبد ...',
  stacks: [ { id:'S12', type, count, loc:{kind:'city',city,country}|{kind:'border',target,sea}, pos:[lon,lat], move:null|{from,to,total,left,dest}, supply } ],
  lines: { type: bool }, progress: { type: کسر تولید انباشته }, construction: [ { type, left, total } ],
  baseIndex, baseStrength,
}
```
```js
War = { id:'W3', start /*برای استحکامات؛ سناریو ۱۴ ماه قبل*/, startTurn, justified, scenario, land,
  sides:{ A:[مهاجم], B:[مدافع و متحدان] }, leaders:{A,B}, front:{A,B} /*کسر خاک*/, base0:{A,B},
  plan:{A,B} /*'ground'|'combined'*/, salvo:{A,B}, icbm:{A,B}, commit:{id}, morale:{id} /*AI*/,
  adStart:{A,B}, adAlarm:{A,B}, capFallen:{A,B}, base:{id}, lost:{id}, monthLost:{id}, groundBase:{id},
  log:[Report ×۲۴], lastOffer, score /*دید A*/, paid? }
Report = { id:'R12', turn, date, war, frontBefore, frontAfter, advance?:{side,pct}, liberated?:{side,pct},
  air:{ A|B: { active, fired:{type:n}, lost:{type:n}, interceptM, interceptA, adKilled, groundDmg, enemyAd, enemyAdAfter } },
  ground?:{ A|B:{ owners, units:{type:[n,lost]}, att, def, cas }, r1, r2, winner, terrainA, terrainB, fort, luck } }
```
فیلدهای جدید کشور: `c.area`, `c.front` (از داده)، `c.wdmg` (آسیب کسری لشکر/تیپ AI در جنگ)، `c.warWeariness` (۰..۱۰۰، بعد از جنگ ماهی ۲ کم)، `c.eco.occ = {gdp, energy, gdpGain, energyGain}` (هر نوبت از نو)، `c.annexedBy`, `c.annexedTurn`, `c.puppetOf`, `c.integ = [{from, gdp, energy, level}]`.
فیلدهای جدید دسته: `morale` (پیش‌فرض ۷۵)، `exp`، `dmg` (آسیب کسری لشکر/تیپ)، `inBattle`. بازیکن: `c.mil.orders = [{id, seller, type, count, cost, left, total}]`, `c.mil.deals = {seller: turn}`.
**مهاجرت ۴←۵ (قدیمی، جایگزین با نسخه‌ی ۶):** شهرها از داده‌ی تازه (سهم، شهرهای جدید)، فیلدهای خالی، `SG.War.initScenario` (جنگ روسیه-اوکراین). ارتش و اقتصاد حفظ می‌شود (با ذخیره‌ی واقعی مرحله‌ی ۳ تست شد).

**نسخه‌ی ۷ (مرحله‌ی ۵):** `state.trade = {ISO:[شرکا]}` (متقارن)، `state.proposals = [{id:'P3', type:'pact'|'trade'|'arms'|'ally'|'ultimatum', from, to, data, turn}]`, `state.propSeq`, `state.diploCd = {'act:a>b': turn}` (cooldown)، `state.aiWarNext` (زودترین نوبت جنگ بعدی AI)، `state.playerThreat`. کشور: `c.ai = {personality, next, warPlan?:{target, at}}`, `c.aggression` (حافظه‌ی تجاوز، ماهی ۰.۵ کم)، `c.aiProg` (پیشرفت کسری تولید AI)، `c.armsOrders`/`c.armsDeals` (خرید سلاح AI). جنگ: `war.aiStarted`. **مهاجرت ۶←۷:** `seedTrade`، فیلدهای خالی، `AI.init` با `seed ^ 0x9e3779b9`.

**ذخیره:** `localStorage['sg2026_autosave_v2']` (نام کلید عوض نشده؛ نسخه داخل state است). تنظیمات: `localStorage['sg2026_settings'] = { muted: {category:true} }`. حجم ذخیره ≈ ۵۰۰KB.
**مهاجرت:** `SG.Engine.migrate(state, SG_DATA.countries)` — نسخه‌ی < ۴: مختصات/شهرها از داده، شاخص نظامی از داده، `delete c.mil`، `Military.init` + `startPlayer` (ارتش از نو؛ اقتصاد و روابط حفظ). هر تغییر ساختار state باید `version` را بالا ببرد و مهاجرت بنویسد.
**فایل خروجی:** `{ game:'geopolitics2026', exported, state }`.

---

## ۸. سیستم‌های ساخته‌شده (با فرمول)

### ۸.۱ ساخت دنیا — `SG.Engine.createWorld({countries, scenario, seed})`
1. کپی هر کشور؛ GDP × U(0.96,1.04)، ثبات ± ۴ (تنوع شروع).
2. روابط برای همه‌ی جفت‌ها: جمع `blocBonus` بلوک‌های مشترک + ۴۰ پیمان دفاعی − ۲۰ × تعداد تحریم بین دو کشور؛ اگر رابطه‌ی خاص در سناریو هست **جایگزین** می‌شود؛ سپس ± ۶ تصادف؛ جنگ = ۱۰۰−؛ محدود به [−۱۰۰,۱۰۰].
3. `Economy.init` ← `Military.init` ← `rngState`.
4. `startGame(state, playerId)`: `Military.startPlayer` + اعلان welcome.
پرس‌وجوها در `SG.Engine`: `getRelation, alliancesOf, defensePartners, warsOf, isAtWar, sanctionedBy, areAllied (پیمان نظامی یا دوجانبه), militaryPower (میانگین وزنی: land .25, air .2, navy .12, missile .12, airDefense .1, cyber .08, drone .13، +۵ هسته‌ای), rankOf`.

### ۸.۲ اقتصاد — `SG.Economy` (همه‌ی کشورها با قانون یکسان؛ ماهانه = سالانه/۱۲)
**بودجه (سالانه، B$):**
- کارایی مالیات `eff = clamp(0.65 + 0.35×ثبات/100 + mod.taxEff, 0.3, 1.1)`؛ `tax = GDP × taxRate × eff`
- فشار تحریم `pressure = clamp(Σ GDP تحریم‌کنندگان / GDP جهان, 0, 0.6)`
- انرژی: مازاد = تولید − مصرف − سوخت اضافه‌ی ارتش بازیکن؛ صادرات = مازاد × قیمت × 0.5 × (1 − 0.7×pressure)؛ واردات = کسری × قیمت × 0.25
- هزینه‌ها: ارتش (بازیکن: نگهداری واقعی؛ AI: GDP×policy.military) + تولید نظامی (بازیکن) + رفاه + سرمایه‌گذاری + اداره (GDP×(0.05+mod.expense)) + بهره + واردات انرژی
- نرخ بهره = 0.025 + 0.06×pressure + max(0, بدهی/GDP − 1)×0.03 + تورم/100×0.15
- درآمد = مالیات + صادرات انرژی + aid
**مقداردهی اولیه:** مالیات پیش‌فرض: پادشاهی 0.10، دموکراسی ثروتمند 0.36، دموکراسی 0.26، نیمه‌دموکراتیک 0.22، بقیه 0.20. رفاه طوری تنظیم می‌شود که بودجه‌ی اول ≈ متعادل باشد، منهای سختی×0.3٪ GDP (کشور سخت‌تر کمی کسری)، کف ۲٪؛ کشور AI که زیر کف می‌رود `aid` می‌گیرد. خزانه = ۸٪ GDP.
**هر ماه (`step`):**
1. خزانه += تراز ماهانه. اگر منفی: اگر `canBorrow` (بدهی/GDP < 1.4، یا < 2.6 برای سرانه > 30k، و pressure < 0.35) ← بدهی؛ وگرنه **چاپ پول**: baseInflation += کسری/GDP×100×2.5.
2. تورم: اگر چاپ نشده و تراز مثبت: baseInflation += (3 − base)×0.0025؛ اگر کسری و بدهی > GDP: +0.03. + mod.inflation/12. تورم += (base − تورم)×0.15 ± 0.3.
3. رشد سالانه = پتانسیل (سرانه <5k: 5٪، <15k: 3.5٪، <40k: 2.5٪، بقیه 1.7٪) + (سرمایه‌گذاری − 0.03)×0.5 + (ثبات − 55)/45×0.015 − pressure×0.05 − max(0, تورم − 15)×0.0005 − max(0, نظامی − 0.04)×0.25 − max(0, مالیات − 0.3)×0.05 + mod.growth ± 0.004. GDP ×= (1+رشد)^(1/12).
4. **ثبات هدف** = ref.stability + (رفاه − ref)×180 − (مالیات − ref)×120 − (تورم − ref)×0.5 + (رشد − ref)×150 + mod.stability؛ ثبات += (هدف − ثبات)×0.1 ± 0.7. (یعنی تا وقتی سیاست‌ها مثل روز اول است ثبات ثابت می‌ماند.)
5. AI: شاخص نظامی به سمت `milBase × √(policy/ref)` (۳٪ در ماه). بازیکن: از واحدها.
6. mods یک ماه کم می‌شوند؛ تورم بدهی را می‌خورد: بدهی ×= 1 − min(تورم,100)/1200×0.2.
**فروپاشی:** ثبات بازیکن ≤ ۵ سه ماه پشت سر هم ← `gameOver`.

### ۸.۳ سیاست‌ها و فرمان‌ها — `SG.Actions`
- `setPolicy(state, id, key, value)` با محدوده‌ی `LIMITS`: taxRate [0.05, 0.55]، military [0.003, 0.2]، welfare [0.01, 0.3]، investment [0, 0.12]. (برای بازیکن، military از واحدها محاسبه و در UI قفل است.)
- فرمان‌ها (`DECREES`، با `status` و `perform`؛ cooldown ماه):

| کلید | هزینه | اثر | cooldown |
|---|---|---|---|
| welfare_package | 0.6٪ GDP | ثبات +9 به مدت ۶ ماه | 8 |
| crackdown | 0.1٪ GDP | ثبات فوری +6، +8 سه ماه، سپس −12 (دموکراسی) یا −5 ده ماه | 6 |
| foreign_loan | 0 | خزانه +3٪ GDP، بدهی +3.3٪؛ فقط اگر canBorrow | 12 |
| print_money | 0 | خزانه +2٪ GDP، baseInflation +6، تورم +2 | 3 |
| austerity | 0 | expense −1.5٪ (۶ ماه)، ثبات −7، تورم پایه −12 سالانه، رشد −1٪ | 12 |
| infrastructure | 2٪ GDP | رشد +1.2٪ به مدت ۱۸ ماه | 12 |
| anti_corruption | 0.3٪ GDP | taxEff +0.06 (۱۸ ماه)، ثبات +3 (۶ ماه) | 18 |

### ۸.۴ نوبت — `SG.Turn.advance(state)` (خروجی: اعلان‌های جدید)
ترتیب: قیمت انرژی (بازگشت به 0.6 با ۸٪ + ±0.035، بازه 0.3..1.2) ← turn++ و تاریخ ← snapshot قبل ← `Economy.step` برای همه‌ی ۱۹۶ کشور ← GDP جهان ← `Military.step` بازیکن ← تاریخچه ← `playerChecks` ← `militaryNotifications` ← `worldNews` ← بررسی فروپاشی ← ذخیره‌ی rngState.
اعلان‌های بازیکن بر اساس **عبور از آستانه**: ثبات زیر ۴۵ (اعتراض، warning)، زیر ۲۵ (شورش، critical)، زیر ۱۰ (خطر کودتا، critical)، بالای ۵۵ (بهبود)؛ افت سریع > 2.5 در ماه؛ تورم بالای ۲۰/۴۰/۸۰؛ بدهی بالای ۱۰۰٪/۱۵۰٪؛ خزانه کمتر از ۴ ماه؛ گزارش فصلی؛ نوسان انرژی > ۴.۵٪؛ سال نو. اخبار جهان: ثبات کشورهای > ۵ میلیون نفر زیر ۲۵ (cooldown ۱۸ ماه برای هر کشور)، تورم > ۵۰، جابه‌جایی رتبه در ۱۵ اقتصاد اول، جنگ‌های جاری (احتمال ۷٪ هر ماه).

### ۸.۵ اعلان‌ها — `SG.Notify` (موتور) و `SG.NotifyUI` (نمایش)
- `Notify.add(state, {type, level, category, speaker, data, focus, groupKey})`: هم‌نوع در همان نوبت (و همان groupKey) ادغام می‌شود (`count++`، `data.items`).
- `Notify.cooldownOk(state, key, turns)`.
- UI: warning ← toast (بالای صفحه؛ موبایل پایین؛ ۶ ثانیه؛ کشیدن افقی = بستن؛ حداکثر ۳)؛ critical ← پنجره‌ی قرمز که پخش خودکار را متوقف می‌کند (صف)؛ info ← فقط صندوق. زنگ با تعداد خوانده‌نشده؛ صندوق با فیلتر دسته؛ دکمه‌ها فقط برای اعلان‌های همین نوبت یا نوبت قبل؛ کلیک روی اعلان دارای `focus` ← زوم روی کشور. دسته‌ی خاموش toast نمی‌دهد (critical همیشه).
- گوینده‌ی commander با نام رئیس ستاد (`data.commander`).

### ۸.۶ نظامی — `SG.Military`
**همه‌ی کشورها (`init`):** `tech = شاخص‌ها`؛ `forces` = initialForces یا تبدیل شاخص به تعداد (`(1+branchRef)^(index/100) − 1` تقسیم بر power طبق unitMix)؛ `factories[type]` = round(شاخص شاخه/30 × size) + تخصص.factories، که size = clamp(log10(GDP)/3.5, 0.3, 1.3)؛ بمب‌افکن و زیردریایی یکی کمتر؛ صفر اگر فناوری < requires یا کشوری با نیروی دستی که آن سلاح را ندارد؛ `ranges` از تخصص.
**بازیکن (`startPlayer`):**
- `costFactor = clamp(سرانه/40k, 0.35, 1.3)` (ساخت در کشور کم‌درآمد ارزان‌تر)
- دسته‌های اولیه: ناو/زیردریایی ← شهر `port`؛ هواپیما و پهپاد ← `air`؛ موشک ← `missile`؛ بقیه پایتخت؛ پیاده نیمی پایتخت و بقیه بین شهرها.
- همه‌ی خطوط تولید روشن؛ اگر هزینه > ۷۰٪ بودجه‌ی نظامی، گران‌ترین خطوط غیرتخصصی خاموش می‌شوند.
- `upkeepFactor = clamp(max(بودجه − تولید, 0.25×بودجه) / نگهداری خام, 0.05, 6)` تا بودجه‌ی روز اول حفظ شود.
**فرمول‌ها:**
- توان فناوری `capability = 0.4 + 0.8 × clamp(tech_branch/100, 0, 1)`
- تولید ماهانه = کارخانه × output × capability × تخصص.output × (0.7 اگر advanced و pressure ≥ 0.3)
- قیمت هر عدد = cost × costFactor × (1.5 اگر تحریم advanced)؛ کارخانه‌ی جدید: factory.cost × costFactor (× 1.5)
- هزینه‌ی ماهانه‌ی تولید = Σ خطوط روشن (تولید × قیمت) — خط بودجه‌ی «تولید نظامی»
- نگهداری ماهانه = Σ تعداد × upkeep × upkeepFactor
- سوخت = Σ تعداد × fuel × (۲ در حرکت، ۱.۳ در مرز)؛ سوخت اضافه نسبت به شروع به مصرف انرژی اضافه می‌شود
- شاخص بازیکن = شاخص اولیه + 15 × log2((1+قدرت فعلی)/(1+قدرت اولیه))، محدود به [0, 120]
**دستورها:** `setLine`، `buildFactory` (پول نقد، چند ماه)، `destinations(stack)` (شهرهای خودی؛ ناو فقط بندرها؛ زمینی و هوایی: مرز زمینی؛ ناو و هوایی: مرز دریایی؛ موشک و سایبری فقط شهرها)، `send(stackId, count, dest)` (جدا کردن تعداد و حرکت؛ زمان = ceil(فاصله‌ی هاورسین / سرعت)، حداقل ۱)، `demobilize`.
**هر ماه (`step`):** تولید (کسر در progress انباشته؛ تحویل در شهر صنعتی/بندر) ← کارخانه‌های در حال ساخت ← حرکت (درون‌یابی خطی موقعیت؛ رسیدن = ادغام با دسته‌ی هم‌نوع در همان محل) ← تدارکات (هدف: شهر ۱۰۰، مرز زمینی ۹۲، مرز دریایی ۸۰، در حرکت ۸۵؛ −۱۰ کمبود انرژی زیر تحریم؛ −۱۵ خزانه‌ی خالی؛ ۳۰٪ در ماه به سمت هدف) ← sync و شاخص‌ها ← `policy.military` = (نگهداری+تولید)×12/GDP.
**رسیدن به مرز:** رابطه با همسایه −۴ + اعلان نگرانی (cooldown ۴).
**هنوز:** حمله و نبرد وجود ندارد (مرحله‌ی ۴). کشورهای AI فقط `forces` و `factories` دارند و تولید/حرکت نمی‌کنند (مرحله‌ی ۵).

### ۸.۷ مشاور ارشد — `SG.Advisor.analyze(state, id)` + زبانه‌ی «راهبرد کلی»
- بزرگ‌ترین تهدید: کشوری با رابطه ≤ −۲۵ یا در جنگ؛ امتیاز = قدرت × خصومت × ۱.۵ اگر همسایه × ۱.۲ اگر هسته‌ای.
- کمبودها/برتری‌ها در برابر تهدید (اختلاف ≥ ۱۰ در هر شاخه)، دو شاخه‌ی برتر، انرژی، تحریم‌کنندگان قابل مذاکره (رابطه > −۵۰)، متحدان، ۳ کاندید اتحاد (رابطه ≥ ۲۰؛ +۳۰ اگر دشمن مشترک)، ۳ همسایه‌ی ضعیف‌تر و غیردوست (خطرناک اگر متحد یا متحدِ متحدشان از ما قوی‌تر باشد).
- انتخاب راهبرد با امتیاز: hegemon (حفظ برتری)، economy، deterrence (بازدارندگی نامتقارن)، coalition، expansion. نمونه: ایران ← بازدارندگی؛ آمریکا ← حفظ برتری؛ ترکیه ← گسترش؛ آلمان ← اقتصاد.
- در صفحه‌ی انتخاب کشور هم برای هر کشور قابل‌بازی در دسترس است.

### ۸.۸ مشاور اقتصادی — `SG.EconAdvisor.analyze` + زبانه‌ی «💼 مشاور اقتصادی»
- `stabilityFactors`: سهم رفاه، مالیات، تورم، رشد و اثرهای موقت در ثبات هدف (همان فرمول ۸.۲).
- علت تورم: `printing` (چاپ در ۶ ماه اخیر)، `deficit_no_credit`، `structural` (تورم پایه > ۱۰)، `converging_down`، `austerity_working`.
- مشکل‌ها با شدت ۱..۳: inflation، unrest، deficit، debt، growth، sanctions، energy؛ وضع کلی ok/warning/crisis.
- گزینه‌ها با **شبیه‌سازی واقعی** (`simulate` روی همان state و برگرداندن درجا): welfareUp/Down (±۲٪)، taxDown/Up (±۳٪)، investUp (+۲٪)، lineOff (گران‌ترین خط تولید). اثر: تراز ماهانه، ثبات هدف، رشد.
- دکمه‌ی «اعمال» (سیاست) و «اجرا» (فرمان). دسترسی: زبانه‌ی مشاور، دکمه در پنل دولت، دکمه در اعلان‌های تورم/اعتراض/کسری/چاپ پول.

---

### ۸.۹ خرید سلاح — `SG.Arms`
- فروشنده: هر کشوری که `factories[type] > 0` و موجودی دارد. `offer(state, buyer, seller, type)` ← `{price, capacity, months, rel, allied, special, reason}`.
- **قیمت** = cost × ضریب هزینه‌ی فروشنده `clamp(سرانه/40, 0.35, 1.3)` × سود `clamp(1.45 − رابطه/200 − 0.1×هم‌پیمان, 1.1, 1.6)` (+0.25 برای سلاح advanced اگر فشار تحریم خریدار ≥ ۰.۳).
- **ظرفیت هر قرارداد** = min(موجودی، ۸٪ موجودی + ۳ ماه تولید فروشنده). **تحویل** = 1 + ceil(فاصله‌ی پایتخت‌ها/4000) ماه (+۱ برای ناو، زیردریایی، زرهی).
- **دلیل‌های رد** (به ترتیب): self, gone, no_factory, war, sanction (هر طرف دیگری را تحریم کرده)، seller_war (فروشنده خودش در جنگ است)، enemy_ally (فروشنده با دشمنِ در حال جنگ ما هم‌پیمان است)، relation (< ۱۰)، relation_adv (advanced و رابطه < ۳۵ و هم‌پیمان نیستیم)، tech (فناوری شاخه‌ی خریدار < requires − ۳۰)، cooldown (هر فروشنده هر ۳ ماه)، no_stock.
- `buy`: پول نقد از خزانه ← خزانه‌ی فروشنده؛ از `forces` فروشنده کم و شاخصش با `War.adjustAiIndex` پایین می‌آید؛ رابطه +۳؛ سفارش در `c.mil.orders`. `step` (هر نوبت، بعد از Military.step): تحویل در `homeCityFor` (بندر/پایگاه هوایی/موشکی)؛ اگر جنگ یا تحریم پیش آمده ← لغو و ۵۰٪ پول برمی‌گردد.
- UI: زبانه‌ی «🛒 خرید سلاح» در پنل ارتش (انتخاب نوع، فروشنده‌ها مرتب به قیمت، دلیل ردها، جعبه‌ی خرید با اسلایدر)، `seller:<ISO3>` از پنل کشور، دکمه‌ی «از کشورهای دیگر بخرید» روی کارخانه‌ی قفل‌شده، سفارش‌های در راه در زبانه‌ی نیروها.
- نمونه: ایران از چین جنگنده (~۴۷ میلیون دلار هر فروند، ۱۵۳ فروند، ۳ ماه)؛ روسیه تا وقتی با اوکراین در جنگ است نمی‌فروشد.

### ۸.۱۰ جنگ و فتح — `SG.War` (نسخه‌ی ۲: «جبهه‌ی درصدی»؛ همه‌ی کشورها با یک قانون)
> نسخه‌ی اول (نبرد شهر به شهر، `state.control`، `c.wstacks`) به درخواست کاربر کنار گذاشته شد؛ این بخش نسخه‌ی فعلی است.

**ایده:** نقشه استان ندارد؛ پیشروی = درصد خاک. `war.front.B` = کسری از خاک رهبر B که دست طرف A است (و `front.A` برعکس). `war.base0` = خاکی که از قبل (صلح قبلی یا داده‌ی سناریو، مثل ۱۸٪ اوکراین) دست فاتح بوده؛ «اشغال این جنگ» = `occupied(war, s) = front[s] − base0[s]`.
**داده (build-data):** `c.area` (کیلومتر مربع) و `c.front[همسایه] = { r: [شعاع در ۱۰٪..۱۰۰٪ به درجه از borderPos], cap: درصدی که پایتخت سقوط می‌کند }` — با نمونه‌برداری ~۱۵۰۰ نقطه داخل کشور (`geoContains`). ساخت داده حدود ۱۱ دقیقه طول می‌کشد. `scenario.warFronts = {'RUS>UKR': 18}`.
**نقشه:** `radiusFor(state, id, from, pct)` شعاع را از جدول درون‌یابی می‌کند؛ `map.setOccupation([{country, center: borderPos, r, color, war}])` یک `d3.geoCircle` را با clipPath شکل کشور می‌بُرد (رنگ فاتح؛ اشغال جنگی + هاشور). شهرهای داخل دایره (`citiesInside`) پرچم رنگ فاتح می‌گیرند. `occupationAreas(state)` = جنگ‌ها + `state.territory`.
**اعلان جنگ:** `ultimatum(att, def, rng)` ← اگر نسبت قدرت (`predict.ratio`) ≥ ۱.۸ و متحدان احتمالی < ۵۰٪ قدرت مهاجم و خزانه دارد: با احتمال `0.5 + 0.2×(ratio−1.8)` (تا ۰.۹۵) پیشنهاد `treasury × clamp(0.3 + 0.15×(ratio−1.8), 0.3, 0.8)`. `acceptTribute`: پول منتقل، رابطه −۳۰ (بقیه −۳)، آتش‌بس ۲۴ ماه. رد ← `declare` (همان پیامدهای قبلی: بهانه‌ی موجه، اخراج از پیمان، متحدان مدافع، تحریم، ثبات). `land` = همسایه‌ی زمینی با borderPos.
**نیروهای درگیر (`engaged(state, war, id, kind)`):** بازیکن: دسته‌های واقعی — زمینی در مرز هر عضو طرف مقابل (وزن ۱) + دسته‌های زمینی شهرهای تا ۶۰۰ کیلومتری جبهه با وزن ۰.۵؛ هوایی/موشکی اگر فاصله‌ی دسته تا نقطه‌ی هدف (نقطه‌ی مرزی در خاک دشمن، یا پایتخت دشمن اگر مرز زمینی نیست) ≤ برد؛ پدافند و جنگنده‌ی رهگیر = همه. هوش مصنوعی (بدون دسته): سهمی از `c.forces` — رهبر مدافع `commit` ۰.۵ ← +۰.۱ در ماه تا ۰.۸۵؛ رهبر مهاجم ۰.۵ ← ۰.۸ (سناریو ۰.۳۵)؛ متحد ۰.۳ (۰.۱۵ اگر همسایه‌ی دشمن) و از ماه دوم. نیروی هوایی رهبر مهاجم × (commit + ۰.۱۵). تلفات AI مستقیم از `c.forces` (لشکر/تیپ با `c.wdmg` کسری) و `adjustAiIndex`.
**جنگ هوایی (`airCampaign`، فقط نقشه‌ی `combined`):** شلیک: موشک و پهپاد `salvo` (۵/۱۰/۲۰٪، AI ۱۰٪، سناریو ۵٪)، جنگنده و بمب‌افکن `SORTIE = 40%`، قاره‌پیما فقط با اجازه (۵٪). رهگیری با `units.airdefense.intercept` (۵ جنگنده، ۳ بمب‌افکن، ۸۰ پهپاد، ۴۰ موشک، ۱ قاره‌پیما برای هر آتشبار در ماه): تقاضا = Σ تعداد/ظرفیت؛ ظرفیت پدافند بین موشک‌ها و هواپیما/پهپاد به نسبت تقاضا تقسیم؛ جنگنده‌های مدافع ۰.۲ ظرفیت فقط برای هواپیما/پهپاد؛ سایبری `0.2 × سایبری ما/(ما+او)` پدافند را کم می‌کند؛ سقف رهگیری ۹۰٪. موشک/پهپاد/قاره‌پیمای شلیک‌شده مصرف می‌شود؛ هواپیمای رهگیری‌شده سرنگون. ضربه‌ی ردشده `units[t].strike`: اول `ad` (آتشبار نابودشده: موشک ۰.۰۵، پهپاد ۰.۰۱، جنگنده ۰.۰۲، بمب‌افکن ۰.۱، قاره‌پیما ۲)؛ بقیه به نسبت `ground` (موشک ۰.۰۸، پهپاد ۰.۰۳، جنگنده ۰.۰۸، بمب‌افکن ۰.۶، قاره‌پیما ۱۰ «واحد قدرت») روی نیروی زمینی جبهه، وزن پیاده ×۱.۵، حداکثر ۴۰٪ هر سهم در ماه.
**جبهه‌ی زمینی (`groundFront`):** قدرت = Σ n × power × role(att/def) × quality × (0.4+0.6 روحیه) × (0.4+0.6 تدارکات). `aAtt` (× ۱.۳ پشتیبانی هوایی نزدیک اگر نقشه ترکیبی و پدافند دشمن ≤ ۱۰٪ اول جنگ) در برابر `bDef × زمین B × استحکامات (1 + min(0.4, 0.03×ماه))` (اگر خاک خودی را پس می‌گیرد، زمین کشور خودش بدون استحکامات)؛ و برعکس. شانس U(0.9,1.1). برنده = طرفی که نسبتش ≥ ۱ و بیشتر است؛ هر دو < ۱ = بن‌بست (هر دو ۲٪ تلفات). جابه‌جایی: `min(rate, 0.002 + 0.03×(r−1)×(CAS?2:1))` با rate = ۰.۰۴ (زمینی) یا ۰.۰۸ (CAS)، × `clamp((200000/مساحت)^0.35, 0.3, 2.5)`؛ اول خاک خودی آزاد می‌شود. تلفات: بازنده `0.05+0.05k`، برنده `0.025−0.01k` (k = clamp((r−1)/2,0,1)). روحیه دسته‌ها و `war.morale` AI.
**پایتخت:** `capitalAt = max(0.2, front.cap)`؛ سقوط ← ثبات −۱۰، روحیه‌ی AI −۳۰، commit −۰.۲، اعلان. **تسلیم (`surrendered`):** پایتخت افتاده، یا ≥ ۶۰٪ خاک، یا ≥ ۲۵٪ خاک و نیروی زمینی < ۱۲٪ اول جنگ (`collapsed`). ۱۰۰٪ خاک ← فتح خودکار (اگر کشور بازیکن باشد: `gameOver: 'conquered'`).
**آلارم پدافند:** `war.adStart` و `adAlarm` ← رویداد در ۵۰٪ و ۱۰۰٪ (برای هر دو طرف؛ فقط جنگ‌های بازیکن اعلان می‌شود).
**صلح:** `peaceTerms` ← annex (رهبر، مرز زمینی، دشمن تسلیم)، cede (≥ ۲٪ خاک و امتیاز ≥ ۲۰)، pay (امتیاز ≥ ۱۵؛ مبلغ `خزانه‌ی دشمن × clamp(0.3 + امتیاز/150, 0.3, 0.9)`)، white (≥ ۱۰- یا دشمن خسته). `cede`: سهم `p` از باقی‌مانده‌ی کشور (GDP، جمعیت، تولید و مصرف انرژی) منتقل؛ فاتح ۵۰٪ GDP/انرژی فوراً + `integ`؛ `state.territory` ثبت (رنگ دائمی). `annex`: **همه‌ی خزانه، همه‌ی تجهیزات (دسته در پایتخت سابق برای بازیکن) و کارخانه‌ها و همه‌ی مردم**؛ ۶۰٪ GDP و ۸۵٪×۶۰٪ انرژی فوراً، بقیه ماهی ۲٪ اگر ثبات ≥ ۳۰؛ شهرها، همسایه‌ها، borderPos و جدول front همسایه‌ها منتقل؛ ناآرامی `min(15, 35×نسبت جمعیت)`؛ رابطه −۶/−۱۵. پیشنهاد خودکار: تسلیم (`surrender_offer`، هر ۲ ماه)، امتیاز ≥ ۴۵ (هر ۳ ماه)، دشمن خسته در بن‌بست، ما ≤ ۴۵- ← `peace_demand` (cede یا pay). دو AI: تسلیم و ≥ ۸۵ ← annex؛ ≥ ۵۵ یا تسلیم یا (≥ ۳۵ و خستگی ≥ ۶۵) ← cede/pay؛ هر دو خستگی > ۷۵ ← cede/white.
**AI:** نقشه = ترکیبی اگر قدرت ضربه به پدافند در برد ≥ ۰.۵، وگرنه زمینی؛ جنگ سناریو همیشه زمینی (جنگ فرسایشی).
**اقتصاد اشغال:** `refreshOccupation` ← صاحب: سهم اشغالی از مالیات و انرژی (انرژی = max(درصد، سهم انرژی شهرهای داخل منطقه))؛ فاتح ۳۰٪. خستگی جنگ و mod ثبات مثل قبل. تدارکات دسته‌های جبهه = ۹۲ − ۳۰×عمق پیشروی (`depthInto`).
**تست‌ها (headless):** ایران ← عراق: ترکیبی ~۶٪ در ماه، پدافند عراق ماه اول نابود، تسلیم ماه ۴ (پایتخت در ۲۰٪)؛ فقط زمینی ~۳٪ در ماه، صلح ماه ۶ با واگذاری ۱۸٪. ترکیه ← یونان: ۲۸ عضو ناتو، پدافند ترکیه ۵ ماهه نابود و ترکیه اشغال می‌شود (بازی تمام). ایران ← عربستان: فقط هوایی، فرسایشی. روسیه-اوکراین: ۱.۵ تا ۲ سال، واگذاری ۳۶ تا ۵۰٪ کل خاک.

### ۸.۱۱ تولید ثابت و انبار اولیه (بازسازی)
- `units.js`: موشک بالستیک و کروز ← `missile` (🚀) و `icbm` (☄️، noExport، requires 85، فقط کشورهای هسته‌ای). تولید ثابت هر کارخانه: پیاده ۰.۲ لشکر، زرهی ۰.۱۵ تیپ، توپ ۱۰، جنگنده ۷ (ساخت ۴ ماه)، بمب‌افکن ۲ (۷ ماه)، پهپاد ۵۰، ناو ۰.۱، زیردریایی ۰.۰۷، موشک ۳۰ (۲ ماه)، قاره‌پیما ۱ (۱۲ ماه)، پدافند ۰.۵، سایبری ۰.۲۵. `factory.upkeep` نگهداری ماهانه (× costFactor) در `productionCostMonthly` (حتی خط خاموش).
- `productionRate = factories × output` (بدون فناوری، تخصص یا تحریم؛ تحریم فقط قیمت).
- `specialties[ISO3][type] = { stock, factories, range }`: `stock` انبار اولیه را ضرب می‌کند (هم داده‌ی دستی هم تخمینی)؛ `initialForces` حالا «پایه» است.
- تعداد کارخانه (`generateFactories`): عمومی `floor(شاخص/45 × size)`؛ جنگنده/بمب‌افکن `floor((شاخص−40)/25 × size)` (بمب‌افکن −۱)؛ ناو/زیردریایی `floor((شاخص−15)/40 × size)` (زیردریایی −۱)؛ قاره‌پیما فقط هسته‌ای `floor((شاخص−70)/20 × size)` + تخصص. نتیجه: ۹ کشور کارخانه‌ی جنگنده، ۳ کشور قاره‌پیما. رشد ۵ ساله با همه‌ی خطوط روشن: ایران ۵۵←۶۱، آمریکا ۱۰۱←۱۱۳، آلمان ۵۵←۷۳.
- **مهاجرت نسخه‌ی ۶:** ballistic+cruise ← missile در forces، دسته‌ها (ادغام هم‌مکان)، کارخانه‌ها، خطوط، سفارش‌ها؛ کارخانه‌های AI از نو؛ شهرها/area/front از داده؛ `control`, `reparations`, `wstacks` حذف؛ جنگ‌های سناریو از نو؛ **جنگ بازیکن در ذخیره‌ی قدیمی تمام‌شده حساب می‌شود**.

### ۸.۱۲ دیپلماسی — `SG.Diplomacy` (مرحله‌ی ۵)
- **تجارت:** `tradeValue = 0.002 × √(gdpA × gdpB)` میلیارد در سال برای هر طرف؛ در بودجه ردیف `trade`. `seedTrade`: جفت‌های رابطه ≥ ۵۰ و GDP ≥ ۴۰. هر ۳ ماه تجارت رابطه را +۱ (تا ۷۵). جنگ/تحریم قطع می‌کند.
- **اقدام‌ها** (`status`/`perform`، هر کدام cooldown): improve (۰.۱٪ GDP، +رابطه)، trade، cancel، pact (رابطه ≥ ۴۰، حداکثر ۵)، break، sanction (قطع تجارت، رابطه −۲۵، دوستانِ ≥ ۷۰ هدف −۲)، lift، negotiate (۰.۳٪ GDP، لغو تحریم).
- **پذیرش** `acceptScore` ← `chanceOf = clamp((s−40)/20)`: تجارت ۳۸ + ۰.۶×رابطه ± شخصیت + نیاز به پول؛ پیمان ۰.۸×رابطه + دشمن مشترک ۲۰ + نسبت قدرت (+۱۰ / ۰ / −۱۵) − ۱۰ قدرت بزرگ با رابطه < ۶۰ − ۱۵؛ مذاکره ۲۸ + ۰.۷×رابطه. همه منهای `aggression` درخواست‌کننده.
- **تهدید:** `threatOf = aggression + max(0, نسبت قدرت به همسایه‌ها − ۱.۲) × ۱۵`؛ `timeFactor = 1 + floor(turn/12) × 0.15`. aggression: باج +۸، اعلان جنگ +۱۰/+۲۰ (بی‌بهانه)، واگذاری +۱۰، الحاق +۲۵.
- **پیشنهادها** `propose`/`respond`: pact، trade، arms (AI از بازیکن می‌خرد)، ally (رد ← پیمان می‌شکند، −۲۵)، ultimatum (قبول ← `acceptTribute`، رد ← `declare`). پیشنهاد بی‌جواب بعد از ۱ نوبت منقضی (اولتیماتوم/کمک = رد).

### ۸.۱۳ هوش مصنوعی — `SG.AI` (مرحله‌ی ۵)
- **شخصیت** (هر بازی تصادفی، وزن بر اساس نوع حکومت): aggressive / cautious / opportunist / mercantile.
- **هر نوبت:** کشورهای مهم (۱۵ قدرت اول + همسایه‌های بازیکن + طرف‌های جنگ) کامل؛ بقیه هر ۳–۵ نوبت. ایندکس‌های هر نوبت (`buildIndex`) و کش دست‌نشانده‌ها ← ~۳۵ms در نوبت.
- **اقتصاد:** مالیات/رفاه/بسته‌ی حمایتی/ریاضت با همان فرمان‌های بازیکن؛ هدف بودجه‌ی نظامی ×۱.۸ در جنگ، ×۱.۳۵ تهدیدشده.
- **تولید:** همان `productionRate` (سهم خطوط ۱ / ۰.۷ / ۰.۳۵، سقف ۳۰٪ بودجه‌ی نظامی). **خرید سلاح** وقتی تهدید است (اگر ارزان‌ترین فروشنده بازیکن باشد ← پیشنهاد arms).
- **دیپلماسی:** لغو/شکستن/تحریم (رابطه ≤ −۷۰)/تجارت/پیمان؛ به بازیکن پیشنهاد می‌دهد.
- **جنگ:** فقط همسایه با `effRel ≤ −25` (تهدید بازیکن × ۰.۴ × timeFactor از رابطه کم می‌شود)، بدون تجارت/پیمان، ارتش ≥ ۱.۶ برابر و `predict.ratio ≥ 1.6`، امتیاز ≥ ۳۵، احتمال ۰.۱۲ × timeFactor؛ ثبات ≥ ۳۰، خستگی ≤ ۲۵؛ از نوبت ۱۲، حداکثر ۲ جنگ AI، فاصله ۸ ماه. نقشه ۳ ماه قبل (اعلان intel)، بعد اولتیماتوم (به بازیکن: ۳۰–۷۰٪ خزانه) یا باج/جنگ بین AI ها.
- `helpAllies` فقط به مدافع (B) کمک می‌کند. `coalition`: تهدید بازیکن ≥ ۵۰ ← همسایه‌های نگران رابطه −۱ و اعلان ائتلاف.
- **تست‌ها:** جهان ۸ ساله بدون جنگ بی‌منطق (فقط اسرائیل-فلسطین/لبنان)؛ بازیکنی که همه‌چیز را قبول می‌کند ← ۴–۵ پیمان، ۷ شریک تجاری، تحریم‌ها ۱۸←۸؛ عراق خصمانه و ۱۲ برابر قوی‌تر ← intel ماه ۱۶، اولتیماتوم ماه ۱۹، جنگ و پیشروی ~۲٪ در ماه.

## ۹. رابط کاربری

- **صفحه‌ی انتخاب:** کارت‌های ۹ کشور (سختی ستاره‌ای، کارت رهبر، اقتصاد، رتبه‌ی نظامی، ثبات، نقاط قوت/ضعف خودکار)، «اول نقشه را ببینم»، «راهنما»، «بارگذاری فایل ذخیره»، کارت «ادامه‌ی بازی ذخیره‌شده».
- **نقشه (`map.js`):** پروجکشن Natural Earth در فضای ثابت ۱۰۰۰×۵۲۰؛ زوم d3 (تا ۶۰×)؛ مرزها با `vector-effect: non-scaling-stroke`؛ برچسب کشورها با اندازه‌ی ثابت روی صفحه (نمایش اگر مساحت روی صفحه > ۱۸۰۰px²)؛ رنگ‌آمیزی گراف برای حالت سیاسی؛ حالت‌ها: سیاسی، اتحادها، روابط، ثبات (+ legend)؛ `zoomTo(id)` با در نظر گرفتن پنل باز (`getOcclusion`)؛ `zoomToPoint`.
  - **شهرها:** پایتخت ★ از زوم ۱.۶×، شهرهای خودی از ۲×، بقیه از ۴×؛ نام از ۲.۵× (پایتخت) / ۴×.
  - **نیروها:** هر محل یک گروه؛ برای هر نوع یک «چیپ» (آیکون + عدد کوتاه مثل ۶K)، شبکه‌ی ۴ ستونی؛ زیر زوم ۲.۲× جمع می‌شود به «🎖️ تعداد نوع» (کلیک = زوم)؛ خط‌چین متحرک مسیر حرکت + «N ماه».
- **پنل اطلاعات کشور:** کارت رهبر، نشان‌ها (کشور شما، قابل‌بازی، هسته‌ای، در جنگ)، رابطه با بازیکن، ویژگی‌ها، اقتصاد (GDP، سرانه، جمعیت، انرژی، رشد، تورم، بدهی، خزانه‌ی خودی)، ثبات، قدرت نظامی (۷ شاخه + فهرست نیروها)، دیپلماسی (پیمان‌ها، پیمان دوجانبه، جنگ، تحریم‌کنندگان)، همسایه‌ها (کلیک = رفتن). دسکتاپ: پنل راست ۳۶۰px؛ موبایل: برگه‌ی پایین ۶۲vh با کشیدن برای بستن.
- **نوار بالا:** کشور من (آواتار)، تاریخ، 🔔 صندوق، ⚙️ تنظیمات (خاموش کردن دسته‌ها، بازی جدید، دانلود فایل ذخیره)، ❓ راهنما.
- **نوار منابع:** 💰 خزانه و تراز ماهانه، ⚖️ ثبات (فلش روند)، 🛢️ تراز انرژی، 🔥 تورم، 📈 GDP و رشد — کلیک = پنل دولت.
- **نوار فرمان پایین:** 🏛️ دولت، ⚔️ ارتش، 🧑‍💼 مشاور، ▶/⏸ پخش خودکار (سرعت‌های ۱×/۲×/۴× = ۲۶۰۰/۱۳۰۰/۶۰۰ میلی‌ثانیه)، ⏭ نوبت بعد (کلید Space). پخش خودکار وقتی پنجره باز است یا اعلان بحرانی هست صبر می‌کند.
- **پنل دولت:** ۴ KPI (تراز ماهانه، خزانه و ماه‌های باقی، ثبات و «به سمت X»، رشد)، جزئیات بودجه‌ی ماهانه (درآمد/هزینه به تفکیک)، دکمه‌ی مشاور اقتصادی، اسلایدرها (مالیات، رفاه، سرمایه‌گذاری؛ نظامی برای بازیکن فقط نمایشی) با پیش‌بینی زنده، ۷ فرمان.
- **پنل ارتش:** زبانه‌ی «نیروها» (KPI ها، جمع کل، فهرست دسته‌ها به تفکیک محل) و «کارخانه‌ها» (برای هر نوع: تعداد کارخانه، تولید هر کارخانه و کل در ماه، قیمت، برد، روشن/خاموش، ساخت کارخانه‌ی جدید، در حال ساخت، نشان «تخصص» و «تحریم»، قفل فناوری). **پنجره‌ی فرستادن:** اطلاعات نوع، تدارکات، اسلایدر تعداد + ربع/نصف/همه، فهرست مرزها (با برچسب رابطه) و شهرهای خودی با زمان رسیدن، مرخص کردن.
- **مرحله‌ی ۴ (UI):** دکمه‌ی 🔥 «جنگ» در نوار پایین (نبض قرمز و تعداد جنگ‌ها) ← `WarPanel`: هر جنگ (طرفین، امتیاز، خستگی، تلفات، شهرهای گرفته/از دست رفته، نبردهای جاری با محاصره «۲ از ۳»، نبردهای اخیر، پیشنهاد صلح با «می‌پذیرد/دلیل»)؛ در صلح: راهنما + همسایه‌ها با «اعلان جنگ». گزارش نبرد: دو ستون، تلفات، ضریب‌ها، «عامل‌های مهم». پنجره‌ی اعلان جنگ با تحلیل مشاور. پنل کشور: «⚔️ اعلان جنگ…/🔥 پنل جنگ»، «🛒 خرید سلاح از …»، کارت «خاک و شهرها» (اشغال، دست‌نشانده). پنجره‌ی دسته: «⚔️ حمله به شهر» (مدافعان و عدد ×)، «اعلان جنگ به …» در مرز، «عقب‌نشینی»، «⏸ نگه دار» برای پشتیبانی. نقشه: نشان دشمن قرمز (بالای نقطه؛ خودی پایین؛ کلیک = اطلاعات)، ⚔️ چشمک‌زن، ⚑ رنگ فاتح، خط‌چین کمانی 💥 شلیک‌ها، هاشور کشور اشغال‌شده (`setHatch`)، رنگ و مرز جدید بعد از الحاق (`setOwner`)، شهرهای جبهه زودتر نمایش داده می‌شوند.
- **مرحله‌ی ۵ (UI):** دکمه‌ی 🌐 «دیپلماسی» در نوار پایین (علامت ! وقتی پیشنهاد هست) ← `DiplomacyPanel`: شاخص تهدید، پیشنهادهای منتظر (قبول/رد)، متحدان و فرصت پیمان، شرکای تجاری و فرصت‌ها، تحریم‌ها (مذاکره/لغو). پنل کشور: کارت «🕊️ دیپلماسی» (شخصیت، تجارت، پیمان، دکمه‌های اقدام با شانس). اعلان‌های پیشنهاد با `prop:accept`/`prop:decline`. پنل جنگ برای بازیکنِ مدافع هم کار می‌کند.
- **راهنما:** هدف، چیزهای ارزشمند (نفت سه مشکل را حل می‌کند و ...)، هر نوبت چه کنم، راه قوی شدن، دیپلماسی، روند جنگ، فتح و غنیمت، رمز موفقیت، کنترل‌ها. سیستم‌های ساخته‌نشده برچسب «از مرحله‌ی X» دارند — با ساختن هر مرحله برچسب را بردار.

---

## ۱۰. تاریخچه‌ی کار

1. **مرحله‌ی ۱:** نقشه، داده‌ی ۱۹۶ کشور، پنل اطلاعات، انتخاب کشور، حالت‌های نقشه.
2. **درخواست کاربر:** زیپ برای public_html؛ پرسید کشورها چطور قوی می‌شوند، فتح منابع بدهد، جنگ منطق زمانی و نمایش داشته باشد (نه فتح در دو دقیقه)، وزیر مشاور، راهنمای داخل بازی. ← مشاور ارشد، راهنما، `DESIGN.md`، زیپ.
3. **کاربر:** «فعلاً فقط نقشه است، کاری نمی‌شود کرد» ← **مرحله‌ی ۲** با تصمیم‌های واقعی (بودجه، فرمان‌ها، اعلان‌ها، ذخیره‌ی خودکار). متعادل‌سازی با شبیه‌سازی ۱۰ ساله‌ی همه‌ی کشورهای قابل‌بازی و ۵ راهبرد مختلف برای ایران.
4. **کاربر:** کل مراحل؟ سافاری/دسکتاپ ذخیره را نگه می‌دارد؟ ← توضیح + دانلود/بارگذاری فایل ذخیره. **مرحله‌ی ۳** (نسخه‌ی اول: ارتش با فرمانده، تولید صف‌دار).
5. **بازخورد کاربر روی ارتش (مهم):**
   - ساختن ارتش و جابه‌جا کردن بخش‌ها گیج‌کننده است؛ هر نوع (مثلاً ۲۸ زرهی) روی نقشه باشد، بزنی روی آن و بگویی چندتا به کدام مرز برود.
   - تولید به‌صورت کارخانه‌ی هر نوع با تولید ماهانه‌ی مشخص (کارخانه‌ی دوم = تولید دو برابر).
   - جز پیاده و زرهی، بقیه تعداد واقعی باشند (۱۰ جنگنده به یک کشور، ۱۰ تا به دیگری).
   - هر کشور در چیزی قوی باشد (ایران موشک، شاید ۲۰۰ در ماه؛ ولی جنگنده نسازد؛ آمریکا جنگنده). درخت پیشرفت: برد موشک ۲۰۰۰ ← ۲۵۰۰ ← ۳۰۰۰.
   - شهرها روی نقشه (برای استقرار نیرو و کارخانه).
   - رهبر هر کشور با نام و عکس مثل پروفایل.
   ← بازطراحی کامل نظامی (نسخه‌ی فعلی).
6. **کاربر:** مشاور اقتصادی (تورم بالا رفت چه کنیم، نارضایتی چه کنیم) ← `econAdvisor.js`.
8. **کاربر (بازخورد مرحله‌ی ۴):** جنگ درصدی (استان نداریم؛ منطقه‌ی گرفته‌شده رنگ دیگر)، تخصص = انبار بیشتر در شروع، تولید ثابت هر کارخانه (تفاوت در تعداد کارخانه)، تولید کم تا کشورها سریع آماده‌ی جنگ نشوند، فقط دو نوع موشک (موشک و قاره‌پیما)، عددهای کارخانه‌ی موشک/جنگنده/بمب‌افکن، قانون رهگیری پدافند (۵ جنگنده، ۸۰ پهپاد، ۴۰ موشک، ۱ قاره‌پیما)، دو راه جنگ (فقط زمینی کند؛ اول پدافند بعد بمباران + زمینی سریع — به‌صورت پیشنهاد ارتش)، آلارم ۵۰٪/۱۰۰٪ پدافند، اعلان جنگ از روی کشور با اولتیماتوم (هدف پول پیشنهاد می‌کند)، فتح = همه‌ی پول، تجهیزات و مردم. ← بازسازی کامل war.js (نسخه‌ی ۲)، units.js، جدول جبهه در build، نسخه‌ی ۶ state. دکمه‌ی 🔥 جنگ فقط وقتی در جنگیم در نوار پایین است.
7. **کاربر:** «قبل از مرحله‌ی بعد قابلیت خرید اسلحه از کشورهای دیگر را بر اساس منطق کلی بازی بگذار، بعد مرحله‌ی ۴» ← `arms.js` + **مرحله‌ی ۴** (`war.js`, `warPanel.js`، شهرهای مجازی و سهم شهرها در build، نسخه‌ی ۵ state). کاربر کد را به‌صورت زیپ داد (همان محتوای شاخه‌ی fervent-faraday-scleha بود) و روی شاخه‌ی `claude/tender-darwin-45q8ru` ادامه داده شد.
9. **کاربر:** «برو مرحله‌ی پنجم» ← `diplomacy.js`، `ai.js`، `diplomacyPanel.js`، کارت دیپلماسی در پنل کشور، درآمد تجارت در بودجه، نسخه‌ی ۷ state.

---

## ۱۱. ترجیحات کاربر (برای تصمیم‌های آینده)

- **سادگی تعامل:** کنترل مستقیم روی نقشه را به منوهای تودرتو ترجیح می‌دهد. از مفهوم‌های مدیریتی اضافه (مثل فرمانده برای هر واحد) پرهیز کن.
- **عدد و جزئیات واقعی** می‌خواهد (تعداد واقعی سلاح، تولید ماهانه‌ی مشخص، برد به کیلومتر).
- **تفاوت کشورها** برایش مهم است (هر کشور نقطه‌ی قوت خودش).
- **منطق و زمان واقعی در جنگ:** فتح سریع و بی‌منطق نمی‌خواهد؛ نمایش بصری (آیکون/شماتیک) می‌خواهد.
- **مشاوره‌ی کاربردی:** توصیه‌ها باید برای همان کشور و همان وضعیت باشد و عدد داشته باشد.
- بعد از هر کار: **زیپ جدید** بساز (`sh game/tools/make-zip.sh`) و بگو «در public_html اکسترکت و جایگزین کنید».
- کاربر از گوشی (سافاری) و دسکتاپ بازی می‌کند.

---

## ۱۲. محدودیت‌ها و مشکلات شناخته‌شده

- **عکس رهبران** نیست (فقط حروف اول)؛ اطلاعات رهبران ممکن است کهنه باشد.
- **کشورهای AI** خارج از جنگ تصمیم نمی‌گیرند: سیاست اقتصادی ثابت، بدون تولید، بدون دیپلماسی و بدون اعلان جنگ (مرحله‌ی ۵). در جنگ فقط بسیج/دفاع/حمله/صلح ساده دارند و تلفاتشان جبران نمی‌شود.
- **متحدان بازیکن** وارد جنگ نمی‌شوند (فقط متحدان مدافع)؛ AI سلاح نمی‌خرد و به بازیکن سلاح «پیشنهاد» نمی‌دهد (مرحله‌ی ۵).
- **خاک فقط با مرز زمینی جابه‌جا می‌شود:** عبور از خاک کشور ثالث و پیاده‌کردن نیرو از دریا نیست (ایران و عربستان فقط جنگ هوایی). هر جنگ یک جبهه دارد (بین دو رهبر)؛ متحدان فقط به قدرت جبهه اضافه می‌شوند.
- منطقه‌ی اشغالی روی نقشه دایره‌ی بریده‌شده با مرز کشور است (تقریب؛ استان واقعی نیست). کشور فاتح بعد از الحاق برای همسایه‌های جدیدش جدول جبهه‌ی خودش را ندارد (از جدول همسایه استفاده می‌شود؛ حمله از سمت کشور الحاق‌شده از نقطه‌ی مرزی قدیمی است).
- گزارش‌های ماهانه با پایان جنگ حذف می‌شوند.
- قاره‌پیما فعلاً فقط در جنگ هوایی (با اجازه) اثر دارد؛ بازدارندگی و واکنش جهانی به آن مرحله‌ی ۵.
- **رشد شاخص‌ها:** بازیکن با تولید مداوم شاخص‌هایش بالا می‌رود ولی AI ثابت است — بعد از مرحله‌ی ۵ (تولید AI) متوازن می‌شود. سقف نمایش ۱۲۰.
- **نیروهای در حال حرکت** را نمی‌شود وسط راه برگرداند.
- راه دریایی برای نیروی زمینی پشتیبانی نمی‌شود (فقط ناو و هوایی به مرز دریایی).
- `cities` فقط برای ۴۳ کشور؛ بقیه فقط «پایتخت» بی‌نام.
- اگر بازی با سیستم قدیمی ذخیره شده باشد، ارتش در مهاجرت از نو ساخته می‌شود.
- کشورهای ریز (index خیلی کم) ممکن است نیروی صفر داشته باشند.
- `localStorage` در حالت Private سافاری کار نمی‌کند و سافاری بعد از ۷ روز بازدید نکردن پاکش می‌کند (مگر Add to Home Screen).

---

## ۱۳. نقشه‌ی راه

### مرحله‌ی ۴ — نبرد و فتح ✅ (ساخته شد — جزئیات دقیق در ۸.۱۰)
فاصله از طرح پایین: متحدان مدافع به‌جای جنگ جداگانه در «طرف B» همان جنگ‌اند (`war.sides`)؛ شرط سقوط پایتخت ۳ نوبت؛ ضریب روحیه/تدارکات نرم‌تر (۰.۴ + ۰.۶×x)؛ قدرت هر واحد با `power × role` (نه attack×power که دو بار حساب می‌شد)؛ «استحکامات» و «دسترسی ۱۲۰۰ کیلومتر» و «AI می‌بیند نیرو به سمت شهرش می‌آید» اضافه شد؛ پایتخت با «واگذاری» داده نمی‌شود. متن طرح اولیه برای سابقه می‌ماند:

**هدف:** بازیکن از نیروهای مستقر در مرز به کشور همسایه حمله کند؛ جنگ چند ماه و شهر به شهر پیش برود؛ نتیجه منطقی، قابل فهم و بصری باشد؛ فتح، منابع بدهد.

**۱. اعلان جنگ**
- دکمه‌ی «⚔️ حمله» در پنجره‌ی نیروی مستقر در مرز و در پنل کشور همسایه (فقط وقتی نیرو در مرز هست).
- پنجره‌ی تأیید با **پیش‌بینی واکنش‌ها** (از داده): متحدان نظامی هدف (ناتو، پیمان‌های دوجانبه، ...) احتمالاً وارد جنگ می‌شوند؛ رابطه با همه افت می‌کند؛ اگر «بهانه‌ی موجه» نیست تحریم و افت شدیدتر.
- بهانه‌ی موجه (casus belli) ساده: رابطه ≤ −۶۰، یا هدف قبلاً به ما یا متحدمان حمله کرده، یا ادعای مرزی (بعداً). بدون بهانه: رابطه −۳۰ با همه، احتمال تحریم از کشورهای با رابطه‌ی بد، ثبات −۵.
- `state.wars.push([attacker, defender])` با آبجکت جنگ: `state.warsInfo[key] = { start, attacker, defender, score, weariness:{A,B}, occupied:[cityIds], battles:[] }` (اضافه به state؛ version ← ۵ با مهاجرت).
- اعلان critical («جنگ آغاز شد») و اعلان‌های foreign/intel؛ متحدان هدف در همین مرحله با قانون ساده وارد شوند (امتیاز: رابطه با هدف، پیمان، قدرت خودشان در برابر مهاجم) — نسخه‌ی کامل در مرحله‌ی ۵.

**۲. نیروهای مدافع (AI)**
- هنگام شروع جنگ برای کشور مدافع از `forces` دسته می‌ساز (همان قالب stack) و بین شهرهایش تقسیم کن (پایتخت سهم بیشتر، شهرهای نزدیک مرز مهاجم بیشتر). یعنی `c.mil` سبک برای کشورهای درگیر جنگ. (کشورهای AI بدون جنگ همچنان فقط forces.)
- مدافع ساده: نیرو را به شهر بعدی در مسیر مهاجم می‌فرستد؛ تولید AI در مرحله‌ی ۵.

**۳. جبهه و هدف‌ها**
- هر کشور شهرهای مشخص دارد (`cities`). اولین هدف: نزدیک‌ترین شهر هدف به نقطه‌ی مرزی (`borderPos`). بعد شهر بعدی نزدیک‌ترین به شهرهای تصرف‌شده. کشورهای بدون CITIES فقط پایتخت دارند ← در صورت نیاز در build برایشان ۱–۲ شهر مجازی (مرکز سرزمین) بساز.
- بازیکن برای هر دسته‌ی مستقر در مرز یا شهر تصرف‌شده هدف انتخاب می‌کند: «حمله به [شهر]» (حرکت مثل send، با سرعت واقعی). هوایی/پهپاد/موشک «پشتیبانی» هستند: در شعاع برد خود (فاصله از شهر محل استقرار تا هدف ≤ `rangeOf`) به نبرد اضافه می‌شوند.

**۴. محاسبه‌ی نبرد (هر نوبت برای هر شهر درگیر)**
```
قدرت مؤثر طرف = Σ_نوع (تعداد × حمله یا دفاع × power-scale) × کیفیت × روحیه × تدارکات × ضریب زمین × ضریب هوایی × شانس
  کیفیت = 0.6 + 0.6 × tech_branch/100
  روحیه و تدارکات = مقدار/100
  ضریب زمین (فقط مدافع): دشت 1.0، بیابان 1.1، جنگل 1.2، کوهستان 1.4، شهر 1.5 (شهرها همیشه حداقل 1.3) — از c.terrain
  ضریب هوایی: برتری هوایی (قدرت جنگنده‌ی خودی در برد / (جنگنده + پدافند دشمن)) > 1.5 ← 1.25؛ < 0.67 ← 0.75؛ وگرنه 1.0
  شانس: U(0.9, 1.1)
  weakVs: ضریب ضعف یک نوع در برابر حضور نوع دیگر در طرف مقابل (مثلاً زرهی ×0.7 اگر پهپاد دشمن قابل توجه است)
  سایبری: پدافند دشمن را تا 20٪ کم می‌کند
  موشک/پهپاد: یک‌بار مصرف — هر نوبت حمله، تعدادی مصرف می‌شود (کم می‌شود) و پدافند دشمن درصدی را رهگیری می‌کند
```
- نتیجه: نسبت قدرت r = مهاجم/مدافع. بازنده ۱۰–۲۰٪ تلفات (به نسبت r) و افت روحیه ۱۰–۲۵؛ برنده ۳–۸٪ تلفات. **نابودی کامل نیست.**
- شهر وقتی سقوط می‌کند که مدافع در شهر نماند یا قدرتش زیر آستانه برود (مثلاً r > 1.8 دو نوبت پشت سر هم) ← دسته‌های مدافع باقی‌مانده به شهر بعدی عقب می‌نشینند.
- هر نبرد برای یک شهر معمولاً ۱–۳ نوبت؛ کل کشور چند ماه تا بیش از یک سال (به تعداد شهرها، زمین، متحدان).
- تجربه: برنده +۵ تجربه (stack.experience) ← کیفیت ×(1 + تجربه/200).

**۵. تدارکات در جنگ**
- تدارکات هر دسته بر اساس فاصله تا نزدیک‌ترین شهر خودی یا تصرف‌شده‌ی متصل: < 300km ← 95، هر 300km −10؛ قطع شدن (شهر پشت سر از دست برود) ← هدف 30.
- سوخت: مصرف ×2 در نبرد؛ کمبود انرژی زیر تحریم ← −15.
- اعلان «مهمات فقط برای N نوبت داریم» وقتی تدارکات زیر 40.

**۶. خستگی جنگ و پایان**
- خستگی هر طرف ماهانه +1 تا +3 (به تلفات و طول جنگ) ← ثبات بازیکن −(خستگی/10) از طریق mod؛ تورم +.
- امتیاز جنگ (war score) = ٪ شهرهای تصرف‌شده (پایتخت ×3) + نسبت تلفات + خستگی.
- سقوط پایتخت یا امتیاز > 60 ← مدافع پیشنهاد صلح می‌دهد (اعلان critical با دکمه‌ها). بازیکن هم می‌تواند «پیشنهاد صلح» بدهد (AI با امتیاز می‌پذیرد).
- گزینه‌های صلح: **الحاق** (همه یا شهرهای تصرف‌شده)، **دولت دست‌نشانده** (منابع کمتر، ناآرامی کمتر)، **غرامت** (پول ماهانه برای ۲۴ ماه)، **صلح سفید**.

**۷. فتح و انتقال منابع** (طبق `DESIGN.md` بخش ۲)
- هر شهر سهمی از GDP/جمعیت/انرژی دارد: داده‌ی جدید `city.share` در `CITIES` (اختیاری: پایتخت ۳۰–۴۰٪، بقیه تقسیم مساوی؛ برچسب `oil` برای شهرهای نفت‌خیز مثل بصره که سهم انرژی بیشتری دارند).
- شهر تصرف‌شده وسط جنگ: ۳۰٪ سهم GDP و انرژی آن شهر به فاتح (درآمد ماهانه) و از مدافع کم می‌شود.
- الحاق: GDP، جمعیت و تولید انرژی منتقل می‌شود با «ضریب ادغام» ۵۰٪ که ماهانه ~۲٪ تا ۱۰۰٪ بالا می‌رود؛ تأسیسات انرژی ۲۰–۵۰٪ آسیب و بازسازی چندماهه؛ ۱۰٪ تجهیزات غنیمت؛ ناآرامی منطقه‌ی اشغالی (ثبات جداگانه برای منطقه یا mod منفی برای فاتح) و نیاز به نیروی کنترل.
- **نقشه:** مالکیت نواحی با `state.ownership = { regionId: owner }` (بازنویسی `properties.o`)؛ اشغال جزئی با پرچم/رنگ روی شهرها و هاشور روی کشور (SVG pattern). الحاق کامل ← رنگ فاتح؛ کشور مغلوب از فهرست کشورهای فعال خارج (`c.annexedBy`).
- هر فتح ← «شاخص تهدید» بازیکن برای بقیه بالا (پایه‌ی مرحله‌ی ۵).

**۸. نمایش**
- ⚔️ چشمک‌زن روی شهر درگیر؛ 💥 حمله‌ی موشکی (خط کمانی از محل پرتاب تا هدف)؛ 🔥 شهر آسیب‌دیده؛ پرچم/رنگ فاتح روی شهر تصرف‌شده؛ هاشور.
- **گزارش نبرد** (پنجره): دو ستون، آیکون هر نوع و تلفات، همه‌ی ضریب‌ها (زمین، هوایی، تدارکات، روحیه، شانس) تا بازیکن بفهمد چرا برد یا باخت.
- **پنل جنگ:** فهرست جنگ‌ها، امتیاز جنگ، خستگی، شهرهای تصرف‌شده، دکمه‌ی صلح.
- اعلان‌ها (فرمانده با نام رئیس ستاد): «نیروها به [شهر] رسیدند و نبرد آغاز شد»، «[شهر] سقوط کرد!»، «عقب‌نشینی از [شهر]»، «مهمات فقط برای ۲ نوبت»، «[کشور] به‌خاطر حمله‌ی ما سفیرش را فراخواند»، «[کشور] وارد جنگ شد». متن‌ها در `messages.js` با چند متن.
- مشاور ارشد: قبل از حمله، تحلیل شانس پیروزی (نسبت قدرت، متحدان هدف، زمین).

**۹. AI کشورها در جنگ با یکدیگر:** جنگ روسیه-اوکراین موجود را با همین سیستم (ساده) جلو ببر تا خبرها واقعی باشند.

**تست مرحله‌ی ۴:** شبیه‌سازی headless (Node + vm): ایران ← عراق (بدون متحد قوی)، ترکیه ← یونان (ناتو)، آمریکا ← یک کشور کوچک؛ طول جنگ، تلفات، و این‌که فتح سریع (۱–۲ نوبت) اتفاق نیفتد. سپس Playwright برای مسیر UI.

### مرحله‌ی ۵ — هوش مصنوعی و دیپلماسی ✅ (ساخته شد — جزئیات در ۸.۱۲ و ۸.۱۳)
**باقی‌مانده برای بعد:** اجازه‌ی عبور نیرو و جبهه‌ی دوم برای متحدان؛ پیشنهاد صلح بازیکن در جنگی که رهبرش نیست.

**طرح اولیه (برای مرجع):**
**کارهایی که مرحله‌ی ۴ برای ۵ گذاشت:** AI اعلان جنگ بدهد (با `SG.War.declare` — همان مسیر بازیکن)؛ متحدان مهاجم هم وارد شوند (`joinCandidates` را برای طرف A هم صدا بزن)؛ AI تولید کند و تلفات را جبران کند (`Military.productionRate` برای AI و افزودن به `forces`)؛ AI هم «اولتیماتوم» بدهد و بازیکن بتواند پول پیشنهاد کند (`ultimatum`/`acceptTribute` عمومی‌اند)؛ AI سلاح بخرد (`SG.Arms.buy` با خریدار AI — `buyer.mil.orders` فعلاً فقط برای بازیکن است؛ برای AI سفارش را در `c.armsOrders` نگه دار)؛ اجازه‌ی عبور نیرو و جبهه‌ی دوم برای متحدان همسایه (الان هر جنگ یک جبهه بین دو رهبر دارد)؛ پیشنهاد صلح بازیکن به AI در جنگی که رهبرش نیست؛ «شاخص تهدید» از فتح‌ها (`annex` الان فقط رابطه را کم می‌کند).

**دیپلماسی بازیکن** (پنل جدید یا بخش در پنل کشور): بهبود رابطه (هزینه‌ی پول)، قرارداد تجاری (+درآمد دو طرف، +رابطه)، پیشنهاد اتحاد (فقط رابطه ≥ ۶۰)، تحریم (هزینه‌ی تجارت، رابطه −)، لغو تحریم/مذاکره (برای ایران مهم)، درخواست عبور نیرو، پیشنهاد صلح، تهدید. هر اقدام cooldown و پیامد دارد.

**AI هر کشور** (`js/ai/` جدید یا `engine/ai.js`):
- ورودی: رابطه با طرفین، اتحادها، وابستگی تجاری، سطح تهدید، قدرت نظامی و اقتصادی خودش، ثبات، **شخصیت تصادفی در هر بازی**: تهاجمی / محتاط / فرصت‌طلب / تجاری.
- گزینه‌ها: حمله، کمک به متحد، اتحاد، تحریم، تقویت نظامی (تولید)، مذاکره، بی‌طرفی، و تنظیم سیاست اقتصادی (همان اسلایدرها و فرمان‌های بازیکن).
- روش: امتیاز هر گزینه، انتخاب بیشترین. نمونه‌ی مشخصات:
```js
scoreHelpB = relation(C,B) + (allied(C,B) ? 50 : 0) + threat(A→C) - warCost
scoreNeutral = stability + tradeDependency(C,A)
scoreSanctionA = -relation(C,A) + alliesPressure
```
- **منطق نسبت به بازیکن:** هر نوبت قدرت، اقتصاد، ضعف و مرز مشترک بازیکن سنجیده شود؛ «تهدید» بالا ← همسایه‌ها علیه بازیکن متحد شوند؛ بازیکن ضعیف ← «شکار».
- **AI سبک (کارایی موبایل):** کشورهای مهم (قدرت‌های بزرگ، همسایه‌های بازیکن، طرف‌های جنگ) هر نوبت ارزیابی کامل؛ بقیه هر ۳–۶ نوبت با ۲–۳ قانون ساده.
- **بدون تقلب:** AI همان فرمول‌های اقتصاد/تولید/نبرد را دارد. تولید AI ← نیروهای AI رشد می‌کنند (تعادل شاخص‌ها).
- **بدون سناریوی از پیش نوشته.**
- اعلان‌ها: «ترکیه پیشنهاد اتحاد داده» (قبول/رد)، «عربستان سفیرش را فراخواند»، «عراق در مرز نیرو جمع می‌کند» (intel)، «همسایه‌ها علیه ما متحد می‌شوند»، اخبار جهان («روسیه به اوکراین حمله کرد»).
- سختی با زمان بالا برود (حساسیت AI به تهدید بازیکن با گذشت سال‌ها).

### مرحله‌ی ۶ — رویدادها، درخت پیشرفت، ذخیره، پیشرفت بین بازی‌ها (بعدی)

**رویدادهای تصادفی (حداقل ۲۰، داده‌محور در `data/events.js`):** هر رویداد: شرط (مثلاً ثبات < ۴۰، واردکننده‌ی انرژی، در جنگ)، احتمال، اثر، گزینه‌ها (با دکمه)، زنجیره (رویداد بعدی). پیشنهاد: کودتا، شورش، قطع انرژی/خط لوله، بحران مالی جهانی، سقوط بورس، جهش قیمت نفت، تحریم جدید، زلزله، سیل، خشکسالی، همه‌گیری، رسوایی فساد، اعتصاب سراسری، ترور، حمله‌ی سایبری، کشف میدان نفتی، موج پناهجو، انتخابات زودهنگام، انقلاب رنگی، شورش قومی، کشف فناوری، کمک بین‌المللی، بحران ارزی. بحران‌ها با زمان زنجیره‌ای و شدیدتر.

**درخت پیشرفت (فناوری + سیاست):** پنل جدید؛ هر گره: هزینه، زمان، پیش‌نیاز؛ تحریم سرعت را کم می‌کند.
- اقتصاد: بهره‌وری مالیات، رشد، انرژی تجدیدپذیر (مصرف کمتر)، استخراج (تولید انرژی بیشتر).
- نظامی (طبق درخواست کاربر): **برد** هر نوع (مثلاً بالستیک ایران ۲۰۰۰ ← ۲۵۰۰ ← ۳۰۰۰ km؛ `c.ranges`)، **بهره‌وری کارخانه** (+۲۰٪ output برای یک نوع)، **باز کردن سلاح** (بالا بردن `c.tech[branch]` تا requires — مثلاً جنگنده برای ایران)، **کیفیت** (حمله/دفاع بیشتر).
- دکترین: دفاع عمیق، جنگ نامتقارن، برتری هوایی، ... (ضریب‌های نبرد).

**ذخیره/بارگذاری کامل:** چند اسلات ذخیره‌ی دستی + خودکار؛ نام‌گذاری؛ حذف. (دانلود/بارگذاری فایل از قبل هست.)

**اهداف و پیشرفت بین بازی‌ها (localStorage جدا):** اهداف مرحله‌ای («۱۰ سال زنده بمان و GDP را دو برابر کن»)، امتیاز پایان بازی × سختی کشور، دستاوردها، آزاد شدن سناریوهای جدید (مثلاً «بحران ۲۰۲۶ خاورمیانه» فقط به‌عنوان داده‌ی اولیه‌ی جدید؛ منطق همان).

**کارهای جانبی معوق:** عکس رهبران (اگر کاربر فایل بدهد)، صدا (اختیاری، فایل لوکال)، به‌روزرسانی نام رهبران در `leaders.js`.

---

## ۱۴. روش کار

### ساخت داده
```
cd game/tools && npm install && npm run build      # یا: node build-data.mjs
```
خروجی هشدارها را بخوان (کد ناشناخته، کشور بدون داده، ...). فایل‌های `data/world.js`, `countries.js`, `scenario_2026.js` را دستی ویرایش نکن.

### تست
1. **موتور (بدون مرورگر):** فایل‌های data و engine را با `vm.runInContext` در Node بارگذاری کن (`window = global context`)، `SG.Engine.createWorld` + `startGame` + چند صد بار `SG.Turn.advance` و خروجی را بررسی کن (تعادل اقتصاد، فروپاشی، رشد شاخص‌ها). هر تغییر فرمولی را این‌طور برای همه‌ی ۹ کشور قابل‌بازی امتحان کن.
2. **مرورگر:** Playwright با Chromium (`executablePath: '/opt/pw-browsers/chromium'` در محیط فعلی)؛ `file:///.../game/index.html`؛ هم دسکتاپ (۱۳۶۶×۸۶۰) و هم موبایل (۳۹۰×۷۸۰، `isMobile, hasTouch`)؛ `pageerror` و console error را جمع کن؛ اسکرین‌شات بگیر و نگاه کن. همچنین سرو با HTTP (`python3 -m http.server`) برای شبیه‌سازی هاست و اطمینان از نبود درخواست خارجی.
3. هر تغییر ساختار state ← `version++` + مهاجرت + تست بارگذاری ذخیره‌ی قدیمی.

### تحویل
```
sh game/tools/make-zip.sh        # ← dist/geopolitics2026.zip (index.html css data fonts js lib img)
git add -A game dist && git commit && git push -u origin claude/tender-darwin-45q8ru
```
- پیام کامیت انگلیسی و توصیفی. PR فقط اگر کاربر بخواهد.
- `README.md` (بخش «چه چیزی را تست کنی») و `js/ui/guide.js` (برداشتن برچسب «از مرحله‌ی X») را با هر مرحله به‌روز کن.
- به کاربر به فارسی و ساده بگو چه اضافه شد، چطور تست کند، و زیپ را بفرست.

</div>
