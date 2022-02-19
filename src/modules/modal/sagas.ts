import { LOCATION_CHANGE } from "connected-react-router";
import { getOpenModals } from "decentraland-dapps/dist/modules/modal/selectors";
import { put, select, takeEvery } from "redux-saga/effects";
import { closeAllModals } from "./actions";

export function* modalSaga() {
  yield takeEvery(LOCATION_CHANGE, handleLocationChange);
}

function* handleLocationChange() {
  const openModals: ReturnType<typeof getOpenModals> = yield select(
    getOpenModals
  );

  if (Object.keys(openModals).length > 0) {
    yield put(closeAllModals());
  }
}
