const mongoose = require("mongoose");
const Channel = require("../models/channel");

const createWelcomeChannel = async (req, res, next) => {
  let welcome = await Channel.findOne({ name: "Welcome" });
  if (!welcome) {
    welcome = await Channel.create({
      name: "Welcome",
      description:
        "This is Welcome channel, the channel where everyone can get in by default.",
      ownerId: new mongoose.Types.ObjectId(),
    });
  }
  next();
};

module.exports = createWelcomeChannel;
