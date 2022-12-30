import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch } from "src/store/hooks";
import { updateAddress, updateProvider } from "src/store/algorand";
import { useWallet } from "@txnlab/use-wallet";

const walletIds = [
  "Pera Wallet",
  "MyAlgo Wallet",
  "Algo Signer",
  "Wallet Connect",
];

function WalletModal() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { providers, activeAccount } = useWallet();

  useEffect(() => {
    if (
      !!activeAccount &&
      !!activeAccount.address &&
      !!activeAccount.providerId
    ) {
      dispatch(updateAddress(activeAccount.address));
      dispatch(updateProvider(activeAccount.providerId));
    }
  }, [activeAccount]);

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
            {providers?.map(
              (provider) =>
                walletIds.includes(provider.id) && (
                  <div key={"provider-" + provider.metadata.id}>
                    <h4>
                      <img
                        width={30}
                        height={30}
                        alt=""
                        src={provider.metadata.icon}
                      />
                      {provider.metadata.name} {provider.isActive && "[active]"}
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
                        Disconnect
                      </button>
                      <button
                        onClick={provider.setActiveProvider}
                        disabled={!provider.isConnected || provider.isActive}>
                        Set Active
                      </button>
                      <div>
                        {provider.isActive && provider.accounts.length && (
                          <select
                            value={activeAccount?.address}
                            onChange={(e) =>
                              provider.setActiveAccount(e.target.value)
                            }>
                            {provider.accounts.map((account) => (
                              <option
                                key={account.address}
                                value={account.address}>
                                {account.address}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
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
