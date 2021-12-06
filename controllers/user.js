const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const handleAuthErrors = require("../utils/handleAuthErrors");

/* ---------------------------- getUser ---------------------------------- */

const getUser = (req, res) => {
  res.json(req.user);
};

/* ---------------------------- updateProfile ---------------------------------- */

const updateProfile = async (req, res) => {
  const user = req.user;
  user.name = req.body.name;
  user.bio = req.body.bio;
  user.phone = req.body.phone;
  try {
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    const errorDetails = handleAuthErrors(error);
    res.status(400).json(errorDetails);
  }
};

/* ---------------------------- deleteProfile ---------------------------------- */

const deleteProfile = async (req, res) => {
  const user = req.user;
  const password = req.body.password;
  try {
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      await User.findByIdAndRemove(user._id);
      res.cookie("token", "", { maxAge: 1 });
      const message = `
      <h1>Your account has been deleted successfully</h1>
      <p>We are sorry to see you leave us.</p>
    `;
      try {
        await sendEmail({
          to: user.email,
          subject: "Account deleted successfully",
          text: message,
        });
      } catch (err) {
        console.log(error);
      }
      res.json({ message: "Account deleted" });
    } else {
      throw Error("incorrect password");
    }
  } catch (error) {
    console.log(error);
    const errorDetails = handleAuthErrors(error);
    res.status(400).json(errorDetails);
  }
};

/* ---------------------------- updatePassword ---------------------------------- */

const updatePassword = async (req, res) => {
  const user = req.user;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  try {
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (valid) {
      user.password = newPassword;
      await user.save();
      res.json(user);
    } else {
      throw Error("incorrect current password");
    }
  } catch (error) {
    console.log(error);
    const errorDetails = handleAuthErrors(error);
    res.status(400).json(errorDetails);
  }
};

/* ---------------------------- forgotPassword ---------------------------------- */

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw Error("incorrect email");
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256", process.env.SECRET)
      .update(resetPasswordToken)
      .digest("hex");

    user.resetPasswordTokenExpire = Date.now() + 10 * (60 * 1000);

    await user.save();

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Here is your token : </p>
      <p>${resetPasswordToken}</p>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password reset request",
        text: message,
      });

      res.status(200).json({ message: "Email sent" });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpire = undefined;
      res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error) {
    console.log(error);
    const errorDetails = handleAuthErrors(error);
    res.status(400).json(errorDetails);
  }
};

/* ---------------------------- resetPassword ---------------------------------- */

const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256", process.env.SECRET)
    .update(req.body.resetPasswordToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw Error("Invalid token");
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset succed" });
  } catch (err) {
    console.log(err);
    const errorDetails = handleAuthErrors(err);
    res.status(400).json(errorDetails);
  }
};

module.exports = {
  getUser,
  updateProfile,
  updatePassword,
  deleteProfile,
  forgotPassword,
  resetPassword,
};
