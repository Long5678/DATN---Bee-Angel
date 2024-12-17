// src/components/Reply.jsx
import { useFindUserComment } from "../../../hooks/usefindusercomment";
import moment from "moment"
const Reply = ({ reply }) => {
  console.log("reple",reply);
  
  let { recipientUser } = useFindUserComment(reply.userId)
  if (!recipientUser) {
    return;
  }

  const formatMessageTime = (createdAt) => {
    const now = moment();
    const messageTime = moment(createdAt);

    const difSeconds = now.diff(messageTime, "seconds");
    const diffMinutes = now.diff(messageTime, 'minutes');
    const diffHours = now.diff(messageTime, 'hours');
    const diffDays = now.diff(messageTime, 'days');
    if (difSeconds < 60) {
      return `vài giây`;
    }
    else if (diffMinutes < 60) {
      // Nếu tin nhắn được gửi trong vòng 60 phút
      return `${diffMinutes} phút`;
    } else if (diffHours < 24) {
      // Nếu tin nhắn được gửi trong vòng 24 giờ
      return `${diffHours} giờ`;
    } else if (diffDays === 1) {
      // Nếu tin nhắn được gửi hôm qua
      return 'Hôm qua';
    } else if (diffDays <= 7) {
      // Nếu tin nhắn được gửi trong vòng 1 tuần
      return messageTime.format('DD/MM');
    } else {
      // Nếu tin nhắn được gửi lâu hơn 1 tuần
      return messageTime.format('DD/MM');
    }
  };
  const formattedCreatedAt = formatMessageTime(reply?.createdAt)

  return (
    <div className="reply">
      <div className="comment-author">
        <div className="avatar-comment-reply">
          {recipientUser.avatar ?
            <img src={`${recipientUser.avatar}`} alt="Avatar" />
            :
            <img src="/src/publics/image/avatar_null.jpg" alt="Avatar" />
          }
        </div>

        <div style={{ width: "100%" }}>
          <div className="d-flex-name-time">
            <div className="box-comment-name-email">
              <h4>{recipientUser.name}</h4>
              <span>{recipientUser.email}</span>
            </div>
            <span className="comment-time">{formattedCreatedAt}</span>
          </div>
          <span className="comment-time">{reply.time}</span>
          <p className="comment-text">{reply.content}</p>
        </div>

      </div>
    </div>
  );
};

export default Reply;