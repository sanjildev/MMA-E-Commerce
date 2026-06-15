const { registerUser, loginUser, forgetpassword, verifyOTP, resetPassword } = require('../controller/auth/authController')

const router=require('express').Router()


//route here

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/forgotPassword').post(forgetpassword)
router.route('/verifyOtp').post(verifyOTP)
router.route('/resetPassword').post(resetPassword)
module.exports=router