import { ThirdParty } from '../../modules/thirdParty/types'

export type Props = {
  thirdParties: ThirdParty[]
  isAggregator: boolean
  userAddress: string | undefined
  isLoading: boolean
}

export type MapStateProps = Pick<Props, 'thirdParties' | 'isLoading' | 'isAggregator' | 'userAddress'>
