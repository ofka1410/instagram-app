const { Sequelize, Model, DataTypes} = require('sequelize')
const sequelize = new Sequelize ('instegram_project',"root","",{
    host:"localhost",
    dialect:'mysql'
})

async function newComment(Posts,User,Personal,Comment,data){
    console.log(data)
    const post = await Posts.findOne({where:{postContent:data.contentPost}})
    console.log(post)
    const user = await User.findOne({where:{username:data.username}})
   console.log(user)
   const personalid= await Personal.findOne({where:{users_id:user.id}})
    if(post && personalid){
     const comment = await Comment.create({
       comment:data.content,
       username: user.username,
      profile_id:personalid.id,
       posts_id: post.id 
     });
     console.log(comment)
  
     console.log(personalid.id)
    }
  
}

module.exports.newComment=newComment