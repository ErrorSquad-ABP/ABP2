import { HashRouter as Router, Routes, Route } from "react-router-dom";
import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import HomePage from "./pages/HomePage";
import TablesPage from "./pages/TablesPage";
import SimaPage from "./pages/SimaPage";
import SimasPage from "./pages/SimasPage";
import FurnasPage from "./pages/FurnasPage";
import BalcarPage from "./pages/BalcarPage";
import SimaTablesPage from "./pages/SimaTablesPage"; // rota específica para SIMA

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Router>
        <BarraBrasil />
        <MenuBar />
        <div className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Páginas individuais */}
            <Route path="/sima" element={<SimaPage />} />
            <Route path="/simas" element={<SimasPage />} />
            <Route path="/furnas" element={<FurnasPage />} />
            <Route path="/balcar" element={<BalcarPage />} />

            {/* Rota específica para SIMA tables (apontada pelo card SIMA) */}
            <Route path="/tables/sima" element={<SimaTablesPage />} />

            {/* Rota genérica para demais tabelas (slug dinâmico) */}
            <Route path="/tables/:slug" element={<TablesPage />} />

            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
