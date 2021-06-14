var nodemailer = require('nodemailer');
async function emailSend(User,data,email){
  const user= await User.findOne({where:{email:email}})
  console.log(user.password)
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ofekme19@gmail.com',
      pass: 'ofekofek14'
    }
  });
  
var mailOptions = {
from: 'ofekme19@gmail.com',
to: email,
subject: `hello ${data.username}`,
text: user.password.toString(), 
};

transporter.sendMail(mailOptions, function(error, info){
if (error) {
  console.log(error)
  console.log('mail dosent working');
} else {
  console.log('Email sent: ' + info.response);

}
});
}
module.exports.emailSend=emailSend