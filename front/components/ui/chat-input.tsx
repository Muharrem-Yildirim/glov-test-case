import { cloneElement, createElement, createRef, useRef } from "react";
import ImagePlaceholder from "../commands/image-placeholder";
import { Input } from "./input";
import SelectPlaceholder from "../commands/select-placeholder";
import { ArrowUp, LucideAArrowDown } from "lucide-react";

const commandList = [
  {
    cmd: "/image",
    component: ImagePlaceholder,
    mustSelectOption: true,
  },
  {
    cmd: "/select",
    component: SelectPlaceholder,
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

  const sendMessageInternal = () => {
    if (
      currentCommand &&
      currentCommand?.mustSelectOption &&
      commandParameters.length == 0
    ) {
      return;
    }

    sendMessage();

    ref.current?.focus();
  };

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

      <div className="relative flex justify-center">
        <div className="relative flex items-center flex-grow-[0.25]">
          <Input
            ref={ref}
            onChange={(e) => setMessage(e.currentTarget.value)}
            value={message}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                sendMessageInternal();
              }
            }}
          />
          <ArrowUp
            onClick={sendMessageInternal}
            className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform hover:opacity-80 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
