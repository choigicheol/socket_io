const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
// const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(4000, function () {
  console.log("listening on port 4000");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("새로운 연결");

  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room, "입장");
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) callback({ error: "에러가 발생했어요." });

    socket.emit("message", {
      user: "",
      text: `${user.name}, ${user.room}번방 에 오신것을 환영합니다.`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "",
      text: `${user.name} 님이 입장하셨습니다.`,
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    socket.join(user.room);
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} 님이 방을 나갔습니다.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
    console.log("유저가 떠났어요.");
  });
});
