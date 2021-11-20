const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const handleErrors = require("../utils/handleErrors");
const createToken = require("../utils/createToken");

/* ---------------------------- signup ---------------------------------- */

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 3 * 1000,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    const errorDetails = handleErrors(error);
    res.status(400).json(errorDetails);
  }
};

/* ---------------------------- login ---------------------------------- */

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      email: !email && "An email is requiered",
      password: !password && "A password is requiered",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        const token = createToken(user);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 3 * 1000,
        });

        res.json(user);
      } else {
        throw Error("incorrect password");
      }
    } else {
      throw Error("incorrect email");
    }
  } catch (error) {
    console.log(error);
    const errorDetails = handleErrors(error);
    res.status(400).json(errorDetails);
  }
};
const getUser = (req, res) => {
  res.json(req.user);
};

/* ---------------------------- updateProfile ---------------------------------- */

const updateProfile = async (req, res) => {
  const user = req.user;
  const name = req.body.name;
  const bio = req.body.bio;
  const phone = req.body.phone;
  user.name = name;
  user.bio = bio;
  user.phone = phone;
  try {
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    const errorDetails = handleErrors(error);
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
      res.cookie("jwt", "", { maxAge: 1 });
      res.json({ message: "Account deleted" });
    } else {
      throw Error("incorrect password");
    }
  } catch (error) {
    console.log(error);
    const errorDetails = handleErrors(error);
    res.status(400).json(errorDetails);
  }
};

/* ---------------------------- updatePassword ---------------------------------- */

const updatePassword = async (req, res) => {
  const user = req.user;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  console.log(newPassword, currentPassword);
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
    const errorDetails = handleErrors(error);
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
    user.resetPasswordToken = resetPasswordToken;
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
    const errorDetails = handleErrors(error);
    res.status(400).json(errorDetails);
  }
};

/* ---------------------------- resetPassword ---------------------------------- */

const resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw Error("Invalid token");
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset succed" });
  } catch (err) {
    console.log(err);
    const errorDetails = handleErrors(err);
    res.status(400).json(errorDetails);
  }
};

/* ---------------------------- logout ---------------------------------- */

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json({ message: "your are logged out" });
};

module.exports = {
  signup,
  login,
  getUser,
  logout,
  updateProfile,
  updatePassword,
  deleteProfile,
  forgotPassword,
  resetPassword,
};
