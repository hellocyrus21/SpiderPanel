// =====================================================================
// منبع دستی داده‌ی کشورها (فقط برای ساخت فایل data/countries.js)
// ---------------------------------------------------------------------
// این فایل در مرورگر اجرا نمی‌شود. اسکریپت build-data.mjs آن را می‌خواند
// و فایل نهایی data/countries.js را می‌سازد.
// اعداد تقریبی‌اند (حدود ۲۰۲۵/۲۰۲۶) و برای بازی کافی‌اند، نه برای آمار دقیق.
// =====================================================================

// ---------------------------------------------------------------------
// ۱) داده‌ی پایه‌ی همه‌ی کشورها
// [GDP به میلیارد دلار, جمعیت به میلیون, هزینه‌ی نظامی ٪ GDP, نوع حکومت, ثبات ۰-۱۰۰]
// نوع حکومت: D=دموکراسی، H=نیمه‌دموکراتیک، A=اقتدارگرا، M=پادشاهی، T=حکومت دینی
// ---------------------------------------------------------------------
export const BASE = {
  // --- آمریکای شمالی و مرکزی و کارائیب ---
  USA: [30000, 342, 3.2, 'D', 66], CAN: [2250, 41, 1.4, 'D', 80], MEX: [1850, 131, 0.7, 'D', 55],
  GTM: [115, 18.7, 0.4, 'H', 50], BLZ: [3.4, 0.42, 1.0, 'D', 60], SLV: [36, 6.4, 1.2, 'A', 62],
  HND: [37, 10.8, 1.6, 'H', 45], NIC: [19, 7.0, 0.6, 'A', 45], CRI: [95, 5.2, 0, 'D', 75],
  PAN: [88, 4.5, 0, 'D', 65], CUB: [48, 10.9, 2.9, 'A', 38], JAM: [20, 2.8, 1.2, 'D', 60],
  HTI: [25, 11.9, 0, 'H', 12], DOM: [128, 11.4, 0.7, 'D', 65], BHS: [15, 0.41, 0.8, 'D', 75],
  TTO: [29, 1.5, 0.9, 'D', 62], BRB: [6.7, 0.28, 0.7, 'D', 75], ATG: [2.2, 0.09, 0.5, 'D', 72],
  DMA: [0.7, 0.07, 0, 'D', 70], GRD: [1.4, 0.13, 0, 'D', 72], KNA: [1.1, 0.05, 0, 'D', 72],
  LCA: [2.6, 0.18, 0, 'D', 70], VCT: [1.1, 0.10, 0, 'D', 70],
  // --- آمریکای جنوبی ---
  BRA: [2300, 213, 1.1, 'D', 55], ARG: [650, 46, 0.5, 'D', 50], COL: [420, 53, 3.0, 'D', 45],
  CHL: [340, 19.8, 1.6, 'D', 65], PER: [290, 34.5, 1.1, 'D', 45], VEN: [100, 28.5, 0.8, 'A', 28],
  ECU: [125, 18.2, 2.0, 'D', 40], BOL: [50, 12.6, 1.3, 'H', 42], PRY: [45, 6.9, 1.0, 'D', 58],
  URY: [83, 3.4, 1.9, 'D', 78], GUY: [25, 0.83, 1.0, 'D', 60], SUR: [4.5, 0.63, 0.8, 'D', 55],
  // --- اروپا ---
  GBR: [3700, 69, 2.4, 'D', 72], FRA: [3200, 68.5, 2.1, 'D', 62], DEU: [4800, 83.5, 2.4, 'D', 72],
  ITA: [2400, 58.9, 1.6, 'D', 63], ESP: [1800, 49, 1.3, 'D', 65], PRT: [320, 10.6, 1.6, 'D', 75],
  NLD: [1250, 18, 2.0, 'D', 78], BEL: [680, 11.9, 1.3, 'D', 72], LUX: [95, 0.67, 1.0, 'D', 88],
  CHE: [1000, 9.0, 0.7, 'D', 92], AUT: [540, 9.2, 1.0, 'D', 82], IRL: [600, 5.4, 0.2, 'D', 82],
  DNK: [440, 6.0, 2.4, 'D', 88], NOR: [520, 5.6, 2.2, 'D', 90], SWE: [650, 10.6, 2.4, 'D', 82],
  FIN: [310, 5.6, 2.4, 'D', 86], ISL: [36, 0.39, 0, 'D', 90], POL: [980, 37.5, 4.5, 'D', 70],
  CZE: [380, 10.9, 2.0, 'D', 76], SVK: [150, 5.4, 2.0, 'D', 65], HUN: [240, 9.6, 2.1, 'H', 62],
  ROU: [400, 19, 2.3, 'D', 60], BGR: [120, 6.4, 2.2, 'D', 58], GRC: [270, 10.4, 3.1, 'D', 65],
  HRV: [100, 3.9, 1.8, 'D', 70], SVN: [75, 2.1, 1.3, 'D', 78], SRB: [95, 6.6, 2.5, 'H', 55],
  BIH: [30, 3.2, 0.8, 'H', 45], MNE: [8, 0.62, 1.7, 'D', 60], MKD: [16, 1.8, 2.0, 'D', 58],
  ALB: [27, 2.7, 2.0, 'D', 60], XKX: [11, 1.6, 1.0, 'D', 52], EST: [44, 1.37, 3.4, 'D', 80],
  LVA: [45, 1.86, 3.3, 'D', 75], LTU: [85, 2.88, 3.0, 'D', 76], BLR: [75, 9.1, 1.5, 'A', 55],
  UKR: [190, 33, 26, 'D', 40], MDA: [19, 2.4, 0.6, 'D', 48], CYP: [37, 1.4, 1.8, 'D', 72],
  MLT: [25, 0.55, 0.5, 'D', 78], AND: [4, 0.08, 0, 'D', 90], MCO: [9, 0.04, 0, 'M', 92],
  SMR: [2, 0.03, 0, 'D', 90], LIE: [7, 0.04, 0, 'M', 92], VAT: [0.3, 0.001, 0, 'T', 95],
  RUS: [2100, 144, 6.5, 'A', 55],
  // --- خاورمیانه و قفقاز و آسیای مرکزی ---
  TUR: [1350, 86, 1.9, 'H', 52], IRN: [380, 91, 2.5, 'T', 42], IRQ: [270, 46, 3.0, 'H', 38],
  SAU: [1100, 35, 6.5, 'M', 68], ARE: [550, 10.5, 4.5, 'M', 82], QAT: [220, 3.0, 4.0, 'M', 85],
  KWT: [160, 4.9, 4.8, 'M', 72], BHR: [47, 1.6, 3.5, 'M', 58], OMN: [108, 5.3, 5.5, 'M', 72],
  YEM: [20, 35, 3.0, 'A', 10], JOR: [55, 11.5, 4.5, 'M', 60], ISR: [550, 10, 8.0, 'D', 52],
  PSE: [17, 5.5, 0, 'H', 10], LBN: [25, 5.8, 3.0, 'H', 25], SYR: [25, 24, 3.0, 'A', 22],
  EGY: [380, 117, 1.2, 'A', 48], AZE: [75, 10.2, 5.0, 'A', 62], ARM: [26, 3.0, 5.5, 'D', 50],
  GEO: [35, 3.7, 1.6, 'H', 50], TKM: [85, 7.4, 2.5, 'A', 55], UZB: [115, 37, 2.8, 'A', 58],
  KAZ: [290, 20.5, 0.9, 'A', 60], KGZ: [16, 7.2, 1.5, 'A', 52], TJK: [14, 10.6, 1.0, 'A', 45],
  AFG: [17, 42, 2.0, 'T', 30],
  // --- آسیای جنوبی و شرقی و جنوب‌شرقی ---
  CHN: [19500, 1408, 1.7, 'A', 70], IND: [4200, 1460, 2.3, 'D', 60], PAK: [400, 252, 2.8, 'H', 35],
  BGD: [470, 175, 1.0, 'H', 40], NPL: [44, 30, 1.1, 'D', 48], BTN: [3.2, 0.79, 0, 'M', 80],
  LKA: [95, 22, 1.5, 'D', 50], MDV: [7, 0.52, 0, 'D', 60], JPN: [4200, 123.5, 1.6, 'D', 80],
  KOR: [1850, 51.6, 2.6, 'D', 70], PRK: [25, 26.5, 20, 'A', 55], TWN: [850, 23.3, 2.5, 'D', 75],
  MNG: [24, 3.5, 0.7, 'D', 60], VNM: [490, 101, 2.3, 'A', 70], THA: [550, 71.6, 1.2, 'H', 55],
  MYS: [470, 34, 1.0, 'D', 68], SGP: [560, 6.0, 2.8, 'H', 90], IDN: [1450, 284, 0.8, 'D', 62],
  PHL: [500, 116, 1.3, 'D', 52], MMR: [65, 54.5, 3.5, 'A', 15], KHM: [50, 17.6, 2.0, 'A', 55],
  LAO: [16, 7.8, 0.2, 'A', 55], BRN: [16, 0.46, 2.5, 'M', 82], TLS: [2.1, 1.4, 1.0, 'D', 55],
  // --- اقیانوسیه ---
  AUS: [1800, 27.5, 2.0, 'D', 82], NZL: [260, 5.3, 1.2, 'D', 85], PNG: [33, 10.5, 0.3, 'D', 35],
  FJI: [6, 0.93, 1.3, 'H', 58], SLB: [1.7, 0.82, 0, 'D', 50], VUT: [1.1, 0.33, 0, 'D', 60],
  WSM: [1, 0.22, 0, 'D', 65], TON: [0.6, 0.1, 0, 'M', 65], FSM: [0.5, 0.11, 0, 'D', 65],
  MHL: [0.3, 0.04, 0, 'D', 65], PLW: [0.3, 0.02, 0, 'D', 68], KIR: [0.3, 0.13, 0, 'D', 60],
  NRU: [0.2, 0.01, 0, 'D', 60],
  // --- آفریقا ---
  NGA: [250, 230, 0.6, 'H', 30], ZAF: [420, 64, 0.7, 'D', 48], ETH: [140, 132, 0.8, 'A', 28],
  KEN: [120, 57, 1.0, 'D', 48], TZA: [85, 70, 1.0, 'H', 58], UGA: [58, 51, 2.2, 'A', 48],
  DZA: [270, 47, 8.0, 'A', 55], MAR: [165, 38, 4.0, 'M', 62], TUN: [55, 12.3, 2.5, 'A', 48],
  LBY: [45, 7.4, 2.0, 'A', 25], SDN: [30, 51, 3.0, 'A', 8], SSD: [5, 11.9, 3.0, 'A', 12],
  SOM: [12, 19, 2.0, 'H', 15], DJI: [4.5, 1.2, 3.0, 'A', 55], ERI: [2.5, 3.6, 10, 'A', 40],
  AGO: [110, 39, 1.3, 'A', 45], COD: [75, 112, 1.0, 'H', 15], COG: [15, 6.3, 2.0, 'A', 45],
  CMR: [55, 30, 1.0, 'A', 38], GAB: [21, 2.5, 1.2, 'A', 45], GNQ: [12, 1.9, 1.0, 'A', 45],
  CAF: [3, 5.5, 1.5, 'A', 15], TCD: [20, 20.3, 3.0, 'A', 28], NER: [21, 27.9, 2.5, 'A', 25],
  MLI: [24, 24.5, 3.5, 'A', 22], BFA: [22, 24, 4.0, 'A', 20], SEN: [33, 19, 1.5, 'D', 62],
  GMB: [2.6, 2.8, 0.7, 'D', 55], GNB: [2.2, 2.2, 1.5, 'H', 35], GIN: [25, 14.8, 1.5, 'A', 38],
  SLE: [7.5, 8.8, 0.6, 'D', 48], LBR: [5, 5.6, 0.6, 'D', 45], CIV: [87, 32, 1.0, 'H', 55],
  GHA: [80, 35, 0.4, 'D', 60], TGO: [10, 9.5, 2.0, 'A', 50], BEN: [21, 14.5, 0.8, 'H', 52],
  MRT: [11, 5.2, 2.0, 'H', 50], CPV: [2.8, 0.53, 0.5, 'D', 72], STP: [0.7, 0.23, 0, 'D', 62],
  ZMB: [29, 21.5, 1.2, 'D', 55], ZWE: [36, 17, 0.8, 'A', 38], MWI: [11, 22, 0.8, 'D', 48],
  MOZ: [23, 35, 1.0, 'H', 30], MDG: [17, 32, 0.6, 'H', 40], BWA: [20, 2.5, 2.5, 'D', 72],
  NAM: [13, 3.1, 3.0, 'D', 68], LSO: [2.4, 2.3, 1.5, 'D', 50], SWZ: [5, 1.2, 1.5, 'M', 50],
  RWA: [14, 14.6, 1.5, 'A', 62], BDI: [3.5, 14.4, 2.0, 'A', 35], COM: [1.4, 0.88, 0, 'H', 50],
  MUS: [16, 1.26, 0.2, 'D', 75], SYC: [2.2, 0.13, 1.0, 'D', 75],
};

