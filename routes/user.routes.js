const express = require("express");
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get("/sign-up", userController.getSignup);
router.post("/sign-up", userController.Signup);

router.get("/login", userController.getLogin);
router.post("/login", userController.Login);
router.post("/logout",userController.Logout);

module.exports = router;
