import React from "react";
import { Back, Button, Field, Header } from "decentraland-ui";
import { t } from "decentraland-dapps/dist/modules/translation/utils";
import { Link } from "react-router-dom";
import Page from "../Page";
import { Props } from "./CreateThirdParty.types";
import { locations } from "../../modules/locations";

import "./CreateThirdParty.css";
import { Controller, useForm } from "react-hook-form";

const CreateThirdParty = ({}: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      urn: "",
      name: "",
      description: "",
      slots: "",
      managers: "",
    },
  });

  const onSubmit = (data: any) => console.log(data);

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
        <Button type="submit" primary>{t("create_third_party.submit")}</Button>
      </form>
    </Page>
  );
};

export default React.memo(CreateThirdParty);
