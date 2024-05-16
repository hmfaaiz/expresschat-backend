const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
  },

  { timestamps: true }
);

userSchema.pre("remove", async function (next) {
  try {
    await mongoose.model("userProfile").deleteMany({ user_id: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("user", userSchema);
