import "server-only";
import { asc, eq } from "drizzle-orm";
import { PostgresError } from "postgres";

import { db } from "..";
import { CreateMessage, messages } from "../schema/messages.schema";

export async function getConversationMessages(conversationId: number) {
  try {
    const conversationMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(asc(messages.createdAt));

    return { success: true, data: conversationMessages };
  } catch (e) {
    const error = e as PostgresError;

    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

export async function createMessages(msgs: CreateMessage[]) {
  const newMessages = await db.insert(messages).values(msgs).returning();

  return newMessages;
}
