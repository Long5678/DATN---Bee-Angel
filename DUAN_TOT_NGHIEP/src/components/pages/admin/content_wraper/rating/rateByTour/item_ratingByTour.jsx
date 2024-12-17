import Button from '@mui/material/Button';
import { useFindUserComment } from "../../../../../../hooks/usefindusercomment"
import { delRating } from "../../../../../../redux/thunk/rating_thunk"
import { useDispatch } from 'react-redux';

function Item_ratingByTour({ _id, tourId ,userId, rating, review, i }) {
    let { recipientUser } = useFindUserComment(userId)
    let dispatch = useDispatch();

     const handleDelete = () => {
            if (window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
                dispatch(delRating(_id));
            }
        };

    return <>
        <tr>
            <th className='center-th' scope="row">{i + 1}</th>
            <td>{recipientUser?.name }</td>
            <td>{review}</td>
            <td>{rating}</td>
            <td><Button onClick={handleDelete} color="error" variant="outlined">Delete</Button></td>
        </tr>
    </>
}

export default Item_ratingByTour