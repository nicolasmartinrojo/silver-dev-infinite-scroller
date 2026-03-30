"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Creamos una instancia que maneja cache y queries
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
