import mongoose from 'mongoose';

const techPackSchema = mongoose.Schema(
    {
      userId: String,
      buyerType: String,
      material: String,
      productCategory: String,
      queries: {
        type: [String],
        default: []
      },
    },
    { timestamps: true } 
);

const TechPack = mongoose.model('TechPack', techPackSchema);
export default TechPack;
