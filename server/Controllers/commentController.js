const asyncHandler = require('express-async-handler');
const Comment = require('../Models/commentModel');
const Reply = require('../Models/replyModel')
const TourModel = require('../Models/tourModel')
const {
    vi
} = require('../Configs/badword.config')
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
const commentModel = require('../Models/commentModel');

const app = initializeApp(firebaseConfig);
const storages = getStorage(app);


// Hàm lọc bình luận
function filterBadWords(content) {
    const regex = new RegExp(`\\b(${vi.join('|')})\\b`, 'gi');

    return content.replace(regex, '***');
}


// Từ khóa để auto reply
// const employeeUserId = '66fa5d974c173b4285a5dc2d';
const employeeUserId = '66fa5d974c173b4285a5dc2d';
const autoReplyMessage = 'Cảm ơn bạn đã bình luận.';

// create Comment
const createComment = asyncHandler(async (req, res) => {
    const {
        userId,
        content,
        tourId
    } = req.body;

    const downloadImageUrl = [];

    try {
        if (req.files && req.files['image']) {
            console.log('Files found:', req.files['image'].length);
            for (const file of req.files['image']) {
                const storageRef = ref(storages, `comments/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                if (downloadURL) {
                    console.log('Download URL:', downloadURL);
                    downloadImageUrl.push(file.originalname);
                } else {
                    console.log('Failed to get download URL for:', file.originalname);
                }

            }
        }
        const cleanWord = filterBadWords(content.toLowerCase());


        // Tạo bình luận mới
        const comment = new Comment({
            userId: userId,
            tourId: tourId,
            content: cleanWord,
            image: downloadImageUrl // Lưu URL của ảnh vào comment nếu có
        });
        await comment.save();

        // Tạo phản hồi tự động cho bình luận
        const autoReply = new Reply({
            userId: employeeUserId,
            comment: comment._id,
            content: autoReplyMessage,
            userName: "Long nhân viên"
        });
        await autoReply.save();

        // Thêm phản hồi vào bình luận
        comment.replies.push(autoReply);
        await comment.save();

        // Trả về bình luận với phản hồi tự động
        res.status(201).json(comment);
    } catch (err) {
        console.error('Lỗi tạo bình luận hoặc phản hồi tự động:', err);
        res.status(500).json({
            error: 'Lỗi tạo bình luận hoặc phản hồi tự động'
        });
    }
});

// const updateComment = asyncHandler(async (req, res) => {
//     const {
//         commentId,
//         content
//     } = req.body;
//     const existingImages = JSON.parse(req.body.existingImages || '[]'); // danh sách ảnh còn giữ lại
//     const comment = await commentModel.findById(commentId);

//     try {
//         // Thêm ảnh mới
//         if (req.files && req.files['image']) {
//             for (const file of req.files['image']) {
//                 const storageRef = ref(storages, `comments/${file.originalname}`);
//                 const metadata = {
//                     contentType: file.mimetype
//                 };
//                 const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
//                 const downloadURL = await getDownloadURL(snapshot.ref);
//                 existingImages.push(file.originalname); // Thêm URL ảnh mới vào danh sách
//                 console.log("Đã up ảnh mới:", downloadURL);
//             }
//         }

//         // Xóa ảnh cũ không còn sử dụng
//         for (const imageURL of comment.image) {
//             const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);

//             // Kiểm tra xem ảnh có còn nằm trong existingImages không
//             if (!existingImages.includes(imageFileName)) {
//                 const isImageUsedByOtherComments = await commentModel.exists({
//                     image: imageURL,
//                     _id: {
//                         $ne: commentId
//                     }
//                 });

//                 if (!isImageUsedByOtherComments) {
//                     console.log("Xóa ảnh không dùng:", imageFileName);
//                     const imageRef = ref(storages, `comments/${imageFileName}`);
//                     await deleteObject(imageRef);
//                 }
//             }
//         }

//         // Cập nhật nội dung bình luận và danh sách ảnh
//         const cleanWord = filterBadWords(content.toLowerCase());
//         comment.image = existingImages;
//         comment.content = cleanWord || comment.cleanWord;
     

//         // Lưu thay đổi
//         const updatedComment = await comment.save();
//         res.status(200).json(updatedComment);
//     } catch (error) {
//         console.error("Lỗi cập nhật bình luận:", error.message);
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });


// xóa bình luận


const updateComment = asyncHandler(async (req, res) => {
    const {
        commentId,
        content
    } = req.body;
    const existingImages = JSON.parse(req.body.existingImages || '[]'); // danh sách ảnh còn giữ lại
    const comment = await commentModel.findById(commentId);

    try {
        // Thêm ảnh mới
        if (req.files && req.files['image']) {
            for (const file of req.files['image']) {
                const storageRef = ref(storages, `comments/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                existingImages.push(file.originalname); // Thêm URL ảnh mới vào danh sách
                console.log("Đã up ảnh mới:", downloadURL);
            }
        }

        // Xóa ảnh cũ không còn sử dụng
        for (const imageURL of comment.image) {
            const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);

            // Kiểm tra xem ảnh có còn nằm trong existingImages không
            if (!existingImages.includes(imageFileName)) {
                const isImageUsedByOtherComments = await commentModel.exists({
                    image: imageURL,
                    _id: {
                        $ne: commentId
                    }
                });

                if (!isImageUsedByOtherComments) {
                    console.log("Xóa ảnh không dùng:", imageFileName);
                    const imageRef = ref(storages, `comments/${imageFileName}`);
                    await deleteObject(imageRef);
                }
            }
        }

        // Cập nhật nội dung bình luận và danh sách ảnh
        const cleanWord = filterBadWords(content.toLowerCase());
        comment.image = existingImages;
        comment.content = cleanWord || comment.cleanWord;

        // Lưu thay đổi
        const updatedComment = await comment.save();

        // Lấy toàn bộ thông tin của các replies và trả về thông tin đã populate
        const populatedComment = await commentModel.findById(updatedComment._id).populate('replies');

        res.status(200).json(populatedComment); // Trả về comment với thông tin replies đã populate
    } catch (error) {
        console.error("Lỗi cập nhật bình luận:", error.message);
        res.status(500).json({
            message: error.message
        });
    }
});


