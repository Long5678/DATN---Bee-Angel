import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client"
import { AuthContext } from "./authContext";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessage_ByIdChat, getAllOder } from "../redux/action_thunk";
import { addNotify, changeStatus } from "../redux/thunk/notification_thunk";
import { editOneNotifiChat } from "../redux/thunk/notifiChat_thunk";
import { addNotifyVehicle, changeStatusCar } from "../redux/thunk/action_notifiVeh";
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    let dispatch = useDispatch()
    const { user } = useContext(AuthContext)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)
    const [thongBao, setThongBao] = useState([])
    const [orderNotify, setOrderNotify] = useState([])
    let oneChat = useSelector((state) => state.chatSL.oneChat)
    let newMessage = useSelector((state) => state.messageSL.newMessage)
    let orderNew = useSelector((state) => state.oderSL.orderNew)
    let orderNewCar = useSelector((state) => state.orderVehicleSL.orderNewCar)
    let orderStatus = useSelector((state) => state.oderSL.orderUpdate)
    let orderCarStatus = useSelector((state) => state.orderVehicleSL.orderCarUpdate)
    let newNotifiChat = useSelector((state) => state.notifiChatSL.newNotifiChat)

    console.log("newMessage", newMessage);


    // khởi tạo socket
    useEffect(() => {
        const newSocket = io("http://localhost:4000")
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user])

    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser", user?._id)

        // tk client nó sẽ nhận đc userOnlie nt đc socket gửi qua 
        socket.on("getOnineUsers", (res) => {
            setOnlineUsers(res)
        })

        return () => {
            socket.off("getOnineUsers");
        }

    }, [socket])

    useEffect(() => {
        console.log("newNotifiChat", newNotifiChat);

    }, [newNotifiChat])

    useEffect(() => {
        if (!newNotifiChat || Object.keys(newNotifiChat).length === 0) {
            console.warn("newNotifiChat chưa có dữ liệu, không gửi socket.emit");
            return;
        }

        if (socket === null) return;

        console.log("Gửi thông báo:", newNotifiChat);
        socket.emit("sendNotifiChat", { ...newNotifiChat });
    }, [newNotifiChat]);


    // send mesage
    useEffect(() => {
        if (socket === null) return

        const recipientId = oneChat[0]?.members?.find((id) => id !== user?._id)
        // recipientId ở đây là id người nhận
        socket.emit("sendMessage", { ...newMessage, recipientId })
        // socket.emit("sendNotifiChat", {...newNotifiChat})
    }, [newMessage])

    // nhận tin nhắn
    useEffect(() => {
        if (socket === null) return
        socket.on("getMessage", res => {
            console.log("res", res);

            // nếu đoạn chat mình đang mở mà ko bằng vs res.chatId thì ko gửi tin nhắn qua đoạn chat đó
            if (oneChat[0]?._id !== res.chatId) return

            // nó sẽ lấy tin nhắn trả về đưa vào state message
            dispatch(getAllMessage_ByIdChat(res.chatId))
        })

        socket.on("getThongBao", (res) => {
            console.log("ok res đây", res);

            // Đây là biến kiểm tra xem người dùng hiện tại có đang mở cuộc trò chuyện(chat) với người gửi thông báo hay không.
            const isChatOpen = oneChat[0]?.members.some(id => id === res.senderId)

            if (isChatOpen) {
                setThongBao(prev => [
                    { ...res, isRead: true },   // set lại đã đọc isRead: true
                    ...prev
                ])
                // Gọi API để cập nhật trạng thái đã đọc
                dispatch(editOneNotifiChat(res._id));
            } else {
                setThongBao(prev => [res, ...prev])
            }
        })

        return () => {
            socket.off("getMessage")
            socket.off("getThongBao")
        }

    }, [socket, oneChat[0]])

    // order success
    useEffect(() => {
        if (socket === null) return
        // recipientId ở đây là id người nhận
        socket.emit("orderSuccess", { orderNew })
    }, [orderNew])

    // nhận thông báo
    useEffect(() => {
        if (socket === null) return;

        // console.log('Đang lắng nghe sự kiện orderSuccessNotification');
        socket.on("orderSuccessNotification", (res) => {
            console.log('Đã nhận thông báo:', res);
            dispatch(addNotify(res.message, res.orderId, res.userId, res.tourId, res.check ,res.status))
            // setOrderNotify([
            //     ...orderNotify, 
            //     res
            // ])
        });

        return () => {
            // console.log('Ngừng lắng nghe sự kiện orderSuccessNotification');
            socket.off("orderSuccessNotification");
        };
    }, [socket, orderNew]);


    useEffect(() => {
        dispatch(getAllOder())
    }, [orderNew])
    
    useEffect(() => {
        // console.log('Order OK');

        if (socket === null) return
        // recipientId ở đây là id người nhận
        socket.emit("orderStatusChanged", { orderStatus })
    }, [orderStatus])


    // nhận thông báo
    useEffect(() => {
        if (socket === null) return;

        // console.log('Đang lắng nghe sự kiện orderStatusNotification');
        socket.on("orderStatusNotification", (res) => {
            console.log('Đã nhận thông báo:', res);
            dispatch(changeStatus())
            // setOrderNotify([
            //     ...orderNotify, 
            //     res
            // ])
        });

        return () => {
            // console.log('Ngừng lắng nghe sự kiện orderStatusNotification');
            socket.off("orderStatusNotification");
        };
    }, [socket, orderStatus]);







    // phaanf xe no order thanh cong
    useEffect(() => {
        console.log("cos chay vo");

        if (socket === null) return
        // recipientId ở đây là id người nhận
        socket.emit("orderSuccessCar", { orderNewCar })
    }, [orderNewCar])


    useEffect(() => {
        if (socket === null) return;

        // console.log('Đang lắng nghe sự kiện orderSuccessNotification');
        socket.on("orderSuccessNotificationCar", (res) => {
            console.log('Đã nhận thông báo kkk:', res);
            dispatch(addNotifyVehicle(res.message, res.orderId, res.userId, res.idCar, res.check,res.status))
            // dispatch(addNotify(res.message, res.orderId, res.userId, res.tourId, res.status))
            // setOrderNotify([
            //     ...orderNotify, 
            //     res
            // ])
        });

        return () => {
            // console.log('Ngừng lắng nghe sự kiện orderSuccessNotification');
            socket.off("orderSuccessNotificationCar");
        };
    }, [socket, orderNew]);

    //change
    useEffect(() => {
        // console.log('Order OK');

        if (socket === null) return
        // recipientId ở đây là id người nhận
        socket.emit("orderCarStatusChanged", { orderCarStatus })
    }, [orderCarStatus])


    useEffect(() => {
        if (socket === null) return;

        // console.log('Đang lắng nghe sự kiện orderStatusNotification');
        socket.on("orderCarStatusNotification", (res) => {
            console.log('Đã nhận thông báo:', res);
            dispatch(changeStatusCar(res.task_status))
            // setOrderNotify([
            //     ...orderNotify, 
            //     res
            // ])
        });

        return () => {
            // console.log('Ngừng lắng nghe sự kiện orderStatusNotification');
            socket.off("orderCarStatusNotification");
        };
    }, [socket, orderCarStatus]);

    return <SocketContext.Provider
        value={{
            onlineUsers,
            thongBao,
            setThongBao
        }}>
        {children}
    </SocketContext.Provider>
}
