"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { fetchConversations } from "@/lib/api/conversations";
import { Conversation } from "@/lib/db/schema/conversations";

import ConversationItem from "./conversation-item";

interface Props {
  initialData: Conversation[];
}

function ConversationsNav({ initialData }: Props) {
  const { data } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
    initialData,
    staleTime: 60 * 1000,
  });

  return (
    <nav className="overflow-auto">
      {data.map(({ createdAt, id, title }) => (
        <ConversationItem key={id} id={id} date={createdAt} title={title} />
      ))}
    </nav>
  );
}

export default ConversationsNav;
