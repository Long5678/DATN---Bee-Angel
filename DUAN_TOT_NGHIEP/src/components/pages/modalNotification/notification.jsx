import React, { useEffect, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotify } from "../../../redux/thunk/notification_thunk";
import { getAllTour } from "../../../redux/action_thunk";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import moment from "moment";
import "../../../publics/styles/Notification.scss";
import StatusNotificationVehical from "./vehicleNotification";
import { getNotifyVehicle } from "../../../redux/thunk/action_notifiVeh";
import { getAllCar, getAllVehicle } from "../../../redux/action_vehicle";

const Notification = ({ isOpen, onClose }) => {
    const dropdownRef = useRef();
    const dispatch = useDispatch();
    let navigation = useNavigate();
    const { user } = useContext(AuthContext);
    const tours = useSelector((state) => state.tourSL?.tourDatas); // Lấy danh sách tour từ Redux Store
    const cars = useSelector((state) => state.carSL?.carDatas); // Lấy danh sách tour từ Redux Store
    const orderNoti = useSelector((state) => state.notifySL.notifyDatas);
    const isLoading = useSelector((state) => state.notifySL.loadNotify); // Lấy trạng thái loading
    const notifyVehicleDatas = useSelector(
        (state) => state.notifyVehicleSL.notifyVehicleDatas
    );
    useEffect(() => {
        if (user?._id && isOpen) {
            dispatch(getNotify(user._id));
        }
    }, [user, isOpen]);

    useEffect(() => {
        console.log("thinh ngiuu", cars);

    }, [cars])


    useEffect(() => {
        console.log("ok", notifyVehicleDatas);
    }, [notifyVehicleDatas]);

    useEffect(() => {
        if (user?._id) {
            dispatch(getNotifyVehicle(user?._id));
        }
    }, [user, isOpen]);

    useEffect(() => {
        dispatch(getAllTour());
    }, [isOpen]);

    useEffect(() => {
        dispatch(getAllCar());
    }, [isOpen]);

    // const NotifyOrders = [...orderNoti, ...notifyVehicleDatas];
    const NotifyOrders = [
        ...(Array.isArray(orderNoti) ? orderNoti : []),
        ...(Array.isArray(notifyVehicleDatas) ? notifyVehicleDatas : []),];

    useEffect(() => {
        console.log("cecj", NotifyOrders);
    }, [NotifyOrders]);

    // Hàm lấy tên tour dựa trên idTour
    const getTourName = (idTour) => {
        const tour = tours?.find((tour) => tour._id === idTour);
        return tour ? tour.name : "Tên tour không xác định";
    };

    const getCarName = (idCar) => {
        console.log("id car ne", idCar);

        const car = cars?.find((car) => car._id === idCar);
        return car ? car.name : "Tên xe không xác định";
    };

    function handleRating(e, tourId) {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan lên phần tử cha
        navigation(`/Rating?id=${tourId}`);
    }

    // Đóng dropdown khi nhấp ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const formatMessageTime = (createdAt) => {
        const now = moment();
        const messageTime = moment(createdAt);
        const difSeconds = now.diff(messageTime, "seconds");
        const diffMinutes = now.diff(messageTime, "minutes");
        const diffHours = now.diff(messageTime, "hours");
        const diffDays = now.diff(messageTime, "days");

        if (difSeconds < 60) return `vài giây`;
        else if (diffMinutes < 60) return `${diffMinutes} phút`;
        else if (diffHours < 24) return `${diffHours} giờ`;
        else if (diffDays === 1) return "Hôm qua";
        else if (diffDays <= 7) return messageTime.format("DD/MM");
        else return messageTime.format("DD/MM");
    };


    // Sắp xếp thông báo theo thời gian mới nhất
    const sortedNotifyOrders = NotifyOrders.sort((a, b) => {
        const timeA = moment(a.createdAt);
        const timeB = moment(b.createdAt);
        return timeB - timeA; // Sắp xếp giảm dần
    });

    return (
        <div ref={dropdownRef} className="notification-dropdown">
            <h5>Thông Báo</h5>
            <hr />
            {/* {isLoading ? (
                <p>Đang tải thông báo...</p>
            ) : !Array.isArray(NotifyOrders) || NotifyOrders.length === 0 ? (
                <p>Không có thông báo nào.</p>
            ) : ( */}
                {sortedNotifyOrders.map((item) => (
                    <>
                        <div
                            key={item._id}
                            className={`notification-item ${item.isRead ? "read" : "unread"}`}
                        >
                            <img
                                src="src/publics/image/images/image.png"
                                alt="avatar"
                                className="avatar"
                            />
                            <div className="notification-content">
                                <p>
                                    <strong>Thông báo của Bee Angle</strong>
                                    <div>
                                        {item.check === "tour" ? <> {getTourName(item.message)} của bạn</>
                                            :
                                            <> {getCarName(item.message)} của bạn</>
                                        }

                                        {item.check === "tour" ?
                                            <span
                                                className={`status-label ${item.status === "Hoàn tất"
                                                    ? "completed"
                                                    : item.status === "Đang diễn ra"
                                                        ? "processing"
                                                        : item.status === "Đã hủy"
                                                            ? "canceled"
                                                            : item.status === "Sẵn sàng khởi hành"
                                                                ? "ready"
                                                                : "waiting"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                            :
                                            <span
                                                className={`status-label ${item.status === "Hoàn tất"
                                                    ? "completed"
                                                    : item.status === "Đang diễn ra"
                                                        ? "processing"
                                                        : item.status === "Đã hủy"
                                                            ? "canceled"
                                                            : item.status === "Đặt xe thành công"
                                                                ? "ready"
                                                                : "waiting"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        }

                                        . Vui lòng vào thông tin cá nhân để kiểm tra đơn hàng của
                                        bạn.
                                    </div>
                                </p>
                                {item.status === "Hoàn tất" && item.check === "tour" && (
                                    <button
                                        className="feedback-btn"
                                        onClick={(e) => handleRating(e, item.tourId)}
                                    >
                                        Đánh giá
                                    </button>
                                )}
                                <span className="time">
                                    {formatMessageTime(item.createdAt)}
                                </span>
                            </div>
                        </div>
                        {/* <StatusNotificationVehical /> */}
                    </>
                ))
            }
            {/* )} */}
        </div>
    );
};

export default Notification;
