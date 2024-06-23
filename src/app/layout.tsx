import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import ConversationsNav from "@/components/conversations/conversations-nav";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chat with AI",
  description: "Chat with LLM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-dvh flex-col md:flex-row">
          <div className="bg-background">
            <ConversationsNav />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
