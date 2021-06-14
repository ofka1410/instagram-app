import React,{useState} from 'react'
import '../css/navbar.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Avatar,Card,Button,TextField } from '@material-ui/core';
import AddStory from './AddStory'

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function UploadStory({url,setUpdateStory}) {
    const[image,setImage]=useState('')
    const[content,setContent]=useState('')
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const uploadImage= async(e)=>{
        const files =e.target.files
        const data = new FormData()
        data.append('file',files[0])
        data.append('upload_preset',"demoImage")
        const res = await fetch('https://api.cloudinary.com/v1_1/df2pklfox/image/upload',
    {
    method:'POST',
    body:data
    })
    const file= await res.json()
    console.log(file)
    setImage(file.secure_url)
      }
    return (
        <div>
           <Avatar onClick={handleOpen} className='story-avatar' src={url}></Avatar> 

           <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <div>
          <input onChange={uploadImage} id='url-upload'
          className='post-card' type='file' placeholder='url:'/>
          </div>
         
      <div>
  <img  className='upload-img' src={image}/>
  </div>
  <div>
  <TextField
     
     onChange={(e)=>{setContent(e.target.value)}}
     className='post-content'
     placeholder="write a post">
     </TextField>
     </div>
    <AddStory
    
     setUpdateStory={setUpdateStory}
    image={image}
    content={content}
    />
          </div>
        </Fade>
      </Modal>
        </div>
    )
}
