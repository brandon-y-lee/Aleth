import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";


const transactionsDummy = [
  {
    "id": "TR2023019QXZZFR",
    "name": "03 Efe Kan Tekstil San. ve Tic. Ltd. Şti.",
    "coordinates": [
      30.5569551,
      38.7539463
    ],
    "material": "Cotton",
    "amount": 23.12,
    "unit": "kg"
  },
  {
    "id": "CN202031463D4MB",
    "name": "1010 Printing International Ltd",
    "coordinates": [
      113.9573319,
      23.1259237
    ],
    "material": "Silk",
    "amount": 45.89,
    "unit": "lb"
  },
  {
    "id": "CN2021337XH03YJ",
    "name": "10TH BRANCH OF GUANGZHOU FANGYING JEWELRY CO LTD",
    "coordinates": [
      113.33138,
      22.91954
    ],
    "material": "Denim",
    "amount": 67.43,
    "unit": "piece"
  },
  {
    "id": "US2020349635F81",
    "name": "10th Planet LLC-The",
    "coordinates": [
      -84.7767657,
      37.629886
    ],
    "material": "Wool",
    "amount": 12.11,
    "unit": "kg"
  },
  {
    "id": "PT2023019Z2JT02",
    "name": "11 CORES - TINTURARIA E ACABAMENTOS TÊXTEIS, LDA",
    "coordinates": [
      -8.627792,
      41.5288043
    ],
    "material": "Leather",
    "amount": 78.9,
    "unit": "lb"
  },
  {
    "id": "TR2022299HPQ6NS",
    "name": "11M ÇELİK İNŞAAT SAN. VE TİC. LTD. ŞTİ.",
    "coordinates": [
      29.2583382,
      40.8861988
    ],
    "material": "Synthetic",
    "amount": 56.54,
    "unit": "piece"
  },
  {
    "id": "DE2023019MMW839",
    "name": "140Fahrenheit GmbH",
    "coordinates": [
      6.4473648,
      51.182841
    ],
    "material": "Linen",
    "amount": 34.98,
    "unit": "kg"
  },
  {
    "id": "CA20231180ZFYRS",
    "name": "1487304 ONTARIO CORPORATION",
    "coordinates": [
      -79.7125435,
      43.7574648
    ],
    "material": "Polyester",
    "amount": 89.12,
    "unit": "lb"
  },
  {
    "id": "PT2023062FQG7H1",
    "name": "14All II Textile Industries, Unipessoal, Lda.",
    "coordinates": [
      -8.5971418,
      40.1599474
    ],
    "material": "Rayon",
    "amount": 32.33,
    "unit": "piece"
  },
  {
    "id": "AR2022286WCS4N3",
    "name": "14 DE ABRIL S.R.L.",
    "coordinates": [
      -63.616672,
      -38.416097
    ],
    "material": "Nylon",
    "amount": 44.67,
    "unit": "kg"
  },
  {
    "id": "TR2023004EW1NDY",
    "name": "15 TEMMUZ TARIM ÜRÜNLERİ SAN. VE TİC. LTD.ŞTİ",
    "coordinates": [
      38.94844,
      36.713349
    ],
    "material": "Velvet",
    "amount": 21.78,
    "unit": "lb"
  },
  {
    "id": "CA2023156N48N8N",
    "name": "1707447 Ontario Inc.",
    "coordinates": [
      -79.2726889,
      43.7748791
    ],
    "material": "Fleece",
    "amount": 39.89,
    "unit": "piece"
  },
  {
    "id": "TR2023019M6T9F3",
    "name": "1800 Wash Tekstil Yıkama San. Tic. A.ş.",
    "coordinates": [
      27.277777,
      38.437409
    ],
    "material": "Spandex",
    "amount": 14.32,
    "unit": "kg"
  },
  {
    "id": "US2022297NC86VA",
    "name": "180 Snacks",
    "coordinates": [
      -117.8620038,
      33.8526071
    ],
    "material": "Satin",
    "amount": 90.21,
    "unit": "lb"
  },
  {
    "id": "US2022300JR2PD0",
    "name": "1890 T-Shirt Company",
    "coordinates": [
      -74.5270754,
      40.5565575
    ],
    "material": "Corduroy",
    "amount": 75.65,
    "unit": "piece"
  },
  {
    "id": "VN2023084J70AWP",
    "name": "19 Forestry Joint Stock Company - An Nhon Furniture Factory",
    "coordinates": [
      109.0978925,
      13.863761
    ],
    "material": "Chiffon",
    "amount": 34.87,
    "unit": "kg"
  },
  {
    "id": "CZ20230192M95E0",
    "name": "1. Firma Sumtex CZ s.r.o.",
    "coordinates": [
      16.9827545,
      49.9497435
    ],
    "material": "Flannel",
    "amount": 56.89,
    "unit": "lb"
  },
  {
    "id": "PT2021300PNX592",
    "name": "1 Hundred Shoes/Cunha -Factory",
    "coordinates": [
      -8.2120117,
      41.35876870000001
    ],
    "material": "Lace",
    "amount": 24.76,
    "unit": "piece"
  },
  {
    "id": "PT2021125FX4ME3",
    "name": "1 HUNDRED SHOES,LDA",
    "coordinates": [
      -8.329868,
      40.668256
    ],
    "material": "Tweed",
    "amount": 63.2,
    "unit": "kg"
  },
  {
    "id": "GB2022307EHF42C",
    "name": "1Icon Ltd",
    "coordinates": [
      -0.1344294,
      51.5112139
    ],
    "material": "Cupro",
    "amount": 21.5,
    "unit": "lb"
  },
  {
    "id": "PT2021374YJL4PH",
    "name": "1 LifeStyle, Lda",
    "coordinates": [
      -8.3940581,
      41.538142
    ],
    "material": "Jersey",
    "amount": 33.77,
    "unit": "piece"
  },
  {
    "id": "JP2023019FT8ZND",
    "name": "1Ltd",
    "coordinates": [
      139.570301,
      35.673343
    ],
    "material": "Canvas",
    "amount": 45.9,
    "unit": "kg"
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

    // const transactions = await Transaction.find({
    //   $or: [
    //     { cost: { $regex: new RegExp(search, "i") } },
    //     { userId: { $regex: new RegExp(search, "i") } },
    //   ],
    // })
    //   .sort(sortFormatted)
    //   .skip(page * pageSize)
    //   .limit(pageSize);
    const transactions = transactionsDummy;

    console.log(transactions);

    const total = await Transaction.countDocuments({
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
