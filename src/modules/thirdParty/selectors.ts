import { createSelector } from 'reselect'
import { RootState } from '../reducer'
import { ThirdParty, ThirdPartyState } from './types'

export const getState = (state: RootState): ThirdPartyState => state.thirdParty
export const getData = (state: RootState): ThirdPartyState['data'] => getState(state).data
export const getLoading = (state: RootState): ThirdPartyState['loading'] => getState(state).loading
export const getError = (state: RootState): ThirdPartyState['error'] => getState(state).error

export const getThirdParty =
  (state: RootState) =>
  (tpId: string): ThirdParty | undefined =>
    getData(state).thirdParties[tpId]

export const getThirdParties = createSelector(getData, data => Object.values(data.thirdParties))
export const getAggregatorAddress = (state: RootState): string => getData(state).aggregatorAddress
