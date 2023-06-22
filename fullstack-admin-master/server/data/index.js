export const dataShipments = [
  {
    "userId": 1,
    "recipientId": 2,
    "id": "TR2022299HPQ6NS",
    "name": "11M ÇELİK İNŞAAT SAN. VE TİC. LTD. ŞTİ.",
    "coordinates": [
      24.6180732,
      23.4507856
    ],
    "material": "Synthetic",
    "amount": 65.1,
    "unit": "piece",
    "prev": [],
    "next": "PT2023018Q22FVH",
    "shipmentID": "Shipment1",
    "orderStatus": 0
  },
  {
    "userId": 2,
    "recipientId": 3,
    "id": "PT2023018Q22FVH",
    "name": "13 STRINGS, LDA",
    "coordinates": [
      17.2064912,
      22.1782433
    ],
    "material": "Cotton",
    "amount": 23.78,
    "unit": "kg",
    "prev": [
      "TR2022299HPQ6NS"
    ],
    "next": "US202220707WWRM",
    "shipmentID": "Shipment1",
    "orderStatus": 1
  },
  {
    "userId": 3,
    "recipientId": 4,
    "id": "US202220707WWRM",
    "name": "100% WOOL INC",
    "coordinates": [
      24.1778298,
      20.1569574
    ],
    "material": "Silk",
    "amount": 78.22,
    "unit": "lb",
    "prev": [
      "PT2023018Q22FVH"
    ],
    "next": "NM202220707WWRM",
    "shipmentID": "Shipment1",
    "orderStatus": 2
  },
  {
    "userId": 4,
    "recipientId": 5,
    "id": "NM202220707WWRM",
    "name": "Cool Shirt! INC",
    "coordinates": [
      22.1778298,
      25.1569574
    ],
    "material": "Silk",
    "amount": 78.22,
    "unit": "lb",
    "prev": [
      "US202220707WWRM"
    ],
    "next": "BO202320707WWRM",
    "shipmentID": "Shipment1",
    "orderStatus": 0
  },
  {
    "userId": 5,
    "recipientId": "",
    "id": "BO202320707WWRM",
    "name": "Clover Clothes INC",
    "coordinates": [
      29.1778298,
      35.1569574
    ],
    "material": "Silk",
    "amount": 78.22,
    "unit": "lb",
    "prev": [
      "NM202220707WWRM"
    ],
    "next": "",
    "shipmentID": "Shipment1",
    "orderStatus": 1
  },
  {
    "userId": 6,
    "recipientId": 7,
    "id": "CN2022364N63PG",
    "name": "1001 ARMED FORCES CO LTD",
    "coordinates": [
       18.9786636,
      16.4464722
    ],
    "material": "Denim",
    "amount": 56.3,
    "unit": "piece",
    "prev": [],
    "next": "CN2021336XXCHG",
    "shipmentID": "Shipment2",
    "orderStatus": 2
  },
  {
    "userId": 7,
    "recipientId": 8,
    "id": "CN2021336XXCHG",
    "name": "10TH BRANCH OF GUANGZHOU FANGYING JEWELRY CO LTD",
    "coordinates": [
      17.1651282,
      17.6351594
    ],
    "material": "Wool",
    "amount": 45.78,
    "unit": "kg",
    "prev": [
      "CN2022364N63PG"
    ],
    "next": "US2023019X1TH4L",
    "shipmentID": "Shipment2",
    "orderStatus": 0
  },
  {
    "userId": 8,
    "recipientId": 9,
    "id": "US2023019X1TH4L",
    "name": "10TH STREET GYM, LLC",
    "coordinates": [
      18.7714388,
      16.8150366
    ],
    "material": "Leather",
    "amount": 89.32,
    "unit": "lb",
    "prev": [
      "CN2021336XXCHG"
    ],
    "next": "BNG023019X1TH4L",
    "shipmentID": "Shipment2",
    "orderStatus": 1
  },
  {
    "userId": 9,
    "recipientId": 10,
    "id": "BNG023019X1TH4L",
    "name": "11TH STREET Fashion, LLC",
    "coordinates": [
      17.7714388,
      13.8150366
    ],
    "material": "Leather",
    "amount": 89.32,
    "unit": "lb",
    "prev": [
      "US2023019X1TH4L"
    ],
    "next": "YYE2023019X1TH4L",
    "shipmentID": "Shipment2",
    "orderStatus": 2
  },
  {
    "userId": 10,
    "recipientId": "",
    "id": "YYE2023019X1TH4L",
    "name": "Driponomics Major Clothing, LLC",
    "coordinates": [
      14.7714388,
      15.8150366
    ],
    "material": "Leather",
    "amount": 89.32,
    "unit": "lb",
    "prev": [
      "BNG023019X1TH4L"
    ],
    "next": "",
    "shipmentID": "Shipment2",
    "orderStatus": 0
  },
  {
    "userId": 11,
    "recipientId": 12,
    "id": "PT2023019ZP6R9J",
    "name": "14WE, UNIPESSOAL, LDA",
    "coordinates": [
      24.1462883,
      15.530527
    ],
    "material": "Cotton",
    "amount": 123.21,
    "unit": "kg",
    "prev": [],
    "next": "US2023019X1V4J5",
    "shipmentID": "Shipment3",
    "orderStatus": 1
  },
  {
    "userId": 12,
    "recipientId": 13,
    "id": "US2023019X1V4J5",
    "name": "10TH FABRIC MEDICAL",
    "coordinates": [
       23.0028753,
      18.8600144
    ],
    "material": "Cotton",
    "amount": 321.45,
    "unit": "lb",
    "prev": [
      "PT2023019ZP6R9J"
    ],
    "next": "US2023019Z2JT02",
    "shipmentID": "Shipment3",
    "orderStatus": 2
  },
  {
    "userId": 13,
    "recipientId": 14,
    "id": "US2023019Z2JT02",
    "name": "808, INC.",
    "coordinates": [
      22.9924469,
      20.1272764
    ],
    "material": "Denim",
    "amount": 123.45,
    "unit": "piece",
    "prev": [
      "US2023019X1V4J5"
    ],
    "next": "EW2023019Z2JT02",
    "shipmentID": "Shipment3",
    "orderStatus": 0
  },
  {
    "userId": 14,
    "recipientId": 15,
    "id": "EW2023019Z2JT02",
    "name": "101 Style, INC.",
    "coordinates": [
      21.0024469,
      19.1272764
    ],
    "material": "Denim",
    "amount": 123.45,
    "unit": "piece",
    "prev": [
      "US2023019Z2JT02"
    ],
    "next": "REW023019Z2JT02",
    "shipmentID": "Shipment3",
    "orderStatus": 1
  },
  {
    "userId": 15,
    "recipientId": "",
    "id": "REW023019Z2JT02",
    "name": "Wearable Thread, INC.",
    "coordinates": [
      24.9924469,
      22.1272764
    ],
    "material": "Denim",
    "amount": 123.45,
    "unit": "piece",
    "prev": [
      "EW2023019Z2JT02"
    ],
    "next": "",
    "shipmentID": "Shipment3",
    "orderStatus": 2
  },
  {
    "userId": 16,
    "recipientId": 17,
    "id": "TR2022299HPQ6NT",
    "name": "Yes Clothing. VE TİC. LTD. ŞTİ.",
    "coordinates": [
      22.6400492,
      23.9828272
    ],
    "material": "Synthetic",
    "amount": 65.1,
    "unit": "piece",
    "prev": [
      ""
    ],
    "next": "PT2023018Q22FVH1",
    "shipmentID": "Shipment4",
    "orderStatus": 0
  },
  {
    "userId": 17,
    "recipientId": 18,
    "id": "PT2023018Q22FVH1",
    "name": "16 STRINGS, LDA",
    "coordinates": [
      25.5612545,
      19.212993
    ],
    "material": "Cotton",
    "amount": 23.78,
    "unit": "kg",
    "prev": [
      "TR2022299HPQ6NT"
    ],
    "next": "US202220707WWRM1",
    "shipmentID": "Shipment4",
    "orderStatus": 1
  },
  {
    "userId": 18,
    "recipientId": 19,
    "id": "US202220707WWRM1",
    "name": "Comfy Clothing INC",
    "coordinates": [
      20.9038371,
      14.2978584
    ],
    "material": "Silk",
    "amount": 78.22,
    "unit": "lb",
    "prev": [
      "PT2023018Q22FVH1"
    ],
    "next": "PAN02220707WWRM1",
    "shipmentID": "Shipment4",
    "orderStatus": 2
  },
  {
    "userId": 19,
    "recipientId": 20,
    "id": "PAN02220707WWRM1",
    "name": "The Best Apparel INC",
    "coordinates": [
      16.9038371,
      14.2978584
    ],
    "material": "Silk",
    "amount": 78.22,
    "unit": "lb",
    "prev": [
      "US202220707WWRM1"
    ],
    "next": "EC202220707WWRM1",
    "shipmentID": "Shipment4",
    "orderStatus": 0
  },
  {
    "userId": 20,
    "recipientId": "",
    "id": "EC202220707WWRM1",
    "name": "Sustainable Garments INC",
    "coordinates": [
      15.9038371,
      19.2978584
    ],
    "material": "Silk",
    "amount": 78.22,
    "unit": "lb",
    "prev": [
      "PAN02220707WWRM1"
    ],
    "next": "",
    "shipmentID": "Shipment4",
    "orderStatus": 1
  },
  {
    "userId": 21,
    "recipientId": 22,
    "id": "CN2022364N63PG1",
    "name": "1001 NAVAL FORCES CO LTD",
    "coordinates": [
      28.6883354,
      10.4599867
    ],
    "material": "Denim",
    "amount": 56.3,
    "unit": "piece",
    "prev": [],
    "next": "CN2021336XXCHG1",
    "shipmentID": "Shipment5",
    "orderStatus": 2
  },
  {
    "userId": 22,
    "recipientId": 23,
    "id": "CN2021336XXCHG1",
    "name": "5TH BRANCH OF GUANGZHOU FANGYING FASHION CO LTD",
    "coordinates": [
      8.1612447,
      24.4597336
    ],
    "material": "Wool",
    "amount": 45.78,
    "unit": "kg",
    "prev": [
      "CN2022364N63PG1"
    ],
    "next": "US2023019X1TH4L1",
    "shipmentID": "Shipment5",
    "orderStatus": 0
  },
  {
    "userId": 23,
    "recipientId": 24,
    "id": "US2023019X1TH4L1",
    "name": "10TH STREET GYM, LLC",
    "coordinates": [
      18.7714388,
      16.8150366
    ],
    "material": "Leather",
    "amount": 89.32,
    "unit": "lb",
    "prev": [
      "CN2021336XXCHG1"
    ],
    "next": "RAN032019X1TH4L1",
    "shipmentID": "Shipment5",
    "orderStatus": 1
  },
  {
    "userId": 24,
    "recipientId": 25,
    "id": "RAN032019X1TH4L1",
    "name": "19TH STREET GYM, LLC",
    "coordinates": [
      16.7714388,
      16.3250366
    ],
    "material": "Leather",
    "amount": 89.32,
    "unit": "lb",
    "prev": [
      "US2023019X1TH4L1"
    ],
    "next": "YUF023019X1TH4L1",
    "shipmentID": "Shipment5",
    "orderStatus": 2
  },
  {
    "userId": 25,
    "recipientId": "",
    "id": "YUF023019X1TH4L1",
    "name": "THE SPOT APPAREL, LLC",
    "coordinates": [
       14.0814388,
      12.8150366
    ],
    "material": "Leather",
    "amount": 89.32,
    "unit": "lb",
    "prev": [
      "RAN032019X1TH4L1"
    ],
    "next": "",
    "shipmentID": "Shipment5",
    "orderStatus": 0
  }
];


