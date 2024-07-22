import { LinkedContract, ThirdParty } from '../../../modules/thirdParty/types'

export type UpdateThirdPartyFormData = {
  name: string
  description: string
  resolver: string
  slots: string
  managers: string[]
  contracts: LinkedContract[]
}

export type Props = {
  thirdParty: ThirdParty
  isUpdating: boolean
  canUpdate: boolean
  isThirdPartyV2Enabled: boolean
  onUpdateThirdParty: (data: UpdateThirdPartyFormData) => void
}

export type MapStateProps = Pick<Props, 'isUpdating' | 'canUpdate' | 'isThirdPartyV2Enabled'>
export type MapDispatchProps = Pick<Props, 'onUpdateThirdParty'>
export type OwnProps = Pick<Props, 'thirdParty'>
