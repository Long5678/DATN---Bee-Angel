import { ListItem, ListItemText, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { PopupContext } from '../../../../../../context/popupContext';
import { createChat, getAllMessage_ByIdChat, getOneChat_ByYourId_And_UserId } from '../../../../../../redux/action_thunk';
import { AuthContext } from '../../../../../../context/authContext';

function Item_search({ setValueSearch }) {
    let dispatch = useDispatch()
    let userOne = useSelector((state) => state.userSL.userOne)
    let oneChat = useSelector((state) => state.chatSL.oneChat)
    const { setCheckCurrentChat } = useContext(PopupContext)
    const { user } = useContext(AuthContext)

    const handleUserSearchChat = async () => {
        // setCheckCurrentChat(false)
        // setValueSearch("")
        // dispatch(createChat(userOne?._id, user?._id))
        // dispatch(getOneChat_ByYourId_And_UserId(userOne?._id, user?._id))
        // dispatch(getAllMessage_ByIdChat(oneChat?._id))
        try {
            setCheckCurrentChat(false);
            setValueSearch("");

            // Gọi `getOneChat_ByYourId_And_UserId` để lấy dữ liệu
            const result = await dispatch(getOneChat_ByYourId_And_UserId(userOne?._id, user?._id));
            if (result && result[0]?._id) {
                console.log("có đoạn chat");
                dispatch(getAllMessage_ByIdChat(result[0]?._id));
            } else {
                console.log("chưa có đoạn chat");
                const newChat = await dispatch(createChat(userOne?._id, user?._id));
                console.log(newChat);

                if (newChat) {
                    let chatBox = await dispatch(getOneChat_ByYourId_And_UserId(userOne?._id, user?._id));
                    console.log("chatBox", chatBox);
                    
                    dispatch(getAllMessage_ByIdChat(chatBox[0]?._id));
                }
            }


            // if (result && result.payload) {
            //     // Nếu đoạn chat tồn tại, lấy tin nhắn của đoạn chat
            //     dispatch(getAllMessage_ByIdChat(result.payload._id));
            // } else {
            //     // Nếu đoạn chat chưa tồn tại, tạo mới
            //     const newChat = await dispatch(createChat(userOne?._id, user?._id));
            //     if (newChat && newChat.payload) {
            //         dispatch(getAllMessage_ByIdChat(newChat.payload._id));
            //     }
            // }
        } catch (error) {
            console.error("Error in handleUserSearchChat:", error);
        }
    }

    useEffect(() => {
        console.log("oneChat", oneChat);

    }, [oneChat]);


    return <>
        <ListItem onClick={handleUserSearchChat} >
            <div className='avatar-item-chat'>
                {userOne.avatar
                    ?
                    <img src={userOne.avatar} alt="" />
                    :
                    <img src="/src/publics/image/avatar_null.jpg" alt="" />

                }
            </div>
            <ListItemText primary={userOne.name} secondary={userOne.phone} />
            <div className='time-thongbao'>
                <Typography variant="caption" color="textSecondary">
                </Typography>
            </div>
        </ListItem>
    </>
}

export default Item_search