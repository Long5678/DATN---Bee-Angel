import { useState, useEffect, useContext } from "react";
import Notification from "./notification";
import "../../../publics/styles/Notification.scss";
import { AuthContext } from "../../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { markRead } from "../../../redux/thunk/notification_thunk";
import { markReadCar } from "../../../redux/thunk/action_notifiVeh";

const Main_Notification = ({ totalUnread }) => {
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    console.log('Thông báo nhận được từ Header:', totalUnread);



    // Toggle mở/đóng dropdown thông báo
    const handleToggleDropdown = () => {
        // Chuyển trạng thái dropdown
        setIsDropdownOpen((prev) => !prev);

        //Nếu mở dropdown, đánh dấu tất cả thông báo là đã đọc
        if (!isDropdownOpen && user?._id) {
            dispatch(markRead(user._id));
            dispatch(markReadCar(user._id))
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <div
                className={`notification-icon ${isDropdownOpen ? "active" : ""}`}
                onClick={handleToggleDropdown}
            >
                {isDropdownOpen && <span className="background-circle"></span>}
                <i className="fa-regular fa-bell"></i>
                {totalUnread > 0 && (
                    <span className="notification-badge">{totalUnread}</span>
                )}
            </div>
            <Notification
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
            />
        </div>
    );
};

export default Main_Notification;
