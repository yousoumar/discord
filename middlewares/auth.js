const User = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.cookie("token", "", { maxAge: 1 });
        res.status(400).json({ error: "Incorrect token" });
      } else {
        User.findById(decodedToken.id, function (err, user) {
          if (err) {
            res.cookie("token", "", { maxAge: 1 });
            res.status(400).json({ error: "Incorrect token" });
          } else {
            req.user = user;
            next();
          }
        });
      }
    });
  } else {
    res.status(400).json({ error: "No token provided" });
  }
};

module.exports = auth;
