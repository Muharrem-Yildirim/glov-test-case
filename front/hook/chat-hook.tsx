import ChatContext from "@/context/chat-context";
import { useContext } from "react";

export default function useChatContext() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }

  return context;
}
