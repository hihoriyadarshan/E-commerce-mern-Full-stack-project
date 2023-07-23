const { addListener } = require("nodemon");
const Product =  require("../models/productModel");


// Create a function all Product


// create product api-admin
exports.createProduct = async(req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}

// get all product  
exports.getAllProducts = async(req,res) => {
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
}


// update Product --admin

exports.updateProduct = async (req,res,next) => {
    
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body, {
        new:true,
        runValidators: true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
}


// Delete product

// exports.deleteProduct = async(req,res,next)=>{
    
//     const product = await Product.findById(req.params.id);

//     if (!product){
//         return res.status(500).json({
//             success:false,
//             message:"product not found"
//         })
//     }

//     await product.remove();

//     res.status(200).json({
//         success:true,
//         message:"Product deleted sucessfully"
//     })
// }


exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.remove();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        // Handle any errors that occurred during deletion
        res.status(500).json({
            success: false,
            message: "Error deleting the product"
        });
    }
};