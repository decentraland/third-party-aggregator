import { isLoadingType } from "decentraland-dapps/dist/modules/loading/selectors";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../../modules/reducer";
import {
  updateThirdPartyRequest,
  UPDATE_THIRD_PARTY_REQUEST,
} from "../../../modules/thirdParty/action";
import { getLoading } from "../../../modules/thirdParty/selectors";
import UpdateThirdPartyForm from "./UpdateThirdPartyForm";
import {
  MapDispatchProps,
  MapStateProps,
  OwnProps,
} from "./UpdateThirdPartyForm.types";
import { toUpdateThirdParty } from "./utils";

const mapState = (state: RootState): MapStateProps => {
  return {
    isUpdating: isLoadingType(getLoading(state), UPDATE_THIRD_PARTY_REQUEST),
  };
};

const mapDispatch = (dispatch: Dispatch, op: OwnProps): MapDispatchProps => ({
  onUpdateThirdParty: (data) =>
    dispatch(updateThirdPartyRequest(toUpdateThirdParty(op.thirdParty, data))),
});

export default connect(mapState, mapDispatch)(UpdateThirdPartyForm);
