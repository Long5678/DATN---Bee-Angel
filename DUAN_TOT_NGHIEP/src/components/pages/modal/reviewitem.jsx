import { useState, useEffect, useContext } from 'react';
import { useFindUserComment } from '../../../hooks/usefindusercomment';
import { AuthContext } from '../../../context/authContext';
import axios from 'axios';

const ReviewItem = ({ rating }) => {
  const [expandedReplies, setExpandedReplies] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // State cho ảnh được chọn
  console.log("Rating prop:", rating);
  const [helpfulCount, setHelpfulCount] = useState(rating.helpFulCount || 0);
  const [notHelpfulCount, setNotHelpfulCount] = useState(rating.notHelpFulCount || 0);
  const [isActionTaken, setIsActionTaken] = useState(false); // Trạng thái đã nhấn nút
  const { user } = useContext(AuthContext);

  let { recipientUser } = useFindUserComment(rating.userId)
  console.log("ALOAO", rating.userId);

  const toggleReply = (replyId) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
  };

  const openImageModal = (url) => {
    setSelectedImage(url); // Cập nhật URL ảnh khi mở modal
  };

  const closeImageModal = () => {
    setSelectedImage(null); // Đặt lại URL ảnh khi đóng modal
  };

  useEffect(() => {
    const checkUserAction = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Rating/${rating._id}/UserAction`,
          { params: { userId: user._id } }
        );
        setIsActionTaken(response.data.actionTaken);
      } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái người dùng:", error);
        setIsActionTaken(false); // Reset nếu có lỗi
      }
    };

    checkUserAction();
  }, [rating?._id, user?._id]);

  const handleAction = async (action) => {
    if (isActionTaken) return;

    try {
      // Gửi yêu cầu lên server
      const response = await axios.post("http://localhost:3000/Rating/HelpFulOrNot", {
        id: rating._id,
        userId: user._id,
        action,
      });

      // Cập nhật số liệu từ phản hồi API
      setHelpfulCount(response.data.helpfulCount);
      setNotHelpfulCount(response.data.notHelpfulCount);
      setIsActionTaken(true); // Ngăn nhấn lại
    } catch (error) {
      console.error("Lỗi khi cập nhật lượt hữu ích:", error);
    }
  };


  return (
    <div className="review">
      <div className="user-info">
        <div className="user-header">
          <div className="user-avatar">
            {recipientUser?.avatar ? (
              <img src={recipientUser.avatar} alt="Avatar người dùng" />
            ) : (
              <div className="initial-avatar">
                {recipientUser?.name ? recipientUser.name.charAt(0).toUpperCase() : '?'}
              </div>
            )}
          </div>

          <div>
            <span>{recipientUser?.name}</span><br />
            <span>{recipientUser?.gender}</span>
          </div>
        </div>
      </div>
      <div className="users-content">
        <div className="users-header">
          <div>
            <div>Ngày đánh giá: {new Date(rating.createdAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}</div>
          </div>
          <div className="rating-box2">{rating.rating}.0</div>
        </div>
        <div className="users-body">
          <div className="positive">{rating.review}</div>
          <div className="image-gallery">
            {Array.isArray(rating.imageUrls) && rating.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Review Image ${index + 1}`}
                className="review-image"
                style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }}
                onClick={() => openImageModal(url)} // Mở modal khi nhấn vào ảnh
              />
            ))}
          </div>
        </div>
        {/* Hiển thị modal khi có ảnh được chọn */}
        {selectedImage && (
          <div className="modalImg" onClick={closeImageModal}>
            <span className="close-modalImg" onClick={closeImageModal}>&times;</span>
            <img className="modalImg-content" src={selectedImage} alt="Expanded Image" />
          </div>
        )}
        {Array.isArray(rating.replies) && rating.replies.map((reply) => {
          const { recipientUser: replyUser } = useFindUserComment(reply.userId); // Fetch user details for each reply

          return (
            <div className="response" key={reply._id}>
              <div className="response-header">
                {replyUser?.name ? replyUser.name : 'Unknown User'}
              </div>
              <div className="response-content">
                {expandedReplies[reply._id] ? reply.reply : `${reply.reply.slice(0, 50)}...`}
              </div>
              <button className='expanded' onClick={() => toggleReply(reply._id)}>
                {expandedReplies[reply._id] ? "Thu gọn" : "Đọc tiếp"}
              </button>
            </div>
          );
        })}

        <div className="actions">
          {user ?
            <>
              <button
                onClick={() => handleAction("helpful")}
                disabled={isActionTaken}
                style={{ color: isActionTaken ? "gray" : "#007bff" }}
              >
                Hữu ích ({helpfulCount})
              </button>
              <button
                onClick={() => handleAction("notHelpful")}
                disabled={isActionTaken}
                style={{ color: isActionTaken ? "gray" : "#007bff" }}
              >
                Không hữu ích ({notHelpfulCount})
              </button></>
            :
            <>
              <button
                style={{ color: "gray" }}
              >
                Hữu ích ({helpfulCount})
              </button>
              <button
                style={{ color: "gray" }}
              >
                Không hữu ích ({notHelpfulCount})
              </button></>
          }

        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
