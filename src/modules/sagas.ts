import { all } from "redux-saga/effects";
import { createAnalyticsSaga } from "decentraland-dapps/dist/modules/analytics/sagas";
import { createProfileSaga } from "decentraland-dapps/dist/modules/profile/sagas";
import { createTranslationSaga } from "decentraland-dapps/dist/modules/translation/sagas";
import { transactionSaga } from "decentraland-dapps/dist/modules/transaction/sagas";
import { createWalletSaga } from "decentraland-dapps/dist/modules/wallet/sagas";
import { toastSaga } from "decentraland-dapps/dist/modules/toast/sagas";
import { modalSaga } from "./modal/sagas";
import { locationSaga } from "./location/sagas";
import { thirdPartySaga } from "./thirdParty/sagas";
import { routingSaga } from "./routing/sagas";
import { transactionSaga as extendedTransactionSaga } from "./transaction/sagas";
import * as translations from "../locales";
import { chainId, peerUrl, transactionsApiUrl } from "../lib/environment";

const analyticsSaga = createAnalyticsSaga();

const profileSaga = createProfileSaga({ peerUrl });

const translationSaga = createTranslationSaga({ translations });

const walletSaga = createWalletSaga({
  CHAIN_ID: chainId,
  POLL_INTERVAL: 0,
  TRANSACTIONS_API_URL: transactionsApiUrl,
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
    thirdPartySaga(),
    routingSaga(),
    extendedTransactionSaga(),
  ]);
}