// ---------------------------------------------------------------------
// ۲) کشورهای قابل‌بازی + سختی هر کدام (۱=آسان ... ۵=خیلی سخت)
// سخت‌تر = امتیاز بیشتر در پایان بازی (بخش ۸ مشخصات).
// برای قابل‌بازی کردن کشور جدید فقط کافی است اینجا اضافه شود.
// ---------------------------------------------------------------------
export const PLAYABLE = { IRN: 5, TUR: 3, RUS: 4, USA: 2, DEU: 2, FRA: 2, GBR: 2, CHN: 3, IND: 3 };

// ---------------------------------------------------------------------
// ۳) داده‌ی دقیق‌تر (دستی) برای کشورهای قابل‌بازی و همسایه‌های مهمشان
// active: نیروی فعال (هزار نفر)
// mil: شاخص قدرت هر شاخه ۰ تا ۱۰۰ (زمینی، هوایی، دریایی، موشکی، پدافند، سایبری، پهپاد)
// energy: تولید و مصرف انرژی (میلیون تن معادل نفت در سال، تقریبی)
// terrain: زمین غالب (برای نبرد در مراحل بعد)
// ---------------------------------------------------------------------
export const DETAILED = {
  USA: { capital: 'واشنگتن', active: 1330, nuclear: true, terrain: 'plain',
    mil: { land: 92, air: 100, navy: 100, missile: 95, airDefense: 90, cyber: 98, drone: 95 }, energy: [2350, 2200] },
  RUS: { capital: 'مسکو', active: 1320, nuclear: true, terrain: 'plain',
    mil: { land: 88, air: 78, navy: 62, missile: 95, airDefense: 90, cyber: 85, drone: 75 }, energy: [1500, 800] },
  CHN: { capital: 'پکن', active: 2035, nuclear: true, terrain: 'mountain',
    mil: { land: 90, air: 85, navy: 88, missile: 92, airDefense: 85, cyber: 92, drone: 88 }, energy: [2950, 4100] },
  IND: { capital: 'دهلی نو', active: 1455, nuclear: true, terrain: 'plain',
    mil: { land: 82, air: 72, navy: 65, missile: 75, airDefense: 70, cyber: 62, drone: 55 }, energy: [620, 1000] },
  GBR: { capital: 'لندن', active: 140, nuclear: true, terrain: 'plain',
    mil: { land: 55, air: 70, navy: 72, missile: 60, airDefense: 55, cyber: 85, drone: 65 }, energy: [105, 170] },
  FRA: { capital: 'پاریس', active: 200, nuclear: true, terrain: 'plain',
    mil: { land: 62, air: 72, navy: 70, missile: 68, airDefense: 62, cyber: 78, drone: 62 }, energy: [130, 230] },
  DEU: { capital: 'برلین', active: 182, nuclear: false, terrain: 'plain',
    mil: { land: 58, air: 58, navy: 45, missile: 35, airDefense: 65, cyber: 72, drone: 55 }, energy: [90, 290] },
  TUR: { capital: 'آنکارا', active: 355, nuclear: false, terrain: 'mountain',
    mil: { land: 72, air: 62, navy: 58, missile: 52, airDefense: 48, cyber: 55, drone: 82 }, energy: [48, 165] },
  IRN: { capital: 'تهران', active: 610, nuclear: false, terrain: 'mountain',
    mil: { land: 62, air: 28, navy: 38, missile: 78, airDefense: 45, cyber: 60, drone: 80 }, energy: [380, 300] },
  // --- همسایه‌های مهم ---
  IRQ: { capital: 'بغداد', active: 195, nuclear: false, terrain: 'desert',
    mil: { land: 42, air: 22, navy: 8, missile: 18, airDefense: 20, cyber: 15, drone: 25 }, energy: [230, 60] },
  SAU: { capital: 'ریاض', active: 257, nuclear: false, terrain: 'desert',
    mil: { land: 50, air: 62, navy: 35, missile: 45, airDefense: 60, cyber: 40, drone: 40 }, energy: [650, 280] },
  ARE: { capital: 'ابوظبی', active: 65, nuclear: false, terrain: 'desert',
    mil: { land: 38, air: 55, navy: 30, missile: 30, airDefense: 58, cyber: 50, drone: 48 }, energy: [230, 120] },
  QAT: { capital: 'دوحه', active: 16, nuclear: false, terrain: 'desert',
    mil: { land: 15, air: 35, navy: 15, missile: 10, airDefense: 40, cyber: 30, drone: 20 }, energy: [230, 60] },
  KWT: { capital: 'کویت', active: 18, nuclear: false, terrain: 'desert',
    mil: { land: 18, air: 28, navy: 10, missile: 10, airDefense: 38, cyber: 20, drone: 12 }, energy: [150, 45] },
  OMN: { capital: 'مسقط', active: 43, nuclear: false, terrain: 'desert',
    mil: { land: 22, air: 25, navy: 20, missile: 8, airDefense: 25, cyber: 15, drone: 12 }, energy: [90, 35] },
  BHR: { capital: 'منامه', active: 18, nuclear: false, terrain: 'urban',
    mil: { land: 10, air: 18, navy: 10, missile: 5, airDefense: 25, cyber: 15, drone: 8 }, energy: [25, 20] },
  PAK: { capital: 'اسلام‌آباد', active: 655, nuclear: true, terrain: 'mountain',
    mil: { land: 70, air: 52, navy: 35, missile: 62, airDefense: 45, cyber: 40, drone: 45 }, energy: [70, 110] },
  AFG: { capital: 'کابل', active: 150, nuclear: false, terrain: 'mountain',
    mil: { land: 25, air: 3, navy: 0, missile: 2, airDefense: 3, cyber: 3, drone: 8 }, energy: [8, 10] },
  AZE: { capital: 'باکو', active: 65, nuclear: false, terrain: 'mountain',
    mil: { land: 35, air: 22, navy: 12, missile: 25, airDefense: 32, cyber: 25, drone: 55 }, energy: [60, 17] },
  ARM: { capital: 'ایروان', active: 45, nuclear: false, terrain: 'mountain',
    mil: { land: 25, air: 10, navy: 0, missile: 15, airDefense: 20, cyber: 15, drone: 15 }, energy: [4, 4] },
  TKM: { capital: 'عشق‌آباد', active: 36, nuclear: false, terrain: 'desert',
    mil: { land: 18, air: 10, navy: 5, missile: 5, airDefense: 12, cyber: 5, drone: 10 }, energy: [90, 40] },
  ISR: { capital: 'تل‌آویو', active: 170, nuclear: true, terrain: 'urban',
    mil: { land: 68, air: 82, navy: 40, missile: 70, airDefense: 92, cyber: 92, drone: 85 }, energy: [16, 25] },
  SYR: { capital: 'دمشق', active: 100, nuclear: false, terrain: 'mountain',
    mil: { land: 22, air: 5, navy: 2, missile: 5, airDefense: 5, cyber: 5, drone: 15 }, energy: [8, 12] },
  UKR: { capital: 'کی‌یف', active: 900, nuclear: false, terrain: 'plain',
    mil: { land: 70, air: 40, navy: 15, missile: 50, airDefense: 60, cyber: 70, drone: 92 }, energy: [55, 85] },
  POL: { capital: 'ورشو', active: 200, nuclear: false, terrain: 'plain',
    mil: { land: 62, air: 52, navy: 25, missile: 40, airDefense: 55, cyber: 50, drone: 45 }, energy: [60, 105] },
  GRC: { capital: 'آتن', active: 140, nuclear: false, terrain: 'mountain',
    mil: { land: 48, air: 52, navy: 45, missile: 30, airDefense: 45, cyber: 35, drone: 30 }, energy: [8, 22] },
  KAZ: { capital: 'آستانه', active: 70, nuclear: false, terrain: 'plain',
    mil: { land: 30, air: 20, navy: 5, missile: 10, airDefense: 25, cyber: 15, drone: 15 }, energy: [180, 90] },
  JPN: { capital: 'توکیو', active: 247, nuclear: false, terrain: 'mountain',
    mil: { land: 55, air: 70, navy: 78, missile: 45, airDefense: 75, cyber: 70, drone: 50 }, energy: [50, 400] },
  KOR: { capital: 'سئول', active: 500, nuclear: false, terrain: 'mountain',
    mil: { land: 70, air: 70, navy: 60, missile: 62, airDefense: 70, cyber: 75, drone: 55 }, energy: [50, 300] },
  PRK: { capital: 'پیونگ‌یانگ', active: 1280, nuclear: true, terrain: 'mountain',
    mil: { land: 60, air: 18, navy: 25, missile: 65, airDefense: 40, cyber: 70, drone: 25 }, energy: [25, 15] },
  TWN: { capital: 'تایپه', active: 170, nuclear: false, terrain: 'mountain',
    mil: { land: 45, air: 55, navy: 40, missile: 50, airDefense: 65, cyber: 70, drone: 45 }, energy: [10, 115] },
  EGY: { capital: 'قاهره', active: 440, nuclear: false, terrain: 'desert',
    mil: { land: 60, air: 55, navy: 45, missile: 25, airDefense: 50, cyber: 30, drone: 30 }, energy: [80, 95] },
  ITA: { capital: 'رم', active: 165, nuclear: false, terrain: 'mountain',
    mil: { land: 50, air: 60, navy: 62, missile: 35, airDefense: 55, cyber: 60, drone: 50 }, energy: [35, 150] },
  ESP: { capital: 'مادرید', active: 120, nuclear: false, terrain: 'plain',
    mil: { land: 45, air: 55, navy: 50, missile: 25, airDefense: 45, cyber: 55, drone: 40 }, energy: [35, 120] },
  BLR: { capital: 'مینسک', active: 48, nuclear: false, terrain: 'plain',
    mil: { land: 30, air: 18, navy: 0, missile: 30, airDefense: 35, cyber: 20, drone: 15 }, energy: [4, 25] },
  CAN: { capital: 'اتاوا', active: 68, nuclear: false, terrain: 'plain',
    mil: { land: 40, air: 50, navy: 40, missile: 15, airDefense: 35, cyber: 60, drone: 30 }, energy: [550, 340] },
  MEX: { capital: 'مکزیکوسیتی', active: 220, nuclear: false, terrain: 'mountain',
    mil: { land: 40, air: 22, navy: 25, missile: 5, airDefense: 15, cyber: 25, drone: 20 }, energy: [150, 190] },
  BGD: { capital: 'داکا', active: 165, nuclear: false, terrain: 'plain',
    mil: { land: 35, air: 18, navy: 20, missile: 8, airDefense: 15, cyber: 10, drone: 10 }, energy: [30, 45] },
  NPL: { capital: 'کاتماندو', active: 95, nuclear: false, terrain: 'mountain',
    mil: { land: 18, air: 2, navy: 0, missile: 0, airDefense: 2, cyber: 2, drone: 2 }, energy: [6, 10] },
  GEO: { capital: 'تفلیس', active: 20, nuclear: false, terrain: 'mountain',
    mil: { land: 15, air: 5, navy: 2, missile: 5, airDefense: 12, cyber: 15, drone: 10 }, energy: [2, 5] },
  LBN: { capital: 'بیروت', active: 80, nuclear: false, terrain: 'mountain',
    mil: { land: 15, air: 3, navy: 2, missile: 25, airDefense: 3, cyber: 10, drone: 15 }, energy: [1, 8] },
  JOR: { capital: 'امان', active: 100, nuclear: false, terrain: 'desert',
    mil: { land: 30, air: 28, navy: 2, missile: 5, airDefense: 25, cyber: 20, drone: 12 }, energy: [3, 10] },
  NOR: { capital: 'اسلو', active: 25, nuclear: false, terrain: 'mountain',
    mil: { land: 25, air: 35, navy: 35, missile: 15, airDefense: 30, cyber: 45, drone: 25 }, energy: [220, 45] },
};

