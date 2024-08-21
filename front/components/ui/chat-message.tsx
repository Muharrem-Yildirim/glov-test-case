import clsx from "clsx";

export default function ChatMessage({
  message,
  isLocal,
}: {
  message: string;
  isLocal: boolean;
}) {
  return (
    <div
      className={clsx(
        " py-2 px-3 rounded-2xl font-serif text-white font-roboto",
        isLocal ? "bg-[#2f2f2f]" : ""
      )}
    >
      {message}
    </div>
  );
}
