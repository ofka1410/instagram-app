const { Sequelize, Model, DataTypes} = require('sequelize')
const sequelize = new Sequelize ('instegram_project',"root","",{
    host:"localhost",
    dialect:'mysql'
})
 
 async function  signup(User,data,users){
    console.log(data)
    if(users){
        for(let i=0; i<users.length;i++){
          if(users[i].username== data.username|| users[i].password== data.password){
            
            return 'userName already exist';
          }
          else{
            await sequelize.sync();
          const users = await User.create({
            username: data.username,
            password: data.password,
            email: data.email 
          });
          console.log(users.toJSON());
        
      return  'success'
          }
        }
      }
      else{
        await sequelize.sync();
          const users = await User.create({
            username: data.username,
            password: data.password,
            email: data.email 
          });
          console.log(users.toJSON());
        
          return  'success'
      }
}
module.exports.signup=signup