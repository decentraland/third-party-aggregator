import {
  loadingReducer,
  LoadingState,
} from "decentraland-dapps/dist/modules/loading/reducer";
import {
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
  | FetchThirdPartiesFailureAction;

export function thirdPartyReducer(
  state = INITAL_STATE,
  action: ThirdPartyReducerAction
): ThirdPartyState {
  switch (action.type) {
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
