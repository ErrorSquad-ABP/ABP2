import { HashRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import HomePage from "./features/home/HomePage";
import TablesPage from "./features/tables/TablesPage";
import SimaRecordsListPage from "./features/sima/records/SimaRecordsListPage";
import InstitutionalPage from "./features/sima/institutional/InstitutionalPage";
import FurnasPage from "./features/furnas/FurnasPage";
import BalcarPage from "./features/balcar/BalcarPage";
import SimaTablesPage from "./features/sima/tables/SimaTablesPage";

function SimaSection() {
  return <Outlet />;
}

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Router>
        <BarraBrasil />
        <MenuBar />
        <div className="flex-1 w-full">
          <Routes>
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
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
