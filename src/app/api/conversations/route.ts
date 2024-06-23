import { getConversations } from "@/lib/db/queries/conversations.queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const conversations = await getConversations();

  return Response.json(conversations.data);
}
