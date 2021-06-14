import React,{useState,useEffect} from 'react'
import { Grid,FormControl,TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import '../css/edditForm.css'
import ChangePro from './ChangePro'
import SaveDetails from './SaveDetails';
export default function EdditForm() {
    const [url, setUrl] =useState('');
const [PersonalName,setPersonalName]=useState('')
const [newPassword,setNewPassword]=useState('')
const [password,setPassword]=useState('')
    const user= (localStorage.getItem('userNow'))

useEffect(async() => {
    const res2 = await fetch(`http://localhost:9000/details/${user}`)
    const data2 = await res2.json()
    console.log(data2)
    setUrl(data2.img)
    setPersonalName(data2.Personal_name)
}, [])


    return (
        <div style={{marginTop:'100px'}} className='edit-block'>
      <Grid className='change-warper'>
    <Grid xs='3'>
<img  className='profilePic' 
src={url} alt=''/>
    </Grid>
    <Grid xs='4' className='user-changePro'>
        <div>
        <h3 className='username'>{user}</h3>
        </div>
<div>
<ChangePro
url={url}
setUrl={setUrl}/>
</div>

    </Grid>
      </Grid>
 <div style={{marginTop:'20px'}}>
    <FormControl>
<div>
<TextField
onChange={(e)=>{setPersonalName(e.target.value)}}
className='setting-input'
variant='outlined'
value={PersonalName}
type='text'>

</TextField>
<div>
    <p className='subttails'>
    Help people discover your account by using<br/>
     the name you'reknown by: either your  full name
     <br/>
     , nickname, or business name. You can 
     <br/>
only change your name twice within 14 days.  
    </p>
</div>
</div>
<div>
<TextField
type='password'
variant='outlined'
placeholder='ypur password:'
className='setting-input'
onChange={(e)=>{setPassword(e.target.value)}}>

</TextField>
<TextField
type='password'
variant='outlined'
placeholder='new password:'
className='setting-input'
onChange={(e)=>{setNewPassword(e.target.value)}}>

</TextField>
<div>
    <p className='subttails'>
   Change your password for stronger secuirity
    </p>
</div>
<div>
    <SaveDetails
    url={url}
    PersonalName={PersonalName}
   newPassword={newPassword}
   password={password}/>
</div>
</div>
    </FormControl>
 </div>
        </div>
    )
}
