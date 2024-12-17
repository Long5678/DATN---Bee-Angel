import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllUser } from "../../../../../redux/action_thunk"
import { getAllCar } from "../../../../../redux/action_vehicle";

function Item_NotificationVehicle({ idCar, userId, status, createdAt, i }) {
    let dispatch = useDispatch();
    const cars = useSelector((state) => state.carSL?.carDatas); // Lấy danh sách tour từ Redux Store
    const users = useSelector((state) => state.userSL?.user); 

    useEffect(() => {
        dispatch(getAllCar())
    }, [])

    useEffect(() => {
        dispatch(getAllUser())
    }, [])


    // Hàm lấy tên tour dựa trên idTour
    const getCarName = (idCar) => {
        const car = cars?.find((car ) => car ._id === idCar);
        return car  ? car .name : "Tên Xe không xác định";
    };

    const getUserName = (userId) => {
        const user = users?.find((user) => user._id === userId);
        return user ? user.name : "Tên Người dùng không xác định";
    };
    return <>
        <tr>
            <th className='center-th' scope="row">{i + 1}</th>
            <td>{getCarName(idCar)}</td>
            <td>Đã gởi thông báo {status} cho {getUserName (userId)}</td>
            <td> {new Date(createdAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })} </td>
        </tr>
    </>
}

export default Item_NotificationVehicle