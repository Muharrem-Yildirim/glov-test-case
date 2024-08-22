import { createContext, useState } from "react";

export const ChatContext = createContext<any>(null);

export default ChatContext;

export const ChatContextProvider = (props: {
  clearInput: () => void;
  children: JSX.Element;
}) => {
  return (
    <ChatContext.Provider
      value={{
        clearInput: props.clearInput,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
