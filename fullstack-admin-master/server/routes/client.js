import express from "express";
import {
  getGeography,
  getTransactions,
  getPredictiveTransactions,
  getCustomers,
  getProducts,
  getChainOfShipments
} from "../controllers/client.js";

const router = express.Router();

router.get("/map", getGeography);
router.get("/shipments", getTransactions);
router.get("/predshipments", getTransactions);
router.get("/entity", getCustomers);
router.get("/templates", getProducts);
router.get("/chainOfShipments", getChainOfShipments)



export default router;
