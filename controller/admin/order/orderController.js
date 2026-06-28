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