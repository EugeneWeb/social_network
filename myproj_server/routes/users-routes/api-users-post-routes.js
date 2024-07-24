const express = require("express");

const authMiddleware = require("../../middlewares/authMiddleware");
const { getPosts, addPost, deletePost, togglePostLikesCount, getCurrentUserPosts, getPostLikesCount } = require("../../controllers/users-controllers/api-users-post-controller");

const router = express.Router();

router.get('/posts', authMiddleware, getCurrentUserPosts)
router.get('/posts/:id', authMiddleware, getPosts)
router.post('/posts', authMiddleware, addPost)
router.delete('/post/:id', authMiddleware, deletePost)
router.post('/post/like/:id', authMiddleware, togglePostLikesCount)
router.get('/post/:id', authMiddleware, getPostLikesCount)

module.exports = router;
