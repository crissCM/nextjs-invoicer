import { Nav } from "react-bootstrap";
import { AlgoUsd } from "src/hooks/usePrice";
import { APP_NAME } from "src/utils";
import DarkMode from "../DarkMode/DarkMode";
import WalletLogin from "../WalletLogin";

export interface HeaderProps {
  algoPrice: AlgoUsd[] | undefined;
}

function Header({ algoPrice }: HeaderProps) {
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
        <div className="AlgoPriceLabelDiv">
          <span className="AlgoPricePre">ALGO Price:&nbsp;</span>
          <span className="AlgoPriceValue">
            {`$${algoPrice?.length === 1 ? algoPrice[0].price : ""}`}
          </span>
        </div>
        <span className="i18n-select">
          <WalletLogin />
        </span>
        <DarkMode />
      </div>
    </Nav>
  );
}

export default Header;
