import { LinkedContract } from '../../modules/thirdParty/types'

export type Props = {
  onChange: (value: LinkedContract) => void
  disabled?: boolean
}
