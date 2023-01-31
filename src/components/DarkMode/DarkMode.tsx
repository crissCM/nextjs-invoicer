import { useState } from "react";
import localStore from "store";
import { THEME, THEME_KEY } from "src/utils";
import { useAppDispatch } from "src/store/hooks";
import { updateTheme } from "src/store/ui";

const DarkMode = () => {
  const dispatch = useAppDispatch();

  const [theme, setTheme] = useState(THEME.DARK);

  const setDark = () => {
    localStore.set(THEME_KEY, THEME.DARK);
  };

  const setLight = () => {
    localStore.set(THEME_KEY, THEME.LIGHT);
  };

  const toggleTheme = (e: any) => {
    let theme = "";
    const storedTheme = localStore.get(THEME_KEY);
    if (storedTheme === THEME.LIGHT || storedTheme === null) {
      theme = THEME.DARK;
      setDark();
      setTheme(THEME.DARK);
    } else {
      theme = THEME.LIGHT;
      setLight();
      setTheme(THEME.LIGHT);
    }
    dispatch(updateTheme(theme));
  };
  return (
    <div className="toggle-theme-wrapper">
      <label className="dropdown-item" htmlFor="checkbox">
        {theme === THEME.DARK ? (
          <div
            className="lightmode-toggle"
            onClick={toggleTheme}
            aria-hidden="true">
            <i id="sun" className="fas fa-sun" /> Lightmode
          </div>
        ) : (
          <div
            className="darkmode-toggle"
            onClick={toggleTheme}
            aria-hidden="true">
            <i id="moon" className="fas fa-moon" /> Darkmode
          </div>
        )}
      </label>
    </div>
  );
};

export default DarkMode;
