import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import SimaPage from "./pages/SimaPage";
import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import HomePage from "./pages/HomePage";
import TablesPage from "./pages/TablesPage";
import SimasPage from "./pages/SimasPage";
import FurnasPage from "./pages/FurnasPage"


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="w-full min-h-screen flex flex-col">
        <Router>
          <BarraBrasil />
          <MenuBar />
          <div className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sima" element={<SimaPage />} />
              <Route path="/simas" element={<SimasPage />} />
              <Route path="/furnas" element={<FurnasPage />} />
              <Route path="/tables/:slug" element={<TablesPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
