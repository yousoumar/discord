const express = require("express");
const auth = require("../middlewares/auth");
const { editMessage, deleteMessage } = require("../controllers/message.js");

const router = express.Router();
router.post("/editMessage/", editMessage);
router.put("/deleteMessage/:id", deleteMessage);
module.exports = router;
