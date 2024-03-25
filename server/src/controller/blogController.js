const { Op } = require('sequelize')
const sequelize = require('../database/connectDbPg')
const db = require('../model/index')
const Blog = db.blog
const Tag = db.tag
const TagBlog = db.tag_blog
const User = db.user
const BlogRating = db.blogRating
const BlogComment = db.blogComment
const cloudinary = require("../utils/cloudinary");
class BlogController {
    static async createBlog(req, res) {
        try {
            const { title, content, userId, description, tags } = req.body;
            const thumbnail = req.file;

            if (!thumbnail) {
                return res.status(400).json({ message: "Thumbnail not found" });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const result = await cloudinary.uploader.upload(thumbnail.path, {
                upload_preset: 'vnldjdbe',
                public_id: `unique_id_${Date.now()}`
            });

            const newBlog = await Blog.create({
                title: title,
                content: content,
                thumbnail: result.url,
                description: description,
                userId: userId
            });

            const tagNames = tags.split(",");
            const foundOrCreateTags = await Promise.all(tagNames.map(async tagName => {
                const [tag] = await Tag.findOrCreate({
                    where: {
                        name: tagName.trim()
                    }
                });
                return tag;
            }));

            await newBlog.setTags(foundOrCreateTags);

            return res.status(200).json({ newBlog: newBlog });
        } catch (error) {
            return res.status(500).json({ message: "Can not create a new blog." });
        }
    }

    static async updateBlog(req, res) {
        try {
            const { id } = req.params;
            const { title, content, description, tags } = req.body;
            const thumbnail = req.file;

            const blog = await Blog.findByPk(id);
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            if (thumbnail) {
                const result = await cloudinary.uploader.upload(thumbnail.path, {
                    upload_preset: 'vnldjdbe',
                    public_id: `unique_id_${Date.now()}`
                });

                await blog.update({
                    title: title,
                    content: content,
                    description: description,
                    thumbnail: result.url,
                });
            } else {
                await blog.update({
                    title: title,
                    content: content,
                    description: description
                });
            }

            if (tags) {
                await blog.removeTags();

                const tagNames = tags.split(",");
                const foundOrCreateTags = await Promise.all(tagNames.map(async tagName => {
                    const [tag] = await Tag.findOrCreate({
                        where: {
                            name: tagName.trim()
                        }
                    });
                    return tag;
                }));
                await blog.setTags(foundOrCreateTags);
            }
            return res.status(200).json({ message: "Blog updated successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Can not update the blog." });
        }
    }

    static async getBlogById(req, res) {
        try {
            const id = req.params.id;
            const blog = await Blog.findByPk(id, {
                include: [
                    {
                        model: BlogRating,
                        attributes: [],
                    },
                    {
                        model: Tag,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                ],
                attributes: [
                    "id",
                    "title",
                    "thumbnail",
                    "description",
                    "content",
                    "createdAt",
                    [
                        sequelize.fn("AVG", sequelize.col("blog_ratings.rating")),
                        "avgRating"
                    ],
                ],
                group: [
                    "title",
                    "thumbnail",
                    "description",
                    "status",
                    "blog.id",
                    "tags.id",
                ],
            });

            if (!blog) {
                return res.status(404).json({ message: "Blog not found." });
            }

            return res.status(200).json({ blog: blog });
        } catch (error) {
            console.error(error); // Log the error for debugging
            return res.status(500).json({ message: "Something went wrong." });
        }
    }

    static async getBlogByUserId(req, res) {
        try {
            const { id } = req.params;
            const blogs = await Blog.findAll({
                where: { userId: id },
                include: {
                    model: Tag,
                    attributes: ['name']
                }
            });

            return res.status(200).json({ blogs: blogs });
        } catch (error) {
            return res.status(500).json({ message: "Can not get the blogs." });
        }
    }

    static async getAllBlog(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            let sort = req.query.sort || "desc"; // Default sort order if not provided
            const limit = 10;
            const offset = (page - 1) * limit;

            const blogs = await Blog.findAll({
                include: [
                    {
                        model: BlogRating,
                        attributes: [],
                    },
                    {
                        model: Tag,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                ],
                attributes: [
                    "id",
                    "title",
                    "thumbnail",
                    "description",
                    "content",
                    "createdAt",
                    [
                        sequelize.fn("AVG", sequelize.col("blog_ratings.rating")),
                        "avgRating"
                    ],
                ],
                group: [
                    "title",
                    "thumbnail",
                    "description",
                    "status",
                    "blog.id",
                    "tags.id",
                ],
                order: [["createdAt", sort]],
                offset: offset,
                limit: limit,
                subQuery: false,
            });

            res.status(200).json({ blogs: blogs });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Something went wrong." });
        }
    }

    static async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const blog = await Blog.findByPk(id);
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            await blog.update({ status: status });

            return res.status(200).json({ message: "Blog status updated successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Can not update the status of the blog." });
        }
    }

    static async searchBlogByTag(req, res) {
        try {
            const tagName = req.query.tag;

            const tags = await Tag.findAll({
                where: { name: { [Op.like]: `%${tagName}%` } },
                attributes: ['name'],
                include: { model: Blog, through: { attributes: [] } }
            });

            if (!tags || tags.length === 0) {
                return res.status(404).json({ message: "Tag not found" });
            }

            return res.status(200).json({ blogs: tags });
        } catch (error) {
            return res.status(500).json({ message: "Error searching blogs by tag" });
        }
    }

    static async ratingBlog(req, res) {
        try {
            const { blogId, userId, rating } = req.body;

            const blogRate = await BlogRating.findOne({ where: { blogId, userId } });
            console.log(blogRate);
            if (blogRate) {
                await BlogRating.update({ rating }, { where: { blogId, userId } });
                return res.status(200).json({ message: "Rating updated successfully" });
            } else {
                await BlogRating.create({
                    userId: userId,
                    blogId: blogId,
                    rating: rating,
                });
                return res.status(201).json({ message: "Rating created successfully" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async createCommentBlog(req, res) {
        try {
            const { content, userId, blogId } = req.body;
            const newComment = await BlogComment.create({
                content,
                userId,
                blogId,
            });

            if (newComment) {
                res.status(200).json({
                    message: "Comment created successfully",
                    comment: newComment,
                });
            } else {
                res.status(500).json({ message: "Failed to create comment" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong!" });
        }
    }
    static async getCommentsBlog(req, res) {
        try {
            const { id } = req.params;
            const comment = await BlogComment.findAll({
                where: { id },
                attributes: [
                    "id",
                    "content",
                    "total_votes",
                    "createdAt",
                    "userId",
                    "replyCommentId",
                ],
                include: [
                    {
                        model: User,
                        attributes: ["name", "avatar", "email"],
                    },
                ],
            });
            res.status(200).json({ comment });
        } catch (error) {
            res.status(500).json({ message: "somehitng went wrong" });
        }
    }
    static async replyCommentBlog(req, res) {
        try {
            const { date, content, userId, blogId, replyCommentId } = req.body;

            const dateObj = new Date(date)

            const newReply = await BlogComment.create({
                date: dateObj,
                content,
                userId,
                blogId,
                replyCommentId,
            });

            if (newReply) {
                res.status(200).json({ message: "Reply comment successfully" });
            } else {
                res.status(500).json({ message: "Failed to create reply" });
            }
        } catch (error) {
            console.error("Error creating reply:", error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    }

}
exports.BlogController = BlogController