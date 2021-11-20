const express = require("express");
const auth = require("../middlewares/auth");
const {
  signup,
  login,
  getUser,
  logout,
  updateProfile,
  updatePassword,
} = require("../controllers/auth.js");

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/getuser", auth, getUser);
authRouter.post("/updateProfile", auth, updateProfile);
authRouter.post("/updatePassword", auth, updatePassword);
authRouter.get("/logout", logout);

module.exports = { authRouter };
