import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { errorDelDM } from "../../redux/danhMuc_slice";

// nhận 3 tham số : mesage, time, kiểu class
function Message_Alert({ message, duration, type_message }) {
    let dispatch = useDispatch()
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 10);
        // Hiển thị thông báo khi component được render

        // Sau 'duration' thời gian thì ẩn thông báo
        const timer = setTimeout(() => {
            setVisible(false);
            dispatch(errorDelDM(""))
        }, duration);


        return () => clearTimeout(timer); // Xóa timer khi component bị unmount
    }, [duration]);

    return (
        <div className={`message-alert ${type_message} ${visible ? 'show' : 'hide'}`}>
            {message}
        </div>
    );

}

export default Message_Alert