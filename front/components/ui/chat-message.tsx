import clsx from "clsx";
import { MessageHistoryElement, MessageType } from "../chat";
import Image from "next/image";

export default function ChatMessage({
  messageHistoryData,
}: {
  messageHistoryData: MessageHistoryElement;
}) {
  return messageHistoryData.type === MessageType.TEXT ? (
    <TextBubble messageHistory={messageHistoryData} />
  ) : (
    <ImageBubble messageHistory={messageHistoryData} />
  );
}

function TextBubble({
  messageHistory,
}: {
  messageHistory: MessageHistoryElement;
}) {
  return (
    <div
      className={clsx(
        " py-2 px-3 rounded-2xl font-serif text-white font-roboto",
        messageHistory.isLocal ? "bg-[#2f2f2f]" : ""
      )}
    >
      {messageHistory.message}
    </div>
  );
}

function ImageBubble({
  messageHistory,
}: {
  messageHistory: MessageHistoryElement;
}) {
  const number = messageHistory.message.split(" ")[1];

  return (
    <div
      className={clsx(
        " py-2 px-3 rounded-2xl font-serif text-white font-roboto",
        messageHistory.isLocal ? "bg-[#2f2f2f]" : ""
      )}
    >
      <img alt="random" src={"https://picsum.photos/200?v=" + number} />
    </div>
  );
}
