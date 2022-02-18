import React from "react";
import { Header, Loader } from "decentraland-ui";
import { t } from "decentraland-dapps/dist/modules/translation/utils";
import Page from "../Page";
import { Props } from "./ThirdParties.types";
import { useEffect } from "react";

const ThirdParties = ({
  thirdParties,
  isLoading,
  onFetchThirdParties,
}: Props) => {
  useEffect(() => {
    onFetchThirdParties();
  }, [onFetchThirdParties]);

  return (
    <Page>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header size="huge">{t("third_parties.header")}</Header>
          {thirdParties.map((tp) => (
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
          ))}
        </>
      )}
    </Page>
  );
};

export default React.memo(ThirdParties);
