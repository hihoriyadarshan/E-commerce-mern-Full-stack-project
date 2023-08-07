const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile } = require('../controllers/userController');
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

module.exports = router;
