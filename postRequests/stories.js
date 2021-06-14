const { Sequelize, Model, DataTypes} = require('sequelize')
const sequelize = new Sequelize ('instegram_project',"root","",{
    host:"localhost",
    dialect:'mysql'
})

async function stories(data,User,Personal,Story){
    const user= await User.findOne({where:{username:data.username}})
    const myProfile =await Personal.findOne({where:{users_id:user.id}})
    await sequelize.sync();
    const story = await Story.create({
     img: data.url,
     postContent: data.content,
     personal_id:myProfile.id
     });

}

module.exports.stories=stories