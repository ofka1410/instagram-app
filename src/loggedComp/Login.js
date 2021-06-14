import  {useState} from 'react';
import FormControl from '@material-ui/core/FormControl'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import {Link} from "react-router-dom";
import { TextField } from '@material-ui/core';
import './ForggotPassword'
import ForggotPassword from './ForggotPassword';
/*designed*/
const useStyle = makeStyles({
    root: {
        flexGrow: 1,
         display:"flex",
        alignItems:'center',
        justifyContent:'center',
      
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

//functions

export default function LogIn({setToken}) {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
    const classes =useStyle()


    //check if user have a profile
    const  userIn = async(e)=>{
        e.preventDefault()
        const res2 = await fetch('http://localhost:9000/addUser')
       const data2= await res2.json()
     
       
       for(let i=0; i<data2.length;i++){
          if (data2[i].username ===username|| data2[i].password === password){
            localStorage.setItem('userNow',username)
            setToken('ok')
          }
       }
    }


    
    return (  
        <Container className={classes.root}>
      
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
            <TextField className={classes.input} placeholder='password:' type='password'onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div>
            <TextField className={classes.input} placeholder='email:' type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
            <Button className={classes.btLog} type='button'  onClick={userIn}>Log in</Button>
            </div>
            </FormControl>
            <div>
                <p>-----------  OR  -----------</p>
            </div>
            <div>
            <ForggotPassword
            username={username}
            email={email}/>
            </div>
            <div style={{marginTop:'10px'}}> 
          <span>Don't have an account?</span>  <Link className='links'  to="/LogUp">Sign up</Link>
            </div>
            </div>
        </div>
      
        </Container>

    )
}
