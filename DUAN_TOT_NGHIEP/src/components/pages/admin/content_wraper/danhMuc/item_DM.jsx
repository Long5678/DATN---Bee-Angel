import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { delDanhMuc, getOneDanhMuc } from '../../../../../redux/action_thunk';
import { useContext } from 'react';
import { PopupContext } from '../../../../../context/popupContext';

function Item_DM({ _id, name, description, i }) {
    let dispatch = useDispatch()
    const { setPopupEdit } = useContext(PopupContext)

    const handleEdit = (id) => {
        dispatch(getOneDanhMuc(id))
        setPopupEdit(true)
    }
    return <>
        <tr>
            <th className='center-th' scope="row">{i + 1}</th>
            <td>{name}</td>
            <td>{description}</td>
            <td>
                <Button onClick={() => handleEdit(_id)} style={{ marginRight: "10px" }} variant="contained">Edit</Button>
                <Button onClick={() => { dispatch(delDanhMuc(_id)) }} color="error" variant="outlined">Delete</Button>
            </td>
        </tr>
    </>
}

export default Item_DM