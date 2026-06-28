const Order = require("../../../model/orderModel")

exports.createOrder=async(req,res)=>{
    const {shippingAddress,items,totalAmount,paymentDetails}=req.body
    const userId=req.user.id
    if(!shippingAddress || !items.length>0 || !totalAmount || !paymentDetails){
        return res.status(400).json({
            message:"Please provide shippingAddress,items,totalAmount and paymentDetails"
        })
    }

    // insert into orders

    await Order.create({
        user:userId,shippingAddress,totalAmount,items,paymentDetails
    })

    res.status(200).json({
        message:"Order Created Successfully!!"
    })
}


exports.getMyOrders=async(req,res)=>{
    const userId=req.user.id
const orders=await Order.find({user:userId}).populate({
    path:'items.product',
    model:"Product",
    select:'-productStockQty -createdAt -updatedAt -reviews'
})
if(orders.length==0){
    return res.status(404).json({
        message:"NO orders",
        data:orders
    })
}
res.status(200).json({
    message:"Orders fetched successfully!!",
    data:orders
})

}