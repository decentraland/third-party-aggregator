import { RouteComponentProps } from "react-router-dom";
import { ThirdParty } from "../../modules/thirdParty/types";

export type Props = {
  thirdParty?: ThirdParty;
  isFetching: boolean;
} & RouteComponentProps<{ tpId: string }>;

export type MapStateProps = Pick<Props, "isFetching" | "thirdParty">;
export type MapDispatchProps = {};
export type OwnProps = Pick<Props, "match">;
