const mongoose = require("mongoose");

const chatUserSchema = new mongoose.Schema(
  {
    chat_id: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
    user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("chatUser", chatUserSchema);
