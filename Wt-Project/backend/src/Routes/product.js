const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/auth");

const { products, product, createProduct, updateProduct, deleteProduct } = require("../Controller/product");

router.get("/products", products);
router.get("/product/:id", product);
router.post("/createProduct", createProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
