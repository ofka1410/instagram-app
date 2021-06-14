import  {useState} from 'react';
import FormControl from '@material-ui/core/FormControl'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { TextField } from '@material-ui/core';
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';



//------styles
const useStyle = makeStyles({
    root: {
        flexGrow: 1,
         display:"flex",
        alignItems:'center',
        justifyContent:'center'
      },
      blocks:{
        border: "1px solid grey",
        minWidth:"350px",
        paddingBottom:'30px',
        marginTop:'50px'
        
        
      },
      btLog:{
        backgroundColor: "#0095f6" ,
        opacity:0.9,
        width:"268px",
        height:'30px',
        marginTop: '10px',
        color:'white'
        
      },
      input:{
width:"268px",
height: "38px",
marginBottom:'5px',
borderTop:'1px solid grey',
background: '#FAFAFA',

      },
      header:{
       marginTop:"20px",
      }
})




//--------Component-------



export default function LogUp({setToken}) {
    const classes =useStyle()
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    
    const addUser= async(e)=>{
    
    e.preventDefault()
    console.log(password,email,username)
    const res2 = await fetch("http://localhost:9000/addUser",
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                username: username,
                email:email,
                password:password
            }
            )
       
    }
    )
    const data2= await res2.json()
    if(data2.status=='username or password is taken'){
        toast.primary(data2.status)
    }
}


    return (  
        <Container className={classes.root}>
      <ToastContainer position='center'/>
        <div  className={classes.blocks}>
            <div>
     <FormControl>
     <h1 className={classes.header}>
         <img src='https://emilyannebondoc.files.wordpress.com/2014/09/instagram-header.png?w=200'/>
     </h1>
         <div>
           <TextField className={classes.input} placeholder='UserName:' type='text' onChange={(e)=>{setUsername(e.target.value)}}/>
            </div>
            <div>
            <TextField className={classes.input} placeholder='password:' type='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div>
            <TextField className={classes.input} placeholder='email:' type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
            <Button className={classes.btLog} type='button'  onClick={addUser}>Log up</Button>
            </div>
            </FormControl>
            <div>
                <p>-----------  OR  -----------</p>
            </div>
           <div style={{marginTop:'10px'}}>
           <span>Have an account?</span> <Link className='links'  to="/Login">Log in</Link>
            </div>
            </div>
        </div>
        
        </Container>

    )
}
