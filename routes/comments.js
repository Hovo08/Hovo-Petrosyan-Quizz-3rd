import express from 'express';
import controllers from "../controllers/controllerComment.js";
import checkToken from "../middleware/cheekToken.js";
import validate from "../middleware/validate.js";
import commentSchema from "../schemas/comment.js"; 

let router = express.Router();

router.post("/createPostComment",
  validate(commentSchema.create, "body"), 
  checkToken,
  controllers.createPostComment
);

router.get("/getPostComments/:postId", controllers.getPostComments);

router.get("/searchPost", controllers.searchPost);

export default router;
