import Page_TourManager from "../tourManager/page_TourManager"
import ListUser from "./listUser"
import "../../../../../publics/styles/style-admin/user_admin.scss"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getAllUserByRole } from "../../../../../redux/action_thunk"

function Main_user() {
  let dispatch = useDispatch()
  const [indexCount, setIndexCount] = useState(0); // state này kiểu lấy index vd 0 là user, 1 là nhân viên
  const onClickTabUser = (index) => {
    setIndexCount(index)
  }

  useEffect(() => {
    if (indexCount == 0) {
      dispatch(getAllUserByRole("user"))
    } else if(indexCount == 1) {
      dispatch(getAllUserByRole("staff"))
    }
  }, [indexCount])
  return <>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Người dùng</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Người dùng</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div className="list_tab_user_admin">
      <div className="tab_user_admin">
        <div onClick={() => onClickTabUser(0)} className={`box_tab_user ${indexCount == 0 && "active-tab"}`} >Khách hàng</div>
        <div onClick={() => onClickTabUser(1)} className={`box_tab_staff ${indexCount == 1 && "active-tab"}`}>Nhân viên</div>
      </div>
      <div style={{ transform: `translateX(${indexCount === 0 ? "0%" : "100%"})` }} className="line-tab-user-admin" ></div>
    </div>


    <ListUser />
    <Page_TourManager />
  </>
}

export default Main_user