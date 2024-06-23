"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

import { getQueryClient } from "@/lib/api/query";

function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Providers;
