import { connect } from "react-redux";
import { Dispatch } from "redux";
import { push } from "connected-react-router";
import ThirdPartyUpdatedModal from "./ThirdPartyUpdatedModal";
import { RootState } from "../../../modules/reducer";
import {
  MapStateProps,
  MapDispatchProps,
} from "./ThirdPartyUpdatedModal.types";
import { locations } from "../../../modules/locations";

const mapState = (_state: RootState): MapStateProps => ({});

const mapDispatch = (dispatch: Dispatch): MapDispatchProps => ({
  onNavigate: () => dispatch(push(locations.thirdParties())),
});

export default connect(mapState, mapDispatch)(ThirdPartyUpdatedModal);
