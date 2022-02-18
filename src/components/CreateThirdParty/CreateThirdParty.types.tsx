export type CreateThirdPartyFormData = {
  urn: string;
  name: string;
  description: string;
  resolver: string;
  slots: string;
  managers: string;
};

export type Props = {
  isLoading: boolean;
  onSubmit: (data: CreateThirdPartyFormData) => void;
};

export type MapStateProps = Pick<Props, 'isLoading'>;
export type MapDispatchProps = Pick<Props, "onSubmit">;
