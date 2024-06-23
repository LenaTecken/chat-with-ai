"use client";

import { formatRelative } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  id: number;
  title: string;
  date: Date;
}

function ConversationItem({ date, id, title }: Props) {
  const { conversationId } = useParams<{ conversationId: string }>();

  return (
    <Link
      href={`/conversation/${id}`}
      className={cn(
        "flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-muted/50",
        { ["bg-muted/50"]: conversationId === id.toString() }
      )}
      prefetch={false}
    >
      <h4 className="truncate font-medium text-foreground">{title}</h4>
      <span className="text-xs text-muted-foreground">
        {formatRelative(date, new Date())}
      </span>
    </Link>
  );
}

export default ConversationItem;
