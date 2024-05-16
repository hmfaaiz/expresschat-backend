const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    country: { type: String, },
    professional: { type: String,  },
    age: { type: Number,  },
  },

  { timestamps: true }
);

module.exports = mongoose.model("userProfile", userProfileSchema);
