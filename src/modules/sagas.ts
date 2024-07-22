import { all } from 'redux-saga/effects'
import { createAnalyticsSaga } from 'decentraland-dapps/dist/modules/analytics/sagas'
import { createProfileSaga } from 'decentraland-dapps/dist/modules/profile/sagas'
import { createTranslationSaga } from 'decentraland-dapps/dist/modules/translation/sagas'
import { transactionSaga } from 'decentraland-dapps/dist/modules/transaction/sagas'
import { createWalletSaga } from 'decentraland-dapps/dist/modules/wallet/sagas'
import { toastSaga } from 'decentraland-dapps/dist/modules/toast/sagas'
import { featuresSaga } from 'decentraland-dapps/dist/modules/features/sagas'
import { ApplicationName } from 'decentraland-dapps/dist/modules/features'
import { config } from '../config'
import * as translations from '../locales'
import { modalSaga } from './modal/sagas'
import { locationSaga } from './location/sagas'
import { thirdPartySaga } from './thirdParty/sagas'
import { routingSaga } from './routing/sagas'
import { transactionSaga as extendedTransactionSaga } from './transaction/sagas'

const analyticsSaga = createAnalyticsSaga()

const profileSaga = createProfileSaga({ peerUrl: config.get('PEER_URL', ''), getIdentity: () => undefined })

const translationSaga = createTranslationSaga({ translations })

const walletSaga = createWalletSaga({
  CHAIN_ID: config.get('CHAIN_ID'),
  POLL_INTERVAL: 0,
  TRANSACTIONS_API_URL: config.get('TRANSACTIONS_API_URL')
})

export function* rootSaga() {
  yield all([
    analyticsSaga(),
    transactionSaga(),
    profileSaga(),
    walletSaga(),
    featuresSaga({ polling: { apps: [ApplicationName.BUILDER, ApplicationName.DAPPS], delay: 60000 /** 60 seconds */ } }),
    translationSaga(),
    modalSaga(),
    locationSaga(),
    toastSaga(),
    thirdPartySaga(),
    routingSaga(),
    extendedTransactionSaga()
  ])
}
