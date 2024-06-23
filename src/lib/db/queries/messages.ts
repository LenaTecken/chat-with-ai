import "server-only";
import { desc, eq } from "drizzle-orm";
import { PostgresError } from "postgres";

import { db } from "..";
import { messages } from "../schema/messages";

export async function getConversationMessages(conversationId: number) {
  try {
    const conversationMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(desc(messages.createdAt));

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
