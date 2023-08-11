const { addListener } = require("nodemon");
const Product =  require("../models/productModel");
const error = require("../middleware/error");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create a function all Product


// create product api-admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    req.body.user = req.user.id
    
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


// create New Review or update the review 
exports.createProductReview= catchAsyncErrors(async (req, res, next) => {
 const {rating,comment,productId} = req.body;

 const review = {
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find
    (rev=> rev.user.tostring()==req.user._id.tostring());           //Get user id                                            //rev is variable

  if(isReviewed){
    product.reviews.forEach((rev =>{
         if(rev.user.tostring() === req.user._id.tostring)
        rev.rating=rating,
        rev.comment=comment
    }))
  }
  else{
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  //avarage rating
  let avg=0;
  product.ratings = product.reviews.forEach(rev=>{
    avg+=rev.rating //avg=avg+rev.rating  
})/product.reviews.length;

    await product.save({validateBeforeSave:false});
res.status(200).json({
    success: true,
});
});


//Get all Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });

// Delete Reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });