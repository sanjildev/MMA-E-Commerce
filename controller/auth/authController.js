const User = require("../../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../services/sendEmail");


//register user
exports.registerUser= async (req, res) => {
  const { email, password, phoneNumber, username } = req.body;
  if (!email || !password || !phoneNumber || !username) {
    return res.status(400).json({
      message: "Please provide email,password,phone number and username",
    });
  }

  //check email registered or not
  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "User with that email already registered!!",
    });
  }
  //else

  await User.create({
    userName: username,
    userEmail: email,
    userPassword: bcrypt.hashSync(password, 12),
    userPhoneNumber: phoneNumber,
  });

  res.status(201).json({
    message: "User Register Successfully!!",
  });
}



//login user api

exports.loginUser=async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password !!",
    });
  }

  //checks if email exists or not

  const userFound = await User.find({ userEmail: email });
  if (userFound.length == 0) {
    return res.status(404).json({
      message: "User with that email is not registered",
    });
  }

  //check password

  const isMatched = bcrypt.compareSync(password, userFound[0].userPassword);
  if (isMatched) {
    //generate token

    const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    res.status(200).json({
      message: "User logged in successfully!!",
      data:token,
    });
  } else {
    res.status(404).json({
      message: "Invalid email and password",
    });
  }
}



//forgot password

exports.forgetpassword=async(req,res)=>{
const {email}=req.body
if(!email){
    return res.status(400).json({
        message:"Please provide email"
    })
}
//check if email exist or not 
const userExist=await User.find({userEmail:email})
if(userExist.length==0){
return res.status(404).json({
    message:"Email is not registered"
})
}


//send otp to that email

const otp=Math.floor(1000+ Math.random()*9000)
userExist[0].userOTP=otp
await userExist[0].save()
await sendEmail({
    email:email,
    subject:"Your OTP For MMA E-Commerce Forgot Password",
    message:`Your forget password otp is ${otp}.Dont share with anyone !!`
})
res.status(200).json({
    message:'OTP sent successfully!!'
})
}


//verify otp

exports.verifyOTP=async(req,res)=>{
    const {email,otp}=req.body
    if(!email || !otp){
        return res.status(400).json({
message:"Please provide email and otp"
        })
    }
//check that otp correct or not of that email

const userExists=await User.find({userEmail:email})
if(userExists.length==0){
    return res.status(404).json({
        message:"Email is not registered"
    })
}
if(userExists[0].userOTP != otp){
    res.status(400).json({
        message:"Invalid otp"
    })
}

else{
    userExists[0].otp=undefined
     userExists[0].isOtpVerified=true
    userExists[0].save()
    res.status(200).json({
        message:"OTP is correct !!"
    })
}

}



//reset passwrord

exports.resetPassword=async(req,res)=>{
    const {email,newPassword,confirmPassword}=req.body
    if(!email || !newPassword || !confirmPassword){
        return res.status(400).json({
            message:"Please provide email,newPasswprd,confirmPassword"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message:"newPassword and confirmPassword doesnt match !!"
        })
    }
const userExists=await User.find({userEmail:email})
if(userExists.length==0){
    return res.status(404).json({
        message:"Email is not registered"
    })
}
if(userExists[0].isOtpVerified !==true){
  return res.status(403).json({
    message:"you cannot perform this action"
  })
}
userExists[0].userPassword=bcrypt.hashSync(newPassword,10)
userExists[0].isOtpVerified = false;
await userExists[0].save()
res.status(200).json({
    message:"Password changed successfully !!"
})
}