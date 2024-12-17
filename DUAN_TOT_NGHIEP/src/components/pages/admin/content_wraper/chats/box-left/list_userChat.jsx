import { Box, TextField, List, Typography } from '@mui/material';
import Item_Chat from './item_Chat';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChatByIdUser, getOneUserByPhone } from '../../../../../../redux/action_thunk';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../../../../context/authContext';
// import { PopupContext } from '../../../../../../context/popupContext';
import { SocketContext } from '../../../../../../context/socketContext';
import { useState } from 'react';
import Item_search from './item_Search';

function List_userChat() {
    let dispatch = useDispatch()
    const { user } = useContext(AuthContext)
    // const { checkCurrentChat, setCheckCurrentChat } = useContext(PopupContext)
    const { thongBao } = useContext(SocketContext)
    let chatDatas = useSelector((state) => state.chatSL.chatDatas)
    let isErrUser = useSelector((state) => state.userSL.isErrUser)
    const [valueSearch, setValueSearch] = useState("")


    useEffect(() => {
        if (user) {
            dispatch(getAllChatByIdUser(user?._id))
        }
    }, [user, thongBao]) // thông báo

    // hàm sử lý load user search
    const handleSearchUser = (value) => {
        const onlyNumbers = value.replace(/[^0-9]/g, '');
        setValueSearch(onlyNumbers)
        dispatch(getOneUserByPhone(onlyNumbers))
    }
    return <>
        <Box width="25%" bgcolor="#f5f5f5" p={2} borderRight="1px solid #ddd">
            <Typography variant="h6" gutterBottom>Danh sách tin nhắn</Typography>
            <TextField
                fullWidth
                placeholder="Tìm kiếm..."
                variant="outlined"
                size="small"
                margin="dense"
                value={valueSearch}
                onChange={(e) => handleSearchUser(e.target.value)}
            />
            <List>
                {
                    valueSearch
                        ?
                           isErrUser
                            ?
                            <div>Không tìm thấy người dùng này !</div>
                            :
                            <Item_search setValueSearch={setValueSearch} />

                        :
                        chatDatas.map((chat, index) => {
                            return <Item_Chat key={index} chat={chat} user={user} />
                        })
                }

            </List>
        </Box>
    </>
}

export default List_userChat