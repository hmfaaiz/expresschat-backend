const mongoose = require("mongoose");

const userVerificationSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    otp: { type: String},
    

  },

  { timestamps: true }
);

module.exports = mongoose.model("userVerification", userVerificationSchema);