import { call, put, takeEvery } from "redux-saga/effects";
import { graphql } from "decentraland-dapps/dist/lib/graph";
import { getChainIdByNetwork } from "decentraland-dapps/dist/lib/eth";
import { sendTransaction } from "decentraland-dapps/dist/modules/wallet/utils";
import { Network } from "@dcl/schemas";
import { ContractName, getContract } from "decentraland-transactions";
import {
  createThirdPartyFailure,
  CreateThirdPartyRequestAction,
  createThirdPartySuccess,
  CREATE_THIRD_PARTY_REQUEST,
  fetchThirdPartiesFailure,
  FetchThirdPartiesRequestAction,
  fetchThirdPartiesSuccess,
  FETCH_THIRD_PARTIES_REQUEST,
  updateThirdPartyFailure,
  UpdateThirdPartyRequestAction,
  updateThirdPartySuccess,
  UPDATE_THIRD_PARTY_REQUEST,
} from "./action";
import { ThirdParty } from "./types";
import { parseMetadata } from "./utils";
import { tprSubgraphUrl } from "../../lib/environment";

export function* thirdPartySaga() {
  yield takeEvery(FETCH_THIRD_PARTIES_REQUEST, handleFetchThirdPartiesRequest);
  yield takeEvery(CREATE_THIRD_PARTY_REQUEST, handleCreateThirdPartyRequest);
  yield takeEvery(UPDATE_THIRD_PARTY_REQUEST, handleUpdateThirdPartyRequest);
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
        root
        consumedSlots
      }
    }`;

  try {
    const thirdPartiesResult: { thirdParties: ThirdParty[] } = yield call(
      graphql,
      tprSubgraphUrl,
      thirdPartiesQuery
    );

    yield put(
      fetchThirdPartiesSuccess(
        thirdPartiesResult.thirdParties.map((tp) => {
          const { name, description } = parseMetadata(tp.rawMetadata);

          return {
            ...tp,
            metadata: {
              name,
              description,
              id: tp.id,
            },
          };
        })
      )
    );
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

function* handleUpdateThirdPartyRequest({
  payload: { updateThirdParty },
}: UpdateThirdPartyRequestAction) {
  try {
    const chainId = getChainIdByNetwork(Network.MATIC);
    const contractName = ContractName.ThirdPartyRegistry;
    const contract = getContract(contractName, chainId);

    const { urn, metadata, resolver, managers, managerValues, slots } =
      updateThirdParty;

    const txHash: string = yield call(sendTransaction, contract, (tpr) =>
      tpr.updateThirdParties([
        [urn, metadata, resolver, managers, managerValues, slots],
      ])
    );

    yield put(updateThirdPartySuccess(updateThirdParty, chainId, txHash));
  } catch (e: any) {
    yield put(updateThirdPartyFailure(updateThirdParty, e.message));
  }
}
