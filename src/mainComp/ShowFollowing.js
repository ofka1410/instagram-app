import React from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



export default function ShowFollowing({following}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(following)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    
    return (
        <>
          <p><span onClick={handleClick} className='follow-span'>{following.length}</span>following</p>
          <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
     {following.map(item=>{
         return(
             <div>
                <p className='users'>{item.user.username}</p>
             </div>
         )
     })}
      </Menu>
        </>
    )
}
