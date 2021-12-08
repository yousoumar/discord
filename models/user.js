const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    name: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    picture: {
      type: String,
      default: "",
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpire: {
      type: Date,
    },
    channels: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", schema);

module.exports = User;
