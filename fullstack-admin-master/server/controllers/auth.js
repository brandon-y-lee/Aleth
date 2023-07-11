import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SupplierData from "../models/SupplierData.js";
import UserAuth from "../models/UserAuth.js";
/* REGISTER USER */

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            city,
            state,
            country,
            occupation,
            phoneNumber,
            transactions,
            role
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: passwordHash,
            city,
            state,
            country,
            occupation,
            phoneNumber,
            transactions,
            role 
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, ID, password } = req.body;

        const user = await UserAuth.findOne({ id:ID }).populate('supplier');
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        const { password: _, ...userInfo } = user.toObject();
        res.status(200).json({ token, user: userInfo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
