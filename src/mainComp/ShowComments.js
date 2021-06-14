import React,{useState,useEffect} from 'react'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {IconButton,Menu,MenuItem} from '@material-ui/core';
import { Avatar,Grid } from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import '../css/Comments.css'
export default function ShowComments({item}) {
    let history= useHistory()
const [Comment,setComment]=useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
const [img,setImge]=useState('')
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    getComments()
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const  getComments = async()=>{
        console.log(item.postContent)
    const res = await fetch(`http://localhost:9000/uniqecomments/${item.postContent}`)
   const data= await res.json()
   console.log(data.work)
   setComment(data.array)
  setImge(item.img)
}

const sendProfile= (el)=>{
    console.log(el.username)
    localStorage.setItem('searchProfile',el.username)
 history.push('./OtherProfile')
}
    return (
        <div>
            
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <span></span>
            <ChatBubbleOutlineIcon/>  
            </IconButton>

            <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
            
     <div>
     <Grid className='comments-warper'>
     <Grid className='photo'>
<img  className='post-img' src={img}/>
            </Grid>
            <Grid className='commet-coloums'>
                
{Comment.map(el=>{
    return(   
       
    <Grid className='comment'>
        <Grid>
    <Avatar className='commentAvatar' alt="Remy Sharp" 
     src={el.profile_user.img}
    onClick={() => sendProfile(el)}/>
    </Grid>
    <Grid>
    <p className='theComment'>{el.comment}</p> 
    <p className='comment-time'>{el.updatedAt}</p>
    </Grid>
     </Grid>
   
    )
})}
  </Grid>
 </Grid>
     </div>
      </Menu>
        </div>
    )
}
