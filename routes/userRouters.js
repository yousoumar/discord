const express = require("express");
const { signupPost } = require("../controllers/userControllers.js");

const userRouter = express.Router();
userRouter.post("/signup", signupPost);

module.exports = { userRouter };
