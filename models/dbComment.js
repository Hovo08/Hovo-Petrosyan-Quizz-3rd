import connection from "../clients/db.mysql.js";

export default {
  createComment: async (data) => {
    try {
      const createCommentQuery = `
                INSERT INTO comments (post_id, user_id, comment_message) 
                VALUES (?, ?, ?)
            `;
      const [result] = await connection.query(createCommentQuery, [
        data.post_id,
        data.user_id,
        data.comment_message,
      ]);

      const commentId = result.insertId;

      const [newComment] = await connection.query(
        "SELECT * FROM comments WHERE id = ?",
        [commentId]
      );

      return newComment;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Could not create comment");
    }
  },

  getCommentsByPostId: async (postId, page, limit) => {
    const offset = (page - 1) * limit;
    const [rows] = await connection.query(
      `SELECT * FROM comments WHERE post_id = ? LIMIT ?, ?`,
      [postId, offset, limit]
    );
    return rows;
  },

  searchPostsByTitle: async (searchWord) => {
    const [rows] = await connection.query(
      `SELECT * FROM tasks WHERE title LIKE ?`,
      [`%${searchWord}%`]
    );
    return rows;
  },
};
