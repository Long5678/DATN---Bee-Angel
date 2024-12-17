import { useDispatch, useSelector } from "react-redux"
import Item_NotificationVehicle from "./item_notification"
import { useEffect } from "react"
import { getAllNotifyVehicle } from "../../../../../redux/thunk/action_notifiVeh"


function List_Notificationvehicle() {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllNotifyVehicle())
    }, [])

    const notifyVehicleDatas = useSelector((state) => state.notifyVehicleSL.notifyVehicleDatas)
    console.log('Thông báo:', notifyVehicleDatas);

    return <>
        <div className="table-danhMuc">
            <table className="table">
                <thead>
                    <tr>
                        <th className='center-th' scope="col">#</th>
                        <th scope="col">Tên Xe</th>
                        <th scope="col">Thông báo</th>
                        <th scope="col">Ngày gởi</th>

                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(notifyVehicleDatas) && notifyVehicleDatas.map((item, index) => {
                        return <Item_NotificationVehicle key={index} {...item} i={index} />
                    })}
                </tbody>
            </table>
        </div>
    </>
}

export default List_Notificationvehicle