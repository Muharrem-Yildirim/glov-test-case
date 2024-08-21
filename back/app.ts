import express from "express";
import http from "http";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket: any) => {
  socket.user = {
    id: socket.id,
    name: "Test " + Math.floor(Math.random() * 1000),
  };

  io.emit("auth::connect", socket.user);

  socket.on("chat::sendMessage", (message: string) => {
    io.emit("chat::receiveMessage", message);
  });

  socket.on("disconnect", () => {
    io.emit("auth::disconnect", socket.user);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port *:${process.env.PORT}`);
});
