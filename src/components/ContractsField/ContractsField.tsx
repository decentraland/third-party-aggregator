import { providers, Contract } from 'ethers'
import React, { useCallback, useMemo, useState } from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation'
import { Button, DropdownProps, Field, InputOnChangeData, SelectField } from 'decentraland-ui'
import { ContractNetwork, LinkedContract, TEST_NETWORKS } from '../../modules/thirdParty/types'
import { isAddress } from '../../modules/thirdParty/utils'
import { debounce } from '../../lib/time'
import { isDevelopment } from '../../lib/environment'
import { RPC_URLS } from './utils'
import { Props } from './ContractsField.types'
import styles from './ContractsField.module.css'

export const ContractsField = (props: Props) => {
  const { onChange, disabled } = props
  const [address, setAddress] = useState<string>()
  const [network, setNetwork] = useState(ContractNetwork.ETHEREUM_MAINNET)
  const [contractError, setContractError] = useState<string>()
  const [isCheckingContract, setIsCheckingContract] = useState(false)

  const validateContract = useCallback(
    debounce(async (contractAddress: string, network: ContractNetwork) => {
      setIsCheckingContract(true)
      setContractError(undefined)
      const jsonRpcProvider = new providers.JsonRpcProvider(RPC_URLS[network])
      const erc165Contract = new Contract(
        contractAddress,
        ['function supportsInterface(bytes4) external view returns (bool)'],
        jsonRpcProvider
      )
      const Erc721InterfaceId = '0x01ffc9a7'
      const Erc1155InterfaceId = '0xd9b67a26'
      try {
        const supportsInterfaces = await Promise.all([
          erc165Contract.supportsInterface(Erc721InterfaceId),
          erc165Contract.supportsInterface(Erc1155InterfaceId)
        ])
        if (!supportsInterfaces.some(supportsInterface => supportsInterface)) {
          setContractError(
            'The contract is not based on the ERC721 or the ERC1155 standard. Please, check if the network or the contract address is correct.'
          )
        }
      } catch (error) {
        setContractError('There was an error checking the contract. The contract might not exist or the connection might be down.')
        console.error(error)
      } finally {
        setIsCheckingContract(false)
      }
    }, 1000),
    [setIsCheckingContract, setContractError]
  )

  const networkOptions = useMemo(
    () =>
      Object.values(ContractNetwork)
        .filter(network => isDevelopment || !TEST_NETWORKS.includes(network))
        .map(value => ({ value, text: t(`contract_network.${value}`) })),
    []
  )

  const handleAdd = useCallback(() => {
    onChange({ address: address?.toLowerCase(), network } as LinkedContract)
    setAddress('')
    setNetwork(ContractNetwork.ETHEREUM_MAINNET)
  }, [onChange, address, network])

  const handleChangeNetwork = useCallback(
    (_e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
      setNetwork(data.value as ContractNetwork)
      if (address && isAddress(address)) {
        validateContract(address, data.value)
      }
    },
    [setNetwork, validateContract, address]
  )

  const handleChangeContract = useCallback(
    (_e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      setAddress(data.value)
      if (!isAddress(data.value)) {
        return setContractError(t('linked_contracts.required_address'))
      }
      validateContract(data.value, network)
    },
    [setAddress, validateContract, network]
  )

  return (
    <div className={styles.contractsField}>
      <SelectField
        options={networkOptions}
        disabled={disabled || isCheckingContract}
        value={network}
        loading={isCheckingContract}
        onChange={handleChangeNetwork}
      />
      <Field
        value={address}
        disabled={disabled || isCheckingContract}
        onChange={handleChangeContract}
        loading={isCheckingContract}
        maxLength={42}
        message={contractError}
        error={!!contractError}
      />
      <Button disabled={!!contractError || !address || disabled || isCheckingContract} onClick={handleAdd}>
        {t('linked_contracts.add_contract')}
      </Button>
    </div>
  )
}
