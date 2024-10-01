const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    review : { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    replies: [
        {
            reply: { type: String, required: true },
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            date: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Tạo model từ schema
module.exports = mongoose.model('Rating', ratingSchema);