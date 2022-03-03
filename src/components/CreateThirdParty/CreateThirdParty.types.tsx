import { ChainName } from "@dcl/schemas";

export type CreateThirdPartyFormData = {
  name: string;
  description: string;
  resolver: string;
  slots: string;
  managers: string[];
};

export type Props = {
  chainName: ChainName;
  isLoading: boolean;
  onSubmit: (data: CreateThirdPartyFormData, chainName: ChainName) => void;
};

export type MapStateProps = Pick<Props, "isLoading" | "chainName">;
export type MapDispatchProps = Pick<Props, "onSubmit">;
