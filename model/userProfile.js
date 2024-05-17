const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    country: { type: String, },
    professional: { type: String,  },
    age: { type: Number,  },
  },

  { timestamps: true }
);

module.exports = mongoose.model("userProfile", userProfileSchema);
