"use server";

import { redirect } from "next/navigation";
import { ZodError, z } from "zod";

import { sendMessageToOpenAI } from "../api/openai";
import { createConversation } from "../db/queries/conversations.queries";
import {
  createMessages,
  getConversationMessages,
} from "../db/queries/messages.queries";

const scheme = z.object({
  conversationId: z.coerce.number().optional(),
  text: z.string().min(1, { message: "Message cannot be empty" }),
});

type SendMessageData = z.infer<typeof scheme>;

export async function sendMessage(payload: SendMessageData) {
  let shouldRedirect = false;
  let conversationId: number | null = null;

  try {
    const data = scheme.parse(payload);

    if (!data.conversationId) {
      const newConversationId = await createConversation({
        title: data.text.split(".")[0].slice(0, 256),
      });
      conversationId = newConversationId;
      shouldRedirect = true;
    } else {
      conversationId = data.conversationId;
    }

    const newMessageDate = new Date();
    const previousMessages = !data.conversationId
      ? []
      : (await getConversationMessages(data.conversationId)).data;

    const answer = await sendMessageToOpenAI(
      previousMessages.map((msg) => ({
        role: msg.sender,
        content: msg.text,
      })),
      data.text
    );

    await createMessages([
      {
        conversationId,
        text: data.text,
        sender: "user",
        createdAt: newMessageDate,
      },
      {
        conversationId,
        text: answer ?? "Sorry, I couldn't answer your question",
        sender: "assistant",
        createdAt: newMessageDate,
      },
    ]);
  } catch (e) {
    console.log(e);
    const error = e as ZodError;

    if (!error.isEmpty) return { error: true, errors: error.format() };
  }

  if (shouldRedirect) {
    redirect(`/conversation/${conversationId}`);
  }
}
