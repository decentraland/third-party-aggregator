import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../modules/reducer";
import { FETCH_THIRD_PARTIES_REQUEST } from "../../modules/thirdParty/action";
import ThirdParties from "./ThirdParties";
import { MapDispatchProps, MapStateProps } from "./ThirdParties.types";
import { isLoadingType } from "decentraland-dapps/dist/modules/loading/selectors";
import {
  getLoading,
  getThirdParties,
} from "../../modules/thirdParty/selectors";

const mapState = (state: RootState): MapStateProps => ({
  isLoading: isLoadingType(getLoading(state), FETCH_THIRD_PARTIES_REQUEST),
  thirdParties: getThirdParties(state),
});

const mapDispatch = (_dispatch: Dispatch): MapDispatchProps => ({});

export default connect(mapState, mapDispatch)(ThirdParties);
