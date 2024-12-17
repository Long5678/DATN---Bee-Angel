import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function Item_Comment({ tour, totalComments, i }) {
    let navigation = useNavigate()

    const handleRateByTour = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan lên phần tử cha
        navigation(`/manager/Comment/List-Commented?id=${tour._id}`)
    }

    return <>
        <tr>
            <th className='center-th' scope="row">{i + 1}</th>
            <td>{tour?.name}</td>
            <td>{totalComments}</td>
            <td>
                <Button onClick={(e) => handleRateByTour(e)} style={{ marginRight: "10px" }} variant="contained">Chi Tiết</Button>
            </td>
        </tr>
    </>
}

export default Item_Comment