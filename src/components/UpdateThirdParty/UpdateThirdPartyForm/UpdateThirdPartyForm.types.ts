import { ThirdParty } from "../../../modules/thirdParty/types";

export type UpdateThirdPartyFormData = {
  name: string;
  description: string;
  resolver: string;
  slots: string;
  managers: string[];
};

export type Props = {
  thirdParty: ThirdParty;
  isUpdating: boolean;
  onUpdateThirdParty: (data: UpdateThirdPartyFormData) => void;
};

export type MapStateProps = Pick<Props, "isUpdating">;
export type MapDispatchProps = Pick<Props, "onUpdateThirdParty">;
export type OwnProps = Pick<Props, "thirdParty">;
