"use client";

import { socket } from "@/app/lib/socket";
import ChatMessage from "./ui/chat-message";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";

type MessageHistoryElement = {
  message: string;
  isLocal: boolean;
};

export default function Chat() {
  const [messageHistory, setMessageHistory] = useState<MessageHistoryElement[]>(
    []
  );
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    socket.emit("chat::sendMessage", message);

    setMessageHistory([
      ...messageHistory,
      {
        message: message,
        isLocal: true,
      },
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on("chat::receiveMessage", (message) => {
      setMessageHistory([
        ...messageHistory,
        { message: message, isLocal: false },
      ]);

      console.log("chat::receiveMessage", message);
    });

    scrollToBottom();

    return () => {
      socket.off("chat::receiveMessage");
    };
  }, [messageHistory]);

  return (
    <>
      <div className="w-full h-full max-h-full overflow-y-scroll">
        <div className="flex flex-col gap-2">
          {messageHistory.map(
            ({ message, isLocal }: MessageHistoryElement, idx) => (
              <ChatMessage key={idx} message={message} isLocal={isLocal} />
            )
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <Input
        onChange={(e) => setMessage(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            sendMessage();
          }
        }}
      />
    </>
  );
}
