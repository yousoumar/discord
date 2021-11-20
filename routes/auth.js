const express = require("express");
const auth = require("../middlewares/auth");
const {
  signup,
  login,
  getUser,
  logout,
  updateProfile,
  updatePassword,
  deleteProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.js");

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/getuser", auth, getUser);
authRouter.post("/updateProfile", auth, updateProfile);
authRouter.post("/deleteProfile", auth, deleteProfile);
authRouter.post("/updatePassword", auth, updatePassword);
authRouter.get("/logout", logout);
authRouter.post("/forgotPassword", forgotPassword);
authRouter.post("/resetPassword", resetPassword);

module.exports = { authRouter };
