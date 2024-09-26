import { useFindUserComment } from '../../../hooks/usefindusercomment';

function Item_comment({_id, content, userId, tourId, ratingScore}) {
    const { recipientUser } = useFindUserComment(userId);
    console.log(recipientUser);

    if (!recipientUser) {
        return;
    }

    
    return <>
        <div className="comment-section">
            {/* {loading && <p>Đang tải bình luận...</p>}
                            {error && <p>Có lỗi xảy ra: {error}</p>} */}
            <div className="comment">
                <div className="avatar">👤</div>
                <div className="comment-content">
                    <h4>{recipientUser.name}</h4>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    </>

}

export default Item_comment;