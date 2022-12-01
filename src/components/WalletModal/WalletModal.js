import { useEffect, useState } from "react";
import { useConnectWallet } from "@txnlab/use-wallet";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch } from "src/store/hooks";
import { updateAddress, updateProvider } from "src/store/algorand";

const walletIds = [
  "Pera Wallet",
  "MyAlgo Wallet",
  "Algo Signer",
  "Wallet Connect",
];

function WalletModal() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { providers, reconnectProviders, accounts, activeAccount } =
    useConnectWallet();

  // Reconnect the session when the user returns to the dApp
  useEffect(() => {
    reconnectProviders();
  }, []);

  useEffect(() => {
    if (
      !!activeAccount &&
      !!activeAccount.address &&
      !!activeAccount.providerId
    ) {
      console.log("p:", activeAccount.providerId);
      dispatch(updateAddress(activeAccount.address));
      dispatch(updateProvider(activeAccount.providerId));
    }
  }, [activeAccount]);

  // Use these properties to display connected accounts to users.
  // They are reactive and presisted to local storage.
  useEffect(() => {
    console.log("connected accounts", accounts);
    console.log("active account", activeAccount);
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Map through the providers.
  // Render account information and "connect", "set active", and "disconnect" buttons.
  // Finally, map through the `accounts` property to render a dropdown for each connected account.
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Connect
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {providers.map(
              (provider) =>
                walletIds.includes(provider.id) && (
                  <div key={"provider-" + provider.id}>
                    <h4>
                      <img width={30} height={30} src={provider.icon} />
                      {provider.name} {provider.isActive && "[active]"}
                    </h4>
                    <div>
                      <button
                        onClick={provider.connect}
                        disabled={provider.isConnected}>
                        Connect
                      </button>
                      <button
                        onClick={provider.disconnect}
                        disabled={!provider.isConnected}>
                        Disonnect
                      </button>
                      <button
                        onClick={provider.setActive}
                        disabled={!provider.isConnected || provider.isActive}>
                        Set Active
                      </button>
                      {provider.isActive && provider.accounts.length && (
                        <select
                          value={provider.activeAccount?.address}
                          onChange={(e) =>
                            provider.selectAccount(e.target.value)
                          }>
                          {provider.accounts.map((account) => (
                            <option
                              key={"account-" + account.id}
                              value={account.address}>
                              {account.address}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WalletModal;
