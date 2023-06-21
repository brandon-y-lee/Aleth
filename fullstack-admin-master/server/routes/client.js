import express from "express";
import {
  getGeography,
  getTransactions,
  updateRecipients,
  getCustomers,
  getProducts,
  getChainOfShipments,
  getRecipientTransactions
} from "../controllers/client.js";

const router = express.Router();

router.get("/map", getGeography);
router.get("/shipments", getTransactions);
router.post("/updateRecipients", updateRecipients);
router.get("/recipientShipments", getRecipientTransactions);
router.get("/entity", getCustomers);
router.get("/templates", getProducts);
router.get("/chainOfShipments", getChainOfShipments)



export default router;
