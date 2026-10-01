// این فایل خودکار ساخته شده (tools/build-data.mjs). دستی ویرایش نکنید؛ tools/source-data.mjs را ویرایش کنید.
window.SG_DATA = window.SG_DATA || {};
SG_DATA.scenario = {
 "id": "world_2026",
 "name": "جهان ۲۰۲۶",
 "startDate": {
  "year": 2026,
  "month": 1
 },
 "alliances": [
  {
   "id": "NATO",
   "name": "ناتو",
   "type": "military",
   "color": "#3b82f6",
   "members": [
    "USA",
    "CAN",
    "GBR",
    "FRA",
    "DEU",
    "ITA",
    "ESP",
    "PRT",
    "NLD",
    "BEL",
    "LUX",
    "DNK",
    "NOR",
    "ISL",
    "POL",
    "CZE",
    "SVK",
    "HUN",
    "ROU",
    "BGR",
    "GRC",
    "TUR",
    "HRV",
    "SVN",
    "ALB",
    "MNE",
    "MKD",
    "EST",
    "LVA",
    "LTU",
    "FIN",
    "SWE"
   ]
  },
  {
   "id": "CSTO",
   "name": "پیمان امنیت جمعی",
   "type": "military",
   "color": "#dc2626",
   "members": [
    "RUS",
    "BLR",
    "KAZ",
    "KGZ",
    "TJK"
   ]
  },
  {
   "id": "EU",
   "name": "اتحادیه اروپا",
   "type": "economic",
   "color": "#facc15",
   "members": [
    "FRA",
    "DEU",
    "ITA",
    "ESP",
    "PRT",
    "NLD",
    "BEL",
    "LUX",
    "DNK",
    "IRL",
    "AUT",
    "SWE",
    "FIN",
    "POL",
    "CZE",
    "SVK",
    "HUN",
    "ROU",
    "BGR",
    "GRC",
    "HRV",
    "SVN",
    "EST",
    "LVA",
    "LTU",
    "CYP",
    "MLT"
   ]
  },
  {
   "id": "BRICS",
   "name": "بریکس",
   "type": "economic",
   "color": "#f97316",
   "members": [
    "BRA",
    "RUS",
    "IND",
    "CHN",
    "ZAF",
    "EGY",
    "ETH",
    "IRN",
    "ARE",
    "IDN"
   ]
  },
  {
   "id": "SCO",
   "name": "سازمان همکاری شانگهای",
   "type": "political",
   "color": "#a855f7",
   "members": [
    "CHN",
    "RUS",
    "IND",
    "PAK",
    "IRN",
    "KAZ",
    "KGZ",
    "TJK",
    "UZB",
    "BLR"
   ]
  },
  {
   "id": "GCC",
   "name": "شورای همکاری خلیج فارس",
   "type": "military",
   "color": "#10b981",
   "members": [
    "SAU",
    "ARE",
    "QAT",
    "KWT",
    "BHR",
    "OMN"
   ]
  },
  {
   "id": "ARAB",
   "name": "اتحادیه عرب",
   "type": "political",
   "color": "#84cc16",
   "members": [
    "SAU",
    "ARE",
    "QAT",
    "KWT",
    "BHR",
    "OMN",
    "YEM",
    "IRQ",
    "SYR",
    "JOR",
    "LBN",
    "PSE",
    "EGY",
    "LBY",
    "TUN",
    "DZA",
    "MAR",
    "MRT",
    "SDN",
    "SOM",
    "DJI",
    "COM"
   ]
  }
 ],
 "defensePacts": [
  [
   "USA",
   "JPN"
  ],
  [
   "USA",
   "KOR"
  ],
  [
   "USA",
   "AUS"
  ],
  [
   "USA",
   "PHL"
  ],
  [
   "USA",
   "NZL"
  ],
  [
   "CHN",
   "PRK"
  ],
  [
   "RUS",
   "PRK"
  ],
  [
   "SAU",
   "PAK"
  ],
  [
   "TUR",
   "AZE"
  ],
  [
   "RUS",
   "BLR"
  ],
  [
   "GRC",
   "CYP"
  ],
  [
   "AUS",
   "NZL"
  ]
 ],
 "blocBonus": {
  "NATO": 35,
  "CSTO": 30,
  "EU": 25,
  "BRICS": 8,
  "SCO": 8,
  "GCC": 30,
  "ARAB": 10
 },
 "relations": {
  "IRN": {
   "ISR": -95,
   "USA": -85,
   "SAU": -10,
   "ARE": -5,
   "IRQ": 45,
   "RUS": 55,
   "CHN": 50,
   "SYR": -30,
   "AZE": -15,
   "ARM": 35,
   "TUR": 5,
   "PAK": 15,
   "AFG": -10,
   "TKM": 25,
   "GBR": -55,
   "FRA": -45,
   "DEU": -45,
   "IND": 20,
   "VEN": 50,
   "PRK": 40,
   "BHR": -30,
   "KWT": 0,
   "QAT": 30,
   "OMN": 40,
   "LBN": 20,
   "YEM": 40,
   "CAN": -60,
   "AUS": -40,
   "TJK": 25,
   "UZB": 15,
   "KAZ": 15,
   "BLR": 35,
   "CUB": 35,
   "JOR": -15,
   "EGY": -10,
   "NLD": -30,
   "ITA": -25
  },
  "USA": {
   "RUS": -55,
   "CHN": -45,
   "PRK": -90,
   "ISR": 85,
   "GBR": 80,
   "CAN": 35,
   "MEX": 15,
   "SAU": 55,
   "ARE": 55,
   "QAT": 50,
   "JPN": 75,
   "KOR": 70,
   "TWN": 60,
   "IND": 30,
   "TUR": 20,
   "PAK": 15,
   "UKR": 35,
   "CUB": -65,
   "VEN": -80,
   "DEU": 45,
   "FRA": 40,
   "AUS": 70,
   "PHL": 60,
   "EGY": 40,
   "JOR": 50,
   "IRQ": 10,
   "AFG": -50,
   "SYR": 5,
   "DNK": 10,
   "BRA": -10,
   "COL": -20,
   "NIC": -50,
   "BLR": -50,
   "POL": 60,
   "BHR": 55,
   "KWT": 55,
   "ARG": 45,
   "SGP": 50,
   "VNM": 15
  },
  "RUS": {
   "UKR": -100,
   "CHN": 65,
   "BLR": 90,
   "PRK": 70,
   "IND": 45,
   "TUR": 15,
   "GEO": -40,
   "POL": -70,
   "LTU": -75,
   "LVA": -75,
   "EST": -75,
   "FIN": -65,
   "GBR": -70,
   "DEU": -55,
   "FRA": -55,
   "AZE": -15,
   "ARM": 0,
   "KAZ": 45,
   "SYR": -5,
   "SRB": 45,
   "HUN": 25,
   "JPN": -45,
   "VEN": 45,
   "CUB": 45,
   "MDA": -40,
   "SWE": -60,
   "NOR": -40,
   "CAN": -55,
   "KGZ": 40,
   "TJK": 40,
   "UZB": 35,
   "TKM": 30,
   "MNG": 35,
   "NIC": 40,
   "MLI": 40,
   "BFA": 40,
   "NER": 35,
   "CAF": 40,
   "SAU": 20,
   "ARE": 30
  },
  "CHN": {
   "TWN": -85,
   "JPN": -40,
   "IND": -25,
   "PAK": 75,
   "PRK": 50,
   "PHL": -50,
   "VNM": -10,
   "KOR": 0,
   "AUS": -15,
   "GBR": -15,
   "DEU": 10,
   "FRA": 5,
   "SAU": 35,
   "TUR": 10,
   "CAN": -20,
   "KHM": 60,
   "LAO": 55,
   "MMR": 40,
   "SRB": 45,
   "HUN": 30,
   "BLR": 40,
   "KAZ": 35,
   "BRA": 35,
   "ZAF": 35,
   "IDN": 25,
   "MYS": 20,
   "THA": 25,
   "LTU": -30,
   "CZE": -10
  },
  "IND": {
   "PAK": -85,
   "BGD": -10,
   "NPL": 20,
   "AFG": 5,
   "ISR": 45,
   "FRA": 50,
   "GBR": 30,
   "JPN": 45,
   "ARE": 50,
   "SAU": 35,
   "TUR": -25,
   "LKA": 25,
   "MDV": 10,
   "BTN": 70,
   "MMR": 10,
   "AUS": 40,
   "CAN": -25,
   "AZE": -20,
   "ARM": 40,
   "GRC": 25,
   "EGY": 30,
   "VNM": 30,
   "KAZ": 20
  },
  "TUR": {
   "GRC": -25,
   "CYP": -60,
   "ARM": -35,
   "AZE": 90,
   "SYR": 45,
   "ISR": -65,
   "QAT": 60,
   "PAK": 55,
   "UKR": 30,
   "IRQ": 10,
   "FRA": -10,
   "DEU": 20,
   "GBR": 30,
   "LBY": 30,
   "SOM": 50,
   "NLD": 0,
   "SWE": 0,
   "EGY": 15,
   "SAU": 20,
   "ARE": 15,
   "KAZ": 40,
   "UZB": 40,
   "TKM": 40,
   "KGZ": 40,
   "GEO": 35,
   "BIH": 40,
   "ALB": 35,
   "XKX": 40,
   "HUN": 30
  },
  "AZE": {
   "ARM": -35,
   "ISR": 55,
   "GEO": 40,
   "KAZ": 35,
   "UZB": 30,
   "TKM": 25,
   "PAK": 50,
   "UKR": 30
  },
  "ISR": {
   "SAU": 5,
   "ARE": 30,
   "EGY": 10,
   "JOR": 5,
   "LBN": -60,
   "SYR": -40,
   "PSE": -90,
   "QAT": -30,
   "DEU": 45,
   "GBR": 30,
   "FRA": 10,
   "YEM": -80,
   "IRQ": -50,
   "BHR": 25,
   "MAR": 25,
   "ZAF": -50,
   "ESP": -30,
   "IRL": -30,
   "NOR": -25,
   "COL": -40
  },
  "SAU": {
   "ARE": 55,
   "QAT": 30,
   "YEM": -50,
   "EGY": 55,
   "PAK": 70,
   "IRQ": 15,
   "SYR": 35,
   "JOR": 50,
   "BHR": 70,
   "LBN": 10
  },
  "ARE": {
   "QAT": 20,
   "YEM": -35,
   "EGY": 55,
   "SDN": -30,
   "BHR": 60,
   "OMN": 30,
   "JOR": 40
  },
  "QAT": {
   "BHR": -10,
   "EGY": 15,
   "PSE": 30
  },
  "PAK": {
   "AFG": -45,
   "BGD": 15,
   "QAT": 30,
   "AZE": 50,
   "UZB": 15
  },
  "AFG": {
   "TJK": -20,
   "UZB": 10,
   "TKM": 10,
   "QAT": 20
  },
  "IRQ": {
   "SYR": 0,
   "KWT": 10,
   "JOR": 25,
   "LBN": 20
  },
  "GBR": {
   "FRA": 55,
   "DEU": 55,
   "UKR": 55,
   "IRL": 50,
   "ARG": -25,
   "POL": 50,
   "NOR": 55,
   "JPN": 40,
   "AUS": 75,
   "CAN": 70,
   "NZL": 70,
   "IND": 30
  },
  "FRA": {
   "DEU": 65,
   "UKR": 45,
   "ITA": 45,
   "ESP": 45,
   "MLI": -40,
   "BFA": -40,
   "NER": -40,
   "DZA": -25,
   "MAR": 40,
   "GRC": 50
  },
  "DEU": {
   "UKR": 50,
   "POL": 45,
   "NLD": 60,
   "AUT": 60,
   "ISR": 45,
   "ITA": 45
  },
  "UKR": {
   "POL": 45,
   "BLR": -65,
   "MDA": 40,
   "GEO": 30,
   "LTU": 60,
   "LVA": 55,
   "EST": 55,
   "HUN": -15,
   "CAN": 50
  },
  "KOR": {
   "PRK": -85,
   "JPN": 25
  },
  "JPN": {
   "PRK": -80,
   "TWN": 45,
   "AUS": 55,
   "PHL": 45
  },
  "GRC": {
   "CYP": 85,
   "MKD": 10,
   "ALB": 0
  },
  "SRB": {
   "XKX": -75,
   "BIH": 10,
   "HRV": -15
  },
  "ALB": {
   "XKX": 65
  },
  "ETH": {
   "ERI": -45,
   "EGY": -40,
   "SOM": -15
  },
  "SDN": {
   "SSD": -10
  },
  "VEN": {
   "GUY": -55,
   "COL": -20,
   "CUB": 70,
   "NIC": 50
  },
  "MAR": {
   "DZA": -55
  },
  "EGY": {
   "ETH": -40,
   "LBY": 10
  },
  "COD": {
   "RWA": -65,
   "UGA": -20
  },
  "ARM": {
   "GEO": 20,
   "AZE": -35
  },
  "THA": {
   "KHM": -35
  },
  "KHM": {
   "VNM": 15
  },
  "NPL": {
   "BGD": 10
  },
  "KGZ": {
   "TJK": -35
  }
 },
 "wars": [
  [
   "RUS",
   "UKR"
  ]
 ],
 "warFronts": {
  "RUS>UKR": 18
 },
 "sanctions": [
  [
   "USA",
   "RUS"
  ],
  [
   "GBR",
   "RUS"
  ],
  [
   "CAN",
   "RUS"
  ],
  [
   "AUS",
   "RUS"
  ],
  [
   "JPN",
   "RUS"
  ],
  [
   "FRA",
   "RUS"
  ],
  [
   "DEU",
   "RUS"
  ],
  [
   "ITA",
   "RUS"
  ],
  [
   "NLD",
   "RUS"
  ],
  [
   "BEL",
   "RUS"
  ],
  [
   "ESP",
   "RUS"
  ],
  [
   "POL",
   "RUS"
  ],
  [
   "SWE",
   "RUS"
  ],
  [
   "FIN",
   "RUS"
  ],
  [
   "DNK",
   "RUS"
  ],
  [
   "NOR",
   "RUS"
  ],
  [
   "CHE",
   "RUS"
  ],
  [
   "NZL",
   "RUS"
  ],
  [
   "KOR",
   "RUS"
  ],
  [
   "USA",
   "IRN"
  ],
  [
   "GBR",
   "IRN"
  ],
  [
   "CAN",
   "IRN"
  ],
  [
   "AUS",
   "IRN"
  ],
  [
   "JPN",
   "IRN"
  ],
  [
   "FRA",
   "IRN"
  ],
  [
   "DEU",
   "IRN"
  ],
  [
   "ITA",
   "IRN"
  ],
  [
   "NLD",
   "IRN"
  ],
  [
   "BEL",
   "IRN"
  ],
  [
   "ESP",
   "IRN"
  ],
  [
   "POL",
   "IRN"
  ],
  [
   "SWE",
   "IRN"
  ],
  [
   "FIN",
   "IRN"
  ],
  [
   "DNK",
   "IRN"
  ],
  [
   "NOR",
   "IRN"
  ],
  [
   "CHE",
   "IRN"
  ],
  [
   "NZL",
   "IRN"
  ],
  [
   "USA",
   "PRK"
  ],
  [
   "GBR",
   "PRK"
  ],
  [
   "CAN",
   "PRK"
  ],
  [
   "AUS",
   "PRK"
  ],
  [
   "JPN",
   "PRK"
  ],
  [
   "FRA",
   "PRK"
  ],
  [
   "DEU",
   "PRK"
  ],
  [
   "ITA",
   "PRK"
  ],
  [
   "NLD",
   "PRK"
  ],
  [
   "BEL",
   "PRK"
  ],
  [
   "ESP",
   "PRK"
  ],
  [
   "POL",
   "PRK"
  ],
  [
   "SWE",
   "PRK"
  ],
  [
   "FIN",
   "PRK"
  ],
  [
   "DNK",
   "PRK"
  ],
  [
   "NOR",
   "PRK"
  ],
  [
   "CHE",
   "PRK"
  ],
  [
   "NZL",
   "PRK"
  ],
  [
   "KOR",
   "PRK"
  ],
  [
   "USA",
   "BLR"
  ],
  [
   "GBR",
   "BLR"
  ],
  [
   "CAN",
   "BLR"
  ],
  [
   "FRA",
   "BLR"
  ],
  [
   "DEU",
   "BLR"
  ],
  [
   "POL",
   "BLR"
  ],
  [
   "LTU",
   "BLR"
  ],
  [
   "USA",
   "VEN"
  ],
  [
   "USA",
   "CUB"
  ],
  [
   "USA",
   "NIC"
  ],
  [
   "USA",
   "MMR"
  ],
  [
   "USA",
   "SYR"
  ],
  [
   "USA",
   "AFG"
  ]
 ]
};
