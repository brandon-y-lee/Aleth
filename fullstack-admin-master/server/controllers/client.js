import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Shipments from "../models/Shipments.js";
import getCountryIso3 from "country-iso-2-to-3";


// const transactionsDummy = [
//   {
//      "id":"TR2023019QXZZFR",
//      "name":"03 Efe Kan Tekstil San. ve Tic. Ltd. Şti.",
//      "coordinates":[
//         30.5569551,
//         38.7539463
//      ],
//      "material":"Cotton",
//      "amount":23.12,
//      "unit":"kg",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"CN202031463D4MB",
//      "name":"1010 Printing International Ltd",
//      "coordinates":[
//         113.9573319,
//         23.1259237
//      ],
//      "material":"Silk",
//      "amount":45.89,
//      "unit":"lb",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"CN2021337XH03YJ",
//      "name":"10TH BRANCH OF GUANGZHOU FANGYING JEWELRY CO LTD",
//      "coordinates":[
//         113.33138,
//         22.91954
//      ],
//      "material":"Denim",
//      "amount":67.43,
//      "unit":"piece",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"US2020349635F81",
//      "name":"10th Planet LLC-The",
//      "coordinates":[
//         -84.7767657,
//         37.629886
//      ],
//      "material":"Wool",
//      "amount":12.11,
//      "unit":"kg",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"PT2023019Z2JT02",
//      "name":"11 CORES - TINTURARIA E ACABAMENTOS TÊXTEIS, LDA",
//      "coordinates":[
//         -8.627792,
//         41.5288043
//      ],
//      "material":"Leather",
//      "amount":78.9,
//      "unit":"lb",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"TR2022299HPQ6NS",
//      "name":"11M ÇELİK İNŞAAT SAN. VE TİC. LTD. ŞTİ.",
//      "coordinates":[
//         29.2583382,
//         40.8861988
//      ],
//      "material":"Synthetic",
//      "amount":56.54,
//      "unit":"piece",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"DE2023019MMW839",
//      "name":"140Fahrenheit GmbH",
//      "coordinates":[
//         6.4473648,
//         51.182841
//      ],
//      "material":"Linen",
//      "amount":34.98,
//      "unit":"kg",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"CA20231180ZFYRS",
//      "name":"1487304 ONTARIO CORPORATION",
//      "coordinates":[
//         -79.7125435,
//         43.7574648
//      ],
//      "material":"Polyester",
//      "amount":89.12,
//      "unit":"lb",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"PT2023062FQG7H1",
//      "name":"14All II Textile Industries, Unipessoal, Lda.",
//      "coordinates":[
//         -8.5971418,
//         40.1599474
//      ],
//      "material":"Rayon",
//      "amount":32.33,
//      "unit":"piece",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"AR2022286WCS4N3",
//      "name":"14 DE ABRIL S.R.L.",
//      "coordinates":[
//         -63.616672,
//         -38.416097
//      ],
//      "material":"Nylon",
//      "amount":44.67,
//      "unit":"kg",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"TR2023004EW1NDY",
//      "name":"15 TEMMUZ TARIM ÜRÜNLERİ SAN. VE TİC. LTD.ŞTİ",
//      "coordinates":[
//         38.94844,
//         36.713349
//      ],
//      "material":"Velvet",
//      "amount":21.78,
//      "unit":"lb",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"CA2023156N48N8N",
//      "name":"1707447 Ontario Inc.",
//      "coordinates":[
//         -79.2726889,
//         43.7748791
//      ],
//      "material":"Fleece",
//      "amount":39.89,
//      "unit":"piece",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"TR2023019M6T9F3",
//      "name":"1800 Wash Tekstil Yıkama San. Tic. A.ş.",
//      "coordinates":[
//         27.277777,
//         38.437409
//      ],
//      "material":"Spandex",
//      "amount":14.32,
//      "unit":"kg",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"US2022297NC86VA",
//      "name":"180 Snacks",
//      "coordinates":[
//         -117.8620038,
//         33.8526071
//      ],
//      "material":"Satin",
//      "amount":90.21,
//      "unit":"lb",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"US2022300JR2PD0",
//      "name":"1890 T-Shirt Company",
//      "coordinates":[
//         -74.5270754,
//         40.5565575
//      ],
//      "material":"Corduroy",
//      "amount":75.65,
//      "unit":"piece",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"VN2023084J70AWP",
//      "name":"19 Forestry Joint Stock Company - An Nhon Furniture Factory",
//      "coordinates":[
//         109.0978925,
//         13.863761
//      ],
//      "material":"Chiffon",
//      "amount":34.87,
//      "unit":"kg",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"CZ20230192M95E0",
//      "name":"1. Firma Sumtex CZ s.r.o.",
//      "coordinates":[
//         16.9827545,
//         49.9497435
//      ],
//      "material":"Flannel",
//      "amount":56.89,
//      "unit":"lb",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"PT2021300PNX592",
//      "name":"1 Hundred Shoes/Cunha -Factory",
//      "coordinates":[
//         -8.2120117,
//         41.35876870000001
//      ],
//      "material":"Lace",
//      "amount":24.76,
//      "unit":"piece",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"PT2021125FX4ME3",
//      "name":"1 HUNDRED SHOES,LDA",
//      "coordinates":[
//         -8.329868,
//         40.668256
//      ],
//      "material":"Tweed",
//      "amount":63.2,
//      "unit":"kg",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"GB2022307EHF42C",
//      "name":"1Icon Ltd",
//      "coordinates":[
//         -0.1344294,
//         51.5112139
//      ],
//      "material":"Cupro",
//      "amount":21.5,
//      "unit":"lb",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"PT2021374YJL4PH",
//      "name":"1 LifeStyle, Lda",
//      "coordinates":[
//         -8.3940581,
//         41.538142
//      ],
//      "material":"Jersey",
//      "amount":33.77,
//      "unit":"piece",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   },
//   {
//      "id":"JP2023019FT8ZND",
//      "name":"1Ltd",
//      "coordinates":[
//         139.570301,
//         35.673343
//      ],
//      "material":"Canvas",
//      "amount":45.9,
//      "unit":"kg",
//      "prev":[
//         "TR2023019QXZZFR"
//      ],
//      "next":[
//         "TR2023019QXZZFR"
//      ]
//   }
// ];

