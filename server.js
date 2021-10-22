const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Word");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server runnig on port " + port);
});
