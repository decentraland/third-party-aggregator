import { ThirdParty } from "../../modules/thirdParty/types";

export type Props = {
  thirdParties: ThirdParty[];
  isLoading: boolean;
  onFetchThirdParties: () => void;
};

export type MapStateProps = Pick<Props, "thirdParties" | "isLoading">;
export type MapDispatchProps = Pick<Props, "onFetchThirdParties">;
