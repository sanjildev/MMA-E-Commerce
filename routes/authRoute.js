const { registerUser, loginUser, forgetpassword } = require('../controller/auth/authController')

const router=require('express').Router()


//route here

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/forgotPassword').post(forgetpassword)
module.exports=router