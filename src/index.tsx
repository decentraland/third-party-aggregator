import React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import ModalProvider from 'decentraland-dapps/dist/providers/ModalProvider'
import WalletProvider from 'decentraland-dapps/dist/providers/WalletProvider'
import ToastProvider from 'decentraland-dapps/dist/providers/ToastProvider'
import TranslationProvider from 'decentraland-dapps/dist/providers/TranslationProvider'

import { store, history } from './modules/store'
import { Routes } from './components/Routes'
import * as locales from './locales'
import * as modals from './components/Modals'

import './index.css'
import './themes'

ReactDOM.render(
  <Provider store={store}>
    <TranslationProvider locales={Object.keys(locales)}>
      <ToastProvider>
        <WalletProvider>
          <ModalProvider components={modals}>
            <ConnectedRouter history={history}>
              <Routes />
            </ConnectedRouter>
          </ModalProvider>
        </WalletProvider>
      </ToastProvider>
    </TranslationProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
