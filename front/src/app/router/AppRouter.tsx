import { JSX } from "react";
import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { RootLayout } from "@/app/layout/RootLayout";
import HomePage from "@/features/home/HomePage";
import TablesPage from "@/features/tables/TablesPage";
import SimaRecordsListPage from "@/features/sima/records/SimaRecordsListPage";
import InstitutionalPage from "@/features/sima/institutional/InstitutionalPage";
import SimaTablesPage from "@/features/sima/tables/SimaTablesPage";
import FurnasPage from "@/features/furnas/FurnasPage";
import BalcarPage from "@/features/balcar/BalcarPage";

/** Agrupa as rotas da seção SIMA sob um Outlet compartilhado. */
function SimaSection(): JSX.Element {
  return <Outlet />;
}

/**
 * Define todas as rotas da aplicação dentro do RootLayout (chrome fixo).
 */
export function AppRouter(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/sima" element={<SimaSection />}>
            <Route index element={<SimaRecordsListPage />} />
            <Route path="institucional" element={<InstitutionalPage />} />
          </Route>

          <Route path="/simas" element={<Navigate to="/sima/institucional" replace />} />

          <Route path="/furnas" element={<FurnasPage />} />
          <Route path="/balcar" element={<BalcarPage />} />

          <Route path="/tables/sima" element={<SimaTablesPage />} />
          <Route path="/tables/:slug" element={<TablesPage />} />

          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
