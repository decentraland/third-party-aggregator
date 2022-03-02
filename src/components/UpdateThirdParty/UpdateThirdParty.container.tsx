import { isLoadingType } from "decentraland-dapps/dist/modules/loading/selectors";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../modules/reducer";
import { FETCH_THIRD_PARTIES_REQUEST } from "../../modules/thirdParty/action";
import { getLoading, getThirdParty } from "../../modules/thirdParty/selectors";
import UpdateThirdParty from "./UpdateThirdParty";
import {
  MapDispatchProps,
  MapStateProps,
  OwnProps,
} from "./UpdateThirdParty.types";

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    thirdParty: getThirdParty(state)(ownProps.match.params.tpId),
    isFetching: isLoadingType(getLoading(state), FETCH_THIRD_PARTIES_REQUEST),
  };
};

const mapDispatch = (_dispatch: Dispatch): MapDispatchProps => ({});

export default connect(mapState, mapDispatch)(UpdateThirdParty);
