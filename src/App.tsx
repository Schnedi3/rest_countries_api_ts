import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CountriesProvider } from "./context/CountriesContext";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import "./css/app.css";

export const App = () => {
  return (
    <main className="app container">
      <CountriesProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:name" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </CountriesProvider>
    </main>
  );
};
