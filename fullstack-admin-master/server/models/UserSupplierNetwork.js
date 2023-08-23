import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSupplierNetworkSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'SupplierData',
        required: true
    },
    supplierId: {
        type: Schema.Types.ObjectId,
        ref: 'SupplierData',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    },
    connectionDate: {
        type: Date,
        default: Date.now
    }
});

// Ensure that the combination of userId and supplierId is unique
userSupplierNetworkSchema.index({ userId: 1, supplierId: 1 }, { unique: true });

const userSupplierNetwork = mongoose.model('UserSupplierNetwork', userSupplierNetworkSchema);
export default userSupplierNetwork;