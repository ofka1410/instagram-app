import React from 'react'
import '../css/edditForm.css'
import { Button,TextField } from '@material-ui/core';
export default function SaveDetails({url,PersonalName,newPassword,password}) {
    const user= (localStorage.getItem('userNow'))
    const saveHandler= async()=>{
        const res2 = await fetch("http://localhost:9000/details",
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
            img:url,
            PersonalName:PersonalName,
            newPassword:newPassword,
            oldPassword:password,
            username:user
            })}
    )}

    return (
        <div>
           <Button onClick={saveHandler} className='save-bt' variant='outlined'>Save</Button> 
        </div>
    )
}
