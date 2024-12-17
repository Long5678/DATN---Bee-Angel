import { useDispatch, useSelector } from "react-redux"
import Item_tourRelated from "./item-tourRelated"
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react"
import { getAllTour, getAllTourDM } from "../../../../redux/action_thunk"

function List_tourRelated() {
    let dispatch = useDispatch()
    const [searchParams] = useSearchParams(); // lấy id từ url
    const tourId = searchParams.get("id");
    const tourDatas = useSelector((state) => state.tourSL.tourDatas)
    useEffect(() => {
        dispatch(getAllTour(8))
    }, [tourId])

    return <>
        <div className="listTourRelated">
            {tourDatas.map((item,index) => {
                return <Item_tourRelated key={index} {...item} />
            })}
        </div>
    </>
}

export default List_tourRelated