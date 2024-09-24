import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { delTour } from '../../../../../redux/action_thunk';

function Item_TourManager({_id, name, price, status, location, i }) {
    let dispatch = useDispatch()
    const priceNumber = Number(price); // chuyển thành kiểu number
    const formatPrice = priceNumber.toLocaleString('vi-VN');
  return <>
      <tr>
          <th className='center-th' scope="row">{i+ 1}</th>
          <td>{name}</td>
          <td>{formatPrice} VNĐ</td>
          <td>{status}</td>
          <td>{location}</td>
          <td>
              <Button style={{ marginRight: "10px" }} variant="contained">Edit</Button>
              <Button onClick={() => {dispatch(delTour(_id))}} color="error" variant="outlined">Delete</Button>
          </td>
      </tr>
  </>
}

export default Item_TourManager