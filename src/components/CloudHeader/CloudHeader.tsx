import React from "react";
import HeaderWrapper from "./HeaderWrapper";
import DarkMode from "../DarkMode/DarkMode";
import { APP_NAME } from "src/utils";

function CloudHeader() {
  return (
    <HeaderWrapper id="stickyTop">
      <div id="stickyTop-2" className="navbar sticky-top">
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
          <span className="i18n-select">{/* <PipeConnect /> */}</span>
          <div className="avatar-dropdown dropdown">
            <span className="user-dropdown" data-toggle="dropdown">
              <div className="user-dropdown-content">
                <span className="user-dropdown-text">
                  <span>userText</span>
                  <div className="dropdown-divider" />
                  <DarkMode />
                  <button
                    onClick={undefined}
                    className="dropdown-item"
                    type="button">
                    <i className="fas fa-sign-out-alt" /> auth.signout
                  </button>
                </span>
              </div>
            </span>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="bg-white dark__bg-1000 rounded-2 py-2 m-25">
                <div className="dropdown-divider" />
                <DarkMode />
                <button
                  onClick={undefined}
                  className="dropdown-item"
                  type="button">
                  <i className="fas fa-sign-out-alt" /> auth.signout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default CloudHeader;
