import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getRating } from "../../../../../../redux/thunk/rating_thunk";
import { useSearchParams } from 'react-router-dom';
import Item_ratingByTour from "./item_ratingByTour";

function List_ratingByTour() {
    let dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const tourId = searchParams.get("id");
    const isError = useSelector((state) => state.RatingSL.isErrorStatus);

    useEffect(() => {
        dispatch(getRating(tourId))
    }, [tourId])
    const ratingDatas = useSelector((state) => state.RatingSL.ratingDatas)
    console.log(ratingDatas);

    return <>
        <div className="table-danhMuc">
            <table className="table">
                <thead>
                    <tr>
                        <th className='center-th' scope="col">#</th>
                        <th scope="col">Tên Người Dùng</th>
                        <th scope="col">Đánh Giá</th>
                        <th scope="col">Số Sao</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {isError ? (
                            <p>Tour này hiện tại chưa có đánh giá</p>
                    ) : (
                        ratingDatas.map((item, index) => {
                            return <Item_ratingByTour key={index} {...item} i={index} />
                        })
                    )}
                   
                </tbody>
            </table>
        </div>
    </>
}

export default List_ratingByTour