import { useContext, useEffect } from "react"
import ItemUser from "./itemUser"
import { useDispatch, useSelector } from "react-redux"
import { getAllUser } from "../../../../../redux/action_thunk"
import { PopupContext } from "../../../../../context/popupContext"
import DetailUser from "./detailUser"

function ListUser() {
  let { isPopupDetailUser, setIsPopupDetailUser } = useContext(PopupContext)
  let dispatch = useDispatch()
  let userDatas = useSelector((state) => state.userSL.user)
  useEffect(() => {
    dispatch(getAllUser())
  }, [])

  return <>
    {isPopupDetailUser && <DetailUser />}
    <div className="table-danhMuc">
      <table className="table">
        <thead>
          <tr>
            <th className='center-th' scope="col">#</th>
            <th scope="col">Tên khách hàng</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Giới tính</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {userDatas.map((item, index) => {
            return <ItemUser key={index} {...item} i={index} />
          })}
        </tbody>
      </table>
    </div>
  </>
}

export default ListUser