import { getBlockchainNetwork, trimByteString } from "@jackcom/reachduck";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import SettingsService from "src/services/settingsService";
import { doSignOut } from "src/store/auth";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { updateTheme } from "src/store/ui";
import { Participants, THEME_KEY } from "src/utils";
import localStore from "store";
import { FlexColumn, FlexRow } from "../components/Common/Containers";
import InvoiceForm from "../components/Invoice/InvoiceForm";
import MyInvoices from "../components/Invoice/MyInvoices/MyInvoices";
import { useGlobalUser } from "../hooks/GlobalUser";
import * as backend from "../reach/contracts/build/index.main";
import store, { addNotification, Contracts } from "../state";

/** If an appId is given it will connect, deploy a new contract otherwise */
const ActivateContract = async (
  participant: string,
  isMainNet: boolean,
  relogNeededSetter: Dispatch<SetStateAction<boolean>>
) => {
  console.log("----- participant:", participant);
  const globalState = store.getState();
  const { account, appId } = globalState;
  let ctc: any | null;
  if (appId) {
    ctc = account.contract(
      backend,
      isMainNet ? Contracts.MainNet : Contracts.TestNet
    );
  } else {
    ctc = account.contract(backend);
  }
  store.ctc(ctc);

  const CommonInteract = (Who: any) => ({
    notifyComplete: async (log: any) => {
      console.log(`${Who} notifyComplete `, trimByteString(log.message));
      const info = await ctc.getInfo();
      console.log("APP ID: ", info);
      /* const contractAddress =
        await ctc.getContractAddress();
      console.log('ContractAddress: ', contractAddress); */
      store.loading(false);
      store.contractLoaded(true);
    },
    log: (log: any) => {
      console.log(`${Who} log InvoiceData `, trimByteString(log.message));
    },
  });

  try {
    store.loading(true);
    await Promise.all([
      ctc.p[participant]({
        ...CommonInteract(participant),
      }),
    ]);
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("wallet is connected to a different network")) {
        addNotification(
          `❌ ${`Pera is not connected to ${getBlockchainNetwork()}.`}`
        );
        console.log(
          "Error ActivateContract: wallet is connected to a different network"
        );
      } else {
        addNotification(`❌ ${e}`);
        console.log("Error ActivateContract: ", e);
      }
    }
    relogNeededSetter(true);
    return false;
  } finally {
    store.loading(false);
    console.log("Contract object: ", ctc);
  }
  return true;
};

const Home = () => {
  const dispatch = useAppDispatch();
  const { isMainNet } = useAppSelector((state) => state.algorand);
  const { appId, account } = useGlobalUser();
  const [relogNeeded, setRelogNeeded] = useState(false);
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const showDetails = useMemo(() => appId && account, [account, appId]);

  // Subscribe to global state, and unsubscribe on component unmount
  useEffect(() => {
    const onInvoiceVisible = (s: any) =>
      setInvoiceVisible(s.invoiceVisible as boolean);
    const unsubInvoiceVisible = store.subscribeToKeys(onInvoiceVisible, [
      "invoiceVisible",
    ]);

    return function unsubAll() {
      unsubInvoiceVisible();
    };
  });

  useEffect(() => {
    if (localStore.get(THEME_KEY)) {
      dispatch(updateTheme(localStore.get(THEME_KEY)));
      SettingsService.applyThemeFromState(localStore.get(THEME_KEY));
    }
  }, []);

  useEffect(() => {
    const tryToActivateContract = async () => {
      const result = await ActivateContract(
        Participants.Invoicer,
        isMainNet,
        setRelogNeeded
      );
      console.log("----- contract activation:", result);
    };

    if (showDetails) {
      tryToActivateContract();
    }
  }, [showDetails]);

  /* async function setClickListenerToQrCloseButton() {
    setTimeout(() => {
      const wcDiv1 = document.getElementById("walletconnect-qrcode-close");
      wcDiv1?.addEventListener("click", () => {
        throw new Error(ERROR_QRCODE_MODAL_USER_CLOSED);
      });
      const wcDiv2 = wcDiv1?.parentElement;
      wcDiv2?.addEventListener("click", () => {
        throw new Error(ERROR_QRCODE_MODAL_USER_CLOSED);
      });
      // TODO Find a better solution. The WC QR library throws an Error upon closing, but I think Reach stdlib eats it.
    }, 1000);
  } */

  return (
    <>
      <FlexColumn className="Home" padded>
        <div
          className="alert alert-info border-2 d-flex align-items-center p-1"
          role="alert">
          <p className="madeByReachTxt mb-0 flex-1">
            This Reach project was created by Headline Inc. and it supports
            uploading invoice data to the Algorand network.
          </p>
        </div>
        {showDetails && (
          <div className="HomeContent">
            <FlexRow>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                className="mt-1 h1-invoicer">
                <h1 className="h2 mb-1">Headline Invoice</h1>
                {relogNeeded && (
                  <Button
                    className="mt-2"
                    variant="warning"
                    onClick={() => dispatch(doSignOut())}>
                    Relog
                  </Button>
                )}
                <ButtonGroup className="mt-3" aria-label="Basic example">
                  <Button
                    variant={invoiceVisible ? "warning" : "primary"}
                    onClick={() => changeInvoiceVisibility(invoiceVisible)}>
                    {invoiceVisible ? <b>Hide</b> : <b>Create new invoice</b>}
                  </Button>
                  {invoiceVisible && (
                    <Button variant="danger" onClick={() => resetInvoice()}>
                      <b>Reset</b>
                    </Button>
                  )}
                </ButtonGroup>
              </div>
            </FlexRow>
            <div className="App d-flex flex-column align-items-center justify-content-center w-100">
              <Container>{invoiceVisible && <InvoiceForm />}</Container>
            </div>
            <div className="mt-3">
              <MyInvoices />
            </div>
          </div>
        )}
      </FlexColumn>
    </>
  );
};

function changeInvoiceVisibility(invoiceVisible: boolean): void {
  store.invoiceVisible(!invoiceVisible);
}

function resetInvoice(): void {
  const { reset } = store.getState();
  store.reset(!reset);
}

export default Home;
