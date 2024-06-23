import { Message } from "../db/schema/messages.schema";

export async function fetchMessages(conversationId: number | null) {
  if (!conversationId) {
    return [];
  }

  const res = await fetch(`/api/messages/${conversationId}`);
  const data = await res.json();

  return data as Message[];
}
