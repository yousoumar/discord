require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routes/userRouters");
const { authUser } = require("./middlewares/authentication");

const app = express();
app.use(express.static("./views/build"));
app.use(express.json());
app.use(cookieParser());

app.use(userRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build/index.html"));
});

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
