import { Input } from "./input";

export default function ChatInput({
  setMessage: setMessage,
  sendMessage,
}: {
  setMessage: (message: string) => void;
  sendMessage: () => void;
}) {
  return (
    <>
      <Input
        onChange={(e) => setMessage(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            sendMessage();
          }
        }}
      />
    </>
  );
}
