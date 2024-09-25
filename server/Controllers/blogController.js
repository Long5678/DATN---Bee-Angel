const Blog = require('../Models/blogModel');

// Tạo bài blog mới
const createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const imageUrl = req.files && req.files.imageUrl ? `uploads/${req.files.imageUrl[0].filename}` : ''; // Sử dụng req.files cho nhiều tệp
        const videoUrl = req.files && req.files.videoUrl ? `uploads/${req.files.videoUrl[0].filename}` : ''; // Thêm videoUrl
        const newBlog = new Blog({ title, content, author, imageUrl,videoUrl });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog', error });
    }
};

// Lấy tất cả các bài blog
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
};


// Lấy một bài blog (tăng view)
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        blog.views += 1;  // Tăng số lượt xem mỗi lần blog được truy cập
        await blog.save();

        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);  // Log lỗi ra console để debug
        res.status(500).json({ message: 'Error fetching blog', error: error.message || error });
    }
};


// Cập nhật bài blog
const updateBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.author = author || blog.author;

        if (req.files && req.files.imageUrl) {
            blog.imageUrl = `uploads/${req.files.imageUrl[0].filename}`;
        }
        if (req.files && req.files.videoUrl) {
            blog.videoUrl = `uploads/${req.files.videoUrl[0].filename}`;  // Cập nhật videoUrl
        }

        await blog.save();
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog', error });
    }
};

// Xóa bài blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog', error });
    }
};

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog, getBlogById };
