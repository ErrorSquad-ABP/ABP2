import type { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "#2563eb",
    primaryDark: "#1e40af",
    background: "#f9fafb",
    text: {
      base: "#111827",
      inverse: "#ffffff", // <-- agora existe
    },
  },
  fonts: {
    body: "'Helvetica Neue', Arial, sans-serif",
    size: {
      small: "0.875rem",
      medium: "1rem",
      large: "1.25rem",
    },
    weight: {
      normal: 400,
      bold: 600,
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  borderRadius: "0.375rem",
  shadows: {
    small: "0 1px 2px rgba(0,0,0,0.05)",
    medium: "0 4px 6px rgba(0,0,0,0.1)",
  },
};

export default theme;
