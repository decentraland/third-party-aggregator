import { LinkedContract } from '../../modules/thirdParty/types'

export type Props = {
  contracts: LinkedContract[]
  error?: boolean
  message?: string
}
