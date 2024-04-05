const router = require("express").Router();
const { BlogController } = require("../controller/blogController");
const upload = require('../utils/storageImg')

router.post("/create", upload.single('thumbnail'), BlogController.createBlog);
router.patch("/update/:id", upload.single('thumbnail'), BlogController.updateBlog);
router.patch("/change-status/:id", BlogController.updateStatus);
router.get("/get/:id", BlogController.getBlogById);
router.get("/get-by-user/:id", BlogController.getBlogByUserId);
router.get("/get-all", BlogController.getAllBlog);
router.get("/search-tag", BlogController.searchBlogByTag);
router.get("/get-blogs-highest", BlogController.GetBlogHighRate)
router.post("/rating-blog", BlogController.ratingBlog);
router.post("/comment-blog", BlogController.createCommentBlog);
router.get("/get-comment-blog/:id", BlogController.getCommentsBlog);
router.post("/reply-comment-blog", BlogController.replyCommentBlog);
router.post("/auto-create", BlogController.autoCreateBlog)

module.exports = router;