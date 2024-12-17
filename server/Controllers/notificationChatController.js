const NotificationChatModel = require('../Models/notificationChatModel');

const addNotifiChat = async (req, res) => {
    // hàm này sẽ nhận id người gửi, isRead là đọc hay chưa, và ngày tháng
    const {
        senderId,
        recipientId,
        isRead,
        data
    } = req.body;
    try {
        const newNotifiChat = new NotificationChatModel({
            senderId,
            recipientId,
            isRead,
            data
        })

        const response = await newNotifiChat.save();
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        })
    }
}


const updateNotifiChat = async (req, res) => {
    const {
        id
    } = req.params;


    try {
        const notifiChat = await NotificationChatModel.findById(id);
        if (!notifiChat) {
            res.status(400).json({
                message: "Thông báo này không tồn tại."
            })
        }

        // cập nhật lại thông báo là true (đã đọc)
        notifiChat.isRead = true

        const updateNotifiChat = await notifiChat.save();
        res.status(200).json(updateNotifiChat)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        })
    }
}

const getAllNotifiChat = async (req, res) => {
    let {
        recipientId // id người nhận
    } = req.params;

    try {
        const notifiChat = await NotificationChatModel.find({recipientId})
        res.status(200).json(notifiChat)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        })
    }
}

module.exports = {
    addNotifiChat,
    updateNotifiChat,
    getAllNotifiChat
}