import { LinkedContract, ContractNetwork, Metadata, ThirdParty, ThirdPartyVersion } from './types'

export const parseMetadata = (metadata: string): Pick<Metadata, 'name' | 'description' | 'contracts'> => {
  const [, , name, description, contracts] = metadata.split(':')
  let parsedContracts: LinkedContract[] = []

  if (contracts) {
    parsedContracts = contracts
      .split(';')
      .filter(contract => {
        const [network, address] = contract.split('-')
        const hasValidNetwork = network && Object.values(ContractNetwork).includes(network as ContractNetwork)
        const hasValidAddress = address && isAddress(address)
        return hasValidNetwork && hasValidAddress
      })
      .map(contract => {
        const [network, address] = contract.split('-')
        return { network: network as ContractNetwork, address }
      })
  }

  return { name, description, contracts: parsedContracts }
}

export const buildMetadata = (metadata: Pick<Metadata, 'name' | 'description' | 'contracts'>): string => {
  const contracts = metadata.contracts.map(contract => `${contract.network}-${contract.address}`).join(';')
  return `tp:1:${metadata.name}:${metadata.description}${contracts ? `:${contracts}` : ''}`
}

export const isAddress = (address: string): boolean => /^0x[a-fA-F0-9]{40}$/.test(address)
export const getThirdPartyVersion = (thirdParty: ThirdParty): number =>
  thirdParty.id.split(':')[3] === 'collections-linked-wearables' ? ThirdPartyVersion.V2 : ThirdPartyVersion.V1
