"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, SendIcon } from "lucide-react";
import React from "react";

import { sendMessage } from "@/lib/actions/send-message";
import { Message } from "@/lib/db/schema/messages.schema";

import FormTextAreaInput from "../form/form-textarea-input";
import { Button } from "../ui/button";

interface Props {
  conversationId: number | null;
}

function CreateMessageForm({ conversationId }: Props) {
  const queryClient = useQueryClient();

  const { data, mutate, isPending } = useMutation({
    mutationFn: sendMessage,
    onMutate: async (formData) => {
      const convId = formData.get("conversationId");
      const text = formData.get("text");
      if (!convId) {
        return;
      }

      await queryClient.cancelQueries({
        queryKey: ["messages", conversationId],
      });

      const previousMessages = queryClient.getQueryData(["messages", convId]);
      queryClient.setQueryData(["messages", convId], (old: Message[]) => [
        ...old,
        {
          id: old.length,
          createdAt: new Date(),
          sender: "user",
          text: text,
        },
      ]);

      return { previousMessages };
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
  console.log(data);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData);
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="conversationId"
        value={conversationId ?? undefined}
      />
      <FormTextAreaInput
        id="text"
        name="text"
        placeholder="Enter your message..."
        errors={data}
        disabled={isPending}
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
