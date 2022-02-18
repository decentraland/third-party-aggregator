import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../modules/reducer";
import CreateThirdParty from "./CreateThirdParty";
import { MapDispatchProps, MapStateProps } from "./CreateThirdParty.types";

const mapState = (_state: RootState): MapStateProps => ({});

const mapDispatch = (_dispatch: Dispatch): MapDispatchProps => ({});

export default connect(mapState, mapDispatch)(CreateThirdParty);
