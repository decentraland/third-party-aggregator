import { LinkedContract } from '../../modules/thirdParty/types'

export type Props = {
  contracts: LinkedContract[]
  onDelete: (contract: LinkedContract) => void
  disabled?: boolean
  error?: boolean
  message?: string
}
