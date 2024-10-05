import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { delTour, getOneTour } from '../../../../../redux/action_thunk';
import { useContext } from 'react';
import { PopupContext } from '../../../../../context/popupContext';

function Item_TourManager({ _id, name, price, status, location, i }) {
    let dispatch = useDispatch()
    const { setPopupEditTour } = useContext(PopupContext)
    const priceNumber = Number(price); // chuyển thành kiểu number
    const formatPrice = priceNumber.toLocaleString('vi-VN');

    // hàm này click vào nút edit tour sẽ hiện ra popup edit và get đc thông tin tuor đó
    function handleEditTour() {
        dispatch(getOneTour(_id))
        setPopupEditTour(true)
    }
    return <>
        <tr>
            <th className='center-th' scope="row">{i + 1}</th>
            <td>{name}</td>
            <td>{formatPrice} VNĐ</td>
            <td>{status}</td>
            <td>{location}</td>
            <td>
                <Button onClick={handleEditTour} style={{ marginRight: "10px" }} variant="contained">Edit</Button>
                <Button onClick={() => { dispatch(delTour(_id)) }} color="error" variant="outlined">Delete</Button>
            </td>
        </tr>
    </>
}

export default Item_TourManager