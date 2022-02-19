import { ModalProps } from "decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types";

export type Props = { onNavigate: () => void } & ModalProps;

export type MapStateProps = {};
export type MapDispatchProps = Pick<Props, "onNavigate">;
