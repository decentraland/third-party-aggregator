import React, { useCallback, useMemo } from 'react'
import { Button, Dropdown, DropdownProps, Header, Loader, Popup, Table } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Link } from 'react-router-dom'
import Page from '../Page'
import { Props } from './ThirdParties.types'
import { locations } from '../../modules/locations'
import './ThirdParties.css'
import { getThirdPartyVersion } from '../../modules/thirdParty/utils'

enum TABLE_FILTER {
  ALL = 1,
  MANAGED_BY_ME = 2
}

const ThirdParties = ({ thirdParties, isLoading, isAggregator, userAddress }: Props) => {
  const [tableFilter, setTableFilter] = React.useState(TABLE_FILTER.ALL)
  const handleFilterChange = useCallback(
    (_e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => setTableFilter(data.value as TABLE_FILTER),
    []
  )
  const tableFilterOptions = useMemo(
    () =>
      userAddress
        ? [
            { text: 'All', value: TABLE_FILTER.ALL },
            { text: 'Managed by me', value: TABLE_FILTER.MANAGED_BY_ME }
          ]
        : [{ text: 'All', value: TABLE_FILTER.ALL }],
    [userAddress]
  )
  const thirdPartiesList = useMemo(
    () =>
      tableFilter === TABLE_FILTER.ALL ? thirdParties : userAddress ? thirdParties.filter(tp => tp.managers.includes(userAddress)) : [],
    [tableFilter, userAddress, thirdParties]
  )

  return (
    <Page className="ThirdParties">
      <div className="page-title">
        <Header size="huge">{t('third_parties.header')}</Header>
        {isAggregator && (
          <Link to={locations.createThirdParty()}>
            <Button primary>{t('third_parties.create_button')}</Button>
          </Link>
        )}
      </div>
      {isLoading ? (
        <Loader active size="big" />
      ) : (
        <>
          <div className="contentHeader">
            <Dropdown direction="left" value={tableFilter} options={tableFilterOptions} onChange={handleFilterChange} />
          </div>
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{t('third_parties.name')}</Table.HeaderCell>
                <Table.HeaderCell>{t('third_parties.max_items')}</Table.HeaderCell>
                <Table.HeaderCell>{t('third_parties.consumed_slots')}</Table.HeaderCell>
                <Table.HeaderCell>{t('third_parties.version')}</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {thirdPartiesList.map(tp => (
                <Table.Row key={tp.id}>
                  <Table.Cell>{tp.metadata.name}</Table.Cell>
                  <Table.Cell>{tp.maxItems}</Table.Cell>
                  <Table.Cell>{tp.consumedSlots}</Table.Cell>
                  <Table.Cell>v{getThirdPartyVersion(tp)}</Table.Cell>
                  <Table.Cell textAlign="right">
                    <Popup
                      content={t('third_parties.details')}
                      trigger={
                        <Link to={locations.thirdPartyDetails(tp.id)}>
                          <Button size="big" icon="arrow right" basic></Button>
                        </Link>
                      }
                    ></Popup>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      )}
    </Page>
  )
}

export default React.memo(ThirdParties)
