import { takeEvery, put } from "redux-saga/effects";
import {
  CONNECT_WALLET_SUCCESS,
  ConnectWalletSuccessAction,
} from "decentraland-dapps/dist/modules/wallet/actions";
import { push } from "connected-react-router";
import { locations } from "../locations";

export function* locationSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess);
}

function* handleConnectWalletSuccess(_action: ConnectWalletSuccessAction) {
  if (window.location.pathname === locations.signIn()) {
    yield put(push(locations.root()));
  }
}