// ---------------------------------------------------------------------
// ۴) نام فارسی دلخواه (جایی که نام پیش‌فرض کتابخانه مناسب بازی نیست)
// ---------------------------------------------------------------------
export const NAME_OVERRIDES = {
  USA: 'آمریکا', GBR: 'انگلیس', SAU: 'عربستان', ARE: 'امارات', PSE: 'فلسطین', XKX: 'کوزوو',
  COD: 'کنگو (دموکراتیک)', COG: 'کنگو', KOR: 'کره جنوبی', PRK: 'کره شمالی', SWZ: 'اسواتینی',
  CZE: 'چک', BIH: 'بوسنی و هرزگوین', CAF: 'آفریقای مرکزی', DOM: 'جمهوری دومینیکن',
  GNQ: 'گینه استوایی', SSD: 'سودان جنوبی', TLS: 'تیمور شرقی', MKD: 'مقدونیه شمالی',
  NLD: 'هلند', BHS: 'باهاما', VCT: 'سنت وینسنت', KNA: 'سنت کیتس و نویس', ATG: 'آنتیگوا و باربودا',
  TTO: 'ترینیداد و توباگو', STP: 'سائوتومه و پرنسیپ', FSM: 'میکرونزی', MHL: 'جزایر مارشال',
  SLB: 'جزایر سلیمان', CPV: 'کیپ ورد', MMR: 'میانمار', AZE: 'آذربایجان',
};

