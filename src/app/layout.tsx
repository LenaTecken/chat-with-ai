import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import ConversationSidebar from "@/components/conversation/conversation-Sidebar";
import Providers from "@/components/providers";

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
        <Providers>
          <main className="flex h-screen flex-col md:flex-row">
            <ConversationSidebar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
