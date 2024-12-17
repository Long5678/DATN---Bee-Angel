const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Kiểm tra xem định dạng tệp có hợp lệ không
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép tải lên các định dạng hình ảnh hoặc video.'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
