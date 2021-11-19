const express = require("express");
const auth = require("../middlewares/auth");
const {
  signup,
  login,
  getUser,
  logout,
  update,
} = require("../controllers/auth.js");

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/getuser", auth, getUser);
authRouter.post("/update", auth, update);
authRouter.get("/logout", logout);

module.exports = { authRouter };
