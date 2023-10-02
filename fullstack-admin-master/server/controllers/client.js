import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import UserData from "../models/UserData.js";
import Transaction from "../models/Transaction.js";
import Shipments from "../models/Shipments.js";
import OrderRequest from "../models/OrderRequest.js";
import getCountryIso3 from "country-iso-2-to-3";
import { OrderStatus } from "../configs/OrderStatus.js";
import { RequestType } from "../configs/RequestType.js";
import { TechPackStatus } from "../configs/TechPackStatus.js";
import mongoose from "mongoose";
import SupplierData from "../models/SupplierData.js";
import PDFParser from 'pdf2json';
import fs from 'fs';
import {fabrics, productCategory, fabricConstruction} from '../configs/SearchLists.js';
import OrderTree from "../models/OrderTree.js";
import SearchQuery from "../models/SearchQuery.js";
import TechPack from "../models/TechPack.js";
import userSupplierNetwork from "../models/UserSupplierNetwork.js";


/* GET - TECH PACK */

export const getTechPacksForUser = async (req, res) => {
  const { userId } = req.query;
  console.log("Fetching all Tech Packs for userId: ", userId);
  try{
    const techPacks = await TechPack.find({buyerId: userId});
    if(techPacks)
      return res.status(200).json({techPacks});
  } catch(error){
    return res.json({message: error.message});
  }
}

export const getTechPack = async (req, res) => {
  const { techPackId } = req.query;
  console.log("Fetching Tech Pack with ID:", techPackId);

  try{
    const techPack = await TechPack.findOne({_id: techPackId});
    if(techPack)
      return res.status(200).json({techPack});
  } catch(error){
    return res.status(500).json({message: error.message});
  }
};

export const getQueriesForTechPack = async (req, res) => {
  const { techPackId } = req.query;
  console.log("Getting queries for techPackId: ", techPackId);

  if (!techPackId || techPackId === "null") {
    return res.status(400).json({ message: "TechPackId parameter is missing" });
  }

  try{
    const techPack = await TechPack.findOne({ _id: techPackId });

    if (techPack && techPack.queries) {
      const queries = await OrderRequest.find({ techPackId: techPackId });
  
      if (queries.length > 0) {
        return res.status(200).json({ techPackQueries: queries });
      } else {
        return res.status(404).json({ message: "No queries found for this Tech Pack." });
      }
    } else {
      return res.status(404).json({ message: "Tech Pack not found or has no queries." });
    }
  } catch (error){
    return res.status(500).json({message: error.message});
  }
};