const deleteComment = asyncHandler(async (req, res) => {
    const {
        commentId
    } = req.params;

    try {
        // Tìm bình luận và kiểm tra
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                error: 'Không tìm thấy bình luận'
            });
        }

        // Xóa các ảnh trong Firebase Storage nếu có
        if (comment.image && comment.image.length > 0) {
            for (const imageUrl of comment.image) {
                try {
                    // Trích xuất đường dẫn từ URL đầy đủ
                    const decodedUrl = decodeURIComponent(imageUrl);
                    const filePath = decodedUrl.split('/o/')[1].split('?alt=media')[0]; // Lấy phần 'comments/filename.jpg'
                    const imageRef = ref(storages, imageUrl);
                    await deleteObject(imageRef);
                    console.log(`Đã xóa ảnh: ${filePath}`);
                } catch (error) {
                    console.error(`Lỗi xóa ảnh: ${imageUrl}`, error);
                }
            }
        }

        // Xóa các phản hồi liên quan
        await Reply.deleteMany({
            comment: commentId
        });

        // Xóa bình luận
        await comment.deleteOne();
        res.status(200).json({
            message: 'Xóa bình luận thành công'
        });
    } catch (err) {
        console.error('Lỗi xóa bình luận:', err);
        res.status(500).json({
            error: 'Lỗi xóa bình luận'
        });
    }
});

