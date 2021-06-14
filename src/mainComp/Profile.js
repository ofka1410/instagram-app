import '../css/profile.css'
import React, {useState,useEffect} from 'react'
import { Container,} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import PostGallery from  './PostGallery'
import EditProfile from './EditProfile'
import FollowerData from './FollowerData'

export default function Profile() {
    const user= (localStorage.getItem('userNow'))
   const [userPosts,setUserPosts]=useState([])
   const [url,setUrl]=useState("https://www.seekpng.com/png/detail/297-2978586_rono-daniel-empty-profile-picture-icon.png")
   const [person,setPerson]=useState("")
    console.log(user)


    useEffect(async() => {
        const res = await fetch(`http://localhost:9000/myPosts/${user}`)
        const data = await res.json()
        console.log(data) 
        setUserPosts(data)
       
        const res2 = await fetch(`http://localhost:9000/details/${user}`)
        const data2 = await res2.json()
        console.log(data2)
        setUrl(data2.img)
        setPerson(data2.personal_name)
        
      },[])
     
    return (
        <Container style={{marginTop:'100px'}}>
        <div>
<Grid className='profile-warper'>
    <Grid style={{marginLeft:'25%'}} >
<img className='profile_pic' src={url} alt=''/>
    </Grid>
    <Grid className='profile-warper' style={{marginRight:'10%'}}>
        <div>
<Typography className='user-header'
variant='p'>
    {user}
</Typography>

<div>
<Typography className='user-header'
variant='p'>
    {person}
</Typography>
<Grid>
    <FollowerData
    user={user}
    userPosts={userPosts}/>
    </Grid>
</div>
</div>

<div>
    <div>
    <EditProfile/>
    </div>
    
</div>

    </Grid>
  

</Grid>

 <Grid container spacing={2} className='profile-warper'>
  {userPosts.slice(0).reverse().map(item=>{
      return(
       <PostGallery
       item={item}/>
              )
          })}
         </Grid>   
        </div>
        </Container>
    )
}
