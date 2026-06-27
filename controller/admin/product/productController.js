const Product = require("../../../model/productModel")
const fs=require('fs')
exports.createProduct=async(req,res)=>{
    const file=req.file
    let filepath
    if(!file){
        filepath='https://i.pinimg.com/originals/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg?nii=t'
    }
    else{
        filepath=req.file.filename
    }
const {productName,productDescription,productPrice,productStatus,productStockQty}=req.body
 
if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty){
    return res.status(400).json({
        message:"Please provide product namne,description,status,price and stock quantity"
    })
}

//insert data into the product table

await Product.create({
    productName,productDescription,productPrice,productStatus,productStockQty,productImage:`${process.env.BACKEND_URL}/${filepath}`
})

res.status(200).json({
    message:"Product created successfullY!!"
})    
} 

exports.deleteProduct=async(req,res)=>{
    const {id}=req.params
    if(!id){
        return res.status(400).json({
            message:"Please provide product id"
        })
    }
    const oldData=await Product.findById(id)
if(!oldData){
    return res.status(404).json({
        message:"No data found with that id"
    })
}
const oldProductImage=oldData.productImage
const lengthToCut=process.env.BACKEND_URL.length
const finalFilepathAfterCut=oldProductImage.slice(lengthToCut)
fs.unlink("./uploads" + finalFilepathAfterCut,(err)=>{
    if(err){
        console.log('error deleting file',err);
    }
    else{
        console.log('file deleted successfully!!');
    }
})
    const productId=await Product.findByIdAndDelete(id)
    if(productId){
        res.status(200).json({
        message:"Product deleted successfully!!"
    })
} 
else{
    res.status(400).json({
        message:"no product with that id"
    })
}
}

exports.updateProduct=async(req,res)=>{
    const {id}=req.params
    const {productName,productDescription,productPrice,productStatus,productStockQty}=req.body
    console.log(req.body);
    if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty || !id){
    return res.status(400).json({
        message:"Please provide product namne,description,status,price and stock quantity"
    })
}
const oldData=await Product.findById(id)
if(!oldData){
    return res.status(404).json({
        message:"No data found with that id"
    })
}
const oldProductImage=oldData.productImage
const lengthToCut=process.env.BACKEND_URL.length
const finalFilepathAfterCut=oldProductImage.slice(lengthToCut)

// remove file from upload folder
if(req.file && req.file.filename){
await fs.unlink("./uploads" + finalFilepathAfterCut,(err)=>{
    if(err){
        console.log('error deleting file',err);
    }
    else{
        console.log('file deleted successfully!!');
    }
})
}
const updatedProduct=await Product.findByIdAndUpdate(id,{
productName,productDescription,productPrice,productStatus,productStockQty,productImage:req.file && req.file.filename ? `${process.env.BACKEND_URL}/${req.file.filename}` : oldProductImage},{
    new:true
})
res.status(200).json({
    message:"Product updted successfully !!",
    data:updatedProduct
})
}
