import createState from "@jackcom/raphsducks";
import { NETWORKS } from "@jackcom/reachduck";

/**
 * The Reach contract maximum Bytes length. You only need to change it here if it changes in the contract.
 */
const MAX_BYTES_LENGTH = 943;

/**
 * If true then Algorand MaiNnet, if false then Algorand TestNet. Default is TestNet.
 */
export const DefaultNetwork = false;

export const Contracts = {
  MainNet: null, // 730196316,
  TestNet: 177420100,
};

/**
 * This is your state definition. Add any properties you need here.
 */
const initialState = {
  /** Reach `networkAccount` instance */
  account: null as any | null,

  /** Reach `networkAccount` instance */
  accountsList: [] as any[],

  /** Wallet address (for UI) */
  address: "",

  /** Smart contract ID. Make it null to deploy a new contract. Default is MainNet. */
  appId: Contracts.TestNet as number | null,

  appsCount: 0,

  assets: [] as any[],

  /** Reach `networkAccount` balance */
  balance: "0.00",

  /** Loading state */
  contractLoaded: false,

  /** Current configured network */
  currentNetwork: NETWORKS.ALGO.abbr,

  /** Invoicer contract */
  ctc: null as any | null,

  /** Error messages */
  error: "",

  /** Loading state */
  loading: false,

  walletClient: null as { disconnect(): any } | null,

  /**
   * Reach contract max byte length as a state.
   */
  maxBytesLength: MAX_BYTES_LENGTH,

  /** The input invoice json max byte size. Algorand has 1024 bytes maximum size of note. The Reach contract allows max 943, additional json characters are substracted from this value.
   * 201 is subtracted to make it'll stay under the Reach contract byte limit. Because 1 character is not necessarily 1 byte.
   * Algorand UInt.max: 2^64-1 = 18446744000000000000 (20 characters)
   * Leading - trailing json characters: {"":{}} (7 characters)
   * Status data: "s":, (5 characters)
   * Dates JSON characters: "d":["",""], (12 characters)
   * Invoicer data: "f":["","","",""], (18 characters)
   * Recipient data: "t":["","","",""], (18 characters)
   * Items data: "i":[{"":,"":"","":"","":,"":}], (32 characters)
   * Note: "n":"", (7 characters)
   * Price data: "p":["",] (9 characters)
   */
  maxJsonLength:
    MAX_BYTES_LENGTH - 201 - 20 - 7 - 5 - 12 - 18 - 18 - 32 - 7 - 9,

  /** Notifications */
  notifications: [] as Alert[],

  invoiceVisible: false,

  initialized: false,

  reset: false,

  refreshInvoicesTable: false,
};

/**
 * Your global application state `instance`. Every property in `initialState`
 * will become a method the state `instance`, so e.g. to update `appsCount`, you
 * call `store.appsCount( number )`. You can create as many state instances as
 * you need.
 */
const store = createState(initialState);
export default store;

export type GlobalStore = ReturnType<typeof store.getState>;
export type GlobalStoreKey = keyof GlobalStore;

export type Alert = {
  msg: string;
  time: number;
  persistent?: boolean;
  error?: boolean;
};

export function addNotification(
  msg: string | Alert,
  persist = false,
  additional = {}
) {
  const note = (msg as Alert).time
    ? (msg as Alert)
    : createAlert(msg as string, persist);
  const { notifications: old } = store.getState();
  const notifications = [...old, note];
  store.multiple({ notifications, ...additional });
  return note.time;
}

export function resetNotifications(msg?: string, persist = false) {
  const updates = [];
  let msgId = null;
  if (msg) {
    const notification = createAlert(msg, persist);
    msgId = notification.time;
    updates.push(notification);
  }
  store.notifications(updates);
  return msgId;
}

export function removeNotification(
  msg: Alert,
  additional: Partial<GlobalStore> = {}
) {
  const { notifications } = store.getState();
  const i = notifications.findIndex((n) => n.time === msg.time);
  if (i === -1) return;

  const updates = [...notifications];
  updates.splice(i, 1);
  store.multiple({ notifications: updates, ...additional });
}

export function updateAsError(
  id: number | null,
  msg: string,
  additional: Partial<GlobalStore> = {}
) {
  const { notifications } = store.getState();
  const msgIndex = notifications.findIndex(({ time }) => time === id);
  const newAlert = createAlert(msg, true);
  const updates = [...notifications];
  newAlert.error = true;
  newAlert.persistent = false;
  if (id) newAlert.time = id as number;
  if (msgIndex === -1) updates.push(newAlert);
  else updates.splice(msgIndex, 1, newAlert);

  store.multiple({ notifications: updates, ...additional });
}

export function updateNotification(
  id: number | null,
  msg: string,
  persist = false,
  additional: Partial<GlobalStore> = {}
) {
  const { notifications } = store.getState();
  const i = notifications.findIndex(({ time }) => time === id);
  const newAlert = createAlert(msg, true);
  const updates = [...notifications];
  newAlert.time = id as number;
  newAlert.persistent = persist;
  if (i === -1) updates.push(newAlert);
  else updates.splice(i, 1, newAlert);

  store.multiple({ notifications: updates, ...additional });
}

function createAlert(msg: string, persistent = false): Alert {
  return { msg, time: new Date().getTime(), persistent };
}
