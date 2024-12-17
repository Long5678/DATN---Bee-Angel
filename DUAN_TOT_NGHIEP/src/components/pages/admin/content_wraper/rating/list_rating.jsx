import { useDispatch, useSelector } from "react-redux"
import Item_rating from "./item_rating"
import { useEffect } from "react"
import { getAllRatingTours } from "../../../../../redux/thunk/rating_thunk"


function List_rating() {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllRatingTours())
    }, [])

    const ratingDatas = useSelector((state) => state.RatingSL.ratingDatas)
    console.log(ratingDatas);

    return <>
        <div className="table-danhMuc">
            <table className="table">
                <thead>
                    <tr>
                        <th className='center-th' scope="col">#</th>
                        <th scope="col">Tên Tour</th>
                        <th scope="col">Số lượng đánh giá</th>
                        <th scope="col">Tổng số điểm đánh giá</th>
                        <th scope="col">Hành Động</th>

                    </tr>
                </thead>
                <tbody>
                    {ratingDatas.map((item, index) => {
                        return <Item_rating key={index} {...item} i={index} />
                    })}
                </tbody>
            </table>
        </div>
    </>
}

export default List_rating