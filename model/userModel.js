const mongoose=require('mongoose')

const Schema=mongoose.Schema

const userSchema=new Schema({
    userEmail:{
        type:String,
        required:[true,"Email must be provided"],
        unique:true,
    },
    userPhoneNumber:{
        type:Number,
        required:[true,"Phone Number must be provided"],
    },
    userName:{
        type:String,
        required:[true,"Name must be provided"]
    },
    userPassword:{
        type:String,
        required:[true,"Password must be provided"],
        select:false
    },
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer",
    },
    userOTP:{
        type:Number,
        select:false
    },
    isOtpVerified:{
        type:Boolean,
        default:false,
        select:false
    }
},{
    timestamps:true
})

const User=mongoose.model("User",userSchema)
module.exports=User
