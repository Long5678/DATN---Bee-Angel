const express = require('express');
const { createBlog, getBlogs, updateBlog, deleteBlog, getBlogById } = require('../Controllers/blogController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

// Tạo bài blog mới
router.post('/create', upload.fields([
    { name: 'imageUrl', maxCount: 5 },
    { name: 'videoUrl', maxCount: 1 }  //thêm video
]), createBlog);

// Lấy tất cả bài blog
router.get('/', getBlogs);

// Lấy một bài blog theo ID (tăng view)
router.get('/:id',  getBlogById);

// Cập nhật bài blog
router.put('/:id', upload.fields([
    { name: 'imageUrl', maxCount: 5 },
    { name: 'videoUrl', maxCount: 1 } 
]), updateBlog);

// Xóa bài blog
router.delete('/:id', deleteBlog);

module.exports = router;
