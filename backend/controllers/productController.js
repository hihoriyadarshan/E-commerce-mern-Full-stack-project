const { addListener } = require("nodemon");
const Product =  require("../models/productModel");
const error = require("../middleware/error");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create a function all Product


// create product api-admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product,
    });
});

// get all product  
// exports.getAllProducts = catchAsyncErrors(async(req,res) => {
//     // search filter
//     const apiFeatures = new ApiFeatures(Product.find(),req.query).search
//     const products = await apiFeatures.query;
//     res.status(200).json({
//         success:true,
//         products,
//     });
// });


exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  // search filter
  const resultperpage=5; //pagination
  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)

  .search()
  .filter()
  .pagination(resultperpage);
  const products = await apiFeatures.search().query; 
  res.status(200).json({
    success: true,
    products,
    productCount, 
  });
});


// get Single Product

exports.getProductsDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found",404));
    }

    res.status(200).json({
        success: true,
        product
    });

});


// update Product --admin

exports.updateProduct = catchAsyncErrors(async (req,res,next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found",404));
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
});


// Delete product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHander("Product not found",404));
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the product"
        });
    }
});
