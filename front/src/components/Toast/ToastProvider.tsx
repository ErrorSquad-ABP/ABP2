import React, { createContext, useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Toast } from "./Toast";
import { toastMessages } from "./toastMessages";

interface ToastItem {
  id: number;
  message: string;
  color: string;
  emoji: string;
}

interface ToastContextType {
  showToast: (codigo?: number | null, conteudo?: string, cor?: string, emoji?: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (codigo?: number | null, conteudo?: string, cor?: string, emoji?: string) => {
      const id = Date.now();
      const predefined = codigo ? toastMessages[codigo] : undefined;

      const toast: ToastItem = {
        id,
        message: predefined?.message || conteudo || "Mensagem",
        color: predefined?.color || cor || "#ffffff",
        emoji: predefined?.emoji || emoji || "",
      };

      setToasts((prev) => [...prev, toast]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast key={t.id} {...t} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
