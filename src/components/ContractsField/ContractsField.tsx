import React, { useCallback, useMemo, useState } from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation'
import { Button, DropdownProps, Field, InputOnChangeData, SelectField } from 'decentraland-ui'
import { Props } from './ContractsField.types'
import styles from './ContractsField.module.css'
import { ContractNetwork, LinkedContract, TEST_NETWORKS } from '../../modules/thirdParty/types'
import { isAddress } from '../../modules/thirdParty/utils'
import { isDevelopment } from '../../lib/environment'

export const ContractsField = (props: Props) => {
  const { onChange, disabled } = props
  const [address, setAddress] = useState<string>()
  const [network, setNetwork] = useState(ContractNetwork.ETHEREUM_MAINNET)
  const [contractError, setContractError] = useState<string>()

  const networkOptions = useMemo(
    () =>
      Object.values(ContractNetwork)
        .filter(network => isDevelopment || !TEST_NETWORKS.includes(network))
        .map(value => ({ value, text: t(`contract_network.${value}`) })),
    []
  )

  const handleAdd = useCallback(() => {
    console.log('Adding contract', address, network)
    onChange({ address, network } as LinkedContract)
    console.log('Contract added')
    setAddress('')
    setNetwork(ContractNetwork.ETHEREUM_MAINNET)
  }, [onChange, address, network])

  const handleChangeNetwork = useCallback(
    (_e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
      setNetwork(data.value as ContractNetwork)
    },
    [setNetwork]
  )

  const handleChangeContract = useCallback(
    (_e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      setContractError(undefined)
      setAddress(data.value)
      if (!isAddress(data.value)) {
        setContractError(t('linked_contracts.required_address'))
      }
    },
    [setAddress]
  )

  return (
    <div className={styles.contractsField}>
      <SelectField options={networkOptions} disabled={disabled} value={network} onChange={handleChangeNetwork} />
      <Field value={address} disabled={disabled} onChange={handleChangeContract} maxLength={42} type="address" />
      <Button disabled={!!contractError || !address || disabled} onClick={handleAdd}>
        {t('linked_contracts.add_contract')}
      </Button>
    </div>
  )
}
