const mongoose=require('mongoose')
const Schema=mongoose.Schema

const productSchema=new Schema({
    productName:{
        type:String,
        required:[true,"Product name is required"]
    },
    productDescription:{
        type:String,
        required:[true,"Product description is required"]
    },
    productPrice:{
        type:Number,
        required:[true,"Product price is required"]
    },
    productStatus:{
        type:String,
        enum:['available','unavailable']
    },
    productStockQty:{
        type:Number,
        required:[true,"Product quantity is required"]
    }
},{
    timestamps:true
})

const Product=mongoose.model('Product',productSchema)
module.exports=Product