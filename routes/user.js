const express = require("express");
const auth = require("../middlewares/auth");
const {
  getUser,
  updateProfile,
  updatePassword,
  deleteProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.js");

const router = express.Router();

router.get("/getuser", auth, getUser);
router.post("/updateProfile", auth, updateProfile);
router.post("/updatePassword", auth, updatePassword);
router.post("/deleteProfile", auth, deleteProfile);

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
