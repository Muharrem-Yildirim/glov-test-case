import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

export default function useSocketConnection() {
  const [isConnected, setConnected] = useState(socket.connected);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return [isConnected, setConnected];
}
