import React from 'react'
import {useHistory} from 'react-router-dom'
export default function LogOut({setToken,token}) {
  console.log(token)
  let history= useHistory()
   localStorage.clear()
    
  setToken("")
  history.push('./Loged')

    return (
        <div>
          <h1>Logout</h1>
        </div>
    )
}
