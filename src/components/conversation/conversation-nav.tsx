"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { fetchConversations } from "@/lib/api/conversations";
import { Conversation } from "@/lib/db/schema/conversations.schema";

import ConversationItem from "./conversation-item";

interface Props {
  initialData: Conversation[];
  success?: boolean;
}

function ConversationsNav({ initialData, success }: Props) {
  const { data, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
    initialData,
    staleTime: 60 * 1000,
  });
  const isError = success === false || !!error;

  return (
    <nav className="overflow-auto">
      {isError ? (
        <p className="px-4 py-3 text-destructive">
          Error loading conversations
        </p>
      ) : (
        data.map(({ createdAt, id, title }) => (
          <ConversationItem key={id} id={id} date={createdAt} title={title} />
        ))
      )}
    </nav>
  );
}

export default ConversationsNav;
