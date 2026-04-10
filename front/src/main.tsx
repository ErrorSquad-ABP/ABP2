import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import { AppProviders } from "./shared/providers/AppProviders";
import { ToastProvider } from "./components/Toast/ToastProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <GlobalStyle />
          <App />
        </ToastProvider>
      </ThemeProvider>
    </AppProviders>
  </React.StrictMode>,
);
