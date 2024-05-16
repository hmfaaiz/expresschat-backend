const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
    chat_name: { type: String,default:null},
    chat_type: { type: String, enum:["byone","bygroup"],default:"byone"},
   

  },

  { timestamps: true }
);

module.exports = mongoose.model("chat", chatSchema);