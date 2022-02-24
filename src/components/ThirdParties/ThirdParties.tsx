import React, { useEffect } from "react";
import { Button, Header, Loader } from "decentraland-ui";
import { t } from "decentraland-dapps/dist/modules/translation/utils";
import { Link } from "react-router-dom";
import Page from "../Page";
import { Props } from "./ThirdParties.types";
import { locations } from "../../modules/locations";

import "./ThirdParties.css";

const ThirdParties = ({
  thirdParties,
  isLoading,
  onFetchThirdParties,
}: Props) => {
  useEffect(() => {
    onFetchThirdParties();
  }, [onFetchThirdParties]);

  return (
    <Page className="ThirdParties">
      <div className="page-title">
        <Header size="huge">{t("third_parties.header")}</Header>
        <Link to={locations.createThirdParty()}>
          <Button primary>{t("third_parties.create_button")}</Button>
        </Link>
      </div>
      {isLoading ? (
        <Loader active size="big" />
      ) : (
        thirdParties.map((tp) => (
          <div key={tp.id}>
            <div>
              <b>{tp.id}</b>
            </div>
            <div>Raw Metadata: {tp.rawMetadata}</div>
            <div>Consumed Slots: {tp.consumedSlots}</div>
            <div>Approved: {tp.isApproved.toString()}</div>
            <div>Managers:</div>
            <ul>
              {tp.managers.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </Page>
  );
};

export default React.memo(ThirdParties);
