const express = require("express")
const {
    createNotification,
    getUserNotifications,
    markAllRead,
    checkTaskStatusChange,
    AllsNotify,
    countUnreadNotifications
} = require("../Controllers/notificationController.js")

const router = express.Router();

router.get('/Allnoti', AllsNotify)
router.post('/create', createNotification);
router.post('/check-all-status', checkTaskStatusChange);
router.get('/unread-count/:userId', countUnreadNotifications);
router.get('/:userId', getUserNotifications);
router.put('/read/:userId', markAllRead);



module.exports = router;