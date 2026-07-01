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


exports.updateMyOrder=async(req,res)=>{
    const userId=req.user.id
    const {id}=req.params
     const {shippingAddress,items}=req.body
     if(!shippingAddress,items.length==0){
        return res.status(400).json({
            message:"Please provide shippingAddress,items"
        })
     }

    //get order of above id

    const existingOrder=await Order.findById(id)

    if(!existingOrder){
        return res.status(404).json({
            message:"No order with that id"
        })
    }
    // check if the trying to update user is true ordered User

    if(existingOrder.user !==userId){
        return res.status(403).json({
            message:"You dont have permission to update this order !!"
        })
    }
    if(existingOrder.orderStatus=="ontheway"){
        return res.status(400).json({
            message:"You cannot update order when it is on the way!!"
        })
    }
    const updatedOrder=await Order.findByIdAndUpdate(id,{shippingAddress,items},{new:true})
    res.status(200).json({
        message:"Order updated successfully!!",
        data:updatedOrder
    })
}


exports.deleteMyOrder=async(req,res)=>{
    const userId=req.user.id
    const {id}=req.params

    //check if order exists or not

    const order=await Order.findById(id)
    if(!order){
        return res.status(400).json({
            message:"No order with that id"
        })
    }
    if(order.user !==userId){
        return res.status(400).json({
            message:"You dont have permission to delete this order"
        })
    }
    await Order.findByIdAndDelete(id)
    res.status(200).json({
        message:"Order deleted successfully!!",
        data:null
    })
}


exports.cancelOrder=async(req,res)=>{
    const {id}=req.body
    const userId=req.user.id

    //check if the order exists or not

    const order=await Order.findById(id)
    if(!order){
        return res.status(400).json({
            message:"No order with that id"
        })
    }
    if(order.user !==userId){
        return res.status(403).json({
            message:'You dont have permission'
        })
    }
    if(order.orderStatus !=='pending'){
        return res.staus(400).json({
            messgae:"You cannot cancel this order as it is not pending"
        })
    }
    const updatedOrder=await Order.findByIdAndUpdate(id,{
        orderStatus:"cancelled"
    },{new:true})
    res.status(200).json({
        message:"Order cancelled successfully",
        data:updatedOrder
    })
}


