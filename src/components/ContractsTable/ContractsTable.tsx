import React from 'react'
import { Button, Icon, Message, Table } from 'decentraland-ui'
import { Props } from './ContractsTable.types'
import { t } from 'decentraland-dapps/dist/modules/translation'

export const ContractsTable = ({ contracts, message, error, disabled, onDelete }: Props) => {
  return (
    <>
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>{t('linked_contracts.network')}</Table.HeaderCell>
            <Table.HeaderCell>{t('linked_contracts.address')}</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {contracts.length === 0 ? (
            <Table.Row>
              <Table.Cell>{t('linked_contracts.no_contracts')}</Table.Cell>
            </Table.Row>
          ) : (
            contracts.map(({ network, address }, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index}</Table.Cell>
                <Table.Cell>{network}</Table.Cell>
                <Table.Cell>{address}</Table.Cell>
                <Table.Cell>
                  <Button size="small" disabled={disabled} onClick={() => onDelete({ network, address })}>
                    <Icon name="trash" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
      {message && error && <Message error={error} content={message} />}
    </>
  )
}
