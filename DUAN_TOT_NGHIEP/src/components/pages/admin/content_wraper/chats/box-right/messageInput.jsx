import { Box, TextField, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../../../../../../context/authContext';
import { createMessage } from '../../../../../../redux/action_thunk';
function MessageInput() {
    let dispatch = useDispatch()
    const { user } = useContext(AuthContext)
    let oneChat = useSelector((state) => state.chatSL.oneChat)
    // one chat ở đây là chat đó
    const [text, setText] = useState('');

    const handleSendMessage = () => {
        let chatId = oneChat[0]._id;
        let senderId = user._id;
        dispatch(createMessage(chatId, senderId, text))
        setText("")

    };
    return <>
        <Box p={2} display="flex" borderTop="1px solid #ddd" bgcolor="#f9f9f9">
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Nhập tin nhắn..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
                onClick={handleSendMessage}
            >
                Gửi
            </Button>
        </Box>
    </>
}

export default MessageInput