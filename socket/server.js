const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, roomId, socketId) => {
  users = users.filter((user) => user !== userId);
  users.push({ userId, roomId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected.");

  socket.on("addUser", ({ userId, roomId }) => {
    addUser(userId, roomId, socket.id);
    socket.join(roomId);
    io.to(roomId).emit("getUsers", users);
  });

  socket.on("removeUser", ({ userId, roomId }) => {
    removeUser(socket.id);
    socket.leave(roomId);
    io.to(roomId).emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
