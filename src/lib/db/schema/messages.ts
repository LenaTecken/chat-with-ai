import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { conversations } from "./conversations";

export const senderEnum = pgEnum("sender", ["user", "assistant"]);

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  conversationId: integer("conversation_id")
    .references(() => conversations.id)
    .notNull(),
  sender: senderEnum("sender").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
