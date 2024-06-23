import "server-only";
import { PostgresError } from "postgres";

import { db } from "..";
import { conversations } from "../schema/conversations";

export async function getConversations() {
  try {
    const allConversations = await db.select().from(conversations);

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
