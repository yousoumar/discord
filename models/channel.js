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
    messages: {
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

schema.pre("save", function (next) {
  if (!this.members.includes(this.ownerId)) {
    this.members.push(this.ownerId);
  }

  next();
});
const Channel = mongoose.model("channel", schema);

module.exports = Channel;
