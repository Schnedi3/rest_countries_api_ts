import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Country } from "./pages/Country";

import "./css/app.css";

export const App = () => {
  return (
    <main className="app container">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:cca3" element={<Country />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};
