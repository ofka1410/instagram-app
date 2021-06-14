const PORT =  9000
const express= require('express')
const app=express()
var cors = require('cors')
app.use(cors())
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
var cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name:'df2pklfox',
  cloud_key:'871532317372327',
  api_secret:'-2IPidgBCypHhX0MS73HHtiDCTU'
})
//import post functions
const ChangePassword =require('./postRequests/ChangePassword')
const signup =require('./postRequests/signUp')
const post =require('./postRequests/post')
const details =require('./postRequests/details')
const newComment =require('./postRequests/newComment') 
const Likes =require('./postRequests/Like')
const mailer =require('./postRequests/email')
const follow =require('./postRequests/followers')
const stories =require('./postRequests/stories')

//import get with parameters function
const findDetails = require('./getRequests/DetailsByUser')


//creating data base
const { Sequelize, Model, DataTypes} = require('sequelize')
const sequelize = new Sequelize ('instegram_project',"root","",{
    host:"localhost",
    dialect:'mysql'
})


//----socket.io-------//
const http = require('http').Server(app);
const io = require('socket.io')(http);







//--------models--------------///

//users
class User extends Model {}
User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING
},{ sequelize, modelName: 'users'});

//posts
class Posts extends Model {}
Posts.init(
  {
  img: DataTypes.STRING,
  postContent: DataTypes.STRING,
  users_id:{
    type:DataTypes.INTEGER,
    references:{
      model:User,
      key:'id'
    }
  } 
},
{ sequelize, modelName: 'posts'});
User.hasMany(Posts,{foreignKey: "users_id"})
Posts.belongsTo(User,{foreignKey:"users_id"})


//adding profilePic and personalNAme to users coloum
class Personal extends Model {}
Personal.init(
  {
  img: DataTypes.STRING,
  personal_name: DataTypes.STRING,
  users_id:{
    type:DataTypes.INTEGER,
    references:{
      model:User,
      key:'id'
    }
  }
},
{ sequelize, modelName: 'profile_users'});
User.hasMany(Personal,{foreignKey: "users_id"})
Personal.belongsTo(User,{foreignKey:"users_id"})


//creating Comment table
class Comment extends Model {}
Comment.init(
  {
  comment: DataTypes.STRING,
 username: DataTypes.STRING,
  profile_id:{
    type:DataTypes.INTEGER,
    references:{
      model:Personal,
      key:'id'
    }    
  },
  posts_id:{
    type:DataTypes.INTEGER,
    references:{
      model:Posts,
      key:'id'
    }    
  },
},
{ sequelize, modelName: 'Comments'});
Personal.hasMany(Comment,{foreignKey: "profile_id"})
Comment.belongsTo(Personal,{foreignKey:"profile_id"})
Posts.hasMany(Comment,{foreignKey: "posts_id"})
Comment.belongsTo(Posts,{foreignKey:"posts_id"})

//Like table
class Like extends Model {}
Like.init(
  {
  personal_id:{
    type:DataTypes.INTEGER,
    references:{
      model:Personal,
      key:'id'
    }
  },
  post_id:{
    type:DataTypes.INTEGER,
    references:{
      model:Posts,
      key:'id'
    }
  }
},
{ sequelize, modelName: 'likes'});
Personal.hasMany(Like,{foreignKey: "personal_id"})
Like.belongsTo(Personal,{foreignKey:"personal_id"})
Posts.hasMany(Like,{foreignKey: "post_id"})
Like.belongsTo(Posts,{foreignKey:"post_id"})

//Followers table

class Followers extends Model {}

Followers.init(
  {
  personal_id:{
    type:DataTypes.INTEGER,
    references:{
      model:User,
      key:'id'
    }
  },
  follower_id:{
    type:DataTypes.INTEGER,
    references:{
      model:User,
      key:'id'
    }
  },
},
{ sequelize, modelName: 'followers'});
User.hasMany(Followers,{foreignKey:"personal_id"})
Followers.belongsTo(User,{foreignKey:"personal_id"})
User.hasMany(Followers,{foreignKey:"follower_id"})
Followers.belongsTo(User,{foreignKey:"follower_id"})


