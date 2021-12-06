const Channel = require("../models/channel");
const handleChannelErrors = require("../utils/handleChannelErrors");

const getChannels = (req, res) => {
  res.json({ message: "hello" });
};

const createChannel = async (req, res) => {
  const { name, description, owner } = req.body;

  try {
    const channel = Channel({ name, description, owner });
    const storedChannel = await channel.save();
    res.status(200).json(storedChannel);
  } catch (error) {
    console.log(error);
    const formatedError = handleChannelErrors(error);
    res.status(400).json(formatedError);
  }
};

module.exports = { getChannels, createChannel };
