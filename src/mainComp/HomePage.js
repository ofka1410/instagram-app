import React, {useState,useEffect} from 'react'
import { IconButton,
  Container,grid, TextField,Button} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import '../css/home.css'
import MediaCard from './MediaCard'
import HomeSuggest from './HomeSuggest'
import Post from './Post'
import { useSelector,useDispatch } from 'react-redux'
import ShowStory from './ShowStory'
export default function HomePage({updateStory,setUpdateStory}) {
  //const user= JSON.parse(localStorage.getItem('users'))
  const followers =useSelector(state=>state.followAction)
  console.log(followers)
  const[url,setUrl]=useState('')
  const[content,setContent]=useState('')
  const[post,setPost]=useState([])
  const [userlike,setUserlike]= useState([])
  const user= (localStorage.getItem('userNow'))
const[activeFect,setActiveFect]=useState('')
const dispatch= useDispatch()
useEffect(async() => {
  const res = await fetch(`http://localhost:9000/posts/${user}`)
  const data = await res.json()
  setPost(data)
 
   const res5 = await fetch(`http://localhost:9000/userLike/${user}`)
   const data5 = await res5.json()
   console.log(data5)
   dispatch({type:'FIND_USER_LIKE', payload:data5})
   

},[activeFect])


    return (
      <Container style={{marginTop:'80px'}}>
        <Grid>
          <ShowStory
          updateStory={updateStory}
          setUpdateStory={setUpdateStory}/>
        </Grid>
        <div>
       <Grid className='page-warper'>
         <Grid className='sticky-suggest'>
           <Post
           url={url}
           setUrl={setUrl}
           content={content}
           setContent={setContent}
           user={user}
           setActiveFect={setActiveFect}/>
         </Grid>

       </Grid>
       <Grid className={"folowers-suggest"}>
<HomeSuggest/>

         </Grid>
<Grid className='post-warper'>
 

  {post.slice(0).reverse().map(item=>{

    return(
      <div style={{marginTop:'20px'}}>
  <MediaCard
  userlike={userlike}
    item={item}
    />
      </div>
  )
  })}
</Grid>
        </div>
        </Container>
    )
}