//stories
class Story extends Model {}
Story.init(
  {
  img: DataTypes.STRING,
  postContent: DataTypes.STRING,
  personal_id:{
    type:DataTypes.INTEGER,
    references:{
      model:Personal,
      key:'id'
    }
  } 
},
{ sequelize, modelName: 'stories'});

Personal.hasMany(Story,{foreignKey: "personal_id"})
Story.belongsTo(Personal,{foreignKey:"personal_id"})


class Chat extends Model {}
Chat.init(
  {
  room: DataTypes.STRING,
  message: DataTypes.STRING,
  personal_id:{
    type:DataTypes.INTEGER,
    references:{
      model:Personal,
      key:'id'
    }
  } 
},
{ sequelize, modelName: 'chats'});
Personal.hasMany(Chat,{foreignKey: "personal_id"})
Chat.belongsTo(Personal,{foreignKey:"personal_id"})
//------functions------//

io.on('connection', client => {

  client.on('message', async(prm) => {
    console.log('message: ' + prm.text);
    io.emit("message",prm.text)
 
    const myUser =await User.findOne({where:{username:prm.user}})
    const myProfile =await Personal.findOne({where:{users_id:myUser.id}})
    await sequelize.sync();
    const users = await Chat.create({
      room:prm.room,
     message:prm.text,
      personal_id:myProfile.id 
    });  
  });
});
   app.get('/getChats/:room',async(req,res)=>{
    const data= req.params.room
    
    try{
      const chats= await Chat.findAll({where:{room:data},include:[{model:Personal}]})
      if(chats){
        res.send({status:'found',array:chats})
      }
      else{
        res.send({status:'Notfound',array:[]})
      }
    }
    catch(err){
      console.log(err)
    }   
      })
      
    
    
  
  app.post('/addUser',async(req,res)=>{
      const data= req.body
      const users= await User.findAll()
    const response= await signup.signup(User,data,users)
    res.send({status:response})         
  })
  //---new post----
  app.post('/posts',async(req,res)=>{
    const data= req.body
    const users= await User.findOne({where:{username:data.username}})
    post.post(users,Posts,data)
    res.send({status:'ok'})      
  }) 

