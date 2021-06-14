import React,{useState,useEffect} from 'react'
import Profile from './Profile'
import LogOut from './LogOut'
import SearchUsers from './SearchUsers'
import HomePage from './HomePage'
import NavBar from './NavBar'
import EdditForm from './EdditForm'
import OtherProfile from "./OtherProfile"
import AddStory from './AddStory'
import{useSelector,useDispatch} from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,} from "react-router-dom";

  
export default function Main({setToken,token}) {
    const dispatch= useDispatch()
    const user= (localStorage.getItem('userNow'))
    const[updateStory,setUpdateStory]=useState('')
       
    useEffect(async() => {
        const res3= await fetch(`http://localhost:9000/follow/${user}`)
        const data3 =await res3.json()
        dispatch({type:'FIND_FOLLOWERS', payload:data3})
     
    }, [])
    console.log(token)
    return (
      <div>

<Router>

        <div>
        <NavBar
        updateStory={updateStory}
        setUpdateStory={setUpdateStory}/>
        </div>

<Switch>
    <Route path='/LogOut'>
<LogOut
token={token}
setToken={setToken}/>
    </Route>
    <Route path='/OtherProfile'>
<OtherProfile
/>
    </Route>
    <Route path='/EdditForm'>
<EdditForm
/>
    </Route>

    <Route path='/Profile'>
<Profile

setToken={setToken}/>
    </Route>

    <Route path='/AddStory'>
<AddStory
setToken={setToken}/>
    </Route>

    <Route path='/SearchUsers'>
<SearchUsers

setToken={setToken}/>
    </Route>
    <Route path='/'>
<HomePage
 updateStory={updateStory}
 setUpdateStory={setUpdateStory}
/>
    </Route>

</Switch>
        </Router>
      </div>
    )
}
