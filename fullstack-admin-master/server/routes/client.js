import express from "express";
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

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
  createNewOrder,
  getEligibleSellers,
  getOrderSellerDetails,
  getEligibleSellersAdvanced,
  processTechPack,
  getSupplierData,
  getTechPack,
  getQueriesForTechPack,
  getTechPacksForUser,
  createSearchQueries,
  createNewTechPack
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
router.get("/eligibleSellersAdvanced", getEligibleSellersAdvanced);
router.get("/orderSellerDetails", getOrderSellerDetails);
router.get("/supplierData", getSupplierData);

//GET - Techpack
router.get("/getTechPack", getTechPack);
router.get("/getTechpacksForUser", getTechPacksForUser);
router.get("/getQueriesForTechPack", getQueriesForTechPack);

//POSTs
router.post("/updateRecipients", updateRecipients);
router.post('/processPDF', upload.single('file'), processTechPack);
router.post("/generateNewShipment", generateNewShipment);
router.post("/updateOrder", updateOrder);
router.post("/createNewOrder", createNewOrder);

//POSTs - Techpacks
router.post('/createSearchQueries', createSearchQueries);
router.post('/createNewTechPack', createNewTechPack);


export default router;