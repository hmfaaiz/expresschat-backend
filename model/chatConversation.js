const mongoose = require("mongoose");

const chatConversationSchema = new mongoose.Schema(
  {
    chat_id: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    message: { type: String,required:true},
   

  },

  { timestamps: true }
);

module.exports = mongoose.model("chatConversation", chatConversationSchema);