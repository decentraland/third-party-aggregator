import { RouteComponentProps } from "react-router-dom";
import { ThirdParty } from "../../modules/thirdParty/types";

export type UpdateThirdPartyFormData = {
  name: string;
  description: string;
  resolver: string;
  slots: string;
  managers: string;
};

export type Props = {
  thirdParty?: ThirdParty;
  isFetching: boolean;
  isUpdating: boolean;
  onUpdateThirdParty: (
    previous: ThirdParty,
    data: UpdateThirdPartyFormData
  ) => void;
  onFetchThirdParty: () => void;
} & RouteComponentProps<{ tpId: string }>;

export type MapStateProps = Pick<
  Props,
  "isUpdating" | "isFetching" | "thirdParty"
>;

export type MapDispatchProps = Pick<Props, "onUpdateThirdParty">;
export type OwnProps = Pick<Props, "match">;
