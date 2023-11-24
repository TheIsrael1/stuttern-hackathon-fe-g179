import AskChat from '@/components/ask-chat';

export default async function page() {
  // TODO: We can fetch history here on the server

  return (
    <main className="w-full h-full">
      <AskChat />
    </main>
  );
}
