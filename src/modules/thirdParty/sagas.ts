import { call, put, takeEvery } from 'redux-saga/effects'
import { getChainIdByNetwork } from 'decentraland-dapps/dist/lib/eth'
import { sendTransaction } from 'decentraland-dapps/dist/modules/wallet/utils'
import { Network } from '@dcl/schemas'
import { ContractName, getContract } from 'decentraland-transactions'
import { config } from '../../config'
import SubgraphService from '../vendor/decentraland/SubgraphService'
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
  UPDATE_THIRD_PARTY_REQUEST
} from './action'
import { GraphThirdParty, GraphRegistryData } from './types'

export const TPR_GRAPH_URL = config.get('TPR_GRAPH_URL', '')

export function* thirdPartySaga() {
  yield takeEvery(FETCH_THIRD_PARTIES_REQUEST, handleFetchThirdPartiesRequest)
  yield takeEvery(CREATE_THIRD_PARTY_REQUEST, handleCreateThirdPartyRequest)
  yield takeEvery(UPDATE_THIRD_PARTY_REQUEST, handleUpdateThirdPartyRequest)
}

function* handleFetchThirdPartiesRequest(_action: FetchThirdPartiesRequestAction) {
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
        metadata {
          thirdParty {
            id
            name
            description
            contracts {
              address
              network
            }
          }
        }
      }
      registryDatas(first: 1) {
        aggregatorAddress
      }
    }`

  try {
    const queryResult: { data: { thirdParties: GraphThirdParty[]; registryDatas: GraphRegistryData[] } } = yield call(
      [SubgraphService, 'fetch'],
      TPR_GRAPH_URL,
      thirdPartiesQuery
    )

    yield put(
      fetchThirdPartiesSuccess(
        queryResult.data.thirdParties.map(tp => {
          return {
            ...tp,
            metadata: {
              id: tp.metadata.thirdParty.id,
              name: tp.metadata.thirdParty.name,
              description: tp.metadata.thirdParty.description,
              contracts: tp.metadata.thirdParty.contracts
            }
          }
        }),
        queryResult.data.registryDatas[0]?.aggregatorAddress ?? '0x0000000000000000000000000000000000000000'
      )
    )
  } catch (e: any) {
    yield put(fetchThirdPartiesFailure(e.message))
  }
}

function* handleCreateThirdPartyRequest({ payload: { createThirdParty } }: CreateThirdPartyRequestAction) {
  try {
    const chainId = getChainIdByNetwork(Network.MATIC)
    const contractName = ContractName.ThirdPartyRegistry
    const contract = getContract(contractName, chainId)

    const { urn, metadata, resolver, managers, slots } = createThirdParty

    const txHash: string = yield call(sendTransaction, contract, tpr =>
      tpr.addThirdParties([[urn, metadata, resolver, managers, [], slots]])
    )

    yield put(createThirdPartySuccess(createThirdParty, chainId, txHash))
  } catch (e: any) {
    yield put(createThirdPartyFailure(createThirdParty, e.message))
  }
}

function* handleUpdateThirdPartyRequest({ payload: { updateThirdParty } }: UpdateThirdPartyRequestAction) {
  try {
    const chainId = getChainIdByNetwork(Network.MATIC)
    const contractName = ContractName.ThirdPartyRegistry
    const contract = getContract(contractName, chainId)

    const { urn, metadata, resolver, managers, managerValues, slots } = updateThirdParty
    const txHash: string = yield call(sendTransaction, contract, tpr =>
      tpr.updateThirdParties([[urn, metadata, resolver, managers, managerValues, slots]])
    )

    yield put(updateThirdPartySuccess(updateThirdParty, chainId, txHash))
  } catch (e: any) {
    yield put(updateThirdPartyFailure(updateThirdParty, e.message))
  }
}
