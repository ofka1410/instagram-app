import React from 'react'
import LogIn from './Login'
import LogUp from './LogUp'
import '../css/Log.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,} from "react-router-dom";
  
export default function Loged({setToken,token}) {
    return (
        <Router>
        <div>
<Switch>
<Route
  path='/LogUp'>
<LogUp
/>
  </Route>
  <Route
  path='/'>
<LogIn
setToken={setToken}
token={token}
/>
</Route>
    </Switch>    
        </div>
        </Router>  
    )
}