import React,{useEffect} from 'react'
import {Link} from "react-router-dom";
import { IconButton,Container,grid,TextField,Avatar } from '@material-ui/core';
import '../css/navbar.css'
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LogOut from './LogOut';
import { Grid } from '@material-ui/core';
import { useState } from "react";
import SearchUsers from './SearchUsers'
import UploadStory from './UploadStory'

export default function NavBar({updateStory,setUpdateStory}) {
    const [url,setUrl]= useState('')
    const user= (localStorage.getItem('userNow'))
    useEffect(async() => {
       
        const res2 = await fetch(`http://localhost:9000/details/${user}`)
        const data2 = await res2.json()
        console.log(data2)
        setUrl(data2.img)
        
        
      },[])
    
    
    return (

                <div sticky="top" className='sticky-top'>
                    <Grid className='nav-warper'>
                        <Grid>
                        <img className='logo-nav' src='https://emilyannebondoc.files.wordpress.com/2014/09/instagram-header.png?w=200'/>
                        </Grid>
                        <Grid>
                            <div style={{marginTop:"10px"}}>
                           <SearchUsers/>
                            </div>
                        
             
                        </Grid>
                        <Grid>
            <IconButton>
              <Link className='links' to='/'><HomeIcon className='navIcon'/></Link>
              </IconButton>
              <IconButton>
              <Link className='links' to='/Profile'><PersonIcon className='navIcon'/> </Link>
                 </IconButton>
              
              <IconButton>
              <Link className='links' to='/LogOut'><ExitToAppIcon className='navIcon'/> </Link>
              </IconButton>
              <IconButton>
        <UploadStory
        url={url}
        updateStory={updateStory}
          setUpdateStory={setUpdateStory}/>
              </IconButton>
              </Grid>
              </Grid>
              </div>
            
    
    )
}