async function fn(){
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  fn()

  app.post('/upload',function(req,res){
    const file = req.files.photo
    console.log(file)
  })
//-----adding users----
app.get('/addUser',async (req,res)=>{
    const users= await User.findAll()
    if(users){
      console.log('ok')
    }
    console.log(users)
    res.send(users)
})




//handelling posts

app.get('/posts/:user',async(req,res)=>{
  const user = req.params.user
  const allPosts=[]
  const users= await User.findOne({where:{username:user}})
  const followers = await Followers.findAll({where:{personal_id:users.id}})
  
  try{
    for(let i=0;i<followers.length;i++){
      console.log(followers[i].follower_id)
      const element= await Posts.findAll({where:{users_id:followers[i].follower_id},include:[{model:User}]})
      for(let j=0;j<element.length;j++){
        allPosts.push(element[j])
      }
    }
   
   res.send(allPosts)
  }
  catch(err){
    console.log(err)
    res.send('not working')
  }
})


app.get('/myPosts/:username',async (req,res)=>{
  const data  = req.params.username
  console.log(data)
  try{
    console.log(data)
    const myUser =await User.findOne({where:{username:data}})
     const myPost= await Posts.findAll({where:{users_id:myUser.id}})
     res.send(myPost)
  }
  catch(err){
    console.log(err)
res.send('error')
  } 
})

app.post('/details', async(req,res)=>{
  const data=req.body
  const users= await User.findOne({where:{username:data.username}})
  if(data.newPassword !==null && data.oldPassword ==users.password){
    ChangePassword. ChangePassword(data.newPassword,User,data.oldPassword)
  }
  details.details(User,Personal,data)
   console.log('ok')
  res.send(data)
})

app.get('/details/:username',async(req,res)=>{
  const data= req.params.username
  //findDetails.Details(data,User,Person)
  console.log(data)
  const myUser =await User.findOne({where:{username:data}})
  console.log(myUser)
  const myProfile =await Personal.findOne({where:{users_id:myUser.id},include:[{model:User}]})
  console.log(myProfile)
  res.send(myProfile)
 
})

app.get('/usersInformaition/',async(req,res)=>{
  const Profile =await Personal.findAll({include:User})
  res.send(Profile)
 
})


//comment action
app.post('/newComment/',async(req,res)=>{
  const data= req.body
  newComment.newComment(Posts,User,Personal,Comment,data)
  res.send('ok')
})

//Like action
app.post('/newLike/',async (req,res)=>{
const data = req.body
Likes.Like(Posts,User,Personal,Like,data)

res.send('ok')
return;
})


app.get('/uniqecomments/:content',async (req,res)=>{
  const content= req.params.content
  console.log(content)
  const post= await Posts.findOne({where:{postContent:content}})
  if(post){
    console.log('great react!!!!!!!')
    const users= await Comment.findAll({where:{posts_id:post.id},include:[{model:Personal}]})
    if(users){
      console.log('ok')
      res.send({array:users,work:'work'})
    }
  }
  else{
    res.send({work:'notwork'})
  }
})

app.get('/like/:content',async (req,res)=>{
  const content= req.params.content
  console.log(content)
  const post= await Posts.findOne({where:{postContent:content}})
  console.log(post)
  if(post){
    const users= await Like.findAll({where:{post_id:post.id},include:[{model:Personal}]})
    if(users){
      console.log('ok')
      res.send(users)
    }
  }
  else{
    res.send('not found')
    return;
  } 

})

app.get('/userLike/:user',async (req,res)=>{
  const user= req.params.user
  const myUser =await User.findOne({where:{username:user}})
  const personalid= await Personal.findOne({where:{users_id:myUser.id}}) 
  const postsLike = await Like.findAll({where:{personal_id:personalid.id}
    ,include:[{model:Posts}]}) 
  console.log(postsLike)
  res.send(postsLike)

})

//followers
app.post('/followers',async(req,res)=>{
  const data= req.body
  console.log(data)
 ///const message = follow.follow(data,User,Followers)
 const user= await User.findOne({where:{username:data.username}})
    const userFollow= await User.findOne({where:{username:data.userFollow}})
   
    const allFollows = await Followers.findOne({where:{ personal_id:user.id,
      follower_id: userFollow.id}})
      console.log(allFollows)
  if(allFollows){
    allFollows.destroy({where:{personal_id:user.id,
      follower_id: userFollow.id}})
 
      res.send({status:'FOLLOW'})
  }
  else{
    await sequelize.sync();
    const follow = await Followers.create({
      personal_id: user.id,
      follower_id: userFollow.id
     });
     res.send({status:'UNFOLLOW'}) ;
  }
})

//get followers

app.get('/follow/:user',async (req,res)=>{
  const user= req.params.user
  const myUser =await User.findOne({where:{username:user}})

  const allFollows = await Followers.findAll({where:{ personal_id:myUser.id},include:[{model:User}]})
  res.send(allFollows)
})

app.get('/following/:user',async (req,res)=>{
  const user= req.params.user
  const myUser =await User.findOne({where:{username:user}})
  const allFollows = await Followers.findAll({where:{follower_id:myUser.id},include:[{model:User}]})
  res.send(allFollows)
})

app.post('/passwordrepeat',async (req,res)=>{
  const email= req.body.email
  const data =req.body
  mailer.emailSend(User,data,email)
  console.log(email)
  
})
    
app.post('/addStory',async (req,res)=>{
  const data= req.body
  stories.stories(data,User,Personal,Story)
  
  console.log(data) 
  res.send('ok')
  })

  app.get('/addStory',async (req,res)=>{
    const stories = await Story.findAll({include:Personal})
    res.send(stories)
    })
    
    app.get('/watchStory/:person',async (req,res)=>{
      const urls=[]
      const contents=[]
      const data= req.params.person
      console.log(data)
      const stories = await Story.findAll({where:{personal_id:data},include:[{model:Personal}]})
      for(let i=0;i<stories.length;i++){
        urls.push(stories[i].img)
        contents.push(stories[i].postContent)
      }
      console.log(stories)
      res.send({urls:urls,contents:contents})
      })

  
http.listen(PORT,()=>{
  console.log("the server is listening on port 9000")
})
