const { Sequelize, Model, DataTypes} = require('sequelize')
const sequelize = new Sequelize ('instegram_project',"root","",{
    host:"localhost",
    dialect:'mysql'
})

async function post(users,Posts,data){
    console.log(users)
    console.log(data)
   
    const posts = await Posts.create({
        img: data.url,
        postContent: data.content,
        users_id: users.id 
      });
      console.log(posts)
}

module.exports.post=post