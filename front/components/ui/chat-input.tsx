import { createElement, useRef } from "react";
import ImagePlaceholder from "../commands/image-placeholder";
import { Input } from "./input";
import SelectPlaceholder from "../commands/select-placeholder";
import { ArrowUp } from "lucide-react";
import autocompleteWords from "@/consts/autocomplete-words";
import AutocompletePlaceholder from "../commands/autocomplete-placeholder";

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

interface AutocompletePlaceholderRef {
  forceComplete(): void;
  selectNext(): void;
  selectPrev(): void;
}

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
  const refAutocomplete = useRef<AutocompletePlaceholderRef>();
  const currentCommand = commandList.find((command) => {
    return command.cmd == message.split(" ")[0];
  });

  const commandParameters = message.split(" ").slice(1);

  const sendMessageInternal = () => {
    let canSendCommand =
      currentCommand &&
      ((currentCommand.mustSelectOption == true &&
        commandParameters.length > 0) ||
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
          {/* <div className="text-white absolute right-10 bottom-0">
            currentCommand: {currentCommand?.cmd}
          </div> */}
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
                // forceComplete: refForceComplete,
              })}
        </div>
      )}
      <div className="relative flex justify-center">
        <div className="relative flex items-center lg:flex-grow-[0.25] mx-2 flex-grow">
          <Input
            ref={ref}
            onChange={(e) => setMessage(e.currentTarget.value)}
            value={message}
            placeholder="Type a message..."
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
            className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform hover:opacity-80 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
