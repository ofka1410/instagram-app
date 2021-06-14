import React,{useEffect,useState,Component} from 'react'
import {Grid,Avatar} from '@material-ui/core';
import '../css/story.css'
import Stories from 'react-insta-stories';

export default function ShowStory({updateStory,setUpdateStory}) {
    const [allStories, setAllStories]=useState([])
    const[userStory,setUserStory]=useState([])
    const[contents,setContents]=useState([])
    useEffect(async() => {
        const res2 = await fetch(`http://localhost:9000/addStory`)
        const data2 = await res2.json()
        setAllStories(data2) 
      },[updateStory])

      const stories=async(item)=>{
        
        const res = await fetch(`http://localhost:9000/watchStory/${item.profile_user.id}`)
        const data = await res.json()
        setUserStory(data.urls)
        setContents(data.contents)
        console.log(contents)
      }
      const App = () => {
        return (
            <Stories
                stories={userStory}
                header={contents}
                defaultInterval={4000}
                width={632}
                height={568}
                onAllStoriesEnd={finishStory}
            />
        );
    };

    const finishStory= ()=>{
        setUserStory("")
        setContents('') 
    }
    return (
        <div onClick={finishStory} className='story-warper'>
         {allStories.map(item=>{
             return(
                 <Grid className='avatar-warper'>
         <Avatar onClick={()=>stories(item)} src={item.profile_user.img} className='story-pic'></Avatar>
                 </Grid>
             )
         })}
         {userStory.length>0?
         (<div  className='story-box'>{App()}</div>)
        :<></>}  
        </div>
    )
}
