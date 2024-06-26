import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import { FETCH_THIRD_PARTIES_REQUEST } from '../../modules/thirdParty/action'
import ThirdParties from './ThirdParties'
import { MapStateProps } from './ThirdParties.types'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { getAggregatorAddress, getLoading, getThirdParties } from '../../modules/thirdParty/selectors'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet'

const mapState = (state: RootState): MapStateProps => {
  const userAddress = getAddress(state)
  return {
    isLoading: isLoadingType(getLoading(state), FETCH_THIRD_PARTIES_REQUEST),
    isAggregator: getAggregatorAddress(state) === userAddress,
    userAddress,
    thirdParties: getThirdParties(state)
  }
}

export default connect(mapState, undefined)(ThirdParties)
