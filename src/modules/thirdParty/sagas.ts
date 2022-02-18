import { call, put, takeEvery } from "redux-saga/effects";
import { graphql } from "decentraland-dapps/dist/lib/graph";
import {
  fetchThirdPartiesFailure,
  FetchThirdPartiesRequestAction,
  fetchThirdPartiesSuccess,
  FETCH_THIRD_PARTIES_REQUEST,
} from "./action";
import { ThirdParty } from "./types";

const TPR_SUBGRAPH = process.env.REACT_APP_TPR_SUBGRAPH!;

export function* thirdPartySagas() {
  yield takeEvery(FETCH_THIRD_PARTIES_REQUEST, handleFetchThirdPartiesRequest);
}

function* handleFetchThirdPartiesRequest(
  _action: FetchThirdPartiesRequestAction
) {
  const thirdPartiesQuery = `
    {
      thirdParties {
        id
        managers
        rawMetadata
        resolver
        isApproved
        maxItems
        totalItems
        root
        consumedSlots
      }
    }`;

  try {
    const thirdPartiesResult: { thirdParties: ThirdParty[] } = yield call(
      graphql,
      TPR_SUBGRAPH,
      thirdPartiesQuery
    );

    yield put(fetchThirdPartiesSuccess(thirdPartiesResult.thirdParties));
  } catch (e: any) {
    yield put(fetchThirdPartiesFailure(e.message));
  }
}
