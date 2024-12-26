const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../data/database");

router.get("/sign-up", function (req, res) {
  res.render("sign-up", { error: {} });
});

router.post("/sign-up", async function (req, res) {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;
  const enteredConfirmPassword = req.body.confirmpassword;
  const enteredName = req.body.name;
  const enteredNickName = req.body.nickname;

  const error = {};

  const existingUser = await db.getDb().collection("users").findOne({
    email: enteredEmail,
  });

  if (existingUser) {
    console.log(existingUser);
    error.emailMessage = "해당 이메일의 계정이 존재합니다.";
  }

  if (!enteredEmail) {
    error.emailMessage = "이메일(아이디)을 입력하세요.";
  }

  if (!enteredPassword) {
    error.passwordMessage = "비밀번호를 입력하세요.";
  }

  if (enteredPassword != enteredConfirmPassword) {
    error.confirmpasswordMessage = "비밀번호를 재확인하세요.";
  }

  if (!enteredName) {
    error.nameMessage = "이름을 입력하세요.";
  }

  if (!enteredNickName) {
    error.nicknameMessage = "닉네임을 입력하세요.";
  }

  const existingNickname = await db.getDb().collection("users").findOne({
    nickname: enteredNickName,
  });

  if (existingNickname) {
    error.nicknameMessage = "해당 닉네임이 존재합니다.";
  }

  if (Object.keys(error).length > 0) {
    return res.render("sign-up", { error });
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getDate()}`;

  const newUser = {
    email: enteredEmail,
    password: hashedPassword,
    name: enteredName,
    nickname: enteredNickName,
    date: formattedDate,
  };

  const result = await db.getDb().collection("users").insertOne(newUser);
  console.log(result);

  res.redirect("login");
});

router.get("/login", function (req, res) {
  res.render("login", { error: {} });
});

router.post("/login", async function (req, res) {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  const error = {};

  if (!enteredEmail) {
    error.emailMessage = "이메일(아이디)을 입력하세요.";
  }

  if (!enteredPassword) {
    error.passwordMessage = "비밀번호를 입력하세요.";
  }

  if (!existingUser) {
    error.emailMessage = "해당 이메일의 계정이 존재하지 않습니다.";
    return res.render("login", { error });
  }

  const hashedPasswordEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!hashedPasswordEqual) {
    error.passwordMessage = "비밀번호가 일치하지 않습니다.";
    return res.render("login", { error });
  }

  req.session.user = {
    id: existingUser._id,
    email: existingUser.email.toString(),
    nickname: existingUser.nickname.toString(),
  };

  req.session.isAuthenticated = true;

  req.session.save((error) => {
    if (error) {
      console.log("세션 저장 오류 : ", error);
    }
    console.log("로그인 성공");
    res.redirect("/");
  });
});

router.post("/logout", function (req, res) {
  req.session.destroy(() => {
    res.send(
      `<script>alert("로그아웃 되었습니다"); window.location.href="/";</script>`
    );
  });
});

module.exports = router;
