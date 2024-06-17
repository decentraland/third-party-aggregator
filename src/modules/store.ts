import { applyMiddleware, compose, createStore } from 'redux'
import createSagasMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { createStorageMiddleware } from 'decentraland-dapps/dist/modules/storage/middleware'
import { storageReducerWrapper } from 'decentraland-dapps/dist/modules/storage/reducer'
import { createTransactionMiddleware } from 'decentraland-dapps/dist/modules/transaction/middleware'
import { createAnalyticsMiddleware } from 'decentraland-dapps/dist/modules/analytics/middleware'
import { config } from '../config'
import { isDevelopment } from '../lib/environment'
import { createRootReducer } from './reducer'
import { rootSaga } from './sagas'

const basename = /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/third-party-aggregator' : undefined

export const history = createBrowserHistory({ basename })

const rootReducer = storageReducerWrapper(createRootReducer(history))

const sagasMiddleware = createSagasMiddleware()

const isTestEnv = process.env.NODE_ENV === 'test'

const loggerMiddleware = isTestEnv
  ? null
  : createLogger({
      collapsed: () => true,
      predicate: () => isDevelopment,
    })

const transactionMiddleware = createTransactionMiddleware()

const { storageMiddleware, loadStorageMiddleware } = createStorageMiddleware({
  storageKey: 'third-party-aggregator',
})

const analyticsMiddleware = createAnalyticsMiddleware(config.get('SEGMENT_API_KEY'))

const middlewares = [
  sagasMiddleware,
  routerMiddleware(history),
  loggerMiddleware,
  transactionMiddleware,
  storageMiddleware,
  analyticsMiddleware,
].filter((mdw) => mdw !== null)

const middleware = applyMiddleware(...middlewares)

const enhancer = compose(middleware)

const store = createStore(rootReducer, enhancer)

sagasMiddleware.run(rootSaga)

loadStorageMiddleware(store)

if (isDevelopment) {
  const _window = window as any
  _window.store = store
}

export { store }
