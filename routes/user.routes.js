const express = require("express");
const router = express.Router();

const userController = require('../controllers/user.controller');
const profileController = require('../controllers/profile.controller');

router.get("/sign-up", userController.getSignup);
router.post("/sign-up", userController.Signup);

router.get("/login", userController.getLogin);
router.post("/login", userController.Login);
router.post("/logout", userController.Logout);
router.post("/profile-change", profileController.upload.single("profileImg"), profileController.changeProfile);
router.post("/delete-profile", profileController.deleteProfile); 

module.exports = router;
