
export interface ToastMessageConfig {
  message: string;
  color: string;
  emoji: string;
}

export const toastMessages: Record<number, ToastMessageConfig> = {
  101: {
    message: "✅ Sucesso: Dados carregados com sucesso!",
    color: "#27ae60",
    emoji: "✅",
  },
  102: {
    message: "📤 Exportação concluída com sucesso!",
    color: "#2ecc71",
    emoji: "📦",
  },
  201: {
    message: "⚠️ Erro: Você deve escolher pelo menos uma coluna para gerar uma tabela!",
    color: "#e74c3c",
    emoji: "⚠️",
  },
  202: {
    message: "⚠️ Erro: É necessário selecionar um período para continuar.",
    color: "#e74c3c",
    emoji: "⚠️",
  },
  301: {
    message: "ℹ️ Informação: Nenhum dado encontrado para os filtros aplicados.",
    color: "#f1c40f",
    emoji: "ℹ️",
  },
};
