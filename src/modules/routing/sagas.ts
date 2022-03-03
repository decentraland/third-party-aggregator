import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { put, select, takeEvery } from "redux-saga/effects";
import { fetchThirdPartiesRequest } from "../thirdParty/action";
import { getThirdPartiesMatch, getUpdateThirdPartyMatch } from "./selectors";

export function* routingSaga() {
  yield takeEvery(LOCATION_CHANGE, handleLocationChange);
}

function* handleLocationChange(_action: LocationChangeAction) {
  const thirdPartiesMatch: ReturnType<typeof getThirdPartiesMatch> =
    yield select(getThirdPartiesMatch);

  const updateThirdPartyMatch: ReturnType<typeof getUpdateThirdPartyMatch> =
    yield select(getUpdateThirdPartyMatch);

  if (thirdPartiesMatch) {
    yield put(fetchThirdPartiesRequest());
  }

  if (updateThirdPartyMatch) {
    yield put(fetchThirdPartiesRequest());
  }
}
