document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-comment");
  const commentInput = document.getElementById("comment");
  const commentList = document.getElementById("comment-list");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const comment = commentInput.value.trim();
    const postId = form.dataset.postId;

    if (!comment) {
      alert("댓글을 입력하세요.");
      return;
    }

    const response = await fetch(`/cafe/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });

    const newComment = await response.json();
    const li = document.createElement("li");
    li.className = "comment-item";
    li.innerHTML = `
      <p class="user-info">${newComment.author}
        <p class="comment">${newComment.comment}</p>
        <p class="date">${newComment.date}</p>
      `;
    commentList.appendChild(li);
    commentInput.value = "";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const heartButton = document.getElementById("heart-button");

  if (heartButton) {
    heartButton.addEventListener("click", async (event) => {
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
        likeCount.textContent = data.likes;
        heartImg.src = data.liked
          ? "/images/heart/heart_red.png"
          : "/images/heart/heart_empty.png";
      } catch (error) {
        console.error("좋아요 처리 중 오류:", error);
      }
    });
  }
});
