const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (user, roomId, socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  users.push({ user, roomId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected.");

  socket.on("addUser", ({ user, roomId }) => {
    addUser(user, roomId, socket.id);
    socket.join(roomId);

    io.to(roomId).emit("getUsers", users);
  });

  socket.on("removeUser", ({ roomId }) => {
    removeUser(socket.id);
    socket.leave(roomId);
    io.to(roomId).emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, roomId, message }) => {
    io.to(roomId).emit("getMessage", {
      senderId,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
