import React,{useState,useEffect} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ShowLike from './ShowLike'
export default function Like({item,userLike}) {
    const user= (localStorage.getItem('userNow'))
    const likeAdder = async()=>{
        console.log(item)
        const res2 = await fetch("http://localhost:9000/newLike",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                     username:user,
                     contentPost: item.postContent,
                    }
                    )
            }
            )
        }
        
    return (
        <div>
            <IconButton onClick={likeAdder} aria-label="add to favorites">
                <ShowLike
                userLike={userLike}
                item={item}/>
        </IconButton>  
        </div>
    )
}
