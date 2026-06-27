const User = require("../../../model/userModel")
const bcrypt=require('bcryptjs')
//get my profile controller
exports.getMyProfile=async(req,res)=>{
 const userId=req.params.id
 const myProfile=await User.findById(userId)
 
 
 //send response


 res.status(200).json({
    data:myProfile,
    message:'Profile fetched successfully!!'
 })
}







//update my profile controller

exports.updateMyProfile=async(req,res)=>{
    const {userName,userEmail,userPhoneNumber}=req.body
    const userId=req.params.id
    // update profile

   const updatedData= await User.findByIdAndUpdate(userId,{userName,userEmail,userPhoneNumber},{
        runValidators:true,
        new:true
    })
    res.status(200).json({
        message:"Profile updates sccessfully!!",
        data:updatedData
    })
}





//delete my profile

exports.deleteMyProfile=async(req,res)=>{
    const userId=req.params.id
    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message:"Profile deleted successfully",
        data:null
    })
}



//update my password


exports.updateMyPassword=async(req,res)=>{
    const userId=req.user.id
    const {oldPassword,newPassword,confirmPassword}=req.body
    if(!oldPassword || !newPassword || !oldPassword){
    return res.status(400).json({
        message:"Please provide oldPassword,new Password and confirm password"
    })
    }
    if(newPassword.trim() !== confirmPassword){
        return res.status(400).json({
            message:"Newpassword and oldPasswor didnt match"
        })
    }

    //taking out the hash of the old password

    const userData=await User.findById(userId)
    const hashedoldPassword=userData.userPassword

    //check if old password is correct or not

    const isOldPasswordCorrect=bcrypt.compareSync(oldPassword,userData.userPassword)
    if(!isOldPasswordCorrect){
        return res.status(400).json({
            message:"oldPassword didnt matched"
        })
    }
    //matched vayo vanesi

    user.userPassword=bcrypt.hashSync(newPassword,12)
    await userData.save()
    res.status(200).json({
        message:"Password Changed Succesfully!!",
        
    })
}
