import { useNavigate } from "react-router-dom";

import { useTheme } from "../hooks/useTheme";
import { iconMoon, iconSun } from "../UIIcons";
import "../css/header.css";
import "../css/themes.css";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "theme-light" ? "theme-dark" : "theme-light");
  };

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header_bg"></div>
      <h1 onClick={handleReturn}>Where in the world?</h1>
      <div className="header_theme" onClick={toggleTheme}>
        <img
          src={theme === "theme-light" ? iconMoon : iconSun}
          alt="theme icon"
        />
        <p>{theme === "theme-light" ? "Dark Mode" : "Light Mode"}</p>
      </div>
    </header>
  );
};
