const User = require("../models/userModel");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const signupPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.json(user);
  } catch (error) {
    errorDetails = handleErrors(error);
    console.log(error);
    res.status(400).json(errorDetails);
  }
};

module.exports = { signupPost };
