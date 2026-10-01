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
  "cities": [
   {
    "id": "USA-0",
    "name": "واشنگتن",
    "pos": [
     -77.04,
     38.9
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.077
    }
   },
   {
    "id": "USA-1",
    "name": "نیویورک",
    "pos": [
     -74,
     40.71
    ],
    "capital": false,
    "tags": [
     "port",
     "industry"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.077
    }
   },
   {
    "id": "USA-2",
    "name": "نورفولک",
    "pos": [
     -76.29,
     36.85
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.077
    }
   },
   {
    "id": "USA-3",
    "name": "شیکاگو",
    "pos": [
     -87.63,
     41.88
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.077
    }
   },
   {
    "id": "USA-4",
    "name": "هیوستون",
    "pos": [
     -95.37,
     29.76
    ],
    "capital": false,
    "tags": [
     "industry",
     "missile",
     "oil"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.308
    }
   },
   {
    "id": "USA-5",
    "name": "لس‌آنجلس",
    "pos": [
     -118.24,
     34.05
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.077
    }
   },
   {
    "id": "USA-6",
    "name": "سن‌دیگو",
    "pos": [
     -117.16,
     32.72
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.077
    }
   },
   {
    "id": "USA-7",
    "name": "سیاتل",
    "pos": [
     -122.33,
     47.61
    ],
    "capital": false,
    "tags": [
     "port",
     "industry"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.077
    }
   },
   {
    "id": "USA-8",
    "name": "آنکوریج",
    "pos": [
     -149.9,
     61.22
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.077
    }
   },
   {
    "id": "USA-9",
    "name": "هونولولو",
    "pos": [
     -157.86,
     21.31
    ],
    "capital": false,
    "tags": [
     "port",
     "air"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.077
    }
   }
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
  ],
  "area": 9449675,
  "front": {
   "CAN": {
    "r": [
     6.16,
     9.01,
     11.82,
     14.62,
     17.62,
     20.7,
     24.28,
     28.41,
     42.19,
     64.91000000000001
    ],
    "cap": 0.1
   },
   "MEX": {
    "r": [
     7.34,
     10.48,
     13.03,
     15.14,
     16.96,
     18.67,
     20.35,
     23.92,
     46.14,
     58.47
    ],
    "cap": 0.79
   }
  }
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
  "cities": [
   {
    "id": "CAN-0",
    "name": "اتاوا",
    "pos": [
     -75.7,
     45.42
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.25
    }
   },
   {
    "id": "CAN-1",
    "name": "تورنتو",
    "pos": [
     -79.38,
     43.65
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   },
   {
    "id": "CAN-2",
    "name": "ونکوور",
    "pos": [
     -123.12,
     49.28
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   },
   {
    "id": "CAN-3",
    "name": "هالیفاکس",
    "pos": [
     -63.57,
     44.65
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   }
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
  "seaNeighbors": [],
  "area": 9872102,
  "front": {
   "USA": {
    "r": [
     8.57,
     12.5,
     15.86,
     18.76,
     21.89,
     24.64,
     27.32,
     30.05,
     33.54,
     39.36
    ],
    "cap": 0.05
   }
  }
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
  "cities": [
   {
    "id": "MEX-0",
    "name": "مکزیکوسیتی",
    "pos": [
     -99.13,
     19.43
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.25
    }
   },
   {
    "id": "MEX-1",
    "name": "مونتری",
    "pos": [
     -100.31,
     25.69
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   },
   {
    "id": "MEX-2",
    "name": "وراکروز",
    "pos": [
     -96.13,
     19.17
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   },
   {
    "id": "MEX-3",
    "name": "تیخوانا",
    "pos": [
     -117.04,
     32.51
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   }
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
  "seaNeighbors": [],
  "area": 1962279,
  "front": {
   "BLZ": {
    "r": [
     4.01,
     8.63,
     10.94,
     12.7,
     14.33,
     15.88,
     17.95,
     20.47,
     23.04,
     29.060000000000002
    ],
    "cap": 0.25
   },
   "GTM": {
    "r": [
     4.01,
     7.48,
     10.28,
     12.15,
     13.88,
     15.63,
     17.69,
     20.22,
     22.78,
     28.84
    ],
    "cap": 0.24
   },
   "USA": {
    "r": [
     2.95,
     4.32,
     5.41,
     6.32,
     7.55,
     8.83,
     10.25,
     12.08,
     14.9,
     17.55
    ],
    "cap": 0.71
   }
  }
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
  "cities": [
   {
    "id": "GTM-0",
    "name": "پایتخت گواتمالا",
    "pos": [
     -90.37,
     15.69
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "GTM-1",
    "name": "جنوب گواتمالا",
    "pos": [
     -89.95,
     14.78
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "GTM-2",
    "name": "شرق گواتمالا",
    "pos": [
     -89.63,
     15.32
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 108520,
  "front": {
   "BLZ": {
    "r": [
     0.68,
     0.92,
     1.16,
     1.39,
     1.61,
     1.82,
     2.05,
     2.32,
     2.64,
     3.2899999999999996
    ],
    "cap": 0.31
   },
   "HND": {
    "r": [
     0.67,
     1.01,
     1.3,
     1.55,
     1.78,
     2.01,
     2.23,
     2.46,
     2.68,
     3.2199999999999998
    ],
    "cap": 0.32
   },
   "MEX": {
    "r": [
     0.61,
     0.84,
     1.03,
     1.19,
     1.34,
     1.49,
     1.65,
     1.85,
     2.08,
     2.51
    ],
    "cap": 0.09
   },
   "SLV": {
    "r": [
     0.76,
     1.15,
     1.43,
     1.66,
     1.89,
     2.12,
     2.39,
     2.7,
     3.2,
     3.7899999999999996
    ],
    "cap": 0.39
   }
  }
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
  "cities": [
   {
    "id": "BLZ-0",
    "name": "پایتخت بلیز",
    "pos": [
     -88.72,
     17.19
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 22770,
  "front": {
   "GTM": {
    "r": [
     0.36,
     0.63,
     0.84,
     1.02,
     1.21,
     1.4,
     1.6,
     1.79,
     2.08,
     2.48
    ],
    "cap": 0.48
   },
   "MEX": {
    "r": [
     0.3,
     0.44,
     0.56,
     0.66,
     0.79,
     0.98,
     1.18,
     1.38,
     1.62,
     2.0599999999999996
    ],
    "cap": 0.47
   }
  }
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
  "cities": [
   {
    "id": "SLV-0",
    "name": "پایتخت السالوادور",
    "pos": [
     -88.87,
     13.74
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 20401,
  "front": {
   "GTM": {
    "r": [
     0.32,
     0.45,
     0.57,
     0.7,
     0.89,
     1.1,
     1.33,
     1.54,
     1.75,
     1.99
    ],
    "cap": 0.5
   },
   "HND": {
    "r": [
     0.27,
     0.39,
     0.49,
     0.57,
     0.64,
     0.72,
     0.85,
     1.02,
     1.2,
     1.59
    ],
    "cap": 0.23
   }
  }
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
  "cities": [
   {
    "id": "HND-0",
    "name": "پایتخت هندوراس",
    "pos": [
     -86.62,
     14.83
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "HND-1",
    "name": "غرب هندوراس",
    "pos": [
     -88.13,
     14.97
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "HND-2",
    "name": "شرق هندوراس",
    "pos": [
     -85.77,
     14.57
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 113531,
  "front": {
   "GTM": {
    "r": [
     0.91,
     1.36,
     1.8,
     2.17,
     2.52,
     2.83,
     3.25,
     3.7,
     4.37,
     5.64
    ],
    "cap": 0.48
   },
   "NIC": {
    "r": [
     0.75,
     1.06,
     1.3,
     1.5,
     1.73,
     2.03,
     2.34,
     2.71,
     3.16,
     3.99
    ],
    "cap": 0.37
   },
   "SLV": {
    "r": [
     0.85,
     1.16,
     1.43,
     1.68,
     2.01,
     2.39,
     2.83,
     3.32,
     3.99,
     5.13
    ],
    "cap": 0.5
   }
  }
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
  "cities": [
   {
    "id": "NIC-0",
    "name": "پایتخت نیکاراگوئه",
    "pos": [
     -85.03,
     12.85
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "NIC-1",
    "name": "جنوب نیکاراگوئه",
    "pos": [
     -84.8,
     11.77
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 129225,
  "front": {
   "CRI": {
    "r": [
     0.76,
     1.15,
     1.53,
     1.86,
     2.16,
     2.44,
     2.73,
     2.98,
     3.27,
     4.14
    ],
    "cap": 0.39
   },
   "HND": {
    "r": [
     0.83,
     1.17,
     1.45,
     1.66,
     1.88,
     2.15,
     2.42,
     2.67,
     3,
     3.87
    ],
    "cap": 0.35
   }
  }
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
  "cities": [
   {
    "id": "CRI-0",
    "name": "پایتخت کاستاریکا",
    "pos": [
     -84.19,
     9.98
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "CRI-1",
    "name": "شرق کاستاریکا",
    "pos": [
     -83.32,
     9.36
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 51511,
  "front": {
   "NIC": {
    "r": [
     0.57,
     0.79,
     0.95,
     1.11,
     1.27,
     1.43,
     1.71,
     2.07,
     2.48,
     3.31
    ],
    "cap": 0.43
   },
   "PAN": {
    "r": [
     0.62,
     0.87,
     1.2,
     1.54,
     1.84,
     2.12,
     2.46,
     2.76,
     3.08,
     3.6599999999999997
    ],
    "cap": 0.47
   }
  }
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
  "cities": [
   {
    "id": "PAN-0",
    "name": "پایتخت پاناما",
    "pos": [
     -80.11,
     8.53
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "PAN-1",
    "name": "شرق پاناما",
    "pos": [
     -78.18,
     7.96
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 74235,
  "front": {
   "COL": {
    "r": [
     0.75,
     1.33,
     2.06,
     2.77,
     3.09,
     3.4,
     3.83,
     4.4,
     5.15,
     5.779999999999999
    ],
    "cap": 0.43
   },
   "CRI": {
    "r": [
     0.53,
     1.15,
     1.77,
     2.19,
     2.53,
     2.94,
     3.85,
     4.55,
     4.94,
     5.54
    ],
    "cap": 0.53
   }
  }
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
  "cities": [
   {
    "id": "CUB-0",
    "name": "پایتخت کوبا",
    "pos": [
     -78.91,
     21.63
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "HTI",
   "JAM",
   "USA"
  ],
  "area": 109285
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
  "cities": [
   {
    "id": "JAM-0",
    "name": "پایتخت جامائیکا",
    "pos": [
     -77.31,
     18.16
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "CUB"
  ],
  "area": 10935
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
  "cities": [
   {
    "id": "HTI-0",
    "name": "پایتخت هائیتی",
    "pos": [
     -72.68,
     18.93
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  ],
  "area": 26822,
  "front": {
   "DOM": {
    "r": [
     0.4,
     0.56,
     0.67,
     0.79,
     0.93,
     1.12,
     1.35,
     1.63,
     2.1,
     2.62
    ],
    "cap": 0.48
   }
  }
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
  "cities": [
   {
    "id": "DOM-0",
    "name": "پایتخت جمهوری دومینیکن",
    "pos": [
     -70.51,
     18.9
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "DOM-1",
    "name": "غرب جمهوری دومینیکن",
    "pos": [
     -71.24,
     18.88
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 48592,
  "front": {
   "HTI": {
    "r": [
     0.47,
     0.69,
     0.84,
     0.99,
     1.16,
     1.38,
     1.62,
     1.95,
     2.48,
     3.18
    ],
    "cap": 0.49
   }
  }
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
  "cities": [
   {
    "id": "BHS-0",
    "name": "پایتخت باهاما",
    "pos": [
     -78.04,
     24.7
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "USA"
  ],
  "area": 12657
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
  "cities": [
   {
    "id": "TTO-0",
    "name": "پایتخت ترینیداد و توباگو",
    "pos": [
     -61.29,
     10.42
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "VEN"
  ],
  "area": 5102
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
  "cities": [
   {
    "id": "BRB-0",
    "name": "پایتخت باربادوس",
    "pos": [
     -59.56,
     13.18
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 388
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
  "cities": [
   {
    "id": "ATG-0",
    "name": "پایتخت آنتیگوا و باربودا",
    "pos": [
     -61.79,
     17.08
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 433
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
  "cities": [
   {
    "id": "DMA-0",
    "name": "پایتخت دومینیکا",
    "pos": [
     -61.36,
     15.44
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 688
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
  "cities": [
   {
    "id": "GRD-0",
    "name": "پایتخت گرنادا",
    "pos": [
     -61.68,
     12.12
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 288
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
  "cities": [
   {
    "id": "KNA-0",
    "name": "پایتخت سنت کیتس و نویس",
    "pos": [
     -62.75,
     17.33
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 234
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
  "cities": [
   {
    "id": "LCA-0",
    "name": "پایتخت سنت لوسیا",
    "pos": [
     -60.97,
     13.89
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 552
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
  "cities": [
   {
    "id": "VCT-0",
    "name": "پایتخت سنت وینسنت",
    "pos": [
     -61.2,
     13.25
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 312
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
  "cities": [
   {
    "id": "BRA-0",
    "name": "پایتخت برزیل",
    "pos": [
     -53.24,
     -10.69
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "BRA-1",
    "name": "جنوب برزیل",
    "pos": [
     -54.35,
     -23.06
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "BRA-2",
    "name": "غرب برزیل",
    "pos": [
     -65.53,
     -8.94
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 8499400,
  "front": {
   "ARG": {
    "r": [
     7.63,
     12.26,
     15.42,
     18.05,
     20.54,
     22.63,
     24.44,
     26.11,
     27.87,
     33.18
    ],
    "cap": 0.36
   },
   "BOL": {
    "r": [
     6.43,
     8.85,
     10.7,
     12.39,
     14.08,
     15.84,
     17.58,
     19.34,
     21.8,
     28.3
    ],
    "cap": 0.25
   },
   "COL": {
    "r": [
     7.67,
     10.83,
     14.64,
     18.18,
     21.65,
     24.72,
     27.51,
     30.14,
     32.49,
     37.18
    ],
    "cap": 0.44
   },
   "GUY": {
    "r": [
     6.1,
     8.94,
     11.38,
     13.66,
     15.94,
     18.76,
     21.55,
     24.06,
     26.83,
     35.71
    ],
    "cap": 0.41
   },
   "PER": {
    "r": [
     9.51,
     13.78,
     17.09,
     20.22,
     22.92,
     25.44,
     27.72,
     29.79,
     32.46,
     38.379999999999995
    ],
    "cap": 0.41
   },
   "PRY": {
    "r": [
     6.64,
     9.12,
     11.71,
     13.99,
     16.05,
     17.88,
     19.75,
     21.44,
     23.11,
     27.51
    ],
    "cap": 0.3
   },
   "SUR": {
    "r": [
     6.59,
     9.59,
     11.99,
     14.01,
     15.91,
     17.86,
     20.02,
     22.56,
     25.88,
     35.98
    ],
    "cap": 0.37
   },
   "URY": {
    "r": [
     10.85,
     15.54,
     18.79,
     21.48,
     23.9,
     25.97,
     27.74,
     29.46,
     31.22,
     36.82
    ],
    "cap": 0.37
   },
   "VEN": {
    "r": [
     7.58,
     11.04,
     13.51,
     16.22,
     19.64,
     22.83,
     25.61,
     28.27,
     30.77,
     38.309999999999995
    ],
    "cap": 0.45
   }
  }
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
  "cities": [
   {
    "id": "ARG-0",
    "name": "پایتخت آرژانتین",
    "pos": [
     -64.75,
     -34.54
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "ARG-1",
    "name": "شمال آرژانتین",
    "pos": [
     -64.8,
     -27.1
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "ARG-2",
    "name": "شرق آرژانتین",
    "pos": [
     -58.83,
     -30.38
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 2782703,
  "front": {
   "BOL": {
    "r": [
     4.41,
     6.69,
     8.65,
     10.24,
     12.17,
     14.4,
     16.39,
     19.11,
     23.89,
     32.79
    ],
    "cap": 0.51
   },
   "BRA": {
    "r": [
     5.43,
     7.48,
     8.93,
     10.12,
     11.25,
     12.5,
     14.37,
     17.3,
     21.52,
     28.860000000000003
    ],
    "cap": 0.47
   },
   "CHL": {
    "r": [
     3.81,
     5.46,
     6.85,
     8.35,
     9.63,
     10.85,
     12.21,
     14.16,
     16.01,
     19.82
    ],
    "cap": 0.31
   },
   "PRY": {
    "r": [
     3.45,
     5.43,
     7,
     8.39,
     9.71,
     11.24,
     13.45,
     16.66,
     21.13,
     29.150000000000002
    ],
    "cap": 0.5
   },
   "URY": {
    "r": [
     3.6,
     5.02,
     6.17,
     7.22,
     8.36,
     9.44,
     10.44,
     12.63,
     16.86,
     24.46
    ],
    "cap": 0.33
   }
  }
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
  "cities": [
   {
    "id": "COL-0",
    "name": "پایتخت کلمبیا",
    "pos": [
     -73.08,
     3.9
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "COL-1",
    "name": "جنوب کلمبیا",
    "pos": [
     -72.83,
     0.14
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "COL-2",
    "name": "غرب کلمبیا",
    "pos": [
     -75.64,
     6.19
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 1139434,
  "front": {
   "BRA": {
    "r": [
     2.42,
     3.32,
     4.12,
     4.87,
     5.7,
     6.68,
     7.74,
     8.7,
     9.97,
     11.86
    ],
    "cap": 0.43
   },
   "ECU": {
    "r": [
     2.58,
     3.94,
     4.86,
     5.66,
     6.41,
     7.08,
     7.76,
     8.52,
     9.47,
     13.26
    ],
    "cap": 0.36
   },
   "PAN": {
    "r": [
     2.66,
     3.77,
     4.66,
     5.63,
     6.44,
     7.28,
     8.23,
     9.21,
     10.24,
     13.92
    ],
    "cap": 0.41
   },
   "PER": {
    "r": [
     2.72,
     4.01,
     5.2,
     6.11,
     6.87,
     7.6,
     8.47,
     9.42,
     11.1,
     14.69
    ],
    "cap": 0.42
   },
   "VEN": {
    "r": [
     2.3,
     3.51,
     4.34,
     5.19,
     5.86,
     6.41,
     6.96,
     7.55,
     8.26,
     10.48
    ],
    "cap": 0.29
   }
  }
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
  "cities": [
   {
    "id": "CHL-0",
    "name": "پایتخت شیلی",
    "pos": [
     -70.95,
     -34.36
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "CHL-1",
    "name": "شمال شیلی",
    "pos": [
     -70.26,
     -24.54
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "CHL-2",
    "name": "جنوب شیلی",
    "pos": [
     -71.23,
     -37.27
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 737442,
  "front": {
   "ARG": {
    "r": [
     2.12,
     4.07,
     6.11,
     8.1,
     10.34,
     12.51,
     13.93,
     15.45,
     17.33,
     21.57
    ],
    "cap": 0.24
   },
   "BOL": {
    "r": [
     2.14,
     4.18,
     7.26,
     11.9,
     16.04,
     19.5,
     24.43,
     27.69,
     32.17,
     35.45
    ],
    "cap": 0.46
   },
   "PER": {
    "r": [
     4.11,
     6.33,
     9.31,
     13.92,
     18.08,
     21.54,
     26.48,
     29.75,
     34.25,
     37.63
    ],
    "cap": 0.46
   }
  }
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
  "cities": [
   {
    "id": "PER-0",
    "name": "پایتخت پرو",
    "pos": [
     -74.42,
     -9.11
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "PER-1",
    "name": "جنوب پرو",
    "pos": [
     -71.65,
     -14.44
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "PER-2",
    "name": "شمال پرو",
    "pos": [
     -73.36,
     -5.06
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 1296279,
  "front": {
   "BOL": {
    "r": [
     2.42,
     3.58,
     5.06,
     6.59,
     8.51,
     10.16,
     11.31,
     12.32,
     13.5,
     15.76
    ],
    "cap": 0.45
   },
   "BRA": {
    "r": [
     2.32,
     3.23,
     3.87,
     4.43,
     4.91,
     5.42,
     5.96,
     6.73,
     7.8,
     11.01
    ],
    "cap": 0.05
   },
   "CHL": {
    "r": [
     3.75,
     5.49,
     6.9,
     8.51,
     10.57,
     12.51,
     13.91,
     14.94,
     15.95,
     18.59
    ],
    "cap": 0.47
   },
   "COL": {
    "r": [
     2.32,
     4,
     5.73,
     7.14,
     8.07,
     8.92,
     10.07,
     11.38,
     12.93,
     16.05
    ],
    "cap": 0.39
   },
   "ECU": {
    "r": [
     2.32,
     3.49,
     4.55,
     5.45,
     6.66,
     8.12,
     9.85,
     11.4,
     12.97,
     16.34
    ],
    "cap": 0.49
   }
  }
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
  "cities": [
   {
    "id": "VEN-0",
    "name": "پایتخت ونزوئلا",
    "pos": [
     -66.18,
     7.12
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "VEN-1",
    "name": "شرق ونزوئلا",
    "pos": [
     -62.66,
     7.1
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "VEN-2",
    "name": "جنوب ونزوئلا",
    "pos": [
     -65.01,
     4.94
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 914310,
  "front": {
   "BRA": {
    "r": [
     1.81,
     2.62,
     3.27,
     4.05,
     5,
     5.77,
     6.49,
     7.43,
     8.79,
     11.07
    ],
    "cap": 0.41
   },
   "COL": {
    "r": [
     2.35,
     3.1,
     3.72,
     4.24,
     4.78,
     5.26,
     5.84,
     6.59,
     7.53,
     9.68
    ],
    "cap": 0.25
   },
   "GUY": {
    "r": [
     2.48,
     3.58,
     4.53,
     5.57,
     6.39,
     7.11,
     7.89,
     9.06,
     10.55,
     12.98
    ],
    "cap": 0.43
   }
  }
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
  "cities": [
   {
    "id": "ECU-0",
    "name": "پایتخت اکوادور",
    "pos": [
     -78.39,
     -1.44
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "ECU-1",
    "name": "جنوب اکوادور",
    "pos": [
     -78.52,
     -3.07
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "ECU-2",
    "name": "شمال اکوادور",
    "pos": [
     -77.56,
     -0.4
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 255658,
  "front": {
   "COL": {
    "r": [
     1.05,
     1.51,
     1.88,
     2.21,
     2.56,
     2.93,
     3.4,
     3.98,
     4.75,
     14.61
    ],
    "cap": 0.4
   },
   "PER": {
    "r": [
     1.17,
     1.81,
     2.42,
     2.87,
     3.26,
     3.64,
     4.03,
     4.41,
     4.83,
     13.53
    ],
    "cap": 0.37
   }
  }
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
  "cities": [
   {
    "id": "BOL-0",
    "name": "پایتخت بولیوی",
    "pos": [
     -64.7,
     -16.68
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "BOL-1",
    "name": "جنوب بولیوی",
    "pos": [
     -64.78,
     -19.96
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "BOL-2",
    "name": "غرب بولیوی",
    "pos": [
     -67.12,
     -18.76
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 1090271,
  "front": {
   "ARG": {
    "r": [
     2.34,
     3.5,
     4.62,
     5.52,
     6.33,
     7,
     7.7,
     8.59,
     9.8,
     12.35
    ],
    "cap": 0.39
   },
   "BRA": {
    "r": [
     2.43,
     3.33,
     4.07,
     4.75,
     5.38,
     5.97,
     6.65,
     7.42,
     8.45,
     11.02
    ],
    "cap": 0.33
   },
   "CHL": {
    "r": [
     2.46,
     3.54,
     4.52,
     5.38,
     6.15,
     7.02,
     7.81,
     8.52,
     9.21,
     10.73
    ],
    "cap": 0.37
   },
   "PER": {
    "r": [
     2.52,
     3.47,
     4.28,
     5,
     5.73,
     6.46,
     7.26,
     8.05,
     8.93,
     11.95
    ],
    "cap": 0.38
   },
   "PRY": {
    "r": [
     2.13,
     2.97,
     3.64,
     4.36,
     5.11,
     5.83,
     6.5,
     7.42,
     8.83,
     11.32
    ],
    "cap": 0.38
   }
  }
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
  "cities": [
   {
    "id": "PRY-0",
    "name": "پایتخت پاراگوئه",
    "pos": [
     -58.44,
     -23.21
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "PRY-1",
    "name": "شمال پاراگوئه",
    "pos": [
     -60.28,
     -21.05
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 400900,
  "front": {
   "ARG": {
    "r": [
     1.67,
     2.37,
     2.92,
     3.4,
     3.88,
     4.4,
     5.14,
     5.85,
     6.57,
     7.63
    ],
    "cap": 0.4
   },
   "BOL": {
    "r": [
     1.64,
     2.39,
     3.02,
     3.66,
     4.55,
     5.54,
     6.49,
     7.55,
     8.22,
     9.41
    ],
    "cap": 0.5
   },
   "BRA": {
    "r": [
     1.65,
     2.24,
     2.65,
     3.02,
     3.34,
     3.71,
     4.1,
     4.51,
     4.96,
     5.6899999999999995
    ],
    "cap": 0.18
   }
  }
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
  "cities": [
   {
    "id": "URY-0",
    "name": "پایتخت اروگوئه",
    "pos": [
     -56.03,
     -32.79
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "URY-1",
    "name": "غرب اروگوئه",
    "pos": [
     -57.23,
     -31.97
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 177569,
  "front": {
   "ARG": {
    "r": [
     0.98,
     1.4,
     1.76,
     2.14,
     2.48,
     2.8,
     3.14,
     3.52,
     3.93,
     4.59
    ],
    "cap": 0.41
   },
   "BRA": {
    "r": [
     0.95,
     1.34,
     1.65,
     1.91,
     2.15,
     2.38,
     2.65,
     2.97,
     3.3,
     3.8499999999999996
    ],
    "cap": 0.31
   }
  }
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
  "cities": [
   {
    "id": "GUY-0",
    "name": "پایتخت گویان",
    "pos": [
     -58.98,
     4.79
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 211930,
  "front": {
   "BRA": {
    "r": [
     1.16,
     1.76,
     2.29,
     2.77,
     3.5,
     4.01,
     4.43,
     4.84,
     5.43,
     6.51
    ],
    "cap": 0.44
   },
   "SUR": {
    "r": [
     1.02,
     1.42,
     1.71,
     1.99,
     2.28,
     2.62,
     3.16,
     3.75,
     4.27,
     5.2299999999999995
    ],
    "cap": 0.35
   },
   "VEN": {
    "r": [
     0.85,
     1.28,
     1.66,
     2.22,
     2.76,
     3.28,
     4.03,
     4.73,
     5.36,
     6.279999999999999
    ],
    "cap": 0.48
   }
  }
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
  "cities": [
   {
    "id": "SUR-0",
    "name": "پایتخت سورینام",
    "pos": [
     -55.91,
     4.13
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 145559,
  "front": {
   "BRA": {
    "r": [
     0.73,
     1.09,
     1.42,
     1.71,
     1.98,
     2.26,
     2.55,
     2.85,
     3.21,
     3.75
    ],
    "cap": 0.38
   },
   "GUY": {
    "r": [
     0.89,
     1.28,
     1.59,
     1.88,
     2.15,
     2.43,
     2.71,
     3.01,
     3.31,
     4.19
    ],
    "cap": 0.38
   }
  }
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
  "cities": [
   {
    "id": "GBR-0",
    "name": "لندن",
    "pos": [
     -0.13,
     51.5
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.2
    }
   },
   {
    "id": "GBR-1",
    "name": "پورتسموث",
    "pos": [
     -1.09,
     50.8
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "GBR-2",
    "name": "منچستر",
    "pos": [
     -2.24,
     53.48
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "GBR-3",
    "name": "گلاسکو",
    "pos": [
     -4.25,
     55.86
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "GBR-4",
    "name": "بلفاست",
    "pos": [
     -5.93,
     54.6
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   }
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
  ],
  "area": 256774,
  "front": {
   "IRL": {
    "r": [
     2.4,
     2.88,
     3.2,
     3.49,
     3.79,
     4.09,
     4.38,
     4.83,
     5.61,
     115.10000000000001
    ],
    "cap": 0.85
   }
  }
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
  "cities": [
   {
    "id": "FRA-0",
    "name": "پاریس",
    "pos": [
     2.35,
     48.86
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.2
    }
   },
   {
    "id": "FRA-1",
    "name": "مارسی",
    "pos": [
     5.37,
     43.3
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "FRA-2",
    "name": "برست",
    "pos": [
     -4.49,
     48.39
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "FRA-3",
    "name": "تولوز",
    "pos": [
     1.44,
     43.6
    ],
    "capital": false,
    "tags": [
     "industry",
     "air"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "FRA-4",
    "name": "لیون",
    "pos": [
     4.84,
     45.76
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   }
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
  ],
  "area": 663718,
  "front": {
   "AND": {
    "r": [
     2,
     2.92,
     3.71,
     4.47,
     5.25,
     5.98,
     6.69,
     7.51,
     62.19,
     156.11
    ],
    "cap": 0.64
   },
   "BEL": {
    "r": [
     1.79,
     2.72,
     3.49,
     4.28,
     4.97,
     5.65,
     6.49,
     7.69,
     66.7,
     148.92
    ],
    "cap": 0.09
   },
   "CHE": {
    "r": [
     1.55,
     2.25,
     2.79,
     3.32,
     3.95,
     4.51,
     5.02,
     6.1,
     66.55,
     151.1
    ],
    "cap": 0.42
   },
   "DEU": {
    "r": [
     2.33,
     3.33,
     4.06,
     4.78,
     5.41,
     6,
     6.76,
     7.76,
     68.31,
     148.48
    ],
    "cap": 0.2
   },
   "ESP": {
    "r": [
     2.21,
     3.39,
     4.27,
     4.97,
     5.54,
     6.11,
     6.95,
     7.93,
     60.75,
     156.86
    ],
    "cap": 0.64
   },
   "ITA": {
    "r": [
     1.87,
     2.86,
     3.53,
     4.11,
     4.68,
     5.31,
     5.96,
     7.3,
     66.53,
     152.01
    ],
    "cap": 0.56
   },
   "LUX": {
    "r": [
     1.84,
     2.78,
     3.61,
     4.35,
     5.02,
     5.63,
     6.3,
     7.51,
     67.53,
     148.81
    ],
    "cap": 0.17
   },
   "MCO": {
    "r": [
     2.37,
     3.51,
     4.24,
     4.88,
     5.47,
     6.07,
     6.89,
     8.18,
     66.49,
     152.61
    ],
    "cap": 0.61
   }
  }
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
  "cities": [
   {
    "id": "DEU-0",
    "name": "برلین",
    "pos": [
     13.4,
     52.52
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.2
    }
   },
   {
    "id": "DEU-1",
    "name": "هامبورگ",
    "pos": [
     9.99,
     53.55
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "DEU-2",
    "name": "مونیخ",
    "pos": [
     11.58,
     48.14
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "DEU-3",
    "name": "کلن",
    "pos": [
     6.96,
     50.94
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "DEU-4",
    "name": "اشتوتگارت",
    "pos": [
     9.18,
     48.78
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   }
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
  ],
  "area": 356163,
  "front": {
   "AUT": {
    "r": [
     1.48,
     2.36,
     3.01,
     3.58,
     4.05,
     4.51,
     4.98,
     5.49,
     6.06,
     7.51
    ],
    "cap": 0.68
   },
   "BEL": {
    "r": [
     1.36,
     2.07,
     2.57,
     2.98,
     3.34,
     3.73,
     4.12,
     4.51,
     4.98,
     6.06
    ],
    "cap": 0.89
   },
   "CHE": {
    "r": [
     1.6,
     2.25,
     2.78,
     3.27,
     3.85,
     4.46,
     5.06,
     5.6,
     6.24,
     7.68
    ],
    "cap": 0.84
   },
   "CZE": {
    "r": [
     1.16,
     1.6,
     1.95,
     2.28,
     2.59,
     2.88,
     3.19,
     3.49,
     3.82,
     5.04
    ],
    "cap": 0.39
   },
   "DNK": {
    "r": [
     1.85,
     2.48,
     3.03,
     3.56,
     4.04,
     4.54,
     5.1,
     5.8,
     6.58,
     7.68
    ],
    "cap": 0.36
   },
   "FRA": {
    "r": [
     1.23,
     1.78,
     2.26,
     2.71,
     3.13,
     3.57,
     4.06,
     4.63,
     5.24,
     6.65
    ],
    "cap": 0.86
   },
   "LUX": {
    "r": [
     1.43,
     2.02,
     2.49,
     2.94,
     3.34,
     3.73,
     4.14,
     4.62,
     5.17,
     6.47
    ],
    "cap": 0.89
   },
   "NLD": {
    "r": [
     1.34,
     1.93,
     2.43,
     2.88,
     3.26,
     3.64,
     4.01,
     4.36,
     4.79,
     6.06
    ],
    "cap": 0.77
   },
   "POL": {
    "r": [
     1.39,
     2.07,
     2.64,
     3.18,
     3.58,
     3.95,
     4.33,
     4.71,
     5.18,
     6.4399999999999995
    ],
    "cap": 0.05
   }
  }
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
  "cities": [
   {
    "id": "ITA-0",
    "name": "رم",
    "pos": [
     12.5,
     41.9
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.25
    }
   },
   {
    "id": "ITA-1",
    "name": "میلان",
    "pos": [
     9.19,
     45.46
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   },
   {
    "id": "ITA-2",
    "name": "ناپل",
    "pos": [
     14.27,
     40.85
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   },
   {
    "id": "ITA-3",
    "name": "تارانتو",
    "pos": [
     17.24,
     40.47
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   }
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
  ],
  "area": 300267,
  "front": {
   "AUT": {
    "r": [
     1.47,
     2.4,
     3.05,
     3.6,
     4.21,
     5.35,
     6.58,
     7.43,
     8.97,
     10.56
    ],
    "cap": 0.59
   },
   "CHE": {
    "r": [
     1.15,
     1.65,
     2.14,
     2.82,
     3.98,
     5.28,
     6.27,
     7.4,
     8.9,
     10.379999999999999
    ],
    "cap": 0.57
   },
   "FRA": {
    "r": [
     1.43,
     2.54,
     3.26,
     3.82,
     4.43,
     5.1,
     6.11,
     7.83,
     8.94,
     10.19
    ],
    "cap": 0.59
   },
   "SMR": {
    "r": [
     1.07,
     1.54,
     1.97,
     2.41,
     2.83,
     3.35,
     3.97,
     4.74,
     5.99,
     7.51
    ],
    "cap": 0.32
   },
   "SVN": {
    "r": [
     1.7,
     2.43,
     2.96,
     3.43,
     3.96,
     4.52,
     5.45,
     6.51,
     7.86,
     9.42
    ],
    "cap": 0.55
   },
   "VAT": {
    "r": [
     1.16,
     1.75,
     2.47,
     3,
     3.43,
     3.87,
     4.17,
     4.45,
     4.75,
     5.609999999999999
    ],
    "cap": 0.05
   }
  }
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
  "cities": [
   {
    "id": "ESP-0",
    "name": "مادرید",
    "pos": [
     -3.7,
     40.42
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "ESP-1",
    "name": "بارسلونا",
    "pos": [
     2.17,
     41.39
    ],
    "capital": false,
    "tags": [
     "port",
     "industry"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "ESP-2",
    "name": "کادیز",
    "pos": [
     -6.29,
     36.53
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 506178,
  "front": {
   "AND": {
    "r": [
     1.75,
     2.89,
     3.68,
     4.32,
     4.93,
     5.48,
     6.01,
     6.6,
     7.27,
     21.630000000000003
    ],
    "cap": 0.4
   },
   "FRA": {
    "r": [
     1.52,
     2.2,
     2.81,
     3.5,
     4.04,
     4.53,
     5.08,
     5.64,
     6.33,
     20.71
    ],
    "cap": 0.38
   },
   "PRT": {
    "r": [
     1.54,
     2.08,
     2.53,
     3.02,
     3.51,
     3.98,
     4.44,
     4.91,
     5.53,
     16.200000000000003
    ],
    "cap": 0.29
   }
  }
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
  "cities": [
   {
    "id": "PRT-0",
    "name": "پایتخت پرتغال",
    "pos": [
     -7.98,
     39.65
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "PRT-1",
    "name": "شمال پرتغال",
    "pos": [
     -7.32,
     40.5
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 90766,
  "front": {
   "ESP": {
    "r": [
     0.6,
     0.88,
     1.17,
     1.45,
     1.84,
     2.28,
     2.69,
     3.08,
     3.7,
     18.62
    ],
    "cap": 0.46
   }
  }
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
  "cities": [
   {
    "id": "NLD-0",
    "name": "پایتخت هلند",
    "pos": [
     5.63,
     52.28
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  ],
  "area": 37760,
  "front": {
   "BEL": {
    "r": [
     0.43,
     0.6,
     0.73,
     0.87,
     1.1,
     1.3,
     1.49,
     1.73,
     2.01,
     70.81
    ],
    "cap": 0.46
   },
   "DEU": {
    "r": [
     0.47,
     0.64,
     0.78,
     0.91,
     1.03,
     1.14,
     1.25,
     1.36,
     1.5,
     71.89
    ],
    "cap": 0.24
   }
  }
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
  "cities": [
   {
    "id": "BEL-0",
    "name": "پایتخت بلژیک",
    "pos": [
     4.65,
     50.64
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "BEL-1",
    "name": "شرق بلژیک",
    "pos": [
     5.58,
     50.56
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  ],
  "area": 30627,
  "front": {
   "DEU": {
    "r": [
     0.43,
     0.65,
     0.8,
     0.92,
     1.04,
     1.2,
     1.35,
     1.57,
     1.88,
     2.3899999999999997
    ],
    "cap": 0.46
   },
   "FRA": {
    "r": [
     0.42,
     0.59,
     0.71,
     0.82,
     0.92,
     1,
     1.08,
     1.16,
     1.26,
     1.45
    ],
    "cap": 0.21
   },
   "LUX": {
    "r": [
     0.36,
     0.57,
     0.76,
     0.94,
     1.12,
     1.29,
     1.45,
     1.64,
     1.9,
     2.3699999999999997
    ],
    "cap": 0.45
   },
   "NLD": {
    "r": [
     0.42,
     0.61,
     0.76,
     0.9,
     1.01,
     1.11,
     1.2,
     1.32,
     1.45,
     1.96
    ],
    "cap": 0.31
   }
  }
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
  "cities": [
   {
    "id": "LUX-0",
    "name": "پایتخت لوکزامبورگ",
    "pos": [
     6.07,
     49.77
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 2614,
  "front": {
   "BEL": {
    "r": [
     0.12,
     0.18,
     0.22,
     0.26,
     0.29,
     0.33,
     0.38,
     0.41,
     0.46,
     0.54
    ],
    "cap": 0.34
   },
   "DEU": {
    "r": [
     0.15,
     0.22,
     0.27,
     0.31,
     0.34,
     0.37,
     0.4,
     0.43,
     0.46,
     0.52
    ],
    "cap": 0.31
   },
   "FRA": {
    "r": [
     0.13,
     0.19,
     0.24,
     0.3,
     0.35,
     0.39,
     0.43,
     0.49,
     0.58,
     0.71
    ],
    "cap": 0.45
   }
  }
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
  "cities": [
   {
    "id": "CHE-0",
    "name": "پایتخت سوئیس",
    "pos": [
     8.21,
     46.8
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "CHE-1",
    "name": "غرب سوئیس",
    "pos": [
     6.95,
     46.63
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 41215,
  "front": {
   "AUT": {
    "r": [
     0.46,
     0.71,
     0.93,
     1.11,
     1.3,
     1.54,
     1.74,
     1.95,
     2.16,
     2.84
    ],
    "cap": 0.47
   },
   "DEU": {
    "r": [
     0.49,
     0.69,
     0.86,
     1.01,
     1.16,
     1.29,
     1.42,
     1.54,
     1.69,
     2.23
    ],
    "cap": 0.33
   },
   "FRA": {
    "r": [
     0.65,
     0.91,
     1.11,
     1.31,
     1.54,
     1.77,
     1.98,
     2.16,
     2.42,
     2.99
    ],
    "cap": 0.47
   },
   "ITA": {
    "r": [
     0.53,
     0.74,
     0.89,
     1.02,
     1.16,
     1.29,
     1.41,
     1.54,
     1.71,
     2.13
    ],
    "cap": 0.32
   },
   "LIE": {
    "r": [
     0.38,
     0.55,
     0.68,
     0.84,
     1.01,
     1.22,
     1.44,
     1.65,
     1.87,
     2.56
    ],
    "cap": 0.44
   }
  }
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
  "cities": [
   {
    "id": "AUT-0",
    "name": "پایتخت اتریش",
    "pos": [
     14.11,
     47.59
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "AUT-1",
    "name": "غرب اتریش",
    "pos": [
     11.39,
     47.33
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 83901,
  "front": {
   "CHE": {
    "r": [
     1,
     1.92,
     2.45,
     2.81,
     3.11,
     3.42,
     3.74,
     4.04,
     4.36,
     4.96
    ],
    "cap": 0.42
   },
   "CZE": {
    "r": [
     0.77,
     1.05,
     1.28,
     1.51,
     1.72,
     1.97,
     2.22,
     2.51,
     3.07,
     4.13
    ],
    "cap": 0.41
   },
   "DEU": {
    "r": [
     0.65,
     0.92,
     1.15,
     1.36,
     1.6,
     1.82,
     2.08,
     2.35,
     2.65,
     3.19
    ],
    "cap": 0.31
   },
   "HUN": {
    "r": [
     0.61,
     0.92,
     1.16,
     1.41,
     1.66,
     1.95,
     2.25,
     2.69,
     3.58,
     4.8
    ],
    "cap": 0.52
   },
   "ITA": {
    "r": [
     0.59,
     0.97,
     1.28,
     1.55,
     1.83,
     2.12,
     2.44,
     2.74,
     3.04,
     3.67
    ],
    "cap": 0.4
   },
   "LIE": {
    "r": [
     1.23,
     2.19,
     2.68,
     3.03,
     3.33,
     3.65,
     3.97,
     4.25,
     4.57,
     5.14
    ],
    "cap": 0.42
   },
   "SVK": {
    "r": [
     0.7,
     1.1,
     1.4,
     1.71,
     1.99,
     2.28,
     2.59,
     3.06,
     3.88,
     5.04
    ],
    "cap": 0.51
   },
   "SVN": {
    "r": [
     0.64,
     0.93,
     1.16,
     1.37,
     1.56,
     1.75,
     1.93,
     2.11,
     2.48,
     3.72
    ],
    "cap": 0.28
   }
  }
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
  "cities": [
   {
    "id": "IRL-0",
    "name": "پایتخت ایرلند",
    "pos": [
     -8.14,
     53.16
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  ],
  "area": 68700,
  "front": {
   "GBR": {
    "r": [
     0.5,
     0.72,
     0.9,
     1.07,
     1.24,
     1.43,
     1.67,
     1.93,
     2.3,
     2.95
    ],
    "cap": 0.38
   }
  }
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
  "cities": [
   {
    "id": "DNK-0",
    "name": "پایتخت دانمارک",
    "pos": [
     9.35,
     56.23
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "DNK-1",
    "name": "جنوب دانمارک",
    "pos": [
     9.34,
     55.38
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  ],
  "area": 2198201,
  "front": {
   "DEU": {
    "r": [
     23.71,
     25.2,
     26.4,
     27.32,
     28.1,
     28.87,
     29.64,
     30.43,
     31.5,
     35.28
    ],
    "cap": 0.05
   }
  }
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
  "cities": [
   {
    "id": "NOR-0",
    "name": "اسلو",
    "pos": [
     10.75,
     59.91
    ],
    "capital": true,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.167
    }
   },
   {
    "id": "NOR-1",
    "name": "برگن",
    "pos": [
     5.32,
     60.39
    ],
    "capital": false,
    "tags": [
     "port",
     "oil"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.667
    }
   },
   {
    "id": "NOR-2",
    "name": "بودو",
    "pos": [
     14.4,
     67.28
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.167
    }
   }
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
  ],
  "area": 384264,
  "front": {
   "FIN": {
    "r": [
     1.75,
     3.27,
     6.34,
     8.59,
     9.38,
     10.07,
     10.61,
     11.12,
     11.77,
     13.459999999999999
    ],
    "cap": 0.74
   },
   "RUS": {
    "r": [
     2.34,
     5.09,
     8.16,
     9.46,
     10.36,
     11.04,
     11.95,
     12.75,
     13.63,
     15.29
    ],
    "cap": 0.79
   },
   "SWE": {
    "r": [
     1.83,
     2.81,
     3.62,
     4.3,
     4.92,
     5.62,
     6.38,
     7.96,
     14.4,
     16.72
    ],
    "cap": 0.44
   }
  }
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
  "cities": [
   {
    "id": "SWE-0",
    "name": "پایتخت سوئد",
    "pos": [
     16.25,
     62.43
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "SWE-1",
    "name": "شرق سوئد",
    "pos": [
     20.58,
     65.45
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "SWE-2",
    "name": "غرب سوئد",
    "pos": [
     14.98,
     63.47
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 442970,
  "front": {
   "FIN": {
    "r": [
     1.54,
     2.5,
     3.57,
     4.73,
     6.13,
     7.41,
     8.5,
     9.72,
     10.85,
     13.01
    ],
    "cap": 0.48
   },
   "NOR": {
    "r": [
     1.32,
     1.93,
     2.44,
     3.03,
     3.66,
     4.28,
     4.82,
     5.52,
     6.8,
     8.77
    ],
    "cap": 0.21
   }
  }
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
  "cities": [
   {
    "id": "FIN-0",
    "name": "پایتخت فنلاند",
    "pos": [
     26.21,
     64.26
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "FIN-1",
    "name": "شمال فنلاند",
    "pos": [
     25.63,
     67
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  ],
  "area": 331242,
  "front": {
   "NOR": {
    "r": [
     1.17,
     1.99,
     3.12,
     4.4,
     5.29,
     6,
     6.55,
     7.14,
     7.83,
     9.03
    ],
    "cap": 0.42
   },
   "RUS": {
    "r": [
     1.26,
     1.81,
     2.25,
     2.62,
     3.01,
     3.44,
     3.88,
     4.31,
     4.83,
     6.82
    ],
    "cap": 0.19
   },
   "SWE": {
    "r": [
     1.31,
     1.92,
     2.53,
     3.32,
     4.13,
     4.78,
     5.36,
     5.91,
     6.52,
     7.58
    ],
    "cap": 0.41
   }
  }
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
  "cities": [
   {
    "id": "ISL-0",
    "name": "پایتخت ایسلند",
    "pos": [
     -18.58,
     65
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "GBR"
  ],
  "area": 101161
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
  "cities": [
   {
    "id": "POL-0",
    "name": "ورشو",
    "pos": [
     21.01,
     52.23
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.25
    }
   },
   {
    "id": "POL-1",
    "name": "گدانسک",
    "pos": [
     18.65,
     54.35
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   },
   {
    "id": "POL-2",
    "name": "کراکوف",
    "pos": [
     19.94,
     50.06
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   },
   {
    "id": "POL-3",
    "name": "ژشوف",
    "pos": [
     22,
     50.04
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   }
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
  ],
  "area": 312566,
  "front": {
   "BLR": {
    "r": [
     1.11,
     1.61,
     2.01,
     2.41,
     2.81,
     3.19,
     3.61,
     4.06,
     4.62,
     5.55
    ],
    "cap": 0.14
   },
   "CZE": {
    "r": [
     1.38,
     1.91,
     2.37,
     2.78,
     3.13,
     3.47,
     3.78,
     4.09,
     4.49,
     5.64
    ],
    "cap": 0.55
   },
   "DEU": {
    "r": [
     1.24,
     1.81,
     2.33,
     2.83,
     3.29,
     3.78,
     4.24,
     4.71,
     5.19,
     6.07
    ],
    "cap": 0.62
   },
   "LTU": {
    "r": [
     1.57,
     2.31,
     2.86,
     3.28,
     3.67,
     4.03,
     4.41,
     4.76,
     5.11,
     6.08
    ],
    "cap": 0.22
   },
   "RUS": {
    "r": [
     1.28,
     1.78,
     2.22,
     2.64,
     3.04,
     3.41,
     3.76,
     4.1,
     4.48,
     5.48
    ],
    "cap": 0.29
   },
   "SVK": {
    "r": [
     1.36,
     1.96,
     2.45,
     2.88,
     3.3,
     3.73,
     4.15,
     4.56,
     4.98,
     5.83
    ],
    "cap": 0.42
   },
   "UKR": {
    "r": [
     1.4,
     2.07,
     2.61,
     3.07,
     3.52,
     3.94,
     4.43,
     4.96,
     5.55,
     6.74
    ],
    "cap": 0.28
   }
  }
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
  "cities": [
   {
    "id": "CZE-0",
    "name": "پایتخت چک",
    "pos": [
     15.32,
     49.74
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "CZE-1",
    "name": "غرب چک",
    "pos": [
     13.6,
     50.11
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "CZE-2",
    "name": "شرق چک",
    "pos": [
     16.98,
     49.34
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 78487,
  "front": {
   "AUT": {
    "r": [
     0.57,
     0.8,
     1,
     1.18,
     1.34,
     1.48,
     1.63,
     1.78,
     1.94,
     2.46
    ],
    "cap": 0.2
   },
   "DEU": {
    "r": [
     0.78,
     1.15,
     1.44,
     1.72,
     1.97,
     2.23,
     2.6,
     3.01,
     3.39,
     4.1899999999999995
    ],
    "cap": 0.49
   },
   "POL": {
    "r": [
     0.56,
     0.81,
     1.01,
     1.18,
     1.33,
     1.52,
     1.81,
     2.1,
     2.38,
     3.03
    ],
    "cap": 0.34
   },
   "SVK": {
    "r": [
     0.68,
     1.02,
     1.37,
     1.77,
     2.11,
     2.39,
     2.65,
     2.93,
     3.25,
     4.04
    ],
    "cap": 0.44
   }
  }
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
  "cities": [
   {
    "id": "SVK-0",
    "name": "پایتخت اسلواکی",
    "pos": [
     19.47,
     48.71
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "SVK-1",
    "name": "شرق اسلواکی",
    "pos": [
     21.22,
     48.81
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 48337,
  "front": {
   "AUT": {
    "r": [
     0.6,
     0.92,
     1.19,
     1.43,
     1.69,
     1.99,
     2.33,
     2.77,
     3.21,
     3.78
    ],
    "cap": 0.52
   },
   "CZE": {
    "r": [
     0.47,
     0.66,
     0.83,
     0.97,
     1.1,
     1.25,
     1.52,
     1.93,
     2.37,
     2.9099999999999997
    ],
    "cap": 0.41
   },
   "HUN": {
    "r": [
     0.48,
     0.71,
     0.86,
     0.99,
     1.11,
     1.23,
     1.34,
     1.46,
     1.64,
     2.05
    ],
    "cap": 0.12
   },
   "POL": {
    "r": [
     0.48,
     0.67,
     0.82,
     0.96,
     1.1,
     1.26,
     1.43,
     1.69,
     1.98,
     2.4
    ],
    "cap": 0.25
   },
   "UKR": {
    "r": [
     0.57,
     0.97,
     1.4,
     1.78,
     2.08,
     2.36,
     2.62,
     2.88,
     3.21,
     3.6799999999999997
    ],
    "cap": 0.45
   }
  }
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
  "cities": [
   {
    "id": "HUN-0",
    "name": "پایتخت مجارستان",
    "pos": [
     19.38,
     47.17
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "HUN-1",
    "name": "شرق مجارستان",
    "pos": [
     21.26,
     47.79
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 92966,
  "front": {
   "AUT": {
    "r": [
     0.77,
     1.18,
     1.53,
     1.81,
     2.08,
     2.37,
     2.7,
     3,
     3.31,
     4.16
    ],
    "cap": 0.43
   },
   "HRV": {
    "r": [
     0.76,
     1.11,
     1.39,
     1.65,
     1.87,
     2.13,
     2.45,
     2.82,
     3.3,
     4.13
    ],
    "cap": 0.45
   },
   "ROU": {
    "r": [
     0.7,
     1,
     1.25,
     1.45,
     1.65,
     1.91,
     2.24,
     2.61,
     2.99,
     3.63
    ],
    "cap": 0.42
   },
   "SRB": {
    "r": [
     0.69,
     0.96,
     1.18,
     1.38,
     1.56,
     1.74,
     1.93,
     2.13,
     2.41,
     3.07
    ],
    "cap": 0.27
   },
   "SVK": {
    "r": [
     0.69,
     0.99,
     1.21,
     1.4,
     1.57,
     1.71,
     1.87,
     2.06,
     2.33,
     2.73
    ],
    "cap": 0.23
   },
   "SVN": {
    "r": [
     0.79,
     1.16,
     1.47,
     1.82,
     2.18,
     2.56,
     2.91,
     3.26,
     3.65,
     4.56
    ],
    "cap": 0.48
   },
   "UKR": {
    "r": [
     0.9,
     1.37,
     1.78,
     2.13,
     2.45,
     2.83,
     3.22,
     3.56,
     3.88,
     4.45
    ],
    "cap": 0.47
   }
  }
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
  "cities": [
   {
    "id": "ROU-0",
    "name": "پایتخت رومانی",
    "pos": [
     24.98,
     45.85
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "ROU-1",
    "name": "غرب رومانی",
    "pos": [
     22.8,
     45.35
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "ROU-2",
    "name": "شرق رومانی",
    "pos": [
     26.77,
     46.56
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 235752,
  "front": {
   "BGR": {
    "r": [
     1.21,
     1.68,
     2.03,
     2.36,
     2.7,
     3.02,
     3.34,
     3.68,
     4.03,
     4.67
    ],
    "cap": 0.35
   },
   "HUN": {
    "r": [
     1.07,
     1.58,
     2.03,
     2.48,
     2.91,
     3.29,
     3.68,
     4.06,
     4.59,
     5.93
    ],
    "cap": 0.42
   },
   "MDA": {
    "r": [
     1.17,
     1.69,
     2.09,
     2.44,
     2.78,
     3.1,
     3.47,
     3.85,
     4.29,
     5.36
    ],
    "cap": 0.38
   },
   "SRB": {
    "r": [
     1.19,
     1.73,
     2.2,
     2.61,
     3,
     3.37,
     3.8,
     4.27,
     4.71,
     5.87
    ],
    "cap": 0.42
   },
   "UKR": {
    "r": [
     1.11,
     1.56,
     1.93,
     2.3,
     2.64,
     2.96,
     3.27,
     3.6,
     4,
     4.98
    ],
    "cap": 0.35
   }
  }
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
  "cities": [
   {
    "id": "BGR-0",
    "name": "پایتخت بلغارستان",
    "pos": [
     25.21,
     42.77
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "BGR-1",
    "name": "غرب بلغارستان",
    "pos": [
     23.85,
     42.18
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 112424,
  "front": {
   "GRC": {
    "r": [
     0.79,
     1.11,
     1.37,
     1.63,
     1.85,
     2.06,
     2.26,
     2.48,
     2.85,
     3.63
    ],
    "cap": 0.33
   },
   "MKD": {
    "r": [
     0.75,
     1.19,
     1.55,
     1.82,
     2.06,
     2.31,
     2.7,
     3.16,
     3.57,
     4.53
    ],
    "cap": 0.45
   },
   "ROU": {
    "r": [
     0.71,
     0.99,
     1.22,
     1.42,
     1.59,
     1.75,
     1.93,
     2.12,
     2.35,
     3.07
    ],
    "cap": 0.21
   },
   "SRB": {
    "r": [
     0.63,
     0.95,
     1.28,
     1.59,
     1.88,
     2.23,
     2.55,
     2.86,
     3.26,
     4.069999999999999
    ],
    "cap": 0.43
   },
   "TUR": {
    "r": [
     0.71,
     1.06,
     1.33,
     1.56,
     1.78,
     1.97,
     2.32,
     2.69,
     3.04,
     3.85
    ],
    "cap": 0.38
   }
  }
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
  "cities": [
   {
    "id": "GRC-0",
    "name": "آتن",
    "pos": [
     23.73,
     37.98
    ],
    "capital": true,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "GRC-1",
    "name": "تسالونیکی",
    "pos": [
     22.94,
     40.64
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "GRC-2",
    "name": "هراکلیون",
    "pos": [
     25.14,
     35.34
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 130177,
  "front": {
   "ALB": {
    "r": [
     0.89,
     1.32,
     1.67,
     2.05,
     2.41,
     2.77,
     3.14,
     3.63,
     4.73,
     7.2299999999999995
    ],
    "cap": 0.74
   },
   "BGR": {
    "r": [
     0.99,
     1.61,
     2.41,
     2.8,
     3.12,
     3.4,
     3.77,
     4.19,
     4.83,
     6.41
    ],
    "cap": 0.62
   },
   "MKD": {
    "r": [
     0.87,
     1.29,
     1.63,
     1.97,
     2.34,
     2.77,
     3.22,
     3.66,
     4.46,
     7
    ],
    "cap": 0.76
   },
   "TUR": {
    "r": [
     1.69,
     2.54,
     3.26,
     3.58,
     3.86,
     4.18,
     4.49,
     4.84,
     5.28,
     6.39
    ],
    "cap": 0.49
   }
  }
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
  "cities": [
   {
    "id": "HRV-0",
    "name": "پایتخت کرواسی",
    "pos": [
     16.42,
     45.16
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "HRV-1",
    "name": "شرق کرواسی",
    "pos": [
     18.18,
     45.21
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 54414,
  "front": {
   "BIH": {
    "r": [
     0.54,
     0.71,
     0.84,
     0.95,
     1.07,
     1.19,
     1.33,
     1.55,
     1.81,
     3.04
    ],
    "cap": 0.05
   },
   "HUN": {
    "r": [
     0.5,
     0.69,
     0.89,
     1.13,
     1.4,
     1.87,
     2.11,
     2.31,
     2.55,
     3.41
    ],
    "cap": 0.4
   },
   "MNE": {
    "r": [
     2,
     2.62,
     2.84,
     3.03,
     3.19,
     3.34,
     3.54,
     3.75,
     4.01,
     4.61
    ],
    "cap": 0.39
   },
   "SRB": {
    "r": [
     0.8,
     1.42,
     1.91,
     2.26,
     2.48,
     2.61,
     2.74,
     2.9,
     3.18,
     4.09
    ],
    "cap": 0.34
   },
   "SVN": {
    "r": [
     0.5,
     0.69,
     0.88,
     1.05,
     1.21,
     1.43,
     1.71,
     2.06,
     2.45,
     3.89
    ],
    "cap": 0.32
   }
  }
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
  "cities": [
   {
    "id": "SVN-0",
    "name": "پایتخت اسلوونی",
    "pos": [
     14.8,
     46.12
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 20198,
  "front": {
   "AUT": {
    "r": [
     0.35,
     0.48,
     0.58,
     0.66,
     0.74,
     0.81,
     0.88,
     0.96,
     1.05,
     1.37
    ],
    "cap": 0.18
   },
   "HRV": {
    "r": [
     0.33,
     0.49,
     0.64,
     0.74,
     0.83,
     0.92,
     0.99,
     1.08,
     1.22,
     1.48
    ],
    "cap": 0.28
   },
   "HUN": {
    "r": [
     0.45,
     0.79,
     0.99,
     1.17,
     1.34,
     1.48,
     1.62,
     1.78,
     1.93,
     2.25
    ],
    "cap": 0.43
   },
   "ITA": {
    "r": [
     0.31,
     0.48,
     0.62,
     0.76,
     0.93,
     1.07,
     1.21,
     1.35,
     1.63,
     2.07
    ],
    "cap": 0.47
   }
  }
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
  "cities": [
   {
    "id": "SRB-0",
    "name": "پایتخت صربستان",
    "pos": [
     20.81,
     44.21
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "SRB-1",
    "name": "شرق صربستان",
    "pos": [
     22.11,
     43.6
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 77481,
  "front": {
   "BGR": {
    "r": [
     0.83,
     1.12,
     1.4,
     1.73,
     2.02,
     2.29,
     2.55,
     2.85,
     3.26,
     3.96
    ],
    "cap": 0.45
   },
   "BIH": {
    "r": [
     0.54,
     0.79,
     1,
     1.19,
     1.37,
     1.53,
     1.7,
     1.89,
     2.14,
     2.72
    ],
    "cap": 0.26
   },
   "HRV": {
    "r": [
     0.54,
     0.8,
     1.02,
     1.34,
     1.64,
     1.91,
     2.17,
     2.44,
     2.92,
     3.67
    ],
    "cap": 0.45
   },
   "HUN": {
    "r": [
     0.69,
     1.18,
     1.59,
     1.94,
     2.27,
     2.55,
     2.77,
     3.04,
     3.53,
     4.31
    ],
    "cap": 0.44
   },
   "MKD": {
    "r": [
     0.86,
     1.28,
     1.61,
     1.89,
     2.12,
     2.36,
     2.71,
     3.07,
     3.58,
     4.21
    ],
    "cap": 0.48
   },
   "MNE": {
    "r": [
     0.69,
     1.08,
     1.34,
     1.54,
     1.71,
     1.87,
     2.02,
     2.19,
     2.44,
     3
    ],
    "cap": 0.3
   },
   "ROU": {
    "r": [
     0.61,
     0.85,
     1.03,
     1.19,
     1.34,
     1.49,
     1.65,
     1.84,
     2.11,
     2.78
    ],
    "cap": 0.22
   },
   "XKX": {
    "r": [
     0.55,
     0.78,
     0.96,
     1.11,
     1.27,
     1.49,
     1.74,
     2.08,
     2.57,
     3.19
    ],
    "cap": 0.39
   }
  }
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
  "cities": [
   {
    "id": "BIH-0",
    "name": "پایتخت بوسنی و هرزگوین",
    "pos": [
     17.77,
     44.17
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "BIH-1",
    "name": "شرق بوسنی و هرزگوین",
    "pos": [
     18.84,
     44.11
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 51690,
  "front": {
   "HRV": {
    "r": [
     0.48,
     0.81,
     1.09,
     1.34,
     1.55,
     1.76,
     1.96,
     2.16,
     2.38,
     2.92
    ],
    "cap": 0.43
   },
   "MNE": {
    "r": [
     0.49,
     0.68,
     0.87,
     1.06,
     1.28,
     1.47,
     1.66,
     1.87,
     2.16,
     2.83
    ],
    "cap": 0.44
   },
   "SRB": {
    "r": [
     0.64,
     0.87,
     1.09,
     1.26,
     1.43,
     1.59,
     1.73,
     1.96,
     2.25,
     2.88
    ],
    "cap": 0.41
   }
  }
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
  "cities": [
   {
    "id": "MNE-0",
    "name": "پایتخت مونته‌نگرو",
    "pos": [
     19.24,
     42.79
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 13663,
  "front": {
   "ALB": {
    "r": [
     0.23,
     0.32,
     0.4,
     0.47,
     0.52,
     0.58,
     0.64,
     0.72,
     0.82,
     1.06
    ],
    "cap": 0.23
   },
   "BIH": {
    "r": [
     0.29,
     0.4,
     0.51,
     0.61,
     0.71,
     0.8,
     0.88,
     0.98,
     1.09,
     1.46
    ],
    "cap": 0.4
   },
   "HRV": {
    "r": [
     0.33,
     0.45,
     0.56,
     0.65,
     0.73,
     0.81,
     0.92,
     1.02,
     1.12,
     1.44
    ],
    "cap": 0.4
   },
   "SRB": {
    "r": [
     0.25,
     0.36,
     0.44,
     0.51,
     0.58,
     0.66,
     0.76,
     0.87,
     0.99,
     1.29
    ],
    "cap": 0.37
   },
   "XKX": {
    "r": [
     0.22,
     0.37,
     0.52,
     0.63,
     0.73,
     0.81,
     0.88,
     0.95,
     1.03,
     1.18
    ],
    "cap": 0.36
   }
  }
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
  "cities": [
   {
    "id": "MKD-0",
    "name": "پایتخت مقدونیه شمالی",
    "pos": [
     21.68,
     41.6
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 25366,
  "front": {
   "ALB": {
    "r": [
     0.39,
     0.57,
     0.73,
     0.87,
     1.01,
     1.17,
     1.34,
     1.5,
     1.66,
     1.94
    ],
    "cap": 0.46
   },
   "BGR": {
    "r": [
     0.39,
     0.57,
     0.72,
     0.88,
     1.04,
     1.19,
     1.34,
     1.5,
     1.66,
     1.9
    ],
    "cap": 0.45
   },
   "GRC": {
    "r": [
     0.33,
     0.46,
     0.58,
     0.67,
     0.76,
     0.85,
     0.93,
     1.02,
     1.1,
     1.31
    ],
    "cap": 0.25
   },
   "SRB": {
    "r": [
     0.38,
     0.56,
     0.69,
     0.81,
     0.91,
     1.01,
     1.12,
     1.22,
     1.38,
     1.69
    ],
    "cap": 0.35
   },
   "XKX": {
    "r": [
     0.38,
     0.55,
     0.67,
     0.79,
     0.89,
     0.99,
     1.09,
     1.19,
     1.28,
     1.57
    ],
    "cap": 0.32
   }
  }
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
  "cities": [
   {
    "id": "ALB-0",
    "name": "پایتخت آلبانی",
    "pos": [
     20.05,
     41.13
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  ],
  "area": 28337,
  "front": {
   "GRC": {
    "r": [
     0.34,
     0.54,
     0.71,
     0.87,
     1.07,
     1.34,
     1.62,
     1.92,
     2.18,
     2.65
    ],
    "cap": 0.52
   },
   "MKD": {
    "r": [
     0.36,
     0.5,
     0.6,
     0.7,
     0.78,
     0.88,
     0.99,
     1.11,
     1.24,
     1.6300000000000001
    ],
    "cap": 0.1
   },
   "MNE": {
    "r": [
     0.5,
     0.75,
     1.02,
     1.3,
     1.58,
     1.82,
     2.02,
     2.2,
     2.4,
     2.94
    ],
    "cap": 0.46
   },
   "XKX": {
    "r": [
     0.41,
     0.61,
     0.78,
     1.04,
     1.29,
     1.51,
     1.7,
     1.89,
     2.1,
     2.63
    ],
    "cap": 0.46
   }
  }
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
  "cities": [
   {
    "id": "XKX-0",
    "name": "پایتخت کوزوو",
    "pos": [
     20.87,
     42.57
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 10914,
  "front": {
   "ALB": {
    "r": [
     0.22,
     0.32,
     0.39,
     0.47,
     0.54,
     0.63,
     0.71,
     0.78,
     0.87,
     1.06
    ],
    "cap": 0.38
   },
   "MKD": {
    "r": [
     0.22,
     0.32,
     0.4,
     0.46,
     0.53,
     0.6,
     0.68,
     0.77,
     0.85,
     1.11
    ],
    "cap": 0.37
   },
   "MNE": {
    "r": [
     0.32,
     0.45,
     0.56,
     0.65,
     0.72,
     0.78,
     0.86,
     0.94,
     1.07,
     1.27
    ],
    "cap": 0.39
   },
   "SRB": {
    "r": [
     0.24,
     0.38,
     0.49,
     0.58,
     0.66,
     0.73,
     0.79,
     0.85,
     0.93,
     1.29
    ],
    "cap": 0.37
   }
  }
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
  "cities": [
   {
    "id": "EST-0",
    "name": "پایتخت استونی",
    "pos": [
     25.84,
     58.68
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  ],
  "area": 45442,
  "front": {
   "LVA": {
    "r": [
     0.46,
     0.64,
     0.8,
     0.93,
     1.08,
     1.23,
     1.39,
     1.53,
     1.67,
     2.1799999999999997
    ],
    "cap": 0.28
   },
   "RUS": {
    "r": [
     0.48,
     0.68,
     0.83,
     0.97,
     1.12,
     1.33,
     1.53,
     1.77,
     2.11,
     2.98
    ],
    "cap": 0.37
   }
  }
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
  "cities": [
   {
    "id": "LVA-0",
    "name": "پایتخت لتونی",
    "pos": [
     24.92,
     56.86
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 64254,
  "front": {
   "BLR": {
    "r": [
     0.65,
     0.99,
     1.32,
     1.59,
     1.84,
     2.11,
     2.41,
     2.88,
     3.3,
     3.67
    ],
    "cap": 0.47
   },
   "EST": {
    "r": [
     0.62,
     0.91,
     1.16,
     1.38,
     1.57,
     1.72,
     1.87,
     2.05,
     2.28,
     3.12
    ],
    "cap": 0.29
   },
   "LTU": {
    "r": [
     0.59,
     0.82,
     1.02,
     1.19,
     1.33,
     1.46,
     1.58,
     1.69,
     1.82,
     2.14
    ],
    "cap": 0.13
   },
   "RUS": {
    "r": [
     0.5,
     0.74,
     0.97,
     1.19,
     1.43,
     1.73,
     2.11,
     2.72,
     3.13,
     3.72
    ],
    "cap": 0.52
   }
  }
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
  "cities": [
   {
    "id": "LTU-0",
    "name": "پایتخت لیتوانی",
    "pos": [
     23.9,
     55.32
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  ],
  "area": 64519,
  "front": {
   "BLR": {
    "r": [
     0.71,
     0.97,
     1.17,
     1.36,
     1.55,
     1.75,
     2,
     2.29,
     2.63,
     3.17
    ],
    "cap": 0.45
   },
   "LVA": {
    "r": [
     0.56,
     0.82,
     1.01,
     1.18,
     1.33,
     1.47,
     1.6,
     1.76,
     1.95,
     2.4099999999999997
    ],
    "cap": 0.29
   },
   "POL": {
    "r": [
     0.58,
     0.87,
     1.09,
     1.27,
     1.44,
     1.59,
     1.76,
     1.91,
     2.06,
     2.4
    ],
    "cap": 0.32
   },
   "RUS": {
    "r": [
     0.5,
     0.7,
     0.87,
     1.01,
     1.15,
     1.28,
     1.43,
     1.62,
     1.83,
     2.42
    ],
    "cap": 0.26
   }
  }
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
  "cities": [
   {
    "id": "BLR-0",
    "name": "مینسک",
    "pos": [
     27.56,
     53.9
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "BLR-1",
    "name": "برست",
    "pos": [
     23.69,
     52.1
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "BLR-2",
    "name": "گومل",
    "pos": [
     30.98,
     52.44
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 206698,
  "front": {
   "LTU": {
    "r": [
     0.9,
     1.29,
     1.6,
     1.88,
     2.15,
     2.38,
     2.65,
     2.96,
     3.38,
     4.18
    ],
    "cap": 0.16
   },
   "LVA": {
    "r": [
     1.06,
     1.6,
     2.03,
     2.43,
     2.79,
     3.1,
     3.4,
     3.69,
     4.01,
     4.84
    ],
    "cap": 0.27
   },
   "POL": {
    "r": [
     1.39,
     2.06,
     2.65,
     3.12,
     3.54,
     3.91,
     4.25,
     4.59,
     4.95,
     5.819999999999999
    ],
    "cap": 0.39
   },
   "RUS": {
    "r": [
     0.97,
     1.36,
     1.74,
     2.07,
     2.36,
     2.68,
     3.02,
     3.43,
     4.03,
     5.37
    ],
    "cap": 0.43
   },
   "UKR": {
    "r": [
     1.03,
     1.47,
     1.85,
     2.17,
     2.46,
     2.73,
     2.97,
     3.23,
     3.7,
     4.5
    ],
    "cap": 0.47
   }
  }
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
  "cities": [
   {
    "id": "UKR-0",
    "name": "کی‌یف",
    "pos": [
     30.52,
     50.45
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.2
    }
   },
   {
    "id": "UKR-1",
    "name": "خارکیف",
    "pos": [
     36.23,
     49.99
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "UKR-2",
    "name": "دنیپرو",
    "pos": [
     35.05,
     48.46
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "UKR-3",
    "name": "اودسا",
    "pos": [
     30.72,
     46.48
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "UKR-4",
    "name": "لویو",
    "pos": [
     24.03,
     49.84
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   }
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
  ],
  "area": 570135,
  "front": {
   "BLR": {
    "r": [
     1.69,
     2.33,
     2.83,
     3.32,
     3.87,
     4.44,
     5.13,
     5.87,
     6.66,
     8.23
    ],
    "cap": 0.12
   },
   "HUN": {
    "r": [
     2.37,
     3.63,
     4.62,
     5.41,
     6.24,
     7.05,
     7.79,
     8.56,
     9.69,
     11.62
    ],
    "cap": 0.43
   },
   "MDA": {
    "r": [
     1.67,
     2.44,
     2.98,
     3.42,
     3.84,
     4.21,
     4.59,
     4.97,
     5.54,
     7.4
    ],
    "cap": 0.4
   },
   "POL": {
    "r": [
     1.6,
     2.4,
     3.57,
     4.77,
     5.6,
     6.2,
     6.98,
     7.89,
     8.93,
     10.74
    ],
    "cap": 0.36
   },
   "ROU": {
    "r": [
     1.79,
     2.95,
     3.69,
     4.24,
     5.07,
     5.88,
     6.61,
     7.32,
     8.44,
     10.39
    ],
    "cap": 0.45
   },
   "RUS": {
    "r": [
     1.68,
     2.51,
     3.25,
     3.93,
     4.57,
     5.33,
     6.19,
     7.3,
     8.43,
     10.36
    ],
    "cap": 0.53
   },
   "SVK": {
    "r": [
     2.18,
     3.33,
     4.52,
     5.48,
     6.22,
     7.03,
     7.76,
     8.61,
     9.73,
     11.58
    ],
    "cap": 0.4
   }
  }
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
  "cities": [
   {
    "id": "MDA-0",
    "name": "پایتخت مولداوی",
    "pos": [
     28.47,
     47.19
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 33115,
  "front": {
   "ROU": {
    "r": [
     0.4,
     0.56,
     0.69,
     0.79,
     0.88,
     0.97,
     1.05,
     1.15,
     1.29,
     1.6
    ],
    "cap": 0.09
   },
   "UKR": {
    "r": [
     0.39,
     0.56,
     0.7,
     0.84,
     0.96,
     1.1,
     1.26,
     1.44,
     1.67,
     2.2699999999999996
    ],
    "cap": 0.31
   }
  }
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
  "cities": [
   {
    "id": "CYP-0",
    "name": "پایتخت قبرس",
    "pos": [
     33.01,
     34.92
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "GRC",
   "ISR",
   "LBN",
   "SYR",
   "TUR"
  ],
  "area": 9182
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
  "cities": [
   {
    "id": "MLT-0",
    "name": "پایتخت مالت",
    "pos": [
     14.44,
     35.89
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "ITA"
  ],
  "area": 276
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
  "cities": [
   {
    "id": "AND-0",
    "name": "پایتخت آندورا",
    "pos": [
     1.56,
     42.54
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 441,
  "front": {
   "ESP": {
    "r": [
     0.05,
     0.08,
     0.1,
     0.12,
     0.14,
     0.16,
     0.17,
     0.19,
     0.21,
     0.24
    ],
    "cap": 0.42
   },
   "FRA": {
    "r": [
     0.06,
     0.08,
     0.11,
     0.12,
     0.14,
     0.16,
     0.18,
     0.2,
     0.21,
     0.25
    ],
    "cap": 0.42
   }
  }
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
  "cities": [
   {
    "id": "MCO-0",
    "name": "پایتخت موناکو",
    "pos": [
     7.41,
     43.75
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 12,
  "front": {
   "FRA": {
    "r": [
     0.02,
     0.02,
     0.02,
     0.02,
     0.02,
     0.02,
     0.02,
     0.03,
     0.03,
     0.04
    ],
    "cap": 0.79
   }
  }
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
  "cities": [
   {
    "id": "SMR-0",
    "name": "پایتخت سان‌مارینو",
    "pos": [
     12.46,
     43.94
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 70,
  "front": {
   "ITA": {
    "r": [
     0.03,
     0.03,
     0.03,
     0.05,
     0.05,
     0.07,
     0.07,
     0.07,
     0.07,
     0.07
    ],
    "cap": 0.4
   }
  }
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
  "cities": [
   {
    "id": "LIE-0",
    "name": "پایتخت لیختن‌اشتاین",
    "pos": [
     9.54,
     47.14
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 138,
  "front": {
   "AUT": {
    "r": [
     0.04,
     0.04,
     0.05,
     0.05,
     0.06,
     0.06,
     0.08,
     0.08,
     0.09,
     0.1
    ],
    "cap": 0.09
   },
   "CHE": {
    "r": [
     0.04,
     0.06,
     0.06,
     0.07,
     0.08,
     0.1,
     0.1,
     0.14,
     0.14,
     0.18
    ],
    "cap": 0.55
   }
  }
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
  "cities": [
   {
    "id": "VAT-0",
    "name": "پایتخت واتیکان",
    "pos": [
     12.43,
     41.9
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 1,
  "front": {
   "ITA": {
    "r": [
     0.01,
     0.01,
     0.01,
     0.01,
     0.01,
     0.01,
     0.01,
     0.01,
     0.01,
     0.01
    ],
    "cap": 0.97
   }
  }
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
  "cities": [
   {
    "id": "RUS-0",
    "name": "مسکو",
    "pos": [
     37.62,
     55.75
    ],
    "capital": true,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.083
    }
   },
   {
    "id": "RUS-1",
    "name": "سن‌پترزبورگ",
    "pos": [
     30.31,
     59.94
    ],
    "capital": false,
    "tags": [
     "port",
     "industry"
    ],
    "share": {
     "gdp": 0.081,
     "energy": 0.083
    }
   },
   {
    "id": "RUS-2",
    "name": "ولگوگراد",
    "pos": [
     44.5,
     48.71
    ],
    "capital": false,
    "tags": [
     "missile"
    ],
    "share": {
     "gdp": 0.081,
     "energy": 0.083
    }
   },
   {
    "id": "RUS-3",
    "name": "روستوف",
    "pos": [
     39.7,
     47.24
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.081,
     "energy": 0.083
    }
   },
   {
    "id": "RUS-4",
    "name": "یکاترینبورگ",
    "pos": [
     60.6,
     56.84
    ],
    "capital": false,
    "tags": [
     "industry",
     "oil"
    ],
    "share": {
     "gdp": 0.081,
     "energy": 0.333
    }
   },
   {
    "id": "RUS-5",
    "name": "نووسیبیرسک",
    "pos": [
     82.92,
     55.03
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.081,
     "energy": 0.083
    }
   },
   {
    "id": "RUS-6",
    "name": "ولادی‌وستوک",
    "pos": [
     131.9,
     43.12
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.081,
     "energy": 0.083
    }
   },
   {
    "id": "RUS-7",
    "name": "مورمانسک",
    "pos": [
     33.08,
     68.97
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.081,
     "energy": 0.083
    }
   },
   {
    "id": "RUS-8",
    "name": "کالینینگراد",
    "pos": [
     20.5,
     54.71
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.081,
     "energy": 0.083
    }
   }
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
  ],
  "area": 16879701,
  "front": {
   "AZE": {
    "r": [
     15.59,
     21.62,
     26.5,
     31.84,
     37.42,
     42.53,
     47.92,
     54.23,
     60.22,
     69.38
    ],
    "cap": 0.1
   },
   "BLR": {
    "r": [
     10.11,
     15.37,
     23.26,
     29.87,
     34.72,
     40.06,
     45.26,
     50.08,
     55.27,
     67.01
    ],
    "cap": 0.05
   },
   "CHN": {
    "r": [
     9.81,
     15.29,
     18.95,
     22.06,
     25.24,
     28.78,
     33.88,
     41.97,
     49.37,
     60.56
    ],
    "cap": 0.94
   },
   "EST": {
    "r": [
     10.73,
     16.29,
     22.53,
     29.11,
     33.86,
     38.85,
     43.82,
     48.3,
     52.94,
     65.57
    ],
    "cap": 0.05
   },
   "FIN": {
    "r": [
     10.89,
     15.86,
     20.17,
     24.69,
     29.67,
     34.19,
     38.57,
     42.67,
     46.8,
     60.04
    ],
    "cap": 0.09
   },
   "GEO": {
    "r": [
     14.59,
     21.11,
     26.59,
     32.4,
     38,
     43.06,
     48.63,
     54.87,
     60.91,
     69.76
    ],
    "cap": 0.09
   },
   "KAZ": {
    "r": [
     8.84,
     12.36,
     14.96,
     17.87,
     22.14,
     27.25,
     32.43,
     38.62,
     44.84,
     54.21
    ],
    "cap": 0.26
   },
   "LTU": {
    "r": [
     13.74,
     19.16,
     26.52,
     33.17,
     37.92,
     43.01,
     48.02,
     52.49,
     57.08,
     69.86
    ],
    "cap": 0.05
   },
   "LVA": {
    "r": [
     11.1,
     16.28,
     23.3,
     29.98,
     34.65,
     39.81,
     44.84,
     49.44,
     54.22,
     66.65
    ],
    "cap": 0.05
   },
   "MNG": {
    "r": [
     8.77,
     13,
     16.68,
     19.69,
     22.25,
     24.69,
     27.94,
     32.02,
     35.61,
     44.8
    ],
    "cap": 0.88
   },
   "NOR": {
    "r": [
     12.64,
     17.03,
     20.33,
     23.99,
     27.99,
     32.05,
     35.83,
     39.63,
     43.19,
     56.95
    ],
    "cap": 0.14
   },
   "POL": {
    "r": [
     14.79,
     20.35,
     27.74,
     34.36,
     39.17,
     44.19,
     49.18,
     53.61,
     58.08,
     71.05
    ],
    "cap": 0.05
   },
   "PRK": {
    "r": [
     15.71,
     21.12,
     24.71,
     27.92,
     30.81,
     34.46,
     39.41,
     47.36,
     54.96,
     65.39
    ],
    "cap": 0.94
   },
   "UKR": {
    "r": [
     9.26,
     15.86,
     23.18,
     29.79,
     35.05,
     40.28,
     45.78,
     51.33,
     56.97,
     67.2
    ],
    "cap": 0.05
   }
  }
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
  "cities": [
   {
    "id": "TUR-0",
    "name": "آنکارا",
    "pos": [
     32.86,
     39.93
    ],
    "capital": true,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.143
    }
   },
   {
    "id": "TUR-1",
    "name": "استانبول",
    "pos": [
     28.98,
     41.01
    ],
    "capital": false,
    "tags": [
     "port",
     "industry"
    ],
    "share": {
     "gdp": 0.108,
     "energy": 0.143
    }
   },
   {
    "id": "TUR-2",
    "name": "ازمیر",
    "pos": [
     27.14,
     38.42
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.108,
     "energy": 0.143
    }
   },
   {
    "id": "TUR-3",
    "name": "دیاربکر",
    "pos": [
     40.23,
     37.91
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.108,
     "energy": 0.143
    }
   },
   {
    "id": "TUR-4",
    "name": "ارزروم",
    "pos": [
     41.27,
     39.9
    ],
    "capital": false,
    "tags": [
     "missile"
    ],
    "share": {
     "gdp": 0.108,
     "energy": 0.143
    }
   },
   {
    "id": "TUR-5",
    "name": "آدانا",
    "pos": [
     35.32,
     37
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.108,
     "energy": 0.143
    }
   },
   {
    "id": "TUR-6",
    "name": "ترابزون",
    "pos": [
     39.72,
     41
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.108,
     "energy": 0.143
    }
   }
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
  ],
  "area": 779797,
  "front": {
   "ARM": {
    "r": [
     2.03,
     3.18,
     4.54,
     5.83,
     6.96,
     8.1,
     9.25,
     10.52,
     11.89,
     13.44
    ],
    "cap": 0.61
   },
   "AZE": {
    "r": [
     2.42,
     3.76,
     5.2,
     6.57,
     7.76,
     8.92,
     10.03,
     11.36,
     12.71,
     14.29
    ],
    "cap": 0.62
   },
   "BGR": {
    "r": [
     3.15,
     4.3,
     5.18,
     6,
     6.98,
     8.03,
     9.3,
     10.64,
     11.9,
     14.32
    ],
    "cap": 0.27
   },
   "GEO": {
    "r": [
     2.55,
     3.68,
     4.55,
     5.57,
     6.59,
     7.67,
     8.83,
     10,
     11.33,
     12.85
    ],
    "cap": 0.6
   },
   "GRC": {
    "r": [
     2.89,
     4.15,
     5.13,
     6.08,
     7.12,
     8.26,
     9.6,
     10.98,
     12.31,
     14.65
    ],
    "cap": 0.3
   },
   "IRN": {
    "r": [
     2.25,
     3.49,
     4.83,
     6.26,
     7.5,
     8.66,
     9.73,
     11.11,
     12.44,
     14.15
    ],
    "cap": 0.63
   },
   "IRQ": {
    "r": [
     2.57,
     3.78,
     4.89,
     6.24,
     7.52,
     8.65,
     9.72,
     11.04,
     12.36,
     14.23
    ],
    "cap": 0.64
   },
   "SYR": {
    "r": [
     1.9,
     2.75,
     3.41,
     3.96,
     4.48,
     5.02,
     5.7,
     6.7,
     7.97,
     10.24
    ],
    "cap": 0.62
   }
  }
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
  "cities": [
   {
    "id": "IRN-0",
    "name": "تهران",
    "pos": [
     51.39,
     35.69
    ],
    "capital": true,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.091
    }
   },
   {
    "id": "IRN-1",
    "name": "اصفهان",
    "pos": [
     51.67,
     32.65
    ],
    "capital": false,
    "tags": [
     "industry",
     "air"
    ],
    "share": {
     "gdp": 0.093,
     "energy": 0.091
    }
   },
   {
    "id": "IRN-2",
    "name": "تبریز",
    "pos": [
     46.29,
     38.08
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.093,
     "energy": 0.091
    }
   },
   {
    "id": "IRN-3",
    "name": "مشهد",
    "pos": [
     59.6,
     36.3
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.093,
     "energy": 0.091
    }
   },
   {
    "id": "IRN-4",
    "name": "شیراز",
    "pos": [
     52.53,
     29.59
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.093,
     "energy": 0.091
    }
   },
   {
    "id": "IRN-5",
    "name": "بندرعباس",
    "pos": [
     56.27,
     27.18
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.093,
     "energy": 0.091
    }
   },
   {
    "id": "IRN-6",
    "name": "اهواز",
    "pos": [
     48.67,
     31.32
    ],
    "capital": false,
    "tags": [
     "oil"
    ],
    "share": {
     "gdp": 0.093,
     "energy": 0.364
    }
   },
   {
    "id": "IRN-7",
    "name": "کرمانشاه",
    "pos": [
     47.06,
     34.31
    ],
    "capital": false,
    "tags": [
     "missile"
    ],
    "share": {
     "gdp": 0.093,
     "energy": 0.091
    }
   }
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
  ],
  "area": 1622847,
  "front": {
   "AFG": {
    "r": [
     2.65,
     3.87,
     4.93,
     5.8,
     6.63,
     7.41,
     8.23,
     9.34,
     10.9,
     14.19
    ],
    "cap": 0.64
   },
   "ARM": {
    "r": [
     3.63,
     5.86,
     7.39,
     8.6,
     9.8,
     10.94,
     12.02,
     13.34,
     15.24,
     18.61
    ],
    "cap": 0.16
   },
   "AZE": {
    "r": [
     3.47,
     5.41,
     6.66,
     7.89,
     8.95,
     10.07,
     11.18,
     12.6,
     14.44,
     17.8
    ],
    "cap": 0.14
   },
   "IRQ": {
    "r": [
     3.32,
     4.55,
     5.84,
     7.38,
     8.65,
     9.76,
     10.83,
     11.97,
     13.36,
     16.87
    ],
    "cap": 0.26
   },
   "PAK": {
    "r": [
     4,
     5.84,
     7.42,
     8.6,
     9.66,
     10.77,
     11.97,
     13.53,
     15.74,
     19.88
    ],
    "cap": 0.78
   },
   "TKM": {
    "r": [
     3.12,
     4.75,
     6.08,
     7.08,
     7.89,
     8.64,
     9.34,
     9.98,
     10.66,
     12.9
    ],
    "cap": 0.27
   },
   "TUR": {
    "r": [
     4.17,
     6.5,
     8.21,
     9.52,
     10.76,
     11.92,
     13,
     14.2,
     16.1,
     19.59
    ],
    "cap": 0.19
   }
  }
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
  "cities": [
   {
    "id": "IRQ-0",
    "name": "بغداد",
    "pos": [
     44.36,
     33.31
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.083
    }
   },
   {
    "id": "IRQ-1",
    "name": "بصره",
    "pos": [
     47.78,
     30.51
    ],
    "capital": false,
    "tags": [
     "port",
     "oil"
    ],
    "share": {
     "gdp": 0.13,
     "energy": 0.333
    }
   },
   {
    "id": "IRQ-2",
    "name": "موصل",
    "pos": [
     43.13,
     36.34
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.13,
     "energy": 0.083
    }
   },
   {
    "id": "IRQ-3",
    "name": "اربیل",
    "pos": [
     44.01,
     36.19
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.13,
     "energy": 0.083
    }
   },
   {
    "id": "IRQ-4",
    "name": "کربلا",
    "pos": [
     44.02,
     32.6
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.13,
     "energy": 0.083
    }
   },
   {
    "id": "IRQ-5",
    "name": "کرکوک",
    "pos": [
     44.39,
     35.47
    ],
    "capital": false,
    "tags": [
     "oil"
    ],
    "share": {
     "gdp": 0.13,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 437462,
  "front": {
   "IRN": {
    "r": [
     1.3,
     1.83,
     2.27,
     2.65,
     2.98,
     3.29,
     3.59,
     3.91,
     4.34,
     5.51
    ],
    "cap": 0.07
   },
   "JOR": {
    "r": [
     1.98,
     3.02,
     3.73,
     4.28,
     4.76,
     5.2,
     5.61,
     6.03,
     6.61,
     8.39
    ],
    "cap": 0.47
   },
   "KWT": {
    "r": [
     1.4,
     2.25,
     3.06,
     3.92,
     4.73,
     5.39,
     5.97,
     6.54,
     7.1,
     8.18
    ],
    "cap": 0.42
   },
   "SAU": {
    "r": [
     1.49,
     2.1,
     2.57,
     2.97,
     3.33,
     3.66,
     3.98,
     4.57,
     5.42,
     6.6899999999999995
    ],
    "cap": 0.41
   },
   "SYR": {
    "r": [
     1.48,
     2.11,
     2.61,
     3.04,
     3.48,
     4.01,
     4.82,
     5.69,
     6.58,
     8.11
    ],
    "cap": 0.48
   },
   "TUR": {
    "r": [
     1.75,
     2.58,
     3.47,
     4.28,
     4.94,
     5.45,
     5.9,
     6.39,
     7.18,
     8.44
    ],
    "cap": 0.36
   }
  }
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
  "cities": [
   {
    "id": "SAU-0",
    "name": "ریاض",
    "pos": [
     46.68,
     24.71
    ],
    "capital": true,
    "tags": [
     "missile"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.125
    }
   },
   {
    "id": "SAU-1",
    "name": "جده",
    "pos": [
     39.17,
     21.49
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.125
    }
   },
   {
    "id": "SAU-2",
    "name": "دمام",
    "pos": [
     50.1,
     26.43
    ],
    "capital": false,
    "tags": [
     "port",
     "oil"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.5
    }
   },
   {
    "id": "SAU-3",
    "name": "تبوک",
    "pos": [
     36.57,
     28.38
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.125
    }
   },
   {
    "id": "SAU-4",
    "name": "خمیس مشیط",
    "pos": [
     42.73,
     18.3
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.125
    }
   }
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
  ],
  "area": 1925871,
  "front": {
   "ARE": {
    "r": [
     2.84,
     4.25,
     5.8,
     7.13,
     8.32,
     9.5,
     10.69,
     11.89,
     13.6,
     16.87
    ],
    "cap": 0.28
   },
   "IRQ": {
    "r": [
     3.19,
     4.56,
     5.74,
     6.77,
     7.86,
     9.18,
     10.46,
     11.78,
     13.02,
     15.31
    ],
    "cap": 0.43
   },
   "JOR": {
    "r": [
     2.91,
     4.78,
     6.59,
     8.23,
     9.61,
     10.95,
     12.3,
     13.67,
     15.3,
     18.59
    ],
    "cap": 0.51
   },
   "KWT": {
    "r": [
     3.35,
     4.83,
     5.89,
     6.78,
     7.56,
     8.29,
     8.94,
     9.59,
     10.28,
     12.98
    ],
    "cap": 0.14
   },
   "OMN": {
    "r": [
     4.29,
     6.71,
     8.33,
     9.7,
     10.96,
     12.19,
     13.49,
     14.99,
     16.92,
     20.17
    ],
    "cap": 0.34
   },
   "QAT": {
    "r": [
     2.97,
     4.19,
     5.1,
     6.04,
     7.24,
     8.33,
     9.39,
     10.43,
     11.77,
     15.04
    ],
    "cap": 0.18
   },
   "YEM": {
    "r": [
     3.11,
     4.71,
     5.95,
     7.01,
     7.96,
     8.85,
     9.85,
     11.06,
     12.79,
     15.7
    ],
    "cap": 0.44
   }
  }
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
  "cities": [
   {
    "id": "ARE-0",
    "name": "ابوظبی",
    "pos": [
     54.37,
     24.45
    ],
    "capital": true,
    "tags": [
     "port",
     "air",
     "oil"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.8
    }
   },
   {
    "id": "ARE-1",
    "name": "دبی",
    "pos": [
     55.27,
     25.2
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.65,
     "energy": 0.2
    }
   }
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
  ],
  "area": 71265,
  "front": {
   "OMN": {
    "r": [
     0.61,
     0.84,
     1.05,
     1.3,
     1.62,
     1.92,
     2.25,
     2.64,
     3.05,
     3.8499999999999996
    ],
    "cap": 0.4
   },
   "SAU": {
    "r": [
     0.67,
     0.97,
     1.23,
     1.56,
     1.93,
     2.27,
     2.58,
     3.01,
     3.59,
     4.51
    ],
    "cap": 0.59
   }
  }
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
  "cities": [
   {
    "id": "QAT-0",
    "name": "دوحه",
    "pos": [
     51.53,
     25.29
    ],
    "capital": true,
    "tags": [
     "port",
     "air",
     "oil"
    ],
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  ],
  "area": 11076,
  "front": {
   "SAU": {
    "r": [
     0.28,
     0.42,
     0.54,
     0.66,
     0.77,
     0.88,
     1.02,
     1.18,
     1.34,
     1.59
    ],
    "cap": 0.58
   }
  }
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
  "cities": [
   {
    "id": "KWT-0",
    "name": "کویت",
    "pos": [
     47.98,
     29.37
    ],
    "capital": true,
    "tags": [
     "port",
     "oil"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.8
    }
   },
   {
    "id": "KWT-1",
    "name": "الجهرا",
    "pos": [
     47.66,
     29.34
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.65,
     "energy": 0.2
    }
   }
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
  ],
  "area": 17330,
  "front": {
   "IRQ": {
    "r": [
     0.34,
     0.49,
     0.61,
     0.71,
     0.82,
     0.93,
     1.03,
     1.23,
     1.45,
     1.83
    ],
    "cap": 0.64
   },
   "SAU": {
    "r": [
     0.31,
     0.44,
     0.54,
     0.63,
     0.72,
     0.84,
     0.95,
     1.07,
     1.2,
     1.36
    ],
    "cap": 0.52
   }
  }
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
  "cities": [
   {
    "id": "BHR-0",
    "name": "منامه",
    "pos": [
     50.58,
     26.23
    ],
    "capital": true,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "IRN",
   "QAT",
   "SAU"
  ],
  "area": 544
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
  "cities": [
   {
    "id": "OMN-0",
    "name": "مسقط",
    "pos": [
     58.41,
     23.59
    ],
    "capital": true,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "OMN-1",
    "name": "صلاله",
    "pos": [
     54.09,
     17.02
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  ],
  "area": 312041,
  "front": {
   "ARE": {
    "r": [
     1.56,
     2.39,
     3.08,
     3.65,
     4.17,
     4.82,
     5.47,
     6.1,
     6.75,
     8.09
    ],
    "cap": 0.22
   },
   "SAU": {
    "r": [
     1.18,
     1.65,
     2,
     2.27,
     2.55,
     2.87,
     3.18,
     3.52,
     3.99,
     5.95
    ],
    "cap": 0.97
   },
   "YEM": {
    "r": [
     1.28,
     2.11,
     3.05,
     4.02,
     4.86,
     5.58,
     6.23,
     6.8,
     7.39,
     9.11
    ],
    "cap": 0.97
   }
  }
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
  "cities": [
   {
    "id": "YEM-0",
    "name": "پایتخت یمن",
    "pos": [
     47.52,
     15.94
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "YEM-1",
    "name": "شرق یمن",
    "pos": [
     50.51,
     17.06
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "YEM-2",
    "name": "غرب یمن",
    "pos": [
     46.15,
     16.82
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 454139,
  "front": {
   "OMN": {
    "r": [
     1.58,
     2.51,
     3.43,
     4.34,
     5.41,
     6.35,
     7.23,
     8.07,
     8.86,
     9.98
    ],
    "cap": 0.47
   },
   "SAU": {
    "r": [
     1.57,
     2.23,
     2.76,
     3.19,
     3.62,
     4,
     4.45,
     5.12,
     6.03,
     10.06
    ],
    "cap": 0.27
   }
  }
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
  "cities": [
   {
    "id": "JOR-0",
    "name": "امان",
    "pos": [
     35.93,
     31.95
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "JOR-1",
    "name": "عقبه",
    "pos": [
     35,
     29.53
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 88856,
  "front": {
   "IRQ": {
    "r": [
     0.67,
     1.16,
     1.93,
     2.27,
     2.54,
     2.77,
     3.01,
     3.37,
     3.81,
     4.63
    ],
    "cap": 0.54
   },
   "ISR": {
    "r": [
     0.69,
     0.97,
     1.18,
     1.36,
     1.54,
     1.76,
     2,
     2.6,
     3.25,
     4.01
    ],
    "cap": 0.42
   },
   "PSE": {
    "r": [
     0.68,
     1.03,
     1.32,
     1.58,
     1.8,
     2.01,
     2.2,
     2.39,
     2.62,
     3.19
    ],
    "cap": 0.05
   },
   "SAU": {
    "r": [
     0.75,
     1.17,
     1.43,
     1.62,
     1.78,
     1.92,
     2.05,
     2.2,
     2.43,
     3.1399999999999997
    ],
    "cap": 0.79
   },
   "SYR": {
    "r": [
     0.6,
     0.85,
     1.05,
     1.29,
     1.51,
     1.73,
     1.94,
     2.25,
     2.66,
     3.35
    ],
    "cap": 0.2
   }
  }
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
  "cities": [
   {
    "id": "ISR-0",
    "name": "تل‌آویو",
    "pos": [
     34.78,
     32.08
    ],
    "capital": true,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "ISR-1",
    "name": "حیفا",
    "pos": [
     34.99,
     32.79
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "ISR-2",
    "name": "بئرشبع",
    "pos": [
     34.79,
     31.25
    ],
    "capital": false,
    "tags": [
     "air",
     "missile"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 22284,
  "front": {
   "EGY": {
    "r": [
     0.35,
     0.49,
     0.61,
     0.75,
     0.9,
     1.11,
     1.54,
     2.29,
     2.6,
     3.13
    ],
    "cap": 0.71
   },
   "JOR": {
    "r": [
     0.34,
     0.47,
     0.58,
     0.67,
     0.81,
     1,
     1.34,
     1.99,
     2.27,
     2.75
    ],
    "cap": 0.72
   },
   "LBN": {
    "r": [
     0.42,
     0.69,
     1.44,
     1.9,
     2.13,
     2.32,
     2.51,
     2.76,
     3.09,
     3.82
    ],
    "cap": 0.29
   },
   "PSE": {
    "r": [
     0.33,
     0.57,
     0.73,
     0.84,
     0.96,
     1.09,
     1.22,
     1.37,
     1.61,
     2.32
    ],
    "cap": 0.09
   },
   "SYR": {
    "r": [
     0.43,
     0.74,
     1.47,
     1.88,
     2.1,
     2.29,
     2.48,
     2.71,
     3.03,
     3.74
    ],
    "cap": 0.29
   }
  }
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
  "cities": [
   {
    "id": "PSE-0",
    "name": "پایتخت فلسطین",
    "pos": [
     35.25,
     31.95
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 6336,
  "front": {
   "EGY": {
    "r": [
     0.71,
     0.88,
     0.99,
     1.06,
     1.11,
     1.19,
     1.26,
     1.34,
     1.44,
     1.59
    ],
    "cap": 0.47
   },
   "ISR": {
    "r": [
     0.23,
     0.29,
     0.34,
     0.38,
     0.42,
     0.46,
     0.5,
     0.58,
     0.67,
     0.84
    ],
    "cap": 0.18
   },
   "JOR": {
    "r": [
     0.18,
     0.25,
     0.3,
     0.36,
     0.4,
     0.44,
     0.49,
     0.56,
     0.68,
     1.33
    ],
    "cap": 0.19
   }
  }
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
  "cities": [
   {
    "id": "LBN-0",
    "name": "بیروت",
    "pos": [
     35.5,
     33.89
    ],
    "capital": true,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  ],
  "area": 10010,
  "front": {
   "ISR": {
    "r": [
     0.21,
     0.31,
     0.43,
     0.62,
     0.79,
     0.91,
     1.05,
     1.17,
     1.29,
     1.53
    ],
    "cap": 0.4
   },
   "SYR": {
    "r": [
     0.25,
     0.34,
     0.41,
     0.47,
     0.53,
     0.58,
     0.64,
     0.73,
     0.89,
     1.25
    ],
    "cap": 0.71
   }
  }
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
  "cities": [
   {
    "id": "SYR-0",
    "name": "دمشق",
    "pos": [
     36.29,
     33.51
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "SYR-1",
    "name": "حلب",
    "pos": [
     37.16,
     36.2
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "SYR-2",
    "name": "لاذقیه",
    "pos": [
     35.78,
     35.52
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 185733,
  "front": {
   "IRQ": {
    "r": [
     1.02,
     1.4,
     1.81,
     2.29,
     2.73,
     3.13,
     3.53,
     3.91,
     4.35,
     5.42
    ],
    "cap": 0.95
   },
   "ISR": {
    "r": [
     1.1,
     1.74,
     2.22,
     2.64,
     3.04,
     3.44,
     3.82,
     4.26,
     4.86,
     6.62
    ],
    "cap": 0.05
   },
   "JOR": {
    "r": [
     1.2,
     1.91,
     2.49,
     2.93,
     3.32,
     3.67,
     4.04,
     4.38,
     4.91,
     6.64
    ],
    "cap": 0.11
   },
   "LBN": {
    "r": [
     0.92,
     1.28,
     1.6,
     1.97,
     2.36,
     2.74,
     3.13,
     3.6,
     4.17,
     5.91
    ],
    "cap": 0.05
   },
   "TUR": {
    "r": [
     1.08,
     1.49,
     1.83,
     2.11,
     2.36,
     2.61,
     2.86,
     3.18,
     3.7,
     4.75
    ],
    "cap": 0.9
   }
  }
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
  "cities": [
   {
    "id": "EGY-0",
    "name": "قاهره",
    "pos": [
     31.24,
     30.04
    ],
    "capital": true,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.25
    }
   },
   {
    "id": "EGY-1",
    "name": "اسکندریه",
    "pos": [
     29.92,
     31.2
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   },
   {
    "id": "EGY-2",
    "name": "پورت سعید",
    "pos": [
     32.3,
     31.26
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   },
   {
    "id": "EGY-3",
    "name": "اسوان",
    "pos": [
     32.9,
     24.09
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   }
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
  ],
  "area": 1003707,
  "front": {
   "ISR": {
    "r": [
     2.91,
     4.24,
     5.26,
     6.06,
     6.74,
     7.36,
     7.91,
     8.43,
     9.36,
     11.91
    ],
    "cap": 0.1
   },
   "LBY": {
    "r": [
     2.24,
     3.18,
     3.93,
     4.68,
     5.41,
     6.05,
     6.76,
     7.6,
     8.57,
     12.049999999999999
    ],
    "cap": 0.58
   },
   "PSE": {
    "r": [
     3.13,
     4.58,
     5.62,
     6.4,
     7.09,
     7.7,
     8.29,
     8.96,
     9.77,
     12.299999999999999
    ],
    "cap": 0.08
   },
   "SDN": {
    "r": [
     2.14,
     3.11,
     3.84,
     4.56,
     5.3,
     6.05,
     6.91,
     7.76,
     8.64,
     10.85
    ],
    "cap": 0.81
   }
  }
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
  "cities": [
   {
    "id": "AZE-0",
    "name": "باکو",
    "pos": [
     49.87,
     40.41
    ],
    "capital": true,
    "tags": [
     "port",
     "oil"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.667
    }
   },
   {
    "id": "AZE-1",
    "name": "گنجه",
    "pos": [
     46.36,
     40.68
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.167
    }
   },
   {
    "id": "AZE-2",
    "name": "نخجوان",
    "pos": [
     45.41,
     39.21
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.325,
     "energy": 0.167
    }
   }
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
  ],
  "area": 86400,
  "front": {
   "ARM": {
    "r": [
     0.7,
     0.96,
     1.18,
     1.42,
     1.72,
     2.03,
     2.33,
     2.56,
     2.77,
     3.6199999999999997
    ],
    "cap": 0.97
   },
   "GEO": {
    "r": [
     0.53,
     0.8,
     1.03,
     1.26,
     1.47,
     1.68,
     1.91,
     2.13,
     2.43,
     3.19
    ],
    "cap": 0.93
   },
   "IRN": {
    "r": [
     0.66,
     0.92,
     1.16,
     1.38,
     1.6,
     1.79,
     1.95,
     2.15,
     2.42,
     3.1799999999999997
    ],
    "cap": 0.62
   },
   "RUS": {
    "r": [
     0.67,
     0.96,
     1.16,
     1.34,
     1.51,
     1.7,
     1.91,
     2.2,
     2.52,
     3.26
    ],
    "cap": 0.82
   },
   "TUR": {
    "r": [
     1.21,
     1.53,
     1.76,
     2.11,
     2.4,
     2.7,
     2.97,
     3.21,
     3.44,
     4.31
    ],
    "cap": 0.97
   }
  }
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
  "cities": [
   {
    "id": "ARM-0",
    "name": "ایروان",
    "pos": [
     44.51,
     40.18
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "ARM-1",
    "name": "گیومری",
    "pos": [
     43.85,
     40.79
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 29568,
  "front": {
   "AZE": {
    "r": [
     0.31,
     0.46,
     0.63,
     0.76,
     0.9,
     1.03,
     1.17,
     1.31,
     1.48,
     1.97
    ],
    "cap": 0.48
   },
   "GEO": {
    "r": [
     0.41,
     0.57,
     0.74,
     0.89,
     1.03,
     1.18,
     1.42,
     1.68,
     2.25,
     2.85
    ],
    "cap": 0.52
   },
   "IRN": {
    "r": [
     0.62,
     1.15,
     1.44,
     1.69,
     1.93,
     2.1,
     2.26,
     2.42,
     2.59,
     3.0999999999999996
    ],
    "cap": 0.48
   },
   "TUR": {
    "r": [
     0.43,
     0.65,
     0.81,
     0.93,
     1.07,
     1.21,
     1.35,
     1.52,
     1.99,
     2.51
    ],
    "cap": 0.19
   }
  }
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
  "cities": [
   {
    "id": "GEO-0",
    "name": "تفلیس",
    "pos": [
     44.79,
     41.72
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "GEO-1",
    "name": "باتومی",
    "pos": [
     41.64,
     41.64
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 69297,
  "front": {
   "ARM": {
    "r": [
     0.57,
     0.85,
     1.07,
     1.24,
     1.39,
     1.53,
     1.74,
     2.02,
     2.51,
     3.84
    ],
    "cap": 0.13
   },
   "AZE": {
    "r": [
     1.05,
     1.52,
     1.87,
     2.19,
     2.54,
     2.92,
     3.28,
     3.6,
     4.03,
     5.3999999999999995
    ],
    "cap": 0.19
   },
   "RUS": {
    "r": [
     0.5,
     0.74,
     0.9,
     1.05,
     1.19,
     1.31,
     1.44,
     1.62,
     1.96,
     2.9299999999999997
    ],
    "cap": 0.44
   },
   "TUR": {
    "r": [
     0.51,
     0.74,
     0.93,
     1.11,
     1.29,
     1.47,
     1.69,
     1.97,
     2.29,
     2.96
    ],
    "cap": 0.63
   }
  }
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
  "cities": [
   {
    "id": "TKM-0",
    "name": "عشق‌آباد",
    "pos": [
     58.38,
     37.95
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.111
    }
   },
   {
    "id": "TKM-1",
    "name": "ترکمن‌باشی",
    "pos": [
     52.97,
     40.02
    ],
    "capital": false,
    "tags": [
     "port",
     "oil"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.444
    }
   },
   {
    "id": "TKM-2",
    "name": "مرو",
    "pos": [
     61.83,
     37.6
    ],
    "capital": false,
    "tags": [
     "oil"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.444
    }
   }
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
  ],
  "area": 470600,
  "front": {
   "AFG": {
    "r": [
     1.5,
     2.42,
     3.08,
     3.97,
     4.87,
     5.67,
     6.46,
     7.11,
     7.75,
     10.16
    ],
    "cap": 0.44
   },
   "IRN": {
    "r": [
     1.56,
     2.15,
     2.57,
     2.94,
     3.27,
     3.6,
     3.92,
     4.27,
     4.79,
     6.79
    ],
    "cap": 0.05
   },
   "KAZ": {
    "r": [
     1.95,
     2.63,
     3.23,
     3.8,
     4.48,
     5.33,
     6.34,
     7.4,
     8.36,
     9.97
    ],
    "cap": 0.54
   },
   "UZB": {
    "r": [
     1.59,
     2.34,
     3,
     3.53,
     3.97,
     4.35,
     4.79,
     5.27,
     5.82,
     6.95
    ],
    "cap": 0.55
   }
  }
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
  "cities": [
   {
    "id": "UZB-0",
    "name": "پایتخت ازبکستان",
    "pos": [
     63.29,
     41.78
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "UZB-1",
    "name": "شرق ازبکستان",
    "pos": [
     69.46,
     41.37
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "UZB-2",
    "name": "جنوب ازبکستان",
    "pos": [
     65.78,
     39.07
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 447381,
  "front": {
   "AFG": {
    "r": [
     2.35,
     3.31,
     4.08,
     4.75,
     5.52,
     6.49,
     7.7,
     9.14,
     9.98,
     11.47
    ],
    "cap": 0.5
   },
   "KAZ": {
    "r": [
     1.76,
     2.54,
     3.08,
     3.51,
     3.87,
     4.2,
     4.76,
     5.34,
     5.98,
     7.09
    ],
    "cap": 0.15
   },
   "KGZ": {
    "r": [
     3.27,
     4.59,
     5.2,
     5.78,
     6.5,
     7.39,
     8.69,
     10.06,
     11.21,
     12.27
    ],
    "cap": 0.52
   },
   "TJK": {
    "r": [
     1.62,
     2.26,
     2.83,
     3.57,
     4.4,
     5.34,
     6.74,
     8.28,
     9.3,
     10.56
    ],
    "cap": 0.51
   },
   "TKM": {
    "r": [
     1.49,
     2.05,
     2.5,
     2.89,
     3.32,
     3.82,
     4.53,
     5.64,
     6.79,
     9.72
    ],
    "cap": 0.27
   }
  }
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
  "cities": [
   {
    "id": "KAZ-0",
    "name": "آستانه",
    "pos": [
     71.45,
     51.17
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.167
    }
   },
   {
    "id": "KAZ-1",
    "name": "آلماتی",
    "pos": [
     76.89,
     43.24
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.167
    }
   },
   {
    "id": "KAZ-2",
    "name": "آکتائو",
    "pos": [
     51.2,
     43.65
    ],
    "capital": false,
    "tags": [
     "port",
     "oil"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.667
    }
   }
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
  ],
  "area": 2712747,
  "front": {
   "CHN": {
    "r": [
     3.98,
     5.79,
     7.88,
     9.56,
     11.1,
     12.68,
     14.5,
     17.33,
     20.34,
     24.43
    ],
    "cap": 0.4
   },
   "KGZ": {
    "r": [
     3.61,
     5.18,
     6.46,
     7.77,
     8.86,
     9.99,
     11.43,
     13.27,
     15.74,
     20.23
    ],
    "cap": 0.47
   },
   "RUS": {
    "r": [
     4.34,
     5.88,
     7.05,
     8.02,
     8.92,
     9.85,
     10.93,
     12.16,
     13.47,
     16.69
    ],
    "cap": 0.25
   },
   "TKM": {
    "r": [
     5.59,
     7.35,
     8.7,
     10.09,
     11.8,
     13.44,
     15.03,
     16.65,
     18.51,
     23.4
    ],
    "cap": 0.67
   },
   "UZB": {
    "r": [
     3.33,
     5.06,
     6.41,
     7.42,
     8.28,
     9.13,
     10.02,
     10.95,
     12.14,
     15.99
    ],
    "cap": 0.56
   }
  }
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
  "cities": [
   {
    "id": "KGZ-0",
    "name": "پایتخت قرقیزستان",
    "pos": [
     74.51,
     41.47
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "KGZ-1",
    "name": "غرب قرقیزستان",
    "pos": [
     72.17,
     40.32
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 198661,
  "front": {
   "CHN": {
    "r": [
     1.17,
     1.59,
     1.9,
     2.17,
     2.4,
     2.63,
     2.91,
     3.27,
     3.91,
     5.319999999999999
    ],
    "cap": 0.22
   },
   "KAZ": {
    "r": [
     1,
     1.47,
     1.81,
     2.08,
     2.31,
     2.55,
     2.81,
     3.2,
     3.77,
     5.33
    ],
    "cap": 0.22
   },
   "TJK": {
    "r": [
     1.39,
     2.18,
     2.64,
     3.08,
     3.57,
     4.15,
     4.64,
     5.35,
     6.13,
     7.67
    ],
    "cap": 0.49
   },
   "UZB": {
    "r": [
     0.91,
     1.22,
     1.47,
     1.74,
     2.03,
     2.45,
     3.01,
     3.69,
     4.5,
     6.09
    ],
    "cap": 0.43
   }
  }
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
  "cities": [
   {
    "id": "TJK-0",
    "name": "پایتخت تاجیکستان",
    "pos": [
     71.03,
     38.53
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "TJK-1",
    "name": "شرق تاجیکستان",
    "pos": [
     73.12,
     38.57
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "TJK-2",
    "name": "غرب تاجیکستان",
    "pos": [
     69.69,
     39.42
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 142300,
  "front": {
   "AFG": {
    "r": [
     0.75,
     1.02,
     1.22,
     1.42,
     1.65,
     1.89,
     2.14,
     2.4,
     2.62,
     3.29
    ],
    "cap": 0.05
   },
   "CHN": {
    "r": [
     0.97,
     1.36,
     1.88,
     2.36,
     2.9,
     3.61,
     4.02,
     4.39,
     4.77,
     5.59
    ],
    "cap": 0.48
   },
   "KGZ": {
    "r": [
     0.83,
     1.13,
     1.36,
     1.62,
     1.88,
     2.11,
     2.35,
     2.64,
     3,
     4.11
    ],
    "cap": 0.18
   },
   "UZB": {
    "r": [
     0.94,
     1.31,
     1.71,
     2.1,
     2.47,
     2.91,
     3.43,
     3.83,
     4.34,
     5.56
    ],
    "cap": 0.45
   }
  }
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
  "cities": [
   {
    "id": "AFG-0",
    "name": "کابل",
    "pos": [
     69.17,
     34.53
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.25
    }
   },
   {
    "id": "AFG-1",
    "name": "هرات",
    "pos": [
     62.2,
     34.35
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   },
   {
    "id": "AFG-2",
    "name": "قندهار",
    "pos": [
     65.71,
     31.61
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   },
   {
    "id": "AFG-3",
    "name": "مزار شریف",
    "pos": [
     67.11,
     36.71
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.217,
     "energy": 0.25
    }
   }
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
  "seaNeighbors": [],
  "area": 642058,
  "front": {
   "CHN": {
    "r": [
     4.05,
     5.48,
     6.52,
     7.36,
     8.22,
     9.13,
     10.04,
     10.83,
     11.62,
     13.61
    ],
    "cap": 0.18
   },
   "IRN": {
    "r": [
     1.99,
     3.03,
     3.77,
     4.37,
     4.96,
     5.54,
     6.23,
     7.11,
     8.27,
     12.12
    ],
    "cap": 0.81
   },
   "PAK": {
    "r": [
     1.73,
     2.54,
     3.17,
     3.73,
     4.2,
     4.69,
     5.19,
     5.79,
     6.6,
     8.03
    ],
    "cap": 0.08
   },
   "TJK": {
    "r": [
     2.58,
     3.82,
     4.8,
     5.67,
     6.53,
     7.41,
     8.29,
     9.1,
     9.9,
     11.959999999999999
    ],
    "cap": 0.22
   },
   "TKM": {
    "r": [
     1.82,
     2.54,
     3.14,
     3.7,
     4.24,
     4.73,
     5.23,
     5.66,
     6.17,
     9.379999999999999
    ],
    "cap": 0.67
   },
   "UZB": {
    "r": [
     1.8,
     2.54,
     3.13,
     3.7,
     4.33,
     5,
     5.61,
     6.4,
     7.3,
     9.17
    ],
    "cap": 0.29
   }
  }
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
  "cities": [
   {
    "id": "CHN-0",
    "name": "پکن",
    "pos": [
     116.4,
     39.9
    ],
    "capital": true,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.1
    }
   },
   {
    "id": "CHN-1",
    "name": "شانگهای",
    "pos": [
     121.47,
     31.23
    ],
    "capital": false,
    "tags": [
     "port",
     "industry"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.1
    }
   },
   {
    "id": "CHN-2",
    "name": "گوانگژو",
    "pos": [
     113.26,
     23.13
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.1
    }
   },
   {
    "id": "CHN-3",
    "name": "چینگدائو",
    "pos": [
     120.38,
     36.07
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.1
    }
   },
   {
    "id": "CHN-4",
    "name": "شیامن",
    "pos": [
     118.09,
     24.48
    ],
    "capital": false,
    "tags": [
     "port",
     "air"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.1
    }
   },
   {
    "id": "CHN-5",
    "name": "چنگدو",
    "pos": [
     104.07,
     30.57
    ],
    "capital": false,
    "tags": [
     "industry",
     "air"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.1
    }
   },
   {
    "id": "CHN-6",
    "name": "ووهان",
    "pos": [
     114.3,
     30.59
    ],
    "capital": false,
    "tags": [
     "missile"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.1
    }
   },
   {
    "id": "CHN-7",
    "name": "شنیانگ",
    "pos": [
     123.43,
     41.8
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.072,
     "energy": 0.1
    }
   },
   {
    "id": "CHN-8",
    "name": "کاشغر",
    "pos": [
     75.99,
     39.47
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.072,
     "energy": 0.1
    }
   },
   {
    "id": "CHN-9",
    "name": "لاسا",
    "pos": [
     91.17,
     29.65
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.072,
     "energy": 0.1
    }
   }
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
  ],
  "area": 9372278,
  "front": {
   "AFG": {
    "r": [
     8.74,
     12.73,
     16.33,
     21.35,
     25.62,
     28.97,
     32.1,
     34.69,
     37.17,
     44.12
    ],
    "cap": 0.71
   },
   "BTN": {
    "r": [
     7.26,
     9.94,
     12.09,
     14.05,
     15.96,
     18.17,
     20.92,
     24.37,
     30.11,
     39.18
    ],
    "cap": 0.8
   },
   "IND": {
    "r": [
     7.46,
     11.4,
     14.85,
     18.63,
     22.34,
     26.14,
     29.51,
     32.41,
     35.67,
     44.11
    ],
    "cap": 0.75
   },
   "KAZ": {
    "r": [
     7.15,
     10.91,
     14.46,
     17.82,
     21.65,
     24.5,
     26.69,
     28.81,
     31.29,
     35.47
    ],
    "cap": 0.64
   },
   "KGZ": {
    "r": [
     8.07,
     11.67,
     15.58,
     20.41,
     24.87,
     27.92,
     30.72,
     33.14,
     35.55,
     41.489999999999995
    ],
    "cap": 0.69
   },
   "LAO": {
    "r": [
     8.37,
     11.74,
     14.16,
     16.27,
     18.22,
     20.04,
     22.39,
     25.54,
     29.02,
     37.03
    ],
    "cap": 0.69
   },
   "MMR": {
    "r": [
     7.99,
     10.8,
     12.93,
     14.87,
     16.66,
     18.34,
     20.34,
     22.8,
     28.52,
     37.379999999999995
    ],
    "cap": 0.78
   },
   "MNG": {
    "r": [
     6.32,
     9.01,
     10.9,
     12.64,
     14.17,
     15.74,
     17.33,
     19.15,
     21.44,
     27.270000000000003
    ],
    "cap": 0.08
   },
   "NPL": {
    "r": [
     7.49,
     11.16,
     13.57,
     15.82,
     18.23,
     21.67,
     24.99,
     28.4,
     33.23,
     42.28
    ],
    "cap": 0.79
   },
   "PAK": {
    "r": [
     8.02,
     11.93,
     15.45,
     20.46,
     24.6,
     28.01,
     31.22,
     33.85,
     36.5,
     43.72
    ],
    "cap": 0.72
   },
   "PRK": {
    "r": [
     7.83,
     11.64,
     15.66,
     19.14,
     22.19,
     25.04,
     27.79,
     30.71,
     34.52,
     41
    ],
    "cap": 0.13
   },
   "RUS": {
    "r": [
     7.64,
     16.06,
     20.64,
     23.77,
     26.23,
     28.35,
     30.46,
     32.64,
     35.72,
     41.61
    ],
    "cap": 0.16
   },
   "TJK": {
    "r": [
     8.87,
     12.73,
     16.5,
     21.48,
     25.81,
     29.09,
     32.09,
     34.62,
     37.02,
     43.5
    ],
    "cap": 0.7
   },
   "VNM": {
    "r": [
     6.04,
     9.64,
     12.42,
     14.68,
     16.81,
     19.13,
     21.94,
     24.78,
     27.84,
     33.629999999999995
    ],
    "cap": 0.6
   }
  }
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
  "cities": [
   {
    "id": "IND-0",
    "name": "دهلی نو",
    "pos": [
     77.2,
     28.6
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.125
    }
   },
   {
    "id": "IND-1",
    "name": "بمبئی",
    "pos": [
     72.88,
     19.08
    ],
    "capital": false,
    "tags": [
     "port",
     "industry"
    ],
    "share": {
     "gdp": 0.093,
     "energy": 0.125
    }
   },
   {
    "id": "IND-2",
    "name": "کلکته",
    "pos": [
     88.36,
     22.57
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.093,
     "energy": 0.125
    }
   },
   {
    "id": "IND-3",
    "name": "چنای",
    "pos": [
     80.27,
     13.08
    ],
    "capital": false,
    "tags": [
     "port",
     "industry"
    ],
    "share": {
     "gdp": 0.093,
     "energy": 0.125
    }
   },
   {
    "id": "IND-4",
    "name": "بنگلور",
    "pos": [
     77.59,
     12.97
    ],
    "capital": false,
    "tags": [
     "industry",
     "air"
    ],
    "share": {
     "gdp": 0.093,
     "energy": 0.125
    }
   },
   {
    "id": "IND-5",
    "name": "حیدرآباد",
    "pos": [
     78.49,
     17.39
    ],
    "capital": false,
    "tags": [
     "missile"
    ],
    "share": {
     "gdp": 0.093,
     "energy": 0.125
    }
   },
   {
    "id": "IND-6",
    "name": "سرینگر",
    "pos": [
     74.8,
     34.08
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.093,
     "energy": 0.125
    }
   },
   {
    "id": "IND-7",
    "name": "گواهاتی",
    "pos": [
     91.74,
     26.14
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.093,
     "energy": 0.125
    }
   }
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
  ],
  "area": 3157935,
  "front": {
   "BGD": {
    "r": [
     4.2,
     6.5,
     8.92,
     10.63,
     12.06,
     13.3,
     14.5,
     15.75,
     17.34,
     21.330000000000002
    ],
    "cap": 0.44
   },
   "BTN": {
    "r": [
     4.51,
     7.89,
     10.32,
     11.99,
     13.36,
     14.59,
     15.85,
     17.26,
     18.79,
     22.69
    ],
    "cap": 0.43
   },
   "CHN": {
    "r": [
     4.13,
     6.91,
     8.74,
     10.1,
     11.53,
     12.69,
     13.85,
     15.29,
     17.91,
     24.41
    ],
    "cap": 0.1
   },
   "MMR": {
    "r": [
     6.43,
     10.45,
     13.02,
     14.84,
     16.32,
     17.53,
     18.59,
     19.75,
     21.08,
     23.96
    ],
    "cap": 0.48
   },
   "NPL": {
    "r": [
     3.95,
     5.46,
     6.68,
     7.75,
     8.67,
     9.56,
     10.72,
     12.18,
     14.4,
     20.19
    ],
    "cap": 0.24
   },
   "PAK": {
    "r": [
     3.83,
     5.37,
     7.13,
     8.94,
     10.72,
     12.34,
     13.73,
     15.19,
     17.93,
     25.44
    ],
    "cap": 0.09
   }
  }
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
  "cities": [
   {
    "id": "PAK-0",
    "name": "اسلام‌آباد",
    "pos": [
     73.05,
     33.68
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.2
    }
   },
   {
    "id": "PAK-1",
    "name": "کراچی",
    "pos": [
     67,
     24.86
    ],
    "capital": false,
    "tags": [
     "port",
     "industry"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "PAK-2",
    "name": "لاهور",
    "pos": [
     74.35,
     31.55
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "PAK-3",
    "name": "پیشاور",
    "pos": [
     71.58,
     34.01
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "PAK-4",
    "name": "کویته",
    "pos": [
     67,
     30.18
    ],
    "capital": false,
    "tags": [
     "missile"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   }
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
  "seaNeighbors": [],
  "area": 873772,
  "front": {
   "AFG": {
    "r": [
     2.21,
     3.02,
     3.61,
     4.18,
     4.79,
     5.54,
     6.45,
     7.37,
     8.14,
     10.4
    ],
    "cap": 0.2
   },
   "CHN": {
    "r": [
     2.87,
     4.7,
     6.29,
     7.89,
     9.28,
     10.84,
     12.05,
     12.92,
     13.76,
     16.55
    ],
    "cap": 0.14
   },
   "IND": {
    "r": [
     2.06,
     3.02,
     3.85,
     4.62,
     5.32,
     5.89,
     6.48,
     7.26,
     8.62,
     11.31
    ],
    "cap": 0.29
   },
   "IRN": {
    "r": [
     1.77,
     2.76,
     4.14,
     5.1,
     6,
     7.2,
     8.55,
     10,
     11.57,
     14.24
    ],
    "cap": 0.84
   }
  }
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
  "cities": [
   {
    "id": "BGD-0",
    "name": "داکا",
    "pos": [
     90.41,
     23.81
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "BGD-1",
    "name": "چیتاگونگ",
    "pos": [
     91.78,
     22.36
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 135674,
  "front": {
   "IND": {
    "r": [
     0.99,
     1.49,
     1.87,
     2.19,
     2.5,
     2.81,
     3.28,
     3.69,
     4.13,
     5.76
    ],
    "cap": 0.48
   },
   "MMR": {
    "r": [
     1.5,
     2.2,
     2.74,
     3.05,
     3.32,
     3.59,
     3.89,
     4.38,
     5.02,
     6.31
    ],
    "cap": 0.39
   }
  }
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
  "cities": [
   {
    "id": "NPL-0",
    "name": "کاتماندو",
    "pos": [
     85.32,
     27.72
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 147193,
  "front": {
   "CHN": {
    "r": [
     0.95,
     1.29,
     1.57,
     1.86,
     2.14,
     2.44,
     2.74,
     3.12,
     3.59,
     4.46
    ],
    "cap": 0.09
   },
   "IND": {
    "r": [
     0.84,
     1.18,
     1.45,
     1.74,
     2.07,
     2.4,
     2.72,
     3.07,
     3.41,
     3.84
    ],
    "cap": 0.24
   }
  }
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
  "cities": [
   {
    "id": "BTN-0",
    "name": "پایتخت بوتان",
    "pos": [
     90.4,
     27.41
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 39870,
  "front": {
   "CHN": {
    "r": [
     0.41,
     0.61,
     0.77,
     0.9,
     1.03,
     1.14,
     1.25,
     1.38,
     1.53,
     1.96
    ],
    "cap": 0.26
   },
   "IND": {
    "r": [
     0.46,
     0.65,
     0.8,
     0.95,
     1.09,
     1.23,
     1.41,
     1.61,
     1.79,
     2.1599999999999997
    ],
    "cap": 0.37
   }
  }
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
  "cities": [
   {
    "id": "LKA-0",
    "name": "پایتخت سری‌لانکا",
    "pos": [
     80.7,
     7.61
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "IND"
  ],
  "area": 66046
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
  "cities": [
   {
    "id": "MDV-0",
    "name": "پایتخت مالدیو",
    "pos": [
     73.5,
     4.2
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "IND"
  ],
  "area": 67
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
  "cities": [
   {
    "id": "JPN-0",
    "name": "توکیو",
    "pos": [
     139.69,
     35.69
    ],
    "capital": true,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.2
    }
   },
   {
    "id": "JPN-1",
    "name": "یوکوسوکا",
    "pos": [
     139.67,
     35.28
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "JPN-2",
    "name": "اوساکا",
    "pos": [
     135.5,
     34.69
    ],
    "capital": false,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "JPN-3",
    "name": "ناها",
    "pos": [
     127.68,
     26.21
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   },
   {
    "id": "JPN-4",
    "name": "ساپورو",
    "pos": [
     141.35,
     43.06
    ],
    "capital": false,
    "tags": [],
    "share": {
     "gdp": 0.163,
     "energy": 0.2
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "CHN",
   "KOR",
   "RUS",
   "TWN"
  ],
  "area": 370074
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
  "cities": [
   {
    "id": "KOR-0",
    "name": "سئول",
    "pos": [
     126.98,
     37.57
    ],
    "capital": true,
    "tags": [
     "industry"
    ],
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "KOR-1",
    "name": "بوسان",
    "pos": [
     129.08,
     35.18
    ],
    "capital": false,
    "tags": [
     "port",
     "industry"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "KOR-2",
    "name": "ده‌گو",
    "pos": [
     128.6,
     35.87
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 97165,
  "front": {
   "PRK": {
    "r": [
     0.71,
     1.09,
     1.47,
     1.78,
     2.08,
     2.4,
     2.73,
     3.05,
     3.35,
     5.1899999999999995
    ],
    "cap": 0.14
   }
  }
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
  "cities": [
   {
    "id": "PRK-0",
    "name": "پیونگ‌یانگ",
    "pos": [
     125.75,
     39.03
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "PRK-1",
    "name": "ونسان",
    "pos": [
     127.44,
     39.15
    ],
    "capital": false,
    "tags": [
     "port",
     "missile"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "PRK-2",
    "name": "سینپو",
    "pos": [
     128.18,
     40.03
    ],
    "capital": false,
    "tags": [
     "port"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 122496,
  "front": {
   "CHN": {
    "r": [
     0.64,
     0.93,
     1.14,
     1.47,
     1.87,
     2.27,
     2.61,
     2.91,
     3.3,
     4.22
    ],
    "cap": 0.83
   },
   "KOR": {
    "r": [
     0.8,
     1.27,
     1.64,
     1.9,
     2.23,
     2.52,
     2.78,
     3.04,
     3.62,
     5.04
    ],
    "cap": 0.28
   },
   "RUS": {
    "r": [
     1.38,
     2.09,
     2.76,
     3.25,
     3.81,
     4.21,
     4.52,
     4.84,
     5.25,
     6.2
    ],
    "cap": 0.85
   }
  }
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
  "cities": [
   {
    "id": "TWN-0",
    "name": "تایپه",
    "pos": [
     121.56,
     25.03
    ],
    "capital": true,
    "tags": [],
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "TWN-1",
    "name": "کائوسیونگ",
    "pos": [
     120.3,
     22.63
    ],
    "capital": false,
    "tags": [
     "port",
     "industry"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "TWN-2",
    "name": "تایچونگ",
    "pos": [
     120.68,
     24.15
    ],
    "capital": false,
    "tags": [
     "air"
    ],
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "CHN",
   "JPN",
   "PHL"
  ],
  "area": 36005
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
  "cities": [
   {
    "id": "MNG-0",
    "name": "پایتخت مغولستان",
    "pos": [
     103.12,
     46.96
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "MNG-1",
    "name": "شرق مغولستان",
    "pos": [
     107.07,
     44.31
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 1560428,
  "front": {
   "CHN": {
    "r": [
     3.25,
     4.48,
     5.48,
     6.34,
     7.19,
     8.14,
     9.41,
     10.81,
     12.74,
     16.45
    ],
    "cap": 0.41
   },
   "RUS": {
    "r": [
     3.19,
     4.39,
     5.31,
     6.13,
     6.92,
     7.85,
     8.85,
     10,
     11.15,
     15.01
    ],
    "cap": 0.33
   }
  }
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
  "cities": [
   {
    "id": "VNM-0",
    "name": "پایتخت ویتنام",
    "pos": [
     106.35,
     16.55
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "VNM-1",
    "name": "شمال ویتنام",
    "pos": [
     105.7,
     20.62
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 328959,
  "front": {
   "CHN": {
    "r": [
     1.62,
     2.3,
     2.79,
     4.07,
     7.44,
     9.58,
     11.1,
     12.05,
     12.84,
     14.709999999999999
    ],
    "cap": 0.48
   },
   "KHM": {
    "r": [
     1.46,
     2.1,
     2.76,
     3.54,
     4.83,
     7.68,
     9.24,
     9.96,
     10.65,
     11.64
    ],
    "cap": 0.5
   },
   "LAO": {
    "r": [
     1.78,
     2.41,
     2.96,
     3.49,
     4.71,
     6.61,
     7.88,
     8.58,
     9.13,
     10.73
    ],
    "cap": 0.42
   }
  }
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
  "cities": [
   {
    "id": "THA-0",
    "name": "پایتخت تایلند",
    "pos": [
     101,
     15.1
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "THA-1",
    "name": "شمال تایلند",
    "pos": [
     101.96,
     16.76
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "THA-2",
    "name": "غرب تایلند",
    "pos": [
     99.48,
     16.18
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 515720,
  "front": {
   "KHM": {
    "r": [
     1.45,
     2.01,
     2.54,
     3.04,
     3.51,
     4.01,
     4.92,
     5.93,
     6.72,
     8.6
    ],
    "cap": 0.21
   },
   "LAO": {
    "r": [
     1.51,
     2.14,
     2.65,
     3.08,
     3.47,
     3.82,
     4.3,
     5.04,
     9.59,
     12.23
    ],
    "cap": 0.42
   },
   "MMR": {
    "r": [
     1.51,
     2.14,
     2.67,
     3.19,
     3.75,
     4.42,
     5.01,
     5.86,
     8.02,
     11.48
    ],
    "cap": 0.37
   },
   "MYS": {
    "r": [
     3.74,
     7.64,
     8.83,
     9.55,
     10.14,
     10.77,
     11.4,
     12.09,
     12.98,
     14.67
    ],
    "cap": 0.37
   }
  }
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
  "cities": [
   {
    "id": "MYS-0",
    "name": "پایتخت مالزی",
    "pos": [
     114.72,
     3.62
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "MYS-1",
    "name": "جنوب مالزی",
    "pos": [
     114.71,
     2.56
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  ],
  "area": 327621,
  "front": {
   "BRN": {
    "r": [
     1.28,
     1.99,
     2.6,
     3.1,
     3.71,
     11.03,
     11.92,
     12.57,
     13.32,
     15.14
    ],
    "cap": 0.05
   },
   "IDN": {
    "r": [
     1.43,
     2.08,
     2.91,
     3.72,
     4.55,
     10.6,
     11.94,
     12.72,
     13.48,
     15.62
    ],
    "cap": 0.15
   },
   "THA": {
    "r": [
     1.27,
     2.18,
     3.18,
     5.21,
     11.82,
     13.04,
     13.9,
     15.01,
     16.19,
     18.200000000000003
    ],
    "cap": 0.69
   }
  }
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
  "cities": [
   {
    "id": "SGP-0",
    "name": "پایتخت سنگاپور",
    "pos": [
     103.82,
     1.36
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "IDN",
   "MYS"
  ],
  "area": 484
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
  "cities": [
   {
    "id": "IDN-0",
    "name": "پایتخت اندونزی",
    "pos": [
     114.01,
     -0.19
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "IDN-1",
    "name": "شرق اندونزی",
    "pos": [
     119.58,
     -4.65
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "IDN-2",
    "name": "شمال اندونزی",
    "pos": [
     114.42,
     1.03
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 1872242,
  "front": {
   "MYS": {
    "r": [
     2.77,
     4.39,
     6.42,
     9.92,
     11.49,
     12.99,
     15.09,
     18.97,
     24.52,
     28.14
    ],
    "cap": 0.06
   },
   "PNG": {
    "r": [
     3.6,
     9.17,
     19.46,
     24.65,
     26.51,
     28.66,
     31.43,
     36.9,
     40.23,
     46.98
    ],
    "cap": 0.55
   },
   "TLS": {
    "r": [
     8.2,
     10.82,
     12.5,
     13.64,
     14.55,
     15.46,
     17.04,
     21.81,
     25.62,
     33.08
    ],
    "cap": 0.46
   }
  }
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
  "cities": [
   {
    "id": "PHL-0",
    "name": "پایتخت فیلیپین",
    "pos": [
     121.42,
     15.95
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "CHN",
   "IDN",
   "TWN"
  ],
  "area": 290318
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
  "cities": [
   {
    "id": "MMR-0",
    "name": "پایتخت میانمار",
    "pos": [
     96.49,
     21.15
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "MMR-1",
    "name": "جنوب میانمار",
    "pos": [
     97.68,
     18.6
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "MMR-2",
    "name": "شمال میانمار",
    "pos": [
     95.42,
     23.52
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 662746,
  "front": {
   "BGD": {
    "r": [
     2.21,
     3.12,
     3.89,
     4.49,
     4.99,
     5.43,
     5.9,
     6.51,
     7.65,
     12.709999999999999
    ],
    "cap": 0.3
   },
   "CHN": {
    "r": [
     1.57,
     2.21,
     2.71,
     3.19,
     3.75,
     4.3,
     5.2,
     6.23,
     7.78,
     14
    ],
    "cap": 0.4
   },
   "IND": {
    "r": [
     1.75,
     2.51,
     3.22,
     3.83,
     4.5,
     5.22,
     6.05,
     7.04,
     8.75,
     15.379999999999999
    ],
    "cap": 0.47
   },
   "LAO": {
    "r": [
     2.5,
     3.6,
     4.36,
     4.9,
     5.36,
     5.77,
     6.16,
     6.58,
     7.09,
     10.94
    ],
    "cap": 0.22
   },
   "THA": {
    "r": [
     2.45,
     3.3,
     3.95,
     4.64,
     5.31,
     6.06,
     6.82,
     7.77,
     9.15,
     11.629999999999999
    ],
    "cap": 0.4
   }
  }
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
  "cities": [
   {
    "id": "KHM-0",
    "name": "پایتخت کامبوج",
    "pos": [
     104.91,
     12.72
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "KHM-1",
    "name": "غرب کامبوج",
    "pos": [
     103.71,
     13.57
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "KHM-2",
    "name": "شمال کامبوج",
    "pos": [
     105.77,
     13.76
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 181373,
  "front": {
   "LAO": {
    "r": [
     1.05,
     1.52,
     1.9,
     2.22,
     2.56,
     2.93,
     3.27,
     3.58,
     3.95,
     4.77
    ],
    "cap": 0.4
   },
   "THA": {
    "r": [
     1.06,
     1.6,
     2.05,
     2.45,
     2.81,
     3.14,
     3.44,
     3.72,
     4.05,
     4.8
    ],
    "cap": 0.39
   },
   "VNM": {
    "r": [
     0.83,
     1.23,
     1.53,
     1.78,
     2.03,
     2.26,
     2.5,
     2.76,
     3.14,
     3.95
    ],
    "cap": 0.27
   }
  }
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
  "cities": [
   {
    "id": "LAO-0",
    "name": "پایتخت لائوس",
    "pos": [
     103.78,
     18.49
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "LAO-1",
    "name": "جنوب لائوس",
    "pos": [
     105.32,
     16.07
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 228928,
  "front": {
   "CHN": {
    "r": [
     0.94,
     1.57,
     2.1,
     2.59,
     3.1,
     3.68,
     5.4,
     6.66,
     7.75,
     8.74
    ],
    "cap": 0.59
   },
   "KHM": {
    "r": [
     1.03,
     1.89,
     3.06,
     4.84,
     5.67,
     6.1,
     6.56,
     7.21,
     7.89,
     9.11
    ],
    "cap": 0.39
   },
   "MMR": {
    "r": [
     1.25,
     1.85,
     2.32,
     2.85,
     3.31,
     4.01,
     5.76,
     7,
     8.01,
     9.07
    ],
    "cap": 0.59
   },
   "THA": {
    "r": [
     1.23,
     1.67,
     2.09,
     2.45,
     2.76,
     3.04,
     3.42,
     3.93,
     4.56,
     5.6499999999999995
    ],
    "cap": 0.11
   },
   "VNM": {
    "r": [
     0.87,
     1.24,
     1.61,
     2.01,
     2.39,
     2.75,
     3.14,
     3.71,
     4.79,
     5.75
    ],
    "cap": 0.09
   }
  }
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
  "cities": [
   {
    "id": "BRN-0",
    "name": "پایتخت برونئی",
    "pos": [
     114.59,
     4.49
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 5669,
  "front": {
   "MYS": {
    "r": [
     0.16,
     0.23,
     0.3,
     0.34,
     0.37,
     0.4,
     0.43,
     0.46,
     0.51,
     0.67
    ],
    "cap": 0.14
   }
  }
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
  "cities": [
   {
    "id": "TLS-0",
    "name": "پایتخت تیمور شرقی",
    "pos": [
     125.92,
     -8.81
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 15018,
  "front": {
   "IDN": {
    "r": [
     0.23,
     0.34,
     0.49,
     0.66,
     0.82,
     0.96,
     1.13,
     1.38,
     1.74,
     2.21
    ],
    "cap": 0.5
   }
  }
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
  "cities": [
   {
    "id": "AUS-0",
    "name": "پایتخت استرالیا",
    "pos": [
     123.58,
     -12.43
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "IDN",
   "NZL",
   "PNG"
  ],
  "area": 7706615
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
  "cities": [
   {
    "id": "NZL-0",
    "name": "پایتخت نیوزیلند",
    "pos": [
     170.61,
     -43.95
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [
   "AUS"
  ],
  "area": 267088
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
  "cities": [
   {
    "id": "PNG-0",
    "name": "پایتخت پاپوا گینهٔ نو",
    "pos": [
     144.23,
     -6.6
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "PNG-1",
    "name": "غرب پاپوا گینهٔ نو",
    "pos": [
     142.28,
     -6.28
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  ],
  "area": 464271,
  "front": {
   "IDN": {
    "r": [
     1.56,
     2.19,
     2.69,
     3.12,
     3.62,
     4.56,
     5.9,
     7.5,
     9.58,
     14.77
    ],
    "cap": 0.44
   }
  }
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
  "cities": [
   {
    "id": "FJI-0",
    "name": "پایتخت فیجی",
    "pos": [
     177.97,
     -17.82
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 18398
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
  "cities": [
   {
    "id": "SLB-0",
    "name": "پایتخت جزایر سلیمان",
    "pos": [
     160.17,
     -9.62
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 25732
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
  "cities": [
   {
    "id": "VUT-0",
    "name": "پایتخت وانواتو",
    "pos": [
     166.85,
     -15.23
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 11266
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
  "cities": [
   {
    "id": "WSM-0",
    "name": "پایتخت ساموآ",
    "pos": [
     -172.44,
     -13.63
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 2705
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
  "cities": [
   {
    "id": "TON-0",
    "name": "پایتخت تونگا",
    "pos": [
     -175.22,
     -21.17
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 431
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
  "cities": [
   {
    "id": "FSM-0",
    "name": "پایتخت میکرونزی",
    "pos": [
     158.23,
     6.89
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 524
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
  "cities": [
   {
    "id": "MHL-0",
    "name": "پایتخت جزایر مارشال",
    "pos": [
     171.19,
     7.11
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 236
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
  "cities": [
   {
    "id": "PLW-0",
    "name": "پایتخت پالائو",
    "pos": [
     134.58,
     7.51
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 343
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
  "cities": [
   {
    "id": "KIR-0",
    "name": "پایتخت کیریباتی",
    "pos": [
     -157.37,
     1.85
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 941
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
  "cities": [
   {
    "id": "NRU-0",
    "name": "پایتخت نائورو",
    "pos": [
     166.93,
     -0.52
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 28
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
  "cities": [
   {
    "id": "NGA-0",
    "name": "پایتخت نیجریه",
    "pos": [
     8.08,
     9.59
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "NGA-1",
    "name": "شرق نیجریه",
    "pos": [
     11.59,
     11.79
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "NGA-2",
    "name": "غرب نیجریه",
    "pos": [
     5.12,
     9.51
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 911496,
  "front": {
   "BEN": {
    "r": [
     2.18,
     3.09,
     3.94,
     4.67,
     5.38,
     6.11,
     6.89,
     8,
     9.12,
     11.52
    ],
    "cap": 0.43
   },
   "CMR": {
    "r": [
     2.38,
     3.42,
     4.14,
     4.75,
     5.27,
     5.81,
     6.43,
     7.23,
     8.19,
     9.59
    ],
    "cap": 0.33
   },
   "NER": {
    "r": [
     1.96,
     2.9,
     3.64,
     4.39,
     5.03,
     5.6,
     6.14,
     6.63,
     7.12,
     8.68
    ],
    "cap": 0.3
   },
   "TCD": {
    "r": [
     2.85,
     4.38,
     5.59,
     6.56,
     7.47,
     8.32,
     9.12,
     9.9,
     10.81,
     12.94
    ],
    "cap": 0.43
   }
  }
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
  "cities": [
   {
    "id": "ZAF-0",
    "name": "پایتخت افریقای جنوبی",
    "pos": [
     25.19,
     -28.97
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "ZAF-1",
    "name": "شمال افریقای جنوبی",
    "pos": [
     28.35,
     -24.99
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "ZAF-2",
    "name": "شرق افریقای جنوبی",
    "pos": [
     29.19,
     -26.01
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 1221609,
  "front": {
   "BWA": {
    "r": [
     2.38,
     3.41,
     4.09,
     4.8,
     5.49,
     6.05,
     6.57,
     7.06,
     7.69,
     9.75
    ],
    "cap": 0.19
   },
   "LSO": {
    "r": [
     1.99,
     2.65,
     3.24,
     3.81,
     4.36,
     4.98,
     5.63,
     6.4,
     7.37,
     9.52
    ],
    "cap": 0.1
   },
   "MOZ": {
    "r": [
     2.83,
     4.18,
     5.55,
     7.22,
     8.38,
     9.51,
     10.61,
     11.78,
     13.28,
     15.41
    ],
    "cap": 0.44
   },
   "NAM": {
    "r": [
     3.03,
     4.25,
     5.3,
     6.17,
     7.18,
     8.25,
     9.42,
     10.56,
     11.75,
     13.7
    ],
    "cap": 0.44
   },
   "SWZ": {
    "r": [
     2,
     3.04,
     3.99,
     4.9,
     6.1,
     7.19,
     8.35,
     9.48,
     10.98,
     12.92
    ],
    "cap": 0.44
   },
   "ZWE": {
    "r": [
     3.04,
     5,
     6.32,
     7.64,
     8.9,
     9.95,
     10.94,
     12.18,
     13.44,
     15.78
    ],
    "cap": 0.44
   }
  }
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
  "cities": [
   {
    "id": "ETH-0",
    "name": "پایتخت اتیوپی",
    "pos": [
     39.61,
     8.61
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "ETH-1",
    "name": "شرق اتیوپی",
    "pos": [
     44.23,
     8.24
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "ETH-2",
    "name": "غرب اتیوپی",
    "pos": [
     35.95,
     8.07
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 1131761,
  "front": {
   "DJI": {
    "r": [
     2.05,
     3.03,
     3.75,
     4.41,
     4.96,
     5.48,
     5.98,
     6.49,
     7.33,
     9.11
    ],
    "cap": 0.23
   },
   "ERI": {
    "r": [
     2.61,
     3.94,
     5.14,
     6.16,
     7.11,
     7.94,
     8.67,
     9.42,
     10.18,
     11.22
    ],
    "cap": 0.39
   },
   "KEN": {
    "r": [
     2.56,
     3.73,
     4.67,
     5.45,
     6.17,
     6.87,
     7.53,
     8.26,
     9.23,
     10.85
    ],
    "cap": 0.35
   },
   "SDN": {
    "r": [
     2.46,
     3.49,
     4.33,
     5.14,
     5.89,
     6.69,
     7.63,
     8.74,
     10.17,
     13.03
    ],
    "cap": 0.44
   },
   "SOM": {
    "r": [
     3.72,
     5.39,
     6.64,
     7.6,
     8.49,
     9.3,
     10.11,
     10.92,
     11.8,
     14.06
    ],
    "cap": 0.4
   },
   "SSD": {
    "r": [
     2.92,
     4.15,
     5.16,
     6.03,
     6.81,
     7.55,
     8.32,
     9.14,
     10.42,
     14.07
    ],
    "cap": 0.41
   }
  }
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
  "cities": [
   {
    "id": "KEN-0",
    "name": "پایتخت کنیا",
    "pos": [
     37.8,
     0.6
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "KEN-1",
    "name": "شمال کنیا",
    "pos": [
     35.9,
     3.17
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "KEN-2",
    "name": "جنوب کنیا",
    "pos": [
     37.73,
     -1.67
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 594848,
  "front": {
   "ETH": {
    "r": [
     1.69,
     2.37,
     2.86,
     3.27,
     3.83,
     4.52,
     5.13,
     5.75,
     6.49,
     8.61
    ],
    "cap": 0.4
   },
   "SOM": {
    "r": [
     1.75,
     2.43,
     3.02,
     3.63,
     4.21,
     4.73,
     5.22,
     5.68,
     6.24,
     7.42
    ],
    "cap": 0.34
   },
   "SSD": {
    "r": [
     2.33,
     3.67,
     4.54,
     5.23,
     5.79,
     6.31,
     6.88,
     7.65,
     8.67,
     10.59
    ],
    "cap": 0.41
   },
   "TZA": {
    "r": [
     1.66,
     2.39,
     3.11,
     3.73,
     4.29,
     4.87,
     5.56,
     6.31,
     7.13,
     8.94
    ],
    "cap": 0.41
   },
   "UGA": {
    "r": [
     1.55,
     2.19,
     2.68,
     3.15,
     3.71,
     4.38,
     5.04,
     5.64,
     6.26,
     7.7
    ],
    "cap": 0.38
   }
  }
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
  "cities": [
   {
    "id": "TZA-0",
    "name": "پایتخت تانزانیا",
    "pos": [
     34.79,
     -6.27
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "TZA-1",
    "name": "شمال تانزانیا",
    "pos": [
     32.91,
     -3.11
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "TZA-2",
    "name": "جنوب تانزانیا",
    "pos": [
     36.34,
     -9.53
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 945781,
  "front": {
   "BDI": {
    "r": [
     1.98,
     2.92,
     3.82,
     4.65,
     5.47,
     6.33,
     7.28,
     8.31,
     9.43,
     11.89
    ],
    "cap": 0.44
   },
   "COD": {
    "r": [
     2.49,
     3.63,
     4.53,
     5.27,
     6.03,
     6.77,
     7.51,
     8.27,
     9.15,
     11.5
    ],
    "cap": 0.4
   },
   "KEN": {
    "r": [
     2.33,
     3.33,
     4.15,
     4.85,
     5.49,
     6.07,
     6.62,
     7.14,
     7.75,
     8.7
    ],
    "cap": 0.31
   },
   "MOZ": {
    "r": [
     2.37,
     3.53,
     4.73,
     5.75,
     6.63,
     7.41,
     8.25,
     9.15,
     10.11,
     12.49
    ],
    "cap": 0.43
   },
   "MWI": {
    "r": [
     1.99,
     2.87,
     3.62,
     4.24,
     4.82,
     5.44,
     6.15,
     6.85,
     7.65,
     9.7
    ],
    "cap": 0.33
   },
   "RWA": {
    "r": [
     2.46,
     3.56,
     4.49,
     5.38,
     6.25,
     7.08,
     8.03,
     9.12,
     10.32,
     12.68
    ],
    "cap": 0.45
   },
   "UGA": {
    "r": [
     2.67,
     3.89,
     4.84,
     5.69,
     6.54,
     7.36,
     8.2,
     9.3,
     10.64,
     12.799999999999999
    ],
    "cap": 0.45
   },
   "ZMB": {
    "r": [
     2.3,
     3.28,
     4.01,
     4.63,
     5.23,
     5.82,
     6.38,
     6.92,
     7.46,
     8.84
    ],
    "cap": 0.29
   }
  }
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
  "cities": [
   {
    "id": "UGA-0",
    "name": "پایتخت اوگاندا",
    "pos": [
     32.37,
     1.27
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "UGA-1",
    "name": "جنوب اوگاندا",
    "pos": [
     31.01,
     -0.31
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "UGA-2",
    "name": "شرق اوگاندا",
    "pos": [
     33.94,
     1.54
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 242568,
  "front": {
   "COD": {
    "r": [
     0.96,
     1.36,
     1.67,
     1.96,
     2.24,
     2.5,
     2.76,
     3.01,
     3.29,
     3.9499999999999997
    ],
    "cap": 0.2
   },
   "KEN": {
    "r": [
     1.27,
     1.84,
     2.27,
     2.62,
     2.96,
     3.31,
     3.7,
     4.12,
     4.74,
     6.16
    ],
    "cap": 0.41
   },
   "RWA": {
    "r": [
     1.49,
     2.2,
     2.78,
     3.32,
     3.8,
     4.25,
     4.69,
     5.13,
     5.63,
     6.779999999999999
    ],
    "cap": 0.43
   },
   "SSD": {
    "r": [
     0.99,
     1.48,
     1.91,
     2.33,
     2.73,
     3.09,
     3.45,
     3.89,
     4.33,
     5.45
    ],
    "cap": 0.38
   },
   "TZA": {
    "r": [
     1.11,
     1.57,
     1.9,
     2.21,
     2.63,
     3.17,
     3.68,
     4.1,
     4.54,
     5.6899999999999995
    ],
    "cap": 0.44
   }
  }
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
  "cities": [
   {
    "id": "DZA-0",
    "name": "پایتخت الجزایر",
    "pos": [
     2.63,
     28.06
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "DZA-1",
    "name": "غرب الجزایر",
    "pos": [
     -3.03,
     26.93
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "DZA-2",
    "name": "جنوب الجزایر",
    "pos": [
     5.25,
     23.51
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 2322788,
  "front": {
   "LBY": {
    "r": [
     3.26,
     4.68,
     5.95,
     7.11,
     8.12,
     9.03,
     9.97,
     10.98,
     12.3,
     16.28
    ],
    "cap": 0.34
   },
   "MAR": {
    "r": [
     3.4,
     4.61,
     5.64,
     6.72,
     7.83,
     8.89,
     9.93,
     11.05,
     12.62,
     15.78
    ],
    "cap": 0.37
   },
   "MLI": {
    "r": [
     3.62,
     5.35,
     6.72,
     7.88,
     8.93,
     9.99,
     11.09,
     12.26,
     14.22,
     17.560000000000002
    ],
    "cap": 0.4
   },
   "MRT": {
    "r": [
     3.67,
     5.92,
     7.65,
     9.04,
     10.19,
     11.22,
     12.18,
     13.16,
     14.21,
     16.98
    ],
    "cap": 0.36
   },
   "NER": {
    "r": [
     3.5,
     5.15,
     6.83,
     8.34,
     9.74,
     11.09,
     12.36,
     13.59,
     14.87,
     16.770000000000003
    ],
    "cap": 0.41
   },
   "TUN": {
    "r": [
     3.43,
     5.19,
     6.6,
     7.95,
     9.35,
     10.54,
     11.62,
     12.7,
     13.83,
     15.89
    ],
    "cap": 0.39
   }
  }
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
  "cities": [
   {
    "id": "MAR-0",
    "name": "پایتخت مراکش",
    "pos": [
     -8.73,
     29.77
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "MAR-1",
    "name": "جنوب مراکش",
    "pos": [
     -10.4,
     26.6
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "MAR-2",
    "name": "شرق مراکش",
    "pos": [
     -5.78,
     30.61
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 673197,
  "front": {
   "DZA": {
    "r": [
     1.87,
     2.6,
     3.28,
     3.87,
     4.75,
     6.67,
     8.59,
     10.65,
     12.55,
     15.4
    ],
    "cap": 0.48
   },
   "MRT": {
    "r": [
     2.1,
     2.9,
     3.63,
     4.58,
     7.2,
     8.88,
     10.17,
     11.48,
     12.76,
     14.4
    ],
    "cap": 0.49
   }
  }
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
  "cities": [
   {
    "id": "TUN-0",
    "name": "پایتخت تونس",
    "pos": [
     9.55,
     34.09
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "TUN-1",
    "name": "جنوب تونس",
    "pos": [
     10.1,
     32.68
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "TUN-2",
    "name": "غرب تونس",
    "pos": [
     8.59,
     34.32
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 156653,
  "front": {
   "DZA": {
    "r": [
     0.89,
     1.27,
     1.58,
     1.85,
     2.1,
     2.36,
     2.6,
     2.9,
     3.26,
     4.42
    ],
    "cap": 0.23
   },
   "LBY": {
    "r": [
     0.85,
     1.2,
     1.6,
     2.1,
     2.69,
     3.14,
     3.57,
     4.14,
     4.81,
     5.58
    ],
    "cap": 0.46
   }
  }
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
  "cities": [
   {
    "id": "LBY-0",
    "name": "پایتخت لیبی",
    "pos": [
     18.07,
     27.02
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "LBY-1",
    "name": "جنوب لیبی",
    "pos": [
     22.21,
     22.81
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  ],
  "area": 1626369,
  "front": {
   "DZA": {
    "r": [
     3.2,
     4.57,
     5.74,
     6.89,
     8.2,
     9.72,
     11,
     12.07,
     13.1,
     15.23
    ],
    "cap": 0.45
   },
   "EGY": {
    "r": [
     2.91,
     4.1,
     5.11,
     6.07,
     7.03,
     7.94,
     9.3,
     10.64,
     11.95,
     13.92
    ],
    "cap": 0.41
   },
   "NER": {
    "r": [
     3.23,
     4.46,
     5.49,
     6.39,
     7.2,
     7.97,
     8.65,
     9.47,
     10.37,
     13.19
    ],
    "cap": 0.31
   },
   "SDN": {
    "r": [
     4.26,
     6.27,
     7.84,
     9.17,
     10.29,
     11.27,
     12.25,
     13.49,
     15.07,
     17.65
    ],
    "cap": 0.42
   },
   "TCD": {
    "r": [
     2.88,
     4.06,
     4.93,
     5.76,
     6.68,
     7.56,
     8.44,
     9.35,
     10.46,
     13.01
    ],
    "cap": 0.34
   },
   "TUN": {
    "r": [
     3.26,
     5.05,
     6.48,
     7.8,
     8.94,
     9.96,
     11.1,
     12.26,
     13.82,
     17.28
    ],
    "cap": 0.43
   }
  }
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
  "cities": [
   {
    "id": "SDN-0",
    "name": "پایتخت سودان",
    "pos": [
     29.91,
     15.97
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "SDN-1",
    "name": "جنوب سودان",
    "pos": [
     26.12,
     11.94
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "SDN-2",
    "name": "غرب سودان",
    "pos": [
     25.37,
     14.81
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  ],
  "area": 1863027,
  "front": {
   "CAF": {
    "r": [
     4.12,
     5.86,
     7.43,
     8.77,
     10.06,
     11.07,
     12.12,
     13.18,
     14.72,
     17.91
    ],
    "cap": 0.42
   },
   "EGY": {
    "r": [
     3.24,
     4.5,
     5.48,
     6.42,
     7.37,
     8.35,
     9.54,
     10.7,
     11.91,
     15.379999999999999
    ],
    "cap": 0.4
   },
   "ERI": {
    "r": [
     3.27,
     4.63,
     5.81,
     6.99,
     8.18,
     9.35,
     10.52,
     11.6,
     12.81,
     15.86
    ],
    "cap": 0.43
   },
   "ETH": {
    "r": [
     3.51,
     5.03,
     6.21,
     7.18,
     8.07,
     8.95,
     9.78,
     10.61,
     11.56,
     13.93
    ],
    "cap": 0.34
   },
   "LBY": {
    "r": [
     2.97,
     4.64,
     5.85,
     6.84,
     7.76,
     8.63,
     9.43,
     10.27,
     11.14,
     13.459999999999999
    ],
    "cap": 0.33
   },
   "SSD": {
    "r": [
     3.14,
     4.47,
     5.58,
     6.62,
     7.49,
     8.28,
     9.07,
     9.89,
     10.92,
     13.1
    ],
    "cap": 0.33
   },
   "TCD": {
    "r": [
     3.42,
     4.92,
     6.14,
     7.33,
     8.33,
     9.42,
     10.66,
     11.94,
     13.22,
     16
    ],
    "cap": 0.42
   }
  }
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
  "cities": [
   {
    "id": "SSD-0",
    "name": "پایتخت سودان جنوبی",
    "pos": [
     30.25,
     7.31
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "SSD-1",
    "name": "شرق سودان جنوبی",
    "pos": [
     32.88,
     5.85
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "SSD-2",
    "name": "جنوب سودان جنوبی",
    "pos": [
     31.38,
     5.04
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 623998,
  "front": {
   "CAF": {
    "r": [
     1.75,
     2.46,
     3.09,
     3.9,
     4.76,
     5.52,
     6.29,
     7.01,
     7.75,
     9.049999999999999
    ],
    "cap": 0.43
   },
   "COD": {
    "r": [
     1.75,
     2.54,
     3.16,
     3.71,
     4.2,
     4.64,
     5.05,
     5.52,
     6.26,
     8.72
    ],
    "cap": 0.29
   },
   "ETH": {
    "r": [
     1.56,
     2.2,
     2.72,
     3.22,
     3.76,
     4.32,
     5.03,
     5.98,
     7.12,
     9.24
    ],
    "cap": 0.41
   },
   "KEN": {
    "r": [
     1.99,
     3.07,
     3.99,
     4.7,
     5.37,
     5.97,
     6.64,
     7.45,
     8.86,
     11.03
    ],
    "cap": 0.44
   },
   "SDN": {
    "r": [
     1.68,
     2.5,
     3.39,
     4.09,
     4.66,
     5.16,
     5.59,
     5.99,
     6.41,
     7.7299999999999995
    ],
    "cap": 0.3
   },
   "UGA": {
    "r": [
     1.94,
     2.84,
     3.53,
     4.14,
     4.85,
     5.5,
     6.09,
     6.69,
     7.7,
     9.629999999999999
    ],
    "cap": 0.41
   }
  }
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
  "cities": [
   {
    "id": "SOM-0",
    "name": "پایتخت سومالی",
    "pos": [
     45.68,
     4.74
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "SOM-1",
    "name": "شمال سومالی",
    "pos": [
     43.92,
     9.38
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "SOM-2",
    "name": "غرب سومالی",
    "pos": [
     42.85,
     2.72
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 642106,
  "front": {
   "DJI": {
    "r": [
     3.21,
     4.91,
     6.11,
     6.72,
     7.17,
     7.58,
     8.15,
     8.94,
     10.11,
     12.91
    ],
    "cap": 0.48
   },
   "ETH": {
    "r": [
     1.5,
     2.1,
     2.56,
     3.07,
     3.68,
     4.51,
     5.46,
     6.86,
     8.32,
     11.1
    ],
    "cap": 0.49
   },
   "KEN": {
    "r": [
     1.81,
     2.74,
     4.15,
     5.91,
     7.95,
     9.03,
     9.73,
     10.61,
     11.87,
     14.48
    ],
    "cap": 0.39
   }
  }
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
  "cities": [
   {
    "id": "DJI-0",
    "name": "پایتخت جیبوتی",
    "pos": [
     42.56,
     11.75
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  ],
  "area": 21693,
  "front": {
   "ERI": {
    "r": [
     0.28,
     0.4,
     0.5,
     0.61,
     0.77,
     0.94,
     1.07,
     1.19,
     1.31,
     1.65
    ],
    "cap": 0.43
   },
   "ETH": {
    "r": [
     0.43,
     0.64,
     0.79,
     0.94,
     1.07,
     1.22,
     1.38,
     1.57,
     1.79,
     2.11
    ],
    "cap": 0.48
   },
   "SOM": {
    "r": [
     0.41,
     0.6,
     0.72,
     0.82,
     0.91,
     1,
     1.07,
     1.15,
     1.24,
     1.3800000000000001
    ],
    "cap": 0.28
   }
  }
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
  "cities": [
   {
    "id": "ERI-0",
    "name": "پایتخت اریتره",
    "pos": [
     38.85,
     15.36
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "ERI-1",
    "name": "شمال اریتره",
    "pos": [
     38.01,
     16.41
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  ],
  "area": 123678,
  "front": {
   "DJI": {
    "r": [
     1.76,
     3.41,
     4.4,
     5,
     5.45,
     5.79,
     6.07,
     6.33,
     6.59,
     7.17
    ],
    "cap": 0.36
   },
   "ETH": {
    "r": [
     0.73,
     1.08,
     1.39,
     1.65,
     1.9,
     2.13,
     2.35,
     2.6,
     2.97,
     4.37
    ],
    "cap": 0.11
   },
   "SDN": {
    "r": [
     0.78,
     1.15,
     1.43,
     1.76,
     2.09,
     2.41,
     2.76,
     3.54,
     5.2,
     6.98
    ],
    "cap": 0.53
   }
  }
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
  "cities": [
   {
    "id": "AGO-0",
    "name": "پایتخت آنگولا",
    "pos": [
     17.56,
     -12.31
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "AGO-1",
    "name": "شمال آنگولا",
    "pos": [
     14.52,
     -7.68
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "AGO-2",
    "name": "شرق آنگولا",
    "pos": [
     21.03,
     -12.72
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 1249380,
  "front": {
   "COD": {
    "r": [
     2.72,
     3.86,
     4.77,
     5.52,
     6.18,
     6.98,
     8.03,
     9.09,
     10.09,
     12.34
    ],
    "cap": 0.38
   },
   "COG": {
    "r": [
     4.61,
     6.76,
     8.12,
     9.1,
     9.93,
     10.79,
     11.65,
     12.45,
     13.38,
     16.790000000000003
    ],
    "cap": 0.41
   },
   "NAM": {
    "r": [
     2.45,
     3.47,
     4.27,
     4.98,
     5.78,
     6.82,
     7.81,
     8.72,
     9.97,
     13.62
    ],
    "cap": 0.41
   },
   "ZMB": {
    "r": [
     2.98,
     4.15,
     4.97,
     5.72,
     6.52,
     7.44,
     8.41,
     9.3,
     10.24,
     13.709999999999999
    ],
    "cap": 0.39
   }
  }
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
  "cities": [
   {
    "id": "COD-0",
    "name": "پایتخت کنگو (دموکراتیک)",
    "pos": [
     23.64,
     -2.87
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "COD-1",
    "name": "جنوب کنگو (دموکراتیک)",
    "pos": [
     26.98,
     -9.19
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "COD-2",
    "name": "شمال کنگو (دموکراتیک)",
    "pos": [
     26.95,
     1.49
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 2334703,
  "front": {
   "AGO": {
    "r": [
     3.25,
     4.57,
     5.63,
     6.66,
     7.7,
     8.67,
     9.62,
     10.77,
     12.24,
     15.61
    ],
    "cap": 0.34
   },
   "BDI": {
    "r": [
     3.39,
     4.69,
     5.74,
     6.66,
     7.49,
     8.32,
     9.11,
     10.23,
     11.69,
     16.950000000000003
    ],
    "cap": 0.28
   },
   "CAF": {
    "r": [
     3.29,
     4.78,
     6.11,
     7.31,
     8.39,
     9.66,
     11,
     12.32,
     13.93,
     19.09
    ],
    "cap": 0.41
   },
   "COG": {
    "r": [
     3.89,
     6.13,
     7.8,
     9.03,
     10.09,
     11.14,
     12.22,
     13.28,
     14.39,
     17.580000000000002
    ],
    "cap": 0.37
   },
   "RWA": {
    "r": [
     3.34,
     4.61,
     5.62,
     6.52,
     7.47,
     8.37,
     9.28,
     10.21,
     11.5,
     17.130000000000003
    ],
    "cap": 0.29
   },
   "SSD": {
    "r": [
     3.82,
     6.01,
     7.77,
     9.16,
     10.34,
     11.54,
     12.72,
     14.02,
     15.48,
     19.62
    ],
    "cap": 0.4
   },
   "TZA": {
    "r": [
     3.56,
     5.09,
     6.18,
     7.2,
     8.24,
     9.38,
     10.45,
     11.49,
     12.74,
     17.040000000000003
    ],
    "cap": 0.35
   },
   "UGA": {
    "r": [
     4.38,
     6.35,
     7.86,
     9.18,
     10.28,
     11.36,
     12.38,
     13.42,
     14.69,
     20.290000000000003
    ],
    "cap": 0.38
   },
   "ZMB": {
    "r": [
     5.99,
     8.14,
     10.24,
     11.94,
     13.25,
     14.44,
     15.52,
     16.51,
     17.67,
     20.790000000000003
    ],
    "cap": 0.39
   }
  }
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
  "cities": [
   {
    "id": "COG-0",
    "name": "پایتخت کنگو",
    "pos": [
     15.22,
     -0.84
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "COG-1",
    "name": "شمال کنگو",
    "pos": [
     16.55,
     1.87
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 346857,
  "front": {
   "AGO": {
    "r": [
     1.34,
     2.12,
     2.99,
     4.03,
     5.02,
     5.85,
     6.47,
     7.06,
     8.27,
     10.08
    ],
    "cap": 0.45
   },
   "CAF": {
    "r": [
     1.62,
     2.86,
     3.57,
     4.18,
     4.83,
     5.89,
     7.2,
     7.96,
     8.67,
     10.18
    ],
    "cap": 0.52
   },
   "CMR": {
    "r": [
     1.28,
     1.81,
     2.22,
     2.63,
     3.09,
     3.85,
     4.96,
     5.63,
     6.26,
     7.66
    ],
    "cap": 0.45
   },
   "COD": {
    "r": [
     1.46,
     2.13,
     2.72,
     3.28,
     3.93,
     4.73,
     5.45,
     6.15,
     6.98,
     8.68
    ],
    "cap": 0.46
   },
   "GAB": {
    "r": [
     1.12,
     1.56,
     1.91,
     2.22,
     2.7,
     3.35,
     4.03,
     4.54,
     5.69,
     7.5
    ],
    "cap": 0.34
   }
  }
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
  "cities": [
   {
    "id": "CMR-0",
    "name": "پایتخت کامرون",
    "pos": [
     12.73,
     5.68
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "CMR-1",
    "name": "شمال کامرون",
    "pos": [
     14.17,
     8.26
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "CMR-2",
    "name": "جنوب کامرون",
    "pos": [
     14.26,
     3.46
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 465902,
  "front": {
   "CAF": {
    "r": [
     1.47,
     2.03,
     2.47,
     2.88,
     3.3,
     3.74,
     4.22,
     4.77,
     5.45,
     8.37
    ],
    "cap": 0.24
   },
   "COG": {
    "r": [
     1.93,
     3.1,
     3.95,
     4.58,
     5.11,
     5.57,
     6.08,
     6.64,
     7.45,
     11.09
    ],
    "cap": 0.38
   },
   "GAB": {
    "r": [
     1.52,
     2.15,
     2.63,
     3.1,
     3.58,
     4.13,
     4.73,
     5.72,
     7.06,
     10.92
    ],
    "cap": 0.46
   },
   "GNQ": {
    "r": [
     2.07,
     2.84,
     3.45,
     4,
     4.52,
     5.11,
     5.76,
     6.81,
     8.06,
     11.73
    ],
    "cap": 0.49
   },
   "NGA": {
    "r": [
     1.48,
     2.03,
     2.48,
     2.85,
     3.22,
     3.62,
     4.09,
     4.57,
     5.18,
     7.03
    ],
    "cap": 0.18
   },
   "TCD": {
    "r": [
     1.76,
     2.8,
     3.91,
     5.08,
     5.83,
     6.45,
     6.96,
     7.43,
     7.9,
     9.34
    ],
    "cap": 0.39
   }
  }
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
  "cities": [
   {
    "id": "GAB-0",
    "name": "پایتخت گابن",
    "pos": [
     11.79,
     -0.59
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 260715,
  "front": {
   "CMR": {
    "r": [
     1.29,
     2.01,
     2.49,
     2.96,
     3.35,
     3.72,
     4.1,
     4.48,
     4.96,
     6.29
    ],
    "cap": 0.4
   },
   "COG": {
    "r": [
     1.6,
     2.25,
     2.7,
     3.08,
     3.38,
     3.7,
     4.04,
     4.41,
     4.78,
     5.63
    ],
    "cap": 0.36
   },
   "GNQ": {
    "r": [
     1.28,
     1.76,
     2.13,
     2.45,
     2.78,
     3.1,
     3.44,
     3.77,
     4.23,
     5.22
    ],
    "cap": 0.34
   }
  }
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
  "cities": [
   {
    "id": "GNQ-0",
    "name": "پایتخت گینه استوایی",
    "pos": [
     10.47,
     1.57
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 26637,
  "front": {
   "CMR": {
    "r": [
     0.41,
     0.61,
     0.76,
     0.88,
     0.99,
     1.09,
     1.18,
     1.32,
     1.57,
     2.03
    ],
    "cap": 0.31
   },
   "GAB": {
    "r": [
     0.37,
     0.53,
     0.65,
     0.75,
     0.85,
     0.96,
     1.07,
     1.17,
     1.4,
     3.13
    ],
    "cap": 0.29
   }
  }
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
  "cities": [
   {
    "id": "CAF-0",
    "name": "پایتخت آفریقای مرکزی",
    "pos": [
     20.46,
     6.57
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "CAF-1",
    "name": "غرب آفریقای مرکزی",
    "pos": [
     17.01,
     5.43
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 620987,
  "front": {
   "CMR": {
    "r": [
     1.94,
     2.96,
     4.03,
     5.5,
     6.56,
     7.5,
     8.41,
     9.24,
     10.05,
     12.44
    ],
    "cap": 0.45
   },
   "COD": {
    "r": [
     1.82,
     2.64,
     3.28,
     3.79,
     4.2,
     4.7,
     5.24,
     5.87,
     6.72,
     8.23
    ],
    "cap": 0.26
   },
   "COG": {
    "r": [
     1.69,
     2.6,
     3.33,
     3.96,
     4.76,
     5.6,
     6.46,
     7.33,
     8.12,
     9.879999999999999
    ],
    "cap": 0.43
   },
   "SDN": {
    "r": [
     1.71,
     2.47,
     3.2,
     3.82,
     4.35,
     5.03,
     6.12,
     7.42,
     8.53,
     10.12
    ],
    "cap": 0.45
   },
   "SSD": {
    "r": [
     1.89,
     3.16,
     4.09,
     4.84,
     5.52,
     6.56,
     7.85,
     8.97,
     10.21,
     11.54
    ],
    "cap": 0.51
   },
   "TCD": {
    "r": [
     2.02,
     2.72,
     3.24,
     3.68,
     4.1,
     4.51,
     4.98,
     5.5,
     6.25,
     8.959999999999999
    ],
    "cap": 0.21
   }
  }
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
  "cities": [
   {
    "id": "TCD-0",
    "name": "پایتخت چاد",
    "pos": [
     18.64,
     15.28
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "TCD-1",
    "name": "شمال چاد",
    "pos": [
     18.97,
     19.23
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "TCD-2",
    "name": "جنوب چاد",
    "pos": [
     18.79,
     11.45
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 1270927,
  "front": {
   "CAF": {
    "r": [
     2.38,
     3.48,
     4.51,
     5.79,
     6.94,
     8,
     9.2,
     10.45,
     11.73,
     14.709999999999999
    ],
    "cap": 0.45
   },
   "CMR": {
    "r": [
     2.45,
     3.72,
     4.79,
     5.8,
     6.85,
     7.99,
     9.24,
     10.46,
     11.57,
     13.37
    ],
    "cap": 0.45
   },
   "LBY": {
    "r": [
     2.54,
     3.61,
     4.81,
     5.92,
     7.05,
     8.24,
     9.42,
     10.65,
     12.11,
     14.65
    ],
    "cap": 0.46
   },
   "NER": {
    "r": [
     2.49,
     3.49,
     4.4,
     5.31,
     6.14,
     6.95,
     7.75,
     8.84,
     10.13,
     11.9
    ],
    "cap": 0.37
   },
   "NGA": {
    "r": [
     2.8,
     3.99,
     4.86,
     5.64,
     6.32,
     7.05,
     7.77,
     8.56,
     9.5,
     11.27
    ],
    "cap": 0.31
   },
   "SDN": {
    "r": [
     2.41,
     3.33,
     4.17,
     4.87,
     5.52,
     6.17,
     6.78,
     7.41,
     8.26,
     11.3
    ],
    "cap": 0.25
   }
  }
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
  "cities": [
   {
    "id": "NER-0",
    "name": "پایتخت نیجر",
    "pos": [
     9.33,
     17.41
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "NER-1",
    "name": "غرب نیجر",
    "pos": [
     4.32,
     14.96
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "NER-2",
    "name": "شمال نیجر",
    "pos": [
     12.05,
     20.7
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 1185111,
  "front": {
   "BEN": {
    "r": [
     2.88,
     5.07,
     6.44,
     7.58,
     8.74,
     9.78,
     10.81,
     11.97,
     13.24,
     15.65
    ],
    "cap": 0.44
   },
   "BFA": {
    "r": [
     3.29,
     5.91,
     7.29,
     8.54,
     9.72,
     10.84,
     11.84,
     12.95,
     14.16,
     16.39
    ],
    "cap": 0.44
   },
   "DZA": {
    "r": [
     2.49,
     3.48,
     4.35,
     5.09,
     5.71,
     6.3,
     6.86,
     7.43,
     8.03,
     9.53
    ],
    "cap": 0.23
   },
   "LBY": {
    "r": [
     2.67,
     4.06,
     5.28,
     6.32,
     7.37,
     8.4,
     9.35,
     10.37,
     12.45,
     15.64
    ],
    "cap": 0.46
   },
   "MLI": {
    "r": [
     2.17,
     3.14,
     4.22,
     5.47,
     6.54,
     7.66,
     8.64,
     9.62,
     10.81,
     12.879999999999999
    ],
    "cap": 0.42
   },
   "NGA": {
    "r": [
     2.68,
     3.59,
     4.37,
     5.13,
     5.86,
     6.62,
     7.63,
     8.76,
     10.01,
     12.53
    ],
    "cap": 0.38
   },
   "TCD": {
    "r": [
     2.55,
     3.71,
     4.7,
     5.63,
     6.54,
     7.53,
     8.67,
     10.02,
     12.15,
     15.58
    ],
    "cap": 0.48
   }
  }
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
  "cities": [
   {
    "id": "MLI-0",
    "name": "پایتخت مالی",
    "pos": [
     -3.59,
     17.32
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "MLI-1",
    "name": "غرب مالی",
    "pos": [
     -8.53,
     14.92
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "MLI-2",
    "name": "شرق مالی",
    "pos": [
     0.79,
     16.31
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 1258185,
  "front": {
   "BFA": {
    "r": [
     2.31,
     3.37,
     4.21,
     5.01,
     5.89,
     6.65,
     7.37,
     8.14,
     9.04,
     11.7
    ],
    "cap": 0.27
   },
   "CIV": {
    "r": [
     2.87,
     4.34,
     5.5,
     7.1,
     8.64,
     9.79,
     10.78,
     11.64,
     12.47,
     14.34
    ],
    "cap": 0.41
   },
   "DZA": {
    "r": [
     2.46,
     3.56,
     4.49,
     5.35,
     6.31,
     7.19,
     8.5,
     10.92,
     12.62,
     15.16
    ],
    "cap": 0.47
   },
   "GIN": {
    "r": [
     2.16,
     3.26,
     5.35,
     7.42,
     8.85,
     10,
     10.97,
     11.81,
     12.58,
     14.37
    ],
    "cap": 0.4
   },
   "MRT": {
    "r": [
     2.33,
     3.18,
     3.86,
     4.54,
     5.32,
     6.46,
     7.4,
     8.27,
     9.05,
     10.99
    ],
    "cap": 0.28
   },
   "NER": {
    "r": [
     3.21,
     4.8,
     6.17,
     7.26,
     8.26,
     9.16,
     10.15,
     11.24,
     12.53,
     15.37
    ],
    "cap": 0.39
   },
   "SEN": {
    "r": [
     3.28,
     5.29,
     7.25,
     8.86,
     10.15,
     11.22,
     12.13,
     12.95,
     13.98,
     16.19
    ],
    "cap": 0.4
   }
  }
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
  "cities": [
   {
    "id": "BFA-0",
    "name": "پایتخت بورکینافاسو",
    "pos": [
     -1.76,
     12.27
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "BFA-1",
    "name": "جنوب بورکینافاسو",
    "pos": [
     -3.21,
     10.78
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "BFA-2",
    "name": "شرق بورکینافاسو",
    "pos": [
     0.06,
     11.67
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 273690,
  "front": {
   "BEN": {
    "r": [
     1.18,
     1.94,
     2.57,
     3.14,
     3.64,
     4.06,
     4.47,
     4.96,
     5.59,
     6.67
    ],
    "cap": 0.4
   },
   "CIV": {
    "r": [
     1.26,
     1.94,
     2.65,
     3.28,
     3.85,
     4.42,
     4.91,
     5.41,
     5.92,
     6.82
    ],
    "cap": 0.43
   },
   "GHA": {
    "r": [
     1.11,
     1.49,
     1.83,
     2.14,
     2.4,
     2.66,
     2.93,
     3.28,
     3.75,
     4.6
    ],
    "cap": 0.16
   },
   "MLI": {
    "r": [
     1.37,
     1.88,
     2.28,
     2.63,
     2.95,
     3.27,
     3.61,
     4.09,
     4.8,
     6.33
    ],
    "cap": 0.34
   },
   "NER": {
    "r": [
     1.16,
     1.62,
     1.99,
     2.37,
     2.88,
     3.5,
     4.26,
     5,
     5.72,
     6.92
    ],
    "cap": 0.5
   },
   "TGO": {
    "r": [
     1.3,
     1.82,
     2.29,
     2.79,
     3.26,
     3.61,
     3.94,
     4.3,
     4.89,
     5.87
    ],
    "cap": 0.36
   }
  }
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
  "cities": [
   {
    "id": "SEN-0",
    "name": "پایتخت سنگال",
    "pos": [
     -14.47,
     14.36
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "SEN-1",
    "name": "شرق سنگال",
    "pos": [
     -12.89,
     13.74
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "SEN-2",
    "name": "جنوب سنگال",
    "pos": [
     -13.52,
     13.26
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 197300,
  "front": {
   "GIN": {
    "r": [
     1,
     1.45,
     1.95,
     2.39,
     2.79,
     3.18,
     3.53,
     3.89,
     4.33,
     5.14
    ],
    "cap": 0.4
   },
   "GMB": {
    "r": [
     0.77,
     1.16,
     1.46,
     1.71,
     1.94,
     2.15,
     2.4,
     2.7,
     3.09,
     3.86
    ],
    "cap": 0.2
   },
   "GNB": {
    "r": [
     1.24,
     1.87,
     2.29,
     2.61,
     2.89,
     3.16,
     3.44,
     3.69,
     3.94,
     4.37
    ],
    "cap": 0.32
   },
   "MLI": {
    "r": [
     0.95,
     1.57,
     2.14,
     2.67,
     3.14,
     3.57,
     3.95,
     4.33,
     4.71,
     5.67
    ],
    "cap": 0.42
   },
   "MRT": {
    "r": [
     1.02,
     1.49,
     1.85,
     2.17,
     2.46,
     2.74,
     3.08,
     3.37,
     3.68,
     4.72
    ],
    "cap": 0.32
   }
  }
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
  "cities": [
   {
    "id": "GMB-0",
    "name": "پایتخت گامبیا",
    "pos": [
     -15.4,
     13.45
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 10324,
  "front": {
   "SEN": {
    "r": [
     0.24,
     0.54,
     0.85,
     1.15,
     1.36,
     1.72,
     1.95,
     2.18,
     2.41,
     2.72
    ],
    "cap": 0.5
   }
  }
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
  "cities": [
   {
    "id": "GNB-0",
    "name": "پایتخت گینهٔ بیسائو",
    "pos": [
     -14.92,
     12.06
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 32044,
  "front": {
   "GIN": {
    "r": [
     0.46,
     0.67,
     0.86,
     1.06,
     1.25,
     1.43,
     1.6,
     1.8,
     2.18,
     2.88
    ],
    "cap": 0.46
   },
   "SEN": {
    "r": [
     0.39,
     0.56,
     0.76,
     0.98,
     1.16,
     1.31,
     1.44,
     1.6,
     1.82,
     2.16
    ],
    "cap": 0.4
   }
  }
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
  "cities": [
   {
    "id": "GIN-0",
    "name": "پایتخت گینه",
    "pos": [
     -10.93,
     10.44
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "GIN-1",
    "name": "شرق گینه",
    "pos": [
     -9.02,
     9.2
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "GIN-2",
    "name": "جنوب گینه",
    "pos": [
     -10,
     8.72
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 244938,
  "front": {
   "CIV": {
    "r": [
     1.4,
     2.06,
     2.7,
     3.31,
     3.95,
     4.56,
     5.25,
     5.8,
     6.48,
     7.6
    ],
    "cap": 0.47
   },
   "GNB": {
    "r": [
     1.03,
     1.57,
     2.06,
     2.6,
     3.38,
     4.08,
     4.6,
     5.12,
     5.83,
     6.96
    ],
    "cap": 0.47
   },
   "LBR": {
    "r": [
     1.37,
     2.03,
     2.7,
     3.32,
     3.82,
     4.19,
     4.54,
     5.02,
     5.62,
     6.55
    ],
    "cap": 0.39
   },
   "MLI": {
    "r": [
     1.47,
     2.05,
     2.49,
     2.85,
     3.19,
     3.55,
     3.89,
     4.27,
     4.76,
     5.75
    ],
    "cap": 0.32
   },
   "SEN": {
    "r": [
     1.21,
     1.78,
     2.19,
     2.55,
     2.99,
     3.56,
     4.13,
     4.72,
     5.51,
     6.73
    ],
    "cap": 0.47
   },
   "SLE": {
    "r": [
     1.01,
     1.4,
     1.7,
     1.96,
     2.19,
     2.4,
     2.62,
     2.85,
     3.16,
     4.05
    ],
    "cap": 0.05
   }
  }
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
  "cities": [
   {
    "id": "SLE-0",
    "name": "پایتخت سیرالئون",
    "pos": [
     -11.79,
     8.57
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "SLE-1",
    "name": "شمال سیرالئون",
    "pos": [
     -11.35,
     9.3
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 71877,
  "front": {
   "GIN": {
    "r": [
     0.65,
     0.96,
     1.21,
     1.44,
     1.63,
     1.83,
     2.03,
     2.23,
     2.46,
     2.9
    ],
    "cap": 0.39
   },
   "LBR": {
    "r": [
     0.64,
     0.94,
     1.16,
     1.38,
     1.58,
     1.79,
     1.99,
     2.18,
     2.4,
     2.86
    ],
    "cap": 0.39
   }
  }
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
  "cities": [
   {
    "id": "LBR-0",
    "name": "پایتخت لیبریا",
    "pos": [
     -9.32,
     6.45
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "LBR-1",
    "name": "غرب لیبریا",
    "pos": [
     -10.14,
     7.22
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 95648,
  "front": {
   "CIV": {
    "r": [
     0.72,
     1.03,
     1.27,
     1.46,
     1.66,
     2.04,
     2.43,
     2.77,
     3.09,
     3.71
    ],
    "cap": 0.44
   },
   "GIN": {
    "r": [
     0.64,
     0.86,
     1.05,
     1.24,
     1.48,
     1.7,
     1.94,
     2.29,
     2.72,
     3.65
    ],
    "cap": 0.34
   },
   "SLE": {
    "r": [
     0.67,
     0.95,
     1.18,
     1.52,
     1.94,
     2.27,
     2.68,
     3.17,
     3.66,
     4.55
    ],
    "cap": 0.48
   }
  }
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
  "cities": [
   {
    "id": "CIV-0",
    "name": "پایتخت ساحل عاج",
    "pos": [
     -5.57,
     7.63
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "CIV-1",
    "name": "شمال ساحل عاج",
    "pos": [
     -6.24,
     9.43
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "CIV-2",
    "name": "غرب ساحل عاج",
    "pos": [
     -6.93,
     6.7
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 322298,
  "front": {
   "BFA": {
    "r": [
     1.21,
     1.75,
     2.23,
     2.67,
     3.09,
     3.49,
     3.86,
     4.27,
     4.72,
     6.28
    ],
    "cap": 0.37
   },
   "GHA": {
    "r": [
     1.27,
     1.77,
     2.17,
     2.58,
     3.05,
     3.53,
     3.97,
     4.4,
     4.83,
     5.77
    ],
    "cap": 0.4
   },
   "GIN": {
    "r": [
     1.12,
     1.6,
     2,
     2.42,
     2.85,
     3.25,
     3.65,
     4.05,
     4.56,
     5.78
    ],
    "cap": 0.36
   },
   "LBR": {
    "r": [
     1.25,
     1.79,
     2.33,
     2.85,
     3.29,
     3.68,
     4.04,
     4.41,
     4.85,
     6.06
    ],
    "cap": 0.38
   },
   "MLI": {
    "r": [
     1.49,
     2.17,
     2.79,
     3.26,
     3.67,
     4.07,
     4.44,
     4.87,
     5.43,
     6.61
    ],
    "cap": 0.39
   }
  }
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
  "cities": [
   {
    "id": "GHA-0",
    "name": "پایتخت غنا",
    "pos": [
     -1.22,
     7.95
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "GHA-1",
    "name": "شمال غنا",
    "pos": [
     -1.83,
     9.77
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "GHA-2",
    "name": "شرق غنا",
    "pos": [
     -0.19,
     8.51
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 239589,
  "front": {
   "BFA": {
    "r": [
     1.23,
     1.88,
     2.42,
     2.97,
     3.48,
     3.99,
     4.47,
     4.97,
     5.49,
     6.18
    ],
    "cap": 0.44
   },
   "CIV": {
    "r": [
     1.11,
     1.61,
     1.99,
     2.29,
     2.58,
     2.86,
     3.16,
     3.44,
     3.77,
     4.74
    ],
    "cap": 0.27
   },
   "TGO": {
    "r": [
     1.12,
     1.58,
     1.97,
     2.28,
     2.56,
     2.83,
     3.09,
     3.46,
     3.96,
     5.15
    ],
    "cap": 0.29
   }
  }
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
  "cities": [
   {
    "id": "TGO-0",
    "name": "پایتخت توگو",
    "pos": [
     0.96,
     8.52
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "TGO-1",
    "name": "شمال توگو",
    "pos": [
     0.68,
     9.98
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 57156,
  "front": {
   "BEN": {
    "r": [
     0.55,
     0.79,
     0.97,
     1.13,
     1.33,
     1.54,
     1.8,
     2.1,
     2.34,
     2.8699999999999997
    ],
    "cap": 0.15
   },
   "BFA": {
    "r": [
     0.56,
     1.21,
     1.66,
     2.13,
     2.52,
     2.97,
     3.41,
     3.85,
     4.29,
     4.8999999999999995
    ],
    "cap": 0.49
   },
   "GHA": {
    "r": [
     0.54,
     0.76,
     0.93,
     1.09,
     1.27,
     1.49,
     1.75,
     1.98,
     2.28,
     2.8899999999999997
    ],
    "cap": 0.12
   }
  }
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
  "cities": [
   {
    "id": "BEN-0",
    "name": "پایتخت بنین",
    "pos": [
     2.33,
     9.64
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "BEN-1",
    "name": "شمال بنین",
    "pos": [
     2.62,
     11.28
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 116553,
  "front": {
   "BFA": {
    "r": [
     0.82,
     1.22,
     1.53,
     1.79,
     2.02,
     2.28,
     2.6,
     3.35,
     4.21,
     5.06
    ],
    "cap": 0.46
   },
   "NER": {
    "r": [
     1.06,
     1.57,
     1.93,
     2.25,
     2.57,
     2.95,
     3.53,
     4.39,
     5.26,
     6.22
    ],
    "cap": 0.56
   },
   "NGA": {
    "r": [
     0.76,
     1.07,
     1.31,
     1.52,
     1.71,
     1.92,
     2.14,
     2.37,
     2.64,
     3.51
    ],
    "cap": 0.12
   },
   "TGO": {
    "r": [
     0.76,
     1.07,
     1.34,
     1.6,
     1.84,
     2.07,
     2.29,
     2.53,
     2.96,
     3.8
    ],
    "cap": 0.22
   }
  }
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
  "cities": [
   {
    "id": "MRT-0",
    "name": "پایتخت موریتانی",
    "pos": [
     -10.37,
     20.22
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "MRT-1",
    "name": "شمال موریتانی",
    "pos": [
     -8.23,
     23.8
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 1038352,
  "front": {
   "DZA": {
    "r": [
     2.77,
     4.22,
     5.38,
     6.58,
     7.66,
     8.63,
     9.44,
     10.16,
     10.88,
     13.38
    ],
    "cap": 0.42
   },
   "MAR": {
    "r": [
     2.08,
     3,
     3.74,
     4.35,
     4.87,
     5.43,
     6.08,
     6.83,
     7.66,
     9.96
    ],
    "cap": 0.28
   },
   "MLI": {
    "r": [
     2.56,
     3.93,
     5,
     5.85,
     6.72,
     7.52,
     8.25,
     8.96,
     9.83,
     11.77
    ],
    "cap": 0.38
   },
   "SEN": {
    "r": [
     2.19,
     3.27,
     4.18,
     5,
     5.84,
     6.71,
     7.49,
     8.44,
     9.76,
     12.02
    ],
    "cap": 0.42
   }
  }
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
  "cities": [
   {
    "id": "CPV-0",
    "name": "پایتخت کیپ ورد",
    "pos": [
     -23.64,
     15.08
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 3587
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
  "cities": [
   {
    "id": "STP-0",
    "name": "پایتخت سائوتومه و پرنسیپ",
    "pos": [
     6.61,
     0.24
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 979
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
  "cities": [
   {
    "id": "ZMB-0",
    "name": "پایتخت زامبیا",
    "pos": [
     27.81,
     -13.46
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "ZMB-1",
    "name": "شمال زامبیا",
    "pos": [
     30.22,
     -10.72
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "ZMB-2",
    "name": "شرق زامبیا",
    "pos": [
     31.1,
     -12.52
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 755593,
  "front": {
   "AGO": {
    "r": [
     1.79,
     2.71,
     3.53,
     4.28,
     5.14,
     5.99,
     6.88,
     7.76,
     8.69,
     10.34
    ],
    "cap": 0.41
   },
   "COD": {
    "r": [
     1.55,
     2.13,
     2.66,
     3.17,
     3.65,
     4.15,
     4.6,
     5.1,
     5.96,
     7.48
    ],
    "cap": 0.07
   },
   "MOZ": {
    "r": [
     1.9,
     2.87,
     3.57,
     4.19,
     4.73,
     5.26,
     5.84,
     6.54,
     7.54,
     8.93
    ],
    "cap": 0.28
   },
   "MWI": {
    "r": [
     2.03,
     2.94,
     3.89,
     4.79,
     6.04,
     7.23,
     8.21,
     9.02,
     10.16,
     11.75
    ],
    "cap": 0.47
   },
   "NAM": {
    "r": [
     1.95,
     2.82,
     3.65,
     4.43,
     5.3,
     6.19,
     7.98,
     9.03,
     10.07,
     11.66
    ],
    "cap": 0.5
   },
   "TZA": {
    "r": [
     2,
     3,
     4.11,
     5.55,
     6.69,
     7.64,
     8.52,
     9.59,
     10.48,
     12.05
    ],
    "cap": 0.44
   },
   "ZWE": {
    "r": [
     1.93,
     2.78,
     3.49,
     4.12,
     4.72,
     5.25,
     5.78,
     6.53,
     7.63,
     9.08
    ],
    "cap": 0.29
   }
  }
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
  "cities": [
   {
    "id": "ZWE-0",
    "name": "پایتخت زیمبابوه",
    "pos": [
     29.85,
     -19
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "ZWE-1",
    "name": "جنوب زیمبابوه",
    "pos": [
     30.22,
     -21
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "ZWE-2",
    "name": "شرق زیمبابوه",
    "pos": [
     31.57,
     -18.9
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 390202,
  "front": {
   "BWA": {
    "r": [
     1.27,
     1.86,
     2.32,
     2.73,
     3.16,
     3.6,
     4.03,
     4.49,
     5.01,
     6.15
    ],
    "cap": 0.36
   },
   "MOZ": {
    "r": [
     1.32,
     1.92,
     2.4,
     2.85,
     3.27,
     3.69,
     4.09,
     4.51,
     5.11,
     7.13
    ],
    "cap": 0.37
   },
   "ZAF": {
    "r": [
     1.53,
     2.25,
     2.85,
     3.39,
     3.93,
     4.41,
     4.86,
     5.3,
     5.77,
     6.7
    ],
    "cap": 0.4
   },
   "ZMB": {
    "r": [
     1.51,
     2.06,
     2.48,
     2.87,
     3.3,
     3.75,
     4.22,
     4.65,
     5.21,
     6.28
    ],
    "cap": 0.38
   }
  }
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
  "cities": [
   {
    "id": "MWI-0",
    "name": "پایتخت مالاوی",
    "pos": [
     34.28,
     -13.21
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "MWI-1",
    "name": "جنوب مالاوی",
    "pos": [
     34.89,
     -15.54
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "MWI-2",
    "name": "شمال مالاوی",
    "pos": [
     34.42,
     -11.33
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 119763,
  "front": {
   "MOZ": {
    "r": [
     1.41,
     2.11,
     2.87,
     3.43,
     4.02,
     4.58,
     5.33,
     5.99,
     6.76,
     7.97
    ],
    "cap": 0.5
   },
   "TZA": {
    "r": [
     0.85,
     1.38,
     2.01,
     2.85,
     3.48,
     3.91,
     4.32,
     5.01,
     5.74,
     7.069999999999999
    ],
    "cap": 0.45
   },
   "ZMB": {
    "r": [
     0.79,
     1.09,
     1.38,
     1.67,
     1.98,
     2.29,
     2.86,
     3.66,
     4.26,
     5.55
    ],
    "cap": 0.39
   }
  }
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
  "cities": [
   {
    "id": "MOZ-0",
    "name": "پایتخت موزامبیک",
    "pos": [
     35.6,
     -17.2
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.333
    }
   },
   {
    "id": "MOZ-1",
    "name": "جنوب موزامبیک",
    "pos": [
     33.46,
     -22.65
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   },
   {
    "id": "MOZ-2",
    "name": "شمال موزامبیک",
    "pos": [
     36.66,
     -13.91
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.325,
     "energy": 0.333
    }
   }
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
  "seaNeighbors": [],
  "area": 790643,
  "front": {
   "MWI": {
    "r": [
     1.58,
     2.24,
     2.91,
     3.57,
     4.17,
     4.74,
     5.3,
     5.99,
     6.96,
     10.08
    ],
    "cap": 0.05
   },
   "SWZ": {
    "r": [
     3.35,
     4.97,
     7.69,
     9.55,
     10.73,
     11.65,
     12.84,
     13.86,
     14.85,
     17.53
    ],
    "cap": 0.41
   },
   "TZA": {
    "r": [
     1.88,
     2.68,
     3.54,
     4.66,
     5.57,
     6.58,
     7.83,
     10.58,
     12.33,
     15.82
    ],
    "cap": 0.52
   },
   "ZAF": {
    "r": [
     2,
     3.24,
     5.66,
     7.51,
     8.66,
     9.63,
     10.96,
     11.96,
     12.9,
     15.69
    ],
    "cap": 0.41
   },
   "ZMB": {
    "r": [
     2.82,
     4.53,
     5.23,
     5.85,
     6.44,
     7.19,
     7.86,
     8.54,
     9.29,
     12.17
    ],
    "cap": 0.26
   },
   "ZWE": {
    "r": [
     2.1,
     2.9,
     3.61,
     4.22,
     4.93,
     5.8,
     6.56,
     7.38,
     8.32,
     11.08
    ],
    "cap": 0.24
   }
  }
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
  "cities": [
   {
    "id": "MDG-0",
    "name": "پایتخت ماداگاسکار",
    "pos": [
     46.74,
     -19.32
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 594622
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
  "cities": [
   {
    "id": "BWA-0",
    "name": "پایتخت بوتسوانا",
    "pos": [
     23.81,
     -22.17
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 580622,
  "front": {
   "NAM": {
    "r": [
     2.26,
     3.26,
     3.98,
     4.6,
     5.23,
     5.81,
     6.35,
     6.89,
     7.46,
     8.47
    ],
    "cap": 0.39
   },
   "ZAF": {
    "r": [
     1.83,
     2.56,
     3.11,
     3.68,
     4.21,
     4.73,
     5.27,
     5.89,
     6.76,
     7.88
    ],
    "cap": 0.39
   },
   "ZWE": {
    "r": [
     1.87,
     2.61,
     3.29,
     3.89,
     4.48,
     5.07,
     5.59,
     6.1,
     7.1,
     8.88
    ],
    "cap": 0.41
   }
  }
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
  "cities": [
   {
    "id": "NAM-0",
    "name": "پایتخت نامیبیا",
    "pos": [
     17.2,
     -22.07
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.35,
     "energy": 0.5
    }
   },
   {
    "id": "NAM-1",
    "name": "شرق نامیبیا",
    "pos": [
     20.74,
     -19.77
    ],
    "capital": false,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 0.65,
     "energy": 0.5
    }
   }
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
  "seaNeighbors": [],
  "area": 824750,
  "front": {
   "AGO": {
    "r": [
     2.08,
     2.97,
     3.66,
     4.25,
     4.83,
     5.66,
     6.83,
     8.13,
     9.58,
     11.58
    ],
    "cap": 0.47
   },
   "BWA": {
    "r": [
     2.56,
     3.69,
     4.72,
     5.57,
     6.32,
     6.97,
     7.57,
     8.31,
     9.37,
     11.08
    ],
    "cap": 0.37
   },
   "ZAF": {
    "r": [
     2.24,
     3.61,
     5,
     6.28,
     7.52,
     8.46,
     9.39,
     10.27,
     11.06,
     13.03
    ],
    "cap": 0.44
   },
   "ZMB": {
    "r": [
     5.19,
     6.46,
     7.46,
     8.27,
     8.98,
     9.63,
     10.21,
     10.77,
     11.53,
     13.18
    ],
    "cap": 0.38
   }
  }
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
  "cities": [
   {
    "id": "LSO-0",
    "name": "پایتخت لسوتو",
    "pos": [
     28.23,
     -29.58
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 30020,
  "front": {
   "ZAF": {
    "r": [
     0.39,
     0.55,
     0.69,
     0.82,
     0.94,
     1.04,
     1.15,
     1.26,
     1.4,
     1.7
    ],
    "cap": 0.33
   }
  }
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
  "cities": [
   {
    "id": "SWZ-0",
    "name": "پایتخت اسواتینی",
    "pos": [
     31.48,
     -26.56
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 17007,
  "front": {
   "MOZ": {
    "r": [
     0.28,
     0.42,
     0.53,
     0.63,
     0.72,
     0.8,
     0.88,
     0.97,
     1.06,
     1.22
    ],
    "cap": 0.35
   },
   "ZAF": {
    "r": [
     0.34,
     0.48,
     0.6,
     0.7,
     0.79,
     0.87,
     0.96,
     1.03,
     1.12,
     1.35
    ],
    "cap": 0.35
   }
  }
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
  "cities": [
   {
    "id": "RWA-0",
    "name": "پایتخت رواندا",
    "pos": [
     29.92,
     -1.99
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 25377,
  "front": {
   "BDI": {
    "r": [
     0.4,
     0.56,
     0.68,
     0.79,
     0.88,
     0.96,
     1.05,
     1.15,
     1.29,
     1.71
    ],
    "cap": 0.29
   },
   "COD": {
    "r": [
     0.33,
     0.46,
     0.59,
     0.72,
     0.84,
     1.01,
     1.21,
     1.39,
     1.55,
     1.76
    ],
    "cap": 0.45
   },
   "TZA": {
    "r": [
     0.35,
     0.52,
     0.7,
     0.85,
     1,
     1.17,
     1.31,
     1.45,
     1.6,
     2.0399999999999996
    ],
    "cap": 0.44
   },
   "UGA": {
    "r": [
     0.33,
     0.46,
     0.59,
     0.7,
     0.8,
     0.91,
     1.02,
     1.16,
     1.38,
     1.77
    ],
    "cap": 0.35
   }
  }
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
  "cities": [
   {
    "id": "BDI-0",
    "name": "پایتخت بوروندی",
    "pos": [
     29.88,
     -3.36
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
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
  "seaNeighbors": [],
  "area": 27217,
  "front": {
   "COD": {
    "r": [
     0.38,
     0.52,
     0.64,
     0.75,
     0.88,
     0.98,
     1.08,
     1.17,
     1.31,
     1.6300000000000001
    ],
    "cap": 0.33
   },
   "RWA": {
    "r": [
     0.34,
     0.49,
     0.61,
     0.72,
     0.82,
     0.94,
     1.06,
     1.24,
     1.46,
     1.84
    ],
    "cap": 0.38
   },
   "TZA": {
    "r": [
     0.5,
     0.71,
     0.84,
     0.96,
     1.08,
     1.21,
     1.35,
     1.48,
     1.6,
     1.86
    ],
    "cap": 0.38
   }
  }
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
  "cities": [
   {
    "id": "COM-0",
    "name": "پایتخت کومورو",
    "pos": [
     43.34,
     -11.65
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 1582
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
  "cities": [
   {
    "id": "MUS-0",
    "name": "پایتخت موریس",
    "pos": [
     57.57,
     -20.28
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 1880
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
  "cities": [
   {
    "id": "SYC-0",
    "name": "پایتخت سیشل",
    "pos": [
     55.48,
     -4.66
    ],
    "capital": true,
    "tags": [],
    "generic": true,
    "share": {
     "gdp": 1,
     "energy": 1
    }
   }
  ],
  "borderPos": {},
  "neighbors": [],
  "seaNeighbors": [],
  "area": 172
 }
};
