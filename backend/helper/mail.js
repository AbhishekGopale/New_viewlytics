var nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mayankshahuthinktanker@gmail.com',
      pass: 'oqovxjjrexnenkgt'
    }
  });
  
const emailTemplate = fs.readFileSync(path.join(__dirname, '/login.html'), 'utf-8');
// console.log(__dirname,"dirnam")



  exports.send = async (options) => {
    const formattedEmail = emailTemplate.replace('{{ email }}', options.option.data.email).replace('{{ password }}',  options.option.data.password);
    // console.log(__dirname,"dirnam")
    // console.log(path.join(__dirname, '/login.html'),"path")
    // console.log(options,"optionss")
    // console.log(options.option.email,"optionss")
    // console.log(options.option.data,"optionss")
    var mailOptions = {
      from: 'mayankshahuthinktanker@gmail.com',
      to: options.option.email, 
      subject: 'Login credential',
      html: formattedEmail
    };
  
    return transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };
  exports.send2 = async (options) => {
    // console.log(options,"send2222");
    // return;
    var mailOptions = {
      from: 'mayankshahuthinktanker@gmail.com',
      to: options.email, 
      subject: 'Forget Password Url',
      text: options.link
    };
  
    return transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };

  // var mailOptions = {
  //   from: 'youremail@gmail.com',
  //   to: 'myfriend@yahoo.com',
  //   subject: 'Sending Email using Node.js',
  //   text: 'That was easy!'
  // };

  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });