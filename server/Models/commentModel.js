const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    tourId: {
        type: String,
        required: true
    },
    image: [{
        type: String,
    }],
    replies: [{
        type: mongoose.Types.ObjectId,
        ref: 'Reply'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Tạo model từ schema
module.exports = mongoose.model('Comment', commentSchema);