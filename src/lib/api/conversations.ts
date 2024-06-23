import { Conversation } from "../db/schema/conversations";

export async function fetchConversations() {
  const res = await fetch("/api/conversations");
  const data = await res.json();

  return data as Conversation[];
}
