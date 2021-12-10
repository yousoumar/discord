const Channel = require("../models/channel");
const Message = require("../models/message");
const User = require("../models/user");
const handleChannelErrors = require("../utils/handleChannelErrors");

/* ---------------------------- get welcome channel ---------------------------------- */

const getWelcomeChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ name: "Welcome" });
    res.status(200).json({ channel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
    if (channel.members.includes(req.user._id.toString())) {
      return res.status(403).json({ message: "channel alrady joined" });
    }

    channel.members.push(req.user._id.toString());
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
    const members = await Promise.all(
      channel.members.map((id) => User.findById(id))
    );
    res.status(200).json({ members: members });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/* ---------------------------- get channel messages ---------------------------------- */

const getChannelMessages = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(400).json({ message: "inexistente channel" });
    }

    const messages = await Promise.all(
      channel.messages.map((id) => Message.findById(id).populate("owner"))
    );

    res.status(200).json({ messages: messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/* ---------------------------- add message to channel ---------------------------------- */

const addMessageToChannel = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(400).json({ message: "inexistente channel" });
    }
    const message = new Message({
      owner: req.user._id,
      text: req.body.text,
      channelId,
    });
    await message.save();
    channel.messages.push(message._id);
    await channel.save();
    message.owner = req.user;
    res.status(200).json({ message: message });
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
  getChannelMessages,
  addMessageToChannel,
  getWelcomeChannel,
};
