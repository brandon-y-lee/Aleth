import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import UserData from "../models/UserData.js";
import Transaction from "../models/Transaction.js";
import Shipments from "../models/Shipments.js";
import OrderRequest from "../models/OrderRequest.js";
import getCountryIso3 from "country-iso-2-to-3";
import { OrderStatus } from "../configs/OrderStatus.js";
import {RequestType} from "../configs/RequestType.js";
import mongoose from "mongoose";
import SupplierData from "../models/SupplierData.js";
import PDFParser from 'pdf2json';
import fs from 'fs';
import {fabrics, productCategory, fabricConstruction} from '../configs/SearchLists.js';
import OrderTree from "../models/OrderTree.js";
import SearchQuery from "../models/SearchQuery.js";
import TechPack from "../models/TechPack.js";
import userSupplierNetwork from "../models/UserSupplierNetwork.js";



//Shipments where the user is the userID provided
export const getTransactions = async (req, res) => {
  try {
    const { page=1, pageSize=20, sort=null, search="", userId="" } = req.query;
    console.log("Get Transactions", req.query);

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
        userId:userId,
    })
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


//TODO: Fix this to find out the set of eligible sellers
export const getEligibleSellers = async (req, res) => {
  try {
    console.log("Finding Eligible Sellers", req.query);
    const {material} = req.query;

    const eligibleSellers = await UserData.find({material:material});
    res.status(200).json({eligibleSellers});
    }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEligibleSellersAdvanced = async (req, res) => {
  try {
    console.log("Finding Eligible Sellers Advanced", req.query);
    const { products, material, fabricConstruction, certifications } = req.query;
    const eligibleSellers = await SupplierData.find({
      // $text: { $search: `${material}` },
      'Products': { $in: [products] }
    });
    if(eligibleSellers.length > 0)
      console.log(eligibleSellers[0]);

    res.status(200).json({eligibleSellers});
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const processTechPack = async (req, res) => {
  console.log("Processing PDF: ", req.file);
  try {
      if (!req.file) {
          return res.status(400).json({ message: 'No file provided' });
      }

      const pdfParser = new PDFParser();

      pdfParser.on('pdfParser_dataError', err => {
          console.error('Error parsing PDF:', err.parserError);
          res.status(500).json({ message: 'Error parsing PDF' });
      });

      pdfParser.on('pdfParser_dataReady', async pdfData => {
          let tableStarted = false;
          const tableRows = [];
          
          for (const textItem of pdfData.Pages[0].Texts) {
              const text = decodeURIComponent(textItem.R[0].T);
              if (text.includes('BILL OF MATERIALS')) {
                  tableStarted = true;
              }
              if (text.includes('WHILE EVERY CARE IS TAKEN')) {
                  tableStarted = false;
              }
              if (tableStarted) {
                  const yPos = textItem.y;
                  let row = tableRows.find(r => r.yPos === yPos);
                  if (!row) {
                      row = { yPos, data: [] };
                      tableRows.push(row);
                  }
                  row.data.push(text);
              }
          }

          const sortedRows = tableRows.sort((a, b) => a.yPos - b.yPos).map(row => row.data);
          let orderParams = sortedRows.slice(2, -3).map(row => {
              const description = row[2].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
              const fabric = fabrics.find(fabric => new RegExp(`\\b${fabric.toLowerCase()}\\b`).test(description));
              const category = productCategory.find(category => new RegExp(`\\b${category.toLowerCase()}\\b`).test(description));
              const construction = fabricConstruction.find(construction => new RegExp(`\\b${construction.toLowerCase()}\\b`).test(description));
              return {
                  fabric: fabric || '',
                  productCategory: category || '',
                  fabricConstruction: construction || '',
                  description: description,
              };
          });

          orderParams = orderParams.filter(param => param.fabric || param.productCategory || param.fabricConstruction);
          res.status(200).json({tableData: orderParams});
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const getTechPacksForUser = async(req, res) => {
  const {userId} = req.body
  console.log("Fetching all Tech Packs for userId: ", userId);
  try{
    const techPacks = await OrderTree.find({buyerId: userId});
    if(techPacks)
      return res.status(200).json({techPacks});
  } catch(error){
    return res.json({message: error.message});
  }
}

export const getTechPack = async(req, res) => {
  console.log("Fetching Tech Pack:", req.query);
  const {techPackId} = req.query;
  try{
    const techPack = await OrderTree.findOne({id: techPackId});
    if(techPack)
      return res.status(200).json({techPack});
  } catch(error){
    return res.status(500).json({message: error.message});
  }
}

export const createSearchQueries = async (req, res) => {
  console.log("Creating Search Queries PDF: ", req.body);
  const {orderParams, buyerId, buyerType} = req.body;
  try {

      const newId = generateID();

      const newOrderTree = new OrderTree({
        id : newId,
        buyerType: buyerType,
        buyerId: buyerId,
        material: "",
        quantity: "",
      });  
      await newOrder.save();

      // Create SearchQueries from orderParams
      const searchQueries = [];
      for (const param of orderParams) {
        const searchQuery = new SearchQuery({
          material: param.fabric,
          productCategory: param.productCategory,
          fabricConstruction: param.fabricConstruction,
          orderId: newId
          // Add other fields as needed
        });
    
        await searchQuery.save();
        searchQueries.push(searchQuery._id);
      }

      await OrderTree.updateOne({id: newId},{orderQueries: searchQueries});
      res.status(200).json({"msg":"Created Successfully"});
  } catch (error) {
      res.status(500).json({ message: error.message });
  };
}

export const getQueriesForTechPack = async (req, res) => {
  try{
    const {techPackId} = req.query;
    console.log("Getting queries for techpackID: ", techPackId);
    const techPackQueries = await SearchQuery.find({techPackId: techPackId});
    console.log(techPackQueries);
    return res.status(200).json({techPackQueries});
  } catch (error){
    return res.status(500).json({message: error.message});
  }
}


export const getSupplierData = async (req, res) => {
  try {
    console.log("Finding Supplier Data", req.query);
    const { userId } = req.query;
    const supplierData = await SupplierData.findOne({_id: mongoose.Types.ObjectId(userId)});
    res.status(200).json({supplierData});
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//TODO: Fix this to find out the set of eligible sellers
export const getPurchaseOrders = async (req, res) => {
  try {
    console.log("Fetching purchase orders", req.query);
    const {userId} = req.query;

    const allOrders = await OrderRequest.find({buyerId:userId});
    res.status(200).json({allOrders});
    }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//Shipments where the recipient is the userID provided
export const getRecipientTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "", userId = "1" } = req.query;

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

//Get the details of the sellers who have accepted or rejected the purchase orders
export const getOrderSellerDetails = async (req, res) => {
  //TODO: Fix .replace() calls
  try {
    const {orderId} = req.query;
    console.log(req.query);

    let userData = {};
    userData['stats'] = {"pending":0, "accepted":0, "rejected":0};
    userData['userDetails'] = [];
    userData['userStatus'] = {};
    userData['userNotes'] = {};
    const order = await OrderRequest.find({_id: new mongoose.Types.ObjectId(orderId)});
    console.log(order);
    if(order.length)
    {
      const sellerList = order[0].sellerStatuses;
      const sellerNoteList = order[0].sellerNotes;

      for(let seller in sellerList)
      {
        const status = sellerList[seller];
        const note = sellerNoteList[seller.replace(/["']/g, "")];
        let userDeet = await SupplierData.findOne({_id:seller.replace(/["']/g, "")});
        
        if(userDeet)
        {
          userData['userStatus'][seller.replace(/["']/g, "")] = status;
          userData['userNotes'][seller.replace(/["']/g, "")] = note;
    
          if(status === OrderStatus.NEWORDER)
            userData['stats']['pending'] += 1;
        
          if(status === OrderStatus.SELLERACCEPT || status === OrderStatus.BUYERACCEPT)
          {
            userData['stats']['accepted'] += 1;
          }

          if(status === OrderStatus.SELLERDENIED || status === OrderStatus.BUYERDENIED)
            userData['stats']['rejected'] += 1;
          
          userData['userDetails'].push(userDeet); 
        }
      }
      console.log(userData);   
      res.status(200).json({
        userData
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Fetch the chain of orders which share a common Shipment ID
export const getChainOfShipments = async (req, res) => {
  try {
    const chainID = req.query;
    const shipmentChain = await Shipments.find({
      $or: [
        { shipmentID: chainID.chainId },
      ],
    });

    // console.log(shipmentChain);
    res.status(200).json({
      shipmentChain,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Shipments Page (Seller View) - Fetch all purchase orders that the logged in user is eligible for.
export const getIncomingRequests = async (req, res) => {
  try {
    const {userid} = req.query;
    console.log(userid);
    console.log("Getting incoming requests", req.query);
    const userData = await SupplierData.find({
      userId: userid,
    });
    
    //TODO - Either find all the orders or the subset that the user is eligible for directly
    const orders = await OrderRequest.find({
      // material: userData.material
    });
    console.log(orders);
    // console.log(orders);

    const newOrders = orders?orders.filter(order => order.sellerStatuses[userid]!==undefined):[];
  
    res.status(200).json({
      newOrders
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//On the shipments page, for linking previous shipments to the current visible shipment 
export const updateRecipients = async (req, res) => {
  try{
    console.log("Update Recipients", req.body);
    const {senders, receivingOrderId, shipmentID} = req.body;
    for (const sender of senders) {
      await Shipments.updateOne({ id: sender }, { next: receivingOrderId });
    }
    await Shipments.updateOne({id: receivingOrderId}, {shipmentID:shipmentID});
    res.status(200).json({ message: "Recipients updated successfully" });
  } catch(error) {
    res.status(404).json({message: error.message});
  }

}

//Function for updating order requests on init/accept/reject operations by sellers/buyers
export const updateOrder = async (req, res) => {
  try{
    console.log("Updating purchase order", req.body);
    const {requestType, sellerIds, orderId, isSeller, notes} = req.body;
    console.log(sellerIds);
    console.log(orderId);
    const order = await OrderRequest.find({_id: new mongoose.Types.ObjectId(orderId[0])});
    console.log(order);
    let orderStatus = OrderStatus.INITORDER;
    if(order)
    {
      let sellerStatuses = order[0].sellerStatuses;
      let sellerNotes = order[0].sellerNotes;
      console.log("Seller Statuses", sellerStatuses);
      //Buyer initiating the order, expressing interest in a subset of all possible sellers
      if(requestType == RequestType.INITORDER){
        orderStatus = OrderStatus.INITORDER;
        let sellerStatuses = {};
        let sellerNotes = {};

        for(const sellerId of sellerIds)
        {
          sellerStatuses[sellerId] = OrderStatus.NEWORDER;
          sellerNotes[sellerId] = "";
        }
      }

      //Buyer sending accept to one or many sellers of the subset of the sellers
      if(requestType == RequestType.BUYERACCEPT)
      {
        //Sanity Check
        if(!isSeller)
        {
          orderStatus = OrderStatus.BUYERACCEPT;
          //Accept the ones the buyer sent
          for(const sellerId of sellerIds)
            sellerStatuses[sellerId] = OrderStatus.BUYERACCEPT;
        
          //Reject the others
          for (let key of Object.keys(sellerStatuses)) {
              if(sellerStatuses[key] != OrderStatus.BUYERACCEPT)
                sellerStatuses[key] = OrderStatus.BUYERDENIED;
            }
          //TODO: change the order status to BUYERACCEPT here. Do an UpdateOne call.
        }
      }

      //Buyer sending reject request to one or many sellers of the subset of sellers
      if(requestType == RequestType.BUYERDENIED)
      {
        //Sanity Check
        if(isBuyer)
        {
          //Accept the ones the buyer sent
          for(const sellerId of sellerIds)
            sellerStatuses[sellerId] = OrderStatus.BUYERDENIED;
        }
      }

      //Seller sending accept request to the buyer
      if(requestType == RequestType.SELLERACCPET)
      {
        if(isSeller)
        {
            orderStatus = OrderStatus.SELLERACCEPT;
            sellerStatuses[sellerIds[0]] = OrderStatus.SELLERACCEPT; 
            sellerNotes[sellerIds[0]] = notes;
        }
      }

      //Seller sending reject request to the buyer
      if(requestType == RequestType.SELLERREJECT)
      {
        if(isSeller)
            sellerStatuses[sellerIds[0]] = OrderStatus.SELLERDENIED;   
      }
      console.log("Final Status", sellerStatuses);
      //Set the updated seller statuses for the order
      await OrderRequest.updateOne({_id: new mongoose.Types.ObjectId(orderId[0])},{sellerStatuses: sellerStatuses, sellerNotes: sellerNotes})
    }
    res.status(200).json({ message: "Order updated successfully" });
  } catch(error) {
    res.status(404).json({message: error.message});
  }
};

//Function to add a new shipment or update the status of an existing shipment
export const generateNewShipment = async (req, res) => {
  try {
    console.log("Generating new shipment", req.body);
    const { userId, recipientId, material, amount, unit, orderStatus } = req.body;

    // Check if a shipment with the given ID exists
    const total = await Shipments.countDocuments({});
    const newId = generateID();

    const userInfo = await SupplierData.findOne({id: userId});

    //TODO : Draft Shipment
    // if (existingShipment) {
    //   // Update the existing shipment with the new data
    //   existingShipment.userId = userId;
    //   existingShipment.recipientId = recipientId;
    //   existingShipment.name = userInfo.name;
    //   existingShipment.material = material;
    //   existingShipment.amount = amount;
    //   existingShipment.unit = unit;
    //   existingShipment.coordinates = userInfo.coordinates;
    //   existingShipment.prev = "";
    //   existingShipment.orderStatus = orderStatus;

    //   await existingShipment.save();
    //   res.status(200).json({ message: "Shipment updated successfully" });
    // } else {
    // Create a new shipment
    const newShipment = new Shipments({
      id: newId,
      userId,
      recipientId,
      name: userInfo.Company,
      material,
      amount,
      unit,
      coordinates: [0,0],
      prev: "",
      orderStatus,
    });

      await newShipment.save();
      res.status(200).json({ message: "New shipment created successfully" });
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const generateNewOrderTree = async (req, res) => {
  try {
    console.log("Generating new order", req.body);
    const { buyerId, buyerType, material, productCategory, deliveryDate, fabricConstruction, orderRequests } = req.body;

    // Generate a new ID. This assumes that you have a function called generateID() similar to the one in the original function.
    // const newId = generateID();

    const userInfo = await UserData.findOne({id: buyerId});

    // Create a new order tree
    const newOrder = new OrderTree({
      buyerId,
      buyerType,
      material,
      productCategory,
      deliveryDate,
      fabricConstruction,
      priceRange,
      unitWeight,
      patternPrint,
      countryOfOrigin,
      quantity,
      orderRequests
    });

    await newOrder.save();
    res.status(200).json({ message: "New order created successfully" });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//Function to add a new order request
export const createNewOrder = async (req, res) => {
  try {
    console.log("Generating new order", req.body);
    const { userId, material, quantity, sellers} = req.body;

    // const eligibleSellers = await UserData.find({material:material});
    let sellerStatuses = {};
    let sellerNotes = {};
    for(const seller of sellers)
    {
      sellerStatuses[seller] = OrderStatus.NEWORDER;
      sellerNotes[seller] = "";
    }

    // //Set stasuses of eligible sellers as NEWORDER
    // for(const eligibleSeller of eligibleSellers)
    //   sellerStatuses[eligibleSeller.userId] = OrderStatus.NEWORDER;

    const newOrder = new OrderRequest({
      buyerId : userId,
      buyerType: " ",
      material: material,
      quantity: quantity,
      sellerStatuses: sellerStatuses,
      sellerNotes: sellerNotes
    });

    await newOrder.save();
    res.status(200).json({ message: "New order created successfully" });
    }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNewTechPack = async (req, res) => {
  try {
    const { userId, buyerType, material, productCategory, queries } = req.body;

    const newTechPack = new TechPack({
      userId,
      buyerType,
      material,
      productCategory,
      queries
    });

    await newTechPack.save();
    res.status(200).json({ message: "New tech pack created successfully" });
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

/* USER SUPPLIER NETWORK */
export const addSupplierToUserNetwork = async (userId, supplierId) => {
  try {
      const networkEntry = new userSupplierNetwork({
          userId: userId,
          supplierId: supplierId
      });
      await networkEntry.save();
      console.log('Supplier added to user network successfully!');
  } catch (error) {
      console.error('Error adding supplier to user network:', error);
  }
};

export const getSuppliersForUser = async (userId) => {
  try {
      const suppliers = await userSupplierNetwork.find({ userId: userId }).populate('supplierId');
      return suppliers.map(entry => entry.supplierId);
  } catch (error) {
      console.error('Error fetching suppliers for user:', error);
  }
};


function generateID() {
  // get current year
  const year = new Date().getFullYear();
  
  // generate a 3-digit random number
  const randomDigits = Math.floor(Math.random() * 899) + 100; // This will generate a number between 100 and 999
  
  // generate 2 random uppercase letters
  const randomChars = String.fromCharCode(
    65 + Math.floor(Math.random() * 26), // This will generate a number between 65(A) and 90(Z)
    65 + Math.floor(Math.random() * 26)
  );
  
  // concatenate the parts
  const id = 'PT' + year + randomDigits + randomChars;
  
  return id;
}

console.log(generateID()); // e.g., PT2023756HS

