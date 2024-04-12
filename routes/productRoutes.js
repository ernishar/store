const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const fileHandleMiddleware = require("../middleware/fileHandleMiddleware");
const productController = require("../controllers/productController");


const productRoutes = express.Router();

// Create product
productRoutes.post(
  "/create/product",
  authMiddleware,
  fileHandleMiddleware.array("productImages", 5),
  productController.createProduct
);

//Get categories by user
productRoutes.get("/get/products", authMiddleware, productController.getProductsByUser);

//Get categories by user
productRoutes.get("/search/products", authMiddleware, productController.searchProduct);

//Update product
productRoutes.put(
  "/update/product/:productId",
  authMiddleware,
  fileHandleMiddleware.array("productImages", 5),
  productController.updateProduct
);

//Delete product
productRoutes.delete(
  "/delete/product/:productId",
  authMiddleware,
  productController.deleteProduct
);
module.exports = productRoutes;
