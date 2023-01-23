import { trimByteString } from "@jackcom/reachduck";
import { PeraWalletConnect } from "@perawallet/connect";
import { SignerTransaction } from "@perawallet/connect/dist/util/model/peraWalletModels";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { FlexColumn, FlexRow } from "../components/Common/Containers";
import InvoiceForm from "../components/Invoice/InvoiceForm";
import MyInvoices from "../components/Invoice/MyInvoices/MyInvoices";
import { useGlobalUser } from "../hooks/GlobalUser";
import * as backend from "../reach/contracts/build/index.main";
import store, { addNotification, Contracts } from "../state";
import { ERROR_QRCODE_MODAL_USER_CLOSED, Providers } from "../utils";

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
    const onAccount = (s: any) => setAccount(s.account as any | null);
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

  async function setClickListenerToQrCloseButton() {
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
  }

  const reachLogin = async () => {
    const algodClientParams = await window.algorand.getAlgodv2Client();
    const algodClient = new algosdk.Algodv2(algodClientParams);
    const suggestedParams = await algodClient.getTransactionParams().do();
    const enc = new TextEncoder();
    const note = enc.encode("Hello World");
    const txn = algosdk.makePaymentTxnWithSuggestedParams(
      "XARTZKOS6ZQDJSVFXTNR5L5JMJFXLPRQAZPZ54PVYS57WS24BNETWNFLEY",
      "LXEJ37LOEE7QEW2OGM4NMMNNNEY34AHOM6DM5S447A4IHSELDOLZN7FD64",
      0,
      undefined,
      note,
      suggestedParams
    );
    console.log("----- provider:", provider);
    if (provider === Providers.MyAlgo) {
      const myAlgoWallet = new MyAlgoConnect();
      try {
        const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
        const response = await algodClient
          .sendRawTransaction(signedTxn.blob)
          .do();
        console.log("----- MyAlgo resp:", response);
      } catch (err) {
        console.error("----- MyAlgo sign error:", err);
      }
    } else if (provider === Providers.PeraConnect) {
      /* TODO Pera and AlgoSigner are not yet supported by Starter. const peraWallet = new PeraWalletConnect();
      try {
        const singleTxnGroups: Array<SignerTransaction> = [
          { txn, signers: [address!] },
        ];
        const signedTxn = await peraWallet.signTransaction([singleTxnGroups]);
        const response = await algodClient.sendRawTransaction(signedTxn).do();
        console.log("----- PeraConnect resp:", response);
      } catch (err) {
        console.error("----- PeraConnect sign error:", err);
      } */
    }

    /* if (provider) {
      store.loading(true);
      addNotification(`💡 Reach connect..`);
      try {
        setClickListenerToQrCloseButton();
        const currentAccount = await reachConnect(isMainNet, provider);
        console.log("currentAccount:", currentAccount);
        if (currentAccount) {
          const result = await ActivateContract(participants.Admin, isMainNet);
          if (!result) {
            dispatch(updateReachDisconnectedTime(Date.now()));
          }
        }
      } catch (e) {
        console.log("reachLogin Error: ", e);
      } finally {
        store.loading(false);
      }
    } else {
      addNotification(`💡 Please login with a wallet first.`);
    } */
  };

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
            <Button className="mt-3" variant="warning" onClick={reachLogin}>
              <b>Reach Login</b>
            </Button>
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
