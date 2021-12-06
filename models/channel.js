const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A channel should have a title"],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: "",
    },
    members: {
      type: Array,
      default: [],
    },
    owner: {
      type: String,
      required: [true, "A channel should have a owner"],
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("channel", schema);

module.exports = Channel;
