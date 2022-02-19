import * as React from "react";
import { Button, Close } from "decentraland-ui";
import { Modal } from "decentraland-dapps/dist/containers";
import { t } from "decentraland-dapps/dist/modules/translation/utils";
import { Props } from "./ThirdPartyCreatedModal.types";

const ThirdPartyCreatedModal = ({ name, onClose, onNavigate }: Props) => {
  return (
    <Modal name={name} closeIcon={<Close onClick={onClose} />}>
      <Modal.Header>{t("third_party_created_modal.header")}</Modal.Header>
      <Modal.Content>{t("third_party_created_modal.content")}</Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>
          {t("third_party_created_modal.button_left")}
        </Button>
        <Button onClick={onNavigate}>
          {t("third_party_created_modal.button_right")}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default React.memo(ThirdPartyCreatedModal);
