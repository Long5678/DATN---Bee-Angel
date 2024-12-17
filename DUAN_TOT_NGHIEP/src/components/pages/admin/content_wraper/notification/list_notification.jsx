import { useDispatch, useSelector } from "react-redux"
import Item_Notification from "./item_notification"
import { useEffect } from "react"
import { getAllNotify } from "../../../../../redux/thunk/notification_thunk"


function List_Notification() {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllNotify())
    }, [])

    const notifyDatas = useSelector((state) => state.notifySL.notifyDatas)
    console.log('Thông báo:', notifyDatas);

    return <>
        <div className="table-danhMuc">
            <table className="table">
                <thead>
                    <tr>
                        <th className='center-th' scope="col">#</th>
                        <th scope="col">Tên Tour</th>
                        <th scope="col">Thông báo</th>
                        <th scope="col">Ngày gởi</th>

                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(notifyDatas) && notifyDatas.map((item, index) => {
                        return <Item_Notification key={index} {...item} i={index} />
                    })}
                </tbody>
            </table>
        </div>
    </>
}

export default List_Notification