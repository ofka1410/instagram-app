import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);





export default function ForggotPassword({username,email}) {
  const [open, setOpen] = React.useState(false);
  const [name,setName] =useState(username)
  const [emails,setEmails] =useState(email)

  const forggotEmail = async(e)=>{
    e.preventDefault()
    console.log(emails)
    const res = await fetch("http://localhost:9000/passwordrepeat",
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                username: name,
                email:emails,
            
            }
            )
    }
    )
  
  }
  const handleClickOpen = () => {

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Forggot password?
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Password recovery
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
           If you forggot your password, wwrite your user email here.
          And we will send you your current password
          </Typography>
          <Typography gutterBottom>
         <TextField 
        onChange={(e)=>{setEmails(e.target.value)}}>
         </TextField>
          </Typography>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={forggotEmail} autoFocus color="primary">
            Send email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
