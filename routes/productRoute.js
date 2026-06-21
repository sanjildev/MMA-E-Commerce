const { createProduct } = require('../controller/admin/product/productController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { multer,storage } = require('../middleware/multerConfig')
const upload=multer({storage:storage})
const { restrictTo } = require('../middleware/restrictTO')

const router=require('express').Router()

router.route('/product').post(isAuthenticated,restrictTo('admin'),upload.single('productImage'), createProduct)

module.exports=router