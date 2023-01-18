import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import ConnectWallet from "../Reach/ConnectWallet";
import WalletModal from "../WalletModal";

function Header() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <ConnectWallet />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
