const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    idTour: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    numberOfChildren: {
        type: Number,
        required: true
    },
    departureDate: {
        type: String,
        required: true
    },
    returnDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    task_status: {
        type: String,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    mustPay: {
        type: Number,
        required: true
    },
    sale: {
        type: Number,
        required: true
    }, // Địa điểm tour
    priceHotel: {
        type: Number
    }, // Địa điểm tour
    namehotel: {
        type: String
    },
    locationhotel: {
        type: String
    },
    depositPrice: {
        type: Number,
        required: true
    }, // Địa điểm tour
    totalPrice: {
        type: Number,
        required: true
    }, // Địa điểm tour
    paymentMethod: {
        type: String
    },
    returnPay: {
        type: Number
    },
    previous_task_status: {
        type: String,
        default: null
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);