import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  socket.user = {
    id: socket.id,
    name: "Test " + Math.floor(Math.random() * 1000),
  };

  io.emit("auth::connect", socket.user);

  console.log(`${socket.user.name} connected`);

  socket.on("chat::sendMessage", (message: string) => {
    io.emit("chat::receiveMessage", message);

    console.log(`[${socket.user.name}]: ${message}`);
  });

  socket.on("disconnect", () => {
    io.emit("auth::disconnect", socket.user);

    console.log(`${socket.user.name} disconnected`);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port *:${process.env.PORT}`);
});
