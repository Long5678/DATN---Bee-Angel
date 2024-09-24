import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
// import img1 from '../../public/_7c578581-cdb5-4bab-a078-4eebf77689bd.jpg'
function Chat() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello ', seen: false },
        { id: 2, text: 'Hola', seen: false },
        { id: 3, text: 'halo', seen: true }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            setMessages([...messages, { id: messages.length + 1, text: inputMessage, seen: false }]);
            setInputMessage('');
        }
    };

    return (
        <>
            <div className='chat-dpl'>
              
                <Button aria-describedby={id} variant="contained" onClick={handleClick} className='button-chat'>
                    <ModeCommentIcon />
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    className='chat-popover'
                >

                    <div className="chat-container">
                        <div className="chat-header">
                            <div className="profile-icon"></div>
                            <span>Nhân viên hỗ trợ khách hàng</span>
                            {/* <div className="status">
                    <span className="status-indicator"></span>
                    <span>Hoạt động</span>
                </div> */}
                        </div>

                        <div className="chat-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className="chat-message">
                                    <div className="chat-avatar"></div>
                                    <div className="chat-bubble">
                                        <p>{msg.text}</p>
                                        {msg.seen && <span className="seen-icon">Đã xem</span>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder="Nhập tin bạn muốn nhắn"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                            />
                            <button onClick={handleSendMessage}>
                                <SendIcon />
                            </button>
                        </div>
                    </div>

                </Popover>
            </div>


        </>
    );
}

export default Chat;