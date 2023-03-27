import {
  checkSessionExists,
  connectUser,
  disconnectUser,
  loadReachWithOpts,
  optInToAsset,
  ReachAccount,
  ReachEnvOpts,
  ReachToken,
  reconnectUser,
  tokenMetadata as getReachToken,
} from "@jackcom/reachduck";
import { loadStdlib } from "@reach-sh/stdlib";
import MakePeraConnect from "src/utils/WC/PeraWCClient";
import localStore from "store";
import store, {
  addNotification,
  updateAsError,
  updateNotification,
} from "../state";
import {
  APP_INDEXER_KEY,
  BlockchainNetwork,
  DefaultConnectUserOpts,
  DEFAULT_INDEXER,
  IndexerProps,
  Providers,
} from "../utils";

/** Connect user Wallet */
export async function connect(provider: string, isMainNet: boolean) {
  configureWalletProvider(provider, isMainNet);
  const updates = await connectUser(DefaultConnectUserOpts);
  store.multiple(updates);
  return updates.account;
}

export async function reachConnect(provider: string, isMainNet: boolean) {
  try {
    const acc = await connect(provider, isMainNet);
    if (acc) {
      addNotification(`💡 Reach connection successful.`);
      return acc;
    }
  } catch (e) {
    if (typeof window !== "undefined") {
      addNotification(`❌ Reach connect error.`);
      console.log("Reach connect error: ", e);
      window.location.reload();
    }
  }
}

/** Reconnect user session */
export async function reconnect(provider: string, isMainNet: boolean) {
  const { addr = undefined, isWCSession } = checkSessionExists();
  configureWalletProvider(provider, isMainNet);
  const updates = await reconnectUser(addr, DefaultConnectUserOpts);
  store.multiple(updates);
  return updates.account;
}

/** Dissconnect user session */
export async function disconnect() {
  store.reset();
  const { walletClient } = store.getState();
  if (walletClient) walletClient.disconnect();
  addNotification("Disconnecting ... ");
  console.log("Reach disconnected.");
  disconnectUser();
}

/** Opt-in to an asset */
export async function inlineAssetOptIn(
  alertId: any,
  acc: ReachAccount,
  tokenId: any
) {
  updateNotification(alertId, `⭐️ Opt-in to token!`, true);

  const [asset, accepted] = await Promise.all([
    tokenMetadata(tokenId, acc),
    optInToAsset(acc, tokenId),
  ]);

  if (accepted) {
    const { assets } = store.getState();
    store.assets([...assets, asset]);
    updateNotification(alertId, `✅ Accepted Token`);
  } else updateAsError(alertId, `Asset opt-in failed!`);

  return accepted;
}

/**
 * Fetch asset details by ID (requires an account):
 * will also fetch user balance of token
 */
export async function tokenMetadata(
  token: any,
  acc: ReachAccount | null
): Promise<ReachToken> {
  if (!acc) return {} as ReachToken;
  const metadata = await getReachToken(token, acc);
  return metadata;
}

/** (Algorand) check whether a user has "opted-in" to a token */
export async function checkHasToken(token: any) {
  const { account } = store.getState();
  return account?.tokenAccepted(token) || Promise.resolve(false);
}

/** Initialize the `stdlib` instance according to the wallet provider. */
function configureWalletProvider(pr: string, isMainNet: boolean) {
  if (!Object.values(Providers).includes(pr)) {
    addNotification(`❌ ${pr} wallet is not supported by Reach.`);
    return;
  }

  const opts: ReachEnvOpts = {
    network: isMainNet ? BlockchainNetwork.MainNet : BlockchainNetwork.TestNet,
  };

  const loadWalletClient = (client: { disconnect(): any }) => {
    opts.providerEnv = IndexerProps(
      String(localStore.get(APP_INDEXER_KEY) || DEFAULT_INDEXER),
      isMainNet
    );
    opts.walletFallback = {
      WalletConnect: function _makeFallback() {
        store.walletClient(client);
        return client;
      },
    };
    console.log("----- opts:", opts);
    return loadReachWithOpts(loadStdlib, opts);
  };

  const WalletClient = MakePeraConnect();
  return loadWalletClient(new WalletClient());
}
