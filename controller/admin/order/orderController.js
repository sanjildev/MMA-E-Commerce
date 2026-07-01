const Order = require("../../../model/orderModel")

exports.getAllOrders=async(req,res)=>{
const orders=await Order.find().populate({
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

exports.getSingleOrder=async(req,res)=>{
    const {id}=req.params
    const order=await Order.findById(id)

    if(!order){
        return res.status(400).json({
            message:'No order with that id'
        })
    }
    res.status(200).json({
        message:"Order fetched successfully !!",
        data:order
    })
}



exports.updateOrderStatus=async(req,res)=>{
const {id}=req.params
const {orderStatus}=req.body

if(!orderStatus || !['pending','delivered','cancelled','ontheway','preparation'].includes(orderStatus.toLowerCase())){
    return res.status(400).json({
     message:"Order Status is invalid or should be provided"   
    })
}
const order=await Order.findById(id)

    if(!order){
        return res.status(400).json({
            message:'No order with that id'
        })
    }
    const updatedOrder=await Order.findByIdAndUpdate(id,{
        orderStatus
    },{new:true})

    res.status(200).json({
        message:"Order status updated Succesfully",
        data:updatedOrder
    })
}


exports.deleteOrder=async(req,res)=>{
const {id}=req.params
const order=await Order.findById(id)
if(!order){
    return res.status(404).json({
       messgae:"No order with that id" 
    })
}
await Order.findByIdAndDelete(id)
res.status(200).json({
    message:"Order deleted successfully!!",
    data:null
})
}