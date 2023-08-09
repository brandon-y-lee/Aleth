const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSupplierNetworkSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserData', // Assuming 'UserData' is the name of your user model
        required: true
    },
    supplierId: {
        type: Schema.Types.ObjectId,
        ref: 'SupplierData', // Assuming 'SupplierData' is the name of your supplier model
        required: true
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