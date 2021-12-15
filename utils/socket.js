const User = require("../models/user");
const jwt = require("jsonwebtoken");
const initSocket = (io) => {
  let users = [];

  const addUser = (user, roomId, socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
    users.push({ user, roomId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  io.use((socket, next) => {
    const token = socket.handshake.headers.cookie.split("=")[1];
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) {
          next(new Error("invalid"));
        } else {
          User.findById(decodedToken.id, function (err, user) {
            if (err) {
              next(new Error("invalid"));
            } else {
              next();
            }
          });
        }
      });
    } else {
      next(new Error("invalid"));
    }
  });
  io.on("connection", (socket) => {
    let currentRoom;

    socket.on("addUser", ({ user, roomId }) => {
      addUser(user, roomId, socket.id);
      currentRoom = roomId;
      socket.join(roomId);
      io.to(roomId).emit(
        "getUsers",
        users.filter((user) => user.roomId === roomId).map((user) => user.user)
      );
      io.to(roomId).emit("addUser", user);
    });

    socket.on("removeUser", ({ roomId }) => {
      currentRoom = roomId;
      removeUser(socket.id);
      socket.leave(roomId);
      io.to(roomId).emit(
        "getUsers",
        users.filter((user) => user.roomId === roomId).map((user) => user.user)
      );
    });

    socket.on("sendMessage", ({ roomId, message }) => {
      io.to(roomId).emit("getMessage", message);
    });

    socket.on("userWriting", ({ roomId, userName }) => {
      socket.broadcast.to(roomId).emit("userWriting", userName);
    });

    socket.on("messageEdited", ({ roomId, editedMessage }) => {
      io.to(roomId).emit("messageEdited", editedMessage);
    });
    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.to(currentRoom).emit(
        "getUsers",
        users
          .filter((user) => user.roomId === currentRoom)
          .map((user) => user.user)
      );
    });
  });
};
module.exports = initSocket;
