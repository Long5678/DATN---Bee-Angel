const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    videos: [{ type: String }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ['Còn tour', 'Sắp hết', 'Hết tour'] 
    }
}, { timestamps: true });  

module.exports = mongoose.model('Tour', TourSchema);