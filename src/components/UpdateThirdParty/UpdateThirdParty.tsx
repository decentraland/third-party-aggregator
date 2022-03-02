import React from "react";
import { Back, Header, Loader } from "decentraland-ui";
import { t } from "decentraland-dapps/dist/modules/translation/utils";
import { Link } from "react-router-dom";
import Page from "../Page";
import { Props } from "./UpdateThirdParty.types";
import { locations } from "../../modules/locations";
import UpdateThirdPartyForm from "./UpdateThirdPartyForm";
import "./UpdateThirdParty.css";

const UpdateThirdParty = ({ isFetching, thirdParty }: Props) => (
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
      <UpdateThirdPartyForm thirdParty={thirdParty!} />
    )}
  </Page>
);

export default React.memo(UpdateThirdParty);
