import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
  }

  /* ===== Scrollbar WebKit (Chrome, Edge, Opera, Brave) ===== */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #e5efff; /* azul claro suave */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #2563eb; /* azul do tema */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #1d4ed8; /* azul mais escuro no hover */
  }

  /* ===== Scrollbar Firefox ===== */
  * {
    scrollbar-width: thin;
    scrollbar-color: #2563eb #e5efff;
  }
`;

export default GlobalStyle;
