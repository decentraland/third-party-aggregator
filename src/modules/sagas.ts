import { all } from "redux-saga/effects";
import { createAnalyticsSaga } from "decentraland-dapps/dist/modules/analytics/sagas";
import { createProfileSaga } from "decentraland-dapps/dist/modules/profile/sagas";
import { createTranslationSaga } from "decentraland-dapps/dist/modules/translation/sagas";
import { transactionSaga } from "decentraland-dapps/dist/modules/transaction/sagas";
import { createWalletSaga } from "decentraland-dapps/dist/modules/wallet/sagas";
import { toastSaga } from "decentraland-dapps/dist/modules/toast/sagas";
import { modalSaga } from "./modal/sagas";
import { locationSaga } from "./location/sagas";
import { thirdPartySagas } from "./thirdParty/sagas";
import * as translations from "../locales";

export const TRANSACTIONS_API_URL = process.env.REACT_APP_TRANSACTIONS_API_URL!;

const analyticsSaga = createAnalyticsSaga();

const profileSaga = createProfileSaga({
  peerUrl: process.env.REACT_APP_PEER_URL!,
});

const translationSaga = createTranslationSaga({ translations });

const walletSaga = createWalletSaga({
  CHAIN_ID: +(process.env.REACT_APP_CHAIN_ID || 1),
  POLL_INTERVAL: 0,
  TRANSACTIONS_API_URL,
});

export function* rootSaga() {
  yield all([
    analyticsSaga(),
    transactionSaga(),
    profileSaga(),
    walletSaga(),
    translationSaga(),
    modalSaga(),
    locationSaga(),
    toastSaga(),
    thirdPartySagas()
  ]);
}
