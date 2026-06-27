const Product = require("../../../model/productModel")
const Review = require("../../../model/reviewModel")



exports.createReview=async(req,res)=>{
    const userId=req.user.id
    const {rating,message}=req.body
    const productId=req.params.id
    if(!rating || !message || !productId){
        return res.status(400).json({
            message:"Please provide rating,message and productId"
        })
    }
const productExist=await Product.findById(productId)
if(!productExist){
 return res.status(404).json({
    message:"Product with that productid does not exist!!"
 })
}
await Review.create({
    userId,productId,rating,message
})
res.status(200).json({
    message:"Review added successfully!!"
})
}

exports.getProductReview=async(req,res)=>{
    const productId=req.params.id
    if(!productId){
      return res.status(400).json({
        message:"Please provide productId"
      })  
    }
const productExist=await Product.findById(productId)
if(!productExist){
 return res.status(404).json({
    message:"Product with that productid does not exist!!"
 })
}
const reviews=await Review.find({productId}).populate('userId').populate('productId')
res.status(200).json({
    message:"Review fetched successfully!!",
    data:reviews
})
}


exports.getMyReviews=async(req,res)=>{
 const userId=req.user.id
 const reviews=await Review.find({userId}) 
 if(reviews.length==0){
    res.status(400).json({
        message:"You havent given review to any products yet",
        reviews:[]
    })
 }  
 else{
    res.status(200).json({
        message:"Review fetched successfully!!",
        data:reviews
    })
 }
}
exports.deleteReview=async(req,res)=>{
    const reviewId=req.params.id
    // check if that user created this review

    const userId=req.user.id
    const review=Review.findById(reviewId)
    const ownerIdOfReview=review.userId
    if(ownerIdOfReview !== userid){
       return res.status(400).json({
         message:"you dont have permission to delete this review"   
        })
    }
    if(!reviewId){
        res.status(400).json({
         message:"Please provide reviewId"   
        })
    }
    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
        messgae:"Review deleted successfully!!"
    })
}