const express = require("express");
const router = express.Router();

const authController = require("../controllers/authentication/auth");
const {loginValidator, signupValidator} = require('../validators/auth')
const isAuth = require("../middlewares/auth")

router.post("/signup", signupValidator, authController.signup);

router.post("/login", loginValidator, authController.login);

router.post("/logout", authController.logout);

router.get('/me', isAuth, authController.getUser)

module.exports = router;