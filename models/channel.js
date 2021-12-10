const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "A channel should have a name"],
      unique: true,
    },

    description: {
      type: String,
      default: "",
    },

    members: [{ type: Schema.Types.ObjectId, ref: "user" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "message" }],
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "A channel should have a owner"],
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("channel", schema);

module.exports = Channel;
