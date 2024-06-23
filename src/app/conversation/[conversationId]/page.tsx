import React from "react";

import ChatMessages from "@/components/messages/chat-messages";
import CreateMessageForm from "@/components/messages/create-message-form";
import { getConversationMessages } from "@/lib/db/queries/messages.queries";

async function ConversationPage({
  params,
}: {
  params: { conversationId: string };
}) {
  const conversationId = parseInt(params.conversationId);

  const messages = await getConversationMessages(conversationId);

  return (
    <div className="flex flex-1 flex-col">
      <ChatMessages
        conversationId={conversationId}
        initialMessages={messages.data}
      />
      <section className="sticky bottom-0 border-t border-border bg-background px-4 py-3">
        <CreateMessageForm conversationId={conversationId} />
      </section>
    </div>
  );
}

export default ConversationPage;
