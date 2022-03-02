import { createSelector } from "reselect";
import { RootState } from "../reducer";
import { ThirdParty } from "./types";

export const getState = (state: RootState) => state.thirdParty;
export const getData = (state: RootState) => getState(state).data;
export const getLoading = (state: RootState) => getState(state).loading;
export const getError = (state: RootState) => getState(state).error;

export const getThirdParty =
  (state: RootState) =>
  (tpId: string): ThirdParty | undefined =>
    getData(state)[tpId];

export const getThirdParties = createSelector(getData, (data) =>
  Object.values(data)
);
