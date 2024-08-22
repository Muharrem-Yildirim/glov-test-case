import { cloneElement, createElement, createRef, useRef } from "react";
import ImagePlaceholder from "../commands/image-placeholder";
import { Input } from "./input";
import SelectCommand from "../commands/select-command";

const commandList = [
  {
    cmd: "/image",
    component: ImagePlaceholder,
    mustSelectOption: true,
  },
  {
    cmd: "/select",
    component: SelectCommand,
    mustSelectOption: true,
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
  const ref = useRef<HTMLInputElement>(null);
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
            inputRef: ref,
          })}
        </div>
      )}

      <Input
        ref={ref}
        onChange={(e) => setMessage(e.currentTarget.value)}
        value={message}
        placeholder="Type a message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            if (
              currentCommand &&
              currentCommand?.mustSelectOption &&
              commandParameters.length == 0
            ) {
              return;
            }

            sendMessage();
          }
        }}
      />
    </>
  );
}
