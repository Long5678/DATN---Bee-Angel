const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    orderId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,

    },
    tourId:{
        type:String,
    },
    status:{
        type:String,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    check: {
        type: String,
        default: "tour"
    }
},{ timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
