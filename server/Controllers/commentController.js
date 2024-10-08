const asyncHandler = require('express-async-handler');
const Comment = require('../Models/commentModel');

const addComment = async (req, res) => {
    const { content, userId, tourId, ratingScore } = req.body;

    const newComment = new Comment({
        content,
        userId,
        tourId,
        rating: { score: ratingScore, userId }
    });

    try {
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
        console.log('Add Comment:', savedComment);
        
    } catch (err) {
        res.status(400).json({ message: 'Error adding comment', error: err });
    }
};

const getCommentsByTour = async (req, res) => {
    const { tourId } = req.params;

    try {
        const comments = await Comment.find({ tourId }).sort({ createdAt: -1 });  // Sắp xếp bình luận theo thời gian mới nhất
        res.status(200).json(comments);
        console.log(tourId);
        
    } catch (err) {
        res.status(400).json({ message: 'Error fetching comments', error: err });
    }
};

const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(400).json({ message: 'Error deleting comment', error: err });
    }
};

module.exports = { addComment, getCommentsByTour, deleteComment }
