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
import { socket } from "@/lib/socket";
import useChatContext from "@/hook/chat-hook";
import selectOptions from "@/consts/select-options";
import { CommandPlaceholder } from "@/types/command-placeholder";

export default function SelectPlaceholder({ inputRef }: CommandPlaceholder) {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState("");
  const chatContext = useChatContext();
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    ref.current.focus();
  }, []);

  if (!open) return null;
  if (!inputRef.current) return null;

  return (
    <div
      className={"absolute bottom-2"}
      style={{
        left: getCaretCoordinates(
          inputRef.current,
          inputRef.current.selectionEnd ?? 0
        ).left,
      }}
    >
      <Command ref={ref}>
        <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {selectOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);

                  socket.emit("chat::sendMessage", currentValue);

                  chatContext.clearInput();
                  inputRef.current!.focus();
                }}
              >
                {option.value}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
