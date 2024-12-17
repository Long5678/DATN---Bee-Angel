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
    getMetadata,
    uploadBytesResumable,
    deleteObject
} = require('firebase/storage');
const firebaseConfig = require("../Configs/firebase.config");
const asyncHandler = require('express-async-handler');
// const SeoChecker = require("seo-checker");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storages = getStorage(app);



// Tạo bài blog mới
const createBlog = asyncHandler(async (req, res) => {
    const {
        title,
        content,
        author,
        tags,
        metaTitle,
        metaDescription
    } = req.body;
    const slug = title.toLowerCase().split(' ').join('-'); // Tạo slug URL thân thiện SEO

    const uploadImages = [];
    const uploadVideo = [];

    try {

        const existingBlog = await Blog.findOne({
            slug
        });
        if (existingBlog) {
            // Nếu tồn tại, tạo slug mới bằng cách thêm số đếm vào cuối slug
            slug = `${slug}-${Date.now()}`;
        }
        if (req.files && req.files['imageUrl']) {
            for (const file of req.files['imageUrl']) {
                const storageRef = ref(storages, `blogs/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                // downloadImageURLs.push(downloadURL);
                uploadImages.push(file.originalname)
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
                // downloadVideoURLs.push(downloadURL);
                uploadVideo.push(file.originalname)
            }
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }

    const newBlog = new Blog({
        title,
        content,
        author,
        slug,
        tags: tags || [],
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || content.substring(0, 150),
        imageUrl: uploadImages,
        videoUrl: uploadVideo,
        // datePosted: new Date(),
    });


    await newBlog.save();
    res.status(201).json({
        newBlog
    });
});

// Lấy tất cả các bài blog
const getBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find(); // Fetch all blogs from the database
        if (blogs.length === 0) {
            return res.status(404).json({
                message: "No blogs found."
            });
        }
        res.status(200).json(blogs); // Send the blogs as a response
    } catch (error) {
        res.status(500).json({
            message: "Error fetching blogs.",
            error: error.message
        });
    }
});

// Lấy một bài blog (tăng view)
const getBlogById = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;



    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        blog.views += 1; // Increment the views
        await blog.save();

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
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



const updateBlog = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const {
        title,
        content,
        author,
        tags,
        metaTitle,
        metaDescription
    } = req.body;

    const existingImages = JSON.parse(req.body.existingImages || '[]');

    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({
            message: 'Blog not found'
        });
    }

    let updatedVideos = [blog.videoUrl[0]];



    try {
        // Nếu có ảnh mới, tải lên và thêm vào danh sách ảnh
        if (req.files && req.files['imageUrl']) {
            for (const file of req.files['imageUrl']) {
                const storageRef = ref(storages, `blogs/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                existingImages.push(file.originalname); // Thêm URL ảnh mới vào danh sách ảnh
                console.log("Đã up ảnh mới:", downloadURL);
            }
        }

        // Nếu có video mới, tải lên và thêm vào danh sách video
        if (req.files && req.files['videoUrl']) {
            for (const file of req.files['videoUrl']) {
                const storageRef = ref(storages, `blogs/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                updatedVideos = []; // tạo mảng mới để mất cái dữ liệu ban đầu đi
                updatedVideos.push(file.originalname); // Thêm URL video mới vào danh sách video
                console.log("Đã up video mới:", downloadURL);
            }
        }



        if (req.files && req.files['imageUrl']) {
            for (const imageURL of blog.imageUrl) {
                console.log("logImage", imageURL);
                console.log("existingImages", existingImages);

                // Lọc các ảnh cũ mà người dùng muốn giữ lại
                const remainingOldImages = blog.imageUrl.filter(image => existingImages.includes(image));

                console.log("remainingOldImages:", remainingOldImages); // Log danh sách ảnh cũ được giữ lại

                const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);

                // Kiểm tra xem ảnh này có đang được sử dụng bởi blog nào khác không
                const isImageUsedByOtherBlogs = await Blog.exists({
                    imageUrl: imageURL,
                    _id: {
                        $ne: id
                    }
                });

                // Nếu ảnh không được sử dụng bởi blog nào khác, kiểm tra và xóa
                if (!isImageUsedByOtherBlogs) {
                    console.log("Ảnh này không được dùng bởi blog nào khác, sẽ xóa:", imageFileName);

                    try {
                        // Tạo tham chiếu tới ảnh trong Firebase Storage
                        const imageRef = ref(storages, `blogs/${imageFileName}`);

                        // Kiểm tra ảnh có tồn tại trong Firebase Storage không
                        const metadata = await getMetadata(imageRef); // Kiểm tra metadata để xác nhận ảnh tồn tại
                        if (metadata) {
                            // Nếu ảnh tồn tại, tiến hành xóa
                            await deleteObject(imageRef);
                            console.log("Đã xóa ảnh:", imageFileName);
                        }
                    } catch (error) {
                        // Nếu ảnh không tồn tại (lỗi object-not-found), thông báo không cần xóa
                        if (error.code === 'storage/object-not-found') {
                            console.log("Ảnh không tồn tại trong Firebase Storage, không cần xóa:", imageFileName);
                        } else {
                            // Ném lỗi khác nếu có
                            console.error("Lỗi khi xóa ảnh:", error.message);
                            throw error;
                        }
                    }
                }
            }
        }



    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }



    // Update blog fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.slug = title ? title.toLowerCase().split(' ').join('-') : blog.slug;
    blog.tags = tags || blog.tags;
    blog.metaTitle = metaTitle || blog.metaTitle;
    blog.metaDescription = metaDescription || blog.metaDescription;
    blog.imageUrl = existingImages.length ? existingImages : blog.imageUrl;
    //  blog.videoUrl = updatedVideos || blog.videoUrl;
    blog.videoUrl = updatedVideos.length > 0 ? updatedVideos : blog.videoUrl;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);


});

// Lấy một bài blog theo slug
const getBlogBySlug = asyncHandler(async (req, res) => {
    const {
        slug
    } = req.params; // Lấy slug từ URL

    try {
        const blog = await Blog.findOne({
            slug
        }); // Tìm blog theo slug
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        blog.views += 1; // Tăng số lượt xem khi xem bài viết
        await blog.save();

        res.status(200).json(blog); // Trả về bài blog
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


const deleteBlog = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;

    // Kiểm tra nếu không có id
    if (!id) {
        return res.status(400).json({
            message: "Blog ID is required."
        });
    }

    const blogdel = await Blog.findByIdAndDelete(id);

    // Kiểm tra nếu không tìm thấy blog
    if (!blogdel) {
        return res.status(404).json({
            message: "Blog not found."
        });
    }

    try {
        // Xử lý xóa ảnh
        for (const imageURL of blogdel.imageUrl) {
            const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
            const isImageUsedByOtherBlogs = await Blog.exists({
                images: imageURL,
                _id: {
                    $ne: id
                }
            });

            if (!isImageUsedByOtherBlogs) {
                const imageRef = ref(storages, `blogs/${imageFileName}`);
                await deleteObject(imageRef);
            }
        }

        // Xử lý xóa video
        for (const videoURL of blogdel.videoUrl) {
            const videoFileName = decodeURIComponent(videoURL.split('/').pop().split('?')[0]);
            const isVideoUsedByOtherBlogs = await Blog.exists({
                videos: videoURL,
                _id: {
                    $ne: id
                }
            });

            if (!isVideoUsedByOtherBlogs) {
                const videoRef = ref(storages, `blogs/${videoFileName}`);
                await deleteObject(videoRef);
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

    console.log("Xóa thành công");
    res.status(200).json({
        message: "Blog deleted successfully.",
        blogdel
    });
});


// Search blogs by title
const searchBlogsByTitle = asyncHandler(async (req, res) => {
    const {
        title
    } = req.query;

    if (!title) {
        return res.status(400).json({
            message: "Title is required for search."
        });
    }

    try {
        const blogs = await Blog.find({
            title: {
                $regex: new RegExp(title, "i")
            } // Case-insensitive search
        });

        if (blogs.length === 0) {
            return res.status(404).json({
                message: "No blogs found with that title."
            });
        }

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({
            message: "Error while searching blogs.",
            error: error.message
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
    getBlogsSortedByOldest,
    searchBlogsByTitle,
    getBlogBySlug
};
