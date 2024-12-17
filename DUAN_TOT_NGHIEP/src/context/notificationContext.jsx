// context này liên quan đến thông báo
import { createContext, useContext, useState } from "react";
import { SocketContext } from "./socketContext";

const Notification_context = createContext();

const NotificationProvider = ({ children }) => {
    const { setThongBao } = useContext(SocketContext);
    const [changeNotify, setChangeNotify] = useState(true);

    // kiểu click vào tk nào thì thông báo tk đó mất
    // nó sẽ nhận 2 tham số là: thông báo của người dùng và danh sách thông báo 
    const markThisUserNotificationsAsRead = (thisUserNotifications, notifications) => {
        // mark notifications as read
        const mNotifications = notifications.map(el => {
            let notification = el; // Gán `el` mặc định để tránh undefined

            thisUserNotifications.forEach(n => {
                if (n.senderId === el.senderId) {
                    notification = { ...n, isRead: true };
                }
            });

            return notification;
        });

        setThongBao(mNotifications);
    };

 
    return (
        <Notification_context.Provider value={{
            markThisUserNotificationsAsRead,
            changeNotify, 
            setChangeNotify
        }}>
            {children}
        </Notification_context.Provider>
    );
};

export { Notification_context, NotificationProvider };
