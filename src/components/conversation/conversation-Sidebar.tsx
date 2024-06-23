import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

import { getConversations } from "@/lib/db/queries/conversations.queries";

import ConversationsNav from "./conversation-nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

async function ConversationSidebar() {
  const { data } = await getConversations();

  return (
    <>
      <aside className="hidden w-full max-w-64 border-r border-r-border bg-background md:block">
        <header className="sticky top-0 flex items-center border-b border-border px-4 py-3">
          <Link href="/">
            <h3 className="text-lg font-semibold text-foreground">
              Conversations
            </h3>
          </Link>
        </header>
        <ConversationsNav initialData={data} />
      </aside>
      <div className="bg-background">
        <Sheet>
          <SheetTrigger className="flex h-10 w-10 items-center justify-center text-foreground hover:bg-muted/50 md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-64 px-0">
            <SheetHeader className="flex justify-start border-b border-border px-4 py-3 text-left">
              <SheetTitle className="text-lg font-semibold text-foreground">
                Conversations
              </SheetTitle>
            </SheetHeader>
            <ConversationsNav initialData={data} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default ConversationSidebar;
