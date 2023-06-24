import mongoose from "mongoose";
import {OrderStatus} from "../configs/OrderStatus.js";

const OrderRequestSchema = new mongoose.Schema(
  {
    buyerId: String,
    buyerType: String,
    material: String,
    quantity: Number,
    orderStatus: {
        type: Number,
        enum: Object.values(OrderStatus),
        default: OrderStatus.NEWORDER
      },
    sellerStatuses: {}
  },
  { timestamps: true }
);

const OrderRequest = mongoose.model("OrderRequest", OrderRequestSchema);
export default OrderRequest;
