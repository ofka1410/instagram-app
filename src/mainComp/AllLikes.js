import { Button,MenuItem,Menu,Grid,Avatar} from '@material-ui/core'
import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import '../css/like.css'

export default function AllLikes({item}) {
    let history= useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const[like,setLike]=useState('')
    const[numLike,setNumLike]=useState(0)
    const findLikes = async ()=>{
      console.log(item.postContent)
        const res3= await fetch(`http://localhost:9000/like/${item.postContent}`)
        const data3 =await res3.json()
        console.log(data3)
        setLike(data3) 
        setNumLike(data3.length)
        console.log(like)
        

      }
   
      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleClick = (event) => {
        findLikes()
        setAnchorEl(event.currentTarget);
      };

    //   const sendProfile= (el)=>{
    //     console.log(el.username)
    //     localStorage.setItem('searchProfile',el.username)
    //  history.push('./OtherProfile')
    //   //window.location.reload(false)
    // }

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={ handleClick} >All likes</Button>

            <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
            <Grid className='like-warper'>
              <Grid className='num-like'>
       <p>{numLike}</p>
       </Grid>
       {like.length>0?
          <div>
        {like.map(el=>{
          return(
              <Grid  className='how-like'>
          <Grid>
          <Avatar  src={el.profile_user.img}/>
          </Grid>
             <Grid>
             <p>{el.profile_user.personal_name}</p>
             </Grid>
           </Grid>
            )
         })}
             </div>
       :<></>}
       </Grid>
      </Menu>
        </div>
    )
}

