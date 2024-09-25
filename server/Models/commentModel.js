const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: String, required: true },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    rating: {
<<<<<<< HEAD
        score: { type: Number, required: true },
=======
        score: { type: Number, required: true, min: 1, max: 5 },
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
        userId: { type: String }
    }
}, { timestamps: true });

// Tạo model từ schema
module.exports = mongoose.model('Comment', commentSchema);