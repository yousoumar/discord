const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
    },

    owner: {
      type: Object,
      required: [true, "A message should have a owner"],
    },
    channelId: {
      type: String,
      required: [true, "A message should be in a channel"],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", schema);

module.exports = Message;
