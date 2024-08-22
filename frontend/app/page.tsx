import Chat from "@/components/chat";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100dvh)] max-h-[calc(100dvh)] flex-col bg-[#212121] lg:pb-10 pb-2">
      <Chat />
    </main>
  );
}
