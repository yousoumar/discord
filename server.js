/* ---------------------------- external import ---------------------------------- */

require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

/* ---------------------------- internal import ---------------------------------- */

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const channelRouter = require("./routes/channel");
const messageRouter = require("./routes/message");
const createWelcomeChannel = require("./middlewares/createWelcomeChannel");
const initSocket = require("./utils/socket");

/* ---------------------------- app instanciation ---------------------------------- */

const app = express();

/* ---------------------------- socket ---------------------------------- */

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
initSocket(io);

/* ---------------------------- middlewares ---------------------------------- */

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(createWelcomeChannel);

/* ---------------------------- routes ---------------------------------- */

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/channel", channelRouter);
app.use("/api/message", messageRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/* ---------------------------- connection ---------------------------------- */

const DBURL = process.env.DBURL;
const PORT = process.env.PORT;
mongoose
  .connect(DBURL)
  .then(() => {
    server.listen(PORT, () => {
      console.log("server runnig on port " + PORT);
    });
  })
  .catch((err) => console.log(err));
