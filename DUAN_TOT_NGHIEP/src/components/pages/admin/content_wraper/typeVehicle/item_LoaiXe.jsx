import Button from '@mui/material/Button';

import { useContext, useEffect } from 'react';
import { PopupContext } from '../../../../../context/popupContext';
import { delVehicle, getOneVehicle } from '../../../../../redux/action_vehicle';
import { useDispatch } from 'react-redux';

function Item_LoaiXe({ _id, name, description, i }) {
    let dispatch = useDispatch()
    const { setPopupEdit } = useContext(PopupContext)
    const handleEdit = (id) => {
        dispatch(getOneVehicle(id))
        setPopupEdit(true)
    }
    const deletaVehicle = async () => {
        console.log(name, _id);
        dispatch(delVehicle(_id));
    };

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa loại danh mục này?")) {
            dispatch(delVehicle(_id));
        }
    };


    return <>
        <tr>
            <th className='center-th' scope="row">{i + 1}</th>
            <td>{name}</td>
            <td>{description}</td>
            <td>
                <Button onClick={() => handleEdit(_id)} style={{ marginRight: "10px" }} variant="contained">Edit</Button>
                <Button onClick={handleDelete} color="error" variant="outlined">Delete</Button>
            </td>
        </tr>
    </>
}

export default Item_LoaiXe
