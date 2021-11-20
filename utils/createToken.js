const jwt = require("jsonwebtoken");
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: 24 * 60 * 60 * 3,
  });
};

module.exports = createToken;
