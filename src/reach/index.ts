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
import MyAlgoConnect from "@randlabs/myalgo-connect";
import {
  ALGO_WalletConnect as WalletConnect,
  loadStdlib,
} from "@reach-sh/stdlib";
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
  TxnlabProviders,
} from "../utils";
import PeraConnect from "../utils/WC/PeraConnect";

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
export async function reconnect(isMainNet: boolean) {
  const { addr = undefined, isWCSession } = checkSessionExists();
  configureWalletProvider(
    isWCSession ? Providers.WalletConnect : Providers.MyAlgo,
    isMainNet
  );
  const updates = await reconnectUser(addr, DefaultConnectUserOpts);
  store.multiple(updates);
  return updates.account;
}

/** Dissconnect user session */
export async function disconnect() {
  store.reset();
  addNotification("Disconnecting ... ");
  disconnectUser();
  console.log("Reach disconnected.");
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

  const fallback =
    pr === TxnlabProviders.MYALGO ? { MyAlgoConnect } : { WalletConnect };

  const net = (
    isMainNet ? BlockchainNetwork.MainNet : BlockchainNetwork.TestNet
  ).toLowerCase();

  const opts: ReachEnvOpts = {
    network: isMainNet ? BlockchainNetwork.MainNet : BlockchainNetwork.TestNet,
  };

  switch (pr) {
    case Providers.WalletConnect: {
      opts.walletFallback = { WalletConnect };
      break;
    }
    case Providers.PeraConnect: {
      opts.walletFallback = { WalletConnect: PeraConnect };
      break;
    }
    default:
      opts.walletFallback = { MyAlgoConnect };
      break;
  }

  opts.providerEnv = IndexerProps(
    String(localStore.get(APP_INDEXER_KEY) || DEFAULT_INDEXER),
    net
  );

  loadReachWithOpts(loadStdlib, opts);
}
