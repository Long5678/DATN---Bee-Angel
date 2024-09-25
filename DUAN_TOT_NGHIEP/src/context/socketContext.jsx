import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client"
import { AuthContext } from "./authContext";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessage_ByIdChat } from "../redux/action_thunk";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    let dispatch = useDispatch()
    const { user } = useContext(AuthContext)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)
    const [thongBao, setThongBao] = useState([])
    let oneChat = useSelector((state) => state.chatSL.oneChat)
    let newMessage = useSelector((state) => state.messageSL.newMessage)

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


    // send mesage
    useEffect(() => {
        if (socket === null) return

        const recipientId = oneChat[0]?.members?.find((id) => id !== user?._id)
        // recipientId ở đây là id người nhận
        socket.emit("sendMessage", { ...newMessage, recipientId })
    }, [newMessage])

    // nhận tin nhắn
    useEffect(() => {
        if (socket === null) return
        socket.on("getMessage", res => {
            console.log("res",res);
            
            if (oneChat[0]?._id !== res.chatId) return

            // nó sẽ lấy tin nhắn trả về đưa vào state message
            dispatch(getAllMessage_ByIdChat(res.chatId))
        })

        socket.on("getThongBao", (res) => {
            // Đây là biến kiểm tra xem người dùng hiện tại có đang mở cuộc trò chuyện(chat) với người gửi thông báo hay không.
            const isChatOpen = oneChat[0]?.members.some(id => id === res.senderId)

            if (isChatOpen) {
                setThongBao(prev => [
                    { ...res, isRead: true },   // set lại đã đọc isRead: true
                    ...prev
                ])
            } else {
                setThongBao(prev => [res, ...prev])
            }
        })

        return () => {
            socket.off("getMessage")
            socket.off("getThongBao")
        }

    }, [socket, oneChat[0]])


    return <SocketContext.Provider
        value={{
            onlineUsers,
            thongBao, 
            setThongBao
        }}>
        {children}
    </SocketContext.Provider>
}