const { Sequelize, Model, DataTypes} = require('sequelize')
const sequelize = new Sequelize ('instegram_project',"root","",{
    host:"localhost",
    dialect:'mysql'
})

async function follow (data,User,Followers){


    const user= await User.findOne({where:{username:data.username}})
    const userFollow= await User.findOne({where:{username:data.userFollow}})
   
    const allFollows = await Followers.findOne({where:{ personal_id:user.id,
      follower_id: userFollow.id}})
      console.log(allFollows)
  if(allFollows){
    allFollows.destroy({where:{personal_id:user.id,
      follower_id: userFollow.id}})
 
      return 'FOLLOW';
  }
  else{
    await sequelize.sync();
    const follow = await Followers.create({
      personal_id: user.id,
      follower_id: userFollow.id
     });
     return 'UNFOLLOW';
  }
}



module.exports.follow=follow