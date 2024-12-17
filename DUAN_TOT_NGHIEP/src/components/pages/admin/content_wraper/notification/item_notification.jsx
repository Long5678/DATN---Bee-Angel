import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllTour, getAllUser } from "../../../../../redux/action_thunk"

function Item_Notification({ tourId, userId, message, status, createdAt, isRead, i }) {
    let dispatch = useDispatch();
    const tours = useSelector((state) => state.tourSL?.tourDatas); // Lấy danh sách tour từ Redux Store
    const users = useSelector((state) => state.userSL?.user); 

    useEffect(() => {
        dispatch(getAllTour())
    }, [])

    useEffect(() => {
        dispatch(getAllUser())
    }, [])


    // Hàm lấy tên tour dựa trên idTour
    const getTourName = (idTour) => {
        const tour = tours?.find((tour) => tour._id === idTour);
        return tour ? tour.name : "Tên tour không xác định";
    };

    const getUserName = (userId) => {
        const user = users?.find((user) => user._id === userId);
        return user ? user.name : "Tên tour không xác định";
    };
    return <>
        <tr>
            <th className='center-th' scope="row">{i + 1}</th>
            <td>{getTourName(tourId)}</td>
            <td>Đã gởi thông báo {status} cho {getUserName (userId)}</td>
            <td> {new Date(createdAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })} </td>
        </tr>
    </>
}

export default Item_Notification