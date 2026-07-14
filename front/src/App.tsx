import { HashRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import HomePage from "./pages/HomePage";
import TablesPage from "./pages/TablesPage";
import SimaPage from "./pages/SimaPage";
import SimasPage from "./pages/SimasPage";
import FurnasPage from "./features/furnas/FurnasPage";
import BalcarPage from "./pages/BalcarPage";
import SimaTablesPage from "./pages/SimaTablesPage";

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
              <Route index element={<SimaPage />} />
              <Route path="institucional" element={<SimasPage />} />
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
