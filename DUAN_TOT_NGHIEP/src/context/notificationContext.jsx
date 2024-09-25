// context này liên quan đến thông báo
import { createContext, useContext } from "react";
import { SocketContext } from "./socketContext";

const Notification_context = createContext();

const NotificationProvider = ({ children }) => {
    const { setThongBao } = useContext(SocketContext)

    // kiểu click vào tk nào thì thông báo tk đó mất
    // nó sẽ nhận 2 tham số là :  thông bảo của người dùng và thông báo 
    const markThisUserNotificationsAsRead = (thisUserNotifications, notifications) => {
        // mark notifications as read
        const mNotifications = notifications.map(el => {
            let notification;

            thisUserNotifications.forEach(n => {
                if (n.senderId === el.senderId) {
                    notification = { ...n, isRead: true }
                } else {
                    notifications = el
                }
            })

            return notification;
        })
        setThongBao(mNotifications)
    }

    return <>
        <Notification_context.Provider value={{
            markThisUserNotificationsAsRead
        }}>
            {children}
        </Notification_context.Provider>
    </>
}

export { Notification_context, NotificationProvider }