import { type ReactNode, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createAppQueryClient } from "../lib/queryClient";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => createAppQueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
