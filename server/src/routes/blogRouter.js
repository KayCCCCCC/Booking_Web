const router = require("express").Router();
const { BlogController } = require("../controller/blogController");
const upload = require('../utils/storageImg')

router.post("/create", upload.single('thumbnail'), BlogController.createBlog);
router.patch("/update/:id", upload.single('thumbnail'), BlogController.updateBlog);
router.patch("/change-status/:id", BlogController.updateStatus);
router.get("/get/:id", BlogController.getBlogById);
router.get("/get-by-user/:id", BlogController.getBlogByUserId);
router.get("/get-all", BlogController.getAllBlogs);
router.get("/search-tag", BlogController.searchBlogByTag);

module.exports = router;