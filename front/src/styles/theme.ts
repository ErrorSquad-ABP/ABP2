// src/styles/theme.ts
import type { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  mode: "light",
  colors: {
    primary: "#2563eb",
    primaryDark: "#1e40af",
    background: "#f9fafb",
    text: {
      default: "#000000",
      base: "#111827",
      inverse: "#ffffff",
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

export const darkTheme: DefaultTheme = {
  mode: "dark",
  colors: {
    primary: "#3b82f6",
    primaryDark: "#1e3a8a",
    background: "#111827",
    text: {
      default: "#f9fafb",
      base: "#e5e7eb",
      inverse: "#000000",
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
    small: "0 1px 2px rgba(255,255,255,0.05)",
    medium: "0 4px 6px rgba(0,0,0,0.4)",
  },
};

// export default para compatibilidade com importações antigas
const theme = lightTheme;
export default theme;