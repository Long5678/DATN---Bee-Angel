const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
<<<<<<< HEAD
    rating: {
        score: { type: Number, required: true },
        userId: { type: String }
    }
=======
    replies: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Reply'} ],
    createdAt: { type: Date, default: Date.now }
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
}, { timestamps: true });

// Tạo model từ schema
module.exports = mongoose.model('Comment', commentSchema);