const jwt = require("jsonwebtoken");
const authUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).send("You have to login to see this page");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(400).send("You have to login to see this page");
  }
};

module.exports = { authUser };
