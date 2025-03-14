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

async function changeProfile(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "파일이 업로드되지 않았습니다." });
  }

  try {
    const profileImgUrl = `/uploads/profiles/${req.file.filename}`;
    await User.updateProfileImg(req.session.user.nickname, profileImgUrl);

    res.json({ message: "프로필 변경 성공", profileImg: profileImgUrl });
  } catch (error) {
    console.error("프로필 업데이트 실패:", error);
    res.status(500).json({ message: "서버 오류" });
  }
}

router.use(guardRoute);

router.get("/cafe", cafeController.getCafe);
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

router.get("/upload-post", cafeController.getUploadPost);
router.post("/upload-post", upload.array("images", 10), cafeController.postUploadPost);
router.get("/cafe/:id", cafeController.getCafePost);
router.post("/cafe/:id/comment", cafeController.postComment);
router.post("/cafe/:id/like", cafeController.toggleLike);

router.get("/cafe/:id/edit", cafeController.getEditPost);
router.post("/cafe/:id/edit", upload.array("images", 10), cafeController.postEditPost);


router.get("/my-page", cafeController.getMyPage);
router.get("/user/:nickname", cafeController.getUserPage);
router.post("/cafe/:id/delete", cafeController.deletePost);

module.exports = router;
