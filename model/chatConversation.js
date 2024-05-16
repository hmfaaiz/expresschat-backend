const mongoose = require("mongoose");

const chatConversationSchema = new mongoose.Schema(
  {
    chat_id: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    message: { type: String,required:true},
    read_status: { type: String,default:false},
   

  },

  { timestamps: true }
);

module.exports = mongoose.model("chatConversation", chatConversationSchema);