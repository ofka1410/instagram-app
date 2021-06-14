import React from 'react'
import '../css/edditForm.css'
import { Button,TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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
      height:'500px',
      width:'500px',
      padding: theme.spacing(2, 4, 3),
    },
  }));
  

export default function ChangePro({url,setUrl}) {
    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
        <div>
         <Button onClick={handleOpen} className='ChangePro'>Change Profile photo</Button>   
         <Modal
         className='modal-block'
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
            <h2 id="transition-modal-title">Update_profile</h2>
            <p id="transition-modal-description">copy the url to here</p>
            <span style={{paddingTop:'5px'}}><ArrowDownwardIcon/></span>
            <div>
            <TextField
            onChange={(e)=>{setUrl(e.target.value)}}
            type='text'
            className='url-field'>

           </TextField>
            </div>
            <div>
          <img className='upload-pic' src={url}/>
            </div>

          </div>
        </Fade>
      </Modal>
        </div>
    )
}
