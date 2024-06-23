import { format } from "date-fns";
import React from "react";

import { Message } from "@/lib/db/schema/messages";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  createdAt: Date;
  sender: Message["sender"];
}

function ChatMessage({ text, createdAt, sender }: Props) {
  return (
    <article
      className={cn("flex gap-4", {
        "items-end self-end": sender === "user",
        "items-start self-start": sender === "assistant",
      })}
    >
      <div className="flex flex-col gap-1 text-sm">
        <h5 className="font-medium text-foreground">
          {sender === "user" ? "You" : "Assistant"}
        </h5>
        <div className="rounded-2xl bg-muted p-3 text-foreground">{text}</div>
        <span className="text-xs text-secondary-foreground">
          {format(createdAt, "hh:mm a")}
        </span>
      </div>
    </article>
  );
}

export default ChatMessage;
