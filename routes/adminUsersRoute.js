const express=require('express')
const { getUsers } = require('../controller/admin/user/userController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { restrictTo } = require('../middleware/restrictTO')
const router=express.Router()
router.route('/users').get(isAuthenticated,restrictTo('admin'),getUsers)

module.exports=router