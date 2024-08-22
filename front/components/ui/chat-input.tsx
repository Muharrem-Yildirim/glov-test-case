import { createElement, useRef } from "react";
import ImagePlaceholder from "../commands/image-placeholder";
import { Input } from "./input";
import SelectPlaceholder from "../commands/select-placeholder";
import { ArrowUp } from "lucide-react";
import autocompleteWords from "@/consts/autocomplete-words";
import AutocompletePlaceholder, {
  AutocompletePlaceholderRef,
} from "../commands/autocomplete-placeholder";
import { socket } from "@/lib/socket";
import useSocketConnection from "@/hook/socket-connection-hook";
import clsx from "clsx";

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
  const refAutocomplete = useRef<AutocompletePlaceholderRef | null>(null);
  const currentCommand = commandList.find((command) => {
    return command.cmd == message.split(" ")[0];
  });
  const [isConnected] = useSocketConnection();

  const commandParameters = message.split(" ").slice(1);

  const sendMessageInternal = () => {
    if (!isConnected) return;

    let canSendCommand =
      currentCommand &&
      ((currentCommand.mustSelectOption == true &&
        commandParameters.length > 0 &&
        commandParameters[0] !== "") ||
        currentCommand.mustSelectOption == false);

    if (message.startsWith("/") && !canSendCommand) {
      return;
    }

    sendMessage();

    ref.current?.focus();
  };

  const lastWord = message.split(" ").slice(-1)[0];
  const filteredAutocompleteWords = autocompleteWords.filter((w) =>
    w.startsWith(lastWord)
  );

  const hasAutoComplete =
    autocompleteWords.filter((w) => w.startsWith(lastWord)).length > 0 &&
    lastWord.length > 0 &&
    filteredAutocompleteWords.find((w) => w === lastWord) === undefined;

  return (
    <>
      {(currentCommand || hasAutoComplete) && (
        <div className="relative">
          {currentCommand
            ? createElement(currentCommand?.component!, {
                message: message,
                commandParameters,
                inputRef: ref,
                setMessage: setMessage,
              })
            : createElement(AutocompletePlaceholder, {
                message: message,
                commandParameters,
                inputRef: ref,
                matches: filteredAutocompleteWords,
                setMessage: setMessage,
                lastWord: lastWord,
                ref: refAutocomplete,
              })}
        </div>
      )}
      <div className="relative flex justify-center">
        <div className="relative flex items-center lg:flex-grow-[0.25] mx-2 flex-grow">
          <Input
            ref={ref}
            onChange={(e) => setMessage(e.currentTarget.value)}
            value={message}
            disabled={!isConnected}
            placeholder={isConnected ? "Type a message..." : "Connecting..."}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                if (hasAutoComplete && refAutocomplete.current) {
                  refAutocomplete.current!.forceComplete();
                  return;
                }

                sendMessageInternal();
              } else if (hasAutoComplete && e.key == "ArrowUp") {
                e.preventDefault();
                refAutocomplete.current!.selectPrev();
              } else if (hasAutoComplete && e.key == "ArrowDown") {
                e.preventDefault();
                refAutocomplete.current!.selectNext();
              }
            }}
          />
          <ArrowUp
            onClick={sendMessageInternal}
            className={clsx(
              "absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform hover:opacity-80 cursor-pointer",
              !isConnected && "!cursor-not-allowed"
            )}
          />
        </div>
      </div>
    </>
  );
}
