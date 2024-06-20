import React, { useCallback } from 'react'
import { Navbar as BaseNavbar } from 'decentraland-dapps/dist/containers'

import { locations } from '../../modules/locations'
import { Props } from './Navbar.types'
import './Navbar.css'

const Navbar = (props: Props) => {
  const { pathname, onNavigate } = props

  const handleOnSignIn = useCallback(() => {
    onNavigate(locations.signIn())
  }, [onNavigate])

  return (
    <BaseNavbar {...props} isSignedIn={props.isConnected} isSigningIn={pathname === locations.signIn()} onClickSignIn={handleOnSignIn} />
  )
}

export default React.memo(Navbar)
