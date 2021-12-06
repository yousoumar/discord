const express = require("express");
const auth = require("../middlewares/auth");
const {
  getChannels,
  createChannel,
  deleteChannel,
  joinChannel,
} = require("../controllers/channel.js");

const router = express.Router();

router.get("/", auth, getChannels);
router.post("/create", auth, createChannel);
router.delete("/delete/:channelId", auth, deleteChannel);
router.put("/join/:channelId", auth, joinChannel);

module.exports = router;
