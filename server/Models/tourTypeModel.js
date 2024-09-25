const mongoose = require('mongoose');

const TourTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('TourType', TourTypeSchema);