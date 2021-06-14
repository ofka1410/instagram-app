import React,{useEffect,useState} from 'react'
import { Avatar,Grid } from '@material-ui/core';
import '../css/home.css'
import Followers from './Followers'
import {useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function HomeSuggest() {
    const followers =useSelector(state=>state.followAction)
  const [profile,setProfile]=useState([])
  const user= (localStorage.getItem('userNow'))
  let history= useHistory()
  useEffect(async() => {
        const res = await fetch("http://localhost:9000/usersInformaition")
        let data = await res.json()
data= data.filter(item=>item.user.username !==user)
if(data.length<=10){
    setProfile(data)
}
else{
    const newdata= data.splice(0,4)
        setProfile(newdata)
}   
  },[])

  const sendProfile= (item)=>{
    console.log(item)
    localStorage.setItem('searchProfile',item.user.username)
  history.push('./OtherProfile')
  //window.location.reload(false)
}

    return (
   <div>
       <div>
       <h4 className='suggest-header'>Suggestions For You</h4>
       </div>
    
{profile.map(item=>{
    return(
        <div className='all-suggest'>
          <Grid  onClick={() => sendProfile(item)} className='suggest-warper'>
              <Grid>
                  <div>
                  <Avatar alt="Remy Sharp" src={item.img}/>
                  </div>
              </Grid>
         <Grid>
             <div className='item-warper'>
             <p>{item.user.username}</p>
             </div>
         </Grid>
         <Grid>
            <div className='follow-warper'>
                
             </div>
         </Grid>
          </Grid>
          
        </div>
    )
})}
   </div>
    )
}
