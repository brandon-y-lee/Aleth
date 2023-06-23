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

    const transactions = await Shipments.find({
        userId:userId,
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

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


//TODO: Fix this to find out the set of eligible sellers
export const getEligibleSellers = async (req, res) => {
  try {
    const {orderId} = req.query;
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//Shipments where the recipient is the userID provided
export const getRecipientTransactions = async (req, res) => {
  try {
    console.log("hit it recipient");
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


//Fetch the chain of orders which share a common Shipment ID
export const getChainOfShipments = async (req, res) => {
  try {
    const chainID = req.query;
    const shipmentChain = await Shipments.find({
      $or: [
        { shipmentID: chainID.chainId },
      ],
    });

    console.log(shipmentChain);
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
    const {userId} = req.query;
    console.log(userId);
    console.log("Getting incoming requests", req.query);
    const userData = await UserData.find({
      userId: "2",
    });
    
    //TODO - Either find all the orders or the subset that the user is eligible for directly
    const orders = await OrderRequest.find({
      // material: userData.material
    });

    console.log(orders);

    const newOrders = orders?orders.filter(order => order.sellerStatuses[userId]!==undefined):[];
  
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

//Function for updating order requests on init/accept/reject operations by sellers/buyers
export const updateOrder = async (req, res) => {
  try{
    console.log("Updating purchase order", req.body);
    const {requestType, sellerIds, orderId, isSeller, acceptReject} = req.body;

    const order = await OrderRequest.find({orderId: orderId});

    if(order)
    {
      let sellerStatuses = order[0].sellerStatuses;

      //Buyer initiating the order, expressing interest in a subset of all possible sellers
      if(requestType == RequestType.INITORDER){
        let sellerStatuses = {};

        for(const sellerId of sellerIds)
          sellerStatuses[sellerId] = OrderStatus.NEWORDER;
      }

      //Buyer sending accept to one or many sellers of the subset of the sellers
      if(requestType == RequestType.BUYERACCEPT)
      {
        //Sanity Check
        if(isBuyer)
        {
          //Accept the ones the buyer sent
          for(const sellerId of sellerIds)
            sellerStatuses[sellerId] = OrderStatus.BUYERACCEPT;
          
          //Reject the others
          for (let key of sellerStatuses.keys()) {
              if(sellerStatuses[key] != OrderStatus.BUYERACCEPT)
                sellerStatuses[key] = OrderStatus.BUYERDENIED;
            }
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
            sellerStatuses[sellerIds[0]] = OrderStatus.SELLERACCEPT; 
      }

      //Seller sending reject request to the buyer
      if(requestType == RequestType.SELLERREJECT)
      {
        if(isSeller)
            sellerStatuses[sellerIds[0]] = OrderStatus.SELLERDENIED;   
      }
      
      //Set the updated seller statuses for the order
      await OrderRequest.updateOne({orderId},{sellerStatuses, sellerStatuses})
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
    const { id, userId, recipientId, material, amount, unit, prev, orderStatus } = req.body;

    // Check if a shipment with the given ID exists
    const existingShipment = await Shipments.findOne({ id });

    const userInfo = await UserData.findOne({userId: userId});

    if (existingShipment) {
      // Update the existing shipment with the new data
      existingShipment.userId = userId;
      existingShipment.recipientId = recipientId;
      existingShipment.name = userInfo.name;
      existingShipment.material = material;
      existingShipment.amount = amount;
      existingShipment.unit = unit;
      existingShipment.coordinates = userInfo.coordinates;
      existingShipment.prev = prev;
      existingShipment.orderStatus = orderStatus;

      await existingShipment.save();
      res.status(200).json({ message: "Shipment updated successfully" });
    } else {
      // Create a new shipment
      const newShipment = new Shipments({
        id,
        userId,
        recipientId,
        name: userInfo.name,
        material,
        amount,
        unit,
        coordinates: userInfo.coordinates,
        prev,
        orderStatus,
      });

      await newShipment.save();
      res.status(200).json({ message: "New shipment created successfully" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Function to add a new order request
export const createNewOrder = async (req, res) => {
  try {
    console.log("Generating new shipment", req.body);
    const { userId, material, quantity} = req.body;

    const eligibleSellers = await UserData.find({material:material});
    let sellerStatuses = {};

    //Set stasuses of eligible sellers as NEWORDER
    for(const eligibleSeller of eligibleSellers)
      sellerStatuses[eligibleSeller.userId] = OrderStatus.NEWORDER;

    const newOrder = new OrderRequest({
      buyerId : userId,
      buyerType: " ",
      material: material,
      quantity: quantity,
      sellerStatuses: sellerStatuses,
    });

    await newOrder.save();
    res.status(200).json({ message: "New order created successfully" });
    }
  catch (error) {
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
