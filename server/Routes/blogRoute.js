const express = require('express');
const {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    getBlogById,
    getBlogsSortedByNewest,
    getBlogsSortedByOldest,
    searchBlogsByTitle,
    getBlogBySlug,
} = require('../Controllers/blogController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

// Tạo bài blog mới
router.post('/create', upload.fields([{
        name: 'imageUrl',
        maxCount: 3
    },
    {
        name: 'videoUrl',
        maxCount: 1
    } //thêm video
]), createBlog);


// Tìm bài blog theo slug
router.get('/slug/:slug', getBlogBySlug);
// Lấy tất cả bài blog
router.get('/getAll', getBlogs);

// Lấy một bài blog theo ID (tăng view)
router.get('/:id', getBlogById);

// Cập nhật bài blog
router.put('/edit/:id', upload.fields([{
        name: 'imageUrl',
        maxCount: 3
    },
    {
        name: 'videoUrl',
        maxCount: 1
    }
]), updateBlog);

// Xóa bài blog
router.delete('/:id', deleteBlog);

// Lấy bài blog mới nhất (mới nhất trước)
router.get('/sorted/newest', getBlogsSortedByNewest);

// Lấy bài blog cũ nhất (cũ nhất trước)
router.get('/sorted/oldest', getBlogsSortedByOldest);

// Tìm kiếm bài blog
router.get('/search/title', searchBlogsByTitle);

module.exports = router;
