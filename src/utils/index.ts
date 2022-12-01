import { checkSessionExists } from "@jackcom/reachduck";
import { version } from "../../package.json";
import store from "../state";

/* ----- Constants ----- */
export const CHAIN_NETWORK_KEY = "mainNet";
export const PROVIDER_KEY = "provider";
export const ADDRESS_KEY = "address";
export const THEME_KEY = "theme";
export const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

export const BlockchainNetwork: any = {
  TestNet: "TestNet",
  MainNet: "MainNet",
};

export const Indexers: any = {
  AlgoExplorer: "AlgoExplorer",
  AlgoNode: "AlgoNode",
};

export const DefaultConnectUserOpts: any = {
  fetchAssets: false,
  fetchBalance: false,
  initialAssetsLimit: 0,
};

export const DEFAULT_INDEXER = Indexers.AlgoNode;

export const IndexerProps = (indexer: string, net: string) => {
  const indexers: any = {
    AlgoExplorer: {
      ALGO_SERVER: `https://node.${
        net === "testnet" ? `${net}.` : ""
      }algoexplorerapi.io`,
      ALGO_INDEXER_SERVER: `https://algoindexer.${
        net === "testnet" ? `${net}.` : ""
      }algoexplorerapi.io`,
    },
  };
  return indexers[indexer];
};

export const InvoiceStatuses = {
  Unpaid: 0,
  Paid: 1,
  Canceled: 2,
};

export const documentTitle = "Headline Invoicer";

export const notificationTitle = "Headline Invoicer";

export const ERROR_QRCODE_MODAL_USER_CLOSED = "User close QRCode Modal";

/**
 * When the 4th application argument in a trasaction is this base64 string, then it's not interesting for us.
 */
export const defaultArg =
  "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

/**
 * application-arg max length in Algorand. When you do an indexer query you'll get it in 992 bytes.
 */
export const maxAlgorandArgumentLength = 992;

export const newItemLength = 29;

export const noOp = () => null;

export const APP_VERSION = version;

/** Local Storage keys */
const APP_VERSION_KEY = "app-version";
export const APP_INDEXER_KEY = "app-indexer";

/** Consensus time in milliseconds. Every round on ALGO is about 5 seconds. */
export const ALGO_CTIME = 5000;

/** Network time on Algorand. */
export const ALGO_NTIME = 1;

/** Participants */
export const participants = {
  Admin: "Admin",
  Invoicer: "Invoicer",
};

/* Getters */

export const Providers = {
  WalletConnect: "WalletConnect",
  MyAlgo: "MyAlgo",
};

export const PipelineProviders = {
  WalletConnect: "WalletConnect",
  MyAlgo: "MyAlgo Wallet",
};

export const getProvider = (type: boolean) =>
  type ? BlockchainNetwork.MainNet : BlockchainNetwork.TestNet;

/* ----- Functions ----- */

export const delay = async (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

/** App Migration helper: check if your app version has changed */
export async function checkVersionChanged() {
  const currentVersion = APP_VERSION;
  const lastVersion = localStorage.getItem(APP_VERSION_KEY);
  return currentVersion !== lastVersion;
}

export function isInvoiceValid(invoiceJson: string): boolean {
  const gState = store.getState();
  const { maxBytesLength } = gState;
  return invoiceJson.length <= maxBytesLength;
}

export async function pipelineSend(
  recipientAddress: string,
  microalgoAmount: number,
  note: string
) {
  const gState = store.getState();
  const { address } = gState;
  const { exists, isWCSession } = checkSessionExists();
  if (exists) {
    const walletProvider = isWCSession
      ? PipelineProviders.WalletConnect
      : PipelineProviders.MyAlgo;
    /* TODO Pipeline.pipeConnector = walletProvider;
    Pipeline.address = address;
    return Pipeline.send(
      recipientAddress,
      microalgoAmount,
      note,
      address,
      null,
      0
    ); */
  }
  return null;
}

/**
 * check if a string is numeric/float
 * @param o any value
 * @returns boolean
 */
export const isFixed = (o: any) => {
  const s = String(o);
  return (
    !Number.isNaN(+s) &&
    Number.isFinite(+s) &&
    (typeof o === "number" || !/e/i.test(s))
  );
};

// convert a Unicode string to a string in which
// each 16-bit unit occupies only one byte
export const toBinary = (str: string) => {
  const codeUnits = new Uint16Array(str.length);
  for (let i = 0; i < codeUnits.length; i += 1) {
    codeUnits[i] = str.charCodeAt(i);
  }
  return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
};

export const fromBinary = (encoded: string) => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
};

/**
 * The 'algos' param is multiplied by 1000000 to get the equivalent Microalgo value.
 * @param algos Algo value
 * @returns Microalgo value
 */
export const convertAlgoToMicro = (algos: number) => algos * 1000000;

export const fixAppArgument = (str: string) =>
  str.charAt(0) !== "{" ? `{"${str.substring(118)}` : str;

export const truncString = (str: string, max = 28, add = "...") =>
  typeof str === "string" && str.length > max
    ? str.substring(0, max) + add
    : str;

export async function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}
