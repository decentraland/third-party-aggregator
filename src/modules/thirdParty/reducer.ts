import {
  loadingReducer,
  LoadingState,
} from "decentraland-dapps/dist/modules/loading/reducer";
import {
  FetchTransactionSuccessAction,
  FETCH_TRANSACTION_SUCCESS,
} from "decentraland-dapps/dist/modules/transaction/actions";
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
} from "./action";
import { ThirdParty } from "./types";

export type ThirdPartyState = {
  data: Record<string, ThirdParty>;
  loading: LoadingState;
  error: string | null;
};

const INITAL_STATE: ThirdPartyState = {
  data: {},
  loading: [],
  error: null,
};

type ThirdPartyReducerAction =
  | FetchThirdPartiesRequestAction
  | FetchThirdPartiesSuccessAction
  | FetchThirdPartiesFailureAction
  | CreateThirdPartyRequestAction
  | CreateThirdPartySuccessAction
  | CreateThirdPartyFailureAction
  | FetchTransactionSuccessAction;

export function thirdPartyReducer(
  state = INITAL_STATE,
  action: ThirdPartyReducerAction
): ThirdPartyState {
  switch (action.type) {
    case CREATE_THIRD_PARTY_REQUEST:
    case FETCH_THIRD_PARTIES_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
      };
    }
    case FETCH_THIRD_PARTIES_SUCCESS: {
      const { thirdParties } = action.payload;
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: thirdParties.reduce((acc, tp) => {
          acc[tp.id] = tp;
          return acc;
        }, {} as Record<string, ThirdParty>),
        error: null,
      };
    }
    case FETCH_TRANSACTION_SUCCESS: {
      const { transaction } = action.payload;

      switch (transaction.actionType) {
        case CREATE_THIRD_PARTY_SUCCESS: {
          return {
            ...state,
            loading: loadingReducer(state.loading, {
              type: transaction.actionType,
            }),
            error: null,
          };
        }
        default:
          return state;
      }
    }
    case CREATE_THIRD_PARTY_FAILURE:
    case FETCH_THIRD_PARTIES_FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error,
      };
    }
    default:
      return state;
  }
}
