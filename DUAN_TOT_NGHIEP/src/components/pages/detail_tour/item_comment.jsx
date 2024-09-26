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
                <div className="avatar">{recipientUser?.avatar ? 
                    <img src={recipientUser.avatar} alt="" />
                :
                    <img src="/src/publics/image/avatar_null.jpg" alt="" />
                }</div>
                <div className="comment-content">
                    <h5>{recipientUser.name}</h5>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    </>

}

export default Item_comment;