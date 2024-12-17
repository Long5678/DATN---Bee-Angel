import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useContext, useRef, useEffect } from 'react'
import { AuthContext } from "../../../../../../context/authContext";
import moment from 'moment';
function MessageSection() {

    // lấy thông tin message 
    let messageDatas = useSelector((state) => state.messageSL.messageDatas)
    // lấy thông tin user để so sanh vs senderID
    const { user } = useContext(AuthContext)


    // useRef 
    const scroll = useRef();
    // phần này tôi sẽ thực hiện khi ai đó nhắn thì nó sẽ cuộn tới cái phần nhắn mà ko phải tự cuộn
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messageDatas])
    

    return <>
        <Box flexGrow={1} p={2} overflow="auto" bgcolor="#eaeaea">
            {messageDatas.map((msg, index) => (
                <div key={index} className={`item-content-message ${msg.senderId == user?._id && "user-message"}`} ref={scroll} >
                    <Box
                        p={1.5}
                        mb={1.5}
                        borderRadius={2}
                        bgcolor="white"
                        boxShadow={1}
                        display="inline-block"
                        className="box-item-message"
                    >
                        <Typography className='text-chat' variant="body2">{msg.text}</Typography>
                        <Typography variant="caption" >
                            {moment(msg.createdAt).calendar()}
                        </Typography>
                    </Box>
                </div>
            ))}
        </Box>
    </>
}

export default MessageSection