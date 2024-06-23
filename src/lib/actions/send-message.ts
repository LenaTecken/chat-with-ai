"use server";

import { redirect } from "next/navigation";
import { ZodError, z } from "zod";

import { createConversation } from "../db/queries/conversations.queries";
import { createMessage } from "../db/queries/messages.queries";

const scheme = z.object({
  conversationId: z.coerce.number().optional(),
  text: z.string().min(1, { message: "Message cannot be empty" }),
});

export async function sendMessage(formData: FormData) {
  try {
    const data = scheme.parse({
      conversationId: formData.get("conversationId"),
      text: formData.get("text"),
    });

    if (!data.conversationId) {
      const conversationId = await createConversation({
        title: data.text.split(".")[0].slice(0, 256),
      });

      // TODO: ask ChatGPT to answer

      return redirect(`/conversation/${conversationId}`);
    }

    // TODO: ask ChatGPT to answer
    await createMessage({
      conversationId: data.conversationId,
      text: data.text,
      sender: "user",
    });
  } catch (e) {
    console.log(e);
    const error = e as ZodError;

    if (!error.isEmpty) return error.format();
  }
}
