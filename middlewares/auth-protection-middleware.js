function guardRoute(req, res, next) {
    console.log("guardRoute 미들웨어 실행");
    console.log(req.session.isAuthenticated);
  if (!req.session.isAuthenticated) {
    return res.send(
      '<script>alert("로그인이 필요합니다."); window.location.href = "/login";</script>'
    );
  }
  next();
}

module.exports = guardRoute;
