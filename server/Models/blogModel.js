const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
  imageUrl:  { type: String, required: true } ,
  videoUrl: { type: String },  // Thêm trường videoUrl
  views: { type: Number, default: 0 }  // Track the number of views
});

module.exports = mongoose.model('Blog', blogSchema);
