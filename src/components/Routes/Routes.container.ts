import { connect } from "react-redux";
import {
  isConnected,
  isConnecting,
} from "decentraland-dapps/dist/modules/wallet/selectors";

import { RootState } from "../../modules/reducer";
import Routes from "./Routes";
import { MapStateProps } from "./Routes.types";

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
});

export default connect(mapState)(Routes);
