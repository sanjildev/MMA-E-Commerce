const mongoose=require('mongoose');
const User = require('../model/userModel');
const { adminSeeder } = require('../adminsSeeder');

exports.connectToDatabase=async()=>{
  await mongoose.connect(process.env.MONGO_URI)
console.log('Database connected successfully!!');
adminSeeder()
}


