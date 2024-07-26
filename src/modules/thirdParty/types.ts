import { LoadingState } from 'decentraland-dapps/dist/modules/loading'

export type ThirdParty = {
  id: string
  managers: string[]
  rawMetadata: string
  resolver: string | null
  isApproved: boolean
  maxItems: string
  root: string
  consumedSlots: string
  metadata: Metadata
}

export type GraphThirdParty = {
  id: string
  managers: string[]
  rawMetadata: string
  resolver: string
  isApproved: boolean
  maxItems: string
  root: string
  consumedSlots: string
  metadata: {
    thirdParty: Metadata
  }
}

export type ThirdPartyState = {
  data: { thirdParties: Record<string, ThirdParty>; aggregatorAddress: string }
  loading: LoadingState
  error: string | null
}

export type GraphRegistryData = {
  aggregatorAddress: string
}

export enum ContractNetwork {
  ETHEREUM_MAINNET = 'mainnet',
  MATIC_MAINNET = 'matic',
  ETHEREUM_SEPOLIA = 'sepolia',
  MATIC_AMOY = 'amoy'
}

export const TEST_NETWORKS = [ContractNetwork.ETHEREUM_SEPOLIA, ContractNetwork.MATIC_AMOY]

export type LinkedContract = {
  network: ContractNetwork
  address: string
}

export type Metadata = {
  id: string
  name: string
  description: string
  contracts: LinkedContract[]
}

export type CreateThirdParty = {
  urn: string
  metadata: string
  resolver: string
  managers: string[]
  contracts: LinkedContract[]
  slots: string
}

export type UpdateThirdParty = {
  urn: string
  metadata: string
  resolver: string
  managers: string[]
  managerValues: boolean[]
  slots: string
}
