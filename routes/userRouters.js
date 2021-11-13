const express = require("express");
const { signup, login, logout } = require("../controllers/userControllers.js");

const userRouter = express.Router();
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

module.exports = { userRouter };
