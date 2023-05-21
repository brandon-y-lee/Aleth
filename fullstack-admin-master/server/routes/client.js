import express from "express";
import {
  getGeography,
  getTransactions,
  getCustomers,
  getProducts,
} from "../controllers/client.js";

const router = express.Router();

router.get("/map", getGeography);
router.get("/shipments", getTransactions);
router.get("/entity", getCustomers);
router.get("/templates", getProducts);




export default router;
