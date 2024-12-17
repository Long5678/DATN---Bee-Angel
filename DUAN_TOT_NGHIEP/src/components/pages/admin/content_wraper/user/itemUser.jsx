import Button from '@mui/material/Button';
import { useContext } from 'react';
import { PopupContext } from '../../../../../context/popupContext';
import { useDispatch } from 'react-redux';
import { editBlockUser, getOneUser } from '../../../../../redux/action_thunk';
function ItemUser({ _id, name, email, phone, avatar, isBlocked, i }) {
  let dispatch = useDispatch()
  let { setIsPopupDetailUser } = useContext(PopupContext)
  function handleDetailUser() {
    setIsPopupDetailUser(true)
    dispatch(getOneUser(_id))
  }

  const handleBlockUser = (data) => {
    dispatch(editBlockUser(_id, data))
  }
  return <>

    <tr className='tr-user'>
      <th className='center-th' scope="row">{i + 1}</th>
      <td>
        <section className='d-flex-user'>
          <div className='avatar-user-manager'>
            {avatar ?
              <img src={avatar} alt="" />
              :
              <img src="/src/publics/image/avatar_null.jpg" alt="" />
            }
          </div>
          <span> {name}</span>
        </section>
      </td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>Nam</td>
      <td>
        <Button onClick={handleDetailUser} style={{ marginRight: "10px" }} variant="contained">Chi tiết</Button>
        {isBlocked ?
          <Button onClick={() => handleBlockUser(false)} variant="outlined" color="success">Mở Khóa</Button>
          : <Button onClick={() => handleBlockUser(true)} color="error" variant="outlined">Khóa</Button>
        }
      </td>
    </tr>
  </>
}

export default ItemUser