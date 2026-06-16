const User = require("./model/userModel");
const bcrypt=require('bcryptjs')
exports.adminSeeder=async()=>{
    //admin seeding

//check whether admin exists or not

 const isAdminExists=await User.findOne({userEmail:"sanjilshakya75@gmail.com"})

if(!isAdminExists){
await User.create({
  userEmail:"sanjilshakya75@gmail.com",
  userPassword:bcrypt.hashSync("Hikaripet",10),
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