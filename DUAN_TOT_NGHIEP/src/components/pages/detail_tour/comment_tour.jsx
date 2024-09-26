import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentByTour } from '../../../redux/action_thunk';
import { useSearchParams } from "react-router-dom"; // Giả sử action này đã được định nghĩa
// import { useFindUserComment } from '../../../hooks/usefindusercomment';
import Item_comment from './item_comment';

function Comment_tour() {
    const [searchParams] = useSearchParams();
    const idTour = searchParams.get("id"); // Lấy token từ URL
    const dispatch = useDispatch();
    let commentDatas = useSelector((state) => state.CommentSL.commentDatas)
    const users = useSelector((state) => state.userSL.users || []); // Assuming users are stored here
    const [newComment, setNewComment] = useState('');  // Quản lý input cho bình luận mới
    const userOne = useSelector((state) => state.userSL.userOne)
    // const { recipientUser } = useFetchRecipientUser();
    // console.log(userOne.name);

    // Lấy bình luận khi component mount
    useEffect(() => {
        dispatch(getCommentByTour(idTour));
    }, [idTour]);

    const handleSendComment = () => {
        // Logic để gửi bình luận (có thể gọi action thêm bình luận)
        console.log('Sending comment:', newComment);
        setNewComment('');
    };


    // const getUserNameById = (userId) => {
    // console.log(userId);

    //     // const user = users.find((user) => user.id === userId); // Find user by id in the current state

    //     if (userId) {
    //         // If the user is not found, dispatch an action to fetch the user
    //         dispatch(getOneUser(userId));
    //         // console.log(userId);
    //         return "Loading..."; // Temporarily return "Loading..." while the user data is being fetched


    //     }
    //     // return user.name; // Return the user's name once loaded
    // };

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
                        {commentDatas.map((item, index) => {
                            return <Item_comment key={index} {...item} />
                        })}

                    </div>
                </div>
            </div>
        </>
    );
}

export default Comment_tour;