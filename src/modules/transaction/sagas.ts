import { openModal } from "decentraland-dapps/dist/modules/modal/actions";
import {
  FetchTransactionSuccessAction,
  FETCH_TRANSACTION_SUCCESS,
} from "decentraland-dapps/dist/modules/transaction/actions";
import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_THIRD_PARTY_SUCCESS,
  UPDATE_THIRD_PARTY_SUCCESS,
} from "../thirdParty/action";

export function* transactionSaga() {
  yield takeEvery(FETCH_TRANSACTION_SUCCESS, handleFetchTransactionSuccess);
}

function* handleFetchTransactionSuccess(action: FetchTransactionSuccessAction) {
  const { transaction } = action.payload;

  switch (transaction.actionType) {
    case CREATE_THIRD_PARTY_SUCCESS:
      yield put(
        openModal("ThirdPartyCreatedModal", {
          createThirdParty: transaction.payload.createThirdParty,
        })
      );
      break;
    case UPDATE_THIRD_PARTY_SUCCESS:
      yield put(
        openModal("ThirdPartyUpdatedModal", {
          updateThirdParty: transaction.payload.updateThirdParty,
        })
      );
  }
}
