//The header component contains the progress bar and the title 

import React from 'react'
import { Typography } from '@material-ui/core'

const Header = ({ progressBar }) => {
  return (
    <div>
      <Typography>
        <h1>Part Of Speech</h1>
        <div className='progress'>
          <progress className='progressBar' value={progressBar} max="100"></progress>
          <span>{progressBar}%</span>
        </div>
      </Typography>
    </div>
  )
}

export default Header