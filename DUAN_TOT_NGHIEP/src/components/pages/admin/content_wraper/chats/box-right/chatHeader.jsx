import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useFetchRecipientUser } from '../../../../../../hooks/useFetchRecipient';
import { useContext } from 'react';
import { AuthContext } from '../../../../../../context/authContext';
function ChatHeader() {

  let { user } = useContext(AuthContext)
  let oneChat = useSelector((state) => state.chatSL.oneChat)
  const { recipientUser } = useFetchRecipientUser(oneChat[0], user);

  return <>
    <Box p={2} borderBottom="1px solid #ddd" bgcolor="#f9f9f9">
      <Typography variant="h6">{recipientUser?.name}</Typography>
    </Box>
  </>
}

export default ChatHeader