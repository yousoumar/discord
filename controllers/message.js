const Channel = require("../models/channel");
const Message = require("../models/message");
const User = require("../models/user");
const handleChannelErrors = require("../utils/handleChannelErrors");

const editMessage = async (req, res) => {
  const id = req.body.id;
  const text = req.body.text;
  console.log(id, text);
  try {
    const message = await Message.findById(id);
    if (!message) {
      res.status(404).json({ message: "No such message" });
      return;
    }
    message.text = text;
    message.isEdited = true;
    await message.save();
    res.json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const deleteMessage = async (req, res) => {
  const id = req.params.id;

  try {
    const message = await Message.findById(id);
    if (!message) {
      res.status(404).json({ message: "No such message" });
      return;
    }
    message.text = "";
    message.isEdited = true;
    message.isDeleted = true;
    await message.save();
    res.json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = { editMessage, deleteMessage };
