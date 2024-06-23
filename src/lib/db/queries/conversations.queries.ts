import "server-only";
import { desc } from "drizzle-orm";
import { PostgresError } from "postgres";

import { db } from "..";
import {
  CreateConversation,
  conversations,
} from "../schema/conversations.schema";

export async function getConversations() {
  try {
    const allConversations = await db
      .select()
      .from(conversations)
      .orderBy(desc(conversations.createdAt));

    return { success: true, data: allConversations };
  } catch (e) {
    const error = e as PostgresError;

    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

export async function createConversation(conversation: CreateConversation) {
  const newConversation = await db
    .insert(conversations)
    .values(conversation)
    .returning({ id: conversations.id });

  return newConversation[0].id;
}