export const userData = [
  {
    "userId": 1,
    "coordinates": [
      24.6180732,
      23.4507856
    ],
    "name": "11M ÇELİK İNŞAAT SAN. VE TİC. LTD. ŞTİ.",
    "description": "A construction company specializing in steel structures.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Supplier"
  },
  {
    "userId": 2,
    "coordinates": [
      17.2064912,
      22.1782433
    ],
    "name": "13 STRINGS, LDA",
    "description": "A textile company producing high-quality strings.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Textile Producers"
  },
  {
    "userId": 3,
    "coordinates": [
      24.1778298,
      20.1569574
    ],
    "name": "100% WOOL INC",
    "description": "A company specializing in the production of 100% wool products.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Manufacturer"
  },
  {
    "userId": 4,
    "coordinates": [
      22.1778298,
      25.1569574
    ],
    "name": "Cool Shirt! INC",
    "description": "A clothing company known for its cool and stylish shirts.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Distributors"
  },
  {
    "userId": 5,
    "coordinates": [
      29.1778298,
      35.1569574
    ],
    "name": "Clover Clothes INC",
    "description": "A clothing company specializing in stylish and trendy clothes.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Logistic Providers"
  },
  {
    "userId": 6,
    "coordinates": [
      18.9786636,
      16.4464722
    ],
    "name": "1001 ARMED FORCES CO LTD",
    "description": "A company providing clothing and equipment for armed forces.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Supplier"
  },
  {
    "userId": 7,
    "coordinates": [
      17.1651282,
      17.6351594
    ],
    "name": "10TH BRANCH OF GUANGZHOU FANGYING JEWELRY CO LTD",
    "description": "A branch of Guangzhou Fangying Jewelry Co Ltd specializing in jewelry.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Textile Producers"
  },
  {
    "userId": 8,
    "coordinates": [
      18.7714388,
      16.8150366
    ],
    "name": "10TH STREET GYM, LLC",
    "description": "A gym facility providing fitness and training services.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Manufacturer"
  },
  {
    "userId": 9,
    "coordinates": [
      17.7714388,
      13.8150366
    ],
    "name": "11TH STREET Fashion, LLC",
    "description": "A fashion company known for its trendy and stylish clothing.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Distributors"
  },
  {
    "userId": 10,
    "coordinates": [
      14.7714388,
      15.8150366
    ],
    "name": "Driponomics Major Clothing, LLC",
    "description": "A clothing company specializing in waterproof and durable clothing.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Logistic Providers"
  },
  {
    "userId": 11,
    "coordinates": [
      24.1462883,
      15.530527
    ],
    "name": "14WE, UNIPESSOAL, LDA",
    "description": "A company specializing in the production of high-quality cotton garments.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Supplier"
  },
  {
    "userId": 12,
    "coordinates": [
      23.0028753,
      18.8600144
    ],
    "name": "10TH FABRIC MEDICAL",
    "description": "A medical company producing fabrics for medical applications.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Textile Producers"
  },
  {
    "userId": 13,
    "coordinates": [
      22.9924469,
      20.1272764
    ],
    "name": "808, INC.",
    "description": "A company specializing in the production of high-quality denim products.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Manufacturer"
  },
  {
    "userId": 14,
    "coordinates": [
      21.0024469,
      19.1272764
    ],
    "name": "101 Style, INC.",
    "description": "A fashion company known for its trendy and stylish clothing.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Distributors"
  },
  {
    "userId": 15,
    "coordinates": [
      24.9924469,
      22.1272764
    ],
    "name": "Wearable Thread, INC.",
    "description": "A company specializing in wearable technology and smart clothing.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Logistic Providers"
  },
  {
    "userId": 16,
    "coordinates": [
      22.6400492,
      23.9828272
    ],
    "name": "Yes Clothing. VE TİC. LTD. ŞTİ.",
    "description": "A clothing company offering a wide range of fashionable clothing.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Supplier"
  },
  {
    "userId": 17,
    "coordinates": [
      25.5612545,
      19.212993
    ],
    "name": "16 STRINGS, LDA",
    "description": "A textile company producing high-quality strings.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Textile Producers"
  },
  {
    "userId": 18,
    "coordinates": [
      20.9038371,
      14.2978584
    ],
    "name": "Comfy Clothing INC",
    "description": "A clothing company specializing in comfortable and cozy clothing.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Manufacturer"
  },
  {
    "userId": 19,
    "coordinates": [
      16.9038371,
      14.2978584
    ],
    "name": "The Best Apparel INC",
    "description": "A company known for producing the best quality apparel in the market.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Distributors"
  },
  {
    "userId": 20,
    "coordinates": [
      15.9038371,
      19.2978584
    ],
    "name": "Sustainable Garments INC",
    "description": "A company specializing in sustainable and eco-friendly garments.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Logistic Providers"
  },
  {
    "userId": 21,
    "coordinates": [
      28.6883354,
      10.4599867
    ],
    "name": "1001 NAVAL FORCES CO LTD",
    "description": "A company providing clothing and equipment for naval forces.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Supplier"
  },
  {
    "userId": 22,
    "coordinates": [
      8.1612447,
      24.4597336
    ],
    "name": "5TH BRANCH OF GUANGZHOU FANGYING FASHION CO LTD",
    "description": "A branch of Guangzhou Fangying Fashion Co Ltd specializing in fashion.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Textile Producers"
  },
  {
    "userId": 23,
    "coordinates": [
      18.7714388,
      16.8150366
    ],
    "name": "10TH STREET GYM, LLC",
    "description": "A gym facility providing fitness and training services.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Manufacturer"
  },
  {
    "userId": 24,
    "coordinates": [
      16.7714388,
      16.3250366
    ],
    "name": "19TH STREET GYM, LLC",
    "description": "A gym facility located on 19th Street offering fitness services.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Distributors"
  },
  {
    "userId": 25,
    "coordinates": [
      14.0814388,
      12.8150366
    ],
    "name": "THE SPOT APPAREL, LLC",
    "description": "A clothing company known for its trendy and fashionable clothing.",
    "city": "Unknown",
    "country": "Unknown",
    "type": "Logistic Providers"
  }
];

export const dataUser = [
  {
    _id: "63701cc1f03239c72c00017f",
    name: "Konstantine",
    email: "kranstead0@narod.ru",
    password: "omMDCh",
    city: "Nurabelen",
    state: null,
    country: "ID",
    occupation: "Computer Systems Analyst I",
    phoneNumber: "8346315874",
    transactions: [
      "63701d74f0323986f3000158",
      "63701d74f03239d40b00007e",
      "63701d74f03239867500014b",
      "63701d74f032398675000152",
    ],
    role: "superadmin",
  },
  { // 5
  "id": "YUF023019X1TH4L1",
  "name": "THE SPOT APPAREL, LLC",
  "coordinates": [
    14.0814388,
    12.8150366
  ],
  "material": "Leather",
  "amount": 89.32,
  "unit": "lb",
  "prev": ["RAN032019X1TH4L1"],
  "next": "",
  "shipmentID": "Shipment5"
  }
];