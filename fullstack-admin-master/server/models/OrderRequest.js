import mongoose from "mongoose";
import {OrderStatus} from "../configs/OrderStatus.js";

const OrderRequestSchema = new mongoose.Schema(
  {
    buyerId: String,
    buyerType: String,
    techPackId: String,
    material:{
      type: String,
      default:""
    },
    productCategory:{
      type: String,
      default:""
    },
    fabricConstruction:{
      type: String,
      default:""
    },
    color: {
      type: String,
      default: ""
    },
    quantity: Number,
    countryOfOrigin: {
      type: String,
      default:""
    },
    deliveryDate: {
      type: Date,
      default: Date.now
    },
    orderStatus: {
      type: Number,
      enum: Object.values(OrderStatus),
      default: OrderStatus.NEWORDER
    },
    suppliers:{
      type: [String],
      default: []
    },
    supplierStatuses: {},
    supplierNotes: {}
  },
  { timestamps: true }
);

const OrderRequest = mongoose.model("OrderRequest", OrderRequestSchema);
export default OrderRequest;
