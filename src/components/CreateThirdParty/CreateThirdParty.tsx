import React from "react";
import { Back, Button, Field, Header } from "decentraland-ui";
import { t } from "decentraland-dapps/dist/modules/translation/utils";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Page from "../Page";
import { CreateThirdPartyFormData, Props } from "./CreateThirdParty.types";
import { locations } from "../../modules/locations";
import { getUrn } from "./utils";
import ManagersField from "../ManagersField";
import "./CreateThirdParty.css";

const CreateThirdParty = ({ chainId, isLoading, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<CreateThirdPartyFormData>({
    defaultValues: {
      name: "",
      description: "",
      resolver: "",
      slots: "0",
      managers: [],
    },
  });

  return (
    <Page className="CreateThirdParty">
      <div className="page-title">
        <Link to={locations.thirdParties()}>
          <Back />
        </Link>
        <Header size="huge">{t("create_third_party.header")}</Header>
      </div>
      <form
        className="form-container"
        onSubmit={handleSubmit((data) => onSubmit(data, chainId))}
      >
        <Controller
          name="name"
          rules={{
            required: {
              value: true,
              message: t("create_third_party.required"),
            },
            validate: (value: string) => {
              if (value.includes(":")) {
                return t("create_third_party.required_no_colon_allowed");
              }
            },
          }}
          control={control}
          render={({ field, fieldState }) => (
            <Field
              label={t("create_third_party.name")}
              {...field}
              message={
                fieldState.error?.message ||
                (field.value ? getUrn(field.value, chainId) : "")
              }
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
              message: t("create_third_party.required"),
            },
            validate: (value: string) => {
              if (value.includes(":")) {
                return t("create_third_party.required_no_colon_allowed");
              }
            },
          }}
          render={({ field, fieldState }) => (
            <Field
              label={t("create_third_party.description")}
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
                return t("create_third_party.required_valid_url");
              }
            },
          }}
          render={({ field, fieldState }) => (
            <Field
              label={t("create_third_party.resolver")}
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
              message: t("create_third_party.required"),
            },
            min: {
              value: 0,
              message: t("create_third_party.required_positive"),
            },
          }}
          render={({ field, fieldState }) => (
            <Field
              label={t("create_third_party.slots")}
              type="number"
              {...field}
              message={fieldState.error?.message}
              error={fieldState.invalid}
            />
          )}
        />
        <Controller
          name="managers"
          control={control}
          rules={{
            validate: (managers) => {
              if (managers.length === 0) {
                return t("create_third_party.required_manager");
              }
            },
          }}
          render={({ field, fieldState }) => (
            <ManagersField
              managers={field.value}
              error={fieldState.error?.message}
              onChange={(managers) =>
                field.onChange({ target: { value: managers } })
              }
            />
          )}
        />
        <div>
          <Button
            type="submit"
            primary
            disabled={isLoading}
            loading={isLoading}
          >
            {t("create_third_party.submit")}
          </Button>
        </div>
      </form>
    </Page>
  );
};

export default React.memo(CreateThirdParty);
