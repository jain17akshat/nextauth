import nodemailer from "nodemailer"
export const sendEmail=async({email,emailType,userType})=>{
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });
          const mailOptions={
            from: 'akshat@akshat.ai',
            to: "email",
            subject: "emailType==='VERIFY"?"Verify your email" : "RESET YOUR PASSWORD",
            html: "<b>Hello world?</b>", // HTML body 
          }
const mailResponse=await transporter.sendMail(mailOptions)
return mailResponse
        } catch (error) {
        throw new Error(error.message);
        
    }
}