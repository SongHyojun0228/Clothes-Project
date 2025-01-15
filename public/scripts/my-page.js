document.addEventListener("DOMContentLoaded", () => {
  initializeProfileChangeFeature();
  initializeDefaultProfileFeature();
});

/* 프로필 변경 버튼 기능 */
function initializeProfileChangeFeature() {
  const profileChangeTextElement = document.getElementById("profile-btn");
  const profileChangeInputElement = document.getElementById("profileImg");
  const profilePreviewElement = document.getElementById("profile-preview");
  const profileBtnContainerElement = document.getElementById(
    "profile-btn-container"
  );
  const profileCancelBtnElement = document.getElementById("cancel-btn");
  const profileSaveBtnElement = document.getElementById("save-btn");

  if (
    !profileChangeTextElement ||
    !profileChangeInputElement ||
    !profilePreviewElement ||
    !profileBtnContainerElement ||
    !profileCancelBtnElement ||
    !profileSaveBtnElement
  ) {
    console.error("필수 요소를 찾을 수 없습니다.");
    return;
  }

  let originalProfileSrc = profilePreviewElement.src; 

  profileChangeTextElement.addEventListener("click", () => {
    profileChangeInputElement.click();
  });

  profileChangeInputElement.addEventListener("change", (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("JPG, JPEG, WEBP, PNG, GIF 파일만 업로드 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        profilePreviewElement.src = e.target.result;
        profilePreviewElement.style.display = "block";
      };
      reader.readAsDataURL(file);

      profileBtnContainerElement.style.display = "block";
      profileChangeTextElement.style.display = "none";
    }
  });

  profileCancelBtnElement.addEventListener("click", () => {
    profilePreviewElement.src = originalProfileSrc;
    profileBtnContainerElement.style.display = "none";
    profileChangeTextElement.style.display = "block";
    profileChangeInputElement.value = "";
  });

  profileSaveBtnElement.addEventListener("click", async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const file = profileChangeInputElement.files[0];

    if (!file) {
      alert("프로필 사진을 선택하세요.");
      return;
    }

    formData.append("profileImg", file);

    try {
      const response = await fetch("/profile-change", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("프로필 변경 실패");

      const data = await response.json();
      alert("프로필 사진이 변경되었습니다.");
      profilePreviewElement.src =
        data.profileImg + "?timestamp=" + new Date().getTime();
      originalProfileSrc = profilePreviewElement.src; 
      profileBtnContainerElement.style.display = "none";
      profileChangeTextElement.style.display = "block";
    } catch (error) {
      console.error("프로필 변경 중 오류 발생:", error);
    }
  });
}

/* 기본 프로필 변경 기능 */
function initializeDefaultProfileFeature() {
  const defaultProfileBtn = document.getElementById("default-btn");
  const defaultProfileText = document.getElementById("default-text");
  const profilePreviewElement = document.getElementById("profile-preview");

  if (!defaultProfileBtn || !defaultProfileText) {
    console.error("❌ 기본 프로필 변경 요소를 찾을 수 없습니다.");
    return;
  }

  defaultProfileText.addEventListener("click", () => {
    defaultProfileBtn.click();
  });

  defaultProfileBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/delete-profile", { method: "POST" });

      if (!response.ok) throw new Error("기본 프로필 변경 실패");

      alert("기본 프로필로 변경되었습니다.");
      profilePreviewElement.src = "/images/profile/default_profile.png";
    } catch (error) {
      console.error("기본 프로필 변경 중 오류 발생:", error);
    }
  });
}
