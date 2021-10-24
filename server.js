require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routes/userRouters");
const { authUser } = require("./middlewares/authentication");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", authUser, (req, res) => {
  res.send("Hello there");
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
