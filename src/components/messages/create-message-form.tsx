"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, SendIcon } from "lucide-react";
import React, { useState } from "react";

import { sendMessage } from "@/lib/actions/send-message";

import FormTextAreaInput from "../form/form-textarea-input";
import { Button } from "../ui/button";

interface Props {
  conversationId: number | null;
}

function CreateMessageForm({ conversationId }: Props) {
  const queryClient = useQueryClient();

  const [text, setText] = useState("");

  const { data, mutate, isPending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      if (!data?.error) {
        setText("");
      }
    },
    onSettled: () => {
      if (!conversationId) {
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      }
      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ text, conversationId: conversationId ?? undefined });
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <FormTextAreaInput
        id="text"
        name="text"
        placeholder="Enter your message..."
        errors={data?.errors}
        disabled={isPending}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto"
        disabled={isPending}
      >
        {isPending ? (
          <LoaderCircle className="h-5 w-5 animate-spin text-foreground" />
        ) : (
          <SendIcon className="h-5 w-5 text-foreground" />
        )}
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
}

export default CreateMessageForm;
