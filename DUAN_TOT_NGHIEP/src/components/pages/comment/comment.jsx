import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import Reply from "./reply";
import UpdateCommentForm from "./edit_comment";
import { AuthContext } from "../../../context/authContext";
import { addReply, delComment } from "../../../redux/thunk/comment_thunk";
import { useFindUserComment } from "../../../hooks/usefindusercomment";
import moment from "moment"

const Comment = ({ comment }) => {
  let dispatch = useDispatch()
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useContext(AuthContext)
  const { recipientUser } = useFindUserComment(comment.userId)

  useEffect(() => {
    console.log("comment", comment);

  }, [comment])


  const handleReply = () => {
    if (!replyText.trim()) {
      alert("Phản hồi không được để trống.");
      return;
    }
    setShowReplyForm(false);
    setReplyText("");
    dispatch(addReply(comment._id, replyText, user._id, user._id, user.name));
  };



  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (!recipientUser) {
    return null
  }

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
      dispatch(delComment(comment._id));
    }
  };

  // Định dạng thời gian gửi tin nhắn
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
  const formattedCreatedAt = formatMessageTime(comment?.createdAt)


  return (
    <div className="comment">
      <div className="comment-author">
        <div className="avatar-comment">
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
            <span className="comment-time">
              {formattedCreatedAt}
            </span>
          </div>
          <p className="comment-text">{comment.content}</p>
          {/* Hiển thị hình ảnh trong bình luận */}
          {comment.image && comment.image.length > 0 && (
            <div className="comment-images">
              {comment.image.map((image, index) => (
                <img
                  key={index}
                  // src={image}
                  src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/comments%2F${image}?alt=media`}
                  // alt={`comment-img-${index}`}
                  className="comment-image"
                  onClick={() => openImageModal(image)} // Mở modal khi nhấp vào ảnh
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          )}


          {/* Chỉ hiển thị nút Update khi user._id khớp với comment.userId._id */}
          {user?._id === comment.userId && (
            <button
              className="reply-btn"
              onClick={() => setShowUpdateForm(!showUpdateForm)}
            >
              {showUpdateForm ? "Hủy" : "Cập nhật"}
            </button>
          )}

          {showUpdateForm && (
            <UpdateCommentForm
              commentId={comment._id}
              initialText={comment.content}
              imagesUrl={comment.image}
              onCancel={() => setShowUpdateForm(false)}
            />
          )}
          {user?._id === comment.userId && (
            <button
              className="reply-btn"
              onClick={handleDelete}
            >
              Xóa bình luận
            </button>
          )}



          {user && (
            <button className="reply-btn" onClick={() => setShowReplyForm(!showReplyForm)}>
              {showReplyForm ? "Hủy" : "Phản hồi"}
            </button>
          )}

          {showReplyForm && user && (
            <div className="reply-form">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Viết phản hồi của bạn tại đây..."
                rows="2"
              ></textarea>
              <button className="submit-btn repli" onClick={handleReply}>
                Gởi phản hồi
              </button>
            </div>
          )}

        </div>
      </div>

      <div className="replies">
        {comment?.replies?.map((reply, index) => (
          <Reply key={index} reply={reply} />
        ))}
      </div>
      {isModalOpen && (
        <div className="modalIMG" onClick={closeModal}>
          <div className="modalIMG-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/comments%2F${selectedImage}?alt=media`}
              alt="Expanded Comment"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
