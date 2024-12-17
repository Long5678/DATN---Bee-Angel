import { useContext } from 'react'
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { delBlog, getOneBlog } from '../../../../../redux/action_thunk';
import { PopupContext } from '../../../../../context/popupContext';
const ItemBlog = ({ _id, title, author, datePosted, i }) => {
  let dispatch = useDispatch()
  const { setPopupEditBlog } = useContext(PopupContext)
  const formattedDate = new Date(datePosted).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleEdit = () => {
    dispatch(getOneBlog(_id))
    setPopupEditBlog(true)
  }

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa blog này?")) {
      dispatch(delBlog(_id));
    }
  };
  return <>
    <tr>
      <th className='center-th' scope="row">{i + 1}</th>
      <td>{title}</td>
      <td>{author}</td>
      <td>{formattedDate}</td>
      <td>
        <Button onClick={handleEdit} style={{ marginRight: "10px" }} variant="contained">Edit</Button>
        <Button onClick={handleDelete} color="error" variant="outlined">Delete</Button>
      </td>
    </tr>
  </>

}

export default ItemBlog
