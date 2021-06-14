import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../css/home.css'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Post({url,setUrl,content,setContent,user,setActiveFect}) {
  const classes = useStyles();

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
setUrl(file.secure_url)
  }
  const addPost= async(e)=>{
    e.preventDefault()
    const res2 = await fetch("http://localhost:9000/posts",
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                username: user,
               url:url,
                content:content
            }
            )
    }
    )
   setActiveFect(Math.random())
  }
  

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
          <div>
          <input onChange={uploadImage} id='url-upload'
          className='post-card' type='file' placeholder='url:'/>
          </div>
         
      <div>
  <img  className='upload-img' src={url}/>
  </div>
  <div>
      <TextField
     
  onChange={(e)=>{setContent(e.target.value)}}
  className='post-content'
  placeholder="write a post">
  </TextField>

      </div>
  <div>
    <Button onClick={addPost} className='post'>Post</Button>
  </div>
      </CardContent>
    </Card>
  );
}