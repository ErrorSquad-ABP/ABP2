import { JSX, ReactNode } from "react";
import {
  HeaderContainer,
  HeaderSeparator,
  HeaderText,
  HeaderWrapper,
  Menu,
  MenuItem,
  PageContainer,
  Separator,
} from "./campanhaChrome";

export interface CampanhaTab {
  /** Identificador da aba (usado como chave e para controlar a aba ativa). */
  id: string;
  /** Rótulo exibido no menu. */
  label: string;
  /** Quando definido, a aba vira um link externo em vez de trocar a seção ativa. */
  externalUrl?: string;
}

interface TabbedShellProps {
  /** Título exibido no cabeçalho (usado quando `titleContent` não é informado). */
  title?: string;
  /**
   * Conteúdo customizado do cabeçalho. Quando informado, substitui o
   * `<HeaderText>` padrão (útil quando a página precisa de título + subtítulo).
   */
  titleContent?: ReactNode;
  /** Abas disponíveis no menu. */
  tabs: CampanhaTab[];
  /** Aba atualmente ativa. */
  activeTab: string;
  /** Chamado quando o usuário seleciona uma aba interna. */
  onTabChange: (id: string) => void;
  /** Conteúdo da aba ativa. */
  children: ReactNode;
}

/**
 * Moldura reutilizável das páginas institucionais de campanha: renderiza o
 * cabeçalho com título, o menu de abas (com suporte a link externo) e delega
 * o conteúdo da aba ativa para `children`.
 */
export function TabbedShell({
  title,
  titleContent,
  tabs,
  activeTab,
  onTabChange,
  children,
}: Readonly<TabbedShellProps>): JSX.Element {
  return (
    <PageContainer>
      <HeaderWrapper>
        <HeaderSeparator />
        <HeaderContainer>{titleContent ?? <HeaderText>{title}</HeaderText>}</HeaderContainer>
        <Separator />
        <Menu>
          {tabs.map((tab) =>
            tab.externalUrl ? (
              <MenuItem key={tab.id}>
                <a
                  href={tab.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {tab.label}
                </a>
              </MenuItem>
            ) : (
              <MenuItem
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.label}
              </MenuItem>
            ),
          )}
        </Menu>
      </HeaderWrapper>
      {children}
    </PageContainer>
  );
}
