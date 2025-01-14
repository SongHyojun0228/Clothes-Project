const fs = require("fs");
const multer = require("multer");
const path = require("path");
const User = require("../models/user.model");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.session.user.nickname}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({ storage: storage });

async function changeProfile(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "파일이 업로드되지 않았습니다." });
  }

  try {
    const profileImgUrl = `/uploads/profiles/${req.file.filename}`;
    await User.updateProfileImg(req.session.user.nickname, profileImgUrl);

    res.json({
      message: "프로필 사진이 변경되었습니다.",
      profileImg: profileImgUrl,
    });
  } catch (error) {
    console.error("프로필 업데이트 실패:", error);
    res
      .status(500)
      .json({ message: "서버 오류가 발생했습니다. 다시 시도해주세요." });
  }
}

async function deleteProfile(req, res) {
  try {
    const defaultProfileImgUrl = "/images/profile/default_profile.png";

    const user = await User.findByNickname(req.session.user.nickname);
    if (user.profileImg && user.profileImg !== defaultProfileImgUrl) {
      const filePath = `./public${user.profileImg}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await User.updateProfileImg(
      req.session.user.nickname,
      defaultProfileImgUrl
    );

    res.send(`
        <script>
          alert("기본 프로필로 변경되었습니다.");
          window.location.href = "/my-page";
        </script>
      `);
  } catch (error) {
    console.error("기본 프로필로 변경 실패:", error);
    res.send(`
        <script>
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
          window.location.href = "/my-page";
        </script>
      `);
  }
}

module.exports = { deleteProfile, changeProfile, upload };
