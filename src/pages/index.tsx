import { getBlockchainNetwork } from "@jackcom/reachduck";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import ActiveNotifications from "../components/ActiveNotifications";
import FullScreenLoader from "../components/Common/FullscreenLoader";
import { disconnect } from "../reach";
import Home from "../routes/Home";
import store, { Contracts } from "../state";
import { useAppSelector } from "../store/hooks";
import { ERROR_QRCODE_MODAL_USER_CLOSED, getProvider } from "../utils";

function App(props: any) {
  const { account } = store.getState();
  const { isMainNet } = useAppSelector((state) => state.algorand);
  const { reachDisconnectedTime } = useAppSelector((state) => state.reach);
  const [loading, setLoading] = useState(false);
  const [appId, setAppId] = useState<number | null>(Contracts.MainNet);

  /* Wallet Connect QR modal dismissal listener */
  if (typeof window !== "undefined") {
    window.addEventListener("error", (event) => {
      const error = event.error.toString();
      if (error.includes(ERROR_QRCODE_MODAL_USER_CLOSED)) {
        console.log(error);
        window.location.reload();
      }
    });
  }

  useEffect(() => {
    const onLoading = (s: any) => setLoading(s.loading as boolean);
    const unsubLoading = store.subscribeToKeys(onLoading, ["loading"]);
    const onAppId = (s: any) => {
      setAppId(s.appId as number);
      reloadReach();
    };
    const unsubAppId = store.subscribeToKeys(onAppId, ["appId"]);

    return function unsubAll() {
      unsubLoading();
      unsubAppId();
    };
  });

  useEffect(() => {
    if (appId && account && getProvider(isMainNet) !== getBlockchainNetwork()) {
      store.appId(isMainNet ? Contracts.MainNet : Contracts.TestNet);
    }
  }, [isMainNet]);

  useEffect(() => {
    if (reachDisconnectedTime) {
      disconnectAndReInitUi();
    }
  }, [reachDisconnectedTime]);

  async function disconnectAndReInitUi() {
    if (account) {
      await disconnect();
      store.account(null);
      store.invoiceVisible(false);
    }
  }

  async function reloadReach() {
    await disconnectAndReInitUi();
  }

  return (
    <div>
      <ActiveNotifications />
      <React.Suspense fallback={<FullScreenLoader />}>
        <section className="App">
          {loading && (
            <div className="FullScreenLoading">
              <Spinner
                className="loadingSpinner"
                animation="border"
                role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <Home />
        </section>
      </React.Suspense>
    </div>
  );
}

export default App;

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()
  const nothing = "";

  return {
    props: {
      nothing,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
