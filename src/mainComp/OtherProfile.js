import React, {useState,useEffect} from 'react'
import PostGallery from  './PostGallery'
import { Container,} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Followers from "./Followers"
import OthersFollowersData from './OtherFollowersData'

export default function OtherProfile(item) {
    const [ifFollower,setIfFollower]=useState('Follow')
    const user = localStorage.getItem('searchProfile')
    const [userPosts,setUserPosts]=useState([])
    const [url,setUrl]=useState("https://www.seekpng.com/png/detail/297-2978586_rono-daniel-empty-profile-picture-icon.png")
    const [person,setPerson]=useState("")
   
     useEffect(async() => {
        const res = await fetch(`http://localhost:9000/myPosts/${user}`)
        const data = await res.json()
        setUserPosts(data)
       
        const res2 = await fetch(`http://localhost:9000/details/${user}`)
        const data2 = await res2.json()
        setUrl(data2.img)
        setPerson(data2.personal_name)
    
      },[])

    return (
        <div>
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
    <OthersFollowersData
    user={user}
    userPosts={userPosts}/>
    </Grid>
</div>
</div>

<Followers
        item={user}
        ifFollower={ifFollower}
        setIfFollower={setIfFollower}/>

<div>
</div>
    </Grid>
</Grid>
 <Grid style={{marginBottom:'20px'}} container spacing={2} className='profile-warper'>
  {userPosts.slice(0).reverse().map(item=>{
      return(
       <PostGallery
       item={item}/>
              )
          })}
         </Grid>   
        </div>
        </Container>  
        </div>
    )
}
