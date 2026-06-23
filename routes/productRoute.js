const { createProduct, getProducts, getSingleproduct, deleteProduct, updateProduct } = require('../controller/admin/product/productController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { multer,storage } = require('../middleware/multerConfig')
const upload=multer({storage:storage})
const { restrictTo } = require('../middleware/restrictTO')
const catchAsync = require('../services/catchAsync')

const router=require('express').Router()

router.route('/products').post(isAuthenticated,restrictTo('admin'),upload.single('productImage'),catchAsync(createProduct)).get(catchAsync(getProducts))

router.route('/products/:id').get(catchAsync(getSingleproduct)).delete(isAuthenticated,restrictTo('admin'),catchAsync(deleteProduct)).patch(upload.single('productImage'),updateProduct)

module.exports=router