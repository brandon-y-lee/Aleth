import mongoose from "mongoose";
import {OrderStatus} from "./OrderStatus.js";

const OrderRequestSchema = new mongoose.Schema(
  {
    buyerId: String,
    buyerType: String,
    material: String,
    quantity: String,
    orderStatus: {
        type: Number,
        enum: Object.values(OrderStatus),
        default: OrderStatus.NEWORDER
      },
    sellerStatuses: {String:Number}
  },
  { timestamps: true }
);

const OrderRequest = mongoose.model("OrderRequest", OrderRequestSchema);
export default OrderRequest;