// ---------------------------------------------------------------------
// ۵) سرزمین‌های وابسته → کشور مالک (روی نقشه رنگ مالک را می‌گیرند)
// ---------------------------------------------------------------------
export const TERRITORY_OWNER = {
  GRL: 'DNK', FRO: 'DNK', PRI: 'USA', VIR: 'USA', GUM: 'USA', MNP: 'USA', ASM: 'USA',
  SGS: 'GBR', IOT: 'GBR', SHN: 'GBR', PCN: 'GBR', AIA: 'GBR', FLK: 'GBR', CYM: 'GBR', BMU: 'GBR',
  VGB: 'GBR', TCA: 'GBR', MSR: 'GBR', JEY: 'GBR', GGY: 'GBR', IMN: 'GBR',
  SPM: 'FRA', WLF: 'FRA', MAF: 'FRA', BLM: 'FRA', PYF: 'FRA', NCL: 'FRA', ATF: 'FRA',
  ABW: 'NLD', CUW: 'NLD', SXM: 'NLD', HKG: 'CHN', MAC: 'CHN', ALA: 'FIN',
  NIU: 'NZL', COK: 'NZL', HMD: 'AUS', NFK: 'AUS', ESH: 'MAR',
};
// هندسه‌هایی که کد ISO ندارند (بر اساس نام در فایل نقشه)
export const NAMED_GEOMETRY_OWNER = {
  'Somaliland': 'SOM', 'Kosovo': 'XKX', 'N. Cyprus': 'CYP', 'Indian Ocean Ter.': 'AUS',
  'Siachen Glacier': 'IND', 'Ashmore and Cartier Is.': 'AUS',
};

