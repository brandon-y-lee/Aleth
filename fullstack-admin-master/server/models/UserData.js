import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    description: String,
    city: String,
    country: String,
    userId: String,
    coordinates:[mongoose.Types.Decimal128],
    type: String,
    material: [String],
  },
  { timestamps: true }
);

const UserData = mongoose.model("UserData", UserSchema);
export default UserData;
