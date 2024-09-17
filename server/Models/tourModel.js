const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    videos: [{ type: String }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ['Còn tour', 'Sắp hết', 'Hết tour']  // Enum values for status
    }
    // availableSeats: { type: Number, required: true },
    // createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tour', TourSchema);