// ---------------------------------------------------------------------
// ۶) همسایه‌های دریایی مهم (همسایه‌های زمینی خودکار از نقشه حساب می‌شوند)
// ---------------------------------------------------------------------
export const SEA_NEIGHBORS = [
  // خلیج فارس و دریای عمان و خزر
  ['IRN', 'ARE'], ['IRN', 'SAU'], ['IRN', 'QAT'], ['IRN', 'BHR'], ['IRN', 'KWT'], ['IRN', 'OMN'],
  ['IRN', 'KAZ'], ['IRN', 'RUS'], ['AZE', 'TKM'], ['AZE', 'KAZ'], ['SAU', 'BHR'], ['QAT', 'BHR'],
  // دریای سرخ و مدیترانه شرقی
  ['SAU', 'EGY'], ['SAU', 'SDN'], ['SAU', 'ERI'], ['YEM', 'DJI'], ['YEM', 'ERI'], ['TUR', 'CYP'],
  ['GRC', 'CYP'], ['ISR', 'CYP'], ['LBN', 'CYP'], ['SYR', 'CYP'], ['TUR', 'UKR'], ['TUR', 'ROU'],
  ['TUR', 'RUS'], ['ITA', 'LBY'], ['ITA', 'TUN'], ['ITA', 'MLT'], ['ITA', 'ALB'], ['ITA', 'GRC'],
  // اروپا
  ['GBR', 'FRA'], ['GBR', 'BEL'], ['GBR', 'NLD'], ['GBR', 'NOR'], ['GBR', 'DNK'], ['GBR', 'ISL'],
  ['FRA', 'IRL'], ['DEU', 'SWE'], ['DNK', 'SWE'], ['FIN', 'EST'], ['SWE', 'POL'], ['SWE', 'LTU'],
  ['ESP', 'MAR'], ['FRA', 'DZA'], ['RUS', 'SWE'],
  // آسیا و اقیانوسیه و آمریکا
  ['CHN', 'TWN'], ['CHN', 'JPN'], ['CHN', 'KOR'], ['CHN', 'PHL'], ['JPN', 'KOR'], ['JPN', 'RUS'],
  ['JPN', 'TWN'], ['PHL', 'TWN'], ['USA', 'RUS'], ['USA', 'CUB'], ['USA', 'BHS'], ['IND', 'LKA'],
  ['IND', 'MDV'], ['IDN', 'AUS'], ['PNG', 'AUS'], ['NZL', 'AUS'], ['MYS', 'SGP'], ['IDN', 'SGP'],
  ['IDN', 'PHL'], ['IDN', 'MYS'], ['ARG', 'GBR'], ['VEN', 'TTO'], ['HTI', 'CUB'], ['JAM', 'CUB'],
];

// ---------------------------------------------------------------------
// ۷) پیمان‌ها و بلوک‌ها
// type: military = پیمان دفاع جمعی، economic = اقتصادی، political = سیاسی
// ---------------------------------------------------------------------
export const ALLIANCES = [
  { id: 'NATO', name: 'ناتو', type: 'military', color: '#3b82f6',
    members: ['USA', 'CAN', 'GBR', 'FRA', 'DEU', 'ITA', 'ESP', 'PRT', 'NLD', 'BEL', 'LUX', 'DNK', 'NOR',
      'ISL', 'POL', 'CZE', 'SVK', 'HUN', 'ROU', 'BGR', 'GRC', 'TUR', 'HRV', 'SVN', 'ALB', 'MNE', 'MKD',
      'EST', 'LVA', 'LTU', 'FIN', 'SWE'] },
  { id: 'CSTO', name: 'پیمان امنیت جمعی', type: 'military', color: '#dc2626',
    members: ['RUS', 'BLR', 'KAZ', 'KGZ', 'TJK'] },
  { id: 'EU', name: 'اتحادیه اروپا', type: 'economic', color: '#facc15',
    members: ['FRA', 'DEU', 'ITA', 'ESP', 'PRT', 'NLD', 'BEL', 'LUX', 'DNK', 'IRL', 'AUT', 'SWE', 'FIN',
      'POL', 'CZE', 'SVK', 'HUN', 'ROU', 'BGR', 'GRC', 'HRV', 'SVN', 'EST', 'LVA', 'LTU', 'CYP', 'MLT'] },
  { id: 'BRICS', name: 'بریکس', type: 'economic', color: '#f97316',
    members: ['BRA', 'RUS', 'IND', 'CHN', 'ZAF', 'EGY', 'ETH', 'IRN', 'ARE', 'IDN'] },
  { id: 'SCO', name: 'سازمان همکاری شانگهای', type: 'political', color: '#a855f7',
    members: ['CHN', 'RUS', 'IND', 'PAK', 'IRN', 'KAZ', 'KGZ', 'TJK', 'UZB', 'BLR'] },
  { id: 'GCC', name: 'شورای همکاری خلیج فارس', type: 'military', color: '#10b981',
    members: ['SAU', 'ARE', 'QAT', 'KWT', 'BHR', 'OMN'] },
  { id: 'ARAB', name: 'اتحادیه عرب', type: 'political', color: '#84cc16',
    members: ['SAU', 'ARE', 'QAT', 'KWT', 'BHR', 'OMN', 'YEM', 'IRQ', 'SYR', 'JOR', 'LBN', 'PSE', 'EGY',
      'LBY', 'TUN', 'DZA', 'MAR', 'MRT', 'SDN', 'SOM', 'DJI', 'COM'] },
];

// پیمان‌های دفاعی دوجانبه
export const DEFENSE_PACTS = [
  ['USA', 'JPN'], ['USA', 'KOR'], ['USA', 'AUS'], ['USA', 'PHL'], ['USA', 'NZL'], ['CHN', 'PRK'],
  ['RUS', 'PRK'], ['SAU', 'PAK'], ['TUR', 'AZE'], ['RUS', 'BLR'], ['GRC', 'CYP'], ['AUS', 'NZL'],
];

// امتیاز رابطه‌ای که عضویت مشترک در هر بلوک می‌دهد
export const BLOC_BONUS = { NATO: 35, CSTO: 30, EU: 25, BRICS: 8, SCO: 8, GCC: 30, ARAB: 10 };

