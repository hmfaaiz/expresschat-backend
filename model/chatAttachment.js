const mongoose = require("mongoose");

const chatAttachmentSchema = new mongoose.Schema(
  {
    conversation_id:  { type: mongoose.Schema.Types.ObjectId, ref: "chatConversation" },
    file_name: { type: String,},
    file_src: { type: String},
    type: { type: String},
   

  },

  { timestamps: true }
);

module.exports = mongoose.model("chatAttachment", chatAttachmentSchema);