const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "that email is already registered";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  return errors;
};

const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.json(user);
  } catch (error) {
    console.log(error);
    errorDetails = handleErrors(error);
    res.status(400).json(errorDetails);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        const token = createToken(user);

        res.json({ token });
      } else {
        throw Error("incorrect password");
      }
    } else {
      throw Error("incorrect email");
    }
  } catch (error) {
    console.log(error);
    errorDetails = handleErrors(error);
    res.status(400).json(errorDetails);
  }
};
const getUser = (req, res) => {
  res.json(req.user);
};
const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json({ message: "your are logged out" });
};
module.exports = { signup, login, logout, getUser };
