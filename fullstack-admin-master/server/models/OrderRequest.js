import mongoose from "mongoose";
import {OrderStatus} from "../configs/OrderStatus.js";

const OrderRequestSchema = new mongoose.Schema(
  {
    buyerId: String,
    buyerType: String,
    material: [String],
    productCategory: [String],
    deliveryDate: {
      type: Date,
      default: Date.now
    },
    fabricConstruction:{
      type: [String],
      default:[]
    },
    priceRange:{
      type: [Number],
      default: [0,100000]
    },
    unitWeight: {
      type: Number,
      default: 0
    },
    patternPrint:{
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    countryOfOrigin: {
      type: String,
      default:""
    },
    quantity: Number,
    orderStatus: {
        type: Number,
        enum: Object.values(OrderStatus),
        default: OrderStatus.NEWORDER
      },
    
    sellerStatuses: {},
    sellerNotes: {}
  },
  { timestamps: true }
);

const OrderRequest = mongoose.model("OrderRequest", OrderRequestSchema);
export default OrderRequest;
