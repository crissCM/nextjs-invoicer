import {
  checkSessionExists,
  connectUser,
  disconnectUser,
  loadReachWithOpts,
  optInToAsset,
  reconnectUser,
  tokenMetadata as getReachToken,
  ReachEnvOpts,
} from "@jackcom/reachduck";
import { ReachAccount, ReachToken } from "@jackcom/reachduck/lib/types";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import {
  ALGO_WalletConnect as WalletConnect,
  ALGO_PeraConnect as PeraWallet,
  loadStdlib,
} from "@reach-sh/stdlib";
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
  PipelineProviders,
  Providers,
} from "../utils";

/** Connect user Wallet */
export async function connect(provider: string, isMainNet: boolean) {
  configureWalletProvider(provider, isMainNet);
  const updates = await connectUser(DefaultConnectUserOpts);
  store.multiple(updates);
  return updates.account;
}

export async function pipelineConnect(isMainNet: boolean, provider: string) {
  try {
    const acc = await connect(provider, isMainNet);
    if (acc) {
      addNotification(`💡 Pipeline connection successful.`);
      return acc;
    }
  } catch (e) {
    if (typeof window !== "undefined") {
      addNotification(`❌ Pipeline connect error.`);
      console.log("Pipeline connect error: ", e);
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
    pr === PipelineProviders.MyAlgo ? { MyAlgoConnect } : { WalletConnect };

  const net = (
    isMainNet ? BlockchainNetwork.MainNet : BlockchainNetwork.TestNet
  ).toLowerCase();

  const opts: ReachEnvOpts = {
    network: isMainNet ? BlockchainNetwork.MainNet : BlockchainNetwork.TestNet,
  };

  switch (pr) {
    case Providers.Pera: {
      opts.walletFallback = { WalletConnect: PeraWallet };
      break;
    }
    case Providers.WalletConnect: {
      opts.walletFallback = { WalletConnect };
      break;
    }
    default:
      opts.walletFallback = { MyAlgoConnect };
      break;
  }

  const store = require("store");

  if (
    store.get(APP_INDEXER_KEY) !== null &&
    store.get(APP_INDEXER_KEY) !== DEFAULT_INDEXER
  ) {
    opts.providerEnv = IndexerProps(String(store.get(APP_INDEXER_KEY)), net);
  }

  loadReachWithOpts(loadStdlib, opts);
}
