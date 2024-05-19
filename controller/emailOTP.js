const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const emailConfig = {
    user: process.env.user,
    pass: process.env.pass,
    outgoingServer: process.env.outgoingServer,
  };
  
  
  const transporter = nodemailer.createTransport({
    host: process.env.host,
    port: emailConfig.outgoingServer,
    secure: true,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass,
    },
  });

  const mailsender = async (otp, useremail) => {
    return new Promise(async(resolve, reject) => {
        const mailOptions = {
            from: emailConfig.user,
            to:useremail,
            subject: `Chat OTP Notification ${otp}`,
            html: `Your OTP is ${otp}. Thank you for signup.`,
            
          };
          try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent:", info.response);
            resolve("OTP Sent")
            return
          } catch (error) {
            console.error("Error sending email:", error);
            reject ("Invalid Email")
            return
          }


    })

 
  };


module.exports = { mailsender }