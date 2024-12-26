const express = require("express");
const router = express.Router();
const guardRoute = require('../middlewares/auth-protection-middleware');

const db = require("../data/database");

router.use(guardRoute);

router.get("/cafe", async function (req, res) {
  const sessionUser = req.session.user;

  const user = await db
    .getDb()
    .collection("users")
    .findOne({ nickname: sessionUser.nickname });

  console.log(user);

  res.render('cafe', {user:user});
});

router.get('/upload-post', function(req, res) {
  res.render('upload-post');
})

router.post('/upload-post', async function(req, res) {
  const newPost = {
    post_kind : req.body.post_kind,
    title : req.body.title,
    content : req.body.content,
    author : req.session.user.nickname
  };

  await db.getDb().collection('posts').insertOne(newPost);
  console.log(newPost)
  res.redirect('cafe');
});

module.exports = router;