// ---------------------------------------------------------------------
// ۸) رابطه‌های دوجانبه‌ی خاص (۱۰۰- تا ۱۰۰+) — بر بلوک‌ها مقدم است
// ---------------------------------------------------------------------
export const RELATIONS = {
  IRN: { ISR: -95, USA: -85, SAU: -10, ARE: -5, IRQ: 45, RUS: 55, CHN: 50, SYR: -30, AZE: -15,
    ARM: 35, TUR: 5, PAK: 15, AFG: -10, TKM: 25, GBR: -55, FRA: -45, DEU: -45, IND: 20, VEN: 50,
    PRK: 40, BHR: -30, KWT: 0, QAT: 30, OMN: 40, LBN: 20, YEM: 40, CAN: -60, AUS: -40, TJK: 25,
    UZB: 15, KAZ: 15, BLR: 35, CUB: 35, JOR: -15, EGY: -10, NLD: -30, ITA: -25 },
  USA: { RUS: -55, CHN: -45, PRK: -90, ISR: 85, GBR: 80, CAN: 35, MEX: 15, SAU: 55, ARE: 55, QAT: 50,
    JPN: 75, KOR: 70, TWN: 60, IND: 30, TUR: 20, PAK: 15, UKR: 35, CUB: -65, VEN: -80, DEU: 45,
    FRA: 40, AUS: 70, PHL: 60, EGY: 40, JOR: 50, IRQ: 10, AFG: -50, SYR: 5, DNK: 10, BRA: -10,
    COL: -20, NIC: -50, BLR: -50, POL: 60, BHR: 55, KWT: 55, ARG: 45, SGP: 50, VNM: 15 },
  RUS: { UKR: -100, CHN: 65, BLR: 90, PRK: 70, IND: 45, TUR: 15, GEO: -40, POL: -70, LTU: -75,
    LVA: -75, EST: -75, FIN: -65, GBR: -70, DEU: -55, FRA: -55, AZE: -15, ARM: 0, KAZ: 45, SYR: -5,
    SRB: 45, HUN: 25, JPN: -45, VEN: 45, CUB: 45, MDA: -40, SWE: -60, NOR: -40, CAN: -55, KGZ: 40,
    TJK: 40, UZB: 35, TKM: 30, MNG: 35, NIC: 40, MLI: 40, BFA: 40, NER: 35, CAF: 40, SAU: 20, ARE: 30 },
  CHN: { TWN: -85, JPN: -40, IND: -25, PAK: 75, PRK: 50, PHL: -50, VNM: -10, KOR: 0, AUS: -15,
    GBR: -15, DEU: 10, FRA: 5, SAU: 35, TUR: 10, CAN: -20, KHM: 60, LAO: 55, MMR: 40, SRB: 45,
    HUN: 30, BLR: 40, KAZ: 35, BRA: 35, ZAF: 35, IDN: 25, MYS: 20, THA: 25, LTU: -30, CZE: -10 },
  IND: { PAK: -85, BGD: -10, NPL: 20, AFG: 5, ISR: 45, FRA: 50, GBR: 30, JPN: 45, ARE: 50, SAU: 35,
    TUR: -25, LKA: 25, MDV: 10, BTN: 70, MMR: 10, AUS: 40, CAN: -25, AZE: -20, ARM: 40, GRC: 25,
    EGY: 30, VNM: 30, KAZ: 20 },
  TUR: { GRC: -25, CYP: -60, ARM: -35, AZE: 90, SYR: 45, ISR: -65, QAT: 60, PAK: 55, UKR: 30,
    IRQ: 10, FRA: -10, DEU: 20, GBR: 30, LBY: 30, SOM: 50, NLD: 0, SWE: 0, EGY: 15, SAU: 20, ARE: 15,
    KAZ: 40, UZB: 40, TKM: 40, KGZ: 40, GEO: 35, BIH: 40, ALB: 35, XKX: 40, HUN: 30 },
  AZE: { ARM: -35, ISR: 55, GEO: 40, KAZ: 35, UZB: 30, TKM: 25, PAK: 50, UKR: 30 },
  ISR: { SAU: 5, ARE: 30, EGY: 10, JOR: 5, LBN: -60, SYR: -40, PSE: -90, QAT: -30, DEU: 45, GBR: 30,
    FRA: 10, YEM: -80, IRQ: -50, BHR: 25, MAR: 25, ZAF: -50, ESP: -30, IRL: -30, NOR: -25, COL: -40 },
  SAU: { ARE: 55, QAT: 30, YEM: -50, EGY: 55, PAK: 70, IRQ: 15, SYR: 35, JOR: 50, BHR: 70, LBN: 10 },
  ARE: { QAT: 20, YEM: -35, EGY: 55, SDN: -30, BHR: 60, OMN: 30, JOR: 40 },
  QAT: { BHR: -10, EGY: 15, PSE: 30 },
  PAK: { AFG: -45, BGD: 15, QAT: 30, AZE: 50, UZB: 15 },
  AFG: { TJK: -20, UZB: 10, TKM: 10, QAT: 20 },
  IRQ: { SYR: 0, KWT: 10, JOR: 25, LBN: 20 },
  GBR: { FRA: 55, DEU: 55, UKR: 55, IRL: 50, ARG: -25, POL: 50, NOR: 55, JPN: 40, AUS: 75, CAN: 70,
    NZL: 70, IND: 30 },
  FRA: { DEU: 65, UKR: 45, ITA: 45, ESP: 45, MLI: -40, BFA: -40, NER: -40, DZA: -25, MAR: 40, GRC: 50 },
  DEU: { UKR: 50, POL: 45, NLD: 60, AUT: 60, ISR: 45, ITA: 45 },
  UKR: { POL: 45, BLR: -65, MDA: 40, GEO: 30, LTU: 60, LVA: 55, EST: 55, HUN: -15, CAN: 50 },
  KOR: { PRK: -85, JPN: 25 },
  JPN: { PRK: -80, TWN: 45, AUS: 55, PHL: 45 },
  GRC: { CYP: 85, MKD: 10, ALB: 0 },
  SRB: { XKX: -75, BIH: 10, HRV: -15 },
  ALB: { XKX: 65 },
  ETH: { ERI: -45, EGY: -40, SOM: -15 },
  SDN: { SSD: -10 },
  VEN: { GUY: -55, COL: -20, CUB: 70, NIC: 50 },
  MAR: { DZA: -55 },
  EGY: { ETH: -40, LBY: 10 },
  COD: { RWA: -65, UGA: -20 },
  ARM: { GEO: 20, AZE: -35 },
  THA: { KHM: -35 },
  KHM: { VNM: 15 },
  NPL: { BGD: 10 },
  KGZ: { TJK: -35 },
};

// جنگ‌های در جریان در شروع ۲۰۲۶ (برای مراحل بعدی سیستم نبرد)
export const WARS = [['RUS', 'UKR']];

// تحریم‌های اولیه: [تحریم‌کننده, هدف]
const WESTERN = ['USA', 'GBR', 'CAN', 'AUS', 'JPN', 'FRA', 'DEU', 'ITA', 'NLD', 'BEL', 'ESP', 'POL',
  'SWE', 'FIN', 'DNK', 'NOR', 'CHE', 'NZL', 'KOR'];
export const SANCTIONS = [
  ...WESTERN.map(c => [c, 'RUS']),
  ...WESTERN.filter(c => c !== 'KOR').map(c => [c, 'IRN']),
  ...WESTERN.map(c => [c, 'PRK']),
  ...['USA', 'GBR', 'CAN', 'FRA', 'DEU', 'POL', 'LTU'].map(c => [c, 'BLR']),
  ['USA', 'VEN'], ['USA', 'CUB'], ['USA', 'NIC'], ['USA', 'MMR'], ['USA', 'SYR'], ['USA', 'AFG'],
];

// ---------------------------------------------------------------------
// ۹) انرژی کشورهای غیر «دقیق» که تولیدکننده/مصرف‌کننده‌ی مهم‌اند [تولید, مصرف]
// بقیه‌ی کشورها: مصرف از روی GDP و جمعیت تخمین زده می‌شود و تولید نصف مصرف است.
// ---------------------------------------------------------------------
export const ENERGY = {
  AUS: [450, 150], BRA: [330, 310], DZA: [150, 65], NGA: [250, 160], VEN: [70, 50], LBY: [70, 20],
  AGO: [70, 18], IDN: [480, 250], COL: [120, 45], MYS: [100, 95], BRN: [20, 4], TTO: [30, 15],
  GAB: [15, 3], COG: [18, 3], GNQ: [15, 2], ECU: [30, 18], MNG: [40, 6], ZAF: [150, 135],
  UZB: [55, 50], YEM: [5, 5], SSD: [8, 2], TCD: [7, 2], ARG: [85, 85], NLD: [30, 65], VNM: [80, 100],
  THA: [40, 140], SGP: [1, 90], ITA: [35, 150], CHE: [12, 25],
};

