import React, { useState } from "react";
import { Button, Field, Icon } from "decentraland-ui";
import { t } from "decentraland-dapps/dist/modules/translation/utils";
import { Props } from "./ManagersField.types";
import "./ManagersField.css";

const ManagersField = ({
  managers,
  error: providedError,
  onAdd,
  onRemove,
}: Props) => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="ManagersField">
      <div className="managers-input">
        <Field
          label={t("managers_field.label")}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          message={[providedError, error].filter((e) => !!e).join(" - ")}
          error={!!providedError}
        />
        <div>
          <Button
            type="button"
            icon={<Icon name="add"></Icon>}
            onClick={() => {
              if (!address) {
                setError(t("managers_field.required"));
              } else if (managers.includes(address)) {
                setError(t("managers.required_not_duplicated"));
              } else if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
                setError(t("managers_field.required_valid_address"));
              } else {
                onAdd(address);
                setAddress("");
                setError("");
              }
            }}
          >
            {t("managers_field.action")}
          </Button>
        </div>
      </div>
      {managers.map((m) => (
        <div className="managers-address">
          <div key={m}>{m}</div>
          <Button
            type="button"
            icon={<Icon name="delete" />}
            basic
            onClick={() => onRemove(m)}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(ManagersField);
