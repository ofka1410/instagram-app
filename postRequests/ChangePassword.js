const ChangePassword= async(newPassword,User,oldPassword)=>{
    
    if(newPassword !== null&&oldPassword !== null){
        const currentUser = await User.findOne({
            where:{
              password: oldPassword
            }
         });
         currentUser.password = newPassword
        console.log( currentUser.password); 
        currentUser.save({fields: ['password']}); 
    }
    else{
        console.log('one of the textField is empty')
        return;
    }
    
}
module.exports.ChangePassword=ChangePassword