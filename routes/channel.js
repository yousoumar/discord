const express = require("express");
const auth = require("../middlewares/auth");
const {
  getChannels,
  createChannel,
  deleteChannel,
} = require("../controllers/channel.js");

const router = express.Router();

router.get("/", auth, getChannels);
router.post("/create", auth, createChannel);
router.get("/delete/:channelId", auth, deleteChannel);

module.exports = router;
