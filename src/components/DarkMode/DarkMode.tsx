import { THEME, THEME_KEY } from "src/utils";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { updateTheme } from "src/store/ui";
import SettingsService from "src/services/settingsService";

const DarkMode = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.ui);

  const toggleTheme = (e: any) => {
    dispatch(updateTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
    SettingsService.applyThemeFromState();
  };

  return (
    <div className="toggle-theme-wrapper">
      <label className="dropdown-item" htmlFor="checkbox">
        {theme === THEME.DARK ? (
          <div
            className="lightmode-toggle"
            onClick={toggleTheme}
            aria-hidden="true">
            <i id="sun" className="fas fa-sun" /> Light
          </div>
        ) : (
          <div
            className="darkmode-toggle"
            onClick={toggleTheme}
            aria-hidden="true">
            <i id="moon" className="fas fa-moon" /> Dark
          </div>
        )}
      </label>
    </div>
  );
};

export default DarkMode;