export const getBulkSuppliers = async (req, res) => {
  const supplierIdsString = req.query.supplierIds || "";
  const supplierIdsArray = supplierIdsString.split(',');

  try {
    const suppliers = await SupplierData.find({ _id: { $in: supplierIdsArray } });
    return res.status(200).json(suppliers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrderRequestDetails = async (req, res) => {
  try {
    const { orderRequestId } = req.query;

    let sellerData = {
      'stats': { 'pending': 0, 'accepted': 0, 'rejected': 0 },
      'sellerStatus': {},
      'sellerNotes': {}
    };

    const orderRequest = await OrderRequest.findById(orderRequestId);
    console.log('orderRequest: ', orderRequest);

    if (orderRequest) {
      const supplierStatuses = orderRequest.supplierStatuses;
      console.log('supplierStasuses: ', supplierStatuses);
      const supplierNotes = orderRequest.supplierNotes;

      for (let supplierId in supplierStatuses) {
        const status = supplierStatuses[supplierId];
        const note = supplierNotes[supplierId];
        const supplierData = await SupplierData.findById(supplierId);

        if (supplierData) {
          sellerData['sellerStatus'][supplierId] = status;
          sellerData['sellerNotes'][supplierId] = note;

          if (status === OrderStatus.NEWORDER) {
            sellerData['stats']['pending'] += 1;
          }

          if (status === OrderStatus.SELLERACCEPT || status === OrderStatus.BUYERACCEPT) {
            sellerData['stats']['accepted'] += 1;
          }

          if (status === OrderStatus.SELLERDENIED || status === OrderStatus.BUYERDENIED) {
            sellerData['stats']['rejected'] += 1;
          }
        }
      }

      res.status(200).json({ sellerData });
    } else {
      res.status(404).json({ message: "OrderRequest not found." });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




/* GET - USER SUPPLIER NETWORK */

export const getSuppliersForUser = async (req, res) => {
  console.log("Finding Accepted Invites For User", req.query);
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const invites = await userSupplierNetwork.find({
      $or: [
        { userId: mongoose.Types.ObjectId(userId) },
        { supplierId: mongoose.Types.ObjectId(userId) }
      ],
      status: 'accepted'
    });
    console.log("Invites", invites);

    if (!invites || invites.length === 0) {
      return res.status(404).json({ message: "No suppliers found for this user" });
    }

    const profiles = [];
    for (let invite of invites) {
      const otherUserId = invite.userId.toString() === userId ? invite.supplierId : invite.userId;
      const profile = await SupplierData.findOne({_id: mongoose.Types.ObjectId(otherUserId)});
      profiles.push(profile);
    }

    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching suppliers for user:", error);
    res.status(500).json({ message: "Error fetching suppliers for user", error });
  }
};

export const getInvitesSentForUser = async (req, res) => {
  console.log("Finding Invites Sent For User", req.query);
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const invitesSent = await userSupplierNetwork.find({ userId: mongoose.Types.ObjectId(userId), status: 'pending' }).populate('supplierId');
    if (invitesSent.length === 0) {
      return res.status(404).json({ message: "Invites sent not found" });
    }
    res.status(200).json(invitesSent);
  } catch (error) {
    console.error("Error fetching invites sent:", error);
    res.status(500).json({ message: "Error fetching invites sent", error });
  }
};

export const getInvitesReceivedForUser = async (req, res) => {
  console.log("Finding Invites Received For User", req.query);
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const invitesReceived = await userSupplierNetwork.find({ supplierId: mongoose.Types.ObjectId(userId), status: 'pending' }).populate('userId');
    if (invitesReceived.length === 0) {
      return res.status(404).json({ message: "Invites received not found" });
    }
    res.status(200).json(invitesReceived);
  } catch (error) {
    console.error("Error fetching invites received:", error);
    res.status(500).json({ message: "Error fetching invites received", error});
  }
};

export const getInvitesForUser = async (req, res) => {
  console.log("Finding Invites For User", req.query);
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const allInvites = await userSupplierNetwork.find({
      $or: [
        { userId: mongoose.Types.ObjectId(userId) },
        { supplierId: mongoose.Types.ObjectId(userId) }
      ]
    });

    res.status(200).json(allInvites);
  } catch (error) {
    console.error("Error fetching invites for user:", error);
    res.status(500).json({ message: "Error fetching invites for user", error });
  }
}

export const getPendingInvitationsForUser = async (req, res) => {
  console.log("Finding Pending Invitations For User", req.query);
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const invitesSentCount = await userSupplierNetwork.countDocuments({ 
      userId: mongoose.Types.ObjectId(userId), 
      status: 'pending' 
    });

    const invitesReceivedCount = await userSupplierNetwork.countDocuments({ 
      supplierId: mongoose.Types.ObjectId(userId), 
      status: 'pending' 
    });

    const totalPending = invitesSentCount + invitesReceivedCount;

    res.status(200).json({ 
      invitesSent: invitesSentCount, 
      invitesReceived: invitesReceivedCount, 
      totalPending 
    });

  } catch (error) {
    console.error("Error fetching pending invitations:", error);
    res.status(500).json({ message: "Error fetching pending invitations", error });
  }
};

export const getCompanyName = async (req, res) => {
  console.log("Finding Company", req.query);
  const { query } = req.query;

  if (!query || query === "null") {
    return res.status(400).json({ message: "Query parameter is missing" });
  }
  
  try {
    const results = await SupplierData.aggregate([
      {
        $search: {
          index: "company",
          text: {
            query: query,
            path: {
              wildcard: "*"
            },
            fuzzy: {
              maxEdits: 1
            }
          }
        }
      },
      {
        $project: {
          Company: 1,
          Description: 1,
          YearFounded: 1,
          Employees: 1,
          Sales: 1,
          UserType: 1
        }
      }
    ]);

    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ message: "Error searching suppliers", error });
  }
};




/* POST - TECH PACK */

