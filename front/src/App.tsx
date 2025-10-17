import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import SimaPage from "./pages/SimaPage";
import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import HomePage from "./pages/HomePage";
import TablesPage from "./pages/TablesPage";
import SimasPage from "./pages/SimasPage";
import FurnasPage from "./pages/FurnasPage";
import BalcarPage from "./pages/BalcarPage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 🔄 Lê preferência salva no localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // 💾 Salva preferência sempre que mudar
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div className="w-full min-h-screen flex flex-col transition-colors duration-300">
        <Router>
          <BarraBrasil />
          <div className="flex justify-end p-2">
            <button
              onClick={toggleTheme}
              style={{
                background: "none",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              {isDarkMode ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
          <MenuBar />
          <div className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sima" element={<SimaPage />} />
              <Route path="/simas" element={<SimasPage />} />
              <Route path="/furnas" element={<FurnasPage />} />
              <Route path="/balcar" element={<BalcarPage />} />
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
