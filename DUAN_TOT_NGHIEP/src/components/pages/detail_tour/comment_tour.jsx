import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentByTour } from '../../../redux/action_thunk';
import { useSearchParams } from "react-router-dom"; // Giả sử action này đã được định nghĩa

function Comment_tour() {
    const [searchParams] = useSearchParams();
    const idTour = searchParams.get("id"); // Lấy token từ URL
    const dispatch = useDispatch();
    let commentDatas = useSelector((state) => state.CommentSL.commentDatas)
    const [newComment, setNewComment] = useState('');  // Quản lý input cho bình luận mới

    // Lấy bình luận khi component mount
    useEffect(() => {
        dispatch(getCommentByTour(idTour));
    }, [idTour]);

    const handleSendComment = () => {
        // Logic để gửi bình luận (có thể gọi action thêm bình luận)
        console.log('Sending comment:', newComment);
        setNewComment('');
    };

    return (
        <>
            <div className="main-list-tour">
                <div className="box-list-tour">
                    <div className="tieuDe-tour">
                        <h2>Bình Luận</h2>
                    </div>
                    <div className="line-tour"></div>
                    {/* Comment input */}
                    <div>
                        <div className="comment-input">
                            <div className="avatar">👤</div>
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Điều bạn muốn nói"
                            />
                            <button onClick={handleSendComment}>Gửi</button>
                        </div>

                        {/* Comment section */}
                        <div className="comment-section">
                            {/* {loading && <p>Đang tải bình luận...</p>}
                            {error && <p>Có lỗi xảy ra: {error}</p>} */}
                            {commentDatas.map((comment, index) => (
                                <div key={index} className="comment">
                                    <div className="avatar">👤</div>
                                    <div className="comment-content">
                                        <h4>{comment.username}</h4>
                                        <p>{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comment_tour;