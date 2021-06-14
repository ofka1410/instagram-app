import React,{useState,useEffect} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { useSelector,useDispatch } from 'react-redux'
export default function ShowLike({item}) {
    const [like,setLike]=useState('grey')
const userLike = useSelector(LikeSaver => LikeSaver)
    // useEffect(() => {
    // const find= userLike.find(el=>el.post.postContent==item.postContent)
    // if(find){
    //     setLike('red')
    // }
    // }, [])
    
    


    return (
        <div>
             <FavoriteIcon color={like}/>
        </div>
    )
}
