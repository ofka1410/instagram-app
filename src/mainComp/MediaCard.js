import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Comment from './Comment'
import Like from './Like';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth:"600px",
    marginBottom:'10px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {

  },
}));

export default function MediaCard({item,userLike}) {

 
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{width:"500px"}}className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe"  className={classes.avatar}>
          
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user.username}
        subheader={item.updatedAt}
      />
      <CardMedia
        className={classes.media}
        image={item.img}
      />
      <CardContent>
        <Typography style={{borderBottom:'1px solid grey'}} variant="body2" color="textSecondary" component="p">
        {item.postContent}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          
        </IconButton>
<Comment
userLike={userLike}
item={item}
/>
      </CardActions>
  
    </Card>
  );
}
