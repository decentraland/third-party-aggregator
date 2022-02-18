import { call, put, takeEvery } from "redux-saga/effects";
import { graphql } from "decentraland-dapps/dist/lib/graph";
import { getChainIdByNetwork } from "decentraland-dapps/dist/lib/eth";
import { sendTransaction } from "decentraland-dapps/dist/modules/wallet/utils";
import { Network } from "@dcl/schemas";
import {
  createThirdPartyFailure,
  CreateThirdPartyRequestAction,
  createThirdPartySuccess,
  CREATE_THIRD_PARTY_REQUEST,
  fetchThirdPartiesFailure,
  FetchThirdPartiesRequestAction,
  fetchThirdPartiesSuccess,
  FETCH_THIRD_PARTIES_REQUEST,
} from "./action";
import { ThirdParty } from "./types";
import { ContractName, getContract } from "decentraland-transactions";

const TPR_SUBGRAPH = process.env.REACT_APP_TPR_SUBGRAPH!;

export function* thirdPartySagas() {
  yield takeEvery(FETCH_THIRD_PARTIES_REQUEST, handleFetchThirdPartiesRequest);
  yield takeEvery(CREATE_THIRD_PARTY_REQUEST, handleCreateThirdPartyRequest);
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

function* handleCreateThirdPartyRequest({
  payload: { createThirdParty },
}: CreateThirdPartyRequestAction) {
  try {
    const chainId = getChainIdByNetwork(Network.MATIC);
    const contractName = ContractName.ThirdPartyRegistry;
    const contract = getContract(contractName, chainId);

    const { urn, metadata, resolver, managers, slots } = createThirdParty;

    const txHash: string = yield call(sendTransaction, contract, (tpr) =>
      tpr.addThirdParties([[urn, metadata, resolver, managers, [], slots]])
    );

    yield put(createThirdPartySuccess(createThirdParty, chainId, txHash));
  } catch (e: any) {
    yield put(createThirdPartyFailure(createThirdParty, e.message));
  }
}
