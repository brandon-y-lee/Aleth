import mongoose from "mongoose";

const OrderTreeSchema = new mongoose.Schema(
  {
    id: String,
    buyerId: String,
    buyerType: String,
    material: String,
    productCategory: String,
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
    countryOfOrigin: {
      type: String,
      default:""
    },
    quantity: Number,
    orderQueries: {
        type: [String],
        default: []
      },
  },
  { timestamps: true }
);

const OrderTree = mongoose.model("OrderTree", OrderTreeSchema);
export default OrderTree;
