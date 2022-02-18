import { action } from "typesafe-actions";
import { ThirdParty } from "./types";

// Fetch third parties

export const FETCH_THIRD_PARTIES_REQUEST = "[Request] Fetch third parties";
export const FETCH_THIRD_PARTIES_SUCCESS = "[Success] Fetch third parties";
export const FETCH_THIRD_PARTIES_FAILURE = "[Failure] Fetch third parties";

export const fetchThirdPartiesRequest = () =>
  action(FETCH_THIRD_PARTIES_REQUEST, {});
export const fetchThirdPartiesSuccess = (thirdParties: ThirdParty[]) =>
  action(FETCH_THIRD_PARTIES_SUCCESS, { thirdParties });
export const fetchThirdPartiesFailure = (error: string) =>
  action(FETCH_THIRD_PARTIES_FAILURE, { error });

export type FetchThirdPartiesRequestAction = ReturnType<
  typeof fetchThirdPartiesRequest
>;
export type FetchThirdPartiesSuccessAction = ReturnType<
  typeof fetchThirdPartiesSuccess
>;
export type FetchThirdPartiesFailureAction = ReturnType<
  typeof fetchThirdPartiesFailure
>;
