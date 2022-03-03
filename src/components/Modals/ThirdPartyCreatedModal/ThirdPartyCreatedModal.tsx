import * as React from "react";
import { Button, Close } from "decentraland-ui";
import { Modal } from "decentraland-dapps/dist/containers";
import { t } from "decentraland-dapps/dist/modules/translation/utils";
import { Props } from "./ThirdPartyCreatedModal.types";
import { parseMetadata } from "../../../modules/thirdParty/utils";

const ThirdPartyCreatedModal = ({
  name,
  metadata,
  onClose,
  onNavigate,
}: Props) => {
  const { createThirdParty } = metadata;
  const { name: thirdPartyName } = parseMetadata(createThirdParty.metadata);

  return (
    <Modal name={name} closeIcon={<Close onClick={onClose} />}>
      <Modal.Header>{t("third_party_created_modal.header")}</Modal.Header>
      <Modal.Content>
        <p>
          {t("third_party_created_modal.content", { name: thirdPartyName })}
        </p>
        <p>{t("third_party_created_modal.content_2")}</p>
      </Modal.Content>
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
