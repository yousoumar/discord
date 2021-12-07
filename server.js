require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const channelRouter = require("./routes/channel");
const app = express();

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);
app.use("/api/channel/", channelRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const DBURL = process.env.DBURL;
const PORT = process.env.PORT;
mongoose
  .connect(DBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server runnig on port " + PORT);
    });
  })
  .catch((err) => console.log(err));
