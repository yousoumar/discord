const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authUser = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).send("You have to login to see this page");
      } else {
        User.findById(decodedToken.id, function (err, user) {
          if (err) {
            res.status(400).send("You have to login to see this page");
          } else {
            req.user = user;
            next();
          }
        });
      }
    });
  } else {
    res.status(400).send("You have to login to see this page");
  }
};

module.exports = { authUser };
