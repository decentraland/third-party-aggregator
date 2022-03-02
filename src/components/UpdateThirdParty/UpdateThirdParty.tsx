import React from "react";
import { Back, Button, Field, Header, Loader } from "decentraland-ui";
import { t } from "decentraland-dapps/dist/modules/translation/utils";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Page from "../Page";
import { UpdateThirdPartyFormData, Props } from "./UpdateThirdParty.types";
import { locations } from "../../modules/locations";
import { ThirdParty } from "../../modules/thirdParty/types";
import "./UpdateThirdParty.css";

const UpdateThirdParty = ({
  isFetching,
  isUpdating,
  thirdParty,
  onUpdateThirdParty,
}: Props) => {
  return (
    <Page className="UpdateThirdParty">
      <div className="page-title">
        <Link to={locations.thirdParties()}>
          <Back />
        </Link>
        <Header size="huge">{t("update_third_party.header")}</Header>
      </div>
      {isFetching ? (
        <Loader active />
      ) : (
        <UpdateThirdPartyForm
          isUpdating={isUpdating}
          thirdParty={thirdParty!}
          onUpdateThirdParty={onUpdateThirdParty}
        />
      )}
    </Page>
  );
};

const UpdateThirdPartyForm = ({
  thirdParty,
  isUpdating,
  onUpdateThirdParty,
}: {
  thirdParty: ThirdParty;
  isUpdating: boolean;
  onUpdateThirdParty: (
    previous: ThirdParty,
    data: UpdateThirdPartyFormData
  ) => void;
}) => {
  const { control, handleSubmit } = useForm<UpdateThirdPartyFormData>({
    defaultValues: {
      name: thirdParty?.metadata.name ?? "",
      description: thirdParty?.metadata.description ?? "",
      resolver: thirdParty?.resolver ?? "",
      slots: "0",
      managers: thirdParty?.managers ? thirdParty.managers.join(",") : "",
    },
  });

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit((data) => onUpdateThirdParty(thirdParty, data))}
    >
      <Controller
        name="name"
        rules={{
          required: {
            value: true,
            message: t("update_third_party.required"),
          },
          validate: (value: string) => {
            if (value.includes(":")) {
              return t("update_third_party.required_no_colon_allowed");
            }
          },
        }}
        control={control}
        render={({ field, fieldState }) => (
          <Field
            label={t("update_third_party.name")}
            {...field}
            message={fieldState.error?.message || thirdParty.id}
            error={fieldState.invalid}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{
          required: {
            value: true,
            message: t("update_third_party.required"),
          },
          validate: (value: string) => {
            if (value.includes(":")) {
              return t("update_third_party.required_no_colon_allowed");
            }
          },
        }}
        render={({ field, fieldState }) => (
          <Field
            label={t("update_third_party.description")}
            {...field}
            message={fieldState.error?.message}
            error={fieldState.invalid}
          />
        )}
      />
      <Controller
        name="resolver"
        control={control}
        rules={{
          validate: (value: string) => {
            if (
              !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/.test(
                value
              )
            ) {
              return t("update_third_party.required_valid_url");
            }
          },
        }}
        render={({ field, fieldState }) => (
          <Field
            label={t("update_third_party.resolver")}
            {...field}
            message={fieldState.error?.message}
            error={fieldState.invalid}
          />
        )}
      />
      <Controller
        name="slots"
        control={control}
        rules={{
          required: {
            value: true,
            message: t("update_third_party.required"),
          },
          min: {
            value: 0,
            message: t("update_third_party.required_positive"),
          },
        }}
        render={({ field, fieldState }) => (
          <Field
            label={t("update_third_party.slots")}
            type="number"
            {...field}
            message={
              fieldState.error?.message ||
              t(`update_third_party.available_slots`, {
                v:
                  Number(thirdParty.maxItems) -
                  Number(thirdParty.consumedSlots),
              })
            }
            error={fieldState.invalid}
          />
        )}
      />
      <Controller
        name="managers"
        control={control}
        rules={{
          validate: (value: string) => {
            if (!value) {
              return t("update_third_party.required_addresses");
            }

            const addresses = value.split(",");
            const set = new Set<string>();

            for (let i = 0; i < addresses.length; i++) {
              const address = addresses[i];

              if (set.has(address)) {
                return `"${address}" ${t(
                  "update_third_party.required_no_repeated_address_post"
                )}`;
              }

              set.add(address);

              if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
                return `${
                  address
                    ? `"${address}"`
                    : t("update_third_party.required_valid_address_prev")
                } ${t("update_third_party.required_valid_address_post")}`;
              }
            }
          },
        }}
        render={({ field, fieldState }) => (
          <Field
            label={t("update_third_party.managers")}
            {...field}
            message={fieldState.error?.message}
            error={fieldState.invalid}
          />
        )}
      />
      <div>
        <Button
          type="submit"
          primary
          disabled={isUpdating}
          loading={isUpdating}
        >
          {t("update_third_party.submit")}
        </Button>
      </div>
    </form>
  );
};

export default React.memo(UpdateThirdParty);