export const createNewTechPack = async (req, res) => {
  try {
    const { buyerId, buyerType, sku, product, quantity, queries } = req.body;

    const newTechPack = new TechPack({
      buyerId,
      buyerType,
      sku,
      product,
      quantity,
      queries
    });

    await newTechPack.save();
    res.status(200).json({ message: "New tech pack created successfully" });
  } catch (error) {
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
      let orderParams = sortedRows.slice(3, -3).map(row => {
        const item = row[1];
        const description = row[2].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
        const fabric = fabrics.find(fabric => new RegExp(`\\b${fabric.toLowerCase()}\\b`).test(description));
        const category = productCategory.find(category => new RegExp(`\\b${category.toLowerCase()}\\b`).test(description));
        const construction = fabricConstruction.find(construction => new RegExp(`\\b${construction.toLowerCase()}\\b`).test(description));
        return {
          item: item || '',
          fabric: fabric || '',
          productCategory: category || '',
          fabricConstruction: construction || '',
          description: description,
        };
      });

      orderParams = orderParams.filter(param => param.item || param.fabric || param.productCategory || param.fabricConstruction);
      console.log("PDF Done Parsing");
      res.status(200).json({tableData: orderParams});
    });

    pdfParser.parseBuffer(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEligibleSellersAdvanced = async (req, res) => {
  try {
    console.log("Finding Eligible Sellers Advanced", req.query);
    const { material, fabricConstruction } = req.query;

    const query = [
      {
        $project: {
          materialMatch: { $regexMatch: { input: "$Description", regex: new RegExp(material, 'i') } },
          fabricConstructionMatch: { $regexMatch: { input: "$Description", regex: new RegExp(fabricConstruction, 'i') } }
        }
      },
      {
        $addFields: {
          matchCount: {
            $add: [
              { $cond: ["$materialMatch", 1, 0] },
              { $cond: ["$fabricConstructionMatch", 1, 0] }
            ]
          }
        }
      },
      { $sort: { matchCount: -1 } }
    ];

    const eligibleSellers = await SupplierData.aggregate(query);

    if (eligibleSellers.length > 0)
      console.log(eligibleSellers[0]);

    res.status(200).json({ eligibleSellers });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const findEligibleSuppliers = async ({ material, fabricConstruction }) => {
  // Initialize the query array
  const query = [];

  // Create a conditional projection based on non-empty values
  const projectionFields = {};

  if (material) {
    projectionFields.materialMatch = { $regexMatch: { input: "$Description", regex: new RegExp(material, 'i') } };
  }

  if (fabricConstruction) {
    projectionFields.fabricConstructionMatch = { $regexMatch: { input: "$Description", regex: new RegExp(fabricConstruction, 'i') } };
  }

  // Only add the $project stage if there's something to project
  if (Object.keys(projectionFields).length > 0) {
    query.push({ $project: projectionFields });
  }

  // Add fields for matchCount calculation
  const matchCountCalc = [];

  if (material) {
    matchCountCalc.push({ $cond: ["$materialMatch", 1, 0] });
  }

  if (fabricConstruction) {
    matchCountCalc.push({ $cond: ["$fabricConstructionMatch", 1, 0] });
  }

  // Only add the $addFields stage if there's a condition to check
  if (matchCountCalc.length > 0) {
    query.push({ $addFields: { matchCount: { $add: matchCountCalc } } });
    query.push({ $match: { matchCount: { $gt: 0 } } });
    query.push({ $sort: { matchCount: -1 } });
  }

  // Execute the query
  const eligibleSuppliers = await SupplierData.aggregate(query);

  if (eligibleSuppliers.length > 0) {
    return eligibleSuppliers;
  } else {
    throw new Error('No eligible sellers found.');
  }
};

export const createNewTechPackAndSearchQueries = async (req, res) => {
  console.log("Creating Search Queries PDF: ", req.body);
  const { techPackParams, buyerId, buyerType, sku, product } = req.body;

  try {
    const newTechPack = new TechPack({
      buyerId: buyerId,
      buyerType: buyerType,
      product: product,
      sku: sku,
      status: TechPackStatus.NEWTECHPACK,
      queries: []
    });
    await newTechPack.save();

    const searchQueries = [];
    for (const param of techPackParams) {
      try {
        const eligibleSuppliers = await findEligibleSuppliers({ material: param.fabric, fabricConstruction: param.fabricConstruction });
        console.log(`Eligible Suppliers for ${param.fabric} and ${param.fabricConstruction}:`, eligibleSuppliers);
        const supplierIds = eligibleSuppliers.map(s => s._id);

        let supplierStatuses = {};
        let supplierNotes = {};
    
        supplierIds.forEach((supplierId) => {
          supplierStatuses[supplierId] = OrderStatus.NEWORDER;
          supplierNotes[supplierId] = "";
        })

        const searchQuery = new OrderRequest({
          buyerId: buyerId,
          buyerType: buyerType,
          techPackId: newTechPack._id,
          item: param.item,
          description: param.description,
          material: param.fabric,
          productCategory: param.productCategory,
          fabricConstruction: param.fabricConstruction,
          suppliers: supplierIds,
          supplierStatuses: supplierStatuses,
          supplierNotes: supplierNotes
          // deliveryDate: param.deliveryDate,
          // color: param.color,
          // quantity: param.quantity,
          // countryOfOrigin: param.countryOfOrigin,
        });

        await searchQuery.save();
        searchQueries.push(searchQuery._id);
      } catch (error) {
        console.error("Error finding eligible sellers: ", error);
      }
    }

    await TechPack.updateOne({_id: newTechPack._id}, {queries: searchQueries});

    // Fetch the updated TechPack
    const updatedTechPack = await TechPack.findById(newTechPack._id);
    res.status(200).json({
      message: "Tech Pack created successfully and Search Queries created",
      newTechPack: updatedTechPack
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
};

export const deleteTechPack = async (req, res) => {
  const { techPackId } = req.params;

  try {
    if (req.method === 'DELETE') {
      // Delete associated OrderRequest objects
      await OrderRequest.deleteMany({ techPackId: techPackId });

      // Delete the TechPack
      const techPack = await TechPack.findById(techPackId);
      await techPack.remove();
      if (techPack) {
        res.status(200).json({ message: "TechPack and associated OrderRequests deleted successfully." });
      } else {
        res.status(404).json({ message: "TechPack not found." });
      }
    } else {
      res.status(400).json({ message: "Invalid HTTP method." });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while processing the TechPack.", error });
  }
};

export const createNewOrder = async (req, res) => {
  try {
    console.log("Generating new order", req.body);
    const { 
      buyerId,
      buyerType,
      techPackId,
      material,
      productCategory,
      deliveryDate,
      fabricConstruction,
      color,
      quantity,
      countryOfOrigin,
      eligibleSuppliers
    } = req.body;

    let supplierStatuses = {};
    let supplierNotes = {};

    eligibleSuppliers.forEach((supplierId) => {
      supplierStatuses[supplierId] = OrderStatus.NEWORDER;
      supplierNotes[supplierId] = "";
    })

    const newOrder = new OrderRequest({
      buyerId : buyerId,
      buyerType: buyerType,
      techPackId: techPackId,
      material: material,
      productCategory: productCategory,
      deliveryDate: deliveryDate,
      fabricConstruction: fabricConstruction,
      color: color,
      quantity: quantity,
      countryOfOrigin: countryOfOrigin,
      eligibleSuppliers: eligibleSuppliers,
      supplierStatuses: supplierStatuses,
      supplierNotes: supplierNotes
    });

    await newOrder.save();
    res.status(200).json({ message: "New order created successfully" });
    }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Function for updating order requests on init/accept/reject operations by sellers/buyers
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




/* POST - USER SUPPLIER NETWORK */

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

export const sendInvite = async (req, res) => {
  try {
    console.log("Sending invite", req.body);
    const { userId, supplierId, status, connectionDate } = req.body;

    const newInvite = new userSupplierNetwork({
      userId,
      supplierId,
      status,
      connectionDate
    });

    await newInvite.save();
    res.status(200).json({ message: "New invite created successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateInviteStatus = async (req, res) => {
  try {
    console.log("Updating invite status", req.body);
    const { inviteId, status } = req.body;

    // Find the invite by its ID
    const invite = await userSupplierNetwork.findById(inviteId);
    if (!invite) {
      return res.status(404).json({ message: "Invite not found" });
    }

    // Update the status and connection date if the status is 'accepted'
    invite.status = status;
    if (status === 'accepted') {
      await invite.save();
      invite.connectionDate = new Date();
    }

    if (status === 'declined' || status === 'withdraw') {
      await invite.remove();
      return res.status(200).json({ message: "Invite declined and removed" });
    }
    res.status(200).json({ message: "Invite updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};















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



export const getSupplierData = async (req, res) => {
  try {
    console.log("Finding Supplier Data", req.query);
    const { userId } = req.query;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: "userId not provided" });
    }

    const supplierData = await SupplierData.findOne({_id: mongoose.Types.ObjectId(userId)});

    // Check if supplierData was found
    if (!supplierData) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({supplierData});
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

