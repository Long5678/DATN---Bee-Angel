import "../../../publics/styles/chatBox.scss"
import { useState, useRef, useContext, useEffect } from 'react';
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { createChat, createMessage, getAllMessage_ByIdChat, getOneChat_ByYourId_And_UserId } from "../../../redux/action_thunk";
import { AuthContext } from "../../../context/authContext";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { SocketContext } from "../../../context/socketContext";
import { unreadNotificationsFunc } from "../../../hooks/unreadNotification";
import { Notification_context } from "../../../context/notificationContext";
import { addOneChat, loadOneChat } from "../../../redux/chat_slice";
import { createNotifiChat, editOneNotifiChat, getAllNotifiChat } from "../../../redux/thunk/notifiChat_thunk";

function Main_chatBox() {
    let dispatch = useDispatch()
    let { user } = useContext(AuthContext)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const { thongBao, setThongBao } = useContext(SocketContext)

    const unreadNotifications = unreadNotificationsFunc(thongBao)
    // console.log("un",unreadNotifications);

    // hàm này nó sẽ hiện thông báo theo tưng người (thông báo của người nào hiện ra người đó)
    const thisUserNotifications = unreadNotifications?.filter(
        n => n.senderId != user?._id
    )

    useEffect(() => {
        console.log("thisUserNotifications", thisUserNotifications);

    }, [thisUserNotifications])

    // context  này sẽ xử lý các thông báo khi mà click vào thông báo đó
    const { markThisUserNotificationsAsRead } = useContext(Notification_context)

    const [text, setText] = useState('');
    const popoverRef = useRef(null);
    let idAdmin = "66fa5d974c173b4285a5dc2d"

    const notifiChatDatas = useSelector((state) => state.notifiChatSL.notifiChatDatas)
    let oneChat = useSelector((state) => state.chatSL.oneChat)
    const handleClick = async () => {
        if (!isPopoverOpen) {
            // Khi mở cửa sổ chat, tải đoạn chat
            const result = await dispatch(getOneChat_ByYourId_And_UserId(idAdmin, user?._id));
            if (result && result[0]?._id) {
                console.log("có đoạn chat");
                dispatch(getAllMessage_ByIdChat(result[0]?._id));
                markThisUserNotificationsAsRead(thisUserNotifications, thongBao);
                thisUserNotifications.forEach((notification) => {
                    dispatch(editOneNotifiChat(notification._id));
                });
            } else {
                console.log("chưa có đoạn chat");
                const newChat = await dispatch(createChat(idAdmin, user?._id));
                console.log("newChat", newChat);

                if (newChat) {
                    let chatBox = await dispatch(getOneChat_ByYourId_And_UserId(idAdmin, user?._id));
                    console.log("chatBox", chatBox);
                    dispatch(getAllMessage_ByIdChat(chatBox[0]?._id));
                }
            }


        } else {
            // Khi đóng cửa sổ chat, đặt oneChat thành rỗng
            dispatch(loadOneChat({}));
        }
        setIsPopoverOpen(!isPopoverOpen);
    };

    const handleSendMessage = () => {
        let chatId = oneChat[0]?._id;
        let senderId = user._id;
        dispatch(createMessage(chatId, senderId, text))
        dispatch(createNotifiChat(senderId, idAdmin))
        setText("")
    };

    let messageDatas = useSelector((state) => state.messageSL.messageDatas)


    const scroll = useRef();
    // phần này tôi sẽ thực hiện khi ai đó nhắn thì nó sẽ cuộn tới cái phần nhắn mà ko phải tự cuộn
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messageDatas])

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000); // Hiển thị sau 2 giây

        return () => clearTimeout(timer); // Dọn dẹp bộ đếm thời gian khi component bị hủy
    }, []);


    useEffect(() => {
        dispatch(getAllNotifiChat(user?._id))
    }, [user])

    useEffect(() => {
        // Đưa thông báo vào state setThongBao
        setThongBao([...thongBao, ...notifiChatDatas]);
    }, [notifiChatDatas]);


    return (<>
        {/* {user.role === "user" && */}

            <div className="popover-container">
                <button className="btn-chat icon-button" onClick={handleClick} >
                    {thisUserNotifications?.length > 0 ? <div className="box-count-message-chat">{thisUserNotifications?.length}</div> : ""}
                    {/* <div className="box-count-message-chat">9</div> */}
                    <div className="icon-wrapper">
                        <IoChatbubbleEllipsesSharp className='icon' />
                    </div>
                </button>
                {isPopoverOpen && (
                    <div className="chat-container" ref={popoverRef}>
                        <div className="chat-box-header">
                            <div className="chat-header-profile">
                            <img src="/src/publics/image/images/image.png" alt="" />
                                <h4>Nhân viên trực page</h4>
                            </div>
                        </div>
                        <div className="chat-box-body">
                            {messageDatas.map((msg, index) => (
                                <div key={index} className={`chat-box-messenger ${msg.senderId == user?._id ? "chatBox-user" : "chatBox-admin"}`} ref={scroll} >
                                    <span>{msg.text}
                                        <div className="chat-date-admin"> 14/1/2023</div>
                                    </span>
                                </div>
                            ))}

                        </div>
                        <div className="chat-box-footer">
                            <div className="chat-box-inp">
                                <input value={text}
                                    onChange={(e) => setText(e.target.value)} type="text" placeholder="Nhập tin nhắn ...." />

                            </div>
                            <IoMdSend onClick={handleSendMessage} className="chat-box-submit" />
                        </div>
                    </div>

                )}
            </div>
        {/* } */}
    </>)
}

export default Main_chatBox