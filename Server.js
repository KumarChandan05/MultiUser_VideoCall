const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Change this to your frontend URL in production
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on("drawing-start", ({ room, data }) => {
    socket.to(room).emit("drawing-start", data);
  });

  socket.on("drawing", ({ room, data }) => {
    socket.to(room).emit("drawing", data);
  });

  socket.on("drawing-stop", ({ room, data }) => {
    socket.to(room).emit("drawing", data);
  });

  socket.on("drawing-clear", ({ room, data }) => {
    socket.to(room).emit("drawing-clear", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
