import { getOpenModals } from "decentraland-dapps/dist/modules/modal/selectors";
import { channel } from "redux-saga";
import { fork, put, select, take } from "redux-saga/effects";
import { history } from "../store";
import { closeAllModals } from "./actions";

const locationChangeChannel = channel();

export function* modalSaga() {
  history.listen(() => locationChangeChannel.put({}));

  yield fork(handleLocationChangeChannel);
}

function* handleLocationChangeChannel() {
  while (true) {
    yield take(locationChangeChannel);

    const openModals: ReturnType<typeof getOpenModals> = yield select(
      getOpenModals
    );

    if (Object.keys(openModals).length > 1) {
      yield put(closeAllModals());
    }
  }
}
