import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import ShowFollowers from './ShowFollowers'
import ShowFollowing from './ShowFollowing'
import '../css/profile.css'

export default function OthersFollowersData({userPosts,user}) {
    const [followers,setFollowers]= useState([])
    const [following,setFollowing] = useState([])
   
    useEffect(async() => {
        const res3= await fetch(`http://localhost:9000/following/${user}`)
        const data3 =await res3.json()
        setFollowers(data3)
        const res2= await fetch(`http://localhost:9000/follow/${user}`)
        const data2 =await res2.json()
        setFollowing(data2)
 
    }, [])
    
    return (
        <div className='stats'>
            <div className='stats-warper'>
            <ShowFollowing
            following={following}
            />
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

