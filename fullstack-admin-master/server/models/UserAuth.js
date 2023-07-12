import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import SupplierData from "./SupplierData.js";

const UserAuthSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'supplierdata' }
});

UserAuthSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const UserAuth = mongoose.model('UserAuth', UserAuthSchema);

export default UserAuth;