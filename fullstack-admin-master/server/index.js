import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";
import { login } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";


// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import UserData from "./models/UserData.js";
import OrderRequest from "./models/OrderRequest.js";
import SupplierData from "./models/SupplierData.js";

import {
  userData,
  dataShipments,
  dataOrderRequests,
  supplierdata
} from "./data/index.js";
import Shipments from "./models/Shipments.js";
import { OrderStatus } from "./configs/OrderStatus.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES WITH FILES */
app.post("/auth/register", register);
app.post("/auth/login", login);

/* ROUTES */
/* CLIENT FACING SIDEBAR OPTIONS */
app.use("/auth", authRoutes);
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    console.log("here");
    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // print("This is the shipmentsdata")
    // print(dataShipments);
    // Shipments.insertMany(dataShipments);
    // User.insertMany(dataUser);
    // UserData.insertMany(userData);
    // OrderRequest.insertMany(dataOrderRequests);
    // SupplierData.insertMany(supplierdata);
    console.log("Inserted")
  })
  .catch((error) => console.log(`${error} Did not connect`));


