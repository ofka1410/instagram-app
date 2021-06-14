import React from 'react'
import {Button} from '@material-ui/core';

     export default function AddStory({image,content,setUpdateStory}) {
  const user= (localStorage.getItem('userNow'))
  const postStory= async()=>{
    const res2 = await fetch("http://localhost:9000/addStory",
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                username: user,
               url:image,
                content:content
            }
            )
    }
    )
    setUpdateStory('ok')
  }
    return (
        <div>
        <Button onClick={postStory} style={{background:'blue',color:'white'}} variant='outlined'>post</Button>
        </div>
    )
}
