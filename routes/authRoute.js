const { registerUser, loginUser, forgetpassword, verifyOTP, resetPassword } = require('../controller/auth/authController')
const catchAsync = require('../services/catchAsync')

const router=require('express').Router()


//route here

router.route('/register').post(catchAsync(registerUser))
router.route('/login').post(catchAsync(loginUser))
router.route('/forgotPassword').post(catchAsync(forgetpassword))
router.route('/verifyOtp').post(catchAsync(verifyOTP))
router.route('/resetPassword').post(catchAsync(resetPassword))
module.exports=router