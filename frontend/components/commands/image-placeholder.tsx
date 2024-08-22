import { getCaretCoordinates } from "@/lib/utils";
import { CommandPlaceholder } from "@/types/command-placeholder";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImagePlaceholder({
  commandParameters,
  inputRef,
}: CommandPlaceholder) {
  const [src, setSrc] = useState<string>(
    "https://picsum.photos/id/" + commandParameters[0] + "/200"
  );

  useEffect(() => {
    setSrc("https://picsum.photos/id/" + commandParameters[0] + "/200");
  }, [commandParameters]);

  if (!inputRef.current) return;
  if (commandParameters.length == 0 || commandParameters[0] === "") return;

  return (
    <div
      className="absolute bottom-2 left-2 bg-white rounded-xl p-1"
      style={{
        left: getCaretCoordinates(
          inputRef.current,
          inputRef.current.selectionEnd ?? 0
        ).left,
      }}
    >
      <Image
        height={100}
        width={100}
        alt="random"
        className="rounded-lg"
        src={src}
        onError={() => {
          setSrc("https://picsum.photos/200/200");
        }}
      />
    </div>
  );
}
