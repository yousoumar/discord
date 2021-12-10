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

schema.pre("save", function (next) {
  if (!this.members.includes(this.ownerId) && this.name !== "Welcome") {
    this.members.push(this.ownerId);
  }

  next();
});
const Channel = mongoose.model("channel", schema);

module.exports = Channel;
