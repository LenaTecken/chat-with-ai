"use client";

import { useMutationState, useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import React, { useEffect } from "react";

import { fetchMessages } from "@/lib/api/messages";
import { Message } from "@/lib/db/schema/messages.schema";
import { cn } from "@/lib/utils";

import ChatMessage from "./chat-message";

interface Props {
  conversationId: number | null;
  initialMessages: Message[];
}

function ChatMessages({ conversationId, initialMessages }: Props) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchMessages(conversationId),
    initialData: initialMessages,
    staleTime: initialMessages.length ? 60 * 1000 : 0,
    enabled: !!conversationId,
  });

  const variables = useMutationState<Message>({
    filters: { mutationKey: ["sendMessage"], status: "pending" },
    select: (mutation) => {
      const variable = mutation.state.variables as Message;

      return {
        conversationId: variable.conversationId,
        text: variable.text,
        id: data.length,
        sender: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    },
  });

  const messages = variables.length ? [...data, variables[0]] : data;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <section className="flex-1 overflow-auto bg-background p-4">
      {!!messages.length ? (
        <div className="flex flex-col gap-3">
          {messages.map(({ id, createdAt, sender, text }) => (
            <ChatMessage
              key={id}
              createdAt={createdAt}
              sender={sender}
              text={text}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          {isLoading ? (
            <LoaderCircle className="h-10 w-10 animate-spin text-foreground" />
          ) : (
            <h1
              className={cn("text-4xl text-foreground", {
                "text-destructive": !!error,
              })}
            >
              {!!error
                ? "Could not load messages"
                : "Enter your first prompt..."}
            </h1>
          )}
        </div>
      )}
    </section>
  );
}

export default ChatMessages;
