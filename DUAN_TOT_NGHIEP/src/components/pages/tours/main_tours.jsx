import Banner from "../home/banner"
import Header from "../../layouts/header"
import Item_tour from "../home/item_tour"
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllTourDM, getOneDanhMuc } from "../../../redux/action_thunk"
function Main_tours() {
  let dispatch = useDispatch()
  let [searchParams] = useSearchParams();
  const iddm = searchParams.get("id"); // Lấy iddm từ URL

  useEffect(() => {
    dispatch(getAllTourDM(iddm))
  }, [iddm]) // nó sẽ thay đổi nếu iddm thay đổi

  useEffect(() => {
     dispatch(getOneDanhMuc(iddm))
  }, [iddm])

  let tourDatas = useSelector((state) => state.tourSL.tourDatas)
  let danhMucOne = useSelector((state) => state.danhMucSL.danhMucOne)

  console.log("tourDM", tourDatas);

  return <>
    <Header />
    <Banner />
    <div className="main-list-tour">
      <div className="box-list-tour">
        <div className="tieuDe-tour">
          <h2>Danh sách Tour {danhMucOne.name}</h2>
          <p><a href="#">Hiển thị tất cả</a></p>
        </div>
        <div className="line-tour"></div>

        <div className="list-tour">
          {tourDatas.length > 0
            ?
            tourDatas.map((item, index) => {
              return <Item_tour key={index} {...item} />
            })
            :
            "không có tour này"
          }
        </div>
      </div>
    </div>
  </>
}

export default Main_tours
