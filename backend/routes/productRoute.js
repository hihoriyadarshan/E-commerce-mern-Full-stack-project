const express = require("express");
const { getAllProducts,createProduct,updateProduct, deleteProduct , getProductsDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router=express.Router();

// all product get
router.route("/products").get(getAllProducts);
// router.route("/products").get(getAllProducts);
//router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);


// create product -admin
// router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

// update product --admin and delte product
router.route("/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

router.route("/product/:id").get(getProductsDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview);

router.route("/reviews")
.get(getProductReviews)
.delete(isAuthenticatedUser,deleteReview);

module.exports = router;
