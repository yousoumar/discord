const express = require("express");
const auth = require("../middlewares/auth");
const { signup, login, getUser } = require("../controllers/auth.js");

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/getuser", auth, getUser);

module.exports = { authRouter };
