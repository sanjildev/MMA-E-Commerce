const express=require('express')
const { getUsers, deleteUser } = require('../../controller/admin/user/userController')
const { isAuthenticated } = require('../../middleware/isAuthenticated')
const { restrictTo } = require('../../middleware/restrictTO')
const router=express.Router()
router.route('/users').get(isAuthenticated,restrictTo('admin'),getUsers)
router.route('/users/:id').delete(isAuthenticated,restrictTo('admin'), deleteUser)
module.exports=router