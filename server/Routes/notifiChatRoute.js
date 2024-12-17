const express = require('express');
const {
    addNotifiChat,
    updateNotifiChat,
    getAllNotifiChat
} = require('../Controllers/notificationChatController')

const router = express.Router();

router.post('/add', addNotifiChat);
router.put('/update/:id', updateNotifiChat);
router.get('/getNotifiRecipientId/:recipientId',getAllNotifiChat);

module.exports = router