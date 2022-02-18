import { createSelector } from "reselect";
import { RootState } from "../reducer";

export const getState = (state: RootState) => state.thirdParty;
export const getData = (state: RootState) => getState(state).data;
export const getLoading = (state: RootState) => getState(state).loading;
export const getError = (state: RootState) => getState(state).error;

export const getThirdParties = createSelector(getData, (data) =>
  Object.values(data)
);
