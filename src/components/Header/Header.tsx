import { Nav } from "react-bootstrap";
import { APP_NAME } from "src/utils";
import DarkMode from "../DarkMode/DarkMode";
import WalletLogin from "../WalletLogin";

function Header() {
  return (
    <Nav className="navbar navbar-expand-lg" style={{ zIndex: 100 }}>
      <a className="algocloud-navbar-brand" href=".">
        <div className="navbarLogoParent">
          <img id="app-logo" className="app-logo" src="app-logo.png" />
          <div className="algocloud-font">{APP_NAME}</div>
        </div>
      </a>

      <div
        className="last-child"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}>
        <span className="i18n-select">
          <WalletLogin />
        </span>
        <DarkMode />
      </div>
    </Nav>
  );
}

export default Header;
