const initSocket = (io) => {
  let users = [];

  const addUser = (user, roomId, socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
    users.push({ user, roomId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

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

    socket.on("disconnect", () => {
      io.to(currentRoom).emit(
        "getUsers",
        users
          .filter((user) => user.roomId === currentRoom)
          .map((user) => user.user)
      );
      removeUser(socket.id);
    });
  });
};
module.exports = initSocket;
