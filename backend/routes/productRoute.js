const express = require("express");
const { getAllProducts,createProduct,updateProduct, deleteProduct , getProductsDetails } = require("../controllers/productController");

const router=express.Router();

// all product get
router.route("/products").get(getAllProducts);

// create product -admin
router.route("/product/new").post(createProduct);

// update product --admin and delte product
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductsDetails);




module.exports = router