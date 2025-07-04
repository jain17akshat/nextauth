import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
export const sendEmail=async({email,emailType,userId})=>{
    try {

const hashedToken=await bcryptjs.hash(userId.toString(),10)
      if(emailType==="VERIFY"){
        await User.findByIdAndUpdate(userId,
          
          {
            $set :{
              verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000
            }
            })
      }

else if(
  emailType==="RESET"){
    await User.findByIdAndUpdate(userId,{
      $set:{
      forgotPasswordToken:hashedToken,forgotPasswordTokenTokenExpiry:Date.now()+3600000
  }})

  }

        // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ee7527924ecfa6",
    pass: "696ad330db2f2b"
  }
});
          const mailOptions={
            from: 'akshat@akshat.ai',
            to: email,
            subject: "emailType==='VERIFY"?"Verify your email" : "RESET YOUR PASSWORD",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          }
const mailResponse=await transport.sendMail(mailOptions)
return mailResponse
        } catch (error) {
        throw new Error(error.message);
        
    }
}