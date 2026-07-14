import { JSX } from "react";
import { ThemeProvider } from "styled-components";
import { AppProviders } from "@/shared/providers/AppProviders";
import { ToastProvider } from "@/components/Toast/ToastProvider";
import GlobalStyle from "@/styles/GlobalStyle";
import theme from "@/styles/theme";
import { AppRouter } from "@/app/router/AppRouter";

/**
 * Raiz da aplicação: compõe os provedores globais (Query, tema, toasts) ao
 * redor do roteador. O `main.tsx` apenas monta este componente no DOM.
 */
export default function App(): JSX.Element {
  return (
    <AppProviders>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <GlobalStyle />
          <AppRouter />
        </ToastProvider>
      </ThemeProvider>
    </AppProviders>
  );
}
