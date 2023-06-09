import mongoose from "mongoose";
import {OrderStatus} from "./OrderStatus.js";

//Data columns : ID, Seller, Material, Amount, Unit, Date, Status

const ShipmentsSchema = new mongoose.Schema(
  {
    id: String,
    userId: String,
    recipientId: String,
    name: String,
    material: String,
    amount: Number,
    unit: String,
    coordinates:[mongoose.Types.Decimal128],
    prev: [String],
    next: String,
    shipmentID: String,
    orderStatus: {
      type: Number,
      enum: Object.values(OrderStatus),
      default: OrderStatus.DRAFT
    }
  },
  { timestamps: true }
);

const Shipments = mongoose.model("DummyShipments", ShipmentsSchema);
export default Shipments;
