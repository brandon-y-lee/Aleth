import mongoose from 'mongoose';

const techPackSchema = mongoose.Schema(
    {
      buyerId: String,
      buyerType: String,
      sku: String,
      product: String,
      quantity: Number,
      status: {
        type: Number,
        enum: [0, 1, 2]
      },
      queries: {
        type: [String],
        default: []
      },
    },
    { timestamps: true } 
);

const TechPack = mongoose.model('TechPack', techPackSchema);
export default TechPack;
