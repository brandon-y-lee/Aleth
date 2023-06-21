import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Shipments from "../models/Shipments.js";
import getCountryIso3 from "country-iso-2-to-3";

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

//Shipments where the user is the userID provided
export const getTransactions = async (req, res) => {
  try {
    const { page=1, pageSize=20, sort=null, search="", userId="" } = req.query;
    console.log("Get Transactions");
    console.log(req.query);
    console.log(page, pageSize, sort, search, userId);

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // const transactions = await Shipments.find({
    //   $or: [
    //     { cost: { $regex: new RegExp(search, "i") } },
    //     { userId: { $regex: new RegExp(search, "i") } },
    //   ],
    // })
    const transactions = await Shipments.find({
        userId:userId,
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);
    // const transactions = transactionsDummy;

    console.log(transactions);
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


//Shipments where the recipient is the userID provided
export const getRecipientTransactions = async (req, res) => {
  try {
    console.log("hit it recipient");
    // print("here");
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "", userId = "1" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Shipments.find({recipientId:userId})
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

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


//Function for linking previous shipments 
export const updateRecipients = async (req, res) => {
  try{
    console.log("Update Recipients", req.body);
    const {senders, receivingOrderId} = req.body;
    console.log(senders, receivingOrderId);
    for (const sender of senders) {
      await Shipments.updateOne({ id: sender }, { next: receivingOrderId });
    }
    res.status(200).json({ message: "Recipients updated successfully" });
  } catch(error) {
    res.status(404).json({message: error.message});
  }

}


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
