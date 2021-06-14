import React,{useState,useEffect} from 'react'
import {IconButton,TextField,Button} from '@material-ui/core';
import Like from './Like'
import ShowComments from './ShowComments'
import '../css/commentLike.css'
import AllLikes from './AllLikes'



export default function Comment({item,userLike}) {
      const user= (localStorage.getItem('userNow'))
    const [comment,setComment]= useState('')
const [allComments,setAllComments]= useState([])

const commentAdder = async()=>{

const res2 = await fetch("http://localhost:9000/newComment",
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
             username:user,
             content: comment,
             contentPost: item.postContent
            }
            )
    }
    )
}

    return (
        <div style={{width:"100%"}}>
            <div>

             <IconButton>
                 <Like
                 userLike={userLike}
                 item={item}/>
             </IconButton>
            <IconButton  aria-label="add to favorites">
                <ShowComments
                item={item}/>
        </IconButton>
        <AllLikes
      item={item}/> 
            </div>
           <div className='input-warper'>
             <TextField 
             placeholder='Add comment:' 
             className='comment-input'
             variant='standard'
             onChange={(e)=>{setComment(e.target.value)}}
             >
             </TextField>
             <Button onClick={commentAdder}>Post</Button>
           </div>
        </div>
        
    )
}