// ---------------------------------------------------------------------
// ۱۰) اقتصاد کلان: [تورم سالانه ٪, بدهی دولت به نسبت GDP]
// کشورهای دیگر: تورم ۴٪ و بدهی ۵۰٪ (پیش‌فرض)
// ---------------------------------------------------------------------
export const MACRO = {
  USA: [2.8, 1.22], CAN: [2.2, 1.1], MEX: [4, 0.55], BRA: [5, 0.88], ARG: [35, 0.8], VEN: [150, 1.5],
  COL: [5, 0.6], CHL: [4, 0.42], PER: [2.5, 0.33], GBR: [3.2, 1.0], FRA: [1.5, 1.15], DEU: [2.2, 0.63],
  ITA: [1.5, 1.37], ESP: [2.5, 1.02], GRC: [2.8, 1.5], POL: [4, 0.58], NLD: [3, 0.45], RUS: [8, 0.2],
  UKR: [12, 0.95], BLR: [6, 0.4], TUR: [35, 0.3], IRN: [38, 0.35], IRQ: [3, 0.5], SAU: [2, 0.3],
  ARE: [2, 0.32], QAT: [2, 0.42], KWT: [3, 0.1], OMN: [1.5, 0.35], ISR: [3, 0.68], EGY: [15, 0.9],
  JOR: [2, 0.9], LBN: [20, 1.5], SYR: [40, 1.0], YEM: [30, 0.8], PAK: [5, 0.75], AFG: [5, 0.1],
  AZE: [5, 0.2], ARM: [3, 0.5], GEO: [3, 0.4], TKM: [8, 0.05], KAZ: [10, 0.24], UZB: [10, 0.35],
  CHN: [0.5, 0.9], IND: [3, 0.82], JPN: [3, 2.3], KOR: [2, 0.53], PRK: [10, 0.5], TWN: [2, 0.27],
  BGD: [9, 0.4], LKA: [3, 1.0], IDN: [2, 0.4], VNM: [3.5, 0.35], THA: [1, 0.63], MYS: [2, 0.65],
  PHL: [3, 0.6], MMR: [25, 0.6], NGA: [25, 0.5], ETH: [15, 0.4], ZAF: [4, 0.75], SDN: [60, 1.5],
  ZWE: [50, 0.7], AGO: [20, 0.6], KEN: [5, 0.7], GHA: [15, 0.7], DZA: [5, 0.5], MAR: [2, 0.7],
  TUN: [6, 0.8], LBY: [3, 0.4], AUS: [3, 0.5], NZL: [3, 0.45], SGP: [2, 1.6], CHE: [0.5, 0.38],
  NOR: [3, 0.4], SWE: [2, 0.33], CUB: [30, 1.0], HTI: [25, 0.3],
};

// ---------------------------------------------------------------------
// ۱۱) مختصات پایتخت‌ها [طول جغرافیایی, عرض جغرافیایی] — برای محل استقرار ارتش روی نقشه
// کشورهای دیگر: مرکز سرزمین اصلی (خودکار)
// ---------------------------------------------------------------------
export const CAPITAL_POS = {
  USA: [-77.04, 38.9], RUS: [37.62, 55.75], CHN: [116.4, 39.9], IND: [77.2, 28.6], GBR: [-0.13, 51.5],
  FRA: [2.35, 48.86], DEU: [13.4, 52.52], TUR: [32.86, 39.93], IRN: [51.39, 35.69], IRQ: [44.36, 33.31],
  SAU: [46.68, 24.71], ARE: [54.37, 24.45], QAT: [51.53, 25.29], KWT: [47.98, 29.37], OMN: [58.41, 23.59],
  BHR: [50.58, 26.23], PAK: [73.05, 33.68], AFG: [69.17, 34.53], AZE: [49.87, 40.41], ARM: [44.51, 40.18],
  TKM: [58.38, 37.95], ISR: [34.78, 32.08], SYR: [36.29, 33.51], UKR: [30.52, 50.45], POL: [21.01, 52.23],
  GRC: [23.73, 37.98], KAZ: [71.45, 51.17], JPN: [139.69, 35.69], KOR: [126.98, 37.57], PRK: [125.75, 39.03],
  TWN: [121.56, 25.03], EGY: [31.24, 30.04], ITA: [12.5, 41.9], ESP: [-3.7, 40.42], BLR: [27.56, 53.9],
  CAN: [-75.7, 45.42], MEX: [-99.13, 19.43], BGD: [90.41, 23.81], NPL: [85.32, 27.72], GEO: [44.79, 41.72],
  LBN: [35.5, 33.89], JOR: [35.93, 31.95], NOR: [10.75, 59.91],
};

