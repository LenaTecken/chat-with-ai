import { SendIcon } from "lucide-react";

import ChatMessages from "@/components/chat/chat-messages";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <ChatMessages conversationId={null} />
      <section className="sticky bottom-0 flex items-center gap-2 border-t border-border bg-background px-4 py-3">
        <Textarea
          placeholder="Type your message..."
          className="rounded-2xl flex-1 resize-none bg-[#2c2d30] bg-secondary pr-12 text-foreground placeholder:text-foreground/60"
        />
        <Button variant="ghost" size="icon" className="ml-auto">
          <SendIcon className="h-5 w-5 text-foreground" />
          <span className="sr-only">Send</span>
        </Button>
      </section>
    </div>
  );
}
