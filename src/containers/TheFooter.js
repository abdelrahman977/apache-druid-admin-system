import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a htarget="_blank" href="https://qeema.net/"  rel="noopener noreferrer">Qeema</a>
        <span className="ml-1">&copy; 2021</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">CoreUI for React</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
