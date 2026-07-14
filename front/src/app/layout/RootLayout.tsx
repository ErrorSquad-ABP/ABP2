import { JSX } from "react";
import { Outlet } from "react-router-dom";
import BarraBrasil from "@/app/layout/BarraBrasil";
import MenuBar from "@/app/layout/MenuBar";

/**
 * Layout raiz da aplicação: renderiza o chrome fixo (Barra do Governo Federal
 * e menu de navegação) e delega o conteúdo da rota ativa para o <Outlet />.
 */
export function RootLayout(): JSX.Element {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <BarraBrasil />
      <MenuBar />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
}