// const transactionsDummy = [
//   {
//     "id": "TR2023019QXZZFR",
//     "name": "03 Efe Kan Tekstil San. ve Tic. Ltd. Şti.",
//     "coordinates": [
//       30.5569551,
//       38.7539463
//     ],
//     "material": "Cotton",
//     "amount": 23.12,
//     "unit": "kg",
//     "prev": [],
//     "next": "CN202031463D4MB"
//   },
//   {
//     "id": "CN202031463D4MB",
//     "name": "1010 Printing International Ltd",
//     "coordinates": [
//       113.9573319,
//       23.1259237
//     ],
//     "material": "Silk",
//     "amount": 45.89,
//     "unit": "lb",
//     "prev": ["TR2023019QXZZFR"],
//     "next": "CN2021337XH03YJ"
//   },
//   {
//     "id": "CN2021337XH03YJ",
//     "name": "10TH BRANCH OF GUANGZHOU FANGYING JEWELRY CO LTD",
//     "coordinates": [
//       113.33138,
//       22.91954
//     ],
//     "material": "Denim",
//     "amount": 67.43,
//     "unit": "piece",
//     "prev": ["CN202031463D4MB"],
//     "next": "US2020349635F81"
//   },
//   {
//     "id": "US2020349635F81",
//     "name": "10th Planet LLC-The",
//     "coordinates": [
//       -84.7767657,
//       37.629886
//     ],
//     "material": "Wool",
//     "amount": 12.11,
//     "unit": "kg",
//     "prev": ["CN2021337XH03YJ"],
//     "next": "PT2023019Z2JT02"
//   },
//   {
//     "id": "PT2023019Z2JT02",
//     "name": "11 CORES - TINTURARIA E ACABAMENTOS TÊXTEIS, LDA",
//     "coordinates": [
//       -8.627792,
//       41.5288043
//     ],
//     "material": "Leather",
//     "amount": 78.9,
//     "unit": "lb",
//     "prev": ["US2020349635F81"],
//     "next": "TR2022299HPQ6NS"
//   },
//   {
//     "id": "TR2022299HPQ6NS",
//     "name": "11M ÇELİK İNŞAAT SAN. VE TİC. LTD. ŞTİ.",
//     "coordinates": [
//       29.2583382,
//       40.8861988
//     ],
//     "material": "Synthetic",
//     "amount": 56.54,
//     "unit": "piece",
//     "prev": ["PT2023019Z2JT02"],
//     "next": "DE2023019MMW839"
//   },
//   {
//     "id": "DE2023019MMW839",
//     "name": "140Fahrenheit GmbH",
//     "coordinates": [
//       6.4473648,
//       51.182841
//     ],
//     "material": "Polyester",
//     "amount": 34.67,
//     "unit": "kg",
//     "prev": ["TR2022299HPQ6NS"],
//     "next": "FR2023019QHB9X5"
//   },
//   {
//     "id": "FR2023019QHB9X5",
//     "name": "16 RUE DE LA VILLETTE SARL",
//     "coordinates": [
//       2.3757626,
//       48.8761353
//     ],
//     "material": "Silk",
//     "amount": 67.12,
//     "unit": "lb",
//     "prev": ["DE2023019MMW839"],
//     "next": "GB2023019NZ55MF"
//   },
//   {
//     "id": "GB2023019NZ55MF",
//     "name": "17 Communications Ltd",
//     "coordinates": [
//       -0.1335196,
//       51.5101623
//     ],
//     "material": "Cotton",
//     "amount": 23.45,
//     "unit": "piece",
//     "prev": ["FR2023019QHB9X5"],
//     "next": "CN2023019V0NNJ1"
//   },
//   {
//     "id": "CN2023019V0NNJ1",
//     "name": "17CRF-Marfil SA",
//     "coordinates": [
//       114.057865,
//       22.543096
//     ],
//     "material": "Polyester",
//     "amount": 78.99,
//     "unit": "kg",
//     "prev": ["GB2023019NZ55MF"],
//     "next": "US2023019SS05L3"
//   },
//   {
//     "id": "US2023019SS05L3",
//     "name": "1-Stop Design Shop LLC",
//     "coordinates": [
//       -117.8574566,
//       33.6721353
//     ],
//     "material": "Denim",
//     "amount": 34.23,
//     "unit": "lb",
//     "prev": ["CN2023019V0NNJ1"],
//     "next": "PT2023019BCZZHB"
//   },
//   {
//     "id": "PT2023019BCZZHB",
//     "name": "1-To-1 Loan Services Lda",
//     "coordinates": [
//       -9.1467685,
//       38.7376198
//     ],
//     "material": "Cotton",
//     "amount": 56.78,
//     "unit": "kg",
//     "prev": ["US2023019SS05L3"],
//     "next": "TR2023019QZ0YZD"
//   },
//   {
//     "id": "TR2023019QZ0YZD",
//     "name": "1x9 Sports",
//     "coordinates": [
//       28.995122,
//       41.01336
//     ],
//     "material": "Wool",
//     "amount": 89.12,
//     "unit": "lb",
//     "prev": ["PT2023019BCZZHB"],
//     "next": "CN2023019JP8YXT"
//   },
//   {
//     "id": "CN2023019JP8YXT",
//     "name": "2-Eleven Publishing",
//     "coordinates": [
//       114.177263,
//       22.607672
//     ],
//     "material": "Synthetic",
//     "amount": 23.56,
//     "unit": "kg",
//     "prev": ["TR2023019QZ0YZD"],
//     "next": "US2023019DXYXXZ"
//   },
//   {
//     "id": "US2023019DXYXXZ",
//     "name": "24 7 Sunshades Inc",
//     "coordinates": [
//       -73.877291,
//       40.749979
//     ],
//     "material": "Silk",
//     "amount": 67.34,
//     "unit": "lb",
//     "prev": ["CN2023019JP8YXT"],
//     "next": "PT2023019GCVTG5"
//   },
//   {
//     "id": "PT2023019GCVTG5",
//     "name": "2 A Serviços",
//     "coordinates": [
//       -9.1595571,
//       38.7435027
//     ],
//     "material": "Cotton",
//     "amount": 45.67,
//     "unit": "kg",
//     "prev": ["US2023019DXYXXZ"],
//     "next": "TR2023019X01HD9"
//   },
//   {
//     "id": "TR2023019X01HD9",
//     "name": "2A TICARET TEKSTIL VE AKARYAKIT LIMITED SIRKETI",
//     "coordinates": [
//       27.895358,
//       40.949065
//     ],
//     "material": "Polyester",
//     "amount": 23.89,
//     "unit": "lb",
//     "prev": ["PT2023019GCVTG5"],
//     "next": "DE2023019XK4XT2"
//   },
//   {
//     "id": "DE2023019XK4XT2",
//     "name": "2d Cycles GmbH",
//     "coordinates": [
//       7.0514748,
//       51.4700227
//     ],
//     "material": "Denim",
//     "amount": 56.23,
//     "unit": "piece",
//     "prev": ["TR2023019X01HD9"],
//     "next": "FR2023019JR2VXT"
//   },
//   {
//     "id": "FR2023019JR2VXT",
//     "name": "2dm France Sarl",
//     "coordinates": [
//       1.5651866,
//       48.7669679
//     ],
//     "material": "Silk",
//     "amount": 67.78,
//     "unit": "kg",
//     "prev": ["DE2023019XK4XT2"],
//     "next": "GB2023019M3MNJ1"
//   },
//   {
//     "id": "GB2023019M3MNJ1",
//     "name": "2Gether Insurance Limited",
//     "coordinates": [
//       -1.4292503,
//       53.4167834
//     ],
//     "material": "Cotton",
//     "amount": 34.56,
//     "unit": "lb",
//     "prev": ["FR2023019JR2VXT"],
//     "next": "CN2023019CBZZHB"
//   },
//   {
//     "id": "CN2023019CBZZHB",
//     "name": "2GO Group Inc",
//     "coordinates": [
//       120.9992972,
//       14.5529259
//     ],
//     "material": "Polyester",
//     "amount": 56.23,
//     "unit": "kg",
//     "prev": ["GB2023019M3MNJ1"],
//     "next": "US2023019FB9X5W"
//   },
//   {
//     "id": "US2023019FB9X5W",
//     "name": "2handposh LLC",
//     "coordinates": [
//       -122.4042879,
//       47.5860929
//     ],
//     "material": "Denim",
//     "amount": 23.89,
//     "unit": "piece",
//     "prev": ["CN2023019CBZZHB"],
//     "next": "PT2023019D0XKYJ"
//   },
//   {
//     "id": "PT2023019D0XKYJ",
//     "name": "2Hold Ltd",
//     "coordinates": [
//       -9.1544647,
//       38.7365513
//     ],
//     "material": "Cotton",
//     "amount": 45.67,
//     "unit": "kg",
//     "prev": ["US2023019FB9X5W"],
//     "next": "TR2023019SK76D4"
//   },
//   {
//     "id": "TR2023019SK76D4",
//     "name": "2S MODA TEKSTIL SAN. VE TIC. LTD. STI.",
//     "coordinates": [
//       28.9266519,
//       41.0236472
//     ],
//     "material": "Polyester",
//     "amount": 67.34,
//     "unit": "lb",
//     "prev": ["PT2023019D0XKYJ"],
//     "next": "DE2023019V0YXTB"
//   },
//   {
//     "id": "DE2023019V0YXTB",
//     "name": "2win GbR",
//     "coordinates": [
//       10.1227659,
//       53.5624817
//     ],
//     "material": "Silk",
//     "amount": 23.56,
//     "unit": "kg",
//     "prev": ["TR2023019SK76D4"],
//     "next": "FR2023019CBZ7HB"
//   },
//   {
//     "id": "FR2023019CBZ7HB",
//     "name": "2XN Sas",
//     "coordinates": [
//       2.3965841,
//       48.7502407
//     ],
//     "material": "Denim",
//     "amount": 56.78,
//     "unit": "lb",
//     "prev": ["DE2023019V0YXTB"],
//     "next": "GB2023019JP8YXT"
//   },
//   {
//     "id": "GB2023019JP8YXT",
//     "name": "3T1B Limited",
//     "coordinates": [
//       -1.3237482,
//       52.5597595
//     ],
//     "material": "Cotton",
//     "amount": 89.12,
//     "unit": "piece",
//     "prev": ["FR2023019CBZ7HB"],
//     "next": "CN2023019XK4XT2"
//   },
//   {
//     "id": "CN2023019XK4XT2",
//     "name": "4 Slf Sarl",
//     "coordinates": [
//       113.964528,
//       22.512119
//     ],
//     "material": "Polyester",
//     "amount": 34.67,
//     "unit": "kg",
//     "prev": ["GB2023019JP8YXT"],
//     "next": "US2023019JR2VXT"
//   },
//   {
//     "id": "US2023019JR2VXT",
//     "name": "4 Vision Solutions Inc",
//     "coordinates": [
//       -81.7017654,
//       41.5061815
//     ],
//     "material": "Silk",
//     "amount": 67.12,
//     "unit": "lb",
//     "prev": ["CN2023019XK4XT2"],
//     "next": "PT2023019M3MNJ1"
//   },
//   {
//     "id": "PT2023019M3MNJ1",
//     "name": "4-Trans Servicos",
//     "coordinates": [
//       -9.1412503,
//       38.7180055
//     ],
//     "material": "Cotton",
//     "amount": 23.45,
//     "unit": "kg",
//     "prev": ["US2023019JR2VXT"],
//     "next": "TR2023019CBZZHB"
//   },
//   {
//     "id": "TR2023019CBZZHB",
//     "name": "4e Enerji Elektrik Elektronik Insaat Taahhüt Ticaret Sanayi Limited Sirketi",
//     "coordinates": [
//       29.030981,
//       41.015137
//     ],
//     "material": "Polyester",
//     "amount": 78.99,
//     "unit": "lb",
//     "prev": ["PT2023019M3MNJ1"],
//     "next": "DE2023019DXYXXZ"
//   },
//   {
//     "id": "DE2023019DXYXXZ",
//     "name": "4m-Marketing Gmbh",
//     "coordinates": [
//       6.048281,
//       50.775431
//     ],
//     "material": "Denim",
//     "amount": 34.23,
//     "unit": "kg",
//     "prev": ["TR2023019CBZZHB"],
//     "next": "FR2023019BCZZHB"
//   },
//   {
//     "id": "FR2023019BCZZHB",
//     "name": "4x Technologies Inc",
//     "coordinates": [
//       2.2922926,
//       48.856614
//     ],
//     "material": "Cotton",
//     "amount": 56.78,
//     "unit": "piece",
//     "prev": ["DE2023019DXYXXZ"],
//     "next": "GB2023019QZ0YZD"
//   },
//   {
//     "id": "GB2023019QZ0YZD",
//     "name": "5.11 Europe Limited",
//     "coordinates": [
//       -2.6523672,
//       53.6894537
//     ],
//     "material": "Wool",
//     "amount": 89.12,
//     "unit": "lb",
//     "prev": ["FR2023019BCZZHB"],
//     "next": "CN2023019SK76D4"
//   },
//   {
//     "id": "CN2023019SK76D4",
//     "name": "5.11 Tactical (Shanghai) Outdoor Equipment Co. Ltd.",
//     "coordinates": [
//       121.455979,
//       31.232374
//     ],
//     "material": "Silk",
//     "amount": 34.67,
//     "unit": "kg",
//     "prev": ["GB2023019QZ0YZD"],
//     "next": "US2023019X01HD9"
//   },
//   {
//     "id": "US2023019X01HD9",
//     "name": "5000 Talent International LLC",
//     "coordinates": [
//       -90.484216,
//       38.610136
//     ],
//     "material": "Cotton",
//     "amount": 67.12,
//     "unit": "lb",
//     "prev": ["CN2023019SK76D4"],
//     "next": "PT2023019XK4XT2"
//   },
//   {
//     "id": "PT2023019XK4XT2",
//     "name": "5250 Films",
//     "coordinates": [
//       -9.1517513,
//       38.7182285
//     ],
//     "material": "Polyester",
//     "amount": 23.45,
//     "unit": "kg",
//     "prev": ["US2023019X01HD9"],
//     "next": "TR2023019JR2VXT"
//   },
//   {
//     "id": "TR2023019JR2VXT",
//     "name": "60 Degrees Sarl",
//     "coordinates": [
//       29.0587752,
//       41.0428136
//     ],
//     "material": "Denim",
//     "amount": 78.99,
//     "unit": "lb",
//     "prev": ["PT2023019XK4XT2"],
//     "next": "DE2023019M3MNJ1"
//   },
//   {
//     "id": "DE2023019M3MNJ1",
//     "name": "7 Agency GmbH",
//     "coordinates": [
//       6.165361,
//       50.7987905
//     ],
//     "material": "Silk",
//     "amount": 34.23,
//     "unit": "kg",
//     "prev": ["TR2023019JR2VXT"],
//     "next": "FR2023019CBZZHB"
//   },
//   {
//     "id": "FR2023019CBZZHB",
//     "name": "77 Agency",
//     "coordinates": [
//       2.3952047,
//       48.8679643
//     ],
//     "material": "Cotton",
//     "amount": 56.78,
//     "unit": "piece",
//     "prev": ["DE2023019M3MNJ1"],
//     "next": "GB2023019DXYXXZ"
//   },
//   {
//     "id": "GB2023019DXYXXZ",
//     "name": "77 Diamonds Limited",
//     "coordinates": [
//       -0.102349,
//       51.518552
//     ],
//     "material": "Wool",
//     "amount": 89.12,
//     "unit": "lb",
//     "prev": ["FR2023019CBZZHB"],
//     "next": "CN2023019BCZZHB"
//   },
//   {
//     "id": "CN2023019BCZZHB",
//     "name": "800 Group Limited",
//     "coordinates": [
//       116.498088,
//       39.918509
//     ],
//     "material": "Synthetic",
//     "amount": 34.67,
//     "unit": "kg",
//     "prev": ["GB2023019DXYXXZ"],
//     "next": "US2023019QZ0YZD"
//   },
//   {
//     "id": "US2023019QZ0YZD",
//     "name": "8Degrees Tech Inc",
//     "coordinates": [
//       -122.1430205,
//       37.4418834
//     ],
//     "material": "Polyester",
//     "amount": 67.12,
//     "unit": "lb",
//     "prev": ["CN2023019BCZZHB"],
//     "next": "PT2023019SK76D4"
//   }];

  const transactionsDummy = [
    {
      "id": "TR2022299HPQ6NS",
      "name": "11M ÇELİK İNŞAAT SAN. VE TİC. LTD. ŞTİ.",
      "coordinates": [
        29.2583382,
        40.8861988
      ],
      "material": "Synthetic",
      "amount": 65.1,
      "unit": "piece",
      "prev": ["PT2023019Z2JT02"],
      "next": [],
      "shipmentID": "Shipment1"
    },
    {
      "id": "PT2023018Q22FVH",
      "name": "13 STRINGS, LDA",
      "coordinates": [
        -8.6134982,
        41.1488419
      ],
      "material": "Cotton",
      "amount": 23.78,
      "unit": "kg",
      "prev": [],
      "next": ["US202220707WWRM"],
      "shipmentID": "Shipment2"
    },
    {
      "id": "US202220707WWRM",
      "name": "100% WOOL INC",
      "coordinates": [
        -77.3672675,
        38.9025279
      ],
      "material": "Silk",
      "amount": 78.22,
      "unit": "lb",
      "prev": ["PT2023018Q22FVH"],
      "next": [],
      "shipmentID": "Shipment2"
    },
    {
      "id": "CN2022364N63PG",
      "name": "1001 ARMED FORCES CO LTD",
      "coordinates": [
        120.597458,
        32.395402
      ],
      "material": "Denim",
      "amount": 56.3,
      "unit": "piece",
      "prev": [],
      "next": [],
      "shipmentID": "Shipment3"
    },
    {
      "id": "CN2021336XXCHG",
      "name": "10TH BRANCH OF GUANGZHOU FANGYING JEWELRY CO LTD",
      "coordinates": [
        113.33138,
        22.91954
      ],
      "material": "Wool",
      "amount": 45.78,
      "unit": "kg",
      "prev": [],
      "next": ["US2023019X1TH4L"],
      "shipmentID": "Shipment4"
    },
    {
      "id": "US2023019X1TH4L",
      "name": "10TH STREET GYM, LLC",
      "coordinates": [
        -74.080204,
        39.329255
      ],
      "material": "Leather",
      "amount": 89.32,
      "unit": "lb",
      "prev": ["CN2021336XXCHG"],
      "next": [],
      "shipmentID": "Shipment4"
    },
    {
      "id": "PT2023019ZP6R9J",
      "name": "14WE, UNIPESSOAL, LDA",
      "coordinates": [
        -9.0364333,
        38.7050576
      ],
      "material": "Cotton",
      "amount": 123.21,
      "unit": "kg",
      "prev": [],
      "next": ["US2023019X1V4J5"],
      "shipmentID": "Shipment5"
    },
    {
      "id": "US2023019X1V4J5",
      "name": "10TH STREET MEDICAL",
      "coordinates": [
        -75.663985,
        38.663179
      ],
      "material": "Cotton",
      "amount": 321.45,
      "unit": "lb",
      "prev": ["PT2023019ZP6R9J"],
      "next": [],
      "shipmentID": "Shipment5"
    },
    {
      "id": "US2023019Z2JT02",
      "name": "111, INC.",
      "coordinates": [
        -75.213424,
        39.952401
      ],
      "material": "Denim",
      "amount": 123.45,
      "unit": "piece",
      "prev": [],
      "next": ["TR2022299HPQ6NS"],
      "shipmentID": "Shipment1"
    }
  ];


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    console.log("hit it");
    // print("here");
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Shipments.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);
    // const transactions = transactionsDummy;


    const total = await Shipments.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getChainOfShipments = async (req, res) => {
  try {
    const chainID = req.query;
    console.log("This is the place where chainID is printed");
    console.log(chainID);   

    const shipmentChain = await Shipments.find({
      $or: [
        { shipmentID: chainID.chainId },
        // { shipmentID: "Shipment1" },
      ],
    });
    // const transactions = transactionsDummy;

    console.log(shipmentChain);
    res.status(200).json({
      shipmentChain,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
