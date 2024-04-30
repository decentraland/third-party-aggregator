import React, { useCallback } from 'react'
import { Navbar as BaseNavbar } from 'decentraland-ui/dist/components/Navbar/Navbar'

import { locations } from '../../modules/locations'
import { Props } from './Navbar.types'
import './Navbar.css'

const Navbar = (props: Props) => {
  const { pathname, onNavigate } = props

  const handleOnSignIn = useCallback(() => {
    onNavigate(locations.signIn())
  }, [onNavigate])

  const handleOnClickAccount = useCallback(() => {
    onNavigate(locations.settings())
  }, [onNavigate])

  return (
    <BaseNavbar
      {...props}
      isSignedIn={props.isConnected}
      isFullscreen={props.isFullscreen}
      isSignIn={pathname === locations.signIn()}
      onSignIn={handleOnSignIn}
      onClickAccount={handleOnClickAccount}
    />
  )
}

export default React.memo(Navbar)
