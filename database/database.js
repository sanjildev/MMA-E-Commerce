const mongoose=require('mongoose');
const User = require('../model/userModel');

exports.connectToDatabase=async()=>{
  await mongoose.connect(process.env.MONGO_URI)
console.log('Database connected successfully!!');
//admin seeding

//check whether admin exists or not

const isAdminExists=await User.findOne({userEmail:"sanjilshakya75@gmail.com"})

if(!isAdminExists){
await User.create({
  userEmail:"sanjilshakya75@gmail.com",
  userPassword:"Hikaripet",
  userPhoneNumber:9808095821,
  userName:"admin",
  role:"admin"
})

console.log("Admin seeded successfully!!");
}

else{
  console.log("Admin already seeded!!");
}

}


