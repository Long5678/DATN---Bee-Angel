import axios from "axios";
import {
    MarkAllRead,
    createNotify,
    getUserNotify,
    checkStatus,
    loadAllNotification,
    loadingNotify
} from "../notification_slice";
import {
    loadAllOderNotify
} from "../order_slice";


export function addNotify(message, orderId, userId, tourId,check, status) {
    return async (dispatch) => {
        try {
            let res = await axios.post(`http://localhost:3000/notification/create`, {
                message,
                orderId,
                userId,
                tourId,
                check,
                status
            })
            dispatch(createNotify(res.data))
            return res.data
        } catch (error) {
            console.log(error);
        }

    }
}

export function getNotify(userId) {
    return async (dispatch) => {
        try {
            dispatch(loadingNotify(true))
            let res = await axios.get(`http://localhost:3000/notification/${userId}`)
            // console.log(res.data.data);

            dispatch(getUserNotify(res.data.data));

        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingNotify(false))
        }
    }
}

export function markRead(userId) {
    return async (dispatch) => {
        try {
            // Gọi API để đánh dấu tất cả thông báo là đã đọc
            await axios.put(`http://localhost:3000/notification/read/${userId}`);
            // Dispatch action để cập nhật Redux store
            dispatch(MarkAllRead());
        } catch (error) {
            console.error("Lỗi khi đánh dấu tất cả thông báo là đã đọc:", error);
        }
    };

}

export function changeStatus() {
    return async (dispatch) => {
        try {
            // Gọi API để lấy dữ liệu
            const response = await axios.post('http://localhost:3000/notification/check-all-status');

            // Dispatch action và truyền dữ liệu từ response vào
            dispatch(checkStatus(response.data)); // Giả sử response.data chứa notifyDatas

        } catch (error) {
            console.log('Lỗi khi kiểm tra trạng thái đơn hàng', error);
        }
    };
}

export function getAllOderNotify() {
    return async (dispatch) => {
        try {
            dispatch(loadingNotify(true))
            let res = await axios.get(`http://localhost:3000/Order/all`)
            dispatch(loadAllOderNotify(res.data.orders))
            dispatch(loadingNotify(true))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingNotify(false))
        }

    }
}

export function getAllNotify() {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/notification/Allnoti`)
            dispatch(loadAllNotification(res.data))
        } catch (error) {
            console.log(error);
        }

    }
}
