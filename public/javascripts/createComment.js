document
  .querySelector("#comment-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const commentMessage = document.querySelector("#commentMessage").value;
    const postId = document.querySelector("#postId").value;
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "/post/createPostComment",
        { postId, commentMessage },
        {
          headers: { "x-token": token },
        }
      );
      alert("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  });
