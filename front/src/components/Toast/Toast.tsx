import React from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";

interface ToastProps {
  id: number;
  message: string;
  color: string;
  emoji: string;
}

export const Toast: React.FC<ToastProps> = ({ message, color, emoji }) => {
  const theme = useTheme();

  const isDark = theme?.mode === "dark";

  return (
    <ToastContainer
      as={motion.div}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      $color={color}
      $isDark={isDark}
    >
      {emoji && <span className="emoji">{emoji}</span>}
      <p>{message}</p>
    </ToastContainer>
  );
};

const ToastContainer = styled.div<{ $color: string; $isDark: boolean }>`
  background-color: ${({ $color }) => $color + "cc"}; /* 80% opacidade */
  color: ${({ $isDark }) => ($isDark ? "#f9f9f9" : "#fff")};
  padding: 0.75rem 1rem;
  border-radius: 12px;
  min-width: 260px;
  box-shadow: ${({ $isDark }) =>
    $isDark
      ? "0 4px 16px rgba(0,0,0,0.6)"
      : "0 4px 16px rgba(0,0,0,0.15)"};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.95rem;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  border: ${({ $isDark }) => ($isDark ? "1px solid rgba(255,255,255,0.1)" : "none")};

  .emoji {
    font-size: 1.2rem;
  }
`;
