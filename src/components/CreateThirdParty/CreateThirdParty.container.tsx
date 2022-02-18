import { isLoadingType } from "decentraland-dapps/dist/modules/loading/selectors";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../modules/reducer";
import {
  createThirdPartyRequest,
  CREATE_THIRD_PARTY_REQUEST,
} from "../../modules/thirdParty/action";
import { getLoading } from "../../modules/thirdParty/selectors";
import CreateThirdParty from "./CreateThirdParty";
import { MapDispatchProps, MapStateProps } from "./CreateThirdParty.types";
import { toCreateThirdParty } from "./utils";

const mapState = (state: RootState): MapStateProps => ({
  isLoading: isLoadingType(getLoading(state), CREATE_THIRD_PARTY_REQUEST),
});

const mapDispatch = (dispatch: Dispatch): MapDispatchProps => ({
  onSubmit: (data) =>
    dispatch(createThirdPartyRequest(toCreateThirdParty(data))),
});

export default connect(mapState, mapDispatch)(CreateThirdParty);
