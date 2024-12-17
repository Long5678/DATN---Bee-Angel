const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  tags: {
    type: [String],
    default: [] // Nó sẽ như một cái keywork
  },
  metaTitle: {
    type: String,
    default: function () {
      return this.title; // Nếu không có metaTitle, sử dụng title làm mặc định
    },
  },
  metaDescription: {
    type: String,
    default: function () {
      return this.content.substring(0, 150); // Sử dụng 150 ký tự đầu tiên của nội dung nếu không có metaDescription
    },
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  imageUrl: [{
    type: String,
    required: true
  }],
  videoUrl: [{
    type: String
  }], // Thêm trường videoUrl
  views: {
    type: Number,
    default: 0
  } // Track the number of views
}, {
  timestamps: true
});

// Hook trước khi lưu để tự động tạo slug, metaTitle và metaDescription
blogSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/ /g, '-'); // Tạo slug từ title
  }

  if (!this.metaTitle) {
    this.metaTitle = this.title; // Nếu không có metaTitle, sử dụng title
  }

  if (!this.metaDescription) {
    this.metaDescription = this.content.substring(0, 150); // Sử dụng 150 ký tự đầu tiên của content làm metaDescription
  }
  if (!this.tags || this.tags.length === 0) {
    // Tạo tags từ metaDescription
    const words = this.metaDescription
      .toLowerCase() // Chuyển thành chữ thường
      .replace(/[^\w\s]/gi, '') // Loại bỏ ký tự đặc biệt
      .split(/\s+/) // Tách thành mảng từ
      .filter((word, index, self) => word.length > 2 && self.indexOf(word) === index); // Lọc các từ trùng lặp, ngắn hơn 3 ký tự
    this.tags = words; // Gán danh sách từ làm tags
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
