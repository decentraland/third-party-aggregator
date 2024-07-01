import { ContractNetwork } from '../../modules/thirdParty/types'

export const RPC_URLS = {
  [ContractNetwork.ETHEREUM_MAINNET]: 'https://rpc.decentraland.org/mainnet',
  [ContractNetwork.MATIC_MAINNET]: 'https://rpc.decentraland.org/polygon',
  [ContractNetwork.ETHEREUM_SEPOLIA]: 'https://rpc.decentraland.org/sepolia',
  [ContractNetwork.MATIC_AMOY]: 'https://rpc.decentraland.org/amoy'
}
