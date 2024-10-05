const Blog = require('../Models/blogModel');
const {
    initializeApp
} = require("firebase/app");
const {
    getStorage
} = require("firebase/storage");
const {
    getDownloadURL,
    ref,
    uploadBytesResumable,
    deleteObject
} = require('firebase/storage');
const firebaseConfig = require("../Configs/firebase.config");
const asyncHandler = require('express-async-handler');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storages = getStorage(app);

// Helper function to extract file names from URLs
const extractFileNameFromUrl = (url) => decodeURIComponent(url.split('/').pop().split('?')[0]);

// Tạo bài blog mới
const createBlog = asyncHandler(async (req, res) => {
    const {
        title,
        content,
        author
    } = req.body;

    const downloadImageURLs = [];
    const downloadVideoURLs = [];

    try {
        if (req.files && req.files['imageUrl']) {
            for (const file of req.files['imageUrl']) {
                const storageRef = ref(storages, `blogs/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                downloadImageURLs.push(downloadURL);
            }
        }

        if (req.files && req.files['videoUrl']) {
            for (const file of req.files['videoUrl']) {
                const storageRef = ref(storages, `blogs/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                downloadVideoURLs.push(downloadURL);
            }
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }

    const newBlog = new Blog({
        title,
        content,
        author,
        imageUrl: downloadImageURLs,
        videoUrl: downloadVideoURLs,
        datePosted: Date.now(),
        views: 0
    });

    await newBlog.save();
    res.status(201).json(newBlog);
});

// Lấy tất cả các bài blog
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
});

// Lấy một bài blog (tăng view)
const getBlogById = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({
        message: 'Blog not found'
    });

    blog.views += 1; // Increment the views by 1
    await blog.save();
    res.status(200).json(blog);
});

//newBlog
const getBlogsSortedByNewest = asyncHandler(async (req, res) => {
    const blogs = await Blog.find().sort({
        datePosted: -1
    }); // Sắp xếp giảm dần theo ngày đăng (mới nhất trước)
    res.status(200).json(blogs);
});


//oldBlog
const getBlogsSortedByOldest = asyncHandler(async (req, res) => {
    const blogs = await Blog.find().sort({
        datePosted: 1
    }); // Sắp xếp tăng dần theo ngày đăng (cũ nhất trước)
    res.status(200).json(blogs);
});



// Cập nhật bài blog
const updateBlog = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const {
        title,
        content,
        author
    } = req.body;
    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).json({
        message: 'Blog not found'
    });

    const updatedImageURLs = req.files && req.files['imageUrl'] ? [] : blog.imageUrl;
    const updatedVideoURLs = req.files && req.files['videoUrl'] ? [] : blog.videoUrl;

    try {
        // Xóa ảnh cũ nếu có tệp ảnh mới
        if (req.files && req.files['imageUrl']) {
            for (const imageURL of blog.imageUrl) {
                const imageFileName = extractFileNameFromUrl(imageURL);
                const imageRef = ref(storages, `blogs/${imageFileName}`);
                await deleteObject(imageRef);
            }

            // Upload ảnh mới
            for (const file of req.files['imageUrl']) {
                const storageRef = ref(storages, `blogs/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                updatedImageURLs.push(downloadURL);
            }
        }

        // Xóa video cũ nếu có tệp video mới
        if (req.files && req.files['videoUrl']) {
            for (const videoURL of blog.videoUrl) {
                const videoFileName = extractFileNameFromUrl(videoURL);
                const videoRef = ref(storages, `blogs/${videoFileName}`);
                await deleteObject(videoRef);
            }

            // Upload video mới
            for (const file of req.files['videoUrl']) {
                const storageRef = ref(storages, `blogs/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                updatedVideoURLs.push(downloadURL);
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error uploading new files",
            error: error.message
        });
    }

    // Cập nhật blog với các trường mới hoặc giữ nguyên trường cũ nếu không thay đổi
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.imageUrl = updatedImageURLs;
    blog.videoUrl = updatedVideoURLs;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
});

// Xóa bài blog
const deleteBlog = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;

    try {
        console.log(id);
        const blogdel = await Blog.findByIdAndDelete(id);
        // const tour = await TourModel.findById(id);
        // Find and delete the tour document in a single step

        // if (!tour) {
        //     return res.status(404).json({
        //         message: "Tour not found"
        //     });
        // }

        // Delete associated images and videos
        // for (const imageURL of tour.images) {
        //     const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
        //     const imageRef = ref(storages, imageFileName);
        //     await deleteObject(imageRef);
        // }

        // for (const videoURL of tour.videos) {
        //     const videoFileName = decodeURIComponent(videoURL.split('/').pop().split('?')[0]);
        //     const videoRef = ref(storages, videoFileName);
        //     await deleteObject(videoRef);
        // }

        res.status(200).json(blogdel);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getBlogsSortedByNewest,
    getBlogsSortedByOldest
};
