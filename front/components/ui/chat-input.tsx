import { cloneElement, createElement } from "react";
import ImagePlaceholder from "../commands/image";
import { Input } from "./input";

const commandList = [
  {
    cmd: "/image",
    component: ImagePlaceholder,
  },
];

export default function ChatInput({
  setMessage: setMessage,
  message: message,
  sendMessage,
}: {
  setMessage: (message: string) => void;
  sendMessage: () => void;
  message: string;
}) {
  const currentCommand = commandList.find((command) => {
    return command.cmd == message.split(" ")[0];
  });

  const commandParameters = message.split(" ").slice(1);

  return (
    <>
      {currentCommand && (
        <div className="relative">
          <div className="text-white absolute right-10 bottom-0">
            currentCommand: {currentCommand?.cmd}
          </div>
          {createElement(currentCommand?.component, {
            message: message,
            commandParameters,
          })}
        </div>
      )}

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
