import { useEffect, useState } from "react";
import {
  disconnectUser,
  truncateString,
  checkSessionExists,
} from "@jackcom/reachduck";
// Views
import {
  Contracts,
  resetNotifications,
  updateAsError,
  updateNotification,
} from "../../state";
import Modal from "../Common/Modal";
import { FlexColumn } from "../Common/Containers";
import { connect, reconnect } from "../../reach";
import { useGlobalUser } from "../../hooks/GlobalUser";
import { Button } from "react-bootstrap";

const providers = [
  { name: "My Algo", value: "MyAlgo" },
  { name: "Pera Wallet", value: "PeraConnect" },
  { name: "WalletConnect", value: "WalletConnect" },
];

const ConnectWallet = () => {
  const { account, address, appId, error, loading } = useGlobalUser();
  const [modal, showModal] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const connectTo = async (prov: string) => {
    showModal(false);
    if (!prov) return;

    setConnecting(true);

    try {
      await connect(prov, appId === Contracts.MainNet);
      const alertId = resetNotifications("⏳ Connecting ... ", true);
      updateNotification(alertId, "✅ Connected!");
    } catch (e: any) {
      // console.log(e)
      const err = "❌ Account Fetch error";
      updateAsError(null, err, { error: err });
    }

    setConnecting(false);
  };

  const resumeSession = async () => {
    const alertId = resetNotifications("⏳ Reconnecting ... ");
    await reconnect(appId === Contracts.MainNet);
    updateNotification(alertId, "✅ Connected!");
  };

  useEffect(() => {
    const { exists } = checkSessionExists();
    if (exists && !account) resumeSession();
  }, []);

  if (address)
    return <Button onClick={disconnectUser}>{truncateString(address)}</Button>;

  if (connecting)
    return (
      <Button disabled>
        <span className="spinner--before">Loading ...</span>
      </Button>
    );

  return (
    <>
      {error ? (
        <Button onClick={() => window.location.reload()}>
          <span className="material-icons">close</span>
          Connect Error
        </Button>
      ) : (
        <Button onClick={() => showModal(true)}>
          {loading ? (
            <span className="spinner--before">Loading ...</span>
          ) : (
            "Connect Wallet"
          )}
        </Button>
      )}

      {modal && (
        <Modal title="Select Wallet Provider" onClose={() => showModal(false)}>
          <FlexColumn style={{ alignSelf: "stretch", placeContent: "center" }}>
            {providers.map((p) => (
              <Button key={p.value} onClick={() => connectTo(p.value)}>
                <b>{p.name}</b>
              </Button>
            ))}
          </FlexColumn>
        </Modal>
      )}
    </>
  );
};

export default ConnectWallet;
