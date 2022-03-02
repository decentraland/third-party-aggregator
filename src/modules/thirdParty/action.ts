import { ChainId } from "@dcl/schemas";
import { buildTransactionPayload } from "decentraland-dapps/dist/modules/transaction/utils";
import { action } from "typesafe-actions";
import { CreateThirdParty, ThirdParty, UpdateThirdParty } from "./types";

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

// Create third party

export const CREATE_THIRD_PARTY_REQUEST = "[Request] Create third party";
export const CREATE_THIRD_PARTY_SUCCESS = "[Success] Create third party";
export const CREATE_THIRD_PARTY_FAILURE = "[Failure] Create third party";

export const createThirdPartyRequest = (createThirdParty: CreateThirdParty) =>
  action(CREATE_THIRD_PARTY_REQUEST, { createThirdParty });
export const createThirdPartySuccess = (
  createThirdParty: CreateThirdParty,
  chainId: ChainId,
  txHash: string
) =>
  action(CREATE_THIRD_PARTY_SUCCESS, {
    createThirdParty,
    ...buildTransactionPayload(chainId, txHash, { createThirdParty }),
  });
action(CREATE_THIRD_PARTY_SUCCESS, {});
export const createThirdPartyFailure = (
  createThirdParty: CreateThirdParty,
  error: string
) => action(CREATE_THIRD_PARTY_FAILURE, { createThirdParty, error });

export type CreateThirdPartyRequestAction = ReturnType<
  typeof createThirdPartyRequest
>;
export type CreateThirdPartySuccessAction = ReturnType<
  typeof createThirdPartySuccess
>;
export type CreateThirdPartyFailureAction = ReturnType<
  typeof createThirdPartyFailure
>;

// Update third party

export const UPDATE_THIRD_PARTY_REQUEST = "[Request] Update third party";
export const UPDATE_THIRD_PARTY_SUCCESS = "[Success] Update third party";
export const UPDATE_THIRD_PARTY_FAILURE = "[Failure] Update third party";

export const updateThirdPartyRequest = (updateThirdParty: UpdateThirdParty) =>
  action(UPDATE_THIRD_PARTY_REQUEST, { updateThirdParty });
export const updateThirdPartySuccess = (
  updateThirdParty: UpdateThirdParty,
  chainId: ChainId,
  txHash: string
) =>
  action(UPDATE_THIRD_PARTY_SUCCESS, {
    updateThirdParty,
    ...buildTransactionPayload(chainId, txHash, { updateThirdParty }),
  });
action(UPDATE_THIRD_PARTY_SUCCESS, {});
export const updateThirdPartyFailure = (
  updateThirdParty: UpdateThirdParty,
  error: string
) => action(UPDATE_THIRD_PARTY_FAILURE, { updateThirdParty, error });

export type UpdateThirdPartyRequestAction = ReturnType<
  typeof updateThirdPartyRequest
>;
export type UpdateThirdPartySuccessAction = ReturnType<
  typeof updateThirdPartySuccess
>;
export type UpdateThirdPartyFailureAction = ReturnType<
  typeof updateThirdPartyFailure
>;
