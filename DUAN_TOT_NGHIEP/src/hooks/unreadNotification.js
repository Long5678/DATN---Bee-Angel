// hàm này sẽ xử lý trả về các thông báo chưa đọc

export const unreadNotificationsFunc = (notifications) => {
    // console.log("Unread", notifications);

    return notifications?.filter((n) => n && n.isRead === false)
}