require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routes/userRouters");

const app = express();
app.use(express.static("./client/build"));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth/", userRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
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
