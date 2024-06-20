import React, { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { default as DCLSignIn } from 'decentraland-dapps/dist/containers/SignInPage'
import { config } from '../../config'
import Page from '../Page'

const SignIn = () => {
  const location = useLocation()
  const handleOnConnect = useCallback(() => {
    const searchParams = new URLSearchParams(location.search)
    const basename = /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/linked-wearables' : ''

    window.location.replace(`${config.get('AUTH_URL')}/login?redirectTo=${basename}${location.pathname}${searchParams}`)
  }, [location.search, location.pathname])

  return (
    <Page>
      <DCLSignIn onConnect={handleOnConnect} />
    </Page>
  )
}

export default React.memo(SignIn)
