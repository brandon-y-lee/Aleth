import express from "express";
import {
  getGeography,
  getTransactions,
  updateRecipients,
  generateNewShipment,
  getCustomers,
  getProducts,
  getChainOfShipments,
  getRecipientTransactions
} from "../controllers/client.js";

const router = express.Router();

//GETs
router.get("/map", getGeography);
router.get("/shipments", getTransactions);
router.get("/recipientShipments", getRecipientTransactions);
router.get("/entity", getCustomers);
router.get("/templates", getProducts);
router.get("/chainOfShipments", getChainOfShipments);

//POSTs
router.post("/updateRecipients", updateRecipients);
router.post("/generateNewShipment", generateNewShipment);


export default router;
