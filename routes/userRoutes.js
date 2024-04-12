const express = require("express");
const fileHandleMiddleware = require("../middleware/fileHandleMiddleware");
const userController = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");


const userRoutes = express.Router();

// Register User
userRoutes.post(
  "/register/user",
  fileHandleMiddleware.single("profilePic"),
  userController.registerUser
);

// Login User
userRoutes.post("/login/user", userController.loginUser);

userRoutes.delete("/delete/user/:id", authMiddleware, userController.deleteUser);

// Get User Profile
userRoutes.get("/profile/user", authMiddleware, (req, res) => {
  res.status(200).json({ message: "success", user: req.user });
});

module.exports = userRoutes;
