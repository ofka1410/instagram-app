const { Sequelize, Model, DataTypes} = require('sequelize')
const sequelize = new Sequelize ('instegram_project',"root","",{
    host:"localhost",
    dialect:'mysql'
})

async function details(User,Personal,data){
   
    const users= await User.findOne({where:{username:data.username}})
    const check = await Personal.findOne({where:{users_id:users.id}})
    if(check){
       
        if(data.img){
            check.img= data.img
            check.save({fields: ['img']}); 
            console.log(check.img)
        }
        if(data.personalName){
            check. personal_name=data.PersonalName
            console.log(check. personal_name)
            check.save({fields: ['personal_name']}); 
        }
    }
    else{
        console.log(data.personalName)
        const posts = await Personal.create({
          img:data.img,
          personal_name: data.PersonalName,
          users_id: users.id 
        });
    } 
}

module.exports.details=details