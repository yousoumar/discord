const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = Schema(
  {
    text: {
      type: String,
      default: "",
    },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    channelId: {
      type: String,
      required: [true, "A message should be in a channel"],
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", schema);

module.exports = Message;
