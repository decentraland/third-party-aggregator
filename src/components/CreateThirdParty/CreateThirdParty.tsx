import React from "react";
import { Back, Button, Field, Header } from "decentraland-ui";
import { t } from "decentraland-dapps/dist/modules/translation/utils";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Page from "../Page";
import { CreateThirdPartyFormData, Props } from "./CreateThirdParty.types";
import { locations } from "../../modules/locations";

import "./CreateThirdParty.css";

const CreateThirdParty = ({ isLoading, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<CreateThirdPartyFormData>({
    defaultValues: {
      urn: "",
      name: "",
      description: "",
      resolver: "",
      slots: "",
      managers: "",
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
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="urn"
          control={control}
          render={({ field }) => (
            <Field label={t("create_third_party.urn")} {...field} />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Field label={t("create_third_party.name")} {...field} />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Field label={t("create_third_party.description")} {...field} />
          )}
        />
        <Controller
          name="resolver"
          control={control}
          render={({ field }) => (
            <Field label={t("create_third_party.description")} {...field} />
          )}
        />
        <Controller
          name="slots"
          control={control}
          render={({ field }) => (
            <Field
              label={t("create_third_party.slots")}
              type="number"
              {...field}
            />
          )}
        />
        <Controller
          name="managers"
          control={control}
          render={({ field }) => (
            <Field label={t("create_third_party.managers")} {...field} />
          )}
        />
        <Button type="submit" primary disabled={isLoading} loading={isLoading}>
          {t("create_third_party.submit")}
        </Button>
      </form>
    </Page>
  );
};

export default React.memo(CreateThirdParty);
