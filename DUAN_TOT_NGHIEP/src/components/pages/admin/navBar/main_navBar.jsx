// phần nav bar của admin
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { SocketContext } from "../../../../context/socketContext"
import { unreadNotificationsFunc } from "../../../../hooks/unreadNotification"
import { useDispatch, useSelector } from "react-redux"
import { getAllMessage_ByIdChat, getAllUser } from "../../../../redux/action_thunk"
import moment from 'moment';
import { Notification_context } from "../../../../context/notificationContext"
import { PopupContext } from "../../../../context/popupContext"
import { getOneChat_ByYourId_And_UserId } from "../../../../redux/action_thunk"
import { AuthContext } from "../../../../context/authContext"
import { editOneNotifiChat, getAllNotifiChat } from "../../../../redux/thunk/notifiChat_thunk"
function Main_navBar() {
    let dispatch = useDispatch()
    const navigation = useNavigate()
    function backUserLayout() {
        navigation("/")
    }

    const notifiChatDatas = useSelector((state) => state.notifiChatSL.notifiChatDatas)
    const userAll = useSelector((state) => state.userSL.user)
    const { thongBao, setThongBao } = useContext(SocketContext)
    const { setCheckCurrentChat } = useContext(PopupContext)
    const { user } = useContext(AuthContext)
    // console.log("thông báo all", thongBao);


    useEffect(() => {
        dispatch(getAllUser())
    }, [])

    useEffect(() => {
        // console.log("có chạy vô đây");

        dispatch(getAllNotifiChat(user?._id))
    }, [user])

    // useEffect(() => {
    //     // Đưa thông báo vào state setThongBao
    //     if (notifiChatDatas) {
    //         setThongBao([...thongBao, ...notifiChatDatas]);
    //     }
    // }, [notifiChatDatas]);
    useEffect(() => {
        if (notifiChatDatas) {
            const userSpecificNotifications = notifiChatDatas.filter(
                (notification) => notification.recipientId === user?._id
            );
            setThongBao([...thongBao, ...userSpecificNotifications]);
        }
    }, [notifiChatDatas, user?._id]);


    const unreadNotifications = unreadNotificationsFunc(thongBao) // hàm này sẽ trả về thông báo chưa đc đọc

    // const modifiedNotifiactions = thongBao.map((n) => {
    //     const sender = userAll.find((user) => user._id === n.senderId)
    //     const formattedDate = moment(n?.data).format("DD-MM-YYYY");
    //     const formattedTime = moment(n?.data).format("HH:mm");
    //     return {
    //         ...n,
    //         senderName: sender?.name,
    //         senderAvatar: sender?.avatar,
    //         senderId: sender?._id,
    //         senderDate: formattedDate,
    //         senderTime: formattedTime,
    //     }
    // })

    const modifiedNotifiactions = thongBao
        .map((n) => {
            const sender = userAll.find((user) => user._id === n.senderId)
            const formattedDate = moment(n?.data).format("DD-MM-YYYY");
            const formattedTime = moment(n?.data).format("HH:mm");
            return {
                ...n,
                senderName: sender?.name,
                senderAvatar: sender?.avatar,
                senderId: sender?._id,
                senderDate: formattedDate,
                senderTime: formattedTime,
            };
        })
        .reduce((acc, current) => {
            // Nếu `senderId` chưa có trong mảng `acc`, thêm thông báo vào mảng
            if (!acc.find(item => item.senderId === current.senderId)) {
                acc.push(current);
            }
            return acc;
        }, []);



    // context  này sẽ xử lý các thông báo khi mà click vào thông báo đó
    const { markThisUserNotificationsAsRead } = useContext(Notification_context)
    // hàm này khi click vào thông báo nào thì sẽ đc cho là đã đọc thông báo
    const handleClickNotifation = async (senderId, id) => {

        // hàm này nó sẽ hiện thông báo theo tưng người (thông báo của người nào hiện ra người đó)
        const thisUserNotifications = unreadNotifications?.filter(
            n => n.senderId == senderId // id này là id của người gửi thông báo
        )
        // này là khi clic vào thông báo nào thì nó sẽ set là đã đọc và mất tb
        markThisUserNotificationsAsRead(thisUserNotifications, thongBao)

        // chuyển đến trang chat
        navigation("/manager/chats")
        // cho đoạn chat hiện lên
        setCheckCurrentChat(false)
        // Khi mở cửa sổ chat, tải đoạn chat
        const result = await dispatch(getOneChat_ByYourId_And_UserId(senderId, user?._id))
        if (result && result[0]?._id) {
            dispatch(getAllMessage_ByIdChat(result[0]?._id));
            // Đánh dấu tất cả thông báo của người gửi là đã đọc trên server
            thisUserNotifications.forEach((notification) => {
                dispatch(editOneNotifiChat(notification._id));
            });
            // await Promise.all(
            //     thisUserNotifications.map(notification => dispatch(editOneNotifiChat(notification._id)))
            // );
        }
    }

    return <>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">


            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                        <i className="fas fa-search"></i>
                    </a>
                    <div className="navbar-search-block">
                        <form className="form-inline">
                            <div className="input-group input-group-sm">
                                <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-navbar" type="submit">
                                        <i className="fas fa-search"></i>
                                    </button>
                                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>
                {/*  */}

                <li className="nav-item dropdown">
                    <div className="nav-link" data-toggle="dropdown" >
                        <i className="far fa-comments"></i>
                        {unreadNotifications.length > 0
                            &&
                            <span className="badge badge-danger navbar-badge">{unreadNotifications.length}</span>
                        }
                    </div>
                    <div style={{ width: "300px" }} className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        {modifiedNotifiactions && modifiedNotifiactions.length > 0
                            ?
                            (modifiedNotifiactions.map((n, index) => {
                                const senderUnreadNotifications = unreadNotifications.filter(
                                    un => un.senderId === n.senderId
                                )
                                return <>
                                    <div key={index} className="dropdown-item" onClick={() => handleClickNotifation(n.senderId, n._id)}>
                                        <div className="media">
                                            <img src={n.senderAvatar} alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                                            <div className="media-body">
                                                <h3 className="dropdown-item-title">
                                                    {n.senderName}
                                                    {senderUnreadNotifications.length > 0 && (
                                                        <span className="float-right text-sm text-danger">
                                                            {/* {senderUnreadNotifications.length} */}
                                                        </span>
                                                    )}
                                                </h3>
                                                {senderUnreadNotifications.length > 0
                                                    ?
                                                    <p className="text-sm">
                                                        Đã gửi cho bạn {senderUnreadNotifications.length} tin nhắn...
                                                        <br/>
                                                        {n._id}
                                                        <br />
                                                    </p>
                                                    :
                                                    <p className="text-sm">Bạn đã xem tin nhắn</p>
                                                }

                                                <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i>{n.senderTime} - {n.senderDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {index < modifiedNotifiactions.length - 1 && <div className="dropdown-divider"></div>}
                                </>
                            }))
                            :
                            <div style={{ padding: "0px 10px" }}>Không có thông báo nào</div>
                        }


                    </div>
                </li>







                {/* thông báo tour  */}
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-bell"></i>
                        <span className="badge badge-warning navbar-badge">15</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right notifi-tour-admin">
                        <span className="dropdown-item dropdown-header">15 Notifications</span>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-item">
                            <i className="fas fa-envelope mr-2"></i> 
                            <span className="text-notifi-admim">Đơn của khách Nguyễn Văn A đang trọng trạng thái chờ xác nhận</span>
                        </div>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                    </div>
                </li>

                {/*  */}
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>
                <li onClick={backUserLayout} className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </>
}

export default Main_navBar