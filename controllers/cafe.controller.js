const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const { ObjectId } = require("mongodb");

async function getCafe(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);

  const page = parseInt(req.query.page) || 1;
  const perPage = 15;
  const totalPosts = await Post.countAll();
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getPaginated(page, perPage);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countByPostId(post._id);
      return { ...post, commentCount, isNew: post.date.startsWith(today) };
    })
  );

  res.render("cafe", {
    user: { ...user, visited: user.visited + 1 },
    posts: postsWithComments,
    currentPage: page,
    totalPages: totalPages,
  });
}

async function getCafeShoes(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);

  const page = parseInt(req.query.page) || 1;
  const perPage = 15;
  const totalPosts = await Post.countByKind("오뭐신");
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getByKindPaginated("오뭐신", page, perPage);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countByPostId(post._id);
      return { ...post, commentCount, isNew: post.date.startsWith(today) };
    })
  );

  res.render("cafe-shoes", {
    user,
    posts: postsWithComments,
    currentPage: page,
    totalPages: totalPages,
  });
}

async function getCafeLook(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);

  const page = parseInt(req.query.page) || 1;
  const perPage = 15;
  const totalPosts = await Post.countByKind("오늘의 룩");
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getByKindPaginated("오늘의 룩", page, perPage);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countByPostId(post._id);
      return { ...post, commentCount, isNew: post.date.startsWith(today) };
    })
  );

  res.render("cafe-look", {
    user,
    posts: postsWithComments,
    currentPage: page,
    totalPages: totalPages,
  });
}

async function getCafeSelect(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);

  const page = parseInt(req.query.page) || 1;
  const perPage = 15;
  const totalPosts = await Post.countByKind("골라줘");
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getByKindPaginated("골라줘", page, perPage);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countByPostId(post._id);
      return { ...post, commentCount, isNew: post.date.startsWith(today) };
    })
  );

  res.render("cafe-select", {
    user,
    posts: postsWithComments,
    currentPage: page,
    totalPages: totalPages,
  });
}

async function getCafeDrop(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);

  const page = parseInt(req.query.page) || 1;
  const perPage = 15;
  const totalPosts = await Post.countByKind("발매정보");
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getByKindPaginated("발매정보", page, perPage);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countByPostId(post._id);
      return { ...post, commentCount, isNew: post.date.startsWith(today) };
    })
  );

  res.render("cafe-drop", {
    user,
    posts: postsWithComments,
    currentPage: page,
    totalPages: totalPages,
  });
}

async function getCafeSale(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);

  const page = parseInt(req.query.page) || 1;
  const perPage = 15;
  const totalPosts = await Post.countByKind("세일정보");
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getByKindPaginated("세일정보", page, perPage);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countByPostId(post._id);
      return { ...post, commentCount, isNew: post.date.startsWith(today) };
    })
  );

  res.render("cafe-sale", {
    user,
    posts: postsWithComments,
    currentPage: page,
    totalPages: totalPages,
  });
}

async function getCafeFree(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);

  const page = parseInt(req.query.page) || 1;
  const perPage = 15;
  const totalPosts = await Post.countByKind("자유");
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getByKindPaginated("자유", page, perPage);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countByPostId(post._id);
      return { ...post, commentCount, isNew: post.date.startsWith(today) };
    })
  );

  res.render("cafe-free", {
    user,
    posts: postsWithComments,
    currentPage: page,
    totalPages: totalPages,
  });
}

async function getCafeEat(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);

  const page = parseInt(req.query.page) || 1;
  const perPage = 15;
  const totalPosts = await Post.countByKind("밥밥");
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getByKindPaginated("밥밥", page, perPage);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countByPostId(post._id);
      return { ...post, commentCount, isNew: post.date.startsWith(today) };
    })
  );

  res.render("cafe-eat", {
    user,
    posts: postsWithComments,
    currentPage: page,
    totalPages: totalPages,
  });
}

async function getCafeHumor(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);

  const page = parseInt(req.query.page) || 1;
  const perPage = 15;
  const totalPosts = await Post.countByKind("유머");
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getByKindPaginated("유머", page, perPage);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countByPostId(post._id);
      return { ...post, commentCount, isNew: post.date.startsWith(today) };
    })
  );

  res.render("cafe-humor", {
    user,
    posts: postsWithComments,
    currentPage: page,
    totalPages: totalPages,
  });
}

async function getCafeLife(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);

  const page = parseInt(req.query.page) || 1;
  const perPage = 15;
  const totalPosts = await Post.countByKind("일상");
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getByKindPaginated("일상", page, perPage);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countByPostId(post._id);
      return { ...post, commentCount, isNew: post.date.startsWith(today) };
    })
  );

  res.render("cafe-life", {
    user,
    posts: postsWithComments,
    currentPage: page,
    totalPages: totalPages,
  });
}

