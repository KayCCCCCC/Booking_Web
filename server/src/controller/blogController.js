const { Op } = require('sequelize')
const db = require('../model/index')
const Blog = db.blog
const Tag = db.tag
const TagBlog = db.tag_blog
const User = db.user
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
            const { id } = req.params;
            const blog = await Blog.findByPk(id, {
                include: {
                    model: Tag,
                    attributes: ['name']
                }
            });

            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            return res.status(200).json({ blog: blog });
        } catch (error) {
            return res.status(500).json({ message: "Can not get the blog." });
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

    static async getAllBlogs(req, res) {
        try {
            const blogs = await Blog.findAll({
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
}
exports.BlogController = BlogController