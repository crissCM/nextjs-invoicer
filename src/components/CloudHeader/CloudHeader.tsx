import React, { useState } from "react";
import { useDispatch } from "react-redux";
import layoutActions from "./layoutActions";
import HeaderWrapper from "./HeaderWrapper";
import DarkMode from "../DarkMode/DarkMode";

function CloudHeader() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const doToggleMenu = () => {
    const element1 = document.getElementById("main") || {
      style: { margin: "" },
    };
    const element2 = document.getElementById("menu-nav") || {
      style: { position: "", display: "block" },
    };
    const element3 = document.getElementById("body") || {
      style: { position: "" },
    };

    setToggle(!toggle);
    if (window.innerWidth < 575) {
      if (toggle) {
        element1.style.margin = "";
        element2.style.position = "fixed";
        element2.style.display = "block";
        element3.style.position = "relative";
      } else {
        element1.style.margin = "unset";
        element2.style.position = "fixed";
        element2.style.display = "block";
        element3.style.position = "";
      }
    }
    dispatch(layoutActions.doToggleMenu());
  };

  return (
    <HeaderWrapper id="stickyTop">
      <div id="stickyTop-2" className="navbar sticky-top">
        <button
          type="button"
          onClick={doToggleMenu}
          className="btn navbar-toggler-humburger-icon navbar-vertical-toggle">
          <i className="fas fa-bars" />
        </button>
        <a className="algocloud-navbar-brand" href=".">
          <div className="algocloud-font">AlgoCloud</div>
          <svg
            className="algocloud-font-logo"
            xmlns="http://www.w3.org/2000/svg"
            id="algocloud-font-logo"
            data-name="Layer 1"
            viewBox="0 0 230 230">
            <path
              d="M120.38942,116.97445q-4.12061.81445-8.23974,1.43652-4.12134.624-7.47413,1.10254A50.50469,50.50469,0,0,0,92.1238,122.867a20.24693,20.24693,0,0,0-8.33594,6.17969,15.37525,15.37525,0,0,0-2.97022,9.62988q0,8.335,6.08448,12.69531,6.08349,4.36084,15.47412,4.35938a33.942,33.942,0,0,0,15.90527-3.59278,27.81533,27.81533,0,0,0,10.82715-9.72558,25.1984,25.1984,0,0,0,3.92871-13.89356V112.90218a20.87085,20.87085,0,0,1-5.22217,2.251A76.457,76.457,0,0,1,120.38942,116.97445Z"
              fill="currentColor"
            />
            <path
              d="M114.9,5.14529a110,110,0,1,0,110,110A110,110,0,0,0,114.9,5.14529Zm58.66712,175.9776H134.85768V160.71371h-1.14941a40.93579,40.93579,0,0,1-9.48584,12.12109,42.77205,42.77205,0,0,1-14.27686,8.14453,58.15417,58.15417,0,0,1-19.25879,2.92188,60.81052,60.81052,0,0,1-25.104-4.93457,39.67133,39.67133,0,0,1-17.39062-14.65918q-6.37355-9.72363-6.37159-24.29,0-12.26367,4.50342-20.60059a36.46676,36.46676,0,0,1,12.26416-13.41357,59.42139,59.42139,0,0,1,17.67822-7.66553,133.236,133.236,0,0,1,20.83985-3.64111q12.83862-1.34034,20.69629-2.53906,7.85522-1.19679,11.40234-3.59327a8.00139,8.00139,0,0,0,3.54492-7.09033v-.57471q0-9.1018-5.70117-14.085-5.70117-4.9812-16.14453-4.98242-11.02,0-17.53467,4.83887a22.706,22.706,0,0,0-8.62353,12.1206L46.9944,75.72494A51.63992,51.63992,0,0,1,58.30055,52.48959,54.84107,54.84107,0,0,1,80.09889,37.35091Q93.4656,32.0328,111.09548,32.033a94.73173,94.73173,0,0,1,23.52295,2.87452,62.04052,62.04052,0,0,1,20.02539,8.91064,43.61658,43.61658,0,0,1,13.8457,15.47461q5.07788,9.43872,5.07764,22.56445Z"
              fill="currentColor"
            />
          </svg>
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
