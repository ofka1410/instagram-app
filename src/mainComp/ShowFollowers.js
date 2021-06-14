import React from 'react'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export default function ShowFollowers({followers}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

 
    return (
        <div>
      <p><span onClick={handleClick} className='follow-span'>{followers.length}</span>followers</p>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          
      {followers.map(item=>{
         return(
             <div>
                <p className='users'>{item.user.username}</p>
             </div>
         )
     })}
      </Menu>
        </div>
    )
}
