import { loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import { FetchTransactionSuccessAction, FETCH_TRANSACTION_SUCCESS } from 'decentraland-dapps/dist/modules/transaction/actions'
import {
  CreateThirdPartyFailureAction,
  CreateThirdPartyRequestAction,
  CreateThirdPartySuccessAction,
  CREATE_THIRD_PARTY_FAILURE,
  CREATE_THIRD_PARTY_REQUEST,
  CREATE_THIRD_PARTY_SUCCESS,
  FetchThirdPartiesFailureAction,
  FetchThirdPartiesRequestAction,
  FetchThirdPartiesSuccessAction,
  FETCH_THIRD_PARTIES_FAILURE,
  FETCH_THIRD_PARTIES_REQUEST,
  FETCH_THIRD_PARTIES_SUCCESS,
  UpdateThirdPartyFailureAction,
  UpdateThirdPartyRequestAction,
  UpdateThirdPartySuccessAction,
  UPDATE_THIRD_PARTY_FAILURE,
  UPDATE_THIRD_PARTY_REQUEST,
  UPDATE_THIRD_PARTY_SUCCESS
} from './action'
import { ThirdParty, ThirdPartyState } from './types'
import { isThirdPartyIdValid } from './utils'

const INITAL_STATE: ThirdPartyState = {
  data: { thirdParties: {}, aggregatorAddress: '0x0000000000000000000000000000000000000000' },
  loading: [],
  error: null
}

type ThirdPartyReducerAction =
  | FetchThirdPartiesRequestAction
  | FetchThirdPartiesSuccessAction
  | FetchThirdPartiesFailureAction
  | CreateThirdPartyRequestAction
  | CreateThirdPartySuccessAction
  | CreateThirdPartyFailureAction
  | UpdateThirdPartyRequestAction
  | UpdateThirdPartySuccessAction
  | UpdateThirdPartyFailureAction
  | FetchTransactionSuccessAction

export function thirdPartyReducer(state = INITAL_STATE, action: ThirdPartyReducerAction): ThirdPartyState {
  switch (action.type) {
    case CREATE_THIRD_PARTY_REQUEST:
    case UPDATE_THIRD_PARTY_REQUEST:
    case FETCH_THIRD_PARTIES_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_THIRD_PARTIES_SUCCESS: {
      const { thirdParties, aggregatorAddress } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          thirdParties: {
            ...state.data.thirdParties,
            ...thirdParties
              .filter(tp => isThirdPartyIdValid(tp.id))
              .reduce((acc, tp) => {
                acc[tp.id] = tp
                return acc
              }, {} as Record<string, ThirdParty>)
          },
          aggregatorAddress
        },
        error: null
      }
    }
    case FETCH_TRANSACTION_SUCCESS: {
      const { transaction } = action.payload

      switch (transaction.actionType) {
        case UPDATE_THIRD_PARTY_SUCCESS:
        case CREATE_THIRD_PARTY_SUCCESS: {
          return {
            ...state,
            loading: loadingReducer(state.loading, {
              type: transaction.actionType
            }),
            error: null
          }
        }
        default:
          return state
      }
    }
    case CREATE_THIRD_PARTY_FAILURE:
    case UPDATE_THIRD_PARTY_FAILURE:
    case FETCH_THIRD_PARTIES_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error
      }
    }
    default:
      return state
  }
}
