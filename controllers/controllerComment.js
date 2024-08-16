import db from "../models/dbComment.js"; 

export default {
  async createPostComment(req, res) {
    try {
      const { postId, commentMessage } = req.body;
      const userId = req.user.id; 
      const newComment = {
        post_id: postId,
        user_id: userId,
        comment_message: commentMessage,
      };

      const data = await db.createComment(newComment);

      res
        .status(201)
        .json({ message: "Comment created successfully", comment: data });
    } catch (e) {
      console.error("Error creating comment:", e);
      res.status(500).json({ message: e.message });
    }
  },

  async getPostComments(req, res) {
    try {
      const { postId } = req.params;
      const { page = 1, limit = 10 } = req.query; a

      const data = await db.getCommentsByPostId(postId, page, limit);
      if (!data) {
        return res.status(404).json({ message: "Comments not found" });
      }

      res.status(200).json({ status: "success", comments: data });
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async searchPost(req, res) {
    try {
      const { searchWord } = req.query;
      const data = await db.searchPostsByTitle(searchWord);

      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No posts found" });
      }

      res.status(200).json({ status: "success", posts: data });
    } catch (error) {
      console.error("Error searching posts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
