const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // liên kết với mô hình người dùng 
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reply', ReplySchema);
