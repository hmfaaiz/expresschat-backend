const mongoose = require("mongoose");

const userResetPasswordSchema = new mongoose.Schema(
  {
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    otp: { type: Number },
   

  },

  { timestamps: true }
);

module.exports = mongoose.model("userResetPassword", userResetPasswordSchema);