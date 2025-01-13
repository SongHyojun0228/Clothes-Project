const express = require("express");
const multer = require("multer");

const cafeController = require("../controllers/cafe.controller");
const guardRoute = require("../middlewares/auth-protection-middleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("이미지 파일만 업로드 가능합니다."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.use(guardRoute);

router.get("/cafe", cafeController.getCafe);
router.get("/upload-post", cafeController.getUploadPost);
router.post("/upload-post", upload.array("images", 10), cafeController.postUploadPost);
router.get("/cafe/:id", cafeController.getCafePost);
router.post("/cafe/:id/comment", cafeController.postComment);

router.get("/cafe-shoes", cafeController.getCafeShoes);
router.get("/cafe-look", cafeController.getCafeLook);
router.get("/cafe-select", cafeController.getCafeSelect);
router.get("/cafe-drop", cafeController.getCafeDrop);
router.get("/cafe-sale", cafeController.getCafeSale);
router.get("/cafe-free", cafeController.getCafeFree);
router.get("/cafe-eat", cafeController.getCafeEat);
router.get("/cafe-humor", cafeController.getCafeHumor);
router.get("/cafe-life", cafeController.getCafeLife);
router.get("/cafe-exercise", cafeController.getCafeExercise);

router.get("/my-page", cafeController.getMyPage);
router.get("/user/:nickname", cafeController.getUserPage);

module.exports = router;
