const { Sequelize, Model, DataTypes} = require('sequelize')
const sequelize = new Sequelize ('instegram_project',"root","",{
    host:"localhost",
    dialect:'mysql'
})

async function Like(Posts,User,Personal,Like,data){
    const post = await Posts.findOne({where:{postContent:data.contentPost}})
    const user = await User.findOne({where:{username:data.username}})
    const personalid= await Personal.findOne({where:{users_id:user.id}}) 
    const found= await Like.findAll({where:{post_id:post.id}})
    if(found){
    
    const check =found.find(item=> item.personal_id==personalid.id)
    if(check){
      console.log("thats the one",check,"thats the one")
      check.destroy({where:{personal_id:personalid.id}})
      console.log("Deleted")
    }
      else{const like = await Like.create({
       personal_id:personalid.id,
        post_id: post.id 
      });
    
      console.log(personalid.id)}
    
    }
}

module.exports.Like=Like