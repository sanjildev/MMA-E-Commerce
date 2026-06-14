const express=require('express')
const app=express()
const env=require('dotenv')
const { connectToDatabase } = require('./database/database')
const User = require('./model/userModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//tell node to use dotenv
env.config()



app.use(express.json())
app.use(express.urlencoded({extended:true}))


//Database connection
connectToDatabase()



app.get('/',(req,res)=>{
    res.status(200).json({
        message:"This is home page"
    })
})



//register user api

app.post('/register',async(req,res)=>{
    const {email,password,phoneNumber,username}=req.body
    if(!email || !password || !phoneNumber || !username){
        return res.status(400).json({
         message:"Please provide email,password,phone number and username"   
        })
    }

    //check email registered or not
    const userFound=await User.find({userEmail:email})
    if(userFound.length>0){
        return res.status(400).json({
            message:"User with that email already registered!!"
        })
    }
    //else

    await User.create({
        userName:username,
        userEmail:email,
        userPassword:bcrypt.hashSync(password,12),
        userPhoneNumber:phoneNumber
    })

    res.status(201).json({
        message:"User Register Successfully!!"
    })
})



//login api for user


app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status.json(400)({
            message:"Please provide email and password !!"
        })
    }


    //checks if email exists or not

    const userFound=await User.find({userEmail:email})
    if(userFound.length==0){
return res.status(404).json({
    message:"User with that email is not registered"
})
    }

    //check password

    const isMatched=bcrypt.compareSync(password,userFound[0].userPassword)
    if(isMatched){

        //generate token

      const token= jwt.sign({id:userFound[0]._id},process.env.SECRET_KEY,{
        expiresIn:'30d'
      })
        res.status(200).json({
            message:"User logged in successfully!!",
            token
        })
    }
    else{
        res.status(404).json({
            message:"Invalid email and password"
        })
    }
})
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})