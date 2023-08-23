import mongoose from "mongoose";


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
    Certifications: String,
    OtherCertifications: String,
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

const SupplierData = mongoose.model("SupplierData", SupplierDataSchema);
export default SupplierData;
