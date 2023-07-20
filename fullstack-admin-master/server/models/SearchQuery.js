import mongoose from "mongoose";

const SearchQuerySchema = new mongoose.Schema(
  {
    techPackId: String,
    material: String,
    productCategory: String,
    deliveryDate: {
      type: Date,
      default: Date.now
    },
    fabricConstruction:{
      type: String,
      default:""
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
    orderId: {
        type:String, 
        default: ""
    }
  },
  { timestamps: true }
);

const SearchQuery = mongoose.model("SearchQueries", SearchQuerySchema);
export default SearchQuery;