async function getCafeExercise(req, res) {
  const sessionUser = req.session.user;
  const user = await User.findByNickname(sessionUser.nickname);
  await User.incrementVisit(sessionUser.nickname);

  const page = parseInt(req.query.page) || 1;
  const perPage = 15;
  const totalPosts = await Post.countByKind("운동");
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getByKindPaginated("운동", page, perPage);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countByPostId(post._id);
      return { ...post, commentCount, isNew: post.date.startsWith(today) };
    })
  );

  res.render("cafe-exercise", {
    user,
    posts: postsWithComments,
    currentPage: page,
    totalPages: totalPages,
  });
}

// 게시물 등록📍📌📍📌
function getUploadPost(req, res) {
  res.render("upload-post");
}

// 게시물 등록📍📌
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

// 게시물 자세히📍📌
async function getCafePost(req, res) {
  const sessionUser = req.session.user;
  const postId = req.params.id;

  const user = await User.findByNickname(sessionUser.nickname);
  const post = await Post.getById(postId);

  if (!post) {
    return res.status(404).send("게시물을 찾을 수 없습니다.");
  }

  await Post.incrementViews(postId);

  const comments = await Comment.findByPostId(postId);

  res.render("post-detail", {
    user,
    post,
    profile: post.authorProfile,
    comments,
  });
}

// 댓글 등록📍📌
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

// 좋아요 기능📍📌
async function toggleLike(req, res) {
  const sessionUser = req.session.user;
  const postId = req.params.id;
  const userId = sessionUser.nickname;

  const result = await Post.updateLikes(postId, userId);

  if (!result) {
    return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
  }

  res.json(result);
}

// 게시물 수정 페이지📍📌
async function getEditPost(req, res) {
  const sessionUser = req.session.user;
  const postId = req.params.id;

  const user = await User.findByNickname(sessionUser.nickname);
  const post = await Post.getById(postId);

  if (!post) {
    return res.status(404).send("게시물을 찾을 수 없습니다.");
  }

  res.render("edit-post", {
    user,
    post,
    profile: post.authorProfile,
  });
}

// 게시물 수정📍📌
async function postEditPost(req, res) {
  const sessionUser = req.session.user;
  const postId = req.params.id;

  try {
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    const updatedPost = {
      post_kind: req.body.post_kind,
      title: req.body.title,
      content: req.body.content,
      images: imagePaths.length > 0 ? imagePaths : req.body.existingImages,
      previewImage: imagePaths[0] || req.body.existingImages[0] || null,
    };

    await Post.updateById(postId, updatedPost);
    console.log("게시물 수정 성공:", updatedPost);
    res.redirect(`/cafe/${postId}`);
  } catch (err) {
    console.error("게시물 수정 중 오류 발생:", err);
    res.status(500).send("게시물 수정 실패");
  }
}

// 게시물 삭제📍📌
async function deletePost(req, res) {
  const postId = req.params.id;

  try {
    const post = await Post.getById(postId);

    if (!post) {
      return res.status(404).send("게시물을 찾을 수 없습니다.");
    }

    if (post.images && post.images.length > 0) {
      post.images.forEach((imagePath) => {
        const filePath = path.join(__dirname, "..", imagePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await Post.deleteById(postId);
    console.log("게시물 삭제 성공:", postId);

    res.redirect("/my-page");
  } catch (err) {
    console.error("게시물 삭제 중 오류 발생:", err);
    res.status(500).send("게시물 삭제 실패");
  }
}

// 마이페이지📍📌
async function getMyPage(req, res) {
  const sessionUser = req.session.user;

  const user = await User.findByNickname(sessionUser.nickname);

  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const totalPosts = await Post.countByAuthor(sessionUser.nickname);
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getByAuthorPaginated(
    sessionUser.nickname,
    page,
    perPage
  );

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("my-page", {
    user,
    posts,
    currentPage: page,
    totalPages: totalPages,
  });
}

// 다른 유저 페이지📍📌
async function getUserPage(req, res) {
  const username = req.params.nickname;
  const user = await User.findByNickname(username);

  if (!user) {
    return res.status(404).send("해당 사용자를 찾을 수 없습니다.");
  }

  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const totalPosts = await Post.countByAuthor(username);
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await Post.getByAuthorPaginated(username, page, perPage);

  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  posts.forEach((post) => {
    post.isNew = post.date.startsWith(today);
  });

  res.render("user-page", {
    user,
    posts,
    currentPage: page,
    totalPages: totalPages,
  });
}

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
  toggleLike,
  getEditPost,
  postEditPost,
  deletePost,

  getMyPage,
  getUserPage,
};
