const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const categoryController = require("../controllers/CategoryController");


const categoryRoutes = express.Router();

// Create Category
categoryRoutes.post("/create/category", authMiddleware, categoryController.createCategory);

//Get categories by user
categoryRoutes.get("/get/category", authMiddleware, categoryController.getCategoryByUser);

//Update category
categoryRoutes.post(
  "/update/category/:categoryId",
  authMiddleware,
  categoryController.updateCategory
);

//Delete category
categoryRoutes.delete(
  "/delete/category/:categoryId",
  authMiddleware,
  categoryController.deleteCategory
);
module.exports = categoryRoutes;
