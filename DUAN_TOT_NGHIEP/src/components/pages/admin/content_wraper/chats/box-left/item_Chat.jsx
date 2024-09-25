import { ListItem, ListItemText, Avatar, Typography } from '@mui/material';
import { useFetchRecipientUser } from '../../../../../../hooks/useFetchRecipient';
import { PopupContext } from '../../../../../../context/popupContext';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { getAllMessage_ByIdChat, getOneChat_ByYourId_And_UserId } from '../../../../../../redux/action_thunk';
import { SocketContext } from '../../../../../../context/socketContext';
import { Notification_context } from '../../../../../../context/notificationContext';
import { unreadNotificationsFunc } from '../../../../../../hooks/unreadNotification';
function Item_Chat({ chat, user }) {
    let dispatch = useDispatch()
    const { recipientUser } = useFetchRecipientUser(chat, user);
    console.log(recipientUser);
    
    const { setCheckCurrentChat } = useContext(PopupContext)
    const { onlineUsers, thongBao } = useContext(SocketContext)
    // context  này sẽ xử lý các thông báo khi mà click vào thông báo đó
    const { markThisUserNotificationsAsRead } = useContext(Notification_context)

    const unreadNotifications = unreadNotificationsFunc(thongBao)
    // hàm này nó sẽ hiện thông báo theo tưng người (thông báo của người nào hiện ra người đó)
    const thisUserNotifications = unreadNotifications?.filter(
        n => n.senderId == recipientUser?._id
    )

    if (!recipientUser) {
        return;
    }

    function handleUserChat() {
        // cho nó hiên thôn tin đoạn chat lên
        setCheckCurrentChat(false)
        // đoạn này lấy sử dụng 2 id user để lấy thông tin đoạn chat đó
        dispatch(getOneChat_ByYourId_And_UserId(recipientUser?._id, user?._id))
        // load tất cả tin nhắn dựa vào id đoạn chat
        dispatch(getAllMessage_ByIdChat(chat?._id))
        // này là khi clic vào thông báo nào thì nó sẽ set là đã đọc và mất tb
        markThisUserNotificationsAsRead(thisUserNotifications,thongBao)
    }
    return <>
        <ListItem onClick={handleUserChat}>
            <div className={
                onlineUsers.some((user) => {
                    return user?.userId === recipientUser._id
                }) ? "online-user" : ""
            }></div>
            {/* <Avatar sx={{ marginRight: 2 }} /> */}
            <div className='avatar-item-chat'>
                {recipientUser?.avatar ? 
                    <img src={recipientUser.avatar} alt="" />
                :
                    <img src="/src/publics/image/avatar_null.jpg" alt="" />
                }
            </div>
            <ListItemText primary={recipientUser?.name} secondary={recipientUser?.phone} />
            <div className='time-thongbao'>
                <Typography variant="caption" color="textSecondary">
                    3 giờ
                </Typography>
                {thisUserNotifications?.length > 0 ? <div className="thongbao">{thisUserNotifications?.length}</div> : ""}
            </div>
        </ListItem>
    </>
}

export default Item_Chat