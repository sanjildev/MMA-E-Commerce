

const { createReview, deleteReview, getMyReviews } = require('../../controller/user/review/reviewController')
const { isAuthenticated } = require('../../middleware/isAuthenticated')
const { restrictTo } = require('../../middleware/restrictTO')
const catchAsync = require('../../services/catchAsync')



const router=require('express').Router()
router.route('/').get(isAuthenticated,catchAsync(getMyReviews))
router.route('/:id').delete(isAuthenticated,catchAsync(deleteReview)).post(isAuthenticated,restrictTo('customer'), catchAsync(createReview))

module.exports=router