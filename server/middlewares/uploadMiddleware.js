const multer = require('multer');
const path = require('path');

// Lưu trữ các tập tin trong bộ nhớ dưới dạng bộ đệm thay vì lưu vào đĩa
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|mp4|avi/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Chỉ cho phép tải lên các định dạng hình ảnh hoặc video.'));
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
