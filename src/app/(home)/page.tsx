import ChatMessages from "@/components/messages/chat-messages";
import CreateMessageForm from "@/components/messages/create-message-form";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <ChatMessages conversationId={null} initialMessages={[]} />
      <section className="sticky bottom-0 border-t border-border bg-background px-4 py-3">
        <CreateMessageForm conversationId={null} />
      </section>
    </div>
  );
}
