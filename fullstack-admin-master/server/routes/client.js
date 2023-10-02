import express from "express";
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

import {
  getTransactions,
  updateRecipients,
  generateNewShipment,
  getIncomingRequests,
  getChainOfShipments,
  getRecipientTransactions,
  updateOrder,
  createNewOrder,
  getOrderSellerDetails,
  getEligibleSellersAdvanced,
  processTechPack,
  getSupplierData,
  getTechPack,
  getQueriesForTechPack,
  getTechPacksForUser,
  createNewTechPack,
  getSuppliersForUser,
  addSupplierToUserNetwork,
  getCompanyName,
  sendInvite,
  updateInviteStatus,
  getInvitesSentForUser,
  getInvitesReceivedForUser,
  getPendingInvitationsForUser,
  getInvitesForUser,
  createNewTechPackAndSearchQueries,
  getBulkSuppliers,
  getOrderRequestDetails,
  deleteTechPack,
} from "../controllers/client.js";

const router = express.Router();

//GETs
router.get("/shipments", getTransactions);
router.get("/order", getTransactions);
router.get("/recipientShipments", getRecipientTransactions);
router.get("/incomingRequests", getIncomingRequests);
router.get("/chainOfShipments", getChainOfShipments);
router.get("/getIncomingRequests", getIncomingRequests);
router.get("/eligibleSellersAdvanced", getEligibleSellersAdvanced);
router.get("/orderSellerDetails", getOrderSellerDetails);
router.get("/supplierData", getSupplierData);


//GET - Techpack
router.get("/getTechPack", getTechPack);
router.get("/getTechPacksForUser", getTechPacksForUser);
router.get("/getQueriesForTechPack", getQueriesForTechPack);
router.get("/getBulkSuppliers", getBulkSuppliers);
router.get("/getOrderRequestDetails", getOrderRequestDetails);

//GET - User Supplier Network
router.get("/getSuppliersForUser", getSuppliersForUser);
router.get("/search", getCompanyName);
router.get("/getInvitesSentForUser", getInvitesSentForUser);
router.get("/getInvitesReceivedForUser", getInvitesReceivedForUser);
router.get("/getPendingInvitationsForUser", getPendingInvitationsForUser);
router.get("/getInvitesForUser", getInvitesForUser);

//POSTs
router.post("/updateRecipients", updateRecipients);
router.post('/processTechPack', upload.single('file'), processTechPack);
router.post("/generateNewShipment", generateNewShipment);

//POSTS - QUERIES
router.post("/createNewOrder", createNewOrder);
router.post("/updateOrder", updateOrder);

//POSTs - Techpacks
router.post('/createNewTechPack', createNewTechPack);
router.post('/createNewTechPackAndSearchQueries', createNewTechPackAndSearchQueries);
router.delete('/deleteTechPack/:techPackId', deleteTechPack);

//POSTS - User Supplier Network
router.post("/addSupplierToUserNetwork", addSupplierToUserNetwork);
router.post("/sendInvite", sendInvite);
router.post("/updateInviteStatus", updateInviteStatus);

export default router;