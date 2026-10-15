const express = require("express");
const router = express.Router();

const authController = require("../controllers/authentication/auth");
const {loginValidator, signupValidator} =require('../validators/auth')

router.post("/signup", signupValidator, authController.signup);

router.post("/login", loginValidator, authController.login);

router.post("/logout", authController.logout);

module.exports = router;