import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getoneOder, getOneTour, getAllTour } from "../../../redux/action_thunk";

const StatusNotification = ({idOrder, idTour, message}) =>{
    let dispatch = useDispatch();
    const tours = useSelector((state) => state.tourSL?.tourDatas); // Lấy danh sách tour từ Redux Store

    useEffect(() => {
        dispatch(getAllTour())
    }, [])


    useEffect(() => {
        dispatch(getoneOder(idOrder));
        dispatch(getOneTour(idTour));
    }, [idOrder, idTour]);

     // Hàm lấy tên tour dựa trên idTour
     const getTourName = (idTour) => {
        const tour = tours?.find((tour) => tour._id === idTour);
        return tour ? tour.name : "Tên tour không xác định";
    };
    

    return  (
                <div className="notification-item">
                    <img src='src/publics/image/images/image.png' alt="avatar" className="avatar" />
                    <div className="notification-content">
                        <p>
                            <strong>Bee Nhân Viên</strong> 
                            <div> {getTourName(message)}Bạn đã Hoàn thành. Vui lòng để lại đánh giá của bạn.</div>
                        </p>
                        <button className="feedback-btn">Đánh giá</button>
                        <span className="time"> vài giây trước</span>
                    </div>
                </div>
    )
}
export default StatusNotification;