import { checkSessionExists, disconnectUser } from "@jackcom/reachduck";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useGlobalUser } from "src/hooks/GlobalUser";
import {
  addNotification,
  Contracts,
  resetNotifications,
  updateAsError,
  updateNotification,
} from "src/state";
import { useAppSelector } from "src/store/hooks";
import {
  BlockchainNetwork,
  copyTextToClipboard,
  ALGO_BALANCE_REFRESH_MS,
  convertMicroToAlgo,
} from "src/utils";
import useInterval from "src/utils/hooks/useInterval";
import { connect, reconnect } from "../../reach";

function WalletLogin() {
  const { account, address, appId, error } = useGlobalUser();
  const { isMainNet } = useAppSelector((state) => state.algorand);
  const [algoBalance, setAlgoBalance] = useState(0);
  const [connecting, setConnecting] = useState(false);

  const initializeAlgoBalance = async () => {
    if (account) {
      try {
        const balanceObj = await account.balanceOf();
        if (balanceObj._hex !== undefined) {
          setAlgoBalance(convertMicroToAlgo(parseInt(balanceObj._hex, 16)));
          const mr1 = document.getElementById("modal-root-1");
          const mr2 = document.getElementById("modal-root-2");
          if (mr1 && mr2) {
            mr1.style.display = "none";
            mr2.style.display = "none";
          }
        }
      } catch (e) {
        console.log("----- balance fetch ERROR:", e);
      }
    }
  };

  useInterval(initializeAlgoBalance, ALGO_BALANCE_REFRESH_MS);

  const connectTo = async (prov: string) => {
    if (!prov) {
      return;
    }
    setConnecting(true);
    try {
      await connect(prov, appId === Contracts.MainNet);
      const alertId = resetNotifications("⏳ Connecting ... ", true);
      updateNotification(alertId, "✅ Connected!");
    } catch (e: any) {
      console.log("----- connect ERROR:", e);
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

  useEffect(() => {
    const wc = document.getElementById("wallet-connected");
    const wc2 = document.getElementById("wallet-connect-2");
    if (wc && wc2) {
      if (address) {
        wc2.style.display = "none";
        wc.style.display = "flex";
      } else {
        wc2.style.display = "flex";
        wc.style.display = "none";
      }
    }
  }, [address]);

  const switchWallet = async (event: any) => {
    connectTo(event.target.id);
  };

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    if (address) {
      copyTextToClipboard(address);
      setTimeout(() => {
        addNotification(`✅ Address copied!`);
      }, 200);
    }
  };

  const disconnect = () => {
    const wc = document.getElementById("wallet-connected");
    const wc2 = document.getElementById("wallet-connect-2");
    if (wc && wc2) {
      wc2.style.display = "flex";
      wc.style.display = "none";
    }
    disconnectUser();
  };

  return (
    <div>
      <div
        id="modal-root-2"
        className="modal-backdrop show"
        style={{ display: "none" }}
      />
      <div
        id="modal-root-1"
        className="modal fade show"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        role="dialog"
        style={{
          display: "none",
          paddingRight: "0.333374px",
        }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content border-0">
            <div className="modal-header bg-card light">
              <h5 className="modal-title text-white" id="exampleModalLabel">
                Algo Wallets
              </h5>

              <button
                type="button"
                className="btn-close btn-close-white text-white"
                data-bs-dismiss="modal"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  const mr1 = document.getElementById("modal-root-1");
                  const mr2 = document.getElementById("modal-root-2");
                  if (mr1 && mr2) {
                    mr1.style.display = "none";
                    mr2.style.display = "none";
                  }
                }}
              />
            </div>
            <div className="modal-body">
              <button
                id="WalletConnect"
                className="crayons-btn w-100"
                onClick={switchWallet}>
                WalletConnect
              </button>
              <button
                id="AlgoSigner"
                className="crayons-btn w-100"
                onClick={switchWallet}>
                AlgoSigner
              </button>
              <button
                id="MyAlgo"
                className="crayons-btn w-100"
                onClick={switchWallet}>
                MyAlgo
              </button>
            </div>
          </div>
        </div>
      </div>
      {connecting && (
        <Button disabled>
          <span className="spinner--before">Loading ...</span>
        </Button>
      )}
      {error ? (
        <Button onClick={() => window.location.reload()}>
          <span className="material-icons">close</span>
          Connect Error
        </Button>
      ) : (
        <button
          className="crayons-btn crayons-btn--secondary "
          id="wallet-connect-2"
          aria-haspopup="true"
          data-toggle="modal"
          data-target="modal-root-1"
          aria-expanded="true"
          onClick={() => {
            const mr1 = document.getElementById("modal-root-1");
            const mr2 = document.getElementById("modal-root-2");
            if (mr1 && mr2) {
              mr1.style.display = "block";
              mr2.style.display = "block";
            }
          }}>
          <svg
            className="svg-inline--fa fa-wallet "
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="wallet"
            role="img"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            data-fa-i2svg="">
            <path
              fill="currentColor"
              d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"
            />
          </svg>
          <span className="count__title-2">Connect Wallet</span>
        </button>
      )}
      <div
        id="wallet-connected"
        className="crayons-select-2"
        style={{ display: "none" }}>
        <div
          className="walled-connected-mi"
          style={{
            display: "none",
            width: "20px",
            height: "20px",
            color: "var(--algocloud-body-bg-2)",
          }}>
          <svg
            className="svg-inline--fa fa-wallet "
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="wallet"
            role="img"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            data-fa-i2svg="">
            <path
              fill="currentColor"
              d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"
            />
          </svg>
        </div>

        <div id="my-balance" className="own-balance">
          <p style={{ marginBottom: "0px" }}>{`${algoBalance} Algo`}</p>
          <span className="currency" />
        </div>
        <div className="dropdown">
          <button id="own-address" className="own-address">
            {address || ""}
          </button>
          <div className="dropdown__content dropdown__content-wallet">
            <button
              className="copyable-1 dropdown-item"
              onClick={handleCopyClick}>
              <div className="copyable">
                <div className="copyable__text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    className="copy-icon"
                    fill="currentColor"
                    viewBox="0 0 512 512">
                    <path d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z" />
                  </svg>
                  copy address
                </div>
                <span className="copy" />
              </div>
            </button>
            <a
              className="dropdown-item"
              id="algoexplorer"
              target="_blank"
              rel="noreferrer"
              href={`https://${
                isMainNet ? "" : "testnet."
              }algoexplorer.io/address/${address || ""}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={16}
                height={16}
                className="external-link-icon"
                fill="currentColor">
                <path d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM488 0H352c-12.94 0-24.62 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.88L370.8 96L169.4 297.4c-12.5 12.5-12.5 32.75 0 45.25C175.6 348.9 183.8 352 192 352s16.38-3.125 22.62-9.375L416 141.3l41.38 41.38c9.156 9.141 22.88 11.84 34.88 6.938C504.2 184.6 512 172.9 512 160V24C512 10.74 501.3 0 488 0z" />
              </svg>
              AlgoExplorer
            </a>
            {address && (
              <button
                id="disconnect-me"
                className="dropdown-item"
                onClick={disconnect}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="16"
                  height="16"
                  className="eject-icon"
                  fill="currentColor">
                  <path d="M48.01 319.1h351.1c41.62 0 63.49-49.63 35.37-80.38l-175.1-192.1c-19-20.62-51.75-20.62-70.75 0L12.64 239.6C-15.48 270.2 6.393 319.1 48.01 319.1zM399.1 384H48.01c-26.39 0-47.99 21.59-47.99 47.98C.0117 458.4 21.61 480 48.01 480h351.1c26.39 0 47.99-21.6 47.99-47.99C447.1 405.6 426.4 384 399.1 384z" />
                </svg>
                Disconnect
              </button>
            )}
            <div className="form-check form-switch dropdown-item crayons-select">
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckChecked">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  onChange={
                    (event) => console.log("----- :")
                    // TODO switchNet(event.target.checked, dispatch, globalPipeState)
                  }
                  checked={isMainNet}
                />
              </label>
              <span>
                {isMainNet
                  ? BlockchainNetwork.MainNet
                  : BlockchainNetwork.TestNet}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div id="table" />
    </div>
  );
}

export default WalletLogin;
