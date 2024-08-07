import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../../../modules/reducer'
import { updateThirdPartyRequest, UPDATE_THIRD_PARTY_REQUEST } from '../../../modules/thirdParty/action'
import { getAggregatorAddress, getLoading } from '../../../modules/thirdParty/selectors'
import { getIsLinkedWearablesV2Enabled } from '../../../modules/features/selectors'
import UpdateThirdPartyForm from './UpdateThirdPartyForm'
import { MapDispatchProps, MapStateProps, OwnProps } from './UpdateThirdPartyForm.types'
import { toUpdateThirdParty } from './utils'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  const userAddress = getAddress(state)
  return {
    isUpdating: isLoadingType(getLoading(state), UPDATE_THIRD_PARTY_REQUEST),
    isThirdPartyV2Enabled: getIsLinkedWearablesV2Enabled(state),
    canUpdate: Boolean(userAddress && (getAggregatorAddress(state) === userAddress || ownProps.thirdParty.managers.includes(userAddress)))
  }
}

const mapDispatch = (dispatch: Dispatch, op: OwnProps): MapDispatchProps => ({
  onUpdateThirdParty: data => dispatch(updateThirdPartyRequest(toUpdateThirdParty(op.thirdParty, data)))
})

export default connect(mapState, mapDispatch)(UpdateThirdPartyForm)
