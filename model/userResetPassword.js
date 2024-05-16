const mongoose = require("mongoose");

const userResetPasswordSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    otp: { type: Number, required: true },
   

  },

  { timestamps: true }
);

module.exports = mongoose.model("userResetPassword", userResetPasswordSchema);