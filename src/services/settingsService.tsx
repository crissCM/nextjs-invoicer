export default class SettingsService {
  static applyThemeFromState() {
    // const currentSettings = AuthCurrentTenant.getSettings();

    // if (currentSettings) {
    //   return this.applyTheme(currentSettings.theme);
    // }

    const theme = localStorage.getItem("theme");

    if (theme && theme === "light") {
      this.applyTheme(theme);
    } else {
      this.applyTheme("default");
    }
  }

  static applyTheme(color: string) {
    const oldLink = document.getElementById("theme-link");

    if (oldLink) {
      oldLink.setAttribute(
        "href",
        `${process.env.PUBLIC_URL}/theme/dist/${color}.css`
      );
      return;
    }

    const link = document.createElement("link");
    link.setAttribute("id", "theme-link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute(
      "href",
      `${process.env.PUBLIC_URL}/theme/dist/${color}.css`
    );

    const head = document.getElementsByTagName("head").item(0);

    if (!head) {
      return;
    }

    head.appendChild(link);
  }
}
