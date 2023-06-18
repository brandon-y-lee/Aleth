import mongoose from 'mongoose';

// Data columns : ID, Seller, Material, Amount, Unit, Date, Status
const HackShipmentsSchema = new mongoose.Schema(
  {
    id: String,
    coordinates:[mongoose.Types.Decimal128],
    name: String,
    country_code: String
  },
  { timestamps: true }
);

const HackShipments = mongoose.model('hackathon', HackShipmentsSchema);

export default HackShipments;