const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    videos: [{
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
    status: {
        type: String,
        required: true,
        enum: ['Còn tour', 'Sắp hết', 'Hết tour']
    },
    planes: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        ul_lists: [{
            type: String
        }] // Hoặc type: [String] để định nghĩa rõ hơn
    }],
    dateTour: [{
        departureDate: {
            type: String,
            required: true
        },
        returnDate: {
            type: String,
            required: true
        },
    }],
    numDay: {
        type: String,
        required: true
    },
    price_Adult: {
        type: Number,
        required: true
    },
    price_Children: {
        type: Number,
        required: true
    },
    bookingsCount: {
        type: Number,
        default: 0 // Bắt đầu từ 0
    },
    isDeleted: {
        type: Boolean,
        default: false, // false là tour này còn hoạt động
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tour', TourSchema);