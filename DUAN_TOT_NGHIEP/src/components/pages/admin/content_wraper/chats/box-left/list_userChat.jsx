import { Box, TextField, List, Typography } from '@mui/material';
import Item_Chat from './item_Chat';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChatByIdUser } from '../../../../../../redux/action_thunk';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../../../../context/authContext';
// import { PopupContext } from '../../../../../../context/popupContext';
import { SocketContext } from '../../../../../../context/socketContext';

function List_userChat() {
    let dispatch = useDispatch()
    const { user } = useContext(AuthContext)
    // const { checkCurrentChat, setCheckCurrentChat } = useContext(PopupContext)
    const {thongBao} = useContext(SocketContext)
    let chatDatas = useSelector((state) => state.chatSL.chatDatas)


    useEffect(() => {
        if (user) {
            dispatch(getAllChatByIdUser(user?._id))
        }
    }, [user, thongBao]) // thông báo
    return <>
        <Box width="25%" bgcolor="#f5f5f5" p={2} borderRight="1px solid #ddd">
            <Typography variant="h6" gutterBottom>Danh sách tin nhắn</Typography>
            <TextField
                fullWidth
                placeholder="Tìm kiếm..."
                variant="outlined"
                size="small"
                margin="dense"
            />
            <List>
                {chatDatas.map((chat, index) => {
                    return <Item_Chat  key={index} chat={chat} user={user} />
                })}
            </List>
        </Box>
    </>
}

export default List_userChat