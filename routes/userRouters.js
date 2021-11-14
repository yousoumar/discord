const express = require("express");
const { authUser } = require("../middlewares/authentication");
const { signup, login, getUser } = require("../controllers/userControllers.js");

const userRouter = express.Router();
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/getuser", authUser, getUser);

module.exports = { userRouter };
