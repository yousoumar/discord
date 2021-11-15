const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(400).json({ error: "Incorrect token" });
      } else {
        User.findById(decodedToken.id, function (err, user) {
          if (err) {
            res.status(400).json({ error: "Incorrect token" });
          } else {
            req.user = user;
            next();
          }
        });
      }
    });
  } else {
    res.status(400).json({ error: "Incorrect token" });
  }
};

module.exports = auth;
