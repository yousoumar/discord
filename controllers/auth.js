const User = require("../models/user");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const handleAuthErrors = require("../utils/handleAuthErrors");
const createToken = require("../utils/createToken");
const Channel = require("../models/channel");

/* ---------------------------- signup ---------------------------------- */

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User({ email, password });
    await user.save();
    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 3 * 1000,
    });

    const message = `
      <h1>Your account has been created successfully</h1>
      <p>We are delighted to have one more member.</p>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Account created successfully",
        text: message,
      });
    } catch (err) {
      console.log(error);
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    const errorDetails = handleAuthErrors(error);
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
        res.cookie("token", token, {
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
    const errorDetails = handleAuthErrors(error);
    res.status(400).json(errorDetails);
  }
};

/* ---------------------------- logout ---------------------------------- */

const logout = (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.json({ message: "your are logged out" });
};

module.exports = {
  signup,
  login,
  logout,
};