//get comment by id
const getCommentsById = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        // Tìm các bình luận có `tourId` tương ứng
        const comments = await Comment.find({
            _id: id
        })
        res.status(200).json(comments);
    } catch (err) {
        console.error('Error fetching comments:', err); // Log lỗi để debug
        res.status(500).json({
            error: 'Lỗi lấy dữ liệu bình luận'
        });
    }
};

// Lấy tất cả bình luận và phản hồi
const getCommentsByTourId = async (req, res) => {
    const {
        tourId
    } = req.params;

    try {
        // Tìm các bình luận có `tourId` tương ứng
        const comments = await Comment.find({
                tourId
            })
            .populate({
                path: 'replies',
            });

        if (!comments || comments.length === 0) {
            return res.status(404).json({
                message: 'Không có bình luận nào cho tour này.'
            });
        }

        // Lọc và thay thế từ ngữ tiêu cực
        const filteredComments = comments.map(comment => {
            let updatedContent = comment.content;
            console.log(updatedContent);


            // Tách nội dung bình luận thành các từ riêng lẻ
            const words = updatedContent.split(' '); // Tách nội dung thành mảng từ

            // Duyệt qua từng từ trong bình luận và kiểm tra có phải từ xấu không
            const updatedWords = words.map(word => {
                const cleanWord = word.toLowerCase(); // Loại bỏ dấu câu và chuyển sang chữ thường

                // Kiểm tra nếu từ này có phải từ xấu không bằng hàm badWords
                // if (badWords(cleanWord)) { 
                //     // Nếu có, thay thế từ ngữ xấu bằng dấu **
                //     return '*'.repeat(word.length); // Thay thế bằng dấu sao theo độ dài từ
                // }
                // // Nếu không, giữ nguyên từ đó
                // return word;
                return filterBadWords(cleanWord)
            });

            // Ghép lại các từ thành nội dung bình luận mới
            updatedContent = updatedWords.join(' ');

            // Cập nhật lại nội dung của bình luận
            comment.content = updatedContent;

            return comment;
        });

        res.status(200).json(filteredComments);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({
            error: 'Lỗi lấy dữ liệu bình luận'
        });
    }
};

// Phản hồi bình luận
const replyToComment = async (req, res) => {
    const {
        commentId
    } = req.params;
    const {
        userId,
        content
    } = req.body;

    try {
        // Tạo phản hồi
        const reply = new Reply({
            userId: userId,
            comment: commentId,
            content
        });
        await reply.save();
        // Cập nhật phản hồi vào bình luận
        const comment = await Comment.findById(commentId);
        comment.replies.push(reply._id);
        await comment.save();
        res.status(201).json(reply);
    } catch (err) {
        res.status(500).json({
            error: 'Lỗi tạo phản hồi'
        });
    }
};

// Load Comment and total comment
const loadAllToursWithComments = async (req, res) => {
    try {
        // Lấy tất cả các tour từ cơ sở dữ liệu
        const tours = await TourModel.find({});

        // Duyệt qua tất cả các tour và tính số lượng đánh giá cùng điểm trung bình cho từng tour
        const toursWithComments = await Promise.all(tours.map(async (tour) => {
            // Tìm tất cả các đánh giá liên quan đến tour hiện tại
            const comments = await Comment.find({
                tourId: tour._id
            });

            // Tính tổng số lượng Comments
            const totalComments = comments.length;

            // Trả về thông tin tour kèm số lượng
            return {
                tour: tour, // Giả sử tour có thuộc tính 'name'
                totalComments, // Số lượng đánh giá
            };
        }));

        // Trả về danh sách tất cả các tour kèm số lượng
        return res.status(200).json(toursWithComments);
    } catch (error) {
        console.error("Lỗi khi tải thông tin bình luận của tất cả các tour:", error);
        return res.status(500).json({
            message: "Có lỗi xảy ra khi tải thông tin bình luận.",
            error
        });
    }
};


module.exports = {
    createComment,
    replyToComment,
    getCommentsByTourId,
    updateComment,
    deleteComment,
    getCommentsById,
    loadAllToursWithComments
}