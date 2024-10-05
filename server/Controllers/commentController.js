const asyncHandler = require('express-async-handler');
const Comment = require('../Models/commentModel');
const Reply = require('../Models/replyModel')


// Từ khóa để auto reply
const employeeUserId = '66fa5d974c173b4285a5dc2d';

const autoReplyMessage = 'Cảm ơn bạn đã bình luận! Chúng tôi sẽ liên hệ hỗ trợ sớm nhất.';

const createComment = async (req, res) => {
    const { userId, content, tourId } = req.body;

    try {
      // Bước 1: Tạo bình luận mới
      const comment = new Comment({
        userId: userId,
        tourId: tourId,
        content,
        
      });
      await comment.save();
  
      // Bước 2: Tạo phản hồi tự động cho bình luận
      const autoReply = new Reply({
        userId: employeeUserId, // Đây là ID của nhân viên hoặc tài khoản hệ thống trả lời tự động
        comment: comment._id,
        content: autoReplyMessage
      });
      await autoReply.save();
  
      // Bước 3: Thêm phản hồi vào bình luận
      comment.replies.push(autoReply._id);
      await comment.save();
  
      // Trả về bình luận với phản hồi tự động
      res.status(201).json(comment);
    } catch (err) {
      console.error('Lỗi tạo bình luận hoặc phản hồi tự động:', err);
      res.status(500).json({ error: 'Lỗi tạo bình luận hoặc phản hồi tự động' });
    }
};

// Lấy tất cả bình luận và phản hồi
const getCommentsByTourId = async (req, res) => {
    const { tourId } = req.params;

    try {
        // Tìm các bình luận có `tourId` tương ứng
        const comments = await Comment.find({ tourId })
            .populate('userId', 'name')  // Lấy thông tin người dùng
            .populate({
                path: 'replies',
                populate: { path: 'userId', select: 'name' } // Lấy thông tin người dùng trong phản hồi
            });

        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: 'Không có bình luận nào cho tour này.' });
        }

        res.status(200).json(comments);
    } catch (err) {
        console.error('Error fetching comments:', err); // Log lỗi để debug
        res.status(500).json({ error: 'Lỗi lấy dữ liệu bình luận' });
    }
};

// Phản hồi bình luận
const replyToComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId, content } = req.body;

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
        res.status(500).json({ error: 'Lỗi tạo phản hồi' });
    }
};

module.exports = { createComment, replyToComment, getCommentsByTourId }
