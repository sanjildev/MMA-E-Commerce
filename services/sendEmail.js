const nodemailer=require('nodemailer')

exports.sendEmail=async(options)=>{
var transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
     user:process.env.EMAIL_USER,
     pass:process.env.EMAIL_PASS   
    }
})

const mailOptions={
    from:`Sanjil Shakya <${process.env.EMAIL_USER}>`,
    to:options.email,
    subject:options.subject,
    text:options.message
}
await transporter.sendMail(mailOptions)
}

