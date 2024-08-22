"use client";

import { socket } from "@/app/lib/socket";
import ChatMessage from "./ui/chat-message";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ui/chat-input";
import { ChatContextProvider } from "@/context/chat-context";

export type MessageHistoryElement = {
  message: string;
  isLocal: boolean;
  type: MessageType;
  isSystemMessage?: boolean;
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

    clearInput();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearInput = () => {
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat::receiveMessage", ({ message, type, sender }) => {
      setMessageHistory([
        ...messageHistory,
        { message: message, isLocal: sender.id === socket.id, type },
      ]);

      console.log("chat::receiveMessage", message, type);
    });

    socket.on("auth::connect", ({ name }) => {
      setMessageHistory([
        ...messageHistory,
        {
          message: `${name} joined.`,
          isLocal: false,
          type: MessageType.TEXT,
          isSystemMessage: true,
        },
      ]);
    });

    socket.on("auth::disconnect", ({ name }) => {
      setMessageHistory([
        ...messageHistory,
        {
          message: `${name} disconected.`,
          isLocal: false,
          type: MessageType.TEXT,
          isSystemMessage: true,
        },
      ]);
    });

    return () => {
      socket.off("chat::receiveMessage");
      socket.off("auth::connect");
      socket.off("auth::disconnect");
    };
  }, [messageHistory]);

  useEffect(() => {
    if (messageHistory.length === 0) {
      return;
    }
    if (messageHistory[messageHistory.length - 1].type === MessageType.TEXT) {
      scrollToBottom();
      return;
    }

    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [messageHistory]);

  return (
    <ChatContextProvider clearInput={clearInput}>
      <>
        <div className="flex-grow w-full h-full min-h-full max-h-full overflow-y-scroll p-4">
          <div className="flex flex-col gap-2">
            {messageHistory.map((message: MessageHistoryElement, idx) => (
              <ChatMessage key={idx} messageHistoryData={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput
          sendMessage={sendMessage}
          setMessage={setMessage}
          message={message}
        />
      </>
    </ChatContextProvider>
  );
}
