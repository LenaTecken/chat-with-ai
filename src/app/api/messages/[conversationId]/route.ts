import { getConversationMessages } from "@/lib/db/queries/messages.queries";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  const messages = await getConversationMessages(
    parseInt(params.conversationId)
  );

  return Response.json(messages.data);
}
