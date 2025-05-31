import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/index.css";
import App from "@/App";
import { ThemeProvider } from "@/context/theme-context";
import { FontProvider } from "@/context/font-context";
import { AuthProvider } from "@/context/auth-context";
import { UseConfirmProvider } from "use-confirm-hook";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <FontProvider>
            <BrowserRouter>
              <UseConfirmProvider>
                <App />
                <Toaster />
                <ConfirmDialog />
              </UseConfirmProvider>
            </BrowserRouter>
          </FontProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
