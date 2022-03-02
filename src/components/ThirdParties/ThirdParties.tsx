import React from "react";
import { Button, Header, Loader, Popup, Table } from "decentraland-ui";
import { t } from "decentraland-dapps/dist/modules/translation/utils";
import { Link } from "react-router-dom";
import Page from "../Page";
import { Props } from "./ThirdParties.types";
import { locations } from "../../modules/locations";

import "./ThirdParties.css";

const ThirdParties = ({ thirdParties, isLoading }: Props) => {
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
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{t("third_parties.name")}</Table.HeaderCell>
              <Table.HeaderCell>
                {t("third_parties.max_items")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t("third_parties.consumed_slots")}
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {thirdParties.map((tp) => (
              <Table.Row key={tp.id}>
                <Table.Cell>{tp.metadata.name}</Table.Cell>
                <Table.Cell>{tp.maxItems}</Table.Cell>
                <Table.Cell>{tp.consumedSlots}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Popup
                    content={t("third_parties.edit")}
                    trigger={
                      <Link to={locations.updateThirdParty(tp.id)}>
                        <Button icon="edit" basic></Button>
                      </Link>
                    }
                  ></Popup>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Page>
  );
};

export default React.memo(ThirdParties);
