const Channel = require("../models/channel");
const handleChannelErrors = require("../utils/handleChannelErrors");

/* ---------------------------- get all channels ---------------------------------- */

const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find();
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------------------- create a channel ---------------------------------- */

const createChannel = async (req, res) => {
  const { name, description } = req.body;

  try {
    const channel = Channel({ name, description, ownerId: req.user._id });
    const storedChannel = await channel.save();
    res.status(200).json(storedChannel);
  } catch (error) {
    console.log(error);
    const formatedError = handleChannelErrors(error);
    res.status(400).json(formatedError);
  }
};

/* ---------------------------- delete a channel ---------------------------------- */

const deleteChannel = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res
        .status(400)
        .json({ message: "you can not delete an inexistente channel" });
    }

    if (channel.ownerId !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "you can only delete your own channels" });
    }

    await Channel.findByIdAndRemove(channel._id);

    res.status(200).json({ message: "channel deleted with succes" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------------------- join a channel ---------------------------------- */

const joinChannel = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res
        .status(400)
        .json({ message: "you can not join an inexistente channel" });
    }
    if (channel.members.includes(req.user._id)) {
      return res.status(403).json({ message: "channel alrady joined" });
    }

    channel.members.push(req.user._id);
    await channel.save();

    res.status(200).json({ message: "channel joined with succes" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/* ---------------------------- get channel memebers ---------------------------------- */

const getChannelMembers = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(400).json({ message: "inexistente channel" });
    }
    res.status(200).json({ members: channel.members });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getChannels,
  createChannel,
  deleteChannel,
  joinChannel,
  getChannelMembers,
};
