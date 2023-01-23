import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "src/components/Layout/Layout";
import "../../styles/App.scss";
import store from "../store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
