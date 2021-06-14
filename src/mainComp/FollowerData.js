import { Button } from '@material-ui/core'
import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import ShowFollowers from './ShowFollowers'
import ShowFollowing from './ShowFollowing'
import '../css/profile.css'

export default function FollowerData({userPosts}) {
    const [followers,setFollowers]= useState([])
    const following =useSelector(state=>state.followAction)
    const user= (localStorage.getItem('userNow'))
    useEffect(async() => {
        const res3= await fetch(`http://localhost:9000/following/${user}`)
        const data3 =await res3.json()
        console.log(followers)
 setFollowers(data3)
    }, [])
    console.log(userPosts)
    return (
        <div className='stats'>
            <div className='stats-warper'>
            <ShowFollowing
            following={following}/>
            </div>
            <div className='stats-warper'>
            <ShowFollowers
            followers={followers}/>
            </div>
            <div className='stats-warper'>
                <p><span className='follow-span'>{userPosts.length}</span>posts</p>
            </div>
        

        </div>
    )
}

