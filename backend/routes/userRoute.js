const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole,deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// registration User
router.route("/register").post(registerUser);

// login
router.route("/login").post(loginUser);

// forget password
router.route("/password/forgot").post(forgotPassword);

// reset password (forget password)
router.route("/password/reset/:token").put(resetPassword);

// logout
router.route("/logout").get(logout);

// view profile
router.route("/me").get(isAuthenticatedUser,getUserDetails);

// change password
router.route("/password/update").put(isAuthenticatedUser,updatePassword);

// update profille
router.route("/me/update").put(isAuthenticatedUser,updateProfile);

// admin get alluser
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser);

//admin get single user
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser);

//admin uppdate user role
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);

//admin delete user
router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;