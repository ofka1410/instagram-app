const { Sequelize, Model, DataTypes} = require('sequelize')
const sequelize = new Sequelize ('instegram_project',"root","",{
    host:"localhost",
    dialect:'mysql'
})

async function Details(data,User,Person){
    findDetails.Details(data,User,Person)
    console.log(data)
    const myUser =await User.findOne({where:{username:data}})
    console.log(myUser)
    const myProfile =await Personal.findOne({where:{users_id:myUser.id}})
    console.log(myProfile)
    return
}

module.exports.Details=Details