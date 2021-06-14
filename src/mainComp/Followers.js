import React,{useState,useEffect} from 'react'
import { Button } from '@material-ui/core';
import '../css/home.css'
import { useSelector } from 'react-redux'

export default function Followers({item,ifFollower,setIfFollower}) {
    const user= (localStorage.getItem('userNow'))
    const follow= async()=>{
        const res2 = await fetch("http://localhost:9000/followers",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                 username:user,
                userFollow: item,
                }
                )
        }
        )
  const data2 = await res2.json()
  console.log(data2)
  setIfFollower(data2.status)
        
    }
    return (
        <div>
            <Button  
           variant='outlined'
            onClick={follow} 
            className='follow'>
                {ifFollower}
                </Button>
        </div>
    )
}
