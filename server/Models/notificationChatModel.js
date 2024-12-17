const mongoose = require('mongoose');

const NotificationChat = new mongoose.Schema({
    senderId: String,  // id người gửi
    recipientId: String, // id người nhận
    isRead: {
        type: Boolean,
        default: false
    },
    data: {
        type: Date,
        default: Date.now
    } // Sử dụng `Date.now` để đặt giá trị mặc định là thời gian hiện tại
});

module.exports = mongoose.model("NotificationChat", NotificationChat)