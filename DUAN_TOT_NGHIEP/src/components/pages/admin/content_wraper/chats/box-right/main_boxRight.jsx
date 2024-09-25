import { Box } from '@mui/material';
import ChatHeader from './chatHeader';
import MessageSection from './messageSection';
import MessageInput from './messageInput';
import { useContext } from 'react';
import { PopupContext } from '../../../../../../context/popupContext';

function Main_boxRight() {
    const { checkCurrentChat } = useContext(PopupContext)
    return <>
        <Box flexGrow={1} display="flex" flexDirection="column">
            {checkCurrentChat ? "Chọn đoạn chat"
                :
                <>
                    <ChatHeader />
                    <MessageSection />
                    <MessageInput />
                </>
            }
        </Box>
    </>
}

export default Main_boxRight