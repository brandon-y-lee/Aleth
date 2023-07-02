import mongoose from "mongoose";

//Data columns : ID, Seller, Material, Amount, Unit, Date, Status

const SupplierDataSchema = new mongoose.Schema(
  {
    id: Number,
    Company: String,
    URL: String,
    Address: String,
    City: String,
    State: String,
    Zip: String,
    Details: String,
    Diversity: String,
    Employees: String,
    Sales: String,
    UserType: String,
    YearFounded: mongoose.Types.Decimal128,
    ExportMarkets: String,
    Description: String,
    Products:[String]
  },
  { timestamps: true }
);

const SupplierData = mongoose.model("supplierdata", SupplierDataSchema);
export default SupplierData;
