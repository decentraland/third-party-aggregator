export const environment = process.env.REACT_APP_ENVIRONMENT;

export const isDev =
  !window.location.hostname.endsWith(".org") &&
  !window.location.hostname.endsWith(".today");

export const isStg = window.location.hostname.endsWith(".today");
export const isPrd = window.location.hostname.endsWith(".org");

export const isTest = process.env.NODE_ENV === "test";

export const chainId = (() => {
  if (process.env.REACT_APP_CHAIN_ID) {
    return +process.env.REACT_APP_CHAIN_ID;
  }

  return isPrd || isStg ? 1 : 11155111;
})();

export const peerUrl = (() => {
  if (process.env.REACT_APP_PEER_URL) {
    return process.env.REACT_APP_PEER_URL;
  }

  return isPrd || isStg
    ? "https://peer-lb.decentraland.org"
    : "https://peer.decentraland.zone";
})();

export const transactionsApiUrl = (() => {
  if (process.env.REACT_APP_TRANSACTIONS_API_URL) {
    return process.env.REACT_APP_TRANSACTIONS_API_URL;
  }

  return isPrd
    ? "https://transactions-api.decentraland.org/v1"
    : isStg
    ? "https://transactions-api.decentraland.today/v1"
    : "https://transactions-api.decentraland.zone/v1";
})();

export const tprSubgraphUrl = (() => {
  if (process.env.REACT_APP_TPR_SUBGRAPH) {
    return process.env.REACT_APP_TPR_SUBGRAPH;
  }

  return isPrd || isStg
    ? "https://api.thegraph.com/subgraphs/name/decentraland/tpr-matic-mainnet"
    : "https://api.thegraph.com/subgraphs/name/decentraland/tpr-matic-mumbai";
})();

export const segmentApiKey = (() => {
  if (process.env.REACT_APP_SEGMENT_API_KEY) {
    return process.env.REACT_APP_SEGMENT_API_KEY;
  }

  return "";
})();
