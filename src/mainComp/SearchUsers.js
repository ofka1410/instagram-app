import React,{useEffect,useState} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { IconButton,Container,Grid,TextField,Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Followers from "./Followers"
import '../css/home.css'
import {useHistory} from 'react-router-dom'
const StyledMenu = withStyles({
    paper: {
      
     
      border: '1px solid #d3d4d5',
      background:'white'
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({

  }))(MenuItem);



export default function SearchUsers() {
    let history= useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [users,setUsers]= useState([])
    const [searchValue,setSearchValue]= useState('')

    useEffect(async() => {
     const res = await fetch(`http://localhost:9000/usersInformaition`)
     const data = await res.json()
     setUsers(data)
    }, [])
    
    const sendProfile= (item)=>{
        console.log(item)
        localStorage.setItem('searchProfile',item.user.username)
      history.push('./OtherProfile')
      window.location.reload(false)
    }
    const handleClick =  (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <div>
           <IconButton
            onClick={handleClick}
            >
            <SearchIcon  className='navIcon'/>
            </IconButton>
      
           <TextField 
          
           onChange={(e)=>{setSearchValue(e.target.value)}}
              aria-controls="customized-menu"
              aria-haspopup="true"           
          placeholder='Search users'
          >           
         </TextField>
        
         <StyledMenu
         onClick={() => sendProfile(searchValue)}
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
        <div className='search-followers'>
        {users.map(item=>{
    return(
        <div>
        {item.user.username.includes(searchValue)?
         <Grid>
     <Grid>
        <div className='follow-warper'>
         
         </div>
     </Grid>
     <Grid style={{border:"none"}} onClick={()=>{sendProfile(item)}} className='suggest-warper'>
             <Grid>
                  <div>
                  <Avatar alt="Remy Sharp" src={item.img}/>
                  </div>
              </Grid>
             
         <Grid>
             <div className='item-warper'>
             <p>{item.user.username}</p>
             </div>
         </Grid>
         <Grid>
            <div className='follow-warper'>
             <Followers
             item={item}/>
             </div>
         </Grid>
          </Grid>
       
      </Grid>
            :<></>}
            </div>
    )
    
         })}
         </div>
        </StyledMenuItem>
      </StyledMenu>
        </div>
    )
}

