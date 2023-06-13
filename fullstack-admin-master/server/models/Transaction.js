import mongoose from "mongoose";

//Data columns : ID, Seller, Material, Amount, Unit, Date, Status

const TransactionSchema = new mongoose.Schema(
  {
    id: String,
    // sellerName: String,
    // recipientName: String,
    material: String,
    amount: Number,
    unit: Number,
    cost: String,
    // products: {
    //   type: [mongoose.Types.ObjectId],
    //   of: Number,
    // },
    coordinates:{
      lat: mongoose.Types.Decimal128,
      long: mongoose.Types.Decimal128,
<<<<<<< HEAD
    },
    prev: [String],
    next: [String]
=======
    }
>>>>>>> b17022ca06aacb0ea233f415c7cfba716f803f41
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
