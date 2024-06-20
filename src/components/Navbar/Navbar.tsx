import React, { useCallback } from 'react'
import { Navbar as BaseNavbar } from 'decentraland-dapps/dist/containers'
import { useHistory, useLocation } from 'react-router-dom'

import { locations } from '../../modules/locations'
import { Props } from './Navbar.types'
import './Navbar.css'

const Navbar = (props: Props) => {
  const navigate = useHistory()
  const location = useLocation()

  const handleOnSignIn = useCallback(() => {
    if (location.pathname !== locations.signIn()) {
      navigate.push(locations.signIn())
    }
  }, [navigate, location.pathname])

  return <BaseNavbar {...props} onSignIn={handleOnSignIn} />
}

export default React.memo(Navbar)
