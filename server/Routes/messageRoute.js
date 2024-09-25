const express = require("express")
const upload = require('../middlewares/uploadMiddleware')
const {
    createMessage,
    getMessages,
} = require("../Controllers/messageController")

const router = express.Router();

// sử dụng middleware upload.single() để xử lý một file upload
router.post("/", upload.fields([{
        name: 'images',
        maxCount: 5
    },
    {
        name: 'videos',
        maxCount: 1
    }
]), createMessage);
router.get("/:chatId", getMessages);

module.exports = router;