import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

enum MessageType {
  TEXT,
  IMAGE,
}

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  socket.data.user = {
    id: socket.id,
    name: "Test " + Math.floor(Math.random() * 1000),
  };

  io.emit("auth::connect", socket.data.user);

  console.log(`${socket.data.user.name} connected`);

  socket.on("chat::sendMessage", (message: string) => {
    if (message.length < 1 || message.length > 200) {
      return;
    }

    io.emit("chat::receiveMessage", {
      message,
      type: message.startsWith("/image") ? MessageType.IMAGE : MessageType.TEXT,
      sender: socket.data.user,
    });

    console.log(`[${socket.data.user.name}]: ${message}`);
  });

  socket.on("disconnect", () => {
    io.emit("auth::disconnect", socket.data.user);

    console.log(`${socket.data.user.name} disconnected`);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port *:${process.env.PORT}`);
});
