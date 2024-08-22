"use client";

import * as React from "react";

import { getCaretCoordinates } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CommandPlaceholder } from "@/types/command-placeholder";

export interface AutocompletePlaceholderRef {
  forceComplete(): void;
  selectNext(): void;
  selectPrev(): void;
}

export function AutocompletePlaceholder(
  {
    inputRef,
    matches,
    message,
    setMessage,
    lastWord,
  }: CommandPlaceholder & {
    matches: string[];
    lastWord: string;
  },
  ref: React.Ref<AutocompletePlaceholderRef | null>
) {
  const [value, setValue] = React.useState("");

  //@ts-ignore
  React.useImperativeHandle(ref, () => ({
    forceComplete() {
      complete();
    },
    selectNext() {
      selectNextMatch();
    },
    selectPrev() {
      selectPrevMatch();
    },
  }));

  const selectNextMatch = () => {
    const index = matches.indexOf(value);
    const match = matches[index + 1] || matches[0];

    setValue(match);
  };

  const selectPrevMatch = () => {
    const index = matches.indexOf(value);
    const match = matches[index - 1] || matches[matches.length - 1];

    setValue(match);
  };

  React.useEffect(() => {
    const isValueExists = matches.find((match) => match === value);

    if (!isValueExists) setValue(matches[0]);
  }, [value, matches]);

  const complete = (word?: string) => {
    if (!word) {
      word = value;

      if (matches.length === 1) {
        word = matches[0];
      }
      console.log(value);
    }

    const appendSpace = message.length === lastWord.length ? "" : " ";
    console.log(
      `${
        message?.slice(
          0,
          message.length - 1 - lastWord.length - 1 < 0
            ? 0
            : message.length - 1 - lastWord.length
        ) + appendSpace
      }${word}`,
      word
    );
    setMessage(
      `${
        message?.slice(
          0,
          message.length - 1 - lastWord.length - 1 < 0
            ? 0
            : message.length - 1 - lastWord.length
        ) + appendSpace
      }${word}`
    );
  };

  if (!inputRef.current) return null;

  return (
    <div
      className={"absolute bottom-0"}
      style={{
        left: getCaretCoordinates(
          inputRef.current,
          inputRef.current.selectionEnd ?? 0
        ).left,
      }}
    >
      <Command value={value}>
        <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {matches.map((word) => (
              <CommandItem
                key={word}
                value={word}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);

                  complete(currentValue === value ? "" : currentValue);
                }}
                onMouseOver={() => setValue(word)}
              >
                {word}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

const ForwardedComponent = React.forwardRef(AutocompletePlaceholder);

ForwardedComponent.displayName = "AutocompletePlaceholder";

export default ForwardedComponent;
