const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: String, required: true },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    rating: {
        score: { type: Number, required: true },
        userId: { type: String }
    }
}, { timestamps: true });

// Tạo model từ schema
module.exports = mongoose.model('Comment', commentSchema);