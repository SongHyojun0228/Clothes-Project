const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const db = require("../data/database");
const { ObjectId } = require("mongodb");

const guardRoute = require("../middlewares/auth-protection-middleware");

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

router.get("/cafe", async function (req, res) {
  const sessionUser = req.session.user;

  const user = await db
    .getDb()
    .collection("users")
    .findOne({ nickname: sessionUser.nickname });

  const posts = await db.getDb()
  .collection("posts")
  .find()
  .sort({ date: -1 })
  .toArray();

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${
    String(currentDate.getMonth() + 1).padStart(2, "0")
  }.${
    String(currentDate.getDate()).padStart(2, "0")
  }`;

  posts.forEach(post => {
    post.isNew = post.date.startsWith(today); 
  });

  res.render("cafe", { user: user, posts: posts });
});

router.get("/upload-post", function (req, res) {
  res.render("upload-post");
});

router.post(
  "/upload-post",
  upload.array("images", 10),
  async function (req, res) {
    try {
      const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}.${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(
        2,
        "0"
      )} ${String(currentDate.getHours()).padStart(2, "0")}:${String(
        currentDate.getMinutes()
      ).padStart(2, "0")}`;

      const newPost = {
        post_kind: req.body.post_kind,
        title: req.body.title,
        content: req.body.content,
        images: imagePaths,
        previewImage: imagePaths[0] || null,
        author: req.session.user.nickname,
        date: formattedDate,
      };

      await db.getDb().collection("posts").insertOne(newPost);
      console.log("게시물 저장 성공:", newPost);
      res.redirect("cafe");
    } catch (err) {
      console.error("업로드 중 오류 발생:", err);
      res.status(500).send("게시물 업로드 실패");
    }
  }
);

router.get('/cafe/:id', async function(req, res) {
  const sessionUser = req.session.user;
  const postId = req.params.id;
  const PostId = new ObjectId(postId);

  const user = await db
    .getDb()
    .collection("users")
    .findOne({ nickname: sessionUser.nickname });

  const post = await db
    .getDb()
    .collection('posts')
    .findOne({_id: PostId});

  res.render('post-detail', {user:user, post:post});
});

module.exports = router;
