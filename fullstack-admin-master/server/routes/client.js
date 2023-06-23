import express from "express";
import {
  getGeography,
  getTransactions,
  updateRecipients,
  generateNewShipment,
  getCustomers,
  getProducts,
  getChainOfShipments,
  getIncomingRequests,
  getRecipientTransactions
  ,updateOrder
} from "../controllers/client.js";

const router = express.Router();

//GETs
router.get("/map", getGeography);
router.get("/shipments", getTransactions);
router.get("/recipientShipments", getRecipientTransactions);
router.get("/entity", getCustomers);
router.get("/templates", getProducts);
router.get("/chainOfShipments", getChainOfShipments);
router.get("/getIncomingRequests", getIncomingRequests);

//POSTs
router.post("/updateRecipients", updateRecipients);
router.post("/generateNewShipment", generateNewShipment);
router.post("/updateOrderRequest", updateOrder);


export default router;
