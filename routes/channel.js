const express = require("express");
const auth = require("../middlewares/auth");
const {
  getChannels,
  createChannel,
  deleteChannel,
  joinChannel,
  getChannelMembers,
  getChannelMessages,
  addMessageToChannel,
  getWelcomeChannel,
} = require("../controllers/channel.js");

const router = express.Router();

router.get("/", auth, getWelcomeChannel);
router.get("/getChannels", auth, getChannels);
router.post("/create", auth, createChannel);
router.delete("/delete/:channelId", auth, deleteChannel);
router.put("/join/:channelId", auth, joinChannel);
router.get("/getChannelMembers/:channelId", auth, getChannelMembers);
router.get("/getChannelMessages/:channelId", auth, getChannelMessages);
router.post("/addMessageToChannel/:channelId", auth, addMessageToChannel);

module.exports = router;
