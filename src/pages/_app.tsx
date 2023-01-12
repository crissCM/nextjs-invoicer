import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "src/components/Layout/Layout";
import "../../styles/App.scss";
import store from "../store";
import {
  reconnectProviders,
  initializeProviders,
  WalletProvider,
  PROVIDER_ID,
} from "@txnlab/use-wallet";
import { useEffect } from "react";

const walletProviders = initializeProviders([
  PROVIDER_ID.PERA,
  PROVIDER_ID.MYALGO,
  PROVIDER_ID.WALLETCONNECT,
]);

export default function App({ Component, pageProps }: AppProps) {
  // Reconnect the session when the user returns to the dApp
  useEffect(() => {
    reconnectProviders(walletProviders);
  }, []);

  return (
    <Provider store={store}>
      <WalletProvider value={walletProviders}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>
    </Provider>
  );
}
