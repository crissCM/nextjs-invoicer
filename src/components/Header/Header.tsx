import React from "react";
import DarkMode from "../DarkMode/DarkMode";
import { APP_NAME } from "src/utils";
import WalletLogin from "../WalletLogin";
import { Nav } from "react-bootstrap";

function Header() {
  return (
    <Nav className="navbar navbar-expand-lg">
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
