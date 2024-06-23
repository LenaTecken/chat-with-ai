"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import React from "react";

import { fetchMessages } from "@/lib/api/messages";

import ChatMessage from "./chat-message";

interface Props {
  conversationId: number | null;
}

function ChatMessages({ conversationId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchMessages(conversationId),
    enabled: !!conversationId,
    staleTime: !!conversationId ? 60 * 1000 : 0,
  });

  return (
    <section className="flex-1 overflow-auto bg-background p-4">
      {!!data?.length ? (
        <div className="flex flex-col gap-3">
          {data.map(({ id, createdAt, sender, text }) => (
            <ChatMessage
              key={id}
              createdAt={createdAt}
              sender={sender}
              text={text}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          {isLoading ? (
            <LoaderCircle className="h-10 w-10 animate-spin text-foreground" />
          ) : (
            <h1 className="text-4xl text-foreground">
              Enter your first prompt...
            </h1>
          )}
        </div>
      )}
    </section>
  );
}

export default ChatMessages;
