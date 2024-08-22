import { getCaretCoordinates } from "@/lib/utils";
import { CommandPlaceholder } from "@/types/command-placeholder";

export default function ImagePlaceholder({
  commandParameters,
  inputRef,
}: CommandPlaceholder) {
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
      <img
        height={"100px"}
        width={"100px"}
        alt="random"
        className="rounded-lg"
        src={"https://picsum.photos/id/" + commandParameters[0] + "/200"}
      />
    </div>
  );
}
