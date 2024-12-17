import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function Item_rating({ tour, totalRatings, averageRating, i }) {
    let navigation = useNavigate()

    const handleRateByTour = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan lên phần tử cha
        navigation(`/manager/rating/rated?id=${tour._id}`)
    }

    return <>
        <tr>
            <th className='center-th' scope="row">{i + 1}</th>
            <td>{tour?.name}</td>
            <td>{totalRatings}</td>
            <td>{averageRating}</td>
            <td>
                <Button onClick={(e) => handleRateByTour(e)} style={{ marginRight: "10px" }} variant="contained">Chi Tiết</Button>
            </td>
        </tr>
    </>
}

export default Item_rating