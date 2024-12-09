const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/userSignUp.js");
const userLoginController = require("../controller/userSignIn.js");
const userDetailsController = require("../controller/userDetails.js");
const userLogoutController = require("../controller/userLogout.js");
const authToken = require("../controller/middleware/authToken.js");
const uploadProductPermission = require("../controller/middleware/uploadProductPermission.js"); // Admin permission middleware
const allUsers = require("../controller/allUsers.js");
const deleteAllUsers = require("../controller/DeleteAllUsers.js");
const EditUser = require("../controller/EditUser.js");
const uploadProductController = require("../controller/uploadProduct.js");
const editProductController = require("../controller/editProduct.js"); // New controller for editing products
const getProductController = require("../controller/getProducts.js");
const getProductByIdController = require("../controller/getProductsById.js");
const deleteProductByIdController = require("../controller/deleteProductById.js");
const getCategoryProduct = require("../controller/getCategoryProduct.js");

// Route to handle user signup
router.post("/signup", userSignUpController);

// Route to handle user login
router.post("/login", userLoginController);

// Route to fetch user details (protected, requires authentication)
router.get("/user-details", authToken, userDetailsController);

// Route to handle user logout
router.post("/logout", userLogoutController);

// Route to get all users (for admin view, consider adding auth + permission later if sensitive)
router.get("/all-users", allUsers);

// Route to delete all users
router.delete("/delete-all-users", deleteAllUsers);

// Route to edit user details
router.put("/edit-user/:id", EditUser);

// Route to upload product (admin only)
router.post(
  "/upload-product",
  // authToken,
  // uploadProductPermission,
  uploadProductController
);

// Route to edit product (admin only)
router.put(
  "/edit-product/:id",
  // authToken,
  // uploadProductPermission,
  editProductController
);

// Route to get all products
router.get("/get-products", getProductController);

// To get spefic product by id
router.get("/get-products/:id", getProductByIdController);

// To Delete spefic product by id
router.delete("/delete-product/:id", deleteProductByIdController);

// get the product category 

router.get("/get-procuctCategory", getCategoryProduct)


module.exports = router;
