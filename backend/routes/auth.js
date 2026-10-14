const express = require("express");
const router = express.Router();

const authController = require("../controllers/authentication/auth");
const isAuth = require("../middlewares/auth");

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/me", isAuth, authController.me);

router.post("/logout", authController.logout);

module.exports = router;