const Product = require("../../../model/productModel")

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
    productName,productDescription,productPrice,productStatus,productStockQty,productImage:`http://localhost:3000/${filepath}`
})

res.status(200).json({
    message:"Product created successfullY!!"
})    
} 


exports.getProducts=async(req,res)=>{
    const products=await Product.find()
    if(products.length==0){
        res.status(400).json({
            message:"No product found!!",
            products:[]
        })
    }
    else{
        res.status(200).json({
            message:"All products fetched successfully!!",
            products
        })
    }
}

exports.getSingleproduct=async(req,res)=>{
    const {id}=req.params
    if(!id){
        return res.status(400).json({
        message:"Please provide id(product id)"
        })
    }
    const product=await Product.find({_id: id})
    if(product.length==0){
        res.status(400).json({
            message:"No product found with that id!!"
        })
    }
    else{
        res.status(200).json({
            message:"Product fetched successfully",
            product
        })
    }
}