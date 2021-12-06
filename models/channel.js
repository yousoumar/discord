const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A channel should have a title"],
      unique: true,
    },

    description: {
      type: String,
      default: "",
    },
    members: {
      type: Array,
      default: [],
    },
    ownerId: {
      type: String,
      required: [true, "A channel should have a owner"],
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("channel", schema);

module.exports = Channel;