// ---------------------------------------------------------------------
// ۱۲) شهرهای مهم: [نام, طول, عرض, برچسب‌ها]
// اولین شهر = پایتخت (مختصاتش از CAPITAL_POS). برچسب‌ها محل استقرار اولیه‌ی نیروها را تعیین می‌کنند:
//   port = بندر (ناو و زیردریایی)   air = پایگاه هوایی   missile = پایگاه موشکی   industry = صنعتی
//   oil = منطقه‌ی نفت‌خیز (سهم انرژی بیشتر؛ فتحش نفت می‌آورد)
// کشورهای دیگر: پایتخت + برای کشورهای پرجمعیت ۱ تا ۲ منطقه‌ی مجازی (build-data.mjs).
// ---------------------------------------------------------------------
export const CITIES = {
  IRN: [['تهران', 0, 0, 'industry'], ['اصفهان', 51.67, 32.65, 'industry air'], ['تبریز', 46.29, 38.08, ''], ['مشهد', 59.6, 36.3, ''],
    ['شیراز', 52.53, 29.59, 'air'], ['بندرعباس', 56.27, 27.18, 'port'], ['اهواز', 48.67, 31.32, 'oil'], ['کرمانشاه', 47.06, 34.31, 'missile']],
  IRQ: [['بغداد', 0, 0, ''], ['بصره', 47.78, 30.51, 'port oil'], ['موصل', 43.13, 36.34, ''], ['اربیل', 44.01, 36.19, 'air'], ['کربلا', 44.02, 32.6, ''], ['کرکوک', 44.39, 35.47, 'oil']],
  SAU: [['ریاض', 0, 0, 'missile'], ['جده', 39.17, 21.49, 'port'], ['دمام', 50.1, 26.43, 'port oil'], ['تبوک', 36.57, 28.38, 'air'], ['خمیس مشیط', 42.73, 18.3, 'air']],
  ARE: [['ابوظبی', 0, 0, 'port air oil'], ['دبی', 55.27, 25.2, 'port']],
  QAT: [['دوحه', 0, 0, 'port air oil']], KWT: [['کویت', 0, 0, 'port oil'], ['الجهرا', 47.66, 29.34, '']], BHR: [['منامه', 0, 0, 'port']],
  OMN: [['مسقط', 0, 0, 'port'], ['صلاله', 54.09, 17.02, 'port']],
  TUR: [['آنکارا', 0, 0, 'industry'], ['استانبول', 28.98, 41.01, 'port industry'], ['ازمیر', 27.14, 38.42, 'port'], ['دیاربکر', 40.23, 37.91, 'air'],
    ['ارزروم', 41.27, 39.9, 'missile'], ['آدانا', 35.32, 37.0, 'air'], ['ترابزون', 39.72, 41.0, 'port']],
  RUS: [['مسکو', 0, 0, 'industry'], ['سن‌پترزبورگ', 30.31, 59.94, 'port industry'], ['ولگوگراد', 44.5, 48.71, 'missile'], ['روستوف', 39.7, 47.24, 'air'],
    ['یکاترینبورگ', 60.6, 56.84, 'industry oil'], ['نووسیبیرسک', 82.92, 55.03, 'industry'], ['ولادی‌وستوک', 131.9, 43.12, 'port'],
    ['مورمانسک', 33.08, 68.97, 'port'], ['کالینینگراد', 20.5, 54.71, 'port']],
  USA: [['واشنگتن', 0, 0, ''], ['نیویورک', -74.0, 40.71, 'port industry'], ['نورفولک', -76.29, 36.85, 'port'], ['شیکاگو', -87.63, 41.88, 'industry'],
    ['هیوستون', -95.37, 29.76, 'industry missile oil'], ['لس‌آنجلس', -118.24, 34.05, 'industry'], ['سن‌دیگو', -117.16, 32.72, 'port'],
    ['سیاتل', -122.33, 47.61, 'port industry'], ['آنکوریج', -149.9, 61.22, 'air'], ['هونولولو', -157.86, 21.31, 'port air']],
  DEU: [['برلین', 0, 0, ''], ['هامبورگ', 9.99, 53.55, 'port'], ['مونیخ', 11.58, 48.14, 'industry'], ['کلن', 6.96, 50.94, 'air'], ['اشتوتگارت', 9.18, 48.78, 'industry']],
  FRA: [['پاریس', 0, 0, ''], ['مارسی', 5.37, 43.3, 'port'], ['برست', -4.49, 48.39, 'port'], ['تولوز', 1.44, 43.6, 'industry air'], ['لیون', 4.84, 45.76, 'industry']],
  GBR: [['لندن', 0, 0, ''], ['پورتسموث', -1.09, 50.8, 'port'], ['منچستر', -2.24, 53.48, 'industry'], ['گلاسکو', -4.25, 55.86, 'port'], ['بلفاست', -5.93, 54.6, 'air']],
  CHN: [['پکن', 0, 0, 'industry'], ['شانگهای', 121.47, 31.23, 'port industry'], ['گوانگژو', 113.26, 23.13, 'industry'], ['چینگدائو', 120.38, 36.07, 'port'],
    ['شیامن', 118.09, 24.48, 'port air'], ['چنگدو', 104.07, 30.57, 'industry air'], ['ووهان', 114.3, 30.59, 'missile'], ['شنیانگ', 123.43, 41.8, 'industry'],
    ['کاشغر', 75.99, 39.47, ''], ['لاسا', 91.17, 29.65, '']],
  IND: [['دهلی نو', 0, 0, ''], ['بمبئی', 72.88, 19.08, 'port industry'], ['کلکته', 88.36, 22.57, 'port'], ['چنای', 80.27, 13.08, 'port industry'],
    ['بنگلور', 77.59, 12.97, 'industry air'], ['حیدرآباد', 78.49, 17.39, 'missile'], ['سرینگر', 74.8, 34.08, ''], ['گواهاتی', 91.74, 26.14, '']],
  PAK: [['اسلام‌آباد', 0, 0, ''], ['کراچی', 67.0, 24.86, 'port industry'], ['لاهور', 74.35, 31.55, 'industry'], ['پیشاور', 71.58, 34.01, 'air'], ['کویته', 67.0, 30.18, 'missile']],
  AFG: [['کابل', 0, 0, ''], ['هرات', 62.2, 34.35, ''], ['قندهار', 65.71, 31.61, ''], ['مزار شریف', 67.11, 36.71, '']],
  AZE: [['باکو', 0, 0, 'port oil'], ['گنجه', 46.36, 40.68, 'air'], ['نخجوان', 45.41, 39.21, '']],
  ARM: [['ایروان', 0, 0, ''], ['گیومری', 43.85, 40.79, 'air']],
  TKM: [['عشق‌آباد', 0, 0, ''], ['ترکمن‌باشی', 52.97, 40.02, 'port oil'], ['مرو', 61.83, 37.6, 'oil']],
  ISR: [['تل‌آویو', 0, 0, 'industry'], ['حیفا', 34.99, 32.79, 'port'], ['بئرشبع', 34.79, 31.25, 'air missile']],
  SYR: [['دمشق', 0, 0, ''], ['حلب', 37.16, 36.2, ''], ['لاذقیه', 35.78, 35.52, 'port']],
  UKR: [['کی‌یف', 0, 0, ''], ['خارکیف', 36.23, 49.99, ''], ['دنیپرو', 35.05, 48.46, 'industry'], ['اودسا', 30.72, 46.48, 'port'], ['لویو', 24.03, 49.84, 'air']],
  POL: [['ورشو', 0, 0, ''], ['گدانسک', 18.65, 54.35, 'port'], ['کراکوف', 19.94, 50.06, 'industry'], ['ژشوف', 22.0, 50.04, 'air']],
  GRC: [['آتن', 0, 0, 'port'], ['تسالونیکی', 22.94, 40.64, 'port'], ['هراکلیون', 25.14, 35.34, 'air']],
  KAZ: [['آستانه', 0, 0, ''], ['آلماتی', 76.89, 43.24, 'industry'], ['آکتائو', 51.2, 43.65, 'port oil']],
  JPN: [['توکیو', 0, 0, 'industry'], ['یوکوسوکا', 139.67, 35.28, 'port'], ['اوساکا', 135.5, 34.69, 'industry'], ['ناها', 127.68, 26.21, 'air'], ['ساپورو', 141.35, 43.06, '']],
  KOR: [['سئول', 0, 0, 'industry'], ['بوسان', 129.08, 35.18, 'port industry'], ['ده‌گو', 128.6, 35.87, 'air']],
  PRK: [['پیونگ‌یانگ', 0, 0, ''], ['ونسان', 127.44, 39.15, 'port missile'], ['سینپو', 128.18, 40.03, 'port']],
  TWN: [['تایپه', 0, 0, ''], ['کائوسیونگ', 120.3, 22.63, 'port industry'], ['تایچونگ', 120.68, 24.15, 'air']],
  EGY: [['قاهره', 0, 0, 'industry'], ['اسکندریه', 29.92, 31.2, 'port'], ['پورت سعید', 32.3, 31.26, 'port'], ['اسوان', 32.9, 24.09, 'air']],
  ITA: [['رم', 0, 0, ''], ['میلان', 9.19, 45.46, 'industry'], ['ناپل', 14.27, 40.85, 'port'], ['تارانتو', 17.24, 40.47, 'port']],
  ESP: [['مادرید', 0, 0, ''], ['بارسلونا', 2.17, 41.39, 'port industry'], ['کادیز', -6.29, 36.53, 'port']],
  BLR: [['مینسک', 0, 0, ''], ['برست', 23.69, 52.1, ''], ['گومل', 30.98, 52.44, '']],
  CAN: [['اتاوا', 0, 0, ''], ['تورنتو', -79.38, 43.65, 'industry'], ['ونکوور', -123.12, 49.28, 'port'], ['هالیفاکس', -63.57, 44.65, 'port']],
  MEX: [['مکزیکوسیتی', 0, 0, ''], ['مونتری', -100.31, 25.69, 'industry'], ['وراکروز', -96.13, 19.17, 'port'], ['تیخوانا', -117.04, 32.51, '']],
  BGD: [['داکا', 0, 0, ''], ['چیتاگونگ', 91.78, 22.36, 'port']],
  NPL: [['کاتماندو', 0, 0, '']], GEO: [['تفلیس', 0, 0, ''], ['باتومی', 41.64, 41.64, 'port']],
  LBN: [['بیروت', 0, 0, 'port']], JOR: [['امان', 0, 0, ''], ['عقبه', 35.0, 29.53, 'port']],
  NOR: [['اسلو', 0, 0, 'port'], ['برگن', 5.32, 60.39, 'port oil'], ['بودو', 14.4, 67.28, 'air']],
};
