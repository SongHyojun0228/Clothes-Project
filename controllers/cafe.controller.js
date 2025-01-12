const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const { ObjectId } = require("mongodb");

async function getCafe(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);

  const posts = await Post.getAll();

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("cafe", {
    user: { ...user, visited: user.visited + 1 },
    posts: posts,
  });
}

async function getCafeShoes(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);
  const posts = await Post.getByKind("오뭐신");

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("cafe-shoes", { user, posts });
}

async function getCafeLook(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);
  const posts = await Post.getByKind("오늘의 룩");

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("cafe-look", { user, posts });
}

async function getCafeSelect(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);
  const posts = await Post.getByKind("골라줘");

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("cafe-select", { user, posts });
}

async function getCafeDrop(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);
  const posts = await Post.getByKind("발매정보");

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("cafe-drop", { user, posts });
}

async function getCafeSale(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);
  const posts = await Post.getByKind("세일정보");

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("cafe-sale", { user, posts });
}

async function getCafeFree(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);
  const posts = await Post.getByKind("자유");

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("cafe-free", { user, posts });
}

async function getCafeEat(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);
  const posts = await Post.getByKind("밥밥");

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("cafe-eat", { user, posts });
}

async function getCafeHumor(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);
  const posts = await Post.getByKind("유머");

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("cafe-humor", { user, posts });
}

async function getCafeLife(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);
  const posts = await Post.getByKind("일상");

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("cafe-life", { user, posts });
}

async function getCafeExercise(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);
  const posts = await Post.getByKind("운동");

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("cafe-exercise", { user, posts });
}

function getUploadPost(req, res) {
  res.render("upload-post");
}

async function postUploadPost(req, res) {
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
      views: 0,
    };

    await Post.create(newPost);
    console.log("게시물 저장 성공:", newPost);
    res.redirect("/cafe");
  } catch (err) {
    console.error("업로드 중 오류 발생:", err);
    res.status(500).send("게시물 업로드 실패");
  }
}

async function getCafePost(req, res) {
  const sessionUser = req.session.user;
  const postId = req.params.id;

  const user = await User.findByNickname(sessionUser.nickname);
  const post = await Post.getById(postId);

  await Post.incrementViews(postId);

  const comments = await Comment.getByPostId(postId);

  res.render("post-detail", {
    user: user,
    post: { ...post, views: post.views + 1 },
    comments: comments,
  });
}

async function postComment(req, res) {
  const sessionUser = req.session.user;
  const postId = req.params.id;

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(
    2,
    "0"
  )} ${String(currentDate.getHours()).padStart(2, "0")}:${String(
    currentDate.getMinutes()
  ).padStart(2, "0")}`;

  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "댓글 내용을 입력하세요." });
  }

  const newComment = {
    postId: new ObjectId(postId),
    comment: comment,
    author: sessionUser.nickname,
    date: formattedDate,
  };

  await Comment.create(newComment);

  res.status(201).json({
    comment: newComment.comment,
    author: newComment.author,
    date: newComment.date,
  });
}

async function getMyPage(req, res) {
  const sessionUser = req.session.user;
  if (!sessionUser) {
    return res.redirect("/login");
  }

  const user = await User.findByNickname(sessionUser.nickname);
  const posts = await Post.findByAuthor(sessionUser.nickname);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("my-page", { user, posts });
}

module.exports = {
  getMyPage,
};

module.exports = {
  getCafe,
  getCafeShoes,
  getCafeLook,
  getCafeSelect,
  getCafeDrop,
  getCafeSale,
  getCafeFree,
  getCafeEat,
  getCafeHumor,
  getCafeLife,
  getCafeExercise,
  getUploadPost,
  postUploadPost,
  getCafePost,
  postComment,
  getMyPage,
};
