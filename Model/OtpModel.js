import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    email: { type: String, required: true },
    hashedOTP: { type: String, required: true },
    createdAt: { type: Date, expires: 300, default: Date.now },
});

export const OTPModel = mongoose.model('OTP', otpSchema);


