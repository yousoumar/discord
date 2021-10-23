require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routes/userRouters");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).send("You have to login to see this page");
      } else {
        console.log(decodedToken);
        res.send("Hello there !");
      }
    });
  } else {
    res.status(400).send("You have to login to see this page");
  }
});

app.use(userRouter);

const DBURL = process.env.DBURL;
const PORT = process.env.PORT;
mongoose
  .connect(DBURL)
  .then((result) => {
    app.listen(PORT, () => {
      console.log("server runnig on port " + PORT);
    });
  })
  .catch((err) => console.log(err));
