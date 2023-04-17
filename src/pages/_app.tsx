import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "src/components/Layout/Layout";
import "../../styles/App.scss";
import store from "../store";

import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"], fallback: ["sans-serif"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
