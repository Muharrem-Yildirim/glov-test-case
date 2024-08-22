import clsx from "clsx";
import { MessageHistoryElement, MessageType } from "../chat";
import Image from "next/image";

export default function ChatMessage({
  messageHistoryData,
}: {
  messageHistoryData: MessageHistoryElement;
}) {
  return (
    <div className={clsx(messageHistoryData?.isSystemMessage && "m-auto")}>
      {messageHistoryData.type === MessageType.TEXT ? (
        <TextBubble messageHistory={messageHistoryData} />
      ) : (
        <ImageBubble messageHistory={messageHistoryData} />
      )}
    </div>
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
        "py-2 px-3 rounded-2xl text-white font-roboto inline-block",
        messageHistory.isLocal ? "float-right bg-[#5d5d5d]" : "bg-[#2f2f2f]",
        messageHistory.isSystemMessage && "italic bg-[#d75757]"
      )}
    >
      {messageHistory.sender && !messageHistory.isLocal && (
        <>
          <span className="inline-block text-xs italic">
            {messageHistory.sender.name}
          </span>
          <br />
        </>
      )}

      <span>{messageHistory.message}</span>
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
        "bg-[#2f2f2f] inline-block p-2  rounded-2xl font-serif text-white font-roboto",
        messageHistory.isSystemMessage && "ml-auto mr-auto",
        messageHistory.isLocal && " float-right"
      )}
    >
      <img
        alt="random"
        className="rounded-lg"
        src={"https://picsum.photos/id/" + number + "/200"}
      />
    </div>
  );
}
