import * as React from 'react'
import classNames from 'classnames'
import { Container } from 'decentraland-ui'
import { Footer } from 'decentraland-dapps/dist/containers'
import { Navbar } from '../Navbar'
import { Props } from './Page.types'

import './Page.css'

const Page: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <>
      <Navbar />
      <div className={classNames('Page', className)}>
        <Container>{children}</Container>
      </div>
      <Footer isFullscreen />
    </>
  )
}

export default React.memo(Page)
