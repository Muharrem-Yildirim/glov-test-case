"use client";

import { socket } from "@/app/lib/socket";
import ChatMessage from "./ui/chat-message";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ui/chat-input";

export type MessageHistoryElement = {
  message: string;
  isLocal: boolean;
  type: MessageType;
};

export enum MessageType {
  TEXT,
  IMAGE,
}

export default function Chat() {
  const [messageHistory, setMessageHistory] = useState<MessageHistoryElement[]>(
    []
  );
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    socket.emit("chat::sendMessage", message);

    // setMessageHistory([
    //   ...messageHistory,
    //   {
    //     message: message,
    //     isLocal: true,
    //     type: MessageType.TEXT,
    //   },
    // ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on("chat::receiveMessage", (message, messageType) => {
      setMessageHistory([
        ...messageHistory,
        { message: message, isLocal: false, type: messageType },
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
          {messageHistory.map((message: MessageHistoryElement, idx) => (
            <ChatMessage key={idx} messageHistoryData={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput sendMessage={sendMessage} setMessage={setMessage} />
    </>
  );
}
