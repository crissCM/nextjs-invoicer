import { checkSessionExists } from "@jackcom/reachduck";
import { PeraWalletConnect } from "@perawallet/connect";
import { SignerTransaction } from "@perawallet/connect/dist/util/model/peraWalletModels";
import algosdk from "algosdk";
import { isNumber } from "lodash";
import localStore from "store";
import manifest from "../../package.json";
import store from "../state";

/* ----- Constants ----- */
export const APP_NAME = "Invo";

export const CHAIN_NETWORK_KEY = "isMainNet";
export const PROVIDER_KEY = "provider";
export const ADDRESS_KEY = "address";
export const THEME_KEY = "theme";

export const ALGO_BALANCE_REFRESH_MS = 30000;
export const NFD_DOMAIN = ".algo";

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

export const NFD: any = {
  MainNet: "https://api.nf.domains",
  TestNet: "https://api.testnet.nf.domains",
};

export const DefaultConnectUserOpts: any = {
  fetchAssets: false,
  fetchBalance: false,
  initialAssetsLimit: 0,
};

export const DEFAULT_INDEXER = Indexers.AlgoNode;

export const IndexerProps = (indexer: string, net: boolean) => {
  const indexers: any = {
    AlgoExplorer: {
      ALGO_SERVER: `https://node.${net ? "" : "testnet."}algoexplorerapi.io`,
      ALGO_INDEXER_SERVER: `https://algoindexer.${
        net ? "" : "testnet."
      }algoexplorerapi.io`,
    },
    AlgoNode: {
      ALGO_SERVER: `https://${net ? "mainnet" : "testnet"}-api.algonode.cloud`,
      ALGO_INDEXER_SERVER: `https://${
        net ? "mainnet" : "testnet"
      }-idx.algonode.cloud`,
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
 * application-arg max length in Algorand. When you do an indexer query you'll get it in 996 bytes.
 */
export const maxAlgorandArgumentLength = 996;

export const newItemLength = 29;

export const noOp = () => null;

export const APP_VERSION = manifest.version;

/** Local Storage keys */
const APP_VERSION_KEY = "app-version";
export const APP_INDEXER_KEY = "app-indexer";

/** Consensus time in milliseconds. Every round on ALGO is about 5 seconds. */
export const ALGO_CTIME = 5000;

/** Network time on Algorand. */
export const ALGO_NTIME = 1;

/** Participants */
export const Participants = {
  Admin: "Admin",
  Invoicer: "Invoicer",
};

/* Getters */

export const Providers = {
  PeraConnect: "PeraConnect",
};

export const getProvider = (type: boolean) =>
  type ? BlockchainNetwork.MainNet : BlockchainNetwork.TestNet;

/* ----- Functions ----- */

export const delay = async (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

/** App Migration helper: check if your app version has changed */
export async function checkVersionChanged() {
  const currentVersion = APP_VERSION;
  const lastVersion = localStore.get(APP_VERSION_KEY);
  return currentVersion !== lastVersion;
}

export function isInvoiceValid(invoiceJson: string): boolean {
  const gState = store.getState();
  const { maxBytesLength } = gState;
  return invoiceJson.length <= maxBytesLength;
}

export const sendTransaction = async (
  from: string,
  to: string,
  amount: number,
  note = ""
) => {
  let txId;
  const { exists } = checkSessionExists();
  if (exists) {
    const algodClientParams = await window.algorand.getAlgodv2Client();
    const algodClient = new algosdk.Algodv2(
      algodClientParams,
      algodClientParams.bc.baseURL.href
    );
    const suggestedParams = await algodClient.getTransactionParams().do();
    const enc = new TextEncoder();
    const encodedNote = enc.encode(note);
    const txn = algosdk.makePaymentTxnWithSuggestedParams(
      from,
      to,
      amount,
      undefined,
      encodedNote,
      suggestedParams
    );
    const peraWallet = new PeraWalletConnect();
    try {
      const singleTxnGroups: Array<SignerTransaction> = [
        {
          txn,
          signers: [from],
        },
      ];
      const signedTxn = await peraWallet.signTransaction([singleTxnGroups]);
      const response = await algodClient.sendRawTransaction(signedTxn).do();
      txId = response?.txId;
    } catch (err) {
      console.error("----- PeraConnect sign error:", err);
    }
  } else {
    console.error("----- No Session!:", exists);
  }
  return txId || exists;
};

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
  return encodeBase64FromUtf8(
    String.fromCharCode(...new Uint8Array(codeUnits.buffer))
  );
};

export const fromBinary = (encoded: string) => {
  const binary = decodeBase64ToBinary(encoded);
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

export const convertMicroToAlgo = (microAlgos: number) =>
  prettyRound(microAlgos / 1000000, 2);

export const fixAppArgument = (str: string) =>
  str.charAt(0) !== "{" ? `{"${str.substring(118)}` : str;

export const truncString = (str: string, max = 28, add = "...") =>
  typeof str === "string" && str.length > max
    ? str.substring(0, max) + add
    : str;

export function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return navigator.clipboard.writeText(text);
  }
  return document.execCommand("copy", true, text);
}

/**
 * Rounds a number without unnecessary trailing zeros
 * @param num Number to round.
 * @param decimals Round the number to this many decimals or the default value if missing.
 * @return The rounded number or undefined it the param was undefined.
 * */
export function prettyRound(num: number, decimals = 3) {
  if (isNumber(num)) {
    return parseFloat(num.toFixed(decimals));
  }
  return num;
}

/**
 * LocalStorage
 */

export function clearLocalStorage() {
  localStore.clearAll();
}

export function clearLocalStorageExcept(keys: string[]) {
  const values = [];
  for (const key of keys) {
    const v = localStore.get(key);
    values.push(v);
  }
  clearLocalStorage();
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    localStore.set(key, values[i]);
  }
}

/**
 * Check whether the given string is an NFD domain pattern.
 * @param nfd NFD domain.
 * @returns true if it ends with .algo, false otherwise.
 */
export const isNfd = (nfd: string) => nfd.trim().endsWith(NFD_DOMAIN);

export const encodeBase64FromUtf8 = (data: any) =>
  Buffer.from(data, "utf8").toString("base64");

// Use this instead of 'btoa()'.
export const encodeBase64FromBinary = (data: any) =>
  Buffer.from(data, "binary").toString("base64");

export const decodeBase64ToUtf8 = (data: any) =>
  Buffer.from(data, "base64").toString("utf8");

// Use this instead of 'atob()'.
export const decodeBase64ToBinary = (data: any) =>
  Buffer.from(data, "base64").toString("binary");

/**
 * Since the JS `escape()` is deprecated,
 * in EcmaScript spec there is the algorithm:
 *
 * Call ToString(string).
 * Compute the number of characters in Result(1).
 * Let R be the empty string.
 * Let k be 0.
 * If k equals Result(2), return R.
 * Get the character at position k within Result(1).
 * If Result(6) is one of the 69 nonblank ASCII characters ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 @*_+-./, go to step 14.
 * Compute the 16-bit unsigned integer that is the Unicode character encoding of Result(6).
 * If Result(8), is less than 256, go to step 12.
 * Let S be a string containing six characters “%uwxyz” where wxyz are four hexadecimal digits encoding the value of Result(8).
 * Go to step 15.
 * Let S be a string containing three characters “%xy” where xy are two hexadecimal digits encoding the value of Result(8).
 * Go to step 15.
 * Let S be a string containing the single character Result(6).
 * Let R be a new string value computed by concatenating the previous value of R and S.
 * Increase k by 1.
 * Go to step 5.
 * @param str String to escape.
 */
/* export function esEscape(str: string) {
  const allowed =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./,";
  str = str.toString();
  let len = str.length,
    R = "",
    k = 0,
    S,
    chr,
    ord;
  while (k < len) {
    chr = str[k];
    if (allowed.indexOf(chr) != -1) {
      S = chr;
    } else {
      ord = str.charCodeAt(k);
      if (ord < 256) {
        S = "%" + ("00" + ord.toString(16)).toUpperCase().slice(-2);
      } else {
        S = "%u" + ("0000" + ord.toString(16)).toUpperCase().slice(-4);
      }
    }
    R += S;
    k++;
  }
  return R;
} */
