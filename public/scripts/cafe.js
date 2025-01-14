document.addEventListener("DOMContentLoaded", () => {
  initializeCommentFeature();
  initializeLikeFeature();
  initializeProfileChangeFeature();
});

/* 댓글 기능 */
function initializeCommentFeature() {
  const form = document.getElementById("form-comment");
  if (!form) return;

  const commentInput = document.getElementById("comment");
  const commentList = document.getElementById("comment-list");

  form.addEventListener("submit", async (event) => {
    await handleCommentSubmit(event, form, commentInput, commentList);
  });
}

async function handleCommentSubmit(event, form, commentInput, commentList) {
  event.preventDefault();

  const comment = commentInput.value.trim();
  const postId = form.dataset.postId;

  if (!comment) {
    alert("댓글을 입력하세요.");
    return;
  }

  try {
    const response = await fetch(`/cafe/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });

    if (!response.ok) throw new Error("댓글 등록 실패");

    const newComment = await response.json();
    addCommentToList(newComment, commentList);
    commentInput.value = "";
  } catch (error) {
    console.error("댓글 처리 중 오류:", error);
  }
}

function addCommentToList(newComment, commentList) {
  const li = document.createElement("li");
  li.className = "comment-item";
  li.innerHTML = `
    <p class="user-info">${newComment.author}</p>
    <p class="comment">${newComment.comment}</p>
    <p class="date">${newComment.date}</p>
  `;
  commentList.appendChild(li);
}

/* 좋아요 기능 */
function initializeLikeFeature() {
  const heartButton = document.getElementById("heart-button");
  if (!heartButton) return;

  heartButton.addEventListener("click", async (event) => {
    await handleLikeClick(event);
  });
}

async function handleLikeClick(event) {
  event.preventDefault();

  const heartContainer = document.getElementById("heart-container");
  const postId = heartContainer.getAttribute("data-post-id");
  const heartImg = document.getElementById("heart");
  const likeCount = document.getElementById("like-count");

  try {
    const response = await fetch(`/cafe/${postId}/like`, {
      method: "POST",
    });

    if (!response.ok) throw new Error("좋아요 요청 실패");

    const data = await response.json();
    updateLikeUI(data, heartImg, likeCount);
  } catch (error) {
    console.error("좋아요 처리 중 오류:", error);
  }
}

function updateLikeUI(data, heartImg, likeCount) {
  likeCount.textContent = data.likes;
  heartImg.src = data.liked
    ? "/images/heart/heart_red.png"
    : "/images/heart/heart_empty.png";
}

