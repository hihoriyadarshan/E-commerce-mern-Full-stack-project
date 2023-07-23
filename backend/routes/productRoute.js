const express = require("express");
const { getAllProducts,createProduct,updateProduct, deleteProduct } = require("../controllers/productController");

const router=express.Router();

// all product get
router.route("/products").get(getAllProducts);

// create product -admin
router.route("/product/new").post(createProduct);

// update product --admin
router.route("/product/:id").put(updateProduct);

// delete
router.route("/product/:id").delete(deleteProduct);


module.exports = router