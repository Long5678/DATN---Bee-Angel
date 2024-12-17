const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    motorcycleBrand: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    licensePlate: [{
        type: String
    }],
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Vehicle', VehicleSchema);
