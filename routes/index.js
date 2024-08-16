import { Router } from 'express'
import users from './users.js'
import posts from './post.js'
import comment from './comments.js'
const router = Router()
router.use("/", (req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

router.use('/users', users)
router.use('/post', posts)
router.use('/comment', comment)
export default router
