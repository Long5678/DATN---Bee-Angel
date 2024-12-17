import { useContext } from "react"
import ItemUser from "./itemUser"
import { useSelector } from "react-redux"
import { PopupContext } from "../../../../../context/popupContext"
import DetailUser from "./detailUser"

function ListUser() {
  let { isPopupDetailUser } = useContext(PopupContext)
  let userDatas = useSelector((state) => state.userSL.user)


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