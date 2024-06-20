import { Dispatch } from 'redux'

export type Props = {
  isConnected: boolean
  isConnecting: boolean
}
export type MapStateProps = Pick<Props, 'isConnected' | 'isConnecting'>

export type MapDispatchProps = Props
export type MapDispatch = Dispatch
