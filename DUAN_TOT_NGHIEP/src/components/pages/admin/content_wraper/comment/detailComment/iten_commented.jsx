import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useFindUserComment } from "../../../../../../hooks/usefindusercomment"
import { delComment } from "../../../../../../redux/thunk/comment_thunk"

function Item_Commented({ _id, tourId, userId, content, i }) {
    let { recipientUser } = useFindUserComment(userId)
    let dispatch = useDispatch();

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
            dispatch(delComment(_id));
        }
    };
    return <>
        <tr>
            <th className='center-th' scope="row">{i + 1}</th>
            <td>{recipientUser?.name}</td>
            <td>{content}</td>
            <td><Button onClick={handleDelete } color="error" variant="outlined">Delete</Button></td>
        </tr>
    </>
}

export default Item_Commented