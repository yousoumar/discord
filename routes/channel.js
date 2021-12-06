const express = require("express");
const auth = require("../middlewares/auth");
const { getChannels, createChannel } = require("../controllers/channel.js");

const router = express.Router();

router.get("/", auth, getChannels);
router.post("/create", auth, createChannel);

module.exports = router;
