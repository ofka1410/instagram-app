import React,{useState} from 'react'
import { Grid } from '@material-ui/core';
import '../css/profile.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
export default function PostGallery({item}) {
    
  const [like,setLikes]=useState([])
  const [comment,setComment]=useState([])
  const [hover,setHover]=useState(false)
  const [opacity,setOpacity]=useState('1')
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
      };
      
      const handleOpen = () => {
        setOpen(true);
      };

      const body = (
        <div style={modalStyle} className={classes.paper}>
            <div>
            <img className='post-pic' src={item.img}/>
            </div>
            <div>
                <p>{item.postContent}</p>
            </div>
            <div>
                <p>{item.updatedAt}</p>
            </div>
       
       
        </div>
      );

const likeHoverover= async()=>{
  const res3= await fetch(`http://localhost:9000/like/${item.postContent}`)
  const data3 =await res3.json()
  console.log(data3)
  setLikes(data3)
  const res = await fetch(`http://localhost:9000/uniqecomments/${item.postContent}`)
   const data= await res.json()
   console.log(data.array)
   setComment(data.array)
   setHover(true)
   setOpacity('0.3')
}
const notHover= ()=>{
  setHover(false)
  setOpacity('1')
}
    return (
        <Grid onMouseLeave={notHover}  onMouseEnter={() =>likeHoverover(item.postContent)} item xs>
            <div>
              {hover==true?
              (<div className='icon-warper'>
      <span><FavoriteBorderIcon/>{like.length}</span>
      <span><ChatBubbleIcon/>{comment.length}</span>
              </div>):(<></>)}
                <img style={{opacity:opacity}}  onClick={handleOpen} className='post-pic' src={item.img}/>
            </div>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
        </Grid>
        
    )
}
