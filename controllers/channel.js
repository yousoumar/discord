const Channel = require("../models/channel");

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
    res.status(400).json(error);
    console.log(error);
  }
};

module.exports = { getChannels, createChannel };
