import mongoose from 'mongoose';

const techPackSchema = mongoose.Schema(
    {
      buyerId: String,
      buyerType: String,
      sku: String,
      product: String,
      quantity: Number,
      queries: {
        type: [String],
        default: []
      },
    },
    { timestamps: true } 
);

const TechPack = mongoose.model('TechPack', techPackSchema);
export default TechPack;
