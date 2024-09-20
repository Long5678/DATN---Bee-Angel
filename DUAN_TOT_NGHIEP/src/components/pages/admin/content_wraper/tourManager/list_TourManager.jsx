import { useContext, useEffect } from "react"
import Add_TourManger from "./add_TourManger"
import Item_TourManager from "./item_TourManager"
import Page_TourManager from "./page_TourManager"
import Search_TourManager from "./search_TourManager"
import { AuthContext } from "../../../../../context/authContext"
import { useDispatch, useSelector } from "react-redux"
import { getAllDanhMuc, getAllTour } from "../../../../../redux/action_thunk"


function List_tourManager() {
  let dispatch = useDispatch()
  const { user } = useContext(AuthContext)
  let tourDatas = useSelector((state) => state.tourSL.tourDatas)

  // sử dụng effect để gửi action đến getAllDanhMuc
  useEffect(() => {
    dispatch(getAllDanhMuc())
  }, [user])

  useEffect(() => {
     dispatch(getAllTour())
  }, [user])


  return <>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Tour</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Tour</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <Add_TourManger />
    <Search_TourManager />


    <div className="table-danhMuc">
      <table className="table">
        <thead>
          <tr>
            <th className='center-th' scope="col">#</th>
            <th scope="col">Tên Tour</th>
            <th scope="col">Đơn Giá</th>
            <th scope="col">Trạng Thái</th>
            <th scope="col">Loại Tour</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {tourDatas.map((item, index) => {
            return <Item_TourManager key={index} {...item} i={index} />
          })}
        </tbody>
      </table>
    </div>

    <Page_TourManager />
  </>
}

export default List_tourManager