import { trimByteString } from "@jackcom/reachduck";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import SettingsService from "src/services/settingsService";
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
const ActivateContract = async (participant: string, isMainNet: boolean) => {
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
    addNotification(`❌ ${e}`);
    console.log("Error ActivateContract: ", e);
    return false;
  } finally {
    store.loading(false);
    console.log("Contract object: ", ctc);
  }
  return true;
};

const Home = () => {
  const dispatch = useAppDispatch();
  const { isMainNet, provider } = useAppSelector((state) => state.algorand);
  const { address } = useGlobalUser();
  const [appId, setAppId] = useState<number | null>(
    isMainNet ? Contracts.MainNet : Contracts.TestNet
  );
  const [account, setAccount] = useState<any | null>(null);
  const [invoiceVisible, setInvoiceVisible] = useState(false);

  // Subscribe to global state, and unsubscribe on component unmount
  useEffect(() => {
    const onAppId = (s: any) => setAppId(s.appId as number | null);
    const unsubAppId = store.subscribeToKeys(onAppId, ["appId"]);
    const onAccount = async (s: any) => {
      if (s.account) {
        setAccount(s.account as any | null);
        console.log("----- isMainNet:", isMainNet);
        const result = await ActivateContract(Participants.Admin, isMainNet);
        console.log("----- contract activation:", result);
      }
    };
    const unsubAccount = store.subscribeToKeys(onAccount, ["account"]);
    const onInvoiceVisible = (s: any) =>
      setInvoiceVisible(s.invoiceVisible as boolean);
    const unsubInvoiceVisible = store.subscribeToKeys(onInvoiceVisible, [
      "invoiceVisible",
    ]);

    return function unsubAll() {
      unsubInvoiceVisible();
      unsubAppId();
      unsubAccount();
    };
  });

  useEffect(() => {
    if (localStore.get(THEME_KEY)) {
      dispatch(updateTheme(localStore.get(THEME_KEY)));
      SettingsService.applyThemeFromState(localStore.get(THEME_KEY));
    }
  }, []);

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
      <FlexColumn className="Home mt-3" padded>
        <div
          className="alert alert-info border-2 d-flex align-items-center"
          role="alert">
          <p className="mb-0 flex-1">
            This Reach project was created by Headline Inc. and it supports
            uploading invoice data to Algorand. Please, enable popups for the
            wallet to sign interactions!
          </p>
        </div>

        <FlexRow>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
            className="h1-invoicer">
            <h1 className="h2 mt-3 mb-1">Headline Invoice</h1>
          </div>
        </FlexRow>

        {appId && account && (
          <FlexRow>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
              className=" mt-3 h1-invoicer">
              <h1 className="h2 mt-3 mb-1">Headline Invoice</h1>
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
        )}
        {appId && account && (
          <div className="App d-flex flex-column align-items-center justify-content-center w-100">
            <Container>{invoiceVisible && <InvoiceForm />}</Container>
          </div>
        )}
        {appId && account && (
          <div className="mt-3">
            <MyInvoices />
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
