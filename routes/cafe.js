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

module.exports = router;
