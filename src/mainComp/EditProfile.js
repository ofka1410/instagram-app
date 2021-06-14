import React from 'react'
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import {useHistory} from 'react-router-dom'
export default function EditProfile() {
    let history= useHistory()
    const eddit =()=>{
        history.push('./EdditForm')
    }
   
    return (
        <div>
          <Button variant='outlined'
          onClick={eddit}
          >Edit Profile
          <SettingsIcon/></Button>  
        </div>
    )
}
