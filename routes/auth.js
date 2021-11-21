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

/* ---------------------------- post ---------------------------------- */

authRouter.post("/signup", signup);
authRouter.post("/login", login);

authRouter.post("/updateProfile", auth, updateProfile);
authRouter.post("/deleteProfile", auth, deleteProfile);

authRouter.post("/updatePassword", auth, updatePassword);
authRouter.post("/forgotPassword", forgotPassword);
authRouter.post("/resetPassword", resetPassword);

/* ---------------------------- get ---------------------------------- */

authRouter.get("/getuser", auth, getUser);
authRouter.get("/logout", logout);

module.exports = { authRouter };
