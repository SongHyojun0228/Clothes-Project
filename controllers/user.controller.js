const User = require("../models/user.model");

function getSignup(req, res) {
  res.render("sign-up", { error: {} });
}

async function Signup(req, res) {
  const {
    email,
    password,
    confirmpassword,
    name,
    nickname,
    postcode,
    roadAddress,
    jibunAddress,
    detailAddress,
    extraAddress,
  } = req.body;

  console.log("Received body:", req.body);

  const error = {};

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    error.emailMessage = "해당 이메일의 계정이 존재합니다.";
  }

  if (!email) {
    error.emailMessage = "이메일(아이디)을 입력하세요.";
  }

  if (!password) {
    error.passwordMessage = "비밀번호를 입력하세요.";
  } else {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*[0-9!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
      error.passwordMessage =
        "비밀번호는 영어, 숫자, 특수기호 중 2가지 이상을 포함하고 8-16자 사이여야 합니다.";
    }
  }

  if (password !== confirmpassword) {
    error.confirmpasswordMessage = "비밀번호를 재확인하세요.";
  }

  if (!name) {
    error.nameMessage = "이름을 입력하세요.";
  }

  if (!nickname) {
    error.nicknameMessage = "닉네임을 입력하세요.";
  }

  const existingNickname = await User.findByNickname(nickname);
  if (existingNickname) {
    error.nicknameMessage = "해당 닉네임이 존재합니다.";
  }

  if (Object.keys(error).length > 0) {
    return res.render("sign-up", { error });
  }

  const addresses = {
    postcode,
    roadAddress,
    jibunAddress,
    detailAddress,
    extraAddress,
  };

  const newUser = new User(email, password, name, nickname, null, 0, addresses);
  await newUser.save();

  res.redirect("login");
}

function getLogin(req, res) {
  res.render("login", { error: {} });
}

async function Login(req, res) {
  const { email, password } = req.body;
  const error = {};

  if (!email) {
    error.emailMessage = "이메일(아이디)을 입력하세요.";
  }

  if (!password) {
    error.passwordMessage = "비밀번호를 입력하세요.";
  }

  const existingUser = await User.findByEmail(email);
  if (!existingUser) {
    error.emailMessage = "해당 이메일의 계정이 존재하지 않습니다.";
    return res.render("login", { error });
  }

  const isPasswordCorrect = await User.verifyPassword(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
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
      console.log("세션 저장 오류:", error);
    }
    console.log("로그인 성공");
    res.redirect("/");
  });
}

function Logout(req, res) {
  req.session.destroy(() => {
    res.send(
      `<script>alert("로그아웃 되었습니다"); window.location.href="/";</script>`
    );
  });
}

module.exports = {
  getSignup,
  Signup,
  getLogin,
  Login,
  Logout,
};
