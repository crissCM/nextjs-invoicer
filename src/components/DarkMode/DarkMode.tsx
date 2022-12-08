import { useState } from "react";
import { THEME, THEME_KEY } from "src/utils";
import localStore from "store";

const DarkMode = () => {
  const [theme, setTheme] = useState(THEME.DARK);

  const setDark = () => {
    localStore.set(THEME_KEY, THEME.DARK);
  };

  const setLight = () => {
    localStore.set(THEME_KEY, THEME.LIGHT);
  };

  const toggleTheme = (e: any) => {
    const storedTheme = localStore.get(THEME_KEY);
    if (storedTheme === THEME.LIGHT || storedTheme === null) {
      setDark();
      setTheme(THEME.DARK);
    } else {
      setLight();
      setTheme(THEME.LIGHT);
    }
  };

  return (
    <div className="toggle-theme-wrapper">
      <label className="dropdown-item" htmlFor="checkbox">
        {theme === "dark" ? (
          <div className="lightmode-toggle" onClick={toggleTheme}>
            <i id="sun" className="fas fa-sun" /> Lightmode
          </div>
        ) : (
          <div className="darkmode-toggle" onClick={toggleTheme}>
            <i id="moon" className="fas fa-moon" /> Darkmode
          </div>
        )}
      </label>
    </div>
  );
};

export default DarkMode;
