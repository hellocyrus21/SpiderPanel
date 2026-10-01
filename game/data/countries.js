// این فایل خودکار ساخته شده (tools/build-data.mjs). دستی ویرایش نکنید؛ tools/source-data.mjs را ویرایش کنید.
window.SG_DATA = window.SG_DATA || {};
SG_DATA.countries = {
 "USA": {
  "id": "USA",
  "name": "آمریکا",
  "playable": true,
  "difficulty": 2,
  "detailed": true,
  "capital": "واشنگتن",
  "gov": "D",
  "gdp": 30000,
  "population": 342,
  "stability": 66,
  "militarySpendPct": 3.2,
  "inflation": 2.8,
  "debtRatio": 1.22,
  "military": {
   "active": 1330,
   "nuclear": true,
   "land": 92,
   "air": 100,
   "navy": 100,
   "missile": 95,
   "airDefense": 90,
   "cyber": 98,
   "drone": 95
  },
  "energy": {
   "production": 2350,
   "consumption": 2200
  },
  "terrain": "plain",
  "pos": [
   -77.04,
   38.9
  ],
  "borderPos": {
   "MEX": [
    -102.89,
    29.22
   ],
   "CAN": [
    -82.2,
    43.82
   ]
  },
  "neighbors": [
   "CAN",
   "MEX"
  ],
  "seaNeighbors": [
   "BHS",
   "CUB",
   "RUS"
  ]
 },
 "CAN": {
  "id": "CAN",
  "name": "کانادا",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "اتاوا",
  "gov": "D",
  "gdp": 2250,
  "population": 41,
  "stability": 80,
  "militarySpendPct": 1.4,
  "inflation": 2.2,
  "debtRatio": 1.1,
  "military": {
   "active": 68,
   "nuclear": false,
   "land": 40,
   "air": 50,
   "navy": 40,
   "missile": 15,
   "airDefense": 35,
   "cyber": 60,
   "drone": 30
  },
  "energy": {
   "production": 550,
   "consumption": 340
  },
  "terrain": "plain",
  "pos": [
   -75.7,
   45.42
  ],
  "borderPos": {
   "USA": [
    -82.2,
    43.82
   ]
  },
  "neighbors": [
   "USA"
  ],
  "seaNeighbors": []
 },
 "MEX": {
  "id": "MEX",
  "name": "مکزیک",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "مکزیکوسیتی",
  "gov": "D",
  "gdp": 1850,
  "population": 131,
  "stability": 55,
  "militarySpendPct": 0.7,
  "inflation": 4,
  "debtRatio": 0.55,
  "military": {
   "active": 220,
   "nuclear": false,
   "land": 40,
   "air": 22,
   "navy": 25,
   "missile": 5,
   "airDefense": 15,
   "cyber": 25,
   "drone": 20
  },
  "energy": {
   "production": 150,
   "consumption": 190
  },
  "terrain": "mountain",
  "pos": [
   -99.13,
   19.43
  ],
  "borderPos": {
   "USA": [
    -102.89,
    29.22
   ],
   "GTM": [
    -90.45,
    16.26
   ],
   "BLZ": [
    -88.86,
    17.93
   ]
  },
  "neighbors": [
   "BLZ",
   "GTM",
   "USA"
  ],
  "seaNeighbors": []
 },
 "GTM": {
  "id": "GTM",
  "name": "گواتمالا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 115,
  "population": 18.7,
  "stability": 50,
  "militarySpendPct": 0.4,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 39,
   "nuclear": false,
   "land": 5,
   "air": 4,
   "navy": 2,
   "missile": 1,
   "airDefense": 3,
   "cyber": 2,
   "drone": 2
  },
  "energy": {
   "production": 6.6,
   "consumption": 13.2
  },
  "terrain": "plain",
  "pos": [
   -90.37,
   15.69
  ],
  "borderPos": {
   "MEX": [
    -90.45,
    16.26
   ],
   "HND": [
    -89.14,
    15.07
   ],
   "SLV": [
    -89.67,
    14.18
   ],
   "BLZ": [
    -89.23,
    16.14
   ]
  },
  "neighbors": [
   "BLZ",
   "HND",
   "MEX",
   "SLV"
  ],
  "seaNeighbors": []
 },
 "BLZ": {
  "id": "BLZ",
  "name": "بلیز",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 3.4,
  "population": 0.42,
  "stability": 60,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 1,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.2,
   "consumption": 0.4
  },
  "terrain": "plain",
  "pos": [
   -88.72,
   17.19
  ],
  "borderPos": {
   "MEX": [
    -88.86,
    17.93
   ],
   "GTM": [
    -89.23,
    16.14
   ]
  },
  "neighbors": [
   "GTM",
   "MEX"
  ],
  "seaNeighbors": []
 },
 "SLV": {
  "id": "SLV",
  "name": "السالوادور",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 36,
  "population": 6.4,
  "stability": 62,
  "militarySpendPct": 1.2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 21,
   "nuclear": false,
   "land": 5,
   "air": 3,
   "navy": 2,
   "missile": 1,
   "airDefense": 3,
   "cyber": 2,
   "drone": 1
  },
  "energy": {
   "production": 2.1,
   "consumption": 4.2
  },
  "terrain": "plain",
  "pos": [
   -88.87,
   13.74
  ],
  "borderPos": {
   "HND": [
    -88.45,
    13.85
   ],
   "GTM": [
    -89.67,
    14.18
   ]
  },
  "neighbors": [
   "GTM",
   "HND"
  ],
  "seaNeighbors": []
 },
 "HND": {
  "id": "HND",
  "name": "هندوراس",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 37,
  "population": 10.8,
  "stability": 45,
  "militarySpendPct": 1.6,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 42,
   "nuclear": false,
   "land": 6,
   "air": 4,
   "navy": 3,
   "missile": 1,
   "airDefense": 3,
   "cyber": 2,
   "drone": 1
  },
  "energy": {
   "production": 2.5,
   "consumption": 5
  },
  "terrain": "plain",
  "pos": [
   -86.62,
   14.83
  ],
  "borderPos": {
   "NIC": [
    -85.2,
    14.39
   ],
   "SLV": [
    -88.45,
    13.85
   ],
   "GTM": [
    -89.14,
    15.07
   ]
  },
  "neighbors": [
   "GTM",
   "NIC",
   "SLV"
  ],
  "seaNeighbors": []
 },
 "NIC": {
  "id": "NIC",
  "name": "نیکاراگوئه",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 19,
  "population": 7,
  "stability": 45,
  "militarySpendPct": 0.6,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 17,
   "nuclear": false,
   "land": 1,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 1.4,
   "consumption": 2.8
  },
  "terrain": "plain",
  "pos": [
   -85.03,
   12.85
  ],
  "borderPos": {
   "HND": [
    -85.2,
    14.39
   ],
   "CRI": [
    -84.64,
    11.05
   ]
  },
  "neighbors": [
   "CRI",
   "HND"
  ],
  "seaNeighbors": []
 },
 "CRI": {
  "id": "CRI",
  "name": "کاستاریکا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 95,
  "population": 5.2,
  "stability": 75,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 8,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 4.7,
   "consumption": 9.3
  },
  "terrain": "plain",
  "pos": [
   -84.19,
   9.98
  ],
  "borderPos": {
   "PAN": [
    -82.74,
    8.95
   ],
   "NIC": [
    -84.64,
    11.05
   ]
  },
  "neighbors": [
   "NIC",
   "PAN"
  ],
  "seaNeighbors": []
 },
 "PAN": {
  "id": "PAN",
  "name": "پاناما",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 88,
  "population": 4.5,
  "stability": 65,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 7,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 4.3,
   "consumption": 8.6
  },
  "terrain": "plain",
  "pos": [
   -80.11,
   8.53
  ],
  "borderPos": {
   "CRI": [
    -82.74,
    8.95
   ],
   "COL": [
    -77.35,
    7.71
   ]
  },
  "neighbors": [
   "COL",
   "CRI"
  ],
  "seaNeighbors": []
 },
 "CUB": {
  "id": "CUB",
  "name": "کوبا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 48,
  "population": 10.9,
  "stability": 38,
  "militarySpendPct": 2.9,
  "inflation": 30,
  "debtRatio": 1,
  "military": {
   "active": 64,
   "nuclear": false,
   "land": 12,
   "air": 8,
   "navy": 5,
   "missile": 2,
   "airDefense": 7,
   "cyber": 4,
   "drone": 3
  },
  "energy": {
   "production": 3,
   "consumption": 6
  },
  "terrain": "plain",
  "pos": [
   -78.91,
   21.63
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "HTI",
   "JAM",
   "USA"
  ]
 },
 "JAM": {
  "id": "JAM",
  "name": "جامائیکا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 20,
  "population": 2.8,
  "stability": 60,
  "militarySpendPct": 1.2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 9,
   "nuclear": false,
   "land": 3,
   "air": 2,
   "navy": 1,
   "missile": 1,
   "airDefense": 2,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 1.1,
   "consumption": 2.2
  },
  "terrain": "plain",
  "pos": [
   -77.31,
   18.16
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "CUB"
  ]
 },
 "HTI": {
  "id": "HTI",
  "name": "هائیتی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 25,
  "population": 11.9,
  "stability": 12,
  "militarySpendPct": 0,
  "inflation": 25,
  "debtRatio": 0.3,
  "military": {
   "active": 18,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 2,
   "consumption": 4
  },
  "terrain": "plain",
  "pos": [
   -72.68,
   18.93
  ],
  "borderPos": {
   "DOM": [
    -71.73,
    18.86
   ]
  },
  "neighbors": [
   "DOM"
  ],
  "seaNeighbors": [
   "CUB"
  ]
 },
 "DOM": {
  "id": "DOM",
  "name": "جمهوری دومینیکن",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 128,
  "population": 11.4,
  "stability": 65,
  "militarySpendPct": 0.7,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 29,
   "nuclear": false,
   "land": 9,
   "air": 7,
   "navy": 4,
   "missile": 2,
   "airDefense": 6,
   "cyber": 4,
   "drone": 3
  },
  "energy": {
   "production": 6.6,
   "consumption": 13.2
  },
  "terrain": "plain",
  "pos": [
   -70.51,
   18.9
  ],
  "borderPos": {
   "HTI": [
    -71.73,
    18.86
   ]
  },
  "neighbors": [
   "HTI"
  ],
  "seaNeighbors": []
 },
 "BHS": {
  "id": "BHS",
  "name": "باهاما",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 15,
  "population": 0.41,
  "stability": 75,
  "militarySpendPct": 0.8,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 1,
   "nuclear": false,
   "land": 2,
   "air": 1,
   "navy": 1,
   "missile": 1,
   "airDefense": 1,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 0.7,
   "consumption": 1.4
  },
  "terrain": "plain",
  "pos": [
   -78.04,
   24.7
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "USA"
  ]
 },
 "TTO": {
  "id": "TTO",
  "name": "ترینیداد و توباگو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 29,
  "population": 1.5,
  "stability": 62,
  "militarySpendPct": 0.9,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 4,
   "nuclear": false,
   "land": 3,
   "air": 3,
   "navy": 2,
   "missile": 1,
   "airDefense": 2,
   "cyber": 2,
   "drone": 1
  },
  "energy": {
   "production": 30,
   "consumption": 15
  },
  "terrain": "plain",
  "pos": [
   -61.29,
   10.42
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "VEN"
  ]
 },
 "BRB": {
  "id": "BRB",
  "name": "باربادوس",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 6.7,
  "population": 0.28,
  "stability": 75,
  "militarySpendPct": 0.7,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 1,
   "nuclear": false,
   "land": 1,
   "air": 1,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.3,
   "consumption": 0.6
  },
  "terrain": "plain",
  "pos": [
   -59.56,
   13.18
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "ATG": {
  "id": "ATG",
  "name": "آنتیگوا و باربودا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 2.2,
  "population": 0.09,
  "stability": 72,
  "militarySpendPct": 0.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.1,
   "consumption": 0.2
  },
  "terrain": "plain",
  "pos": [
   -61.79,
   17.08
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "DMA": {
  "id": "DMA",
  "name": "دومینیکا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 0.7,
  "population": 0.07,
  "stability": 70,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.1,
   "consumption": 0.1
  },
  "terrain": "plain",
  "pos": [
   -61.36,
   15.44
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "GRD": {
  "id": "GRD",
  "name": "گرنادا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 1.4,
  "population": 0.13,
  "stability": 72,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.1,
   "consumption": 0.1
  },
  "terrain": "plain",
  "pos": [
   -61.68,
   12.12
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "KNA": {
  "id": "KNA",
  "name": "سنت کیتس و نویس",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 1.1,
  "population": 0.05,
  "stability": 72,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.1,
   "consumption": 0.1
  },
  "terrain": "plain",
  "pos": [
   -62.75,
   17.33
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "LCA": {
  "id": "LCA",
  "name": "سنت لوسیا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 2.6,
  "population": 0.18,
  "stability": 70,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.2,
   "consumption": 0.3
  },
  "terrain": "plain",
  "pos": [
   -60.97,
   13.89
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "VCT": {
  "id": "VCT",
  "name": "سنت وینسنت",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 1.1,
  "population": 0.1,
  "stability": 70,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.1,
   "consumption": 0.1
  },
  "terrain": "plain",
  "pos": [
   -61.2,
   13.25
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "BRA": {
  "id": "BRA",
  "name": "برزیل",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 2300,
  "population": 213,
  "stability": 55,
  "militarySpendPct": 1.1,
  "inflation": 5,
  "debtRatio": 0.88,
  "military": {
   "active": 671,
   "nuclear": false,
   "land": 45,
   "air": 35,
   "navy": 22,
   "missile": 12,
   "airDefense": 29,
   "cyber": 21,
   "drone": 17
  },
  "energy": {
   "production": 330,
   "consumption": 310
  },
  "terrain": "plain",
  "pos": [
   -53.24,
   -10.69
  ],
  "borderPos": {
   "VEN": [
    -64.23,
    3.49
   ],
   "URY": [
    -55.09,
    -31.31
   ],
   "SUR": [
    -55.89,
    2.49
   ],
   "PER": [
    -73.72,
    -7.78
   ],
   "PRY": [
    -56.45,
    -22.08
   ],
   "GUY": [
    -59.67,
    1.8
   ],
   "COL": [
    -69.15,
    0.66
   ],
   "BOL": [
    -63.04,
    -12.75
   ],
   "ARG": [
    -54.88,
    -27.6
   ]
  },
  "neighbors": [
   "ARG",
   "BOL",
   "COL",
   "GUY",
   "PER",
   "PRY",
   "SUR",
   "URY",
   "VEN"
  ],
  "seaNeighbors": []
 },
 "ARG": {
  "id": "ARG",
  "name": "آرژانتین",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 650,
  "population": 46,
  "stability": 50,
  "militarySpendPct": 0.5,
  "inflation": 35,
  "debtRatio": 0.8,
  "military": {
   "active": 104,
   "nuclear": false,
   "land": 20,
   "air": 16,
   "navy": 10,
   "missile": 6,
   "airDefense": 13,
   "cyber": 10,
   "drone": 8
  },
  "energy": {
   "production": 85,
   "consumption": 85
  },
  "terrain": "plain",
  "pos": [
   -64.75,
   -34.54
  ],
  "borderPos": {
   "URY": [
    -58.03,
    -31.42
   ],
   "PRY": [
    -58.19,
    -26.59
   ],
   "CHL": [
    -71.41,
    -39.21
   ],
   "BRA": [
    -54.88,
    -27.6
   ],
   "BOL": [
    -64.84,
    -22.14
   ]
  },
  "neighbors": [
   "BOL",
   "BRA",
   "CHL",
   "PRY",
   "URY"
  ],
  "seaNeighbors": [
   "GBR"
  ]
 },
 "COL": {
  "id": "COL",
  "name": "کلمبیا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 420,
  "population": 53,
  "stability": 45,
  "militarySpendPct": 3,
  "inflation": 5,
  "debtRatio": 0.6,
  "military": {
   "active": 318,
   "nuclear": false,
   "land": 36,
   "air": 26,
   "navy": 17,
   "missile": 8,
   "airDefense": 22,
   "cyber": 15,
   "drone": 12
  },
  "energy": {
   "production": 120,
   "consumption": 45
  },
  "terrain": "plain",
  "pos": [
   -73.08,
   3.9
  ],
  "borderPos": {
   "VEN": [
    -69.44,
    6.14
   ],
   "PER": [
    -72.66,
    -2.36
   ],
   "PAN": [
    -77.35,
    7.71
   ],
   "ECU": [
    -77,
    0.3
   ],
   "BRA": [
    -69.15,
    0.66
   ]
  },
  "neighbors": [
   "BRA",
   "ECU",
   "PAN",
   "PER",
   "VEN"
  ],
  "seaNeighbors": []
 },
 "CHL": {
  "id": "CHL",
  "name": "شیلی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 340,
  "population": 19.8,
  "stability": 65,
  "militarySpendPct": 1.6,
  "inflation": 4,
  "debtRatio": 0.42,
  "military": {
   "active": 77,
   "nuclear": false,
   "land": 26,
   "air": 21,
   "navy": 13,
   "missile": 8,
   "airDefense": 17,
   "cyber": 14,
   "drone": 12
  },
  "energy": {
   "production": 16.8,
   "consumption": 33.6
  },
  "terrain": "plain",
  "pos": [
   -70.95,
   -34.36
  ],
  "borderPos": {
   "PER": [
    -69.8,
    -17.99
   ],
   "BOL": [
    -68.73,
    -20.15
   ],
   "ARG": [
    -71.41,
    -39.21
   ]
  },
  "neighbors": [
   "ARG",
   "BOL",
   "PER"
  ],
  "seaNeighbors": []
 },
 "PER": {
  "id": "PER",
  "name": "پرو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 290,
  "population": 34.5,
  "stability": 45,
  "militarySpendPct": 1.1,
  "inflation": 2.5,
  "debtRatio": 0.33,
  "military": {
   "active": 109,
   "nuclear": false,
   "land": 20,
   "air": 15,
   "navy": 9,
   "missile": 5,
   "airDefense": 12,
   "cyber": 8,
   "drone": 7
  },
  "energy": {
   "production": 15.7,
   "consumption": 31.3
  },
  "terrain": "plain",
  "pos": [
   -74.42,
   -9.11
  ],
  "borderPos": {
   "ECU": [
    -78.6,
    -4.16
   ],
   "COL": [
    -72.66,
    -2.36
   ],
   "CHL": [
    -69.8,
    -17.99
   ],
   "BRA": [
    -73.72,
    -7.78
   ],
   "BOL": [
    -69.36,
    -14.8
   ]
  },
  "neighbors": [
   "BOL",
   "BRA",
   "CHL",
   "COL",
   "ECU"
  ],
  "seaNeighbors": []
 },
 "VEN": {
  "id": "VEN",
  "name": "ونزوئلا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 100,
  "population": 28.5,
  "stability": 28,
  "militarySpendPct": 0.8,
  "inflation": 150,
  "debtRatio": 1.5,
  "military": {
   "active": 77,
   "nuclear": false,
   "land": 8,
   "air": 5,
   "navy": 3,
   "missile": 1,
   "airDefense": 4,
   "cyber": 2,
   "drone": 2
  },
  "energy": {
   "production": 70,
   "consumption": 50
  },
  "terrain": "plain",
  "pos": [
   -66.18,
   7.12
  ],
  "borderPos": {
   "GUY": [
    -60.32,
    7.09
   ],
   "COL": [
    -69.44,
    6.14
   ],
   "BRA": [
    -64.23,
    3.49
   ]
  },
  "neighbors": [
   "BRA",
   "COL",
   "GUY"
  ],
  "seaNeighbors": [
   "TTO"
  ]
 },
 "ECU": {
  "id": "ECU",
  "name": "اکوادور",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 125,
  "population": 18.2,
  "stability": 40,
  "militarySpendPct": 2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 82,
   "nuclear": false,
   "land": 17,
   "air": 12,
   "navy": 8,
   "missile": 4,
   "airDefense": 10,
   "cyber": 7,
   "drone": 6
  },
  "energy": {
   "production": 30,
   "consumption": 18
  },
  "terrain": "plain",
  "pos": [
   -78.39,
   -1.44
  ],
  "borderPos": {
   "PER": [
    -78.6,
    -4.16
   ],
   "COL": [
    -77,
    0.3
   ]
  },
  "neighbors": [
   "COL",
   "PER"
  ],
  "seaNeighbors": []
 },
 "BOL": {
  "id": "BOL",
  "name": "بولیوی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 50,
  "population": 12.6,
  "stability": 42,
  "militarySpendPct": 1.3,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 43,
   "nuclear": false,
   "land": 7,
   "air": 4,
   "navy": 3,
   "missile": 1,
   "airDefense": 4,
   "cyber": 2,
   "drone": 2
  },
  "energy": {
   "production": 3.2,
   "consumption": 6.4
  },
  "terrain": "plain",
  "pos": [
   -64.7,
   -16.68
  ],
  "borderPos": {
   "PER": [
    -69.36,
    -14.8
   ],
   "PRY": [
    -61.51,
    -19.61
   ],
   "CHL": [
    -68.73,
    -20.15
   ],
   "BRA": [
    -63.04,
    -12.75
   ],
   "ARG": [
    -64.84,
    -22.14
   ]
  },
  "neighbors": [
   "ARG",
   "BRA",
   "CHL",
   "PER",
   "PRY"
  ],
  "seaNeighbors": []
 },
 "PRY": {
  "id": "PRY",
  "name": "پاراگوئه",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 45,
  "population": 6.9,
  "stability": 58,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 21,
   "nuclear": false,
   "land": 5,
   "air": 4,
   "navy": 2,
   "missile": 1,
   "airDefense": 3,
   "cyber": 2,
   "drone": 2
  },
  "energy": {
   "production": 2.6,
   "consumption": 5.1
  },
  "terrain": "plain",
  "pos": [
   -58.44,
   -23.21
  ],
  "borderPos": {
   "BRA": [
    -56.45,
    -22.08
   ],
   "BOL": [
    -61.51,
    -19.61
   ],
   "ARG": [
    -58.19,
    -26.59
   ]
  },
  "neighbors": [
   "ARG",
   "BOL",
   "BRA"
  ],
  "seaNeighbors": []
 },
 "URY": {
  "id": "URY",
  "name": "اروگوئه",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 83,
  "population": 3.4,
  "stability": 78,
  "militarySpendPct": 1.9,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 15,
   "nuclear": false,
   "land": 13,
   "air": 12,
   "navy": 7,
   "missile": 5,
   "airDefense": 9,
   "cyber": 8,
   "drone": 7
  },
  "energy": {
   "production": 4,
   "consumption": 8
  },
  "terrain": "plain",
  "pos": [
   -56.03,
   -32.79
  ],
  "borderPos": {
   "BRA": [
    -55.09,
    -31.31
   ],
   "ARG": [
    -58.03,
    -31.42
   ]
  },
  "neighbors": [
   "ARG",
   "BRA"
  ],
  "seaNeighbors": []
 },
 "GUY": {
  "id": "GUY",
  "name": "گویان",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 25,
  "population": 0.83,
  "stability": 60,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 2,
   "nuclear": false,
   "land": 3,
   "air": 3,
   "navy": 2,
   "missile": 1,
   "airDefense": 2,
   "cyber": 2,
   "drone": 2
  },
  "energy": {
   "production": 1.2,
   "consumption": 2.4
  },
  "terrain": "plain",
  "pos": [
   -58.98,
   4.79
  ],
  "borderPos": {
   "VEN": [
    -60.32,
    7.09
   ],
   "SUR": [
    -57.65,
    3.52
   ],
   "BRA": [
    -59.67,
    1.8
   ]
  },
  "neighbors": [
   "BRA",
   "SUR",
   "VEN"
  ],
  "seaNeighbors": []
 },
 "SUR": {
  "id": "SUR",
  "name": "سورینام",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 4.5,
  "population": 0.63,
  "stability": 55,
  "militarySpendPct": 0.8,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 2,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.3,
   "consumption": 0.5
  },
  "terrain": "plain",
  "pos": [
   -55.91,
   4.13
  ],
  "borderPos": {
   "GUY": [
    -57.65,
    3.52
   ],
   "BRA": [
    -55.89,
    2.49
   ]
  },
  "neighbors": [
   "BRA",
   "GUY"
  ],
  "seaNeighbors": []
 },
 "GBR": {
  "id": "GBR",
  "name": "انگلیس",
  "playable": true,
  "difficulty": 2,
  "detailed": true,
  "capital": "لندن",
  "gov": "D",
  "gdp": 3700,
  "population": 69,
  "stability": 72,
  "militarySpendPct": 2.4,
  "inflation": 3.2,
  "debtRatio": 1,
  "military": {
   "active": 140,
   "nuclear": true,
   "land": 55,
   "air": 70,
   "navy": 72,
   "missile": 60,
   "airDefense": 55,
   "cyber": 85,
   "drone": 65
  },
  "energy": {
   "production": 105,
   "consumption": 170
  },
  "terrain": "plain",
  "pos": [
   -0.13,
   51.5
  ],
  "borderPos": {
   "IRL": [
    -7.61,
    54.14
   ]
  },
  "neighbors": [
   "IRL"
  ],
  "seaNeighbors": [
   "ARG",
   "BEL",
   "DNK",
   "FRA",
   "ISL",
   "NLD",
   "NOR"
  ]
 },
 "FRA": {
  "id": "FRA",
  "name": "فرانسه",
  "playable": true,
  "difficulty": 2,
  "detailed": true,
  "capital": "پاریس",
  "gov": "D",
  "gdp": 3200,
  "population": 68.5,
  "stability": 62,
  "militarySpendPct": 2.1,
  "inflation": 1.5,
  "debtRatio": 1.15,
  "military": {
   "active": 200,
   "nuclear": true,
   "land": 62,
   "air": 72,
   "navy": 70,
   "missile": 68,
   "airDefense": 62,
   "cyber": 78,
   "drone": 62
  },
  "energy": {
   "production": 130,
   "consumption": 230
  },
  "terrain": "plain",
  "pos": [
   2.35,
   48.86
  ],
  "borderPos": {
   "CHE": [
    6.11,
    46.52
   ],
   "ESP": [
    -0.55,
    42.8
   ],
   "DEU": [
    7.45,
    49.15
   ],
   "MCO": [
    7.41,
    43.77
   ],
   "LUX": [
    6.01,
    49.45
   ],
   "ITA": [
    6.94,
    44.86
   ],
   "BEL": [
    4.16,
    50.13
   ],
   "AND": [
    1.71,
    42.6
   ]
  },
  "neighbors": [
   "AND",
   "BEL",
   "CHE",
   "DEU",
   "ESP",
   "ITA",
   "LUX",
   "MCO"
  ],
  "seaNeighbors": [
   "DZA",
   "GBR",
   "IRL"
  ]
 },
 "DEU": {
  "id": "DEU",
  "name": "آلمان",
  "playable": true,
  "difficulty": 2,
  "detailed": true,
  "capital": "برلین",
  "gov": "D",
  "gdp": 4800,
  "population": 83.5,
  "stability": 72,
  "militarySpendPct": 2.4,
  "inflation": 2.2,
  "debtRatio": 0.63,
  "military": {
   "active": 182,
   "nuclear": false,
   "land": 58,
   "air": 58,
   "navy": 45,
   "missile": 35,
   "airDefense": 65,
   "cyber": 72,
   "drone": 55
  },
  "energy": {
   "production": 90,
   "consumption": 290
  },
  "terrain": "plain",
  "pos": [
   13.4,
   52.52
  ],
  "borderPos": {
   "CHE": [
    8.4,
    47.69
   ],
   "POL": [
    14.69,
    52.15
   ],
   "NLD": [
    6.52,
    51.85
   ],
   "LUX": [
    6.49,
    49.8
   ],
   "FRA": [
    7.45,
    49.15
   ],
   "DNK": [
    9.34,
    54.81
   ],
   "CZE": [
    12.45,
    50.35
   ],
   "BEL": [
    6.2,
    50.5
   ],
   "AUT": [
    12.36,
    47.69
   ]
  },
  "neighbors": [
   "AUT",
   "BEL",
   "CHE",
   "CZE",
   "DNK",
   "FRA",
   "LUX",
   "NLD",
   "POL"
  ],
  "seaNeighbors": [
   "SWE"
  ]
 },
 "ITA": {
  "id": "ITA",
  "name": "ایتالیا",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "رم",
  "gov": "D",
  "gdp": 2400,
  "population": 58.9,
  "stability": 63,
  "militarySpendPct": 1.6,
  "inflation": 1.5,
  "debtRatio": 1.37,
  "military": {
   "active": 165,
   "nuclear": false,
   "land": 50,
   "air": 60,
   "navy": 62,
   "missile": 35,
   "airDefense": 55,
   "cyber": 60,
   "drone": 50
  },
  "energy": {
   "production": 35,
   "consumption": 150
  },
  "terrain": "mountain",
  "pos": [
   12.5,
   41.9
  ],
  "borderPos": {
   "CHE": [
    9.07,
    46.1
   ],
   "VAT": [
    12.43,
    41.91
   ],
   "SVN": [
    13.55,
    46.09
   ],
   "SMR": [
    12.44,
    43.98
   ],
   "FRA": [
    6.94,
    44.86
   ],
   "AUT": [
    11.97,
    47.04
   ]
  },
  "neighbors": [
   "AUT",
   "CHE",
   "FRA",
   "SMR",
   "SVN",
   "VAT"
  ],
  "seaNeighbors": [
   "ALB",
   "GRC",
   "LBY",
   "MLT",
   "TUN"
  ]
 },
 "ESP": {
  "id": "ESP",
  "name": "اسپانیا",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "مادرید",
  "gov": "D",
  "gdp": 1800,
  "population": 49,
  "stability": 65,
  "militarySpendPct": 1.3,
  "inflation": 2.5,
  "debtRatio": 1.02,
  "military": {
   "active": 120,
   "nuclear": false,
   "land": 45,
   "air": 55,
   "navy": 50,
   "missile": 25,
   "airDefense": 45,
   "cyber": 55,
   "drone": 40
  },
  "energy": {
   "production": 35,
   "consumption": 120
  },
  "terrain": "plain",
  "pos": [
   -3.7,
   40.42
  ],
  "borderPos": {
   "PRT": [
    -6.88,
    41.06
   ],
   "FRA": [
    -0.55,
    42.8
   ],
   "AND": [
    1.45,
    42.44
   ]
  },
  "neighbors": [
   "AND",
   "FRA",
   "PRT"
  ],
  "seaNeighbors": [
   "MAR"
  ]
 },
 "PRT": {
  "id": "PRT",
  "name": "پرتغال",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 320,
  "population": 10.6,
  "stability": 75,
  "militarySpendPct": 1.6,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 41,
   "nuclear": false,
   "land": 25,
   "air": 23,
   "navy": 14,
   "missile": 9,
   "airDefense": 18,
   "cyber": 16,
   "drone": 13
  },
  "energy": {
   "production": 15.2,
   "consumption": 30.4
  },
  "terrain": "plain",
  "pos": [
   -7.98,
   39.65
  ],
  "borderPos": {
   "ESP": [
    -6.88,
    41.06
   ]
  },
  "neighbors": [
   "ESP"
  ],
  "seaNeighbors": []
 },
 "NLD": {
  "id": "NLD",
  "name": "هلند",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 1250,
  "population": 18,
  "stability": 78,
  "militarySpendPct": 2,
  "inflation": 3,
  "debtRatio": 0.45,
  "military": {
   "active": 81,
   "nuclear": false,
   "land": 45,
   "air": 46,
   "navy": 28,
   "missile": 21,
   "airDefense": 37,
   "cyber": 37,
   "drone": 30
  },
  "energy": {
   "production": 30,
   "consumption": 65
  },
  "terrain": "plain",
  "pos": [
   5.63,
   52.28
  ],
  "borderPos": {
   "DEU": [
    6.52,
    51.85
   ],
   "BEL": [
    4.82,
    51.41
   ]
  },
  "neighbors": [
   "BEL",
   "DEU"
  ],
  "seaNeighbors": [
   "GBR"
  ]
 },
 "BEL": {
  "id": "BEL",
  "name": "بلژیک",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 680,
  "population": 11.9,
  "stability": 72,
  "militarySpendPct": 1.3,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 41,
   "nuclear": false,
   "land": 31,
   "air": 32,
   "navy": 19,
   "missile": 14,
   "airDefense": 25,
   "cyber": 24,
   "drone": 20
  },
  "energy": {
   "production": 31.5,
   "consumption": 63
  },
  "terrain": "plain",
  "pos": [
   4.65,
   50.64
  ],
  "borderPos": {
   "NLD": [
    4.82,
    51.41
   ],
   "LUX": [
    5.74,
    49.88
   ],
   "DEU": [
    6.2,
    50.5
   ],
   "FRA": [
    4.16,
    50.13
   ]
  },
  "neighbors": [
   "DEU",
   "FRA",
   "LUX",
   "NLD"
  ],
  "seaNeighbors": [
   "GBR"
  ]
 },
 "LUX": {
  "id": "LUX",
  "name": "لوکزامبورگ",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 95,
  "population": 0.67,
  "stability": 88,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 2,
   "nuclear": false,
   "land": 9,
   "air": 10,
   "navy": 6,
   "missile": 4,
   "airDefense": 8,
   "cyber": 8,
   "drone": 6
  },
  "energy": {
   "production": 4.4,
   "consumption": 8.7
  },
  "terrain": "plain",
  "pos": [
   6.07,
   49.77
  ],
  "borderPos": {
   "DEU": [
    6.49,
    49.8
   ],
   "FRA": [
    6.01,
    49.45
   ],
   "BEL": [
    5.74,
    49.88
   ]
  },
  "neighbors": [
   "BEL",
   "DEU",
   "FRA"
  ],
  "seaNeighbors": []
 },
 "CHE": {
  "id": "CHE",
  "name": "سوئیس",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 1000,
  "population": 9,
  "stability": 92,
  "militarySpendPct": 0.7,
  "inflation": 0.5,
  "debtRatio": 0.38,
  "military": {
   "active": 23,
   "nuclear": false,
   "land": 29,
   "air": 30,
   "navy": 18,
   "missile": 14,
   "airDefense": 24,
   "cyber": 24,
   "drone": 20
  },
  "energy": {
   "production": 12,
   "consumption": 25
  },
  "terrain": "plain",
  "pos": [
   8.21,
   46.8
  ],
  "borderPos": {
   "LIE": [
    9.49,
    47.06
   ],
   "ITA": [
    9.07,
    46.1
   ],
   "DEU": [
    8.4,
    47.69
   ],
   "FRA": [
    6.11,
    46.52
   ],
   "AUT": [
    10,
    46.88
   ]
  },
  "neighbors": [
   "AUT",
   "DEU",
   "FRA",
   "ITA",
   "LIE"
  ],
  "seaNeighbors": []
 },
 "AUT": {
  "id": "AUT",
  "name": "اتریش",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 540,
  "population": 9.2,
  "stability": 82,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 28,
   "nuclear": false,
   "land": 26,
   "air": 26,
   "navy": 16,
   "missile": 11,
   "airDefense": 21,
   "cyber": 20,
   "drone": 16
  },
  "energy": {
   "production": 25,
   "consumption": 50
  },
  "terrain": "plain",
  "pos": [
   14.11,
   47.59
  ],
  "borderPos": {
   "CHE": [
    10,
    46.88
   ],
   "SVK": [
    16.86,
    48.44
   ],
   "SVN": [
    14.84,
    46.58
   ],
   "LIE": [
    9.57,
    47.16
   ],
   "ITA": [
    11.97,
    47.04
   ],
   "HUN": [
    16.64,
    47.61
   ],
   "DEU": [
    12.36,
    47.69
   ],
   "CZE": [
    15.16,
    48.95
   ]
  },
  "neighbors": [
   "CHE",
   "CZE",
   "DEU",
   "HUN",
   "ITA",
   "LIE",
   "SVK",
   "SVN"
  ],
  "seaNeighbors": []
 },
 "IRL": {
  "id": "IRL",
  "name": "ایرلند",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 600,
  "population": 5.4,
  "stability": 82,
  "militarySpendPct": 0.2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 10,
   "nuclear": false,
   "land": 11,
   "air": 11,
   "navy": 7,
   "missile": 5,
   "airDefense": 9,
   "cyber": 9,
   "drone": 7
  },
  "energy": {
   "production": 27.4,
   "consumption": 54.8
  },
  "terrain": "plain",
  "pos": [
   -8.14,
   53.16
  ],
  "borderPos": {
   "GBR": [
    -7.61,
    54.14
   ]
  },
  "neighbors": [
   "GBR"
  ],
  "seaNeighbors": [
   "FRA"
  ]
 },
 "DNK": {
  "id": "DNK",
  "name": "دانمارک",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 440,
  "population": 6,
  "stability": 88,
  "militarySpendPct": 2.4,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 31,
   "nuclear": false,
   "land": 34,
   "air": 35,
   "navy": 21,
   "missile": 16,
   "airDefense": 28,
   "cyber": 28,
   "drone": 23
  },
  "energy": {
   "production": 20.3,
   "consumption": 40.5
  },
  "terrain": "plain",
  "pos": [
   9.35,
   56.23
  ],
  "borderPos": {
   "DEU": [
    9.34,
    54.81
   ]
  },
  "neighbors": [
   "DEU"
  ],
  "seaNeighbors": [
   "GBR",
   "SWE"
  ]
 },
 "NOR": {
  "id": "NOR",
  "name": "نروژ",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "اسلو",
  "gov": "D",
  "gdp": 520,
  "population": 5.6,
  "stability": 90,
  "militarySpendPct": 2.2,
  "inflation": 3,
  "debtRatio": 0.4,
  "military": {
   "active": 25,
   "nuclear": false,
   "land": 25,
   "air": 35,
   "navy": 35,
   "missile": 15,
   "airDefense": 30,
   "cyber": 45,
   "drone": 25
  },
  "energy": {
   "production": 220,
   "consumption": 45
  },
  "terrain": "mountain",
  "pos": [
   10.75,
   59.91
  ],
  "borderPos": {
   "SWE": [
    14.14,
    64.17
   ],
   "RUS": [
    30.2,
    69.58
   ],
   "FIN": [
    25.25,
    68.82
   ]
  },
  "neighbors": [
   "FIN",
   "RUS",
   "SWE"
  ],
  "seaNeighbors": [
   "GBR"
  ]
 },
 "SWE": {
  "id": "SWE",
  "name": "سوئد",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 650,
  "population": 10.6,
  "stability": 82,
  "militarySpendPct": 2.4,
  "inflation": 2,
  "debtRatio": 0.33,
  "military": {
   "active": 54,
   "nuclear": false,
   "land": 39,
   "air": 39,
   "navy": 24,
   "missile": 17,
   "airDefense": 31,
   "cyber": 31,
   "drone": 25
  },
  "energy": {
   "production": 30.1,
   "consumption": 60.1
  },
  "terrain": "plain",
  "pos": [
   16.25,
   62.43
  ],
  "borderPos": {
   "NOR": [
    14.14,
    64.17
   ],
   "FIN": [
    23.46,
    67.46
   ]
  },
  "neighbors": [
   "FIN",
   "NOR"
  ],
  "seaNeighbors": [
   "DEU",
   "DNK",
   "LTU",
   "POL",
   "RUS"
  ]
 },
 "FIN": {
  "id": "FIN",
  "name": "فنلاند",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 310,
  "population": 5.6,
  "stability": 86,
  "militarySpendPct": 2.4,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 29,
   "nuclear": false,
   "land": 29,
   "air": 29,
   "navy": 18,
   "missile": 13,
   "airDefense": 24,
   "cyber": 23,
   "drone": 18
  },
  "energy": {
   "production": 14.4,
   "consumption": 28.7
  },
  "terrain": "plain",
  "pos": [
   26.21,
   64.26
  ],
  "borderPos": {
   "SWE": [
    23.46,
    67.46
   ],
   "RUS": [
    29.81,
    65.11
   ],
   "NOR": [
    25.25,
    68.82
   ]
  },
  "neighbors": [
   "NOR",
   "RUS",
   "SWE"
  ],
  "seaNeighbors": [
   "EST"
  ]
 },
 "ISL": {
  "id": "ISL",
  "name": "ایسلند",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 36,
  "population": 0.39,
  "stability": 90,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 1,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 1.7,
   "consumption": 3.3
  },
  "terrain": "plain",
  "pos": [
   -18.58,
   65
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "GBR"
  ]
 },
 "POL": {
  "id": "POL",
  "name": "لهستان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "ورشو",
  "gov": "D",
  "gdp": 980,
  "population": 37.5,
  "stability": 70,
  "militarySpendPct": 4.5,
  "inflation": 4,
  "debtRatio": 0.58,
  "military": {
   "active": 200,
   "nuclear": false,
   "land": 62,
   "air": 52,
   "navy": 25,
   "missile": 40,
   "airDefense": 55,
   "cyber": 50,
   "drone": 45
  },
  "energy": {
   "production": 60,
   "consumption": 105
  },
  "terrain": "plain",
  "pos": [
   21.01,
   52.23
  ],
  "borderPos": {
   "UKR": [
    23.71,
    50.38
   ],
   "SVK": [
    20.16,
    49.32
   ],
   "RUS": [
    20.67,
    54.41
   ],
   "LTU": [
    23.17,
    54.28
   ],
   "DEU": [
    14.69,
    52.15
   ],
   "CZE": [
    16.84,
    50.19
   ],
   "BLR": [
    23.18,
    52.29
   ]
  },
  "neighbors": [
   "BLR",
   "CZE",
   "DEU",
   "LTU",
   "RUS",
   "SVK",
   "UKR"
  ],
  "seaNeighbors": [
   "SWE"
  ]
 },
 "CZE": {
  "id": "CZE",
  "name": "چک",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 380,
  "population": 10.9,
  "stability": 76,
  "militarySpendPct": 2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 49,
   "nuclear": false,
   "land": 30,
   "air": 28,
   "navy": 17,
   "missile": 11,
   "airDefense": 22,
   "cyber": 20,
   "drone": 16
  },
  "energy": {
   "production": 17.9,
   "consumption": 35.8
  },
  "terrain": "plain",
  "pos": [
   15.32,
   49.74
  ],
  "borderPos": {
   "SVK": [
    18.08,
    49.07
   ],
   "POL": [
    16.84,
    50.19
   ],
   "DEU": [
    12.45,
    50.35
   ],
   "AUT": [
    15.16,
    48.95
   ]
  },
  "neighbors": [
   "AUT",
   "DEU",
   "POL",
   "SVK"
  ],
  "seaNeighbors": []
 },
 "SVK": {
  "id": "SVK",
  "name": "اسلواکی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 150,
  "population": 5.4,
  "stability": 65,
  "militarySpendPct": 2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 24,
   "nuclear": false,
   "land": 19,
   "air": 17,
   "navy": 11,
   "missile": 7,
   "airDefense": 14,
   "cyber": 12,
   "drone": 10
  },
  "energy": {
   "production": 7.2,
   "consumption": 14.3
  },
  "terrain": "plain",
  "pos": [
   19.47,
   48.71
  ],
  "borderPos": {
   "UKR": [
    22.39,
    48.87
   ],
   "POL": [
    20.16,
    49.32
   ],
   "HUN": [
    19.71,
    48.2
   ],
   "CZE": [
    18.08,
    49.07
   ],
   "AUT": [
    16.86,
    48.44
   ]
  },
  "neighbors": [
   "AUT",
   "CZE",
   "HUN",
   "POL",
   "UKR"
  ],
  "seaNeighbors": []
 },
 "HUN": {
  "id": "HUN",
  "name": "مجارستان",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 240,
  "population": 9.6,
  "stability": 62,
  "militarySpendPct": 2.1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 45,
   "nuclear": false,
   "land": 25,
   "air": 22,
   "navy": 14,
   "missile": 9,
   "airDefense": 18,
   "cyber": 15,
   "drone": 13
  },
  "energy": {
   "production": 11.5,
   "consumption": 23
  },
  "terrain": "plain",
  "pos": [
   19.38,
   47.17
  ],
  "borderPos": {
   "UKR": [
    22.52,
    48.21
   ],
   "SVK": [
    19.71,
    48.2
   ],
   "SVN": [
    16.37,
    46.7
   ],
   "SRB": [
    19.39,
    46.05
   ],
   "ROU": [
    21.49,
    46.79
   ],
   "HRV": [
    17.71,
    45.83
   ],
   "AUT": [
    16.64,
    47.61
   ]
  },
  "neighbors": [
   "AUT",
   "HRV",
   "ROU",
   "SRB",
   "SVK",
   "SVN",
   "UKR"
  ],
  "seaNeighbors": []
 },
 "ROU": {
  "id": "ROU",
  "name": "رومانی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 400,
  "population": 19,
  "stability": 60,
  "militarySpendPct": 2.3,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 94,
   "nuclear": false,
   "land": 32,
   "air": 28,
   "navy": 17,
   "missile": 11,
   "airDefense": 22,
   "cyber": 19,
   "drone": 15
  },
  "energy": {
   "production": 19.5,
   "consumption": 38.9
  },
  "terrain": "plain",
  "pos": [
   24.98,
   45.85
  ],
  "borderPos": {
   "UKR": [
    24.49,
    47.95
   ],
   "SRB": [
    21.35,
    45.01
   ],
   "MDA": [
    27.97,
    47.04
   ],
   "HUN": [
    21.49,
    46.79
   ],
   "BGR": [
    25.68,
    43.71
   ]
  },
  "neighbors": [
   "BGR",
   "HUN",
   "MDA",
   "SRB",
   "UKR"
  ],
  "seaNeighbors": [
   "TUR"
  ]
 },
 "BGR": {
  "id": "BGR",
  "name": "بلغارستان",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 120,
  "population": 6.4,
  "stability": 58,
  "militarySpendPct": 2.2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 31,
   "nuclear": false,
   "land": 18,
   "air": 15,
   "navy": 9,
   "missile": 6,
   "airDefense": 12,
   "cyber": 10,
   "drone": 8
  },
  "energy": {
   "production": 5.9,
   "consumption": 11.8
  },
  "terrain": "plain",
  "pos": [
   25.21,
   42.77
  ],
  "borderPos": {
   "TUR": [
    27.01,
    42.06
   ],
   "SRB": [
    22.98,
    43.19
   ],
   "ROU": [
    25.68,
    43.71
   ],
   "MKD": [
    22.94,
    41.78
   ],
   "GRC": [
    24.77,
    41.36
   ]
  },
  "neighbors": [
   "GRC",
   "MKD",
   "ROU",
   "SRB",
   "TUR"
  ],
  "seaNeighbors": []
 },
 "GRC": {
  "id": "GRC",
  "name": "یونان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "آتن",
  "gov": "D",
  "gdp": 270,
  "population": 10.4,
  "stability": 65,
  "militarySpendPct": 3.1,
  "inflation": 2.8,
  "debtRatio": 1.5,
  "military": {
   "active": 140,
   "nuclear": false,
   "land": 48,
   "air": 52,
   "navy": 45,
   "missile": 30,
   "airDefense": 45,
   "cyber": 35,
   "drone": 30
  },
  "energy": {
   "production": 8,
   "consumption": 22
  },
  "terrain": "mountain",
  "pos": [
   23.73,
   37.98
  ],
  "borderPos": {
   "TUR": [
    26.33,
    41.24
   ],
   "MKD": [
    21.99,
    41.13
   ],
   "BGR": [
    24.77,
    41.36
   ],
   "ALB": [
    20.41,
    40.05
   ]
  },
  "neighbors": [
   "ALB",
   "BGR",
   "MKD",
   "TUR"
  ],
  "seaNeighbors": [
   "CYP",
   "ITA"
  ]
 },
 "HRV": {
  "id": "HRV",
  "name": "کرواسی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 100,
  "population": 3.9,
  "stability": 70,
  "militarySpendPct": 1.8,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 16,
   "nuclear": false,
   "land": 14,
   "air": 13,
   "navy": 8,
   "missile": 5,
   "airDefense": 10,
   "cyber": 9,
   "drone": 7
  },
  "energy": {
   "production": 4.8,
   "consumption": 9.6
  },
  "terrain": "plain",
  "pos": [
   16.42,
   45.16
  ],
  "borderPos": {
   "SVN": [
    15.29,
    45.61
   ],
   "SRB": [
    19.35,
    45.25
   ],
   "MNE": [
    18.44,
    42.52
   ],
   "HUN": [
    17.71,
    45.83
   ],
   "BIH": [
    16.23,
    45.03
   ]
  },
  "neighbors": [
   "BIH",
   "HUN",
   "MNE",
   "SRB",
   "SVN"
  ],
  "seaNeighbors": []
 },
 "SVN": {
  "id": "SVN",
  "name": "اسلوونی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 75,
  "population": 2.1,
  "stability": 78,
  "militarySpendPct": 1.3,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 7,
   "nuclear": false,
   "land": 9,
   "air": 9,
   "navy": 5,
   "missile": 4,
   "airDefense": 7,
   "cyber": 6,
   "drone": 5
  },
  "energy": {
   "production": 3.6,
   "consumption": 7.1
  },
  "terrain": "plain",
  "pos": [
   14.8,
   46.12
  ],
  "borderPos": {
   "ITA": [
    13.55,
    46.09
   ],
   "HUN": [
    16.37,
    46.7
   ],
   "HRV": [
    15.29,
    45.61
   ],
   "AUT": [
    14.84,
    46.58
   ]
  },
  "neighbors": [
   "AUT",
   "HRV",
   "HUN",
   "ITA"
  ],
  "seaNeighbors": []
 },
 "SRB": {
  "id": "SRB",
  "name": "صربستان",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 95,
  "population": 6.6,
  "stability": 55,
  "militarySpendPct": 2.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 35,
   "nuclear": false,
   "land": 17,
   "air": 14,
   "navy": 9,
   "missile": 5,
   "airDefense": 11,
   "cyber": 9,
   "drone": 7
  },
  "energy": {
   "production": 4.8,
   "consumption": 9.5
  },
  "terrain": "plain",
  "pos": [
   20.81,
   44.21
  ],
  "borderPos": {
   "XKX": [
    20.97,
    43.12
   ],
   "ROU": [
    21.35,
    45.01
   ],
   "MNE": [
    19.67,
    43.16
   ],
   "MKD": [
    21.98,
    42.32
   ],
   "HUN": [
    19.39,
    46.05
   ],
   "HRV": [
    19.35,
    45.25
   ],
   "BGR": [
    22.98,
    43.19
   ],
   "BIH": [
    19.55,
    44.07
   ]
  },
  "neighbors": [
   "BGR",
   "BIH",
   "HRV",
   "HUN",
   "MKD",
   "MNE",
   "ROU",
   "XKX"
  ],
  "seaNeighbors": []
 },
 "BIH": {
  "id": "BIH",
  "name": "بوسنی و هرزگوین",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 30,
  "population": 3.2,
  "stability": 45,
  "militarySpendPct": 0.8,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 9,
   "nuclear": false,
   "land": 3,
   "air": 2,
   "navy": 1,
   "missile": 1,
   "airDefense": 2,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 1.6,
   "consumption": 3.2
  },
  "terrain": "plain",
  "pos": [
   17.77,
   44.17
  ],
  "borderPos": {
   "SRB": [
    19.55,
    44.07
   ],
   "MNE": [
    18.75,
    43.28
   ],
   "HRV": [
    16.23,
    45.03
   ]
  },
  "neighbors": [
   "HRV",
   "MNE",
   "SRB"
  ],
  "seaNeighbors": []
 },
 "MNE": {
  "id": "MNE",
  "name": "مونته‌نگرو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 8,
  "population": 0.62,
  "stability": 60,
  "militarySpendPct": 1.7,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 3,
   "nuclear": false,
   "land": 2,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 0.4,
   "consumption": 0.8
  },
  "terrain": "plain",
  "pos": [
   19.24,
   42.79
  ],
  "borderPos": {
   "SRB": [
    19.67,
    43.16
   ],
   "XKX": [
    20.03,
    42.73
   ],
   "HRV": [
    18.44,
    42.52
   ],
   "BIH": [
    18.75,
    43.28
   ],
   "ALB": [
    19.6,
    42.57
   ]
  },
  "neighbors": [
   "ALB",
   "BIH",
   "HRV",
   "SRB",
   "XKX"
  ],
  "seaNeighbors": []
 },
 "MKD": {
  "id": "MKD",
  "name": "مقدونیه شمالی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 16,
  "population": 1.8,
  "stability": 58,
  "militarySpendPct": 2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 8,
   "nuclear": false,
   "land": 4,
   "air": 3,
   "navy": 2,
   "missile": 1,
   "airDefense": 2,
   "cyber": 2,
   "drone": 1
  },
  "energy": {
   "production": 0.9,
   "consumption": 1.7
  },
  "terrain": "plain",
  "pos": [
   21.68,
   41.6
  ],
  "borderPos": {
   "SRB": [
    21.98,
    42.32
   ],
   "XKX": [
    21.14,
    42.18
   ],
   "GRC": [
    21.99,
    41.13
   ],
   "BGR": [
    22.94,
    41.78
   ],
   "ALB": [
    20.49,
    41.27
   ]
  },
  "neighbors": [
   "ALB",
   "BGR",
   "GRC",
   "SRB",
   "XKX"
  ],
  "seaNeighbors": []
 },
 "ALB": {
  "id": "ALB",
  "name": "آلبانی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 27,
  "population": 2.7,
  "stability": 60,
  "militarySpendPct": 2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 12,
   "nuclear": false,
   "land": 6,
   "air": 5,
   "navy": 3,
   "missile": 2,
   "airDefense": 4,
   "cyber": 3,
   "drone": 2
  },
  "energy": {
   "production": 1.4,
   "consumption": 2.8
  },
  "terrain": "plain",
  "pos": [
   20.05,
   41.13
  ],
  "borderPos": {
   "MNE": [
    19.6,
    42.57
   ],
   "MKD": [
    20.49,
    41.27
   ],
   "XKX": [
    20.41,
    42.28
   ],
   "GRC": [
    20.41,
    40.05
   ]
  },
  "neighbors": [
   "GRC",
   "MKD",
   "MNE",
   "XKX"
  ],
  "seaNeighbors": [
   "ITA"
  ]
 },
 "XKX": {
  "id": "XKX",
  "name": "کوزوو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 11,
  "population": 1.6,
  "stability": 52,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 5,
   "nuclear": false,
   "land": 1,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 1,
   "drone": 0
  },
  "energy": {
   "production": 0.6,
   "consumption": 1.2
  },
  "terrain": "plain",
  "pos": [
   20.87,
   42.57
  ],
  "borderPos": {
   "SRB": [
    20.97,
    43.12
   ],
   "MNE": [
    20.03,
    42.73
   ],
   "MKD": [
    21.14,
    42.18
   ],
   "ALB": [
    20.41,
    42.28
   ]
  },
  "neighbors": [
   "ALB",
   "MKD",
   "MNE",
   "SRB"
  ],
  "seaNeighbors": []
 },
 "EST": {
  "id": "EST",
  "name": "استونی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 44,
  "population": 1.37,
  "stability": 80,
  "militarySpendPct": 3.4,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 9,
   "nuclear": false,
   "land": 13,
   "air": 12,
   "navy": 7,
   "missile": 5,
   "airDefense": 9,
   "cyber": 8,
   "drone": 7
  },
  "energy": {
   "production": 2.1,
   "consumption": 4.2
  },
  "terrain": "plain",
  "pos": [
   25.84,
   58.68
  ],
  "borderPos": {
   "RUS": [
    27.53,
    58.38
   ],
   "LVA": [
    25.72,
    57.91
   ]
  },
  "neighbors": [
   "LVA",
   "RUS"
  ],
  "seaNeighbors": [
   "FIN"
  ]
 },
 "LVA": {
  "id": "LVA",
  "name": "لتونی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 45,
  "population": 1.86,
  "stability": 75,
  "militarySpendPct": 3.3,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 12,
   "nuclear": false,
   "land": 13,
   "air": 11,
   "navy": 7,
   "missile": 4,
   "airDefense": 9,
   "cyber": 8,
   "drone": 6
  },
  "energy": {
   "production": 2.2,
   "consumption": 4.3
  },
  "terrain": "plain",
  "pos": [
   24.92,
   56.86
  ],
  "borderPos": {
   "LTU": [
    24.37,
    56.28
   ],
   "RUS": [
    27.66,
    56.84
   ],
   "EST": [
    25.72,
    57.91
   ],
   "BLR": [
    27.46,
    55.8
   ]
  },
  "neighbors": [
   "BLR",
   "EST",
   "LTU",
   "RUS"
  ],
  "seaNeighbors": []
 },
 "LTU": {
  "id": "LTU",
  "name": "لیتوانی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 85,
  "population": 2.88,
  "stability": 76,
  "militarySpendPct": 3,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 17,
   "nuclear": false,
   "land": 17,
   "air": 16,
   "navy": 10,
   "missile": 6,
   "airDefense": 13,
   "cyber": 11,
   "drone": 9
  },
  "energy": {
   "production": 4.1,
   "consumption": 8.1
  },
  "terrain": "plain",
  "pos": [
   23.9,
   55.32
  ],
  "borderPos": {
   "RUS": [
    22.57,
    55.06
   ],
   "POL": [
    23.17,
    54.28
   ],
   "LVA": [
    24.37,
    56.28
   ],
   "BLR": [
    25.7,
    54.29
   ]
  },
  "neighbors": [
   "BLR",
   "LVA",
   "POL",
   "RUS"
  ],
  "seaNeighbors": [
   "SWE"
  ]
 },
 "BLR": {
  "id": "BLR",
  "name": "بلاروس",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "مینسک",
  "gov": "A",
  "gdp": 75,
  "population": 9.1,
  "stability": 55,
  "militarySpendPct": 1.5,
  "inflation": 6,
  "debtRatio": 0.4,
  "military": {
   "active": 48,
   "nuclear": false,
   "land": 30,
   "air": 18,
   "navy": 0,
   "missile": 30,
   "airDefense": 35,
   "cyber": 20,
   "drone": 15
  },
  "energy": {
   "production": 4,
   "consumption": 25
  },
  "terrain": "plain",
  "pos": [
   27.56,
   53.9
  ],
  "borderPos": {
   "UKR": [
    28.29,
    51.58
   ],
   "RUS": [
    31.08,
    54.52
   ],
   "POL": [
    23.18,
    52.29
   ],
   "LTU": [
    25.7,
    54.29
   ],
   "LVA": [
    27.46,
    55.8
   ]
  },
  "neighbors": [
   "LTU",
   "LVA",
   "POL",
   "RUS",
   "UKR"
  ],
  "seaNeighbors": []
 },
 "UKR": {
  "id": "UKR",
  "name": "اوکراین",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "کی‌یف",
  "gov": "D",
  "gdp": 190,
  "population": 33,
  "stability": 40,
  "militarySpendPct": 26,
  "inflation": 12,
  "debtRatio": 0.95,
  "military": {
   "active": 900,
   "nuclear": false,
   "land": 70,
   "air": 40,
   "navy": 15,
   "missile": 50,
   "airDefense": 60,
   "cyber": 70,
   "drone": 92
  },
  "energy": {
   "production": 55,
   "consumption": 85
  },
  "terrain": "plain",
  "pos": [
   30.52,
   50.45
  ],
  "borderPos": {
   "SVK": [
    22.39,
    48.87
   ],
   "RUS": [
    37.95,
    49.96
   ],
   "ROU": [
    24.49,
    47.95
   ],
   "POL": [
    23.71,
    50.38
   ],
   "MDA": [
    29.51,
    47.09
   ],
   "HUN": [
    22.52,
    48.21
   ],
   "BLR": [
    28.29,
    51.58
   ]
  },
  "neighbors": [
   "BLR",
   "HUN",
   "MDA",
   "POL",
   "ROU",
   "RUS",
   "SVK"
  ],
  "seaNeighbors": [
   "TUR"
  ]
 },
 "MDA": {
  "id": "MDA",
  "name": "مولداوی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 19,
  "population": 2.4,
  "stability": 48,
  "militarySpendPct": 0.6,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 6,
   "nuclear": false,
   "land": 1,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 1.1,
   "consumption": 2.1
  },
  "terrain": "plain",
  "pos": [
   28.47,
   47.19
  ],
  "borderPos": {
   "UKR": [
    29.51,
    47.09
   ],
   "ROU": [
    27.97,
    47.04
   ]
  },
  "neighbors": [
   "ROU",
   "UKR"
  ],
  "seaNeighbors": []
 },
 "CYP": {
  "id": "CYP",
  "name": "قبرس",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 37,
  "population": 1.4,
  "stability": 72,
  "militarySpendPct": 1.8,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 6,
   "nuclear": false,
   "land": 7,
   "air": 6,
   "navy": 4,
   "missile": 3,
   "airDefense": 5,
   "cyber": 4,
   "drone": 4
  },
  "energy": {
   "production": 1.8,
   "consumption": 3.5
  },
  "terrain": "plain",
  "pos": [
   33.01,
   34.92
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "GRC",
   "ISR",
   "LBN",
   "SYR",
   "TUR"
  ]
 },
 "MLT": {
  "id": "MLT",
  "name": "مالت",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 25,
  "population": 0.55,
  "stability": 78,
  "militarySpendPct": 0.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 1,
   "nuclear": false,
   "land": 2,
   "air": 2,
   "navy": 1,
   "missile": 1,
   "airDefense": 1,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 1.2,
   "consumption": 2.3
  },
  "terrain": "plain",
  "pos": [
   14.44,
   35.89
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "ITA"
  ]
 },
 "AND": {
  "id": "AND",
  "name": "آندورا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 4,
  "population": 0.08,
  "stability": 90,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.2,
   "consumption": 0.4
  },
  "terrain": "plain",
  "pos": [
   1.56,
   42.54
  ],
  "borderPos": {
   "ESP": [
    1.45,
    42.44
   ],
   "FRA": [
    1.71,
    42.6
   ]
  },
  "neighbors": [
   "ESP",
   "FRA"
  ],
  "seaNeighbors": []
 },
 "MCO": {
  "id": "MCO",
  "name": "موناکو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "M",
  "gdp": 9,
  "population": 0.04,
  "stability": 92,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.4,
   "consumption": 0.8
  },
  "terrain": "plain",
  "pos": [
   7.41,
   43.75
  ],
  "borderPos": {
   "FRA": [
    7.41,
    43.77
   ]
  },
  "neighbors": [
   "FRA"
  ],
  "seaNeighbors": []
 },
 "SMR": {
  "id": "SMR",
  "name": "سان‌مارینو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 2,
  "population": 0.03,
  "stability": 90,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.1,
   "consumption": 0.2
  },
  "terrain": "plain",
  "pos": [
   12.46,
   43.94
  ],
  "borderPos": {
   "ITA": [
    12.44,
    43.98
   ]
  },
  "neighbors": [
   "ITA"
  ],
  "seaNeighbors": []
 },
 "LIE": {
  "id": "LIE",
  "name": "لیختن‌اشتاین",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "M",
  "gdp": 7,
  "population": 0.04,
  "stability": 92,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.3,
   "consumption": 0.6
  },
  "terrain": "plain",
  "pos": [
   9.54,
   47.14
  ],
  "borderPos": {
   "CHE": [
    9.49,
    47.06
   ],
   "AUT": [
    9.57,
    47.16
   ]
  },
  "neighbors": [
   "AUT",
   "CHE"
  ],
  "seaNeighbors": []
 },
 "VAT": {
  "id": "VAT",
  "name": "واتیکان",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "T",
  "gdp": 0.3,
  "population": 0.001,
  "stability": 95,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0,
   "consumption": 0
  },
  "terrain": "plain",
  "pos": [
   12.43,
   41.9
  ],
  "borderPos": {
   "ITA": [
    12.43,
    41.91
   ]
  },
  "neighbors": [
   "ITA"
  ],
  "seaNeighbors": []
 },
 "RUS": {
  "id": "RUS",
  "name": "روسیه",
  "playable": true,
  "difficulty": 4,
  "detailed": true,
  "capital": "مسکو",
  "gov": "A",
  "gdp": 2100,
  "population": 144,
  "stability": 55,
  "militarySpendPct": 6.5,
  "inflation": 8,
  "debtRatio": 0.2,
  "military": {
   "active": 1320,
   "nuclear": true,
   "land": 88,
   "air": 78,
   "navy": 62,
   "missile": 95,
   "airDefense": 90,
   "cyber": 85,
   "drone": 75
  },
  "energy": {
   "production": 1500,
   "consumption": 800
  },
  "terrain": "plain",
  "pos": [
   37.62,
   55.75
  ],
  "borderPos": {
   "UKR": [
    37.95,
    49.96
   ],
   "POL": [
    20.67,
    54.41
   ],
   "NOR": [
    30.2,
    69.58
   ],
   "PRK": [
    130.62,
    42.42
   ],
   "MNG": [
    97.95,
    51.35
   ],
   "LTU": [
    22.57,
    55.06
   ],
   "LVA": [
    27.66,
    56.84
   ],
   "KAZ": [
    61.93,
    53.95
   ],
   "GEO": [
    43.83,
    42.57
   ],
   "FIN": [
    29.81,
    65.11
   ],
   "EST": [
    27.53,
    58.38
   ],
   "CHN": [
    129.59,
    49.29
   ],
   "BLR": [
    31.08,
    54.52
   ],
   "AZE": [
    47.21,
    41.46
   ]
  },
  "neighbors": [
   "AZE",
   "BLR",
   "CHN",
   "EST",
   "FIN",
   "GEO",
   "KAZ",
   "LTU",
   "LVA",
   "MNG",
   "NOR",
   "POL",
   "PRK",
   "UKR"
  ],
  "seaNeighbors": [
   "IRN",
   "JPN",
   "SWE",
   "TUR",
   "USA"
  ]
 },
 "TUR": {
  "id": "TUR",
  "name": "ترکیه",
  "playable": true,
  "difficulty": 3,
  "detailed": true,
  "capital": "آنکارا",
  "gov": "H",
  "gdp": 1350,
  "population": 86,
  "stability": 52,
  "militarySpendPct": 1.9,
  "inflation": 35,
  "debtRatio": 0.3,
  "military": {
   "active": 355,
   "nuclear": false,
   "land": 72,
   "air": 62,
   "navy": 58,
   "missile": 52,
   "airDefense": 48,
   "cyber": 55,
   "drone": 82
  },
  "energy": {
   "production": 48,
   "consumption": 165
  },
  "terrain": "mountain",
  "pos": [
   32.86,
   39.93
  ],
  "borderPos": {
   "SYR": [
    38.19,
    36.9
   ],
   "IRQ": [
    44.01,
    37.31
   ],
   "IRN": [
    44.32,
    38.37
   ],
   "GRC": [
    26.33,
    41.24
   ],
   "GEO": [
    42.76,
    41.58
   ],
   "BGR": [
    27.01,
    42.06
   ],
   "AZE": [
    44.78,
    39.68
   ],
   "ARM": [
    43.68,
    40.24
   ]
  },
  "neighbors": [
   "ARM",
   "AZE",
   "BGR",
   "GEO",
   "GRC",
   "IRN",
   "IRQ",
   "SYR"
  ],
  "seaNeighbors": [
   "CYP",
   "ROU",
   "RUS",
   "UKR"
  ]
 },
 "IRN": {
  "id": "IRN",
  "name": "ایران",
  "playable": true,
  "difficulty": 5,
  "detailed": true,
  "capital": "تهران",
  "gov": "T",
  "gdp": 380,
  "population": 91,
  "stability": 42,
  "militarySpendPct": 2.5,
  "inflation": 38,
  "debtRatio": 0.35,
  "military": {
   "active": 610,
   "nuclear": false,
   "land": 62,
   "air": 28,
   "navy": 38,
   "missile": 78,
   "airDefense": 45,
   "cyber": 60,
   "drone": 80
  },
  "energy": {
   "production": 380,
   "consumption": 300
  },
  "terrain": "mountain",
  "pos": [
   51.39,
   35.69
  ],
  "borderPos": {
   "TKM": [
    57.98,
    37.83
   ],
   "TUR": [
    44.32,
    38.37
   ],
   "PAK": [
    63.26,
    27.21
   ],
   "IRQ": [
    45.4,
    33.97
   ],
   "AZE": [
    48.13,
    39.17
   ],
   "ARM": [
    46.32,
    38.91
   ],
   "AFG": [
    60.49,
    33.71
   ]
  },
  "neighbors": [
   "AFG",
   "ARM",
   "AZE",
   "IRQ",
   "PAK",
   "TKM",
   "TUR"
  ],
  "seaNeighbors": [
   "ARE",
   "BHR",
   "KAZ",
   "KWT",
   "OMN",
   "QAT",
   "RUS",
   "SAU"
  ]
 },
 "IRQ": {
  "id": "IRQ",
  "name": "عراق",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "بغداد",
  "gov": "H",
  "gdp": 270,
  "population": 46,
  "stability": 38,
  "militarySpendPct": 3,
  "inflation": 3,
  "debtRatio": 0.5,
  "military": {
   "active": 195,
   "nuclear": false,
   "land": 42,
   "air": 22,
   "navy": 8,
   "missile": 18,
   "airDefense": 20,
   "cyber": 15,
   "drone": 25
  },
  "energy": {
   "production": 230,
   "consumption": 60
  },
  "terrain": "desert",
  "pos": [
   44.36,
   33.31
  ],
  "borderPos": {
   "TUR": [
    44.01,
    37.31
   ],
   "SYR": [
    41.36,
    35.64
   ],
   "SAU": [
    42.56,
    30.72
   ],
   "KWT": [
    47.15,
    30
   ],
   "JOR": [
    38.98,
    32.47
   ],
   "IRN": [
    45.4,
    33.97
   ]
  },
  "neighbors": [
   "IRN",
   "JOR",
   "KWT",
   "SAU",
   "SYR",
   "TUR"
  ],
  "seaNeighbors": []
 },
 "SAU": {
  "id": "SAU",
  "name": "عربستان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "ریاض",
  "gov": "M",
  "gdp": 1100,
  "population": 35,
  "stability": 68,
  "militarySpendPct": 6.5,
  "inflation": 2,
  "debtRatio": 0.3,
  "military": {
   "active": 257,
   "nuclear": false,
   "land": 50,
   "air": 62,
   "navy": 35,
   "missile": 45,
   "airDefense": 60,
   "cyber": 40,
   "drone": 40
  },
  "energy": {
   "production": 650,
   "consumption": 280
  },
  "terrain": "desert",
  "pos": [
   46.68,
   24.71
  ],
  "borderPos": {
   "ARE": [
    52.51,
    22.99
   ],
   "YEM": [
    45.24,
    17.41
   ],
   "QAT": [
    51.02,
    24.57
   ],
   "OMN": [
    55.09,
    20.35
   ],
   "KWT": [
    47.55,
    28.73
   ],
   "JOR": [
    37.65,
    30.33
   ],
   "IRQ": [
    42.56,
    30.72
   ]
  },
  "neighbors": [
   "ARE",
   "IRQ",
   "JOR",
   "KWT",
   "OMN",
   "QAT",
   "YEM"
  ],
  "seaNeighbors": [
   "BHR",
   "EGY",
   "ERI",
   "IRN",
   "SDN"
  ]
 },
 "ARE": {
  "id": "ARE",
  "name": "امارات",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "ابوظبی",
  "gov": "M",
  "gdp": 550,
  "population": 10.5,
  "stability": 82,
  "militarySpendPct": 4.5,
  "inflation": 2,
  "debtRatio": 0.32,
  "military": {
   "active": 65,
   "nuclear": false,
   "land": 38,
   "air": 55,
   "navy": 30,
   "missile": 30,
   "airDefense": 58,
   "cyber": 50,
   "drone": 48
  },
  "energy": {
   "production": 230,
   "consumption": 120
  },
  "terrain": "desert",
  "pos": [
   54.37,
   24.45
  ],
  "borderPos": {
   "SAU": [
    52.51,
    22.99
   ],
   "OMN": [
    55.8,
    24.38
   ]
  },
  "neighbors": [
   "OMN",
   "SAU"
  ],
  "seaNeighbors": [
   "IRN"
  ]
 },
 "QAT": {
  "id": "QAT",
  "name": "قطر",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "دوحه",
  "gov": "M",
  "gdp": 220,
  "population": 3,
  "stability": 85,
  "militarySpendPct": 4,
  "inflation": 2,
  "debtRatio": 0.42,
  "military": {
   "active": 16,
   "nuclear": false,
   "land": 15,
   "air": 35,
   "navy": 15,
   "missile": 10,
   "airDefense": 40,
   "cyber": 30,
   "drone": 20
  },
  "energy": {
   "production": 230,
   "consumption": 60
  },
  "terrain": "desert",
  "pos": [
   51.53,
   25.29
  ],
  "borderPos": {
   "SAU": [
    51.02,
    24.57
   ]
  },
  "neighbors": [
   "SAU"
  ],
  "seaNeighbors": [
   "BHR",
   "IRN"
  ]
 },
 "KWT": {
  "id": "KWT",
  "name": "کویت",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "کویت",
  "gov": "M",
  "gdp": 160,
  "population": 4.9,
  "stability": 72,
  "militarySpendPct": 4.8,
  "inflation": 3,
  "debtRatio": 0.1,
  "military": {
   "active": 18,
   "nuclear": false,
   "land": 18,
   "air": 28,
   "navy": 10,
   "missile": 10,
   "airDefense": 38,
   "cyber": 20,
   "drone": 12
  },
  "energy": {
   "production": 150,
   "consumption": 45
  },
  "terrain": "desert",
  "pos": [
   47.98,
   29.37
  ],
  "borderPos": {
   "SAU": [
    47.55,
    28.73
   ],
   "IRQ": [
    47.15,
    30
   ]
  },
  "neighbors": [
   "IRQ",
   "SAU"
  ],
  "seaNeighbors": [
   "IRN"
  ]
 },
 "BHR": {
  "id": "BHR",
  "name": "بحرین",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "منامه",
  "gov": "M",
  "gdp": 47,
  "population": 1.6,
  "stability": 58,
  "militarySpendPct": 3.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 18,
   "nuclear": false,
   "land": 10,
   "air": 18,
   "navy": 10,
   "missile": 5,
   "airDefense": 25,
   "cyber": 15,
   "drone": 8
  },
  "energy": {
   "production": 25,
   "consumption": 20
  },
  "terrain": "urban",
  "pos": [
   50.58,
   26.23
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "IRN",
   "QAT",
   "SAU"
  ]
 },
 "OMN": {
  "id": "OMN",
  "name": "عمان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "مسقط",
  "gov": "M",
  "gdp": 108,
  "population": 5.3,
  "stability": 72,
  "militarySpendPct": 5.5,
  "inflation": 1.5,
  "debtRatio": 0.35,
  "military": {
   "active": 43,
   "nuclear": false,
   "land": 22,
   "air": 25,
   "navy": 20,
   "missile": 8,
   "airDefense": 25,
   "cyber": 15,
   "drone": 12
  },
  "energy": {
   "production": 90,
   "consumption": 35
  },
  "terrain": "desert",
  "pos": [
   58.41,
   23.59
  ],
  "borderPos": {
   "ARE": [
    55.8,
    24.38
   ],
   "YEM": [
    52.51,
    17.8
   ],
   "SAU": [
    55.09,
    20.35
   ]
  },
  "neighbors": [
   "ARE",
   "SAU",
   "YEM"
  ],
  "seaNeighbors": [
   "IRN"
  ]
 },
 "YEM": {
  "id": "YEM",
  "name": "یمن",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 20,
  "population": 35,
  "stability": 10,
  "militarySpendPct": 3,
  "inflation": 30,
  "debtRatio": 0.8,
  "military": {
   "active": 210,
   "nuclear": false,
   "land": 6,
   "air": 3,
   "navy": 2,
   "missile": 0,
   "airDefense": 3,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 5,
   "consumption": 5
  },
  "terrain": "plain",
  "pos": [
   47.52,
   15.94
  ],
  "borderPos": {
   "SAU": [
    45.24,
    17.41
   ],
   "OMN": [
    52.51,
    17.8
   ]
  },
  "neighbors": [
   "OMN",
   "SAU"
  ],
  "seaNeighbors": [
   "DJI",
   "ERI"
  ]
 },
 "JOR": {
  "id": "JOR",
  "name": "اردن",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "امان",
  "gov": "M",
  "gdp": 55,
  "population": 11.5,
  "stability": 60,
  "militarySpendPct": 4.5,
  "inflation": 2,
  "debtRatio": 0.9,
  "military": {
   "active": 100,
   "nuclear": false,
   "land": 30,
   "air": 28,
   "navy": 2,
   "missile": 5,
   "airDefense": 25,
   "cyber": 20,
   "drone": 12
  },
  "energy": {
   "production": 3,
   "consumption": 10
  },
  "terrain": "desert",
  "pos": [
   35.93,
   31.95
  ],
  "borderPos": {
   "SYR": [
    36.82,
    32.32
   ],
   "SAU": [
    37.65,
    30.33
   ],
   "PSE": [
    35.53,
    31.98
   ],
   "ISR": [
    35.24,
    30.67
   ],
   "IRQ": [
    38.98,
    32.47
   ]
  },
  "neighbors": [
   "IRQ",
   "ISR",
   "PSE",
   "SAU",
   "SYR"
  ],
  "seaNeighbors": []
 },
 "ISR": {
  "id": "ISR",
  "name": "اسرائیل",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "تل‌آویو",
  "gov": "D",
  "gdp": 550,
  "population": 10,
  "stability": 52,
  "militarySpendPct": 8,
  "inflation": 3,
  "debtRatio": 0.68,
  "military": {
   "active": 170,
   "nuclear": true,
   "land": 68,
   "air": 82,
   "navy": 40,
   "missile": 70,
   "airDefense": 92,
   "cyber": 92,
   "drone": 85
  },
  "energy": {
   "production": 16,
   "consumption": 25
  },
  "terrain": "urban",
  "pos": [
   34.78,
   32.08
  ],
  "borderPos": {
   "SYR": [
    35.9,
    33.14
   ],
   "LBN": [
    35.58,
    33.27
   ],
   "JOR": [
    35.24,
    30.67
   ],
   "PSE": [
    34.96,
    31.82
   ],
   "EGY": [
    34.53,
    30.45
   ]
  },
  "neighbors": [
   "EGY",
   "JOR",
   "LBN",
   "PSE",
   "SYR"
  ],
  "seaNeighbors": [
   "CYP"
  ]
 },
 "PSE": {
  "id": "PSE",
  "name": "فلسطین",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 17,
  "population": 5.5,
  "stability": 10,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 8,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 1.2,
   "consumption": 2.4
  },
  "terrain": "plain",
  "pos": [
   35.25,
   31.95
  ],
  "borderPos": {
   "JOR": [
    35.53,
    31.98
   ],
   "ISR": [
    34.96,
    31.82
   ],
   "EGY": [
    34.21,
    31.29
   ]
  },
  "neighbors": [
   "EGY",
   "ISR",
   "JOR"
  ],
  "seaNeighbors": []
 },
 "LBN": {
  "id": "LBN",
  "name": "لبنان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "بیروت",
  "gov": "H",
  "gdp": 25,
  "population": 5.8,
  "stability": 25,
  "militarySpendPct": 3,
  "inflation": 20,
  "debtRatio": 1.5,
  "military": {
   "active": 80,
   "nuclear": false,
   "land": 15,
   "air": 3,
   "navy": 2,
   "missile": 25,
   "airDefense": 3,
   "cyber": 10,
   "drone": 15
  },
  "energy": {
   "production": 1,
   "consumption": 8
  },
  "terrain": "mountain",
  "pos": [
   35.5,
   33.89
  ],
  "borderPos": {
   "SYR": [
    36.28,
    33.89
   ],
   "ISR": [
    35.58,
    33.27
   ]
  },
  "neighbors": [
   "ISR",
   "SYR"
  ],
  "seaNeighbors": [
   "CYP"
  ]
 },
 "SYR": {
  "id": "SYR",
  "name": "سوریه",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "دمشق",
  "gov": "A",
  "gdp": 25,
  "population": 24,
  "stability": 22,
  "militarySpendPct": 3,
  "inflation": 40,
  "debtRatio": 1,
  "military": {
   "active": 100,
   "nuclear": false,
   "land": 22,
   "air": 5,
   "navy": 2,
   "missile": 5,
   "airDefense": 5,
   "cyber": 5,
   "drone": 15
  },
  "energy": {
   "production": 8,
   "consumption": 12
  },
  "terrain": "mountain",
  "pos": [
   36.29,
   33.51
  ],
  "borderPos": {
   "TUR": [
    38.19,
    36.9
   ],
   "LBN": [
    36.28,
    33.89
   ],
   "JOR": [
    36.82,
    32.32
   ],
   "ISR": [
    35.9,
    33.14
   ],
   "IRQ": [
    41.36,
    35.64
   ]
  },
  "neighbors": [
   "IRQ",
   "ISR",
   "JOR",
   "LBN",
   "TUR"
  ],
  "seaNeighbors": [
   "CYP"
  ]
 },
 "EGY": {
  "id": "EGY",
  "name": "مصر",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "قاهره",
  "gov": "A",
  "gdp": 380,
  "population": 117,
  "stability": 48,
  "militarySpendPct": 1.2,
  "inflation": 15,
  "debtRatio": 0.9,
  "military": {
   "active": 440,
   "nuclear": false,
   "land": 60,
   "air": 55,
   "navy": 45,
   "missile": 25,
   "airDefense": 50,
   "cyber": 30,
   "drone": 30
  },
  "energy": {
   "production": 80,
   "consumption": 95
  },
  "terrain": "desert",
  "pos": [
   31.24,
   30.04
  ],
  "borderPos": {
   "SDN": [
    31.46,
    22.19
   ],
   "LBY": [
    24.98,
    27.83
   ],
   "ISR": [
    34.53,
    30.45
   ],
   "PSE": [
    34.21,
    31.29
   ]
  },
  "neighbors": [
   "ISR",
   "LBY",
   "PSE",
   "SDN"
  ],
  "seaNeighbors": [
   "SAU"
  ]
 },
 "AZE": {
  "id": "AZE",
  "name": "آذربایجان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "باکو",
  "gov": "A",
  "gdp": 75,
  "population": 10.2,
  "stability": 62,
  "militarySpendPct": 5,
  "inflation": 5,
  "debtRatio": 0.2,
  "military": {
   "active": 65,
   "nuclear": false,
   "land": 35,
   "air": 22,
   "navy": 12,
   "missile": 25,
   "airDefense": 32,
   "cyber": 25,
   "drone": 55
  },
  "energy": {
   "production": 60,
   "consumption": 17
  },
  "terrain": "mountain",
  "pos": [
   49.87,
   40.41
  ],
  "borderPos": {
   "TUR": [
    44.78,
    39.68
   ],
   "RUS": [
    47.21,
    41.46
   ],
   "IRN": [
    48.13,
    39.17
   ],
   "GEO": [
    46.63,
    41.16
   ],
   "ARM": [
    45.63,
    40.01
   ]
  },
  "neighbors": [
   "ARM",
   "GEO",
   "IRN",
   "RUS",
   "TUR"
  ],
  "seaNeighbors": [
   "KAZ",
   "TKM"
  ]
 },
 "ARM": {
  "id": "ARM",
  "name": "ارمنستان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "ایروان",
  "gov": "D",
  "gdp": 26,
  "population": 3,
  "stability": 50,
  "militarySpendPct": 5.5,
  "inflation": 3,
  "debtRatio": 0.5,
  "military": {
   "active": 45,
   "nuclear": false,
   "land": 25,
   "air": 10,
   "navy": 0,
   "missile": 15,
   "airDefense": 20,
   "cyber": 15,
   "drone": 15
  },
  "energy": {
   "production": 4,
   "consumption": 4
  },
  "terrain": "mountain",
  "pos": [
   44.51,
   40.18
  ],
  "borderPos": {
   "TUR": [
    43.68,
    40.24
   ],
   "IRN": [
    46.32,
    38.91
   ],
   "GEO": [
    44.23,
    41.21
   ],
   "AZE": [
    45.63,
    40.01
   ]
  },
  "neighbors": [
   "AZE",
   "GEO",
   "IRN",
   "TUR"
  ],
  "seaNeighbors": []
 },
 "GEO": {
  "id": "GEO",
  "name": "گرجستان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "تفلیس",
  "gov": "H",
  "gdp": 35,
  "population": 3.7,
  "stability": 50,
  "militarySpendPct": 1.6,
  "inflation": 3,
  "debtRatio": 0.4,
  "military": {
   "active": 20,
   "nuclear": false,
   "land": 15,
   "air": 5,
   "navy": 2,
   "missile": 5,
   "airDefense": 12,
   "cyber": 15,
   "drone": 10
  },
  "energy": {
   "production": 2,
   "consumption": 5
  },
  "terrain": "mountain",
  "pos": [
   44.79,
   41.72
  ],
  "borderPos": {
   "TUR": [
    42.76,
    41.58
   ],
   "RUS": [
    43.83,
    42.57
   ],
   "AZE": [
    46.63,
    41.16
   ],
   "ARM": [
    44.23,
    41.21
   ]
  },
  "neighbors": [
   "ARM",
   "AZE",
   "RUS",
   "TUR"
  ],
  "seaNeighbors": []
 },
 "TKM": {
  "id": "TKM",
  "name": "ترکمنستان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "عشق‌آباد",
  "gov": "A",
  "gdp": 85,
  "population": 7.4,
  "stability": 55,
  "militarySpendPct": 2.5,
  "inflation": 8,
  "debtRatio": 0.05,
  "military": {
   "active": 36,
   "nuclear": false,
   "land": 18,
   "air": 10,
   "navy": 5,
   "missile": 5,
   "airDefense": 12,
   "cyber": 5,
   "drone": 10
  },
  "energy": {
   "production": 90,
   "consumption": 40
  },
  "terrain": "desert",
  "pos": [
   58.38,
   37.95
  ],
  "borderPos": {
   "UZB": [
    60.11,
    41.91
   ],
   "KAZ": [
    54.86,
    41.97
   ],
   "IRN": [
    57.98,
    37.83
   ],
   "AFG": [
    63.18,
    35.86
   ]
  },
  "neighbors": [
   "AFG",
   "IRN",
   "KAZ",
   "UZB"
  ],
  "seaNeighbors": [
   "AZE"
  ]
 },
 "UZB": {
  "id": "UZB",
  "name": "ازبکستان",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 115,
  "population": 37,
  "stability": 58,
  "militarySpendPct": 2.8,
  "inflation": 10,
  "debtRatio": 0.35,
  "military": {
   "active": 211,
   "nuclear": false,
   "land": 20,
   "air": 12,
   "navy": 8,
   "missile": 3,
   "airDefense": 10,
   "cyber": 5,
   "drone": 4
  },
  "energy": {
   "production": 55,
   "consumption": 50
  },
  "terrain": "plain",
  "pos": [
   63.29,
   41.78
  ],
  "borderPos": {
   "TKM": [
    60.11,
    41.91
   ],
   "TJK": [
    68.79,
    40.01
   ],
   "KGZ": [
    72.11,
    41.19
   ],
   "KAZ": [
    65.27,
    43.42
   ],
   "AFG": [
    67.44,
    37.26
   ]
  },
  "neighbors": [
   "AFG",
   "KAZ",
   "KGZ",
   "TJK",
   "TKM"
  ],
  "seaNeighbors": []
 },
 "KAZ": {
  "id": "KAZ",
  "name": "قزاقستان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "آستانه",
  "gov": "A",
  "gdp": 290,
  "population": 20.5,
  "stability": 60,
  "militarySpendPct": 0.9,
  "inflation": 10,
  "debtRatio": 0.24,
  "military": {
   "active": 70,
   "nuclear": false,
   "land": 30,
   "air": 20,
   "navy": 5,
   "missile": 10,
   "airDefense": 25,
   "cyber": 15,
   "drone": 15
  },
  "energy": {
   "production": 180,
   "consumption": 90
  },
  "terrain": "plain",
  "pos": [
   71.45,
   51.17
  ],
  "borderPos": {
   "UZB": [
    65.27,
    43.42
   ],
   "TKM": [
    54.86,
    41.97
   ],
   "RUS": [
    61.93,
    53.95
   ],
   "KGZ": [
    74.82,
    42.98
   ],
   "CHN": [
    82.48,
    45.12
   ]
  },
  "neighbors": [
   "CHN",
   "KGZ",
   "RUS",
   "TKM",
   "UZB"
  ],
  "seaNeighbors": [
   "AZE",
   "IRN"
  ]
 },
 "KGZ": {
  "id": "KGZ",
  "name": "قرقیزستان",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 16,
  "population": 7.2,
  "stability": 52,
  "militarySpendPct": 1.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 27,
   "nuclear": false,
   "land": 3,
   "air": 2,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 1.3,
   "consumption": 2.5
  },
  "terrain": "plain",
  "pos": [
   74.51,
   41.47
  ],
  "borderPos": {
   "UZB": [
    72.11,
    41.19
   ],
   "TJK": [
    70.61,
    39.56
   ],
   "KAZ": [
    74.82,
    42.98
   ],
   "CHN": [
    76.16,
    40.38
   ]
  },
  "neighbors": [
   "CHN",
   "KAZ",
   "TJK",
   "UZB"
  ],
  "seaNeighbors": []
 },
 "TJK": {
  "id": "TJK",
  "name": "تاجیکستان",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 14,
  "population": 10.6,
  "stability": 45,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 32,
   "nuclear": false,
   "land": 2,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 1.4,
   "consumption": 2.8
  },
  "terrain": "plain",
  "pos": [
   71.03,
   38.53
  ],
  "borderPos": {
   "UZB": [
    68.79,
    40.01
   ],
   "KGZ": [
    70.61,
    39.56
   ],
   "CHN": [
    74.52,
    38.6
   ],
   "AFG": [
    71.33,
    38.17
   ]
  },
  "neighbors": [
   "AFG",
   "CHN",
   "KGZ",
   "UZB"
  ],
  "seaNeighbors": []
 },
 "AFG": {
  "id": "AFG",
  "name": "افغانستان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "کابل",
  "gov": "T",
  "gdp": 17,
  "population": 42,
  "stability": 30,
  "militarySpendPct": 2,
  "inflation": 5,
  "debtRatio": 0.1,
  "military": {
   "active": 150,
   "nuclear": false,
   "land": 25,
   "air": 3,
   "navy": 0,
   "missile": 2,
   "airDefense": 3,
   "cyber": 3,
   "drone": 8
  },
  "energy": {
   "production": 8,
   "consumption": 10
  },
  "terrain": "mountain",
  "pos": [
   69.17,
   34.53
  ],
  "borderPos": {
   "UZB": [
    67.44,
    37.26
   ],
   "TKM": [
    63.18,
    35.86
   ],
   "TJK": [
    71.33,
    38.17
   ],
   "PAK": [
    69.57,
    33.06
   ],
   "IRN": [
    60.49,
    33.71
   ],
   "CHN": [
    74.67,
    37.27
   ]
  },
  "neighbors": [
   "CHN",
   "IRN",
   "PAK",
   "TJK",
   "TKM",
   "UZB"
  ],
  "seaNeighbors": []
 },
 "CHN": {
  "id": "CHN",
  "name": "چین",
  "playable": true,
  "difficulty": 3,
  "detailed": true,
  "capital": "پکن",
  "gov": "A",
  "gdp": 19500,
  "population": 1408,
  "stability": 70,
  "militarySpendPct": 1.7,
  "inflation": 0.5,
  "debtRatio": 0.9,
  "military": {
   "active": 2035,
   "nuclear": true,
   "land": 90,
   "air": 85,
   "navy": 88,
   "missile": 92,
   "airDefense": 85,
   "cyber": 92,
   "drone": 88
  },
  "energy": {
   "production": 2950,
   "consumption": 4100
  },
  "terrain": "mountain",
  "pos": [
   116.4,
   39.9
  ],
  "borderPos": {
   "VNM": [
    105.27,
    23.34
   ],
   "TJK": [
    74.52,
    38.6
   ],
   "RUS": [
    129.59,
    49.29
   ],
   "PAK": [
    75.95,
    36.46
   ],
   "PRK": [
    128.15,
    41.39
   ],
   "NPL": [
    85.16,
    28.59
   ],
   "MNG": [
    109.7,
    42.55
   ],
   "LAO": [
    101.74,
    21.53
   ],
   "KGZ": [
    76.16,
    40.38
   ],
   "KAZ": [
    82.48,
    45.12
   ],
   "IND": [
    78.74,
    32.56
   ],
   "MMR": [
    97.69,
    24.13
   ],
   "BTN": [
    90.33,
    28.12
   ],
   "AFG": [
    74.67,
    37.27
   ]
  },
  "neighbors": [
   "AFG",
   "BTN",
   "IND",
   "KAZ",
   "KGZ",
   "LAO",
   "MMR",
   "MNG",
   "NPL",
   "PAK",
   "PRK",
   "RUS",
   "TJK",
   "VNM"
  ],
  "seaNeighbors": [
   "JPN",
   "KOR",
   "PHL",
   "TWN"
  ]
 },
 "IND": {
  "id": "IND",
  "name": "هند",
  "playable": true,
  "difficulty": 3,
  "detailed": true,
  "capital": "دهلی نو",
  "gov": "D",
  "gdp": 4200,
  "population": 1460,
  "stability": 60,
  "militarySpendPct": 2.3,
  "inflation": 3,
  "debtRatio": 0.82,
  "military": {
   "active": 1455,
   "nuclear": true,
   "land": 82,
   "air": 72,
   "navy": 65,
   "missile": 75,
   "airDefense": 70,
   "cyber": 62,
   "drone": 55
  },
  "energy": {
   "production": 620,
   "consumption": 1000
  },
  "terrain": "plain",
  "pos": [
   77.2,
   28.6
  ],
  "borderPos": {
   "PAK": [
    73.38,
    29.93
   ],
   "NPL": [
    83.9,
    27.43
   ],
   "MMR": [
    94.7,
    25.1
   ],
   "CHN": [
    78.74,
    32.56
   ],
   "BTN": [
    91.13,
    26.8
   ],
   "BGD": [
    89.57,
    26.13
   ]
  },
  "neighbors": [
   "BGD",
   "BTN",
   "CHN",
   "MMR",
   "NPL",
   "PAK"
  ],
  "seaNeighbors": [
   "LKA",
   "MDV"
  ]
 },
 "PAK": {
  "id": "PAK",
  "name": "پاکستان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "اسلام‌آباد",
  "gov": "H",
  "gdp": 400,
  "population": 252,
  "stability": 35,
  "militarySpendPct": 2.8,
  "inflation": 5,
  "debtRatio": 0.75,
  "military": {
   "active": 655,
   "nuclear": true,
   "land": 70,
   "air": 52,
   "navy": 35,
   "missile": 62,
   "airDefense": 45,
   "cyber": 40,
   "drone": 45
  },
  "energy": {
   "production": 70,
   "consumption": 110
  },
  "terrain": "mountain",
  "pos": [
   73.05,
   33.68
  ],
  "borderPos": {
   "IRN": [
    63.26,
    27.21
   ],
   "IND": [
    73.38,
    29.93
   ],
   "CHN": [
    75.95,
    36.46
   ],
   "AFG": [
    69.57,
    33.06
   ]
  },
  "neighbors": [
   "AFG",
   "CHN",
   "IND",
   "IRN"
  ],
  "seaNeighbors": []
 },
 "BGD": {
  "id": "BGD",
  "name": "بنگلادش",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "داکا",
  "gov": "H",
  "gdp": 470,
  "population": 175,
  "stability": 40,
  "militarySpendPct": 1,
  "inflation": 9,
  "debtRatio": 0.4,
  "military": {
   "active": 165,
   "nuclear": false,
   "land": 35,
   "air": 18,
   "navy": 20,
   "missile": 8,
   "airDefense": 15,
   "cyber": 10,
   "drone": 10
  },
  "energy": {
   "production": 30,
   "consumption": 45
  },
  "terrain": "plain",
  "pos": [
   90.41,
   23.81
  ],
  "borderPos": {
   "IND": [
    89.57,
    26.13
   ],
   "MMR": [
    92.37,
    21.41
   ]
  },
  "neighbors": [
   "IND",
   "MMR"
  ],
  "seaNeighbors": []
 },
 "NPL": {
  "id": "NPL",
  "name": "نپال",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "کاتماندو",
  "gov": "D",
  "gdp": 44,
  "population": 30,
  "stability": 48,
  "militarySpendPct": 1.1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 95,
   "nuclear": false,
   "land": 18,
   "air": 2,
   "navy": 0,
   "missile": 0,
   "airDefense": 2,
   "cyber": 2,
   "drone": 2
  },
  "energy": {
   "production": 6,
   "consumption": 10
  },
  "terrain": "mountain",
  "pos": [
   85.32,
   27.72
  ],
  "borderPos": {
   "IND": [
    83.9,
    27.43
   ],
   "CHN": [
    85.16,
    28.59
   ]
  },
  "neighbors": [
   "CHN",
   "IND"
  ],
  "seaNeighbors": []
 },
 "BTN": {
  "id": "BTN",
  "name": "بوتان",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "M",
  "gdp": 3.2,
  "population": 0.79,
  "stability": 80,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 1,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.2,
   "consumption": 0.4
  },
  "terrain": "plain",
  "pos": [
   90.4,
   27.41
  ],
  "borderPos": {
   "IND": [
    91.13,
    26.8
   ],
   "CHN": [
    90.33,
    28.12
   ]
  },
  "neighbors": [
   "CHN",
   "IND"
  ],
  "seaNeighbors": []
 },
 "LKA": {
  "id": "LKA",
  "name": "سری‌لانکا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 95,
  "population": 22,
  "stability": 50,
  "militarySpendPct": 1.5,
  "inflation": 3,
  "debtRatio": 1,
  "military": {
   "active": 83,
   "nuclear": false,
   "land": 12,
   "air": 8,
   "navy": 5,
   "missile": 2,
   "airDefense": 7,
   "cyber": 4,
   "drone": 3
  },
  "energy": {
   "production": 5.9,
   "consumption": 11.8
  },
  "terrain": "plain",
  "pos": [
   80.7,
   7.61
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "IND"
  ]
 },
 "MDV": {
  "id": "MDV",
  "name": "مالدیو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 7,
  "population": 0.52,
  "stability": 60,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 1,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.4,
   "consumption": 0.7
  },
  "terrain": "plain",
  "pos": [
   73.5,
   4.2
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "IND"
  ]
 },
 "JPN": {
  "id": "JPN",
  "name": "ژاپن",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "توکیو",
  "gov": "D",
  "gdp": 4200,
  "population": 123.5,
  "stability": 80,
  "militarySpendPct": 1.6,
  "inflation": 3,
  "debtRatio": 2.3,
  "military": {
   "active": 247,
   "nuclear": false,
   "land": 55,
   "air": 70,
   "navy": 78,
   "missile": 45,
   "airDefense": 75,
   "cyber": 70,
   "drone": 50
  },
  "energy": {
   "production": 50,
   "consumption": 400
  },
  "terrain": "mountain",
  "pos": [
   139.69,
   35.69
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "CHN",
   "KOR",
   "RUS",
   "TWN"
  ]
 },
 "KOR": {
  "id": "KOR",
  "name": "کره جنوبی",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "سئول",
  "gov": "D",
  "gdp": 1850,
  "population": 51.6,
  "stability": 70,
  "militarySpendPct": 2.6,
  "inflation": 2,
  "debtRatio": 0.53,
  "military": {
   "active": 500,
   "nuclear": false,
   "land": 70,
   "air": 70,
   "navy": 60,
   "missile": 62,
   "airDefense": 70,
   "cyber": 75,
   "drone": 55
  },
  "energy": {
   "production": 50,
   "consumption": 300
  },
  "terrain": "mountain",
  "pos": [
   126.98,
   37.57
  ],
  "borderPos": {
   "PRK": [
    127.53,
    38.31
   ]
  },
  "neighbors": [
   "PRK"
  ],
  "seaNeighbors": [
   "CHN",
   "JPN"
  ]
 },
 "PRK": {
  "id": "PRK",
  "name": "کره شمالی",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "پیونگ‌یانگ",
  "gov": "A",
  "gdp": 25,
  "population": 26.5,
  "stability": 55,
  "militarySpendPct": 20,
  "inflation": 10,
  "debtRatio": 0.5,
  "military": {
   "active": 1280,
   "nuclear": true,
   "land": 60,
   "air": 18,
   "navy": 25,
   "missile": 65,
   "airDefense": 40,
   "cyber": 70,
   "drone": 25
  },
  "energy": {
   "production": 25,
   "consumption": 15
  },
  "terrain": "mountain",
  "pos": [
   125.75,
   39.03
  ],
  "borderPos": {
   "KOR": [
    127.53,
    38.31
   ],
   "RUS": [
    130.62,
    42.42
   ],
   "CHN": [
    128.15,
    41.39
   ]
  },
  "neighbors": [
   "CHN",
   "KOR",
   "RUS"
  ],
  "seaNeighbors": []
 },
 "TWN": {
  "id": "TWN",
  "name": "تایوان",
  "playable": false,
  "difficulty": 0,
  "detailed": true,
  "capital": "تایپه",
  "gov": "D",
  "gdp": 850,
  "population": 23.3,
  "stability": 75,
  "militarySpendPct": 2.5,
  "inflation": 2,
  "debtRatio": 0.27,
  "military": {
   "active": 170,
   "nuclear": false,
   "land": 45,
   "air": 55,
   "navy": 40,
   "missile": 50,
   "airDefense": 65,
   "cyber": 70,
   "drone": 45
  },
  "energy": {
   "production": 10,
   "consumption": 115
  },
  "terrain": "mountain",
  "pos": [
   121.56,
   25.03
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "CHN",
   "JPN",
   "PHL"
  ]
 },
 "MNG": {
  "id": "MNG",
  "name": "مغولستان",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 24,
  "population": 3.5,
  "stability": 60,
  "militarySpendPct": 0.7,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 9,
   "nuclear": false,
   "land": 2,
   "air": 2,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 40,
   "consumption": 6
  },
  "terrain": "plain",
  "pos": [
   103.12,
   46.96
  ],
  "borderPos": {
   "RUS": [
    97.95,
    51.35
   ],
   "CHN": [
    109.7,
    42.55
   ]
  },
  "neighbors": [
   "CHN",
   "RUS"
  ],
  "seaNeighbors": []
 },
 "VNM": {
  "id": "VNM",
  "name": "ویتنام",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 490,
  "population": 101,
  "stability": 70,
  "militarySpendPct": 2.3,
  "inflation": 3.5,
  "debtRatio": 0.35,
  "military": {
   "active": 500,
   "nuclear": false,
   "land": 34,
   "air": 23,
   "navy": 15,
   "missile": 7,
   "airDefense": 19,
   "cyber": 12,
   "drone": 9
  },
  "energy": {
   "production": 80,
   "consumption": 100
  },
  "terrain": "plain",
  "pos": [
   106.35,
   16.55
  ],
  "borderPos": {
   "LAO": [
    103.89,
    19.3
   ],
   "CHN": [
    105.27,
    23.34
   ],
   "KHM": [
    105.95,
    11.68
   ]
  },
  "neighbors": [
   "CHN",
   "KHM",
   "LAO"
  ],
  "seaNeighbors": []
 },
 "THA": {
  "id": "THA",
  "name": "تایلند",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 550,
  "population": 71.6,
  "stability": 55,
  "militarySpendPct": 1.2,
  "inflation": 1,
  "debtRatio": 0.63,
  "military": {
   "active": 236,
   "nuclear": false,
   "land": 28,
   "air": 20,
   "navy": 13,
   "missile": 6,
   "airDefense": 17,
   "cyber": 12,
   "drone": 9
  },
  "energy": {
   "production": 40,
   "consumption": 140
  },
  "terrain": "plain",
  "pos": [
   101,
   15.1
  ],
  "borderPos": {
   "MYS": [
    100.98,
    5.77
   ],
   "LAO": [
    102.6,
    17.87
   ],
   "KHM": [
    102.91,
    14.14
   ],
   "MMR": [
    98.47,
    16.9
   ]
  },
  "neighbors": [
   "KHM",
   "LAO",
   "MMR",
   "MYS"
  ],
  "seaNeighbors": []
 },
 "MYS": {
  "id": "MYS",
  "name": "مالزی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 470,
  "population": 34,
  "stability": 68,
  "militarySpendPct": 1,
  "inflation": 2,
  "debtRatio": 0.65,
  "military": {
   "active": 102,
   "nuclear": false,
   "land": 24,
   "air": 19,
   "navy": 12,
   "missile": 7,
   "airDefense": 16,
   "cyber": 12,
   "drone": 10
  },
  "energy": {
   "production": 100,
   "consumption": 95
  },
  "terrain": "plain",
  "pos": [
   114.72,
   3.62
  ],
  "borderPos": {
   "THA": [
    100.98,
    5.77
   ],
   "IDN": [
    114.7,
    1.85
   ],
   "BRN": [
    114.79,
    4.46
   ]
  },
  "neighbors": [
   "BRN",
   "IDN",
   "THA"
  ],
  "seaNeighbors": [
   "SGP"
  ]
 },
 "SGP": {
  "id": "SGP",
  "name": "سنگاپور",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 560,
  "population": 6,
  "stability": 90,
  "militarySpendPct": 2.8,
  "inflation": 2,
  "debtRatio": 1.6,
  "military": {
   "active": 34,
   "nuclear": false,
   "land": 39,
   "air": 41,
   "navy": 24,
   "missile": 18,
   "airDefense": 33,
   "cyber": 33,
   "drone": 26
  },
  "energy": {
   "production": 1,
   "consumption": 90
  },
  "terrain": "plain",
  "pos": [
   103.82,
   1.36
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "IDN",
   "MYS"
  ]
 },
 "IDN": {
  "id": "IDN",
  "name": "اندونزی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 1450,
  "population": 284,
  "stability": 62,
  "militarySpendPct": 0.8,
  "inflation": 2,
  "debtRatio": 0.4,
  "military": {
   "active": 767,
   "nuclear": false,
   "land": 35,
   "air": 24,
   "navy": 16,
   "missile": 7,
   "airDefense": 20,
   "cyber": 12,
   "drone": 10
  },
  "energy": {
   "production": 480,
   "consumption": 250
  },
  "terrain": "plain",
  "pos": [
   114.01,
   -0.19
  ],
  "borderPos": {
   "TLS": [
    125.15,
    -9.12
   ],
   "PNG": [
    140.98,
    -6.06
   ],
   "MYS": [
    114.7,
    1.85
   ]
  },
  "neighbors": [
   "MYS",
   "PNG",
   "TLS"
  ],
  "seaNeighbors": [
   "AUS",
   "PHL",
   "SGP"
  ]
 },
 "PHL": {
  "id": "PHL",
  "name": "فیلیپین",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 500,
  "population": 116,
  "stability": 52,
  "militarySpendPct": 1.3,
  "inflation": 3,
  "debtRatio": 0.6,
  "military": {
   "active": 400,
   "nuclear": false,
   "land": 28,
   "air": 18,
   "navy": 12,
   "missile": 5,
   "airDefense": 15,
   "cyber": 9,
   "drone": 7
  },
  "energy": {
   "production": 31.2,
   "consumption": 62.4
  },
  "terrain": "plain",
  "pos": [
   121.42,
   15.95
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "CHN",
   "IDN",
   "TWN"
  ]
 },
 "MMR": {
  "id": "MMR",
  "name": "میانمار",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 65,
  "population": 54.5,
  "stability": 15,
  "militarySpendPct": 3.5,
  "inflation": 25,
  "debtRatio": 0.6,
  "military": {
   "active": 368,
   "nuclear": false,
   "land": 16,
   "air": 9,
   "navy": 6,
   "missile": 1,
   "airDefense": 7,
   "cyber": 2,
   "drone": 2
  },
  "energy": {
   "production": 7,
   "consumption": 14
  },
  "terrain": "plain",
  "pos": [
   96.49,
   21.15
  ],
  "borderPos": {
   "LAO": [
    100.52,
    20.92
   ],
   "IND": [
    94.7,
    25.1
   ],
   "CHN": [
    97.69,
    24.13
   ],
   "THA": [
    98.47,
    16.9
   ],
   "BGD": [
    92.37,
    21.41
   ]
  },
  "neighbors": [
   "BGD",
   "CHN",
   "IND",
   "LAO",
   "THA"
  ],
  "seaNeighbors": []
 },
 "KHM": {
  "id": "KHM",
  "name": "کامبوج",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 50,
  "population": 17.6,
  "stability": 55,
  "militarySpendPct": 2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 79,
   "nuclear": false,
   "land": 10,
   "air": 6,
   "navy": 4,
   "missile": 1,
   "airDefense": 5,
   "cyber": 2,
   "drone": 2
  },
  "energy": {
   "production": 3.6,
   "consumption": 7.1
  },
  "terrain": "plain",
  "pos": [
   104.91,
   12.72
  ],
  "borderPos": {
   "VNM": [
    105.95,
    11.68
   ],
   "THA": [
    102.91,
    14.14
   ],
   "LAO": [
    106.35,
    14.45
   ]
  },
  "neighbors": [
   "LAO",
   "THA",
   "VNM"
  ],
  "seaNeighbors": []
 },
 "LAO": {
  "id": "LAO",
  "name": "لائوس",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 16,
  "population": 7.8,
  "stability": 55,
  "militarySpendPct": 0.2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 14,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 1.3,
   "consumption": 2.6
  },
  "terrain": "plain",
  "pos": [
   103.78,
   18.49
  ],
  "borderPos": {
   "VNM": [
    103.89,
    19.3
   ],
   "THA": [
    102.6,
    17.87
   ],
   "MMR": [
    100.52,
    20.92
   ],
   "CHN": [
    101.74,
    21.53
   ],
   "KHM": [
    106.35,
    14.45
   ]
  },
  "neighbors": [
   "CHN",
   "KHM",
   "MMR",
   "THA",
   "VNM"
  ],
  "seaNeighbors": []
 },
 "BRN": {
  "id": "BRN",
  "name": "برونئی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "M",
  "gdp": 16,
  "population": 0.46,
  "stability": 82,
  "militarySpendPct": 2.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 2,
   "nuclear": false,
   "land": 5,
   "air": 4,
   "navy": 3,
   "missile": 2,
   "airDefense": 3,
   "cyber": 3,
   "drone": 3
  },
  "energy": {
   "production": 20,
   "consumption": 4
  },
  "terrain": "plain",
  "pos": [
   114.59,
   4.49
  ],
  "borderPos": {
   "MYS": [
    114.79,
    4.46
   ]
  },
  "neighbors": [
   "MYS"
  ],
  "seaNeighbors": []
 },
 "TLS": {
  "id": "TLS",
  "name": "تیمور شرقی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 2.1,
  "population": 1.4,
  "stability": 55,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 4,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.2,
   "consumption": 0.4
  },
  "terrain": "plain",
  "pos": [
   125.92,
   -8.81
  ],
  "borderPos": {
   "IDN": [
    125.15,
    -9.12
   ]
  },
  "neighbors": [
   "IDN"
  ],
  "seaNeighbors": []
 },
 "AUS": {
  "id": "AUS",
  "name": "استرالیا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 1800,
  "population": 27.5,
  "stability": 82,
  "militarySpendPct": 2,
  "inflation": 3,
  "debtRatio": 0.5,
  "military": {
   "active": 124,
   "nuclear": false,
   "land": 50,
   "air": 51,
   "navy": 31,
   "missile": 22,
   "airDefense": 41,
   "cyber": 40,
   "drone": 32
  },
  "energy": {
   "production": 450,
   "consumption": 150
  },
  "terrain": "plain",
  "pos": [
   123.58,
   -12.43
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "IDN",
   "NZL",
   "PNG"
  ]
 },
 "NZL": {
  "id": "NZL",
  "name": "نیوزیلند",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 260,
  "population": 5.3,
  "stability": 85,
  "militarySpendPct": 1.2,
  "inflation": 3,
  "debtRatio": 0.45,
  "military": {
   "active": 17,
   "nuclear": false,
   "land": 19,
   "air": 19,
   "navy": 12,
   "missile": 8,
   "airDefense": 15,
   "cyber": 15,
   "drone": 12
  },
  "energy": {
   "production": 12.1,
   "consumption": 24.2
  },
  "terrain": "plain",
  "pos": [
   170.61,
   -43.95
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "AUS"
  ]
 },
 "PNG": {
  "id": "PNG",
  "name": "پاپوا گینهٔ نو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 33,
  "population": 10.5,
  "stability": 35,
  "militarySpendPct": 0.3,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 20,
   "nuclear": false,
   "land": 1,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 2.3,
   "consumption": 4.5
  },
  "terrain": "plain",
  "pos": [
   144.23,
   -6.6
  ],
  "borderPos": {
   "IDN": [
    140.98,
    -6.06
   ]
  },
  "neighbors": [
   "IDN"
  ],
  "seaNeighbors": [
   "AUS"
  ]
 },
 "FJI": {
  "id": "FJI",
  "name": "فیجی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 6,
  "population": 0.93,
  "stability": 58,
  "militarySpendPct": 1.3,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 3,
   "nuclear": false,
   "land": 1,
   "air": 1,
   "navy": 0,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.4,
   "consumption": 0.7
  },
  "terrain": "plain",
  "pos": [
   177.97,
   -17.82
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "SLB": {
  "id": "SLB",
  "name": "جزایر سلیمان",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 1.7,
  "population": 0.82,
  "stability": 50,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 1,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.2,
   "consumption": 0.3
  },
  "terrain": "plain",
  "pos": [
   160.17,
   -9.62
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "VUT": {
  "id": "VUT",
  "name": "وانواتو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 1.1,
  "population": 0.33,
  "stability": 60,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.1,
   "consumption": 0.1
  },
  "terrain": "plain",
  "pos": [
   166.85,
   -15.23
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "WSM": {
  "id": "WSM",
  "name": "ساموآ",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 1,
  "population": 0.22,
  "stability": 65,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.1,
   "consumption": 0.1
  },
  "terrain": "plain",
  "pos": [
   -172.44,
   -13.63
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "TON": {
  "id": "TON",
  "name": "تونگا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "M",
  "gdp": 0.6,
  "population": 0.1,
  "stability": 65,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.1,
   "consumption": 0.1
  },
  "terrain": "plain",
  "pos": [
   -175.22,
   -21.17
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "FSM": {
  "id": "FSM",
  "name": "میکرونزی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 0.5,
  "population": 0.11,
  "stability": 65,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.1,
   "consumption": 0.1
  },
  "terrain": "plain",
  "pos": [
   158.23,
   6.89
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "MHL": {
  "id": "MHL",
  "name": "جزایر مارشال",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 0.3,
  "population": 0.04,
  "stability": 65,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0,
   "consumption": 0
  },
  "terrain": "plain",
  "pos": [
   171.19,
   7.11
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "PLW": {
  "id": "PLW",
  "name": "پالائو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 0.3,
  "population": 0.02,
  "stability": 68,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0,
   "consumption": 0
  },
  "terrain": "plain",
  "pos": [
   134.58,
   7.51
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "KIR": {
  "id": "KIR",
  "name": "کیریباتی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 0.3,
  "population": 0.13,
  "stability": 60,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0,
   "consumption": 0
  },
  "terrain": "plain",
  "pos": [
   -157.37,
   1.85
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "NRU": {
  "id": "NRU",
  "name": "نائورو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 0.2,
  "population": 0.01,
  "stability": 60,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0,
   "consumption": 0
  },
  "terrain": "plain",
  "pos": [
   166.93,
   -0.52
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "NGA": {
  "id": "NGA",
  "name": "نیجریه",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 250,
  "population": 230,
  "stability": 30,
  "militarySpendPct": 0.6,
  "inflation": 25,
  "debtRatio": 0.5,
  "military": {
   "active": 552,
   "nuclear": false,
   "land": 13,
   "air": 7,
   "navy": 5,
   "missile": 1,
   "airDefense": 6,
   "cyber": 2,
   "drone": 1
  },
  "energy": {
   "production": 250,
   "consumption": 160
  },
  "terrain": "plain",
  "pos": [
   8.08,
   9.59
  ],
  "borderPos": {
   "TCD": [
    13.93,
    13.26
   ],
   "NER": [
    6.87,
    13.04
   ],
   "CMR": [
    11.85,
    7.4
   ],
   "BEN": [
    3.14,
    9.45
   ]
  },
  "neighbors": [
   "BEN",
   "CMR",
   "NER",
   "TCD"
  ],
  "seaNeighbors": []
 },
 "ZAF": {
  "id": "ZAF",
  "name": "افریقای جنوبی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 420,
  "population": 64,
  "stability": 48,
  "militarySpendPct": 0.7,
  "inflation": 4,
  "debtRatio": 0.75,
  "military": {
   "active": 163,
   "nuclear": false,
   "land": 19,
   "air": 13,
   "navy": 9,
   "missile": 4,
   "airDefense": 11,
   "cyber": 7,
   "drone": 6
  },
  "energy": {
   "production": 150,
   "consumption": 135
  },
  "terrain": "plain",
  "pos": [
   25.19,
   -28.97
  ],
  "borderPos": {
   "SWZ": [
    30.79,
    -26.77
   ],
   "ZWE": [
    30.46,
    -22.33
   ],
   "NAM": [
    17.7,
    -28.77
   ],
   "MOZ": [
    31.86,
    -24.04
   ],
   "LSO": [
    27.42,
    -29.36
   ],
   "BWA": [
    24.33,
    -25.74
   ]
  },
  "neighbors": [
   "BWA",
   "LSO",
   "MOZ",
   "NAM",
   "SWZ",
   "ZWE"
  ],
  "seaNeighbors": []
 },
 "ETH": {
  "id": "ETH",
  "name": "اتیوپی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 140,
  "population": 132,
  "stability": 28,
  "militarySpendPct": 0.8,
  "inflation": 15,
  "debtRatio": 0.4,
  "military": {
   "active": 356,
   "nuclear": false,
   "land": 10,
   "air": 5,
   "navy": 4,
   "missile": 1,
   "airDefense": 5,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 16.2,
   "consumption": 32.4
  },
  "terrain": "plain",
  "pos": [
   39.61,
   8.61
  ],
  "borderPos": {
   "SSD": [
    33.51,
    7.71
   ],
   "SDN": [
    35.06,
    11.62
   ],
   "SOM": [
    47.31,
    8
   ],
   "KEN": [
    37.76,
    3.86
   ],
   "ERI": [
    39.02,
    14.63
   ],
   "DJI": [
    41.87,
    10.96
   ]
  },
  "neighbors": [
   "DJI",
   "ERI",
   "KEN",
   "SDN",
   "SOM",
   "SSD"
  ],
  "seaNeighbors": []
 },
 "KEN": {
  "id": "KEN",
  "name": "کنیا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 120,
  "population": 57,
  "stability": 48,
  "militarySpendPct": 1,
  "inflation": 5,
  "debtRatio": 0.7,
  "military": {
   "active": 171,
   "nuclear": false,
   "land": 11,
   "air": 6,
   "navy": 4,
   "missile": 1,
   "airDefense": 5,
   "cyber": 2,
   "drone": 2
  },
  "energy": {
   "production": 9.7,
   "consumption": 19.3
  },
  "terrain": "plain",
  "pos": [
   37.8,
   0.6
  ],
  "borderPos": {
   "UGA": [
    34.98,
    1.72
   ],
   "TZA": [
    37.68,
    -3.18
   ],
   "SSD": [
    34.64,
    4.88
   ],
   "SOM": [
    40.97,
    1.38
   ],
   "ETH": [
    37.76,
    3.86
   ]
  },
  "neighbors": [
   "ETH",
   "SOM",
   "SSD",
   "TZA",
   "UGA"
  ],
  "seaNeighbors": []
 },
 "TZA": {
  "id": "TZA",
  "name": "تانزانیا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 85,
  "population": 70,
  "stability": 58,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 210,
   "nuclear": false,
   "land": 8,
   "air": 5,
   "navy": 3,
   "missile": 1,
   "airDefense": 4,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 9.1,
   "consumption": 18.2
  },
  "terrain": "plain",
  "pos": [
   34.79,
   -6.27
  ],
  "borderPos": {
   "ZMB": [
    31.82,
    -8.9
   ],
   "UGA": [
    31.66,
    -1
   ],
   "RWA": [
    30.82,
    -1.97
   ],
   "MOZ": [
    37.37,
    -11.71
   ],
   "MWI": [
    34.52,
    -10.07
   ],
   "KEN": [
    37.68,
    -3.18
   ],
   "COD": [
    29.51,
    -6.17
   ],
   "BDI": [
    30.81,
    -3.2
   ]
  },
  "neighbors": [
   "BDI",
   "COD",
   "KEN",
   "MOZ",
   "MWI",
   "RWA",
   "UGA",
   "ZMB"
  ],
  "seaNeighbors": []
 },
 "UGA": {
  "id": "UGA",
  "name": "اوگاندا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 58,
  "population": 51,
  "stability": 48,
  "militarySpendPct": 2.2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 245,
   "nuclear": false,
   "land": 11,
   "air": 6,
   "navy": 4,
   "missile": 1,
   "airDefense": 5,
   "cyber": 2,
   "drone": 1
  },
  "energy": {
   "production": 6.5,
   "consumption": 12.9
  },
  "terrain": "plain",
  "pos": [
   32.37,
   1.27
  ],
  "borderPos": {
   "TZA": [
    31.66,
    -1
   ],
   "SSD": [
    32.14,
    3.52
   ],
   "RWA": [
    30.1,
    -1.37
   ],
   "KEN": [
    34.98,
    1.72
   ],
   "COD": [
    31.16,
    1.92
   ]
  },
  "neighbors": [
   "COD",
   "KEN",
   "RWA",
   "SSD",
   "TZA"
  ],
  "seaNeighbors": []
 },
 "DZA": {
  "id": "DZA",
  "name": "الجزایر",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 270,
  "population": 47,
  "stability": 55,
  "militarySpendPct": 8,
  "inflation": 5,
  "debtRatio": 0.5,
  "military": {
   "active": 635,
   "nuclear": false,
   "land": 43,
   "air": 30,
   "navy": 19,
   "missile": 9,
   "airDefense": 25,
   "cyber": 16,
   "drone": 13
  },
  "energy": {
   "production": 150,
   "consumption": 65
  },
  "terrain": "plain",
  "pos": [
   2.63,
   28.06
  ],
  "borderPos": {
   "TUN": [
    7.95,
    34.47
   ],
   "NER": [
    6.99,
    20.47
   ],
   "MAR": [
    -3.81,
    31.17
   ],
   "MRT": [
    -6.8,
    26.18
   ],
   "MLI": [
    1.93,
    20.27
   ],
   "LBY": [
    9.69,
    26.44
   ]
  },
  "neighbors": [
   "LBY",
   "MAR",
   "MLI",
   "MRT",
   "NER",
   "TUN"
  ],
  "seaNeighbors": [
   "FRA"
  ]
 },
 "MAR": {
  "id": "MAR",
  "name": "مراکش",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "M",
  "gdp": 165,
  "population": 38,
  "stability": 62,
  "militarySpendPct": 4,
  "inflation": 2,
  "debtRatio": 0.7,
  "military": {
   "active": 285,
   "nuclear": false,
   "land": 28,
   "air": 18,
   "navy": 12,
   "missile": 5,
   "airDefense": 15,
   "cyber": 9,
   "drone": 7
  },
  "energy": {
   "production": 10.3,
   "consumption": 20.6
  },
  "terrain": "plain",
  "pos": [
   -8.73,
   29.77
  ],
  "borderPos": {
   "MRT": [
    -12.08,
    23.43
   ],
   "DZA": [
    -3.81,
    31.17
   ]
  },
  "neighbors": [
   "DZA",
   "MRT"
  ],
  "seaNeighbors": [
   "ESP"
  ]
 },
 "TUN": {
  "id": "TUN",
  "name": "تونس",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 55,
  "population": 12.3,
  "stability": 48,
  "militarySpendPct": 2.5,
  "inflation": 6,
  "debtRatio": 0.8,
  "military": {
   "active": 65,
   "nuclear": false,
   "land": 12,
   "air": 8,
   "navy": 5,
   "missile": 2,
   "airDefense": 7,
   "cyber": 4,
   "drone": 3
  },
  "energy": {
   "production": 3.4,
   "consumption": 6.8
  },
  "terrain": "plain",
  "pos": [
   9.55,
   34.09
  ],
  "borderPos": {
   "LBY": [
    10.47,
    31.74
   ],
   "DZA": [
    7.95,
    34.47
   ]
  },
  "neighbors": [
   "DZA",
   "LBY"
  ],
  "seaNeighbors": [
   "ITA"
  ]
 },
 "LBY": {
  "id": "LBY",
  "name": "لیبی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 45,
  "population": 7.4,
  "stability": 25,
  "militarySpendPct": 2,
  "inflation": 3,
  "debtRatio": 0.4,
  "military": {
   "active": 33,
   "nuclear": false,
   "land": 9,
   "air": 6,
   "navy": 4,
   "missile": 2,
   "airDefense": 5,
   "cyber": 3,
   "drone": 3
  },
  "energy": {
   "production": 70,
   "consumption": 20
  },
  "terrain": "plain",
  "pos": [
   18.07,
   27.02
  ],
  "borderPos": {
   "TUN": [
    10.47,
    31.74
   ],
   "SDN": [
    24.97,
    20
   ],
   "NER": [
    13.86,
    22.9
   ],
   "TCD": [
    19.19,
    21.86
   ],
   "EGY": [
    24.98,
    27.83
   ],
   "DZA": [
    9.69,
    26.44
   ]
  },
  "neighbors": [
   "DZA",
   "EGY",
   "NER",
   "SDN",
   "TCD",
   "TUN"
  ],
  "seaNeighbors": [
   "ITA"
  ]
 },
 "SDN": {
  "id": "SDN",
  "name": "سودان",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 30,
  "population": 51,
  "stability": 8,
  "militarySpendPct": 3,
  "inflation": 60,
  "debtRatio": 1.5,
  "military": {
   "active": 306,
   "nuclear": false,
   "land": 9,
   "air": 5,
   "navy": 3,
   "missile": 1,
   "airDefense": 4,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 5.2,
   "consumption": 10.4
  },
  "terrain": "plain",
  "pos": [
   29.91,
   15.97
  ],
  "borderPos": {
   "SSD": [
    31.79,
    10.38
   ],
   "TCD": [
    22.34,
    14.03
   ],
   "LBY": [
    24.97,
    20
   ],
   "ETH": [
    35.06,
    11.62
   ],
   "ERI": [
    37.45,
    17.11
   ],
   "EGY": [
    31.46,
    22.19
   ],
   "CAF": [
    23.6,
    9.26
   ]
  },
  "neighbors": [
   "CAF",
   "EGY",
   "ERI",
   "ETH",
   "LBY",
   "SSD",
   "TCD"
  ],
  "seaNeighbors": [
   "SAU"
  ]
 },
 "SSD": {
  "id": "SSD",
  "name": "سودان جنوبی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 5,
  "population": 11.9,
  "stability": 12,
  "militarySpendPct": 3,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 71,
   "nuclear": false,
   "land": 2,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 8,
   "consumption": 2
  },
  "terrain": "plain",
  "pos": [
   30.25,
   7.31
  ],
  "borderPos": {
   "UGA": [
    32.14,
    3.52
   ],
   "SDN": [
    31.79,
    10.38
   ],
   "KEN": [
    34.64,
    4.88
   ],
   "ETH": [
    33.51,
    7.71
   ],
   "COD": [
    29.15,
    4.39
   ],
   "CAF": [
    26.09,
    6.87
   ]
  },
  "neighbors": [
   "CAF",
   "COD",
   "ETH",
   "KEN",
   "SDN",
   "UGA"
  ],
  "seaNeighbors": []
 },
 "SOM": {
  "id": "SOM",
  "name": "سومالی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 12,
  "population": 19,
  "stability": 15,
  "militarySpendPct": 2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 86,
   "nuclear": false,
   "land": 3,
   "air": 2,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 2,
   "consumption": 3.9
  },
  "terrain": "plain",
  "pos": [
   45.68,
   4.74
  ],
  "borderPos": {
   "KEN": [
    40.97,
    1.38
   ],
   "ETH": [
    47.31,
    8
   ],
   "DJI": [
    43.16,
    11.37
   ]
  },
  "neighbors": [
   "DJI",
   "ETH",
   "KEN"
  ],
  "seaNeighbors": []
 },
 "DJI": {
  "id": "DJI",
  "name": "جیبوتی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 4.5,
  "population": 1.2,
  "stability": 55,
  "militarySpendPct": 3,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 7,
   "nuclear": false,
   "land": 2,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 1,
   "drone": 0
  },
  "energy": {
   "production": 0.3,
   "consumption": 0.6
  },
  "terrain": "plain",
  "pos": [
   42.56,
   11.75
  ],
  "borderPos": {
   "SOM": [
    43.16,
    11.37
   ],
   "ETH": [
    41.87,
    10.96
   ],
   "ERI": [
    42.71,
    12.38
   ]
  },
  "neighbors": [
   "ERI",
   "ETH",
   "SOM"
  ],
  "seaNeighbors": [
   "YEM"
  ]
 },
 "ERI": {
  "id": "ERI",
  "name": "اریتره",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 2.5,
  "population": 3.6,
  "stability": 40,
  "militarySpendPct": 10,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 59,
   "nuclear": false,
   "land": 3,
   "air": 2,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.4,
   "consumption": 0.8
  },
  "terrain": "plain",
  "pos": [
   38.85,
   15.36
  ],
  "borderPos": {
   "SDN": [
    37.45,
    17.11
   ],
   "ETH": [
    39.02,
    14.63
   ],
   "DJI": [
    42.71,
    12.38
   ]
  },
  "neighbors": [
   "DJI",
   "ETH",
   "SDN"
  ],
  "seaNeighbors": [
   "SAU",
   "YEM"
  ]
 },
 "AGO": {
  "id": "AGO",
  "name": "آنگولا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 110,
  "population": 39,
  "stability": 45,
  "militarySpendPct": 1.3,
  "inflation": 20,
  "debtRatio": 0.6,
  "military": {
   "active": 135,
   "nuclear": false,
   "land": 12,
   "air": 7,
   "navy": 5,
   "missile": 2,
   "airDefense": 6,
   "cyber": 3,
   "drone": 3
  },
  "energy": {
   "production": 70,
   "consumption": 18
  },
  "terrain": "plain",
  "pos": [
   17.56,
   -12.31
  ],
  "borderPos": {
   "ZMB": [
    23.34,
    -13
   ],
   "NAM": [
    17.3,
    -17.39
   ],
   "COD": [
    19.49,
    -7.28
   ],
   "COG": [
    12.5,
    -4.59
   ]
  },
  "neighbors": [
   "COD",
   "COG",
   "NAM",
   "ZMB"
  ],
  "seaNeighbors": []
 },
 "COD": {
  "id": "COD",
  "name": "کنگو (دموکراتیک)",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 75,
  "population": 112,
  "stability": 15,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 336,
   "nuclear": false,
   "land": 8,
   "air": 4,
   "navy": 3,
   "missile": 1,
   "airDefense": 3,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 11.8,
   "consumption": 23.6
  },
  "terrain": "plain",
  "pos": [
   23.64,
   -2.87
  ],
  "borderPos": {
   "ZMB": [
    29.2,
    -13.4
   ],
   "UGA": [
    31.16,
    1.92
   ],
   "TZA": [
    29.51,
    -6.17
   ],
   "SSD": [
    29.15,
    4.39
   ],
   "RWA": [
    29.15,
    -2.13
   ],
   "COG": [
    15.11,
    -4.46
   ],
   "CAF": [
    22.62,
    4.44
   ],
   "BDI": [
    29.21,
    -3.36
   ],
   "AGO": [
    19.49,
    -7.28
   ]
  },
  "neighbors": [
   "AGO",
   "BDI",
   "CAF",
   "COG",
   "RWA",
   "SSD",
   "TZA",
   "UGA",
   "ZMB"
  ],
  "seaNeighbors": []
 },
 "COG": {
  "id": "COG",
  "name": "کنگو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 15,
  "population": 6.3,
  "stability": 45,
  "militarySpendPct": 2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 28,
   "nuclear": false,
   "land": 4,
   "air": 2,
   "navy": 1,
   "missile": 0,
   "airDefense": 2,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 18,
   "consumption": 3
  },
  "terrain": "plain",
  "pos": [
   15.22,
   -0.84
  ],
  "borderPos": {
   "COD": [
    15.11,
    -4.46
   ],
   "GAB": [
    14,
    -2.49
   ],
   "CAF": [
    17.44,
    3.68
   ],
   "CMR": [
    15.28,
    1.98
   ],
   "AGO": [
    12.5,
    -4.59
   ]
  },
  "neighbors": [
   "AGO",
   "CAF",
   "CMR",
   "COD",
   "GAB"
  ],
  "seaNeighbors": []
 },
 "CMR": {
  "id": "CMR",
  "name": "کامرون",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 55,
  "population": 30,
  "stability": 38,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 90,
   "nuclear": false,
   "land": 6,
   "air": 3,
   "navy": 2,
   "missile": 1,
   "airDefense": 3,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 4.8,
   "consumption": 9.5
  },
  "terrain": "plain",
  "pos": [
   12.73,
   5.68
  ],
  "borderPos": {
   "CAF": [
    14.71,
    4.67
   ],
   "NGA": [
    11.85,
    7.4
   ],
   "GAB": [
    12.36,
    2.3
   ],
   "GNQ": [
    9.98,
    2.17
   ],
   "COG": [
    15.28,
    1.98
   ],
   "TCD": [
    15.13,
    9.98
   ]
  },
  "neighbors": [
   "CAF",
   "COG",
   "GAB",
   "GNQ",
   "NGA",
   "TCD"
  ],
  "seaNeighbors": []
 },
 "GAB": {
  "id": "GAB",
  "name": "گابن",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 21,
  "population": 2.5,
  "stability": 45,
  "militarySpendPct": 1.2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 8,
   "nuclear": false,
   "land": 3,
   "air": 2,
   "navy": 1,
   "missile": 1,
   "airDefense": 2,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 15,
   "consumption": 3
  },
  "terrain": "plain",
  "pos": [
   11.79,
   -0.59
  ],
  "borderPos": {
   "GNQ": [
    10.18,
    1
   ],
   "COG": [
    14,
    -2.49
   ],
   "CMR": [
    12.36,
    2.3
   ]
  },
  "neighbors": [
   "CMR",
   "COG",
   "GNQ"
  ],
  "seaNeighbors": []
 },
 "GNQ": {
  "id": "GNQ",
  "name": "گینه استوایی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 12,
  "population": 1.9,
  "stability": 45,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 6,
   "nuclear": false,
   "land": 2,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 1,
   "drone": 0
  },
  "energy": {
   "production": 15,
   "consumption": 2
  },
  "terrain": "plain",
  "pos": [
   10.47,
   1.57
  ],
  "borderPos": {
   "GAB": [
    10.18,
    1
   ],
   "CMR": [
    9.98,
    2.17
   ]
  },
  "neighbors": [
   "CMR",
   "GAB"
  ],
  "seaNeighbors": []
 },
 "CAF": {
  "id": "CAF",
  "name": "آفریقای مرکزی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 3,
  "population": 5.5,
  "stability": 15,
  "militarySpendPct": 1.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 21,
   "nuclear": false,
   "land": 1,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.6,
   "consumption": 1.1
  },
  "terrain": "plain",
  "pos": [
   20.46,
   6.57
  ],
  "borderPos": {
   "SSD": [
    26.09,
    6.87
   ],
   "SDN": [
    23.6,
    9.26
   ],
   "COD": [
    22.62,
    4.44
   ],
   "COG": [
    17.44,
    3.68
   ],
   "TCD": [
    18.89,
    8.89
   ],
   "CMR": [
    14.71,
    4.67
   ]
  },
  "neighbors": [
   "CMR",
   "COD",
   "COG",
   "SDN",
   "SSD",
   "TCD"
  ],
  "seaNeighbors": []
 },
 "TCD": {
  "id": "TCD",
  "name": "چاد",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 20,
  "population": 20.3,
  "stability": 28,
  "militarySpendPct": 3,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 122,
   "nuclear": false,
   "land": 6,
   "air": 3,
   "navy": 2,
   "missile": 0,
   "airDefense": 3,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 7,
   "consumption": 2
  },
  "terrain": "plain",
  "pos": [
   18.64,
   15.28
  ],
  "borderPos": {
   "SDN": [
    22.34,
    14.03
   ],
   "NGA": [
    13.93,
    13.26
   ],
   "NER": [
    15.7,
    19.5
   ],
   "LBY": [
    19.19,
    21.86
   ],
   "CAF": [
    18.89,
    8.89
   ],
   "CMR": [
    15.13,
    9.98
   ]
  },
  "neighbors": [
   "CAF",
   "CMR",
   "LBY",
   "NER",
   "NGA",
   "SDN"
  ],
  "seaNeighbors": []
 },
 "NER": {
  "id": "NER",
  "name": "نیجر",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 21,
  "population": 27.9,
  "stability": 25,
  "militarySpendPct": 2.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 146,
   "nuclear": false,
   "land": 6,
   "air": 3,
   "navy": 2,
   "missile": 0,
   "airDefense": 3,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 3.1,
   "consumption": 6.1
  },
  "terrain": "plain",
  "pos": [
   9.33,
   17.41
  ],
  "borderPos": {
   "NGA": [
    6.87,
    13.04
   ],
   "TCD": [
    15.7,
    19.5
   ],
   "MLI": [
    3.71,
    15.64
   ],
   "LBY": [
    13.86,
    22.9
   ],
   "BFA": [
    0.98,
    13.32
   ],
   "BEN": [
    2.81,
    12.38
   ],
   "DZA": [
    6.99,
    20.47
   ]
  },
  "neighbors": [
   "BEN",
   "BFA",
   "DZA",
   "LBY",
   "MLI",
   "NGA",
   "TCD"
  ],
  "seaNeighbors": []
 },
 "MLI": {
  "id": "MLI",
  "name": "مالی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 24,
  "population": 24.5,
  "stability": 22,
  "militarySpendPct": 3.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 165,
   "nuclear": false,
   "land": 8,
   "air": 4,
   "navy": 3,
   "missile": 1,
   "airDefense": 4,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 2.9,
   "consumption": 5.8
  },
  "terrain": "plain",
  "pos": [
   -3.59,
   17.32
  ],
  "borderPos": {
   "SEN": [
    -11.83,
    13.32
   ],
   "NER": [
    3.71,
    15.64
   ],
   "MRT": [
    -6.95,
    15.5
   ],
   "GIN": [
    -9.37,
    12.48
   ],
   "CIV": [
    -6.68,
    10.63
   ],
   "BFA": [
    -3.95,
    13.4
   ],
   "DZA": [
    1.93,
    20.27
   ]
  },
  "neighbors": [
   "BFA",
   "CIV",
   "DZA",
   "GIN",
   "MRT",
   "NER",
   "SEN"
  ],
  "seaNeighbors": []
 },
 "BFA": {
  "id": "BFA",
  "name": "بورکینافاسو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 22,
  "population": 24,
  "stability": 20,
  "militarySpendPct": 4,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 180,
   "nuclear": false,
   "land": 9,
   "air": 4,
   "navy": 3,
   "missile": 1,
   "airDefense": 4,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 2.8,
   "consumption": 5.6
  },
  "terrain": "plain",
  "pos": [
   -1.76,
   12.27
  ],
  "borderPos": {
   "TGO": [
    0.49,
    10.95
   ],
   "NER": [
    0.98,
    13.32
   ],
   "MLI": [
    -3.95,
    13.4
   ],
   "GHA": [
    -2.23,
    10.99
   ],
   "CIV": [
    -4.18,
    9.78
   ],
   "BEN": [
    1.28,
    11.27
   ]
  },
  "neighbors": [
   "BEN",
   "CIV",
   "GHA",
   "MLI",
   "NER",
   "TGO"
  ],
  "seaNeighbors": []
 },
 "SEN": {
  "id": "SEN",
  "name": "سنگال",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 33,
  "population": 19,
  "stability": 62,
  "militarySpendPct": 1.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 71,
   "nuclear": false,
   "land": 6,
   "air": 3,
   "navy": 2,
   "missile": 1,
   "airDefense": 3,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 2.9,
   "consumption": 5.8
  },
  "terrain": "plain",
  "pos": [
   -14.47,
   14.36
  ],
  "borderPos": {
   "MRT": [
    -13.76,
    16.17
   ],
   "MLI": [
    -11.83,
    13.32
   ],
   "GNB": [
    -15.84,
    12.44
   ],
   "GIN": [
    -12.89,
    12.52
   ],
   "GMB": [
    -14.01,
    13.3
   ]
  },
  "neighbors": [
   "GIN",
   "GMB",
   "GNB",
   "MLI",
   "MRT"
  ],
  "seaNeighbors": []
 },
 "GMB": {
  "id": "GMB",
  "name": "گامبیا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 2.6,
  "population": 2.8,
  "stability": 55,
  "militarySpendPct": 0.7,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 7,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.4,
   "consumption": 0.7
  },
  "terrain": "plain",
  "pos": [
   -15.4,
   13.45
  ],
  "borderPos": {
   "SEN": [
    -14.01,
    13.3
   ]
  },
  "neighbors": [
   "SEN"
  ],
  "seaNeighbors": []
 },
 "GNB": {
  "id": "GNB",
  "name": "گینهٔ بیسائو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 2.2,
  "population": 2.2,
  "stability": 35,
  "militarySpendPct": 1.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 8,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.3,
   "consumption": 0.5
  },
  "terrain": "plain",
  "pos": [
   -14.92,
   12.06
  ],
  "borderPos": {
   "SEN": [
    -15.84,
    12.44
   ],
   "GIN": [
    -13.73,
    11.96
   ]
  },
  "neighbors": [
   "GIN",
   "SEN"
  ],
  "seaNeighbors": []
 },
 "GIN": {
  "id": "GIN",
  "name": "گینه",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 25,
  "population": 14.8,
  "stability": 38,
  "militarySpendPct": 1.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 56,
   "nuclear": false,
   "land": 4,
   "air": 2,
   "navy": 2,
   "missile": 0,
   "airDefense": 2,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 2.3,
   "consumption": 4.5
  },
  "terrain": "plain",
  "pos": [
   -10.93,
   10.44
  ],
  "borderPos": {
   "SLE": [
    -11.05,
    9.79
   ],
   "SEN": [
    -12.89,
    12.52
   ],
   "MLI": [
    -9.37,
    12.48
   ],
   "LBR": [
    -9.38,
    7.57
   ],
   "GNB": [
    -13.73,
    11.96
   ],
   "CIV": [
    -7.74,
    8.38
   ]
  },
  "neighbors": [
   "CIV",
   "GNB",
   "LBR",
   "MLI",
   "SEN",
   "SLE"
  ],
  "seaNeighbors": []
 },
 "SLE": {
  "id": "SLE",
  "name": "سیرالئون",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 7.5,
  "population": 8.8,
  "stability": 48,
  "militarySpendPct": 0.6,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 21,
   "nuclear": false,
   "land": 1,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 1,
   "consumption": 2
  },
  "terrain": "plain",
  "pos": [
   -11.79,
   8.57
  ],
  "borderPos": {
   "LBR": [
    -10.69,
    7.74
   ],
   "GIN": [
    -11.05,
    9.79
   ]
  },
  "neighbors": [
   "GIN",
   "LBR"
  ],
  "seaNeighbors": []
 },
 "LBR": {
  "id": "LBR",
  "name": "لیبریا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 5,
  "population": 5.6,
  "stability": 45,
  "militarySpendPct": 0.6,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 13,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.7,
   "consumption": 1.3
  },
  "terrain": "plain",
  "pos": [
   -9.32,
   6.45
  ],
  "borderPos": {
   "SLE": [
    -10.69,
    7.74
   ],
   "GIN": [
    -9.38,
    7.57
   ],
   "CIV": [
    -7.83,
    6.08
   ]
  },
  "neighbors": [
   "CIV",
   "GIN",
   "SLE"
  ],
  "seaNeighbors": []
 },
 "CIV": {
  "id": "CIV",
  "name": "ساحل عاج",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 87,
  "population": 32,
  "stability": 55,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 96,
   "nuclear": false,
   "land": 9,
   "air": 5,
   "navy": 4,
   "missile": 1,
   "airDefense": 4,
   "cyber": 2,
   "drone": 2
  },
  "energy": {
   "production": 6.3,
   "consumption": 12.6
  },
  "terrain": "plain",
  "pos": [
   -5.57,
   7.63
  ],
  "borderPos": {
   "MLI": [
    -6.68,
    10.63
   ],
   "LBR": [
    -7.83,
    6.08
   ],
   "GIN": [
    -7.74,
    8.38
   ],
   "GHA": [
    -2.98,
    7.26
   ],
   "BFA": [
    -4.18,
    9.78
   ]
  },
  "neighbors": [
   "BFA",
   "GHA",
   "GIN",
   "LBR",
   "MLI"
  ],
  "seaNeighbors": []
 },
 "GHA": {
  "id": "GHA",
  "name": "غنا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 80,
  "population": 35,
  "stability": 60,
  "militarySpendPct": 0.4,
  "inflation": 15,
  "debtRatio": 0.7,
  "military": {
   "active": 74,
   "nuclear": false,
   "land": 4,
   "air": 2,
   "navy": 2,
   "missile": 0,
   "airDefense": 2,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 6.3,
   "consumption": 12.5
  },
  "terrain": "plain",
  "pos": [
   -1.22,
   7.95
  ],
  "borderPos": {
   "TGO": [
    0.5,
    8.89
   ],
   "CIV": [
    -2.98,
    7.26
   ],
   "BFA": [
    -2.23,
    10.99
   ]
  },
  "neighbors": [
   "BFA",
   "CIV",
   "TGO"
  ],
  "seaNeighbors": []
 },
 "TGO": {
  "id": "TGO",
  "name": "توگو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 10,
  "population": 9.5,
  "stability": 50,
  "militarySpendPct": 2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 43,
   "nuclear": false,
   "land": 3,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 1.2,
   "consumption": 2.3
  },
  "terrain": "plain",
  "pos": [
   0.96,
   8.52
  ],
  "borderPos": {
   "GHA": [
    0.5,
    8.89
   ],
   "BFA": [
    0.49,
    10.95
   ],
   "BEN": [
    1.6,
    8.77
   ]
  },
  "neighbors": [
   "BEN",
   "BFA",
   "GHA"
  ],
  "seaNeighbors": []
 },
 "BEN": {
  "id": "BEN",
  "name": "بنین",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 21,
  "population": 14.5,
  "stability": 52,
  "militarySpendPct": 0.8,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 39,
   "nuclear": false,
   "land": 2,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 2.1,
   "consumption": 4.1
  },
  "terrain": "plain",
  "pos": [
   2.33,
   9.64
  ],
  "borderPos": {
   "TGO": [
    1.6,
    8.77
   ],
   "NGA": [
    3.14,
    9.45
   ],
   "NER": [
    2.81,
    12.38
   ],
   "BFA": [
    1.28,
    11.27
   ]
  },
  "neighbors": [
   "BFA",
   "NER",
   "NGA",
   "TGO"
  ],
  "seaNeighbors": []
 },
 "MRT": {
  "id": "MRT",
  "name": "موریتانی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 11,
  "population": 5.2,
  "stability": 50,
  "militarySpendPct": 2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 23,
   "nuclear": false,
   "land": 3,
   "air": 2,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 1,
   "drone": 0
  },
  "energy": {
   "production": 0.9,
   "consumption": 1.8
  },
  "terrain": "plain",
  "pos": [
   -10.37,
   20.22
  ],
  "borderPos": {
   "MAR": [
    -12.08,
    23.43
   ],
   "SEN": [
    -13.76,
    16.17
   ],
   "MLI": [
    -6.95,
    15.5
   ],
   "DZA": [
    -6.8,
    26.18
   ]
  },
  "neighbors": [
   "DZA",
   "MAR",
   "MLI",
   "SEN"
  ],
  "seaNeighbors": []
 },
 "CPV": {
  "id": "CPV",
  "name": "کیپ ورد",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 2.8,
  "population": 0.53,
  "stability": 72,
  "militarySpendPct": 0.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 1,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.2,
   "consumption": 0.3
  },
  "terrain": "plain",
  "pos": [
   -23.64,
   15.08
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "STP": {
  "id": "STP",
  "name": "سائوتومه و پرنسیپ",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 0.7,
  "population": 0.23,
  "stability": 62,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.1,
   "consumption": 0.1
  },
  "terrain": "plain",
  "pos": [
   6.61,
   0.24
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "ZMB": {
  "id": "ZMB",
  "name": "زامبیا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 29,
  "population": 21.5,
  "stability": 55,
  "militarySpendPct": 1.2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 71,
   "nuclear": false,
   "land": 4,
   "air": 2,
   "navy": 2,
   "missile": 0,
   "airDefense": 2,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 2.9,
   "consumption": 5.8
  },
  "terrain": "plain",
  "pos": [
   27.81,
   -13.46
  ],
  "borderPos": {
   "ZWE": [
    27.93,
    -16.9
   ],
   "TZA": [
    31.82,
    -8.9
   ],
   "NAM": [
    24.27,
    -17.48
   ],
   "MOZ": [
    31.13,
    -14.69
   ],
   "MWI": [
    33.3,
    -11.89
   ],
   "COD": [
    29.2,
    -13.4
   ],
   "AGO": [
    23.34,
    -13
   ]
  },
  "neighbors": [
   "AGO",
   "COD",
   "MOZ",
   "MWI",
   "NAM",
   "TZA",
   "ZWE"
  ],
  "seaNeighbors": []
 },
 "ZWE": {
  "id": "ZWE",
  "name": "زیمبابوه",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 36,
  "population": 17,
  "stability": 38,
  "militarySpendPct": 0.8,
  "inflation": 50,
  "debtRatio": 0.7,
  "military": {
   "active": 46,
   "nuclear": false,
   "land": 3,
   "air": 2,
   "navy": 1,
   "missile": 0,
   "airDefense": 2,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 2.9,
   "consumption": 5.8
  },
  "terrain": "plain",
  "pos": [
   29.85,
   -19
  ],
  "borderPos": {
   "ZMB": [
    27.93,
    -16.9
   ],
   "ZAF": [
    30.46,
    -22.33
   ],
   "MOZ": [
    32.72,
    -18.83
   ],
   "BWA": [
    27.62,
    -20.48
   ]
  },
  "neighbors": [
   "BWA",
   "MOZ",
   "ZAF",
   "ZMB"
  ],
  "seaNeighbors": []
 },
 "MWI": {
  "id": "MWI",
  "name": "مالاوی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 11,
  "population": 22,
  "stability": 48,
  "militarySpendPct": 0.8,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 59,
   "nuclear": false,
   "land": 1,
   "air": 1,
   "navy": 0,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 2.2,
   "consumption": 4.3
  },
  "terrain": "plain",
  "pos": [
   34.28,
   -13.21
  ],
  "borderPos": {
   "MOZ": [
    35.29,
    -17.1
   ],
   "ZMB": [
    33.3,
    -11.89
   ],
   "TZA": [
    34.52,
    -10.07
   ]
  },
  "neighbors": [
   "MOZ",
   "TZA",
   "ZMB"
  ],
  "seaNeighbors": []
 },
 "MOZ": {
  "id": "MOZ",
  "name": "موزامبیک",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 23,
  "population": 35,
  "stability": 30,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 105,
   "nuclear": false,
   "land": 3,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 3.7,
   "consumption": 7.3
  },
  "terrain": "plain",
  "pos": [
   35.6,
   -17.2
  ],
  "borderPos": {
   "ZWE": [
    32.72,
    -18.83
   ],
   "ZMB": [
    31.13,
    -14.69
   ],
   "TZA": [
    37.37,
    -11.71
   ],
   "SWZ": [
    32.04,
    -26.28
   ],
   "ZAF": [
    31.86,
    -24.04
   ],
   "MWI": [
    35.29,
    -17.1
   ]
  },
  "neighbors": [
   "MWI",
   "SWZ",
   "TZA",
   "ZAF",
   "ZMB",
   "ZWE"
  ],
  "seaNeighbors": []
 },
 "MDG": {
  "id": "MDG",
  "name": "ماداگاسکار",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 17,
  "population": 32,
  "stability": 40,
  "militarySpendPct": 0.6,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 77,
   "nuclear": false,
   "land": 1,
   "air": 1,
   "navy": 0,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 3.2,
   "consumption": 6.3
  },
  "terrain": "plain",
  "pos": [
   46.74,
   -19.32
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "BWA": {
  "id": "BWA",
  "name": "بوتسوانا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 20,
  "population": 2.5,
  "stability": 72,
  "militarySpendPct": 2.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 13,
   "nuclear": false,
   "land": 6,
   "air": 4,
   "navy": 3,
   "missile": 1,
   "airDefense": 3,
   "cyber": 2,
   "drone": 2
  },
  "energy": {
   "production": 1.1,
   "consumption": 2.2
  },
  "terrain": "plain",
  "pos": [
   23.81,
   -22.17
  ],
  "borderPos": {
   "ZWE": [
    27.62,
    -20.48
   ],
   "ZAF": [
    24.33,
    -25.74
   ],
   "NAM": [
    21.23,
    -18.31
   ]
  },
  "neighbors": [
   "NAM",
   "ZAF",
   "ZWE"
  ],
  "seaNeighbors": []
 },
 "NAM": {
  "id": "NAM",
  "name": "نامیبیا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 13,
  "population": 3.1,
  "stability": 68,
  "militarySpendPct": 3,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 19,
   "nuclear": false,
   "land": 5,
   "air": 3,
   "navy": 2,
   "missile": 1,
   "airDefense": 2,
   "cyber": 1,
   "drone": 1
  },
  "energy": {
   "production": 0.8,
   "consumption": 1.6
  },
  "terrain": "plain",
  "pos": [
   17.2,
   -22.07
  ],
  "borderPos": {
   "ZMB": [
    24.27,
    -17.48
   ],
   "ZAF": [
    17.7,
    -28.77
   ],
   "BWA": [
    21.23,
    -18.31
   ],
   "AGO": [
    17.3,
    -17.39
   ]
  },
  "neighbors": [
   "AGO",
   "BWA",
   "ZAF",
   "ZMB"
  ],
  "seaNeighbors": []
 },
 "LSO": {
  "id": "LSO",
  "name": "لسوتو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 2.4,
  "population": 2.3,
  "stability": 50,
  "militarySpendPct": 1.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 9,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.3,
   "consumption": 0.6
  },
  "terrain": "plain",
  "pos": [
   28.23,
   -29.58
  ],
  "borderPos": {
   "ZAF": [
    27.42,
    -29.36
   ]
  },
  "neighbors": [
   "ZAF"
  ],
  "seaNeighbors": []
 },
 "SWZ": {
  "id": "SWZ",
  "name": "اسواتینی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "M",
  "gdp": 5,
  "population": 1.2,
  "stability": 50,
  "militarySpendPct": 1.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 5,
   "nuclear": false,
   "land": 1,
   "air": 1,
   "navy": 0,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.3,
   "consumption": 0.6
  },
  "terrain": "plain",
  "pos": [
   31.48,
   -26.56
  ],
  "borderPos": {
   "ZAF": [
    30.79,
    -26.77
   ],
   "MOZ": [
    32.04,
    -26.28
   ]
  },
  "neighbors": [
   "MOZ",
   "ZAF"
  ],
  "seaNeighbors": []
 },
 "RWA": {
  "id": "RWA",
  "name": "رواندا",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 14,
  "population": 14.6,
  "stability": 62,
  "militarySpendPct": 1.5,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 55,
   "nuclear": false,
   "land": 3,
   "air": 1,
   "navy": 1,
   "missile": 0,
   "airDefense": 1,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 1.8,
   "consumption": 3.5
  },
  "terrain": "plain",
  "pos": [
   29.92,
   -1.99
  ],
  "borderPos": {
   "UGA": [
    30.1,
    -1.37
   ],
   "TZA": [
    30.82,
    -1.97
   ],
   "COD": [
    29.15,
    -2.13
   ],
   "BDI": [
    29.89,
    -2.66
   ]
  },
  "neighbors": [
   "BDI",
   "COD",
   "TZA",
   "UGA"
  ],
  "seaNeighbors": []
 },
 "BDI": {
  "id": "BDI",
  "name": "بوروندی",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "A",
  "gdp": 3.5,
  "population": 14.4,
  "stability": 35,
  "militarySpendPct": 2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 65,
   "nuclear": false,
   "land": 1,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 1.3,
   "consumption": 2.5
  },
  "terrain": "plain",
  "pos": [
   29.88,
   -3.36
  ],
  "borderPos": {
   "TZA": [
    30.81,
    -3.2
   ],
   "RWA": [
    29.89,
    -2.66
   ],
   "COD": [
    29.21,
    -3.36
   ]
  },
  "neighbors": [
   "COD",
   "RWA",
   "TZA"
  ],
  "seaNeighbors": []
 },
 "COM": {
  "id": "COM",
  "name": "کومورو",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "H",
  "gdp": 1.4,
  "population": 0.88,
  "stability": 50,
  "militarySpendPct": 0,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 1,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.2,
   "consumption": 0.3
  },
  "terrain": "plain",
  "pos": [
   43.34,
   -11.65
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "MUS": {
  "id": "MUS",
  "name": "موریس",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 16,
  "population": 1.26,
  "stability": 75,
  "militarySpendPct": 0.2,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 2,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.8,
   "consumption": 1.6
  },
  "terrain": "plain",
  "pos": [
   57.57,
   -20.28
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 },
 "SYC": {
  "id": "SYC",
  "name": "سیشل",
  "playable": false,
  "difficulty": 0,
  "detailed": false,
  "capital": null,
  "gov": "D",
  "gdp": 2.2,
  "population": 0.13,
  "stability": 75,
  "militarySpendPct": 1,
  "inflation": 4,
  "debtRatio": 0.5,
  "military": {
   "active": 0,
   "nuclear": false,
   "land": 0,
   "air": 0,
   "navy": 0,
   "missile": 0,
   "airDefense": 0,
   "cyber": 0,
   "drone": 0
  },
  "energy": {
   "production": 0.1,
   "consumption": 0.2
  },
  "terrain": "plain",
  "pos": [
   55.48,
   -4.66
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": []
 }
};
