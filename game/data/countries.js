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
  "neighbors": [],
  "seaNeighbors": []
 }
};
