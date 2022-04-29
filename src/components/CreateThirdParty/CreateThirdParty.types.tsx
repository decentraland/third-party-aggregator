import { ChainId } from "@dcl/schemas";

export type CreateThirdPartyFormData = {
  name: string;
  description: string;
  resolver: string;
  slots: string;
  managers: string[];
};

export type Props = {
  chainId: ChainId;
  isLoading: boolean;
  onSubmit: (data: CreateThirdPartyFormData, chainId: ChainId) => void;
};

export type MapStateProps = Pick<Props, "isLoading" | "chainId">;
export type MapDispatchProps = Pick<Props, "onSubmit">;
