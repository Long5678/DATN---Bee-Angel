const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu trữ tệp tin và tên tệp tin
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Chỉ chấp nhận các định dạng hình ảnh và video
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
