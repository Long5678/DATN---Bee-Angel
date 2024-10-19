const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    review : { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    userId: { type: String, required: true },
    tourId: { type: String, required: true },
    replies: [
        {
            reply: { type: String, required: true },
            userId: { type: String, required: true },
            date: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Tạo model từ schema
module.exports = mongoose.model('Rating', ratingSchema);