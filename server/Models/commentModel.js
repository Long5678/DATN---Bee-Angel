const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    replies: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Reply'} ],
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Tạo model từ schema
module.exports = mongoose.model('Comment', commentSchema);