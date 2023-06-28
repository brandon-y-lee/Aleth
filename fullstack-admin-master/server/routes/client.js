import express from "express";
import {
  getGeography,
  getTransactions,
  updateRecipients,
  generateNewShipment,
  getCustomers,
  getProducts,
  getIncomingRequests,
  getChainOfShipments,
  getPurchaseOrders,
  getRecipientTransactions,
  updateOrder,
  getEligibleSellers,
  getOrderSellerDetails
} from "../controllers/client.js";

const router = express.Router();

//GETs
router.get("/map", getGeography);
router.get("/shipments", getTransactions);
router.get("/order", getTransactions);
router.get("/recipientShipments", getRecipientTransactions);
router.get("/incomingRequests", getIncomingRequests);
router.get("/entity", getCustomers);
router.get("/templates", getProducts);
router.get("/chainOfShipments", getChainOfShipments);
router.get("/getIncomingRequests", getIncomingRequests);
router.get("/getPurchaseOrders", getPurchaseOrders)
router.get("/eligibleSellers", getEligibleSellers);
router.get("/orderSellerDetails", getOrderSellerDetails);

//POSTs
router.post("/updateRecipients", updateRecipients);
router.post("/generateNewShipment", generateNewShipment);
router.post("/updateOrder", updateOrder);


export default router;