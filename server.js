require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const { userRouter } = require("./routes/userRouters");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Word");
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
