export default class SettingsService {
  static applyThemeFromState(theme: string) {
    if (theme) {
      this.applyTheme(theme);
    }
  }

  static applyTheme(color: string) {
    const oldLink = document.getElementById("theme-link");
    if (oldLink) {
      oldLink.setAttribute("href", `/theme/dist/${color}.css`);
      return;
    }
    const link = document.createElement("link");
    link.setAttribute("id", "theme-link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", `/theme/dist/${color}.css`);
    const head = document.getElementsByTagName("head").item(0);
    if (!head) {
      return;
    }
    head.appendChild(link);
  }
}
