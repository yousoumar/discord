const express = require("express");
const {
  signupPost,
  loginPost,
  logout,
} = require("../controllers/userControllers.js");

const userRouter = express.Router();
userRouter.post("/signup", signupPost);
userRouter.post("/login", loginPost);
userRouter.get("/logout", logout);

module.exports = { userRouter };